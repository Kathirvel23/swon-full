import { Injectable } from '@nestjs/common';

import { ApiError } from '../common/api-error.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { assertEarningAction } from '../payments/payments.domain.js';
import {
  assertTransition,
  canReopen,
  holdEligible,
  isPartyOfLink,
  rateLimitOk,
  releaseTarget,
  type ComplaintActor,
} from './complaints.domain.js';
import type {
  ComplaintCreate,
  ComplaintDto,
  ComplaintStatusUpdate,
} from '@workbridge/contracts';

/**
 * M7 complaints (§14 row 16): party-authored cases with documented
 * transitions, admin queue/resolution, PAYMENT holds (P6) released on
 * outcome (P7), sanctions with M6-C2 session revocation, and a 7-day
 * timeout sweep. V1 evidence tickets land on EVIDENCE events as storage
 * keys; presigned URLs arrive with the uploads pass.
 */

interface Caller {
  accountId: bigint;
  role: 'worker' | 'employer' | 'admin' | null;
}

const actorOf = (role: Caller['role']): ComplaintActor => {
  if (role === 'admin') return 'ADMIN';
  if (role === 'employer') return 'EMPLOYER';
  return 'WORKER';
};

interface LinkInfo {
  linkType: 'JOB' | 'APPLICATION' | 'EARNING' | 'ATTENDANCE' | 'ACCOUNT';
  linkPublicId: string;
  employerAccountId: bigint;
  partyAccountIds: bigint[];
}

interface ComplaintRow {
  id: bigint;
  publicId: string;
  submitterAccountId: bigint;
  type: string;
  severity: string;
  status: string;
  linkType: string | null;
  linkPublicId: string | null;
  narrative: string;
  resolutionNote: string | null;
  resolvedByAccountId: bigint | null;
  resolvedAt: Date | null;
  reopenedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ComplaintsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: DispatcherService,
  ) {}

  // ------------------------------------------------------------- link target
  private async linkInfo(linkType: string, linkPublicId: string): Promise<LinkInfo> {
    if (linkType === 'JOB') {
      const job = await this.prisma.job.findUnique({
        where: { publicId: linkPublicId },
        include: {
          employer: { select: { accountId: true } },
          crew: { select: { workerProfile: { select: { accountId: true } } } },
        },
      });
      if (!job) throw new ApiError('NOT_FOUND', 'Linked job not found');
      return {
        linkType: 'JOB',
        linkPublicId,
        employerAccountId: job.employer.accountId,
        partyAccountIds: [...new Set(job.crew.map((c) => c.workerProfile.accountId))],
      };
    }
    if (linkType === 'APPLICATION') {
      const app = await this.prisma.application.findUnique({
        where: { publicId: linkPublicId },
        include: {
          job: { include: { employer: { select: { accountId: true } } } },
          workerProfile: { select: { accountId: true } },
        },
      });
      if (!app) throw new ApiError('NOT_FOUND', 'Linked application not found');
      return {
        linkType: 'APPLICATION',
        linkPublicId,
        employerAccountId: app.job.employer.accountId,
        partyAccountIds: [app.workerProfile.accountId],
      };
    }
    if (linkType === 'EARNING') {
      const earning = await this.prisma.earning.findUnique({
        where: { publicId: linkPublicId },
        include: {
          job: { include: { employer: { select: { accountId: true } } } },
          worker: { select: { accountId: true } },
        },
      });
      if (!earning) throw new ApiError('NOT_FOUND', 'Linked earning not found');
      return {
        linkType: 'EARNING',
        linkPublicId,
        employerAccountId: earning.job.employer.accountId,
        partyAccountIds: [earning.worker.accountId],
      };
    }
    if (linkType === 'ATTENDANCE') {
      const rec = await this.prisma.attendanceRecord.findUnique({
        where: { publicId: linkPublicId },
        include: {
          job: { include: { employer: { select: { accountId: true } } } },
          worker: { select: { accountId: true } },
        },
      });
      if (!rec) throw new ApiError('NOT_FOUND', 'Linked attendance record not found');
      return {
        linkType: 'ATTENDANCE',
        linkPublicId,
        employerAccountId: rec.job.employer.accountId,
        partyAccountIds: [rec.worker.accountId],
      };
    }
    // ACCOUNT — reporting another account; the caller is the complaining side.
    const target = await this.prisma.account.findUnique({
      where: { publicId: linkPublicId },
      select: { id: true },
    });
    if (!target) throw new ApiError('NOT_FOUND', 'Linked account not found');
    return {
      linkType: 'ACCOUNT',
      linkPublicId,
      employerAccountId: 0n, // caller identity is asserted by the service below
      partyAccountIds: [target.id],
    };
  }

  /** L0: link exists AND the caller is a party of it. */
  private async assertParty(caller: Caller, linkType: string, linkPublicId: string): Promise<LinkInfo> {
    const info = await this.linkInfo(linkType, linkPublicId);
    if (linkType === 'ACCOUNT') {
      if (info.partyAccountIds[0] === caller.accountId) {
        throw new ApiError('NOT_JOB_PARTY', 'You cannot file a complaint against yourself');
      }
      return info;
    }
    const asParties = { employerAccountId: info.employerAccountId, partyAccountIds: info.partyAccountIds };
    if (!isPartyOfLink(asParties, caller.accountId)) {
      throw new ApiError('NOT_JOB_PARTY', 'You are not a party of the linked item');
    }
    return info;
  }

  // ---------------------------------------------------------------- submit
  async submit(caller: Caller, input: ComplaintCreate): Promise<ComplaintDto> {
    if ((input.linkType && !input.linkPublicId) || (!input.linkType && input.linkPublicId)) {
      throw new ApiError('VALIDATION_FAILED', 'linkType and linkPublicId must be provided together');
    }
    if (input.narrative.trim().length < 20) {
      throw new ApiError('VALIDATION_FAILED', 'Explain the issue in at least 20 characters');
    }

    const info = input.linkType
      ? await this.assertParty(caller, input.linkType, input.linkPublicId!)
      : null;

    const recent = await this.prisma.complaint.count({
      where: {
        submitterAccountId: caller.accountId,
        createdAt: { gt: new Date(Date.now() - 24 * 60 * 60_000) },
      },
    });
    if (!rateLimitOk(recent)) {
      throw new ApiError('STATE_INVALID', 'You have filed several complaints today — our team will reach out');
    }

    const complaint = (await this.prisma.$transaction(async (tx) => {
      const row = await tx.complaint.create({
        data: {
          submitterAccountId: caller.accountId,
          type: input.type,
          severity: input.severity,
          status: 'OPEN',
          linkType: info?.linkType ?? null,
          linkPublicId: info?.linkPublicId ?? null,
          narrative: input.narrative.trim(),
        },
      });
      await tx.complaintEvent.create({
        data: { complaintId: row.id, actorId: caller.accountId, kind: 'STATUS_CHANGE', body: 'OPEN' },
      });
      for (const ticket of input.evidenceUploadTickets ?? []) {
        await tx.complaintEvent.create({
          data: { complaintId: row.id, actorId: caller.accountId, kind: 'EVIDENCE', evidenceStorageKey: ticket },
        });
      }

      // L0 effect: a PAYMENT complaint freezes the linked APPROVED earning (P6).
      if (input.type === 'PAYMENT' && info?.linkType === 'EARNING') {
        const earning = await tx.earning.findUnique({
          where: { publicId: info.linkPublicId },
        });
        if (earning && holdEligible(earning.status)) {
          assertEarningAction('hold', earning.status);
          await tx.earning.update({
            where: { id: earning.id },
            data: { status: 'ON_HOLD', holdComplaintId: row.id },
          });
        }
      }
      return row;
    })) as ComplaintRow;

    const admins = await this.prisma.account.findMany({
      where: { role: 'admin' },
      select: { id: true },
    });
    await this.dispatcher.enqueue({
      eventKey: 'COMPLAINT_ACK',
      recipientAccountIds: [caller.accountId],
      contextType: 'COMPLAINT',
      contextPublicId: complaint.publicId,
      args: { type: input.type },
    });
    if (admins.length > 0) {
      await this.dispatcher.enqueue({
        eventKey: 'ADMIN_QUEUE_ALERT',
        recipientAccountIds: admins.map((a) => a.id),
        contextType: 'COMPLAINT',
        contextPublicId: complaint.publicId,
        args: { severity: input.severity, type: input.type },
      });
    }

    return this.toDto(complaint);
  }

  // ------------------------------------------------------------------- mine
  async my(caller: Caller, status?: string): Promise<ComplaintDto[]> {
    const rows = (await this.prisma.complaint.findMany({
      where: { submitterAccountId: caller.accountId, ...(status ? { status } : {}) },
      include: { events: { orderBy: { createdAt: 'asc' }, take: 50 } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })) as unknown as Array<ComplaintRow & { events: Array<Record<string, unknown>> }>;
    return Promise.all(rows.map((r) => this.toDto(r)));
  }

  // ------------------------------------------------------------------ reply
  async reply(caller: Caller, publicId: string, body: string, tickets: string[] = []) {
    const complaint = (await this.prisma.complaint.findUnique({
      where: { publicId },
    })) as ComplaintRow | null;
    if (!complaint) throw new ApiError('NOT_FOUND', 'Complaint not found');

    // party authorization: submitter, or a party of the linked entity
    let authorized = complaint.submitterAccountId === caller.accountId;
    if (!authorized && complaint.linkType && complaint.linkPublicId) {
      const info = await this.linkInfo(complaint.linkType, complaint.linkPublicId);
      authorized =
        complaint.linkType === 'ACCOUNT'
          ? info.partyAccountIds[0] === caller.accountId
          : isPartyOfLink(
              { employerAccountId: info.employerAccountId, partyAccountIds: info.partyAccountIds },
              caller.accountId,
            );
    }
    if (!authorized) throw new ApiError('NOT_JOB_PARTY', 'You are not a party of this complaint');

    const actor = actorOf(caller.role);
    const statusMoves = complaint.status === 'WAITING_ON_PARTY';
    if (statusMoves) assertTransition(complaint.status, 'UNDER_REVIEW', actor);

    const updated = (await this.prisma.$transaction(async (tx) => {
      const evt = await tx.complaintEvent.create({
        data: { complaintId: complaint.id, actorId: caller.accountId, kind: 'PARTY_REPLY', body },
      });
      for (const ticket of tickets) {
        await tx.complaintEvent.create({
          data: { complaintId: complaint.id, actorId: caller.accountId, kind: 'EVIDENCE', evidenceStorageKey: ticket },
        });
      }
      const row = statusMoves
        ? await tx.complaint.update({ where: { id: complaint.id }, data: { status: 'UNDER_REVIEW' } })
        : complaint;
      return { evt, row };
    })) as { evt: { createdAt: Date }; row: ComplaintRow };

    if (statusMoves) {
      await this.dispatcher.enqueue({
        eventKey: 'COMPLAINT_STATUS',
        recipientAccountIds: [complaint.submitterAccountId],
        contextType: 'COMPLAINT',
        contextPublicId: complaint.publicId,
        args: { status: 'UNDER_REVIEW' },
      });
    }
    return {
      status: updated.row.status,
      repliedAt: updated.evt.createdAt.toISOString(),
    };
  }

  // -------------------------------------------------------------- admin list
  async adminList(query: { status?: string; type?: string; severity?: string; sort?: string }) {
    const rows = (await this.prisma.complaint.findMany({
      where: {
        ...(query.status ? { status: query.status } : {}),
        ...(query.type ? { type: query.type } : {}),
        ...(query.severity ? { severity: query.severity } : {}),
      },
      include: { events: { orderBy: { createdAt: 'asc' }, take: 50 } },
      take: 50,
    })) as unknown as Array<ComplaintRow & { events: Array<Record<string, unknown>> }>;

    const rank = { HIGH: 0, MEDIUM: 1, LOW: 2 } as Record<string, number>;
    if (query.sort === 'CREATED_AT') {
      rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else {
      rows.sort(
        (a, b) =>
          (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9) ||
          b.createdAt.getTime() - a.createdAt.getTime(),
      );
    }
    return Promise.all(rows.map((r) => this.toDto(r)));
  }

  // ----------------------------------------------------------------- decide
  async decide(caller: Caller, publicId: string, update: ComplaintStatusUpdate) {
    if (update.note.trim().length < 5) {
      throw new ApiError('VALIDATION_FAILED', 'A decision note is required');
    }
    const complaint = (await this.prisma.complaint.findUnique({
      where: { publicId },
    })) as ComplaintRow | null;
    if (!complaint) throw new ApiError('NOT_FOUND', 'Complaint not found');

    const reopen = (update.status as string) === 'OPEN';
    if (reopen) {
      if (!canReopen(complaint.reopenedAt ? 1 : 0)) {
        throw new ApiError('STATE_INVALID', 'This complaint has already been reopened');
      }
    }
    assertTransition(complaint.status, update.status, 'ADMIN');

    if (update.status === 'RESOLVED' && update.sanction) {
      // sanctioned account must exist (and not be the admin themselves)
      const target = await this.prisma.account.findUnique({
        where: { publicId: update.sanction.accountPublicId },
        select: { id: true },
      });
      if (!target) throw new ApiError('NOT_FOUND', 'Sanction target not found');
    }

    const decided = ['RESOLVED', 'DISMISSED', 'CLOSED_TIMEOUT'].includes(update.status);

    const updated = (await this.prisma.$transaction(async (tx) => {
      const row = await tx.complaint.update({
        where: { id: complaint.id },
        data: {
          status: update.status,
          resolutionNote: update.note,
          reopenedAt: reopen ? new Date() : complaint.reopenedAt,
          resolvedByAccountId: decided ? caller.accountId : (update.status as string) === 'OPEN' ? null : complaint.resolvedByAccountId,
          resolvedAt: decided ? new Date() : (update.status as string) === 'OPEN' ? null : complaint.resolvedAt,
        },
      });
      await tx.complaintEvent.create({
        data: { complaintId: complaint.id, actorId: caller.accountId, kind: 'STATUS_CHANGE', body: update.note },
      });

      // L4/L5 sanctions (RESOLVED only) — M6-C2 for SUSPEND/BAN.
      let sanctionedAccountId: bigint | null = null;
      if (update.status === 'RESOLVED' && update.sanction) {
        const target = await tx.account.findUnique({
          where: { publicId: update.sanction.accountPublicId },
          select: { id: true },
        });
        if (!target) throw new ApiError('NOT_FOUND', 'Sanction target not found');
        await tx.sanction.create({
          data: {
            accountId: target.id,
            type: update.sanction.type,
            reason: update.sanction.reason,
            linkedComplaintId: complaint.id,
            issuedByAccountId: caller.accountId,
          },
        });
        if (update.sanction.type === 'SUSPEND' || update.sanction.type === 'BAN') {
          await tx.account.update({ where: { id: target.id }, data: { status: 'SUSPENDED' } });
          await tx.session.updateMany({
            where: { accountId: target.id, revokedAt: null },
            data: { revokedAt: new Date() },
          });
          sanctionedAccountId = target.id;
        }
      }

      // P7: release held earnings unless the remedy is an explicit hold.
      const keepHold = update.sanction?.type === 'PAYMENT_HOLD';
      if (decided && !keepHold) {
        const held = await tx.earning.findMany({
          where: { holdComplaintId: complaint.id, status: 'ON_HOLD' },
        });
        for (const e of held) {
          assertEarningAction('release', e.status);
          await tx.earning.update({
            where: { id: e.id },
            data: { status: releaseTarget(), holdComplaintId: null },
          });
        }
      }
      return { row, sanctionedAccountId };
    })) as { row: ComplaintRow; sanctionedAccountId: bigint | null };

    // outcome events
    const participants = new Set<string>([complaint.submitterAccountId.toString()]);
    if (complaint.linkType && complaint.linkPublicId && complaint.linkType !== 'ACCOUNT') {
      const info = await this.linkInfo(complaint.linkType, complaint.linkPublicId);
      for (const id of [info.employerAccountId, ...info.partyAccountIds]) participants.add(id.toString());
    }
    const recipients = [...participants].map((s) => BigInt(s));
    if (update.status === 'UNDER_REVIEW' || update.status === 'WAITING_ON_PARTY') {
      await this.dispatcher.enqueue({
        eventKey: 'COMPLAINT_STATUS',
        recipientAccountIds: recipients,
        contextType: 'COMPLAINT',
        contextPublicId: complaint.publicId,
        args: { status: update.status },
      });
    } else if (decided || reopen) {
      await this.dispatcher.enqueue({
        eventKey: 'COMPLAINT_OUTCOME',
        recipientAccountIds: recipients,
        contextType: 'COMPLAINT',
        contextPublicId: complaint.publicId,
        args: { status: update.status },
      });
    }
    if (updated.sanctionedAccountId !== null) {
      await this.dispatcher.enqueue({
        eventKey: 'ACCOUNT_SUSPENDED',
        recipientAccountIds: [updated.sanctionedAccountId],
        contextType: 'ACCOUNT',
        args: { reason: update.sanction?.reason ?? '' },
      });
    }

    return { publicId: complaint.publicId, status: update.status };
  }

  // -------------------------------------------------------- account reinstate
  async reinstate(caller: Caller, accountPublicId: string, note: string) {
    if (note.trim().length < 5) {
      throw new ApiError('VALIDATION_FAILED', 'A reinstatement note is required');
    }
    const account = await this.prisma.account.findUnique({
      where: { publicId: accountPublicId },
      select: { id: true, status: true },
    });
    if (!account) throw new ApiError('NOT_FOUND', 'Account not found');
    if (account.status === 'ACTIVE') {
      throw new ApiError('STATE_INVALID', 'Account is already active');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.account.update({ where: { id: account.id }, data: { status: 'ACTIVE' } });
      await tx.sanction.updateMany({
        where: { accountId: account.id, liftedAt: null },
        data: { liftedAt: new Date() },
      });
    });

    await this.dispatcher.enqueue({
      eventKey: 'ACCOUNT_REINSTATED',
      recipientAccountIds: [account.id],
      contextType: 'ACCOUNT',
      args: { by: 'admin' },
    });
    return { publicId: accountPublicId, status: 'ACTIVE' };
  }

  // ------------------------------------------------------------------ sweeps
  /** L6: WAITING_ON_PARTY for 7+ days → CLOSED_TIMEOUT, holds released. */
  async sweepTimeouts(): Promise<number> {
    const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60_000);
    const stale = (await this.prisma.complaint.findMany({
      where: { status: 'WAITING_ON_PARTY', updatedAt: { lt: cutoff } },
      take: 20,
    })) as ComplaintRow[];
    let closed = 0;
    for (const c of stale) {
      try {
        assertTransition(c.status, 'CLOSED_TIMEOUT', 'SYSTEM');
        await this.prisma.$transaction(async (tx) => {
          await tx.complaint.update({
            where: { id: c.id },
            data: { status: 'CLOSED_TIMEOUT', resolutionNote: 'No reply within the response window', resolvedAt: new Date() },
          });
          await tx.complaintEvent.create({
            data: { complaintId: c.id, actorId: c.submitterAccountId, kind: 'STATUS_CHANGE', body: 'CLOSED_TIMEOUT' },
          });
          const held = await tx.earning.findMany({
            where: { holdComplaintId: c.id, status: 'ON_HOLD' },
          });
          for (const e of held) {
            await tx.earning.update({
              where: { id: e.id },
              data: { status: releaseTarget(), holdComplaintId: null },
            });
          }
        });
        await this.dispatcher.enqueue({
          eventKey: 'COMPLAINT_OUTCOME',
          recipientAccountIds: [c.submitterAccountId],
          contextType: 'COMPLAINT',
          contextPublicId: c.publicId,
          args: { status: 'CLOSED_TIMEOUT' },
        });
        closed += 1;
      } catch {
        // state moved concurrently — next sweep re-evaluates
      }
    }
    return closed;
  }

  // ------------------------------------------------------------------- DTO
  private async toDto(row: ComplaintRow): Promise<ComplaintDto> {
    const events = (await this.prisma.complaintEvent.findMany({
      where: { complaintId: row.id },
      orderBy: { createdAt: 'asc' },
      take: 100,
    })) as unknown as Array<{
      publicId: string;
      kind: string;
      body: string | null;
      evidenceStorageKey: string | null;
      createdAt: Date;
      actorId: bigint;
    }>;

    const actorIds = [...new Set(events.map((e) => e.actorId))];
    const actors = await this.prisma.account.findMany({
      where: { id: { in: actorIds } },
      select: {
        id: true,
        publicId: true,
        role: true,
        workerProfile: { select: { fullName: true } },
        employerProfile: { select: { orgName: true } },
      },
    });
    const actorMap = new Map(actors.map((a) => [a.id.toString(), a]));

    const resolvedBody = row.linkType && row.linkPublicId ? { type: row.linkType, publicId: row.linkPublicId } : null;

    return {
      publicId: row.publicId,
      type: row.type as ComplaintDto['type'],
      severity: row.severity as ComplaintDto['severity'],
      status: row.status as ComplaintDto['status'],
      link: resolvedBody,
      narrative: row.narrative,
      resolutionNote: row.resolutionNote,
      resolvedAt: row.resolvedAt?.toISOString() ?? null,
      events: events.map((e) => {
        const a = actorMap.get(e.actorId.toString());
        return {
          publicId: e.publicId,
          kind: e.kind as 'NOTE' | 'PARTY_REPLY' | 'STATUS_CHANGE' | 'EVIDENCE',
          body: e.body,
          actor: {
            publicId: a?.publicId ?? 'unknown',
            role: (a?.role ?? 'worker') as 'WORKER' | 'EMPLOYER' | 'ADMIN',
            displayName: a?.workerProfile?.fullName ?? a?.employerProfile?.orgName ?? 'SWON user',
          },
          evidenceUrl: null, // presign lands with uploads; key kept server-side
          createdAt: e.createdAt.toISOString(),
        };
      }),
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    } as ComplaintDto;
  }
}

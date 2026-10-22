import { Injectable } from '@nestjs/common';

import { ApiError } from '../common/api-error.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { releaseTarget } from '../complaints/complaints.domain.js';
import { WEIGHTS, WEIGHTS_VERSION } from '../matching/matching.domain.js';
import { parseCommissionPolicy } from '../payments/commission.js';
import { Phase1PaymentsService } from '../payments/phase1-payments.service.js';

/**
 * Admin oversight service (§14 rows 14–16): dashboard counters, the
 * append-only audit trail, account search + sanctions (M6 warn/suspend/ban
 * with C2 session revocation), jobs moderation (hide/restore, non-destructive),
 * payments oversight (payout queue, holds, audited manual release P9), and
 * platform_config read/write. Complaints/KYC decisions stay in their own
 * modules — this service only does oversight + moderation.
 */

interface Caller {
  accountId: bigint;
  role: 'worker' | 'employer' | 'admin' | null;
}

export type SanctionInput = { type: 'WARN' | 'SUSPEND' | 'BAN'; reason: string };

const OPEN_COMPLAINT = ['OPEN', 'UNDER_REVIEW', 'WAITING_ON_PARTY'];

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: DispatcherService,
    private readonly phase1: Phase1PaymentsService,
  ) {}

  // ------------------------------------------------------------------ stats
  async stats() {
    const [
      accounts,
      workers,
      employers,
      suspended,
      openJobs,
      hiddenJobs,
      openComplaints,
      pendingKyc,
      unpaidEarnings,
      heldEarnings,
    ] = await Promise.all([
      this.prisma.account.count(),
      this.prisma.account.count({ where: { role: 'worker' } }),
      this.prisma.account.count({ where: { role: 'employer' } }),
      this.prisma.account.count({ where: { status: 'SUSPENDED' } }),
      this.prisma.job.count({ where: { status: { in: ['OPEN', 'HIRING'] }, hiddenAt: null } }),
      this.prisma.job.count({ where: { hiddenAt: { not: null } } }),
      this.prisma.complaint.count({ where: { status: { in: OPEN_COMPLAINT } } }),
      this.prisma.kycSubmission.count({ where: { status: { in: ['SUBMITTED', 'UNDER_REVIEW'] } } }),
      this.prisma.earning.count({ where: { status: 'APPROVED' } }),
      this.prisma.earning.count({ where: { status: 'ON_HOLD' } }),
    ]);
    return {
      accounts,
      workers,
      employers,
      suspended,
      openJobs,
      hiddenJobs,
      openComplaints,
      pendingKyc,
      unpaidEarnings,
      heldEarnings,
    };
  }

  // ------------------------------------------------------------------ audit
  async auditList(q: { limit?: string; offset?: string; action?: string; entityType?: string; entityPublicId?: string }) {
    const take = Math.min(Math.max(Number(q.limit ?? 50) || 50, 1), 100);
    const skip = Math.max(Number(q.offset ?? 0) || 0, 0);
    const where = {
      ...(q.action ? { action: { equals: q.action } } : {}),
      ...(q.entityType ? { entityType: { equals: q.entityType } } : {}),
      ...(q.entityPublicId ? { entityPublicId: { equals: q.entityPublicId } } : {}),
    };
    const [rows, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        orderBy: { at: 'desc' },
        skip,
        take,
        include: { actor: { select: { publicId: true, role: true, phone: true } } },
      }),
      this.prisma.auditLog.count({ where }),
    ]);
    return {
      data: rows.map((r) => ({
        id: r.id.toString(),
        at: r.at.toISOString(),
        action: r.action,
        entityType: r.entityType,
        entityPublicId: r.entityPublicId,
        actorRole: r.actorRole,
        actor: r.actor ? { publicId: r.actor.publicId, role: r.actor.role, phone: r.actor.phone } : null,
        requestId: r.requestId,
        beforeJson: r.beforeJson ?? null,
        afterJson: r.afterJson ?? null,
      })),
      meta: { count: total, limit: take, offset: skip },
    };
  }

  // ---------------------------------------------------------------- accounts
  async searchAccounts(query?: string, status?: string, role?: string) {
    const q = (query ?? '').trim();
    const rows = await this.prisma.account.findMany({
      where: {
        ...(q ? { OR: [{ phone: { contains: q } }, { publicId: { startsWith: q } }] } : {}),
        ...(status ? { status } : {}),
        ...(role ? { role } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 25,
      include: {
        workerProfile: { select: { fullName: true } },
        employerProfile: { select: { orgName: true, contactName: true } },
        sanctions: { where: { liftedAt: null }, select: { id: true, type: true, reason: true, createdAt: true } },
      },
    });
    return rows.map((a) => ({
      publicId: a.publicId,
      phone: a.phone,
      role: a.role,
      status: a.status,
      createdAt: a.createdAt.toISOString(),
      lastLoginAt: a.lastLoginAt?.toISOString() ?? null,
      name: a.workerProfile?.fullName ?? a.employerProfile?.orgName ?? a.employerProfile?.contactName ?? null,
      activeSanctions: a.sanctions.map((s) => ({
        type: s.type,
        reason: s.reason,
        createdAt: s.createdAt.toISOString(),
      })),
    }));
  }

  async accountDetail(publicId: string) {
    const account = await this.prisma.account.findUnique({
      where: { publicId },
      include: {
        workerProfile: { select: { publicId: true, fullName: true, city: true } },
        employerProfile: { select: { publicId: true, orgName: true, contactName: true, city: true } },
      },
    });
    if (!account) throw new ApiError('NOT_FOUND', 'Account not found');
    const [sanctions, activeSessions, recentAudit] = await Promise.all([
      this.prisma.sanction.findMany({
        where: { accountId: account.id },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      this.prisma.session.count({ where: { accountId: account.id, revokedAt: null } }),
      this.prisma.auditLog.findMany({
        where: { entityPublicId: publicId },
        orderBy: { at: 'desc' },
        take: 10,
      }),
    ]);
    return {
      publicId: account.publicId,
      phone: account.phone,
      role: account.role,
      status: account.status,
      createdAt: account.createdAt.toISOString(),
      lastLoginAt: account.lastLoginAt?.toISOString() ?? null,
      phoneVerifiedAt: account.phoneVerifiedAt?.toISOString() ?? null,
      name: account.workerProfile?.fullName ?? account.employerProfile?.orgName ?? null,
      activeSessions,
      sanctions: sanctions.map((s) => ({
        type: s.type,
        reason: s.reason,
        startsAt: s.startsAt.toISOString(),
        endsAt: s.endsAt?.toISOString() ?? null,
        liftedAt: s.liftedAt?.toISOString() ?? null,
        createdAt: s.createdAt.toISOString(),
      })),
      recentAudit: recentAudit.map((a) => ({
        at: a.at.toISOString(),
        action: a.action,
        entityType: a.entityType,
      })),
    };
  }

  /** M6 direct sanctions (warn/suspend/ban) with C2 session revocation. */
  async sanction(caller: Caller, publicId: string, input: SanctionInput) {
    if (!['WARN', 'SUSPEND', 'BAN'].includes(input.type)) {
      throw new ApiError('VALIDATION_FAILED', 'Sanction type must be WARN, SUSPEND or BAN');
    }
    const reason = (input.reason ?? '').trim();
    if (reason.length < 10) {
      throw new ApiError('VALIDATION_FAILED', 'A reason of at least 10 characters is required');
    }
    const target = await this.prisma.account.findUnique({
      where: { publicId },
      select: { id: true, status: true, role: true },
    });
    if (!target) throw new ApiError('NOT_FOUND', 'Account not found');
    if (target.id === caller.accountId) {
      throw new ApiError('FORBIDDEN', 'You cannot sanction your own account');
    }
    if (target.role === 'admin') {
      throw new ApiError('FORBIDDEN', 'Admin accounts cannot be sanctioned from this console');
    }

    const suspends = input.type === 'SUSPEND' || input.type === 'BAN';
    const result = await this.prisma.$transaction(async (tx) => {
      await tx.sanction.create({
        data: {
          accountId: target.id,
          type: input.type,
          reason,
          issuedByAccountId: caller.accountId,
        },
      });
      let status = target.status;
      if (suspends && target.status !== 'SUSPENDED') {
        status = 'SUSPENDED';
        await tx.account.update({ where: { id: target.id }, data: { status } });
        await tx.session.updateMany({
          where: { accountId: target.id, revokedAt: null },
          data: { revokedAt: new Date() },
        });
      }
      await tx.auditLog.create({
        data: {
          actorAccountId: caller.accountId,
          actorRole: 'ADMIN',
          action: 'ACCOUNT_SANCTIONED',
          entityType: 'ACCOUNT',
          entityPublicId: publicId,
          beforeJson: { status: target.status },
          afterJson: { status, sanctionType: input.type },
        },
      });
      return { status };
    });

    if (suspends) {
      await this.dispatcher.enqueue({
        eventKey: 'ACCOUNT_SUSPENDED',
        recipientAccountIds: [target.id],
        contextType: 'ACCOUNT',
        args: { reason },
      });
    }
    return { publicId, status: result.status, sanction: { type: input.type, reason } };
  }

  // -------------------------------------------------------- account reset
  /**
   * "Delete user" for the admin console: a safe reset, not a physical row
   * delete. History rows stay intact (FKs are RESTRICT), sessions are revoked
   * and the phone is tombstoned so the number is free for a fresh sign-up.
   */
  async resetAccount(caller: Caller, publicId: string) {
    const target = await this.prisma.account.findUnique({
      where: { publicId },
      select: { id: true, phone: true, role: true, status: true },
    });
    if (!target) throw new ApiError('NOT_FOUND', 'Account not found');
    if (target.id === caller.accountId) {
      throw new ApiError('FORBIDDEN', 'You cannot delete your own account');
    }
    if (target.role === 'admin') {
      throw new ApiError('FORBIDDEN', 'Admin accounts cannot be deleted from this console');
    }

    const tombstone = `deleted+${publicId}@swon.invalid`;
    if (target.status === 'CLOSED' && target.phone === tombstone) {
      return { publicId, phoneReleased: true, alreadyDeleted: true };
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.session.updateMany({
        where: { accountId: target.id, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      await tx.pushToken.deleteMany({ where: { accountId: target.id } });
      await tx.account.update({
        where: { id: target.id },
        data: { status: 'CLOSED', closedAt: new Date(), phone: tombstone },
      });
      await tx.auditLog.create({
        data: {
          actorAccountId: caller.accountId,
          actorRole: 'ADMIN',
          action: 'ACCOUNT_DELETED',
          entityType: 'ACCOUNT',
          entityPublicId: publicId,
          beforeJson: { status: target.status, role: target.role },
          afterJson: { status: 'CLOSED', phoneReleased: true },
        },
      });
    });

    return { publicId, phoneReleased: true, alreadyDeleted: false };
  }

  // -------------------------------------------------------- jobs moderation
  async jobsList(q: { status?: string; hidden?: string; query?: string }) {
    const text = (q.query ?? '').trim();
    const rows = await this.prisma.job.findMany({
      where: {
        ...(q.status ? { status: q.status } : {}),
        ...(q.hidden === 'true' ? { hiddenAt: { not: null } } : {}),
        ...(q.hidden === 'false' ? { hiddenAt: null } : {}),
        ...(text ? { OR: [{ title: { contains: text } }, { city: { contains: text } }] } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { employer: { select: { orgName: true, contactName: true } } },
    });
    return rows.map((j) => ({
      publicId: j.publicId,
      title: j.title,
      city: j.city,
      status: j.status,
      headcountRequired: j.headcountRequired,
      hiredCount: j.hiredCount,
      applicationCount: j.applicationCount,
      payAmountPaise: j.payAmountPaise.toString(),
      payType: j.payType,
      employerName: j.employer.orgName || j.employer.contactName,
      hiddenAt: j.hiddenAt?.toISOString() ?? null,
      hiddenReason: j.hiddenReason,
      startsOn: j.startsOn.toISOString().slice(0, 10),
      createdAt: j.createdAt.toISOString(),
    }));
  }

  async hideJob(caller: Caller, publicId: string, reason: string) {
    const clean = (reason ?? '').trim();
    if (clean.length < 5) throw new ApiError('VALIDATION_FAILED', 'A hide reason is required');
    const job = await this.prisma.job.findUnique({ where: { publicId }, select: { id: true, hiddenAt: true } });
    if (!job) throw new ApiError('NOT_FOUND', 'Job not found');
    if (job.hiddenAt) throw new ApiError('STATE_INVALID', 'Job is already hidden');

    await this.prisma.$transaction([
      this.prisma.job.update({ where: { id: job.id }, data: { hiddenAt: new Date(), hiddenReason: clean } }),
      this.prisma.auditLog.create({
        data: {
          actorAccountId: caller.accountId,
          actorRole: 'ADMIN',
          action: 'JOB_HIDDEN',
          entityType: 'JOB',
          entityPublicId: publicId,
          afterJson: { hidden: true, reason: clean },
        },
      }),
    ]);
    return { publicId, hidden: true };
  }

  async restoreJob(caller: Caller, publicId: string) {
    const job = await this.prisma.job.findUnique({ where: { publicId }, select: { id: true, hiddenAt: true } });
    if (!job) throw new ApiError('NOT_FOUND', 'Job not found');
    if (!job.hiddenAt) throw new ApiError('STATE_INVALID', 'Job is not hidden');

    await this.prisma.$transaction([
      this.prisma.job.update({ where: { id: job.id }, data: { hiddenAt: null, hiddenReason: null } }),
      this.prisma.auditLog.create({
        data: {
          actorAccountId: caller.accountId,
          actorRole: 'ADMIN',
          action: 'JOB_RESTORED',
          entityType: 'JOB',
          entityPublicId: publicId,
          beforeJson: { hidden: true },
          afterJson: { hidden: false },
        },
      }),
    ]);
    return { publicId, hidden: false };
  }

  // ---------------------------------------------------------------- payments
  async paymentsOverview() {
    const earningInclude = {
      job: { select: { publicId: true, title: true } },
      worker: { select: { fullName: true, accountId: true } },
      holdComplaint: { select: { publicId: true, type: true, status: true } },
    } as const;
    const [awaiting, held, transactions, collectionAgg, payoutGroups, refundAgg, allocationAgg] = await Promise.all([
      this.prisma.earning.findMany({
        where: { status: 'APPROVED' },
        orderBy: { approvedAt: 'desc' },
        take: 50,
        include: earningInclude,
      }),
      this.prisma.earning.findMany({
        where: { status: 'ON_HOLD' },
        orderBy: { updatedAt: 'desc' },
        take: 50,
        include: earningInclude,
      }),
      this.prisma.paymentTransaction.findMany({
        orderBy: { createdAt: 'desc' },
        take: 20,
        include: { earnings: { include: { earning: { select: { publicId: true, status: true } } } } },
      }),
      this.prisma.paymentTransaction.aggregate({
        where: { kind: 'COLLECTION', status: 'PAID' },
        _sum: { amountPaise: true, commissionPaise: true },
        _count: { _all: true },
      }),
      this.prisma.payout.groupBy({ by: ['status'], _sum: { amountPaise: true }, _count: { _all: true } }),
      this.prisma.paymentRefund.aggregate({
        where: { status: 'SUCCEEDED' },
        _sum: { amountPaise: true },
        _count: { _all: true },
      }),
      this.prisma.paymentEarning.aggregate({
        where: { txn: { kind: 'COLLECTION', status: 'PAID' } },
        _sum: { netPaise: true },
      }),
    ]);
    const byStatus = new Map(
      payoutGroups.map((g) => [g.status, { count: g._count._all, amount: g._sum.amountPaise ?? 0n }]),
    );
    const payoutTotal = (states: string[]) =>
      states.reduce((acc, s) => acc + (byStatus.get(s)?.amount ?? 0n), 0n);
    const collected = collectionAgg._sum.amountPaise ?? 0n;
    const commission = collectionAgg._sum.commissionPaise ?? 0n;
    const earningDto = (e: (typeof awaiting)[number]) => ({
      publicId: e.publicId,
      amountPaise: e.amountPaise.toString(),
      status: e.status,
      job: e.job,
      workerFullName: e.worker.fullName,
      holdComplaint: 'holdComplaint' in e ? ((e as { holdComplaint?: { publicId: string; type: string; status: string } | null }).holdComplaint ?? null) : null,
      approvedAt: e.approvedAt?.toISOString() ?? null,
      updatedAt: e.updatedAt.toISOString(),
    });
    return {
      metrics: {
        collectionsCount: collectionAgg._count._all,
        collectedPaise: collected.toString(),
        commissionPaise: commission.toString(),
        workerAllocationsPaise: (collected - commission).toString(),
        outstandingPayoutsPaise: (payoutTotal(['PENDING']) + payoutTotal(['PROCESSING'])).toString(),
        paidPayoutsPaise: payoutTotal(['PAID']).toString(),
        failedPayoutsPaise: payoutTotal(['FAILED']).toString(),
        refundedPaise: (refundAgg._sum.amountPaise ?? 0n).toString(),
        refundsCount: refundAgg._count._all,
        payoutCounts: Object.fromEntries([...byStatus.entries()].map(([k, v]) => [k, v.count])),
        // Reconciliation: collected gross − commission must equal Σ allocation net.
        reconciliationDifferencePaise: (
          collected - commission - (allocationAgg._sum.netPaise ?? 0n)
        ).toString(),
      },
      awaitingPayment: awaiting.map(earningDto),
      onHold: held.map(earningDto),
      recentTransactions: transactions.map((t) => ({
        publicId: t.publicId,
        status: t.status,
        amountPaise: t.amountPaise.toString(),
        reference: t.reference,
        paidAt: t.paidAt?.toISOString() ?? null,
        createdAt: t.createdAt.toISOString(),
        earnings: t.earnings.map((pe) => ({ earningPublicId: pe.earning.publicId, status: pe.earning.status })),
      })),
    };
  }

  /** P9 manual release: audited, requires a reason, notifies the worker. */
  async releaseHold(caller: Caller, earningPublicId: string, reason: string) {
    const clean = (reason ?? '').trim();
    if (clean.length < 5) throw new ApiError('VALIDATION_FAILED', 'A release reason is required');
    const earning = await this.prisma.earning.findUnique({
      where: { publicId: earningPublicId },
      select: { id: true, status: true, workerProfileId: true },
    });
    if (!earning) throw new ApiError('NOT_FOUND', 'Earning not found');
    if (earning.status !== 'ON_HOLD') {
      throw new ApiError('STATE_INVALID', 'Only ON_HOLD earnings can be released');
    }
    const worker = await this.prisma.workerProfile.findUnique({
      where: { id: earning.workerProfileId },
      select: { accountId: true },
    });
    const target = releaseTarget(); // 'APPROVED'
    await this.prisma.$transaction([
      this.prisma.earning.update({
        where: { id: earning.id },
        data: { status: target, holdComplaintId: null },
      }),
      this.prisma.auditLog.create({
        data: {
          actorAccountId: caller.accountId,
          actorRole: 'ADMIN',
          action: 'HOLD_RELEASED',
          entityType: 'EARNING',
          entityPublicId: earningPublicId,
          beforeJson: { status: 'ON_HOLD' },
          afterJson: { status: target, reason: clean },
        },
      }),
    ]);
    if (worker) {
      await this.dispatcher.enqueue({
        eventKey: 'PAYMENT_APPROVED',
        recipientAccountIds: [worker.accountId],
        contextType: 'EARNING',
        contextPublicId: earningPublicId,
        args: {},
      });
    }
    return { publicId: earningPublicId, status: target };
  }

  // ------------------------------------------------------------------ config
  async configList() {
    const rows = await this.prisma.platformConfig.findMany({ orderBy: { key: 'asc' } });
    return {
      flags: rows.map((r) => ({
        key: r.key,
        valueJson: r.valueJson,
        scope: r.scope,
        version: r.version,
        updatedAt: r.updatedAt.toISOString(),
      })),
      matchWeights: { version: WEIGHTS_VERSION, weights: WEIGHTS },
    };
  }

  async configSet(caller: Caller, key: string, value: unknown) {
    if (!/^[A-Z][A-Z0-9_]{1,59}$/.test(key)) {
      throw new ApiError('VALIDATION_FAILED', 'Keys are UPPER_SNAKE_CASE, 2–60 chars');
    }
    if (value === undefined) throw new ApiError('VALIDATION_FAILED', 'A JSON value is required');
    if (key === 'MATCH_WEIGHTS') {
      const w = value as Record<string, unknown>;
      const nums = Object.values(w).map((v) => Number(v));
      const sum = nums.reduce((a, b) => a + b, 0);
      if (nums.length === 0 || nums.some((n) => !Number.isFinite(n)) || Math.abs(sum - 100) > 1) {
        throw new ApiError('VALIDATION_FAILED', 'Match weights must be numeric percentages summing to 100');
      }
    }
    if (key === 'PAYMENT_COMMISSION_POLICY') {
      const policy = parseCommissionPolicy(value);
      // Phase 1 keeps only the current policy, so a future-dated change would
      // lose the active rate. Require it to be effective now (5-min skew).
      if (Date.parse(policy.effectiveFrom) > Date.now() + 5 * 60_000) {
        throw new ApiError('VALIDATION_FAILED', 'effectiveFrom must be now or in the past (Phase 1)');
      }
    }
    const existing = await this.prisma.platformConfig.findUnique({ where: { key } });
    const row = await this.prisma.platformConfig.upsert({
      where: { key },
      create: {
        key,
        valueJson: (value ?? null) as never,
        version: 1,
        updatedByAccountId: caller.accountId,
      },
      update: {
        valueJson: (value ?? null) as never,
        version: { increment: 1 },
        updatedByAccountId: caller.accountId,
      },
    });
    await this.prisma.auditLog.create({
      data: {
        actorAccountId: caller.accountId,
        actorRole: 'ADMIN',
        action: 'PLATFORM_CONFIG_UPDATED',
        entityType: 'CONFIG',
        entityPublicId: key,
        beforeJson: (existing ? { value: existing.valueJson, version: existing.version } : null) as never,
        afterJson: { value: row.valueJson, version: row.version },
      },
    });
    return { key: row.key, valueJson: row.valueJson, version: row.version, updatedAt: row.updatedAt.toISOString() };
  }

  // ------------------------------------------------- Phase 1 payment oversight

  private listWindow(q: { limit?: number; offset?: number }): { take: number; skip: number } {
    const take = Math.min(Math.max(Number(q.limit ?? 50) || 50, 1), 100);
    const skip = Math.max(Number(q.offset ?? 0) || 0, 0);
    return { take, skip };
  }

  async paymentsOrders(q: {
    limit?: number;
    offset?: number;
    status?: string;
    jobPublicId?: string;
    reference?: string;
    from?: string;
    to?: string;
  }) {
    const { take, skip } = this.listWindow(q);
    const where: Record<string, unknown> = { kind: 'COLLECTION' };
    if (q.status) where.status = { in: q.status.split(',').map((s) => s.trim()).filter(Boolean) };
    if (q.reference) where.reference = { contains: q.reference };
    if (q.jobPublicId) where.job = { publicId: q.jobPublicId };
    if (q.from || q.to) {
      where.createdAt = {
        ...(q.from ? { gte: new Date(q.from) } : {}),
        ...(q.to ? { lte: new Date(q.to) } : {}),
      };
    }
    const [rows, total] = await Promise.all([
      this.prisma.paymentTransaction.findMany({
        where: where as never,
        orderBy: { id: 'desc' },
        take,
        skip,
        include: {
          job: { select: { publicId: true, title: true } },
          _count: { select: { payouts: true } },
          refund: { select: { publicId: true, status: true } },
        },
      }),
      this.prisma.paymentTransaction.count({ where: where as never }),
    ]);
    return {
      data: rows.map((r) => ({
        publicId: r.publicId,
        status: r.status,
        jobPublicId: r.job?.publicId ?? null,
        jobTitle: r.job?.title ?? null,
        grossPaise: r.grossPaise.toString(),
        commissionPaise: r.commissionPaise.toString(),
        netPaise: (r.amountPaise - r.commissionPaise).toString(),
        gatewayFeePaise: r.gatewayFeePaise.toString(),
        taxPaise: r.taxPaise.toString(),
        amountPaise: r.amountPaise.toString(),
        reference: r.reference,
        provider: r.provider,
        providerOrderId: r.providerOrderId,
        failureReason: r.failureReason,
        payouts: r._count.payouts,
        refund: r.refund,
        createdAt: r.createdAt.toISOString(),
        paidAt: r.paidAt?.toISOString() ?? null,
      })),
      meta: { total, take, skip, next: skip + take < total ? skip + take : null },
    };
  }

  async paymentOrderDetail(publicId: string) {
    const order = await this.prisma.paymentTransaction.findUnique({
      where: { publicId },
      include: {
        job: { select: { publicId: true, title: true } },
        recorder: { select: { publicId: true, phone: true } },
        earnings: {
          include: {
            earning: {
              select: {
                publicId: true,
                status: true,
                worker: { select: { publicId: true, fullName: true } },
              },
            },
          },
        },
        payouts: {
          include: { worker: { select: { publicId: true, fullName: true } } },
          orderBy: { id: 'asc' },
        },
        refund: true,
      },
    });
    if (!order) throw new ApiError('NOT_FOUND', 'Payment order not found');
    return {
      publicId: order.publicId,
      kind: order.kind,
      status: order.status,
      jobPublicId: order.job?.publicId ?? null,
      jobTitle: order.job?.title ?? null,
      grossPaise: order.grossPaise.toString(),
      commissionPaise: order.commissionPaise.toString(),
      netPaise: (order.amountPaise - order.commissionPaise).toString(),
      amountPaise: order.amountPaise.toString(),
      gatewayFeePaise: order.gatewayFeePaise.toString(),
      taxPaise: order.taxPaise.toString(),
      currency: order.currency,
      reference: order.reference,
      provider: order.provider,
      providerOrderId: order.providerOrderId,
      providerPaymentId: order.providerPaymentId,
      failureReason: order.failureReason,
      recordedBy: order.recorder,
      allocations: order.earnings.map((pe) => ({
        earningPublicId: pe.earning.publicId,
        earningStatus: pe.earning.status,
        workerPublicId: pe.earning.worker.publicId,
        workerName: pe.earning.worker.fullName,
        grossPaise: (pe.grossPaise ?? pe.amountPaise).toString(),
        commissionPaise: (pe.commissionPaise ?? 0n).toString(),
        netPaise: (pe.netPaise ?? pe.amountPaise).toString(),
      })),
      payouts: order.payouts.map((p) => ({
        publicId: p.publicId,
        status: p.status,
        amountPaise: p.amountPaise.toString(),
        workerPublicId: p.worker.publicId,
        workerName: p.worker.fullName,
        providerTransferId: p.providerTransferId,
        attempts: p.attempts,
        failureReason: p.failureReason,
        createdAt: p.createdAt.toISOString(),
        paidAt: p.paidAt?.toISOString() ?? null,
      })),
      refund: order.refund
        ? {
            publicId: order.refund.publicId,
            status: order.refund.status,
            amountPaise: order.refund.amountPaise.toString(),
            reason: order.refund.reason,
            providerRefundId: order.refund.providerRefundId,
            createdAt: order.refund.createdAt.toISOString(),
          }
        : null,
      createdAt: order.createdAt.toISOString(),
      paidAt: order.paidAt?.toISOString() ?? null,
    };
  }

  async paymentsPayouts(q: { limit?: number; offset?: number; status?: string; jobPublicId?: string }) {
    const { take, skip } = this.listWindow(q);
    const where: Record<string, unknown> = {};
    if (q.status) where.status = { in: q.status.split(',').map((s) => s.trim()).filter(Boolean) };
    if (q.jobPublicId) where.transaction = { job: { publicId: q.jobPublicId } };
    const [rows, total] = await Promise.all([
      this.prisma.payout.findMany({
        where: where as never,
        orderBy: { id: 'desc' },
        take,
        skip,
        include: {
          worker: { select: { publicId: true, fullName: true } },
          earning: { select: { publicId: true } },
          transaction: { select: { publicId: true, job: { select: { publicId: true, title: true } } } },
        },
      }),
      this.prisma.payout.count({ where: where as never }),
    ]);
    return {
      data: rows.map((p) => ({
        publicId: p.publicId,
        status: p.status,
        amountPaise: p.amountPaise.toString(),
        workerPublicId: p.worker.publicId,
        workerName: p.worker.fullName,
        earningPublicId: p.earning.publicId,
        orderPublicId: p.transaction.publicId,
        jobPublicId: p.transaction.job?.publicId ?? null,
        jobTitle: p.transaction.job?.title ?? null,
        providerTransferId: p.providerTransferId,
        attempts: p.attempts,
        failureReason: p.failureReason,
        createdAt: p.createdAt.toISOString(),
        paidAt: p.paidAt?.toISOString() ?? null,
      })),
      meta: { total, take, skip, next: skip + take < total ? skip + take : null },
    };
  }

  async refundOrder(caller: Caller, orderPublicId: string, reason: string) {
    const clean = (reason ?? '').trim();
    if (clean.length < 5) throw new ApiError('VALIDATION_FAILED', 'A refund reason is required');
    return this.phase1.refundCollection(caller.accountId, orderPublicId, clean);
  }

  async retryPayout(caller: Caller, payoutPublicId: string) {
    await this.phase1.retryPayout(caller.accountId, payoutPublicId);
    return { publicId: payoutPublicId, retried: true };
  }

  async forceFailPayout(caller: Caller, payoutPublicId: string, reason: string) {
    const clean = (reason ?? '').trim();
    if (clean.length < 5) throw new ApiError('VALIDATION_FAILED', 'A failure reason is required');
    await this.phase1.failPayout(caller.accountId, payoutPublicId, clean);
    return { publicId: payoutPublicId, status: 'FAILED' };
  }
}

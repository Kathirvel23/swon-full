import { Injectable } from '@nestjs/common';

import { ApiError } from '../common/api-error.js';
import { withIdempotency, type IdempotencyDelegate } from '../common/idempotency.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { assertEarningAction, computeEarningAmount, reconciles } from './payments.domain.js';
import type {
  ApproveEarnings,
  EarningDto,
  MarkPaid,
  PaymentTransactionDto,
} from '@workbridge/contracts';

/**
 * H9 payments — record-only ledger (§36a #6): NO gateway in V1, no platform
 * fees. The system computes amounts (M4 P0/P1), the employer approves (P2)
 * and records payouts (P4) with an exact reconciliation (client total must
 * equal the server's locked amounts or 409 AMOUNT_MISMATCH). Every money
 * write carries an Idempotency-Key (P2/P4) — replays return the original
 * response instead of double-recording. Worker-initiated money transitions
 * are refused (role guard on the controller).
 *
 * Amount policy: locked value = amountPaise + adjustmentPaise (what is
 * actually payable). attendanceMinutes is derived from APPROVED records
 * (NO_SHOW days carry no minutes and never pay).
 */

interface JobLite {
  id: bigint;
  publicId: string;
  title: string;
  startsOn: Date;
  endsOn: Date;
  payType: string;
  payAmountPaise: bigint;
  currency: string;
  employerProfileId: bigint;
}

const decodeSkip = (cursor?: string): number => {
  if (!cursor) return 0;
  const m = /^o:(\d{1,7})$/.exec(cursor);
  if (!m) throw new ApiError('VALIDATION_FAILED', 'Invalid cursor');
  return Number(m[1]);
};

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: DispatcherService,
  ) {}

  private idem(): IdempotencyDelegate {
    return this.prisma.idempotencyKey as unknown as IdempotencyDelegate;
  }

  private async jobLite(jobId: bigint): Promise<JobLite> {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new ApiError('NOT_FOUND', 'Job not found');
    return job as unknown as JobLite;
  }

  /** APPROVED minutes per (job) for the given workers — the earning "days" view. */
  private async approvedMinutes(jobIds: bigint[], workerProfileIds?: bigint[]): Promise<Map<string, number>> {
    if (jobIds.length === 0) return new Map();
    const rows = await this.prisma.attendanceRecord.groupBy({
      by: ['jobId', 'workerProfileId'],
      where: {
        jobId: { in: jobIds },
        status: 'APPROVED',
        ...(workerProfileIds ? { workerProfileId: { in: workerProfileIds } } : {}),
      },
      _sum: { durationMinutes: true },
      _count: { _all: true },
    });
    const map = new Map<string, number>();
    for (const r of rows) {
      map.set(`${r.jobId}:${r.workerProfileId}`, r._sum.durationMinutes ?? 0);
    }
    return map;
  }

  private toDto(
    e: {
      publicId: string;
      status: string;
      amountPaise: bigint;
      adjustmentPaise: number;
      adjustmentReason: string | null;
      currency: string;
      approvedAt: Date | null;
      paidAt: Date | null;
      job: { publicId: string; title: string; startsOn: Date; endsOn: Date };
      worker?: { publicId: string; fullName: string; photoUrl?: string | null } | null;
    },
    minutes: number,
  ): EarningDto {
    return {
      publicId: e.publicId,
      status: e.status as EarningDto['status'],
      amountPaise: Number(e.amountPaise),
      adjustmentPaise: Number(e.adjustmentPaise),
      adjustmentReason: e.adjustmentReason,
      currency: e.currency as 'INR',
      job: {
        publicId: e.job.publicId,
        title: e.job.title,
        startsOn: e.job.startsOn.toISOString(),
        endsOn: e.job.endsOn.toISOString(),
      },
      ...(e.worker
        ? {
            worker: {
              publicId: e.worker.publicId,
              fullName: e.worker.fullName,
              photoUrl: e.worker.photoUrl ?? null,
            },
          }
        : {}),
      attendanceMinutes: minutes,
      approvedAt: e.approvedAt?.toISOString() ?? null,
      paidAt: e.paidAt?.toISOString() ?? null,
      holdReason: null, // holds arrive with complaints (W6)
    };
  }

  // ------------------------------------------------------------------- lists

  async myEarnings(accountId: bigint, q: { cursor?: string; limit: number; status?: string }) {
    const wp = await this.prisma.workerProfile.findUnique({ where: { accountId } });
    if (!wp) throw new ApiError('PROFILE_INCOMPLETE', 'Complete your work profile first');
    const skip = decodeSkip(q.cursor);
    const statuses = q.status ? q.status.split(',').map((s) => s.trim()).filter(Boolean) : undefined;

    const rows = await this.prisma.earning.findMany({
      where: { workerProfileId: wp.id, ...(statuses ? { status: { in: statuses } } : {}) },
      orderBy: { id: 'desc' },
      skip,
      take: q.limit + 1,
      include: { job: { select: { publicId: true, title: true, startsOn: true, endsOn: true } } },
    });
    const hasMore = rows.length > q.limit;
    const page = hasMore ? rows.slice(0, q.limit) : rows;
    const minutes = await this.approvedMinutes(page.map((e) => e.jobId), [wp.id]);

    return {
      data: page.map((e) => this.toDto(e as never, minutes.get(`${e.jobId}:${wp.id}`) ?? 0)),
      meta: { nextCursor: hasMore ? `o:${skip + q.limit}` : null, limit: q.limit },
    };
  }

  async jobEarnings(accountId: bigint, jobPublicId: string, q: { cursor?: string; limit: number; status?: string }) {
    const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
    if (!profile) throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
    const job = await this.prisma.job.findUnique({ where: { publicId: jobPublicId } });
    if (!job || job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Job not found');

    const skip = decodeSkip(q.cursor);
    const statuses = q.status ? q.status.split(',').map((s) => s.trim()).filter(Boolean) : undefined;
    const rows = await this.prisma.earning.findMany({
      where: { jobId: job.id, ...(statuses ? { status: { in: statuses } } : {}) },
      orderBy: { id: 'desc' },
      skip,
      take: q.limit + 1,
      include: {
        job: { select: { publicId: true, title: true, startsOn: true, endsOn: true } },
        worker: { select: { publicId: true, fullName: true } }, // avatars presign with uploads (W6)
      },
    });
    const hasMore = rows.length > q.limit;
    const page = hasMore ? rows.slice(0, q.limit) : rows;
    const minutes = await this.approvedMinutes([job.id]);

    return {
      data: page.map((e) => this.toDto(e as never, minutes.get(`${job.id}:${e.workerProfileId}`) ?? 0)),
      meta: { nextCursor: hasMore ? `o:${skip + q.limit}` : null, limit: q.limit },
    };
  }

  // ----------------------------------------------------------------- approve

  /** P2: ELIGIBLE → APPROVED (amount locked, PAYMENT_APPROVED to workers). */
  async approve(accountId: bigint, body: ApproveEarnings, idempotencyKey?: string) {
    return withIdempotency(this.idem(), {
      key: idempotencyKey,
      route: 'POST /earnings/approve',
      accountId,
      request: { ...body },
      run: async () => {
        const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
        if (!profile) throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
        const earnings = await this.prisma.earning.findMany({
          where: { publicId: { in: body.earningIds } },
          include: { job: { select: { employerProfileId: true, publicId: true } }, worker: { select: { accountId: true } } },
        });
        if (earnings.length !== body.earningIds.length) throw new ApiError('NOT_FOUND', 'Some earnings were not found');
        for (const e of earnings) {
          if (e.job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Some earnings were not found');
          assertEarningAction('approve', e.status);
        }
        await this.prisma.earning.updateMany({
          where: { publicId: { in: body.earningIds }, status: 'ELIGIBLE' },
          data: { status: 'APPROVED', approvedAt: new Date() },
        });
        await this.prisma.auditLog.create({
          data: {
            actorAccountId: accountId,
            actorRole: 'EMPLOYER',
            action: 'EARNINGS_APPROVED',
            entityType: 'EARNING',
            entityPublicId: earnings[0]?.job.publicId ?? '',
            afterJson: { count: earnings.length },
          },
        });
        await this.dispatcher.enqueue({
          eventKey: 'PAYMENT_APPROVED',
          recipientAccountIds: [...new Set(earnings.map((e) => e.worker.accountId))],
          contextType: 'JOB',
          contextPublicId: earnings[0].job.publicId,
          args: { count: String(earnings.length) },
        });
        return { approved: earnings.length };
      },
    });
  }

  // ---------------------------------------------------------------- mark paid

  /**
   * P4: record a payout. Reconciliation is exact — `totalPaise` must equal
   * the server's locked amounts (base + adjustment) in the job's currency,
   * or the whole request is rejected with AMOUNT_MISMATCH. Idempotent on
   * the Idempotency-Key: replaying returns the same transaction, never a
   * second payment.
   */
  async markPaid(accountId: bigint, body: MarkPaid, idempotencyKey?: string): Promise<PaymentTransactionDto> {
    if (body.reference.trim().length < 6) {
      throw new ApiError('VALIDATION_FAILED', 'Payment reference must be at least 6 characters');
    }
    const ids = body.earningIds ?? [];
    if (ids.length === 0) {
      throw new ApiError('VALIDATION_FAILED', 'earningIds required — pick the earnings this payment settles');
    }
    return withIdempotency(this.idem(), {
      key: idempotencyKey,
      route: 'POST /earnings/mark-paid',
      accountId,
      request: { ...body },
      run: async () => {
        const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
        if (!profile) throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
        const earnings = await this.prisma.earning.findMany({
          where: { publicId: { in: ids } },
          include: {
            job: { select: { id: true, publicId: true, employerProfileId: true, currency: true } },
            worker: { select: { id: true, accountId: true } },
          },
        });
        if (earnings.length !== ids.length) throw new ApiError('NOT_FOUND', 'Some earnings were not found');
        for (const e of earnings) {
          if (e.job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Some earnings were not found');
          // P4 status wall runs BEFORE reconciliation: a PENDING earning can
          // never pay, whatever totals the client echoes.
          assertEarningAction('pay', e.status);
        }
        const jobIds = [...new Set(earnings.map((e) => e.job.id))];
        if (jobIds.length !== 1) {
          throw new ApiError('VALIDATION_FAILED', 'One payment records one job');
        }
        const job = await this.jobLite(jobIds[0]);

        const locked = earnings.map((e) => e.amountPaise + e.adjustmentPaise);
        if (!reconciles(locked, BigInt(body.totalPaise), body.currency, job.currency)) {
          throw new ApiError(
            'AMOUNT_MISMATCH',
            `Payment total does not match the locked earnings — expected ${locked.reduce((a, b) => a + b, 0n)} ${job.currency} paise`,
          );
        }

        const now = body.paidAt ? new Date(body.paidAt) : new Date();
        const tx = await this.prisma.$transaction(async (db) => {
          // Re-read inside the transaction: PAID is immutable (P4) even
          // against a racing second request with a different key.
          const fresh = await db.earning.findMany({
            where: { publicId: { in: ids } },
            select: { status: true },
          });
          for (const f of fresh) {
            assertEarningAction('pay', f.status);
          }
          const payment = await db.paymentTransaction.create({
            data: {
              status: 'PAID',
              reference: body.reference,
              amountPaise: BigInt(body.totalPaise),
              currency: body.currency,
              paidAt: now,
              evidenceStorageKey: body.evidenceUploadTicket ?? null,
              recordedByAccountId: accountId,
            },
          });
          await db.paymentEarning.createMany({
            data: earnings.map((e, i) => ({
              paymentTransactionId: payment.id,
              earningId: e.id,
              amountPaise: locked[i],
            })),
          });
          await db.earning.updateMany({
            where: { publicId: { in: ids } },
            data: { status: 'PAID', paidAt: now },
          });
          // P4 side effect: a worker's "jobs done" total ticks up once per
          // worker settled here (used by queue cards).
          const workerIds = [...new Set(earnings.map((e) => e.worker.id))];
          for (const workerId of workerIds) {
            await db.workerProfile.update({
              where: { id: workerId },
              data: { jobsDoneCount: { increment: 1 } },
            });
          }
          return payment;
        });

        await this.prisma.auditLog.create({
          data: {
            actorAccountId: accountId,
            actorRole: 'EMPLOYER',
            action: 'PAYMENT_RECORDED',
            entityType: 'PAYMENT',
            entityPublicId: tx.publicId,
            afterJson: {
              reference: body.reference,
              totalPaise: body.totalPaise,
              currency: body.currency,
              earnings: earnings.length,
            },
          },
        });
        await this.dispatcher.enqueue({
          eventKey: 'PAYMENT_RECORDED',
          recipientAccountIds: [...new Set(earnings.map((e) => e.worker.accountId))],
          contextType: 'JOB',
          contextPublicId: job.publicId,
          args: { reference: body.reference, total: String(body.totalPaise) },
        });

        return {
          publicId: tx.publicId,
          status: tx.status as 'PAID',
          reference: tx.reference,
          amountPaise: Number(tx.amountPaise),
          currency: tx.currency as 'INR',
          paidAt: tx.paidAt?.toISOString() ?? null,
          evidenceUrl: null, // presigned evidence URLs arrive with uploads (W6)
          earnings: earnings.map((e, i) => ({ earningId: e.publicId, amountPaise: Number(locked[i]) })),
        };
      },
    });
  }

  /**
   * J7 + P1: called when the employer completes the job — finalize each
   * crew earning from APPROVED attendance. Zero approved work → CANCELLED
   * (audited), never a silent ₹0 payable.
   */
  async finalizeJobEarnings(jobId: bigint): Promise<{ eligible: number; cancelled: number }> {
    const job = await this.jobLite(jobId);
    const earnings = await this.prisma.earning.findMany({ where: { jobId, status: 'PENDING' } });
    if (earnings.length === 0) return { eligible: 0, cancelled: 0 };
    const minutes = await this.approvedMinutes([jobId]);
    const approvedDays = await this.prisma.attendanceRecord.groupBy({
      by: ['workerProfileId'],
      where: { jobId, status: 'APPROVED' },
      _count: { _all: true },
    });
    const daysByWorker = new Map(approvedDays.map((r) => [r.workerProfileId.toString(), r._count._all]));

    let eligible = 0;
    let cancelled = 0;
    for (const e of earnings) {
      const approvedMinutes = minutes.get(`${jobId}:${e.workerProfileId}`) ?? 0;
      const days = daysByWorker.get(e.workerProfileId.toString()) ?? 0;
      const amount = computeEarningAmount(job.payType, job.payAmountPaise, {
        approvedDays: days,
        approvedMinutes,
      });
      if (amount <= 0n) {
        await this.prisma.earning.update({
          where: { id: e.id },
          data: { status: 'CANCELLED', adjustmentReason: 'No approved attendance' },
        });
        cancelled += 1;
      } else {
        await this.prisma.earning.update({
          where: { id: e.id },
          data: { status: 'ELIGIBLE', amountPaise: amount },
        });
        eligible += 1;
      }
    }
    return { eligible, cancelled };
  }
}

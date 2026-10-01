var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ApiError } from '../common/api-error.js';
import { withIdempotency } from '../common/idempotency.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { assertEarningAction, computeEarningAmount, reconciles } from './payments.domain.js';
const decodeSkip = (cursor) => {
    if (!cursor)
        return 0;
    const m = /^o:(\d{1,7})$/.exec(cursor);
    if (!m)
        throw new ApiError('VALIDATION_FAILED', 'Invalid cursor');
    return Number(m[1]);
};
let PaymentsService = class PaymentsService {
    prisma;
    dispatcher;
    constructor(prisma, dispatcher) {
        this.prisma = prisma;
        this.dispatcher = dispatcher;
    }
    idem() {
        return this.prisma.idempotencyKey;
    }
    async jobLite(jobId) {
        const job = await this.prisma.job.findUnique({ where: { id: jobId } });
        if (!job)
            throw new ApiError('NOT_FOUND', 'Job not found');
        return job;
    }
    async approvedMinutes(jobIds, workerProfileIds) {
        if (jobIds.length === 0)
            return new Map();
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
        const map = new Map();
        for (const r of rows) {
            map.set(`${r.jobId}:${r.workerProfileId}`, r._sum.durationMinutes ?? 0);
        }
        return map;
    }
    toDto(e, minutes) {
        return {
            publicId: e.publicId,
            status: e.status,
            amountPaise: Number(e.amountPaise),
            adjustmentPaise: Number(e.adjustmentPaise),
            adjustmentReason: e.adjustmentReason,
            currency: e.currency,
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
            holdReason: null,
        };
    }
    async myEarnings(accountId, q) {
        const wp = await this.prisma.workerProfile.findUnique({ where: { accountId } });
        if (!wp)
            throw new ApiError('PROFILE_INCOMPLETE', 'Complete your work profile first');
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
            data: page.map((e) => this.toDto(e, minutes.get(`${e.jobId}:${wp.id}`) ?? 0)),
            meta: { nextCursor: hasMore ? `o:${skip + q.limit}` : null, limit: q.limit },
        };
    }
    async jobEarnings(accountId, jobPublicId, q) {
        const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
        if (!profile)
            throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
        const job = await this.prisma.job.findUnique({ where: { publicId: jobPublicId } });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        const skip = decodeSkip(q.cursor);
        const statuses = q.status ? q.status.split(',').map((s) => s.trim()).filter(Boolean) : undefined;
        const rows = await this.prisma.earning.findMany({
            where: { jobId: job.id, ...(statuses ? { status: { in: statuses } } : {}) },
            orderBy: { id: 'desc' },
            skip,
            take: q.limit + 1,
            include: {
                job: { select: { publicId: true, title: true, startsOn: true, endsOn: true } },
                worker: { select: { publicId: true, fullName: true } },
            },
        });
        const hasMore = rows.length > q.limit;
        const page = hasMore ? rows.slice(0, q.limit) : rows;
        const minutes = await this.approvedMinutes([job.id]);
        return {
            data: page.map((e) => this.toDto(e, minutes.get(`${job.id}:${e.workerProfileId}`) ?? 0)),
            meta: { nextCursor: hasMore ? `o:${skip + q.limit}` : null, limit: q.limit },
        };
    }
    async approve(accountId, body, idempotencyKey) {
        return withIdempotency(this.idem(), {
            key: idempotencyKey,
            route: 'POST /earnings/approve',
            accountId,
            request: { ...body },
            run: async () => {
                const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
                if (!profile)
                    throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
                const earnings = await this.prisma.earning.findMany({
                    where: { publicId: { in: body.earningIds } },
                    include: { job: { select: { employerProfileId: true, publicId: true } }, worker: { select: { accountId: true } } },
                });
                if (earnings.length !== body.earningIds.length)
                    throw new ApiError('NOT_FOUND', 'Some earnings were not found');
                for (const e of earnings) {
                    if (e.job.employerProfileId !== profile.id)
                        throw new ApiError('NOT_FOUND', 'Some earnings were not found');
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
    async markPaid(accountId, body, idempotencyKey) {
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
                if (!profile)
                    throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
                const earnings = await this.prisma.earning.findMany({
                    where: { publicId: { in: ids } },
                    include: {
                        job: { select: { id: true, publicId: true, employerProfileId: true, currency: true } },
                        worker: { select: { id: true, accountId: true } },
                    },
                });
                if (earnings.length !== ids.length)
                    throw new ApiError('NOT_FOUND', 'Some earnings were not found');
                for (const e of earnings) {
                    if (e.job.employerProfileId !== profile.id)
                        throw new ApiError('NOT_FOUND', 'Some earnings were not found');
                    assertEarningAction('pay', e.status);
                }
                const jobIds = [...new Set(earnings.map((e) => e.job.id))];
                if (jobIds.length !== 1) {
                    throw new ApiError('VALIDATION_FAILED', 'One payment records one job');
                }
                const job = await this.jobLite(jobIds[0]);
                const locked = earnings.map((e) => e.amountPaise + e.adjustmentPaise);
                if (!reconciles(locked, BigInt(body.totalPaise), body.currency, job.currency)) {
                    throw new ApiError('AMOUNT_MISMATCH', `Payment total does not match the locked earnings — expected ${locked.reduce((a, b) => a + b, 0n)} ${job.currency} paise`);
                }
                const now = body.paidAt ? new Date(body.paidAt) : new Date();
                const tx = await this.prisma.$transaction(async (db) => {
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
                    status: tx.status,
                    reference: tx.reference,
                    amountPaise: Number(tx.amountPaise),
                    currency: tx.currency,
                    paidAt: tx.paidAt?.toISOString() ?? null,
                    evidenceUrl: null,
                    earnings: earnings.map((e, i) => ({ earningId: e.publicId, amountPaise: Number(locked[i]) })),
                };
            },
        });
    }
    async finalizeJobEarnings(jobId) {
        const job = await this.jobLite(jobId);
        const earnings = await this.prisma.earning.findMany({ where: { jobId, status: 'PENDING' } });
        if (earnings.length === 0)
            return { eligible: 0, cancelled: 0 };
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
            }
            else {
                await this.prisma.earning.update({
                    where: { id: e.id },
                    data: { status: 'ELIGIBLE', amountPaise: amount },
                });
                eligible += 1;
            }
        }
        return { eligible, cancelled };
    }
};
PaymentsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        DispatcherService])
], PaymentsService);
export { PaymentsService };
//# sourceMappingURL=payments.service.js.map
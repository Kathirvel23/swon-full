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
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { releaseTarget } from '../complaints/complaints.domain.js';
import { WEIGHTS, WEIGHTS_VERSION } from '../matching/matching.domain.js';
const OPEN_COMPLAINT = ['OPEN', 'UNDER_REVIEW', 'WAITING_ON_PARTY'];
let AdminService = class AdminService {
    prisma;
    dispatcher;
    constructor(prisma, dispatcher) {
        this.prisma = prisma;
        this.dispatcher = dispatcher;
    }
    async stats() {
        const [accounts, workers, employers, suspended, openJobs, hiddenJobs, openComplaints, pendingKyc, unpaidEarnings, heldEarnings,] = await Promise.all([
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
    async auditList(q) {
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
    async searchAccounts(query, status, role) {
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
    async accountDetail(publicId) {
        const account = await this.prisma.account.findUnique({
            where: { publicId },
            include: {
                workerProfile: { select: { publicId: true, fullName: true, city: true } },
                employerProfile: { select: { publicId: true, orgName: true, contactName: true, city: true } },
            },
        });
        if (!account)
            throw new ApiError('NOT_FOUND', 'Account not found');
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
    async sanction(caller, publicId, input) {
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
        if (!target)
            throw new ApiError('NOT_FOUND', 'Account not found');
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
    async jobsList(q) {
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
    async hideJob(caller, publicId, reason) {
        const clean = (reason ?? '').trim();
        if (clean.length < 5)
            throw new ApiError('VALIDATION_FAILED', 'A hide reason is required');
        const job = await this.prisma.job.findUnique({ where: { publicId }, select: { id: true, hiddenAt: true } });
        if (!job)
            throw new ApiError('NOT_FOUND', 'Job not found');
        if (job.hiddenAt)
            throw new ApiError('STATE_INVALID', 'Job is already hidden');
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
    async restoreJob(caller, publicId) {
        const job = await this.prisma.job.findUnique({ where: { publicId }, select: { id: true, hiddenAt: true } });
        if (!job)
            throw new ApiError('NOT_FOUND', 'Job not found');
        if (!job.hiddenAt)
            throw new ApiError('STATE_INVALID', 'Job is not hidden');
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
    async paymentsOverview() {
        const earningInclude = {
            job: { select: { publicId: true, title: true } },
            worker: { select: { fullName: true, accountId: true } },
            holdComplaint: { select: { publicId: true, type: true, status: true } },
        };
        const [awaiting, held, transactions] = await Promise.all([
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
        ]);
        const earningDto = (e) => ({
            publicId: e.publicId,
            amountPaise: e.amountPaise.toString(),
            status: e.status,
            job: e.job,
            workerFullName: e.worker.fullName,
            holdComplaint: 'holdComplaint' in e ? (e.holdComplaint ?? null) : null,
            approvedAt: e.approvedAt?.toISOString() ?? null,
            updatedAt: e.updatedAt.toISOString(),
        });
        return {
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
    async releaseHold(caller, earningPublicId, reason) {
        const clean = (reason ?? '').trim();
        if (clean.length < 5)
            throw new ApiError('VALIDATION_FAILED', 'A release reason is required');
        const earning = await this.prisma.earning.findUnique({
            where: { publicId: earningPublicId },
            select: { id: true, status: true, workerProfileId: true },
        });
        if (!earning)
            throw new ApiError('NOT_FOUND', 'Earning not found');
        if (earning.status !== 'ON_HOLD') {
            throw new ApiError('STATE_INVALID', 'Only ON_HOLD earnings can be released');
        }
        const worker = await this.prisma.workerProfile.findUnique({
            where: { id: earning.workerProfileId },
            select: { accountId: true },
        });
        const target = releaseTarget();
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
    async configSet(caller, key, value) {
        if (!/^[A-Z][A-Z0-9_]{1,59}$/.test(key)) {
            throw new ApiError('VALIDATION_FAILED', 'Keys are UPPER_SNAKE_CASE, 2–60 chars');
        }
        if (value === undefined)
            throw new ApiError('VALIDATION_FAILED', 'A JSON value is required');
        if (key === 'MATCH_WEIGHTS') {
            const w = value;
            const nums = Object.values(w).map((v) => Number(v));
            const sum = nums.reduce((a, b) => a + b, 0);
            if (nums.length === 0 || nums.some((n) => !Number.isFinite(n)) || Math.abs(sum - 100) > 1) {
                throw new ApiError('VALIDATION_FAILED', 'Match weights must be numeric percentages summing to 100');
            }
        }
        const existing = await this.prisma.platformConfig.findUnique({ where: { key } });
        const row = await this.prisma.platformConfig.upsert({
            where: { key },
            create: {
                key,
                valueJson: (value ?? null),
                version: 1,
                updatedByAccountId: caller.accountId,
            },
            update: {
                valueJson: (value ?? null),
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
                beforeJson: (existing ? { value: existing.valueJson, version: existing.version } : null),
                afterJson: { value: row.valueJson, version: row.version },
            },
        });
        return { key: row.key, valueJson: row.valueJson, version: row.version, updatedAt: row.updatedAt.toISOString() };
    }
};
AdminService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        DispatcherService])
], AdminService);
export { AdminService };
//# sourceMappingURL=admin.service.js.map
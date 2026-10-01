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
import { assertEarningAction } from '../payments/payments.domain.js';
import { assertTransition, canReopen, holdEligible, isPartyOfLink, rateLimitOk, releaseTarget, } from './complaints.domain.js';
const actorOf = (role) => {
    if (role === 'admin')
        return 'ADMIN';
    if (role === 'employer')
        return 'EMPLOYER';
    return 'WORKER';
};
let ComplaintsService = class ComplaintsService {
    prisma;
    dispatcher;
    constructor(prisma, dispatcher) {
        this.prisma = prisma;
        this.dispatcher = dispatcher;
    }
    async linkInfo(linkType, linkPublicId) {
        if (linkType === 'JOB') {
            const job = await this.prisma.job.findUnique({
                where: { publicId: linkPublicId },
                include: {
                    employer: { select: { accountId: true } },
                    crew: { select: { workerProfile: { select: { accountId: true } } } },
                },
            });
            if (!job)
                throw new ApiError('NOT_FOUND', 'Linked job not found');
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
            if (!app)
                throw new ApiError('NOT_FOUND', 'Linked application not found');
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
            if (!earning)
                throw new ApiError('NOT_FOUND', 'Linked earning not found');
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
            if (!rec)
                throw new ApiError('NOT_FOUND', 'Linked attendance record not found');
            return {
                linkType: 'ATTENDANCE',
                linkPublicId,
                employerAccountId: rec.job.employer.accountId,
                partyAccountIds: [rec.worker.accountId],
            };
        }
        const target = await this.prisma.account.findUnique({
            where: { publicId: linkPublicId },
            select: { id: true },
        });
        if (!target)
            throw new ApiError('NOT_FOUND', 'Linked account not found');
        return {
            linkType: 'ACCOUNT',
            linkPublicId,
            employerAccountId: 0n,
            partyAccountIds: [target.id],
        };
    }
    async assertParty(caller, linkType, linkPublicId) {
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
    async submit(caller, input) {
        if ((input.linkType && !input.linkPublicId) || (!input.linkType && input.linkPublicId)) {
            throw new ApiError('VALIDATION_FAILED', 'linkType and linkPublicId must be provided together');
        }
        if (input.narrative.trim().length < 20) {
            throw new ApiError('VALIDATION_FAILED', 'Explain the issue in at least 20 characters');
        }
        const info = input.linkType
            ? await this.assertParty(caller, input.linkType, input.linkPublicId)
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
        }));
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
    async my(caller, status) {
        const rows = (await this.prisma.complaint.findMany({
            where: { submitterAccountId: caller.accountId, ...(status ? { status } : {}) },
            include: { events: { orderBy: { createdAt: 'asc' }, take: 50 } },
            orderBy: { createdAt: 'desc' },
            take: 50,
        }));
        return Promise.all(rows.map((r) => this.toDto(r)));
    }
    async reply(caller, publicId, body, tickets = []) {
        const complaint = (await this.prisma.complaint.findUnique({
            where: { publicId },
        }));
        if (!complaint)
            throw new ApiError('NOT_FOUND', 'Complaint not found');
        let authorized = complaint.submitterAccountId === caller.accountId;
        if (!authorized && complaint.linkType && complaint.linkPublicId) {
            const info = await this.linkInfo(complaint.linkType, complaint.linkPublicId);
            authorized =
                complaint.linkType === 'ACCOUNT'
                    ? info.partyAccountIds[0] === caller.accountId
                    : isPartyOfLink({ employerAccountId: info.employerAccountId, partyAccountIds: info.partyAccountIds }, caller.accountId);
        }
        if (!authorized)
            throw new ApiError('NOT_JOB_PARTY', 'You are not a party of this complaint');
        const actor = actorOf(caller.role);
        const statusMoves = complaint.status === 'WAITING_ON_PARTY';
        if (statusMoves)
            assertTransition(complaint.status, 'UNDER_REVIEW', actor);
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
        }));
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
    async adminList(query) {
        const rows = (await this.prisma.complaint.findMany({
            where: {
                ...(query.status ? { status: query.status } : {}),
                ...(query.type ? { type: query.type } : {}),
                ...(query.severity ? { severity: query.severity } : {}),
            },
            include: { events: { orderBy: { createdAt: 'asc' }, take: 50 } },
            take: 50,
        }));
        const rank = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        if (query.sort === 'CREATED_AT') {
            rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
        else {
            rows.sort((a, b) => (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9) ||
                b.createdAt.getTime() - a.createdAt.getTime());
        }
        return Promise.all(rows.map((r) => this.toDto(r)));
    }
    async decide(caller, publicId, update) {
        if (update.note.trim().length < 5) {
            throw new ApiError('VALIDATION_FAILED', 'A decision note is required');
        }
        const complaint = (await this.prisma.complaint.findUnique({
            where: { publicId },
        }));
        if (!complaint)
            throw new ApiError('NOT_FOUND', 'Complaint not found');
        const reopen = update.status === 'OPEN';
        if (reopen) {
            if (!canReopen(complaint.reopenedAt ? 1 : 0)) {
                throw new ApiError('STATE_INVALID', 'This complaint has already been reopened');
            }
        }
        assertTransition(complaint.status, update.status, 'ADMIN');
        if (update.status === 'RESOLVED' && update.sanction) {
            const target = await this.prisma.account.findUnique({
                where: { publicId: update.sanction.accountPublicId },
                select: { id: true },
            });
            if (!target)
                throw new ApiError('NOT_FOUND', 'Sanction target not found');
        }
        const decided = ['RESOLVED', 'DISMISSED', 'CLOSED_TIMEOUT'].includes(update.status);
        const updated = (await this.prisma.$transaction(async (tx) => {
            const row = await tx.complaint.update({
                where: { id: complaint.id },
                data: {
                    status: update.status,
                    resolutionNote: update.note,
                    reopenedAt: reopen ? new Date() : complaint.reopenedAt,
                    resolvedByAccountId: decided ? caller.accountId : update.status === 'OPEN' ? null : complaint.resolvedByAccountId,
                    resolvedAt: decided ? new Date() : update.status === 'OPEN' ? null : complaint.resolvedAt,
                },
            });
            await tx.complaintEvent.create({
                data: { complaintId: complaint.id, actorId: caller.accountId, kind: 'STATUS_CHANGE', body: update.note },
            });
            let sanctionedAccountId = null;
            if (update.status === 'RESOLVED' && update.sanction) {
                const target = await tx.account.findUnique({
                    where: { publicId: update.sanction.accountPublicId },
                    select: { id: true },
                });
                if (!target)
                    throw new ApiError('NOT_FOUND', 'Sanction target not found');
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
        }));
        const participants = new Set([complaint.submitterAccountId.toString()]);
        if (complaint.linkType && complaint.linkPublicId && complaint.linkType !== 'ACCOUNT') {
            const info = await this.linkInfo(complaint.linkType, complaint.linkPublicId);
            for (const id of [info.employerAccountId, ...info.partyAccountIds])
                participants.add(id.toString());
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
        }
        else if (decided || reopen) {
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
    async reinstate(caller, accountPublicId, note) {
        if (note.trim().length < 5) {
            throw new ApiError('VALIDATION_FAILED', 'A reinstatement note is required');
        }
        const account = await this.prisma.account.findUnique({
            where: { publicId: accountPublicId },
            select: { id: true, status: true },
        });
        if (!account)
            throw new ApiError('NOT_FOUND', 'Account not found');
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
    async sweepTimeouts() {
        const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60_000);
        const stale = (await this.prisma.complaint.findMany({
            where: { status: 'WAITING_ON_PARTY', updatedAt: { lt: cutoff } },
            take: 20,
        }));
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
            }
            catch {
            }
        }
        return closed;
    }
    async toDto(row) {
        const events = (await this.prisma.complaintEvent.findMany({
            where: { complaintId: row.id },
            orderBy: { createdAt: 'asc' },
            take: 100,
        }));
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
            type: row.type,
            severity: row.severity,
            status: row.status,
            link: resolvedBody,
            narrative: row.narrative,
            resolutionNote: row.resolutionNote,
            resolvedAt: row.resolvedAt?.toISOString() ?? null,
            events: events.map((e) => {
                const a = actorMap.get(e.actorId.toString());
                return {
                    publicId: e.publicId,
                    kind: e.kind,
                    body: e.body,
                    actor: {
                        publicId: a?.publicId ?? 'unknown',
                        role: (a?.role ?? 'worker'),
                        displayName: a?.workerProfile?.fullName ?? a?.employerProfile?.orgName ?? 'SWON user',
                    },
                    evidenceUrl: null,
                    createdAt: e.createdAt.toISOString(),
                };
            }),
            createdAt: row.createdAt.toISOString(),
            updatedAt: row.updatedAt.toISOString(),
        };
    }
};
ComplaintsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        DispatcherService])
], ComplaintsService);
export { ComplaintsService };
//# sourceMappingURL=complaints.service.js.map
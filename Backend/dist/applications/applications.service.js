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
import { PrismaService } from '../prisma/prisma.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { decodeOffset } from '../jobs/jobs.service.js';
import { assertApplicationAction, assertCanApply, assertWithdraw, statusAfterFirstApplication, statusAfterHire, statusAfterRelease, windowsOverlap, } from './applications.domain.js';
const isoDate = (d) => d.toISOString().slice(0, 10);
const decodeQueueOffset = decodeOffset;
let ApplicationsService = class ApplicationsService {
    prisma;
    dispatcher;
    constructor(prisma, dispatcher) {
        this.prisma = prisma;
        this.dispatcher = dispatcher;
    }
    async workerProfile(accountId) {
        const profile = await this.prisma.workerProfile.findUnique({ where: { accountId } });
        if (!profile) {
            throw new ApiError('PROFILE_INCOMPLETE', 'Complete your work profile first');
        }
        return profile;
    }
    async employerProfile(accountId) {
        const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
        if (!profile) {
            throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
        }
        return profile;
    }
    async kycStatusOf(accountId) {
        const sub = await this.prisma.kycSubmission.findFirst({
            where: { accountId },
            orderBy: { createdAt: 'desc' },
            select: { status: true },
        });
        return sub?.status ?? 'NONE';
    }
    async kycBadges(accountIds) {
        const map = new Map();
        if (accountIds.length === 0)
            return map;
        const subs = await this.prisma.kycSubmission.findMany({
            where: { accountId: { in: accountIds } },
            orderBy: { createdAt: 'desc' },
            select: { accountId: true, status: true },
        });
        for (const id of accountIds)
            map.set(id.toString(), false);
        for (const s of subs) {
            const k = s.accountId.toString();
            if (!map.get(k))
                map.set(k, s.status === 'VERIFIED');
        }
        return map;
    }
    async audit(accountId, role, action, publicId, entityType = 'APPLICATION') {
        await this.prisma.auditLog.create({
            data: { actorAccountId: accountId, actorRole: role, action, entityType, entityPublicId: publicId },
        });
    }
    idem() {
        return this.prisma.idempotencyKey;
    }
    async assertNoConflict(db, workerProfileId, job) {
        const rows = await db.crewMember.findMany({
            where: { workerProfileId, status: 'ACTIVE', jobId: { not: job.id } },
            select: { job: { select: { startsOn: true, endsOn: true, title: true } } },
        });
        const s = isoDate(job.startsOn);
        const e = isoDate(job.endsOn);
        for (const row of rows) {
            if (windowsOverlap(s, e, isoDate(row.job.startsOn), isoDate(row.job.endsOn))) {
                throw new ApiError('CREW_DOUBLE_JOB', `Already crewed on ${row.job.title} for an overlapping date range`);
            }
        }
    }
    async apply(accountId, input, idempotencyKey) {
        const wp = await this.workerProfile(accountId);
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            select: { status: true },
        });
        if (account && account.status === 'SUSPENDED') {
            throw new ApiError('ACCOUNT_SUSPENDED', 'Account suspended');
        }
        const kyc = await this.kycStatusOf(accountId);
        if (kyc !== 'VERIFIED') {
            throw new ApiError('KYC_REQUIRED', 'KYC verification is required before applying.');
        }
        return withIdempotency(this.idem(), {
            key: idempotencyKey,
            route: 'POST /applications',
            accountId,
            request: { ...input },
            run: async () => {
                const created = await this.prisma.$transaction(async (tx) => {
                    const job = await tx.job.findUnique({ where: { publicId: input.jobId } });
                    if (!job)
                        throw new ApiError('NOT_FOUND', 'Job not found');
                    await tx.$queryRaw `SELECT id FROM job WHERE id = ${job.id} FOR UPDATE`;
                    const locked = await tx.job.findUnique({ where: { id: job.id } });
                    if (!locked)
                        throw new ApiError('NOT_FOUND', 'Job not found');
                    assertCanApply(locked.status, locked.headcountRequired, locked.hiredCount);
                    const existing = await tx.application.findFirst({
                        where: { jobId: locked.id, workerProfileId: wp.id },
                        select: { publicId: true },
                    });
                    if (existing)
                        throw new ApiError('DUPLICATE_APPLICATION', 'You already applied');
                    await this.assertNoConflict(tx, wp.id, locked);
                    let source = 'APPLY';
                    if (input.offerId) {
                        const offer = await tx.quickMatchOffer.findUnique({
                            where: { publicId: input.offerId },
                        });
                        if (!offer || offer.workerProfileId !== wp.id) {
                            throw new ApiError('NOT_FOUND', 'Offer not found');
                        }
                        if (offer.jobId !== locked.id) {
                            throw new ApiError('VALIDATION_FAILED', 'Offer belongs to a different job');
                        }
                        const claimed = await tx.quickMatchOffer.updateMany({
                            where: { id: offer.id, status: 'PENDING', respondBy: { gte: new Date() } },
                            data: { status: 'ACCEPTED', respondedAt: new Date() },
                        });
                        if (claimed.count === 0) {
                            if (offer.status !== 'PENDING') {
                                throw new ApiError('STATE_INVALID', `Offer already ${offer.status.toLowerCase()}`);
                            }
                            throw new ApiError('QUICKMATCH_EXPIRED', 'This offer has expired');
                        }
                        source = 'QUICK_MATCH';
                    }
                    const app = await tx.application.create({
                        data: {
                            jobId: locked.id,
                            workerProfileId: wp.id,
                            status: 'APPLIED',
                            source,
                            coverNote: input.coverNote ?? null,
                        },
                    });
                    const jobStatus = statusAfterFirstApplication(locked.status);
                    await tx.job.update({
                        where: { id: locked.id },
                        data: {
                            status: jobStatus,
                            applicationCount: { increment: 1 },
                        },
                    });
                    return { app, job: locked };
                }).catch((e) => {
                    if (e.code === 'P2002') {
                        throw new ApiError('DUPLICATE_APPLICATION', 'You already applied');
                    }
                    throw e;
                });
                await this.audit(accountId, 'WORKER', 'APPLICATION_SUBMITTED', created.app.publicId);
                const employerAccount = await this.prisma.employerProfile.findUnique({
                    where: { id: created.job.employerProfileId },
                    select: { accountId: true },
                });
                await this.dispatcher.enqueue({
                    eventKey: 'APPLICATION_SUBMITTED',
                    recipientAccountIds: [accountId],
                    contextType: 'APPLICATION',
                    contextPublicId: created.app.publicId,
                    args: { jobTitle: created.job.title, status: 'APPLIED' },
                });
                if (employerAccount) {
                    await this.dispatcher.enqueue({
                        eventKey: 'APPLICATION_RECEIVED',
                        recipientAccountIds: [employerAccount.accountId],
                        contextType: 'JOB',
                        contextPublicId: created.job.publicId,
                        args: { jobTitle: created.job.title },
                    });
                }
                return { publicId: created.app.publicId, status: 'APPLIED', jobId: created.job.publicId };
            },
        });
    }
    async mine(accountId, query) {
        const wp = await this.workerProfile(accountId);
        const limit = Math.min(Math.max(query.limit ?? 20, 1), 50);
        const skip = decodeQueueOffset(query.cursor);
        const statuses = query.status ? query.status.split(',').filter(Boolean) : undefined;
        const and = [];
        if (statuses)
            and.push({ status: { in: statuses } });
        if (query.active) {
            and.push({
                status: { in: ['APPLIED', 'SHORTLISTED', 'WAITLISTED', 'HIRED'] },
                job: { endsOn: { gte: new Date() }, status: { notIn: ['CANCELLED', 'EXPIRED'] } },
            });
        }
        const where = {
            workerProfileId: wp.id,
            ...(and.length ? { AND: and } : {}),
        };
        const rows = await this.prisma.application.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit + 1,
            include: {
                crewMember: { select: { status: true } },
                job: {
                    select: {
                        publicId: true,
                        title: true,
                        city: true,
                        startsOn: true,
                        endsOn: true,
                        payAmountPaise: true,
                        payType: true,
                        headcountRequired: true,
                        hiredCount: true,
                        status: true,
                        area: { select: { name: true } },
                        employer: { select: { orgName: true } },
                    },
                },
            },
        });
        const data = rows.map((r) => ({
            publicId: r.publicId,
            status: r.status,
            source: r.source,
            appliedAt: r.createdAt.toISOString(),
            decidedAt: r.decidedAt?.toISOString() ?? null,
            decisionNote: r.decisionNote,
            job: {
                publicId: r.job.publicId,
                title: r.job.title,
                city: r.job.city,
                areaName: r.job.area.name,
                startsOn: isoDate(r.job.startsOn),
                endsOn: isoDate(r.job.endsOn),
                payAmountPaise: Number(r.job.payAmountPaise),
                payType: r.job.payType,
                headcountRequired: r.job.headcountRequired,
                hiredCount: r.job.hiredCount,
                employerName: r.job.employer.orgName,
                status: r.job.status,
            },
            crewSeat: r.crewMember?.status ?? 'NONE',
        }));
        const hasMore = rows.length > limit;
        return {
            data,
            meta: { next: hasMore ? `o:${skip + limit}` : undefined },
        };
    }
    async withdraw(accountId, publicId, input) {
        const wp = await this.workerProfile(accountId);
        const app = await this.prisma.application.findUnique({
            where: { publicId },
            include: { job: { select: { id: true, publicId: true, title: true, status: true } } },
        });
        if (!app || app.workerProfileId !== wp.id)
            throw new ApiError('NOT_FOUND', 'Application not found');
        assertWithdraw(app.status, app.job.status);
        const wasHired = app.status === 'HIRED';
        const result = await this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM job WHERE id = ${app.job.id} FOR UPDATE`;
            const locked = await tx.job.findUnique({ where: { id: app.job.id } });
            if (!locked)
                throw new ApiError('NOT_FOUND', 'Job not found');
            const fresh = await tx.application.findUnique({ where: { id: app.id }, select: { status: true } });
            if (!fresh)
                throw new ApiError('NOT_FOUND', 'Application not found');
            assertWithdraw(fresh.status, locked.status);
            await tx.application.update({
                where: { id: app.id },
                data: { status: 'WITHDRAWN', decidedAt: new Date(), decisionNote: input?.reason ?? null },
            });
            let hiredCountAfter = locked.hiredCount;
            if (wasHired) {
                await tx.crewMember.updateMany({
                    where: { applicationId: app.id, status: 'ACTIVE' },
                    data: { status: 'RELEASED', releasedAt: new Date(), releasedReason: input?.reason ?? 'Worker withdrew' },
                });
                hiredCountAfter = Math.max(0, locked.hiredCount - 1);
                await tx.job.update({
                    where: { id: locked.id },
                    data: { hiredCount: hiredCountAfter, status: statusAfterRelease(hiredCountAfter, locked.headcountRequired) },
                });
            }
            return { status: 'WITHDRAWN', freedSeat: wasHired, jobStatus: wasHired ? undefined : locked.status };
        });
        await this.audit(accountId, 'WORKER', 'APPLICATION_WITHDRAWN', publicId);
        const employer = await this.prisma.employerProfile.findUnique({
            where: { id: (await this.prisma.job.findUnique({ where: { id: app.job.id }, select: { employerProfileId: true } }))?.employerProfileId ?? 0n },
            select: { accountId: true },
        }).catch(() => null);
        if (employer) {
            await this.dispatcher.enqueue({
                eventKey: 'APPLICATION_WITHDRAWN',
                recipientAccountIds: [employer.accountId],
                contextType: 'APPLICATION',
                contextPublicId: publicId,
                args: { jobTitle: app.job.title },
            });
        }
        if (result.freedSeat) {
            await this.notifyShortfall(app.job.id, app.job.title);
        }
        return { publicId, status: result.status };
    }
    async notifyShortfall(jobId, jobTitle) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            select: { publicId: true, headcountRequired: true, hiredCount: true, employerProfileId: true },
        });
        if (!job)
            return;
        const employer = await this.prisma.employerProfile.findUnique({
            where: { id: job.employerProfileId },
            select: { accountId: true },
        });
        if (!employer)
            return;
        await this.dispatcher.enqueue({
            eventKey: 'JOB_SHORTFALL',
            recipientAccountIds: [employer.accountId],
            contextType: 'JOB',
            contextPublicId: job.publicId,
            args: { jobTitle, seatsLeft: String(job.headcountRequired - job.hiredCount) },
        });
    }
    async queue(accountId, jobPublicId, query) {
        const profile = await this.employerProfile(accountId);
        const job = await this.prisma.job.findUnique({
            where: { publicId: jobPublicId },
            select: {
                id: true,
                publicId: true,
                title: true,
                startsOn: true,
                endsOn: true,
                headcountRequired: true,
                hiredCount: true,
                status: true,
                employerProfileId: true,
                area: { select: { lat: true, lng: true } },
            },
        });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        const limit = Math.min(Math.max(query.limit ?? 20, 1), 50);
        const skip = decodeQueueOffset(query.cursor);
        const statuses = query.status ? query.status.split(',').filter(Boolean) : undefined;
        const where = {
            jobId: job.id,
            ...(statuses ? { status: { in: statuses } } : { status: { in: ['APPLIED', 'SHORTLISTED', 'WAITLISTED', 'HIRED'] } }),
        };
        let rows = await this.prisma.application.findMany({
            where,
            orderBy: query.sort === 'RATING'
                ? [{ workerProfile: { avgRatingMilli: 'desc' } }, { createdAt: 'asc' }]
                : { createdAt: query.sort === 'APPLIED_AT' ? 'asc' : 'asc' },
            ...(query.sort === 'DISTANCE' ? {} : { skip }),
            take: query.sort === 'DISTANCE' ? 500 : limit + 1,
            include: {
                workerProfile: {
                    select: {
                        id: true,
                        publicId: true,
                        fullName: true,
                        photoStorageKey: true,
                        avgRatingMilli: true,
                        ratingsCount: true,
                        jobsDoneCount: true,
                        experienceYears: true,
                        accountId: true,
                        skills: { select: { skill: { select: { publicId: true, name: true } } } },
                        area: { select: { lat: true, lng: true, name: true } },
                    },
                },
            },
        });
        if (query.sort === 'DISTANCE') {
            const jobArea = { lat: dec(job.area.lat), lng: dec(job.area.lng) };
            rows = rows
                .map((r) => ({ r, d: distanceKm(jobArea, { lat: dec(r.workerProfile.area?.lat ?? null), lng: dec(r.workerProfile.area?.lng ?? null) }) }))
                .sort((a, b) => (a.d ?? 1e9) - (b.d ?? 1e9))
                .slice(skip, skip + limit + 1)
                .map((x) => x.r);
        }
        const page = rows.slice(0, limit);
        const total = await this.prisma.application.count({ where });
        const workerIds = page.map((r) => r.workerProfile.id);
        const overlapping = workerIds.length
            ? await this.prisma.crewMember.findMany({
                where: { workerProfileId: { in: workerIds }, status: 'ACTIVE', jobId: { not: job.id } },
                select: { workerProfileId: true, job: { select: { startsOn: true, endsOn: true } } },
            })
            : [];
        const conflictIds = new Set();
        for (const c of overlapping) {
            if (windowsOverlap(isoDate(job.startsOn), isoDate(job.endsOn), isoDate(c.job.startsOn), isoDate(c.job.endsOn))) {
                conflictIds.add(c.workerProfileId.toString());
            }
        }
        const badges = await this.kycBadges(page.map((r) => r.workerProfile.accountId));
        const data = page.map((r) => ({
            application: {
                publicId: r.publicId,
                status: r.status,
                source: r.source,
                appliedAt: r.createdAt.toISOString(),
                decidedAt: r.decidedAt?.toISOString() ?? null,
                decisionNote: r.decisionNote,
                coverNote: r.coverNote,
                worker: {
                    publicId: r.workerProfile.publicId,
                    fullName: r.workerProfile.fullName,
                    photoUrl: r.workerProfile.photoStorageKey ? `/files/${r.workerProfile.photoStorageKey}` : null,
                    avgRatingMilli: r.workerProfile.avgRatingMilli,
                    ratingsCount: r.workerProfile.ratingsCount,
                    jobsDoneCount: r.workerProfile.jobsDoneCount,
                    kycBadge: badges.get(r.workerProfile.accountId.toString()) ?? false,
                    skills: r.workerProfile.skills.map((s) => ({ skillId: s.skill.publicId, name: s.skill.name })),
                },
                conflictWarning: conflictIds.has(r.workerProfile.id.toString()),
            },
        }));
        const hasMore = query.sort === 'DISTANCE' ? skip + page.length < Math.min(total, 500) : rows.length > limit;
        return { data, meta: { next: hasMore ? `o:${skip + limit}` : undefined } };
    }
    async decide(accountId, applicationPublicId, input, idempotencyKey) {
        await this.employerProfile(accountId);
        return withIdempotency(this.idem(), {
            key: idempotencyKey,
            route: `POST /applications/${applicationPublicId}/decision`,
            accountId,
            request: { ...input },
            run: () => this.decideCore(accountId, applicationPublicId, input),
        });
    }
    async decideCore(accountId, applicationPublicId, input) {
        const app = await this.prisma.application.findUnique({
            where: { publicId: applicationPublicId },
            include: {
                job: { select: { id: true, publicId: true, title: true, status: true, employerProfileId: true } },
                workerProfile: { select: { id: true, accountId: true, fullName: true } },
            },
        });
        if (!app)
            throw new ApiError('NOT_FOUND', 'Application not found');
        if (app.job.employerProfileId !== (await this.employerProfile(accountId)).id) {
            throw new ApiError('NOT_FOUND', 'Application not found');
        }
        if (input.action === 'hire')
            return this.hireCore(accountId, app, input.note);
        if (input.action === 'release')
            return this.releaseCore(accountId, app, input.reason);
        assertApplicationAction(input.action, app.status);
        await this.prisma.application.update({
            where: { id: app.id },
            data: {
                status: input.action === 'shortlist' ? 'SHORTLISTED' : input.action === 'waitlist' ? 'WAITLISTED' : 'REJECTED',
                decidedAt: new Date(),
                decisionNote: input.note ?? null,
            },
        });
        await this.audit(accountId, 'EMPLOYER', `APPLICATION_${input.action.toUpperCase()}ED`.replace('REJECTEED', 'REJECTED'), applicationPublicId);
        const eventKey = input.action === 'shortlist'
            ? 'APPLICATION_SHORTLISTED'
            : input.action === 'waitlist'
                ? 'APPLICATION_WAITLISTED'
                : 'APPLICATION_REJECTED';
        await this.dispatcher.enqueue({
            eventKey,
            recipientAccountIds: [app.workerProfile.accountId],
            contextType: 'APPLICATION',
            contextPublicId: applicationPublicId,
            args: { jobTitle: app.job.title, note: input.note ?? '', status: input.action.toUpperCase() },
        });
        return { publicId: applicationPublicId, status: (input.action === 'shortlist' ? 'SHORTLISTED' : input.action === 'waitlist' ? 'WAITLISTED' : 'REJECTED') };
    }
    async hireCore(accountId, app, note) {
        assertApplicationAction('hire', app.status);
        const out = await this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM job WHERE id = ${app.job.id} FOR UPDATE`;
            const job = await tx.job.findUnique({ where: { id: app.job.id } });
            if (!job)
                throw new ApiError('NOT_FOUND', 'Job not found');
            const fresh = await tx.application.findUnique({ where: { id: app.id }, select: { status: true } });
            if (!fresh)
                throw new ApiError('NOT_FOUND', 'Application not found');
            assertApplicationAction('hire', fresh.status);
            if (job.status === 'CANCELLED' || job.status === 'EXPIRED') {
                throw new ApiError('JOB_CANCELLED', 'Job is no longer active');
            }
            if (job.status === 'IN_PROGRESS' || job.status === 'COMPLETED' || job.status === 'CLOSED') {
                throw new ApiError('STATE_INVALID', 'Hiring window closed');
            }
            if (job.hiredCount >= job.headcountRequired) {
                throw new ApiError(job.status === 'FILLED' ? 'HIRE_RACE_LOST' : 'JOB_ALREADY_FILLED', 'No seats left');
            }
            const kyc = await this.kycStatusOf(app.workerProfile.accountId);
            if (kyc !== 'VERIFIED') {
                throw new ApiError('KYC_REQUIRED', 'Worker must complete identity verification first');
            }
            const workerAccount = await tx.account.findUnique({
                where: { id: app.workerProfile.accountId },
                select: { status: true },
            });
            if (workerAccount?.status === 'SUSPENDED') {
                throw new ApiError('ACCOUNT_SUSPENDED', 'Worker account suspended');
            }
            await this.assertNoConflict(tx, app.workerProfile.id, job);
            const crew = await tx.crewMember.create({
                data: {
                    jobId: job.id,
                    applicationId: app.id,
                    workerProfileId: app.workerProfile.id,
                    status: 'ACTIVE',
                    hiredAt: new Date(),
                },
            });
            const hireJob = await tx.job.findUnique({ where: { id: job.id }, select: { currency: true } });
            const workDayIds = (await tx.jobWorkDay.findMany({ where: { jobId: job.id }, select: { id: true } })).map((w) => w.id);
            if (workDayIds.length > 0) {
                await tx.attendanceRecord.createMany({
                    data: workDayIds.map((workDayId) => ({
                        jobId: job.id,
                        workDayId,
                        workerProfileId: app.workerProfile.id,
                        crewMemberId: crew.id,
                    })),
                });
            }
            await tx.earning.create({
                data: {
                    jobId: job.id,
                    workerProfileId: app.workerProfile.id,
                    amountPaise: 0n,
                    currency: hireJob?.currency ?? 'INR',
                },
            });
            await tx.application.update({
                where: { id: app.id },
                data: { status: 'HIRED', decidedAt: new Date(), decisionNote: note ?? null },
            });
            const hiredCountAfter = job.hiredCount + 1;
            const jobStatus = statusAfterHire(hiredCountAfter, job.headcountRequired);
            await tx.job.update({
                where: { id: job.id },
                data: { hiredCount: hiredCountAfter, status: jobStatus },
            });
            return { crewPublicId: crew.publicId, jobStatus, hiredCountAfter };
        });
        await this.audit(accountId, 'EMPLOYER', 'APPLICATION_HIRED', app.publicId);
        await this.dispatcher.enqueue({
            eventKey: 'HIRED',
            recipientAccountIds: [app.workerProfile.accountId],
            contextType: 'APPLICATION',
            contextPublicId: app.publicId,
            args: { jobTitle: app.job.title, status: 'HIRED' },
        });
        if (out.jobStatus === 'FILLED') {
            const employer = await this.prisma.employerProfile.findUnique({
                where: { id: app.job.employerProfileId },
                select: { accountId: true },
            });
            if (employer) {
                await this.dispatcher.enqueue({
                    eventKey: 'JOB_STAFFED',
                    recipientAccountIds: [employer.accountId],
                    contextType: 'JOB',
                    contextPublicId: app.job.publicId,
                    args: { jobTitle: app.job.title },
                });
            }
        }
        return { publicId: app.publicId, status: 'HIRED' };
    }
    async releaseCore(accountId, app, reason) {
        if (!reason || !reason.trim()) {
            throw new ApiError('VALIDATION_FAILED', 'A release reason is required');
        }
        assertApplicationAction('release', app.status);
        await this.prisma.$transaction(async (tx) => {
            await tx.$queryRaw `SELECT id FROM job WHERE id = ${app.job.id} FOR UPDATE`;
            const job = await tx.job.findUnique({ where: { id: app.job.id } });
            if (!job)
                throw new ApiError('NOT_FOUND', 'Job not found');
            const fresh = await tx.application.findUnique({ where: { id: app.id }, select: { status: true } });
            if (!fresh)
                throw new ApiError('NOT_FOUND', 'Application not found');
            assertApplicationAction('release', fresh.status);
            if (job.status === 'IN_PROGRESS' || job.status === 'COMPLETED' || job.status === 'CLOSED') {
                throw new ApiError('STATE_INVALID', 'Work already started');
            }
            await tx.crewMember.updateMany({
                where: { applicationId: app.id, status: 'ACTIVE' },
                data: { status: 'RELEASED', releasedAt: new Date(), releasedReason: reason },
            });
            await tx.application.update({
                where: { id: app.id },
                data: { status: 'CANCELLED', decidedAt: new Date(), decisionNote: reason },
            });
            const hiredCountAfter = Math.max(0, job.hiredCount - 1);
            await tx.job.update({
                where: { id: job.id },
                data: { hiredCount: hiredCountAfter, status: statusAfterRelease(hiredCountAfter, job.headcountRequired) },
            });
        });
        await this.audit(accountId, 'EMPLOYER', 'APPLICATION_RELEASED', app.publicId);
        await this.dispatcher.enqueue({
            eventKey: 'APPLICATION_REJECTED',
            recipientAccountIds: [app.workerProfile.accountId],
            contextType: 'APPLICATION',
            contextPublicId: app.publicId,
            args: { jobTitle: app.job.title, reason, status: 'RELEASED' },
        });
        await this.notifyShortfall(app.job.id, app.job.title);
        return { publicId: app.publicId, status: 'CANCELLED' };
    }
    async bulk(accountId, input) {
        await this.employerProfile(accountId);
        const ids = [...new Set(input.items.map((i) => i.applicationId))];
        const apps = await this.prisma.application.findMany({
            where: { publicId: { in: ids } },
            include: {
                job: { select: { id: true, publicId: true, title: true, status: true, employerProfileId: true } },
                workerProfile: { select: { id: true, accountId: true, fullName: true } },
            },
        });
        const byId = new Map(apps.map((a) => [a.publicId, a]));
        const jobIdSet = new Set(apps.map((a) => a.job.id));
        const results = [];
        let current = null;
        try {
            for (const item of input.items) {
                current = item;
                const app = byId.get(item.applicationId);
                if (!app) {
                    results.push({ applicationId: item.applicationId, ok: false, code: 'NOT_FOUND' });
                    throw new Error('bulk-abort');
                }
                if (jobIdSet.size !== 1) {
                    results.push({ applicationId: item.applicationId, ok: false, code: 'VALIDATION_FAILED' });
                    throw new Error('bulk-abort');
                }
                if (app.job.employerProfileId !== (await this.employerProfile(accountId)).id) {
                    results.push({ applicationId: item.applicationId, ok: false, code: 'NOT_FOUND' });
                    throw new Error('bulk-abort');
                }
                const core = item.action === 'hire'
                    ? await this.hireCore(accountId, app, item.note)
                    : item.action === 'release'
                        ? await this.releaseCore(accountId, app, item.reason)
                        : await this.decideCore(accountId, item.applicationId, item);
                results.push({ applicationId: item.applicationId, ok: true, status: core.status });
            }
        }
        catch (e) {
            if (e instanceof Error && e.message === 'bulk-abort') {
                throw new ApiError('VALIDATION_FAILED', 'Bulk request rejected — rows reported per §14, earlier rows already committed', {
                    results: [
                        ...results,
                        ...input.items
                            .filter((i) => !results.find((r) => r.applicationId === i.applicationId))
                            .map((i) => ({ applicationId: i.applicationId, ok: false, code: 'NOT_APPLIED' })),
                    ],
                });
            }
            const code = e instanceof ApiError ? e.code : 'VALIDATION_FAILED';
            const done = [...results];
            if (current)
                done.push({ applicationId: current.applicationId, ok: false, code });
            throw new ApiError('VALIDATION_FAILED', 'Bulk request rejected — see per-row results', {
                results: [
                    ...done,
                    ...input.items
                        .filter((i) => !done.find((r) => r.applicationId === i.applicationId))
                        .map((i) => ({ applicationId: i.applicationId, ok: false, code: 'NOT_APPLIED' })),
                ],
            });
        }
        return {
            results,
            succeeded: results.filter((r) => r.ok).length,
            failed: results.filter((r) => !r.ok).length,
        };
    }
    async roster(accountId, jobPublicId, query) {
        const profile = await this.employerProfile(accountId);
        const job = await this.prisma.job.findUnique({
            where: { publicId: jobPublicId },
            select: {
                id: true,
                publicId: true,
                status: true,
                headcountRequired: true,
                hiredCount: true,
                employerProfileId: true,
            },
        });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        const limit = Math.min(Math.max(query.limit ?? 20, 1), 50);
        const skip = decodeQueueOffset(query.cursor);
        const [rows, released] = await Promise.all([
            this.prisma.crewMember.findMany({
                where: { jobId: job.id, ...(query.status ? { status: query.status } : {}) },
                orderBy: { hiredAt: 'asc' },
                skip,
                take: limit + 1,
                include: {
                    application: { select: { publicId: true } },
                    workerProfile: {
                        select: {
                            publicId: true,
                            fullName: true,
                            photoStorageKey: true,
                            avgRatingMilli: true,
                            ratingsCount: true,
                            experienceYears: true,
                            accountId: true,
                            skills: { select: { skill: { select: { publicId: true, name: true } } } },
                        },
                    },
                },
            }),
            this.prisma.crewMember.count({ where: { jobId: job.id, status: 'RELEASED' } }),
        ]);
        const badges = await this.kycBadges(rows.map((r) => r.workerProfile.accountId));
        const items = rows.map((r) => ({
            publicId: r.publicId,
            status: r.status,
            hiredAt: r.hiredAt.toISOString(),
            releasedAt: r.releasedAt?.toISOString() ?? null,
            releasedReason: r.releasedReason,
            applicationPublicId: r.application.publicId,
            worker: {
                publicId: r.workerProfile.publicId,
                fullName: r.workerProfile.fullName,
                photoUrl: r.workerProfile.photoStorageKey ? `/files/${r.workerProfile.photoStorageKey}` : null,
                avgRatingMilli: r.workerProfile.avgRatingMilli,
                ratingsCount: r.workerProfile.ratingsCount,
                experienceYears: r.workerProfile.experienceYears,
                skills: r.workerProfile.skills.map((s) => ({ skillId: s.skill.publicId, name: s.skill.name })),
                kycBadge: badges.get(r.workerProfile.accountId.toString()) ?? false,
            },
        }));
        const hasMore = rows.length > limit;
        const summary = {
            seatsRequired: job.headcountRequired,
            seatsFilled: job.hiredCount,
            seatsReleased: released,
            jobStatus: job.status,
        };
        return { data: { items, summary }, meta: { next: hasMore ? `o:${skip + limit}` : undefined } };
    }
};
ApplicationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        DispatcherService])
], ApplicationsService);
export { ApplicationsService };
const dec = (v) => (v === null ? null : Number(v.toString()));
const distanceKm = (a, b) => {
    if (a.lat === null || a.lng === null || b.lat === null || b.lng === null)
        return null;
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const s = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return Math.round(2 * R * Math.asin(Math.sqrt(s)) * 10) / 10;
};
//# sourceMappingURL=applications.service.js.map
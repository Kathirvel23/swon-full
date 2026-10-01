var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JobsService_1;
import { Injectable, Logger } from '@nestjs/common';
import { ApiError } from '../common/api-error.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { assertJobAction, deriveWorkDays, payLabel, } from './jobs.domain.js';
const JOB_INCLUDE = {
    category: true,
    area: true,
    workDays: { orderBy: { workDate: 'asc' } },
    skills: { include: { skill: true } },
    welfare: { include: { welfareItem: true } },
    employer: true,
};
const hhmm = (d) => d.toISOString().slice(11, 16);
const isoDate = (d) => d.toISOString().slice(0, 10);
const timeToDb = (t) => new Date(`1970-01-01T${t}:00.000Z`);
const dateToDb = (d) => new Date(`${d}T00:00:00.000Z`);
const dec = (v) => v === null ? null : Number(v.toString());
const distanceKm = (a, b) => {
    if (a.lat === null || a.lng === null || b.lat === null || b.lng === null)
        return null;
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const s = Math.sin(dLat / 2) ** 2 +
        Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return Math.round(2 * R * Math.asin(Math.sqrt(s)) * 10) / 10;
};
export const decodeOffset = (cursor) => {
    if (!cursor)
        return 0;
    const m = /^o:(\d{1,7})$/.exec(cursor);
    if (!m)
        throw new ApiError('VALIDATION_FAILED', 'Invalid cursor');
    return Number(m[1]);
};
const SWEEPABLE = ['APPLIED', 'SHORTLISTED', 'WAITLISTED', 'HIRED'];
let JobsService = JobsService_1 = class JobsService {
    prisma;
    dispatcher;
    payments;
    logger = new Logger(JobsService_1.name);
    timer;
    constructor(prisma, dispatcher, payments) {
        this.prisma = prisma;
        this.dispatcher = dispatcher;
        this.payments = payments;
    }
    onModuleInit() {
        if (process.env.NODE_ENV === 'test')
            return;
        this.timer = setInterval(() => {
            this.expireSweep().catch((e) => this.logger.warn(`expire sweep failed: ${String(e)}`));
        }, 60 * 60 * 1000);
        this.timer.unref?.();
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
    async workerBadgeContext(accountId) {
        const wp = await this.prisma.workerProfile.findUnique({
            where: { accountId },
            include: {
                skills: { select: { skill: { select: { publicId: true } } } },
                area: { select: { lat: true, lng: true } },
            },
        });
        if (!wp)
            return null;
        const kycOk = (await this.kycStatusOf(accountId)) === 'VERIFIED';
        return {
            skillIds: new Set(wp.skills.map((s) => s.skill.publicId)),
            experienceYears: wp.experienceYears ?? 0,
            kycOk,
            areaId: wp.areaId,
            lat: dec(wp.area?.lat ?? null),
            lng: dec(wp.area?.lng ?? null),
        };
    }
    async viewerContext(job, accountId) {
        if (accountId === null) {
            return { accountId: null, workerProfileId: null, isOwner: false, applied: false, hasCrewSeat: false };
        }
        const wp = await this.prisma.workerProfile.findUnique({ where: { accountId } });
        const emp = await this.prisma.employerProfile.findUnique({ where: { accountId } });
        const isOwner = emp !== null && emp.id === job.employerProfileId;
        if (!wp) {
            return { accountId, workerProfileId: null, isOwner, applied: false, hasCrewSeat: false };
        }
        const [app, crew] = await Promise.all([
            this.prisma.application.findFirst({
                where: { jobId: job.id, workerProfileId: wp.id },
                select: { status: true },
            }),
            this.prisma.crewMember.findFirst({
                where: { jobId: job.id, workerProfileId: wp.id, status: 'ACTIVE' },
                select: { id: true },
            }),
        ]);
        return {
            accountId,
            workerProfileId: wp.id,
            isOwner,
            applied: app !== null,
            ...(app ? { applicationStatus: app.status } : {}),
            hasCrewSeat: crew !== null,
        };
    }
    async toDto(job, viewer, badges, withBadges) {
        const ownerView = viewer.isOwner || viewer.workerProfileId === null;
        const canSeeAddress = ownerView || viewer.hasCrewSeat;
        const base = {
            publicId: job.publicId,
            title: job.title,
            description: job.description,
            status: job.status,
            category: { publicId: job.category.publicId, code: job.category.code, name: job.category.name },
            city: job.city,
            area: { publicId: job.area.publicId, name: job.area.name },
            addressLine: canSeeAddress ? job.addressLine : '',
            coordinatesAvailable: canSeeAddress && job.lat !== null && job.lng !== null,
            startsOn: isoDate(job.startsOn),
            endsOn: isoDate(job.endsOn),
            dayStartTime: hhmm(job.dayStartTime),
            dayEndTime: hhmm(job.dayEndTime),
            workDays: job.workDays.map((d) => ({
                date: isoDate(d.workDate),
                startTime: hhmm(d.startTime),
                endTime: hhmm(d.endTime),
            })),
            payType: job.payType,
            payAmountPaise: Number(job.payAmountPaise),
            currency: 'INR',
            payLabel: payLabel(job.payType, Number(job.payAmountPaise)),
            headcountRequired: job.headcountRequired,
            hiredCount: job.hiredCount,
            applicationCount: job.applicationCount,
            minExperienceYears: job.minExperienceYears,
            requirementsNote: job.requirementsNote,
            skills: job.skills.map((s) => ({ skillId: s.skill.publicId, name: s.skill.name })),
            welfare: job.welfare.map((w) => ({
                code: w.welfareItem.code,
                label: w.welfareItem.label,
                note: w.note,
            })),
            employer: {
                publicId: job.employer.publicId,
                orgName: job.employer.orgName,
                orgType: job.employer.orgType,
                avgRatingMilli: job.employer.avgRatingMilli,
                ratingsCount: job.employer.ratingsCount,
                kycBadge: (await this.kycStatusOf(job.employer.accountId)) === 'VERIFIED',
            },
            publishedAt: job.publishedAt?.toISOString() ?? null,
            cancelReason: job.cancelReason,
            ...(viewer.accountId !== null
                ? {
                    viewerState: {
                        applied: viewer.applied,
                        ...(viewer.applicationStatus ? { applicationStatus: viewer.applicationStatus } : {}),
                        hasCrewSeat: viewer.hasCrewSeat,
                        isOwner: viewer.isOwner,
                    },
                }
                : {}),
            createdAt: job.createdAt.toISOString(),
        };
        if (!withBadges || !badges)
            return base;
        const jobSkillIds = new Set(job.skills.map((s) => s.skill.publicId));
        let matchesSkills = jobSkillIds.size === 0;
        if (!matchesSkills) {
            for (const id of jobSkillIds)
                if (badges.skillIds.has(id)) {
                    matchesSkills = true;
                    break;
                }
        }
        const jobPoint = { lat: dec(job.lat), lng: dec(job.lng) };
        const fallbackPoint = jobPoint.lat === null ? { lat: dec(job.area.lat), lng: dec(job.area.lng) } : jobPoint;
        return {
            ...base,
            distanceKm: distanceKm(fallbackPoint, { lat: badges.lat, lng: badges.lng }),
            viewerBadges: {
                matchesSkills,
                experienceOk: job.minExperienceYears === null || badges.experienceYears >= job.minExperienceYears,
                kycOk: badges.kycOk,
            },
        };
    }
    async audit(accountId, role, action, publicId) {
        await this.prisma.auditLog.create({
            data: {
                actorAccountId: accountId,
                actorRole: role,
                action,
                entityType: 'JOB',
                entityPublicId: publicId,
            },
        });
    }
    async resolveRefs(input) {
        const [category, area] = await Promise.all([
            this.prisma.jobCategory.findUnique({ where: { publicId: input.categoryId } }),
            this.prisma.area.findUnique({ where: { publicId: input.areaId } }),
        ]);
        if (!category || !category.active)
            throw new ApiError('VALIDATION_FAILED', 'Unknown job category');
        if (!area || !area.active)
            throw new ApiError('VALIDATION_FAILED', 'Unknown work area');
        let skills = [];
        if (input.skillIds && input.skillIds.length > 0) {
            const rows = await this.prisma.skill.findMany({
                where: { publicId: { in: input.skillIds }, active: true },
                select: { id: true },
            });
            if (rows.length !== new Set(input.skillIds).size) {
                throw new ApiError('VALIDATION_FAILED', 'Unknown skill id');
            }
            skills = rows;
        }
        let welfare = [];
        if (input.welfare && input.welfare.length > 0) {
            const codes = [...new Set(input.welfare.map((w) => w.code))];
            const items = await this.prisma.welfareItem.findMany({
                where: { code: { in: codes }, active: true },
                select: { id: true, code: true },
            });
            if (items.length !== codes.length)
                throw new ApiError('VALIDATION_FAILED', 'Unknown welfare code');
            const byCode = new Map(items.map((i) => [i.code, i.id]));
            welfare = input.welfare.map((w) => ({
                welfareItemId: byCode.get(w.code),
                note: w.note ?? null,
            }));
        }
        return { category, area, skills, welfare };
    }
    async create(accountId, input) {
        const profile = await this.employerProfile(accountId);
        if (input.endsOn < input.startsOn) {
            throw new ApiError('VALIDATION_FAILED', 'endsOn must be on or after startsOn');
        }
        const days = deriveWorkDays(input.startsOn, input.endsOn, input.dayStartTime, input.dayEndTime, input.workDays);
        const refs = await this.resolveRefs(input);
        const job = await this.prisma.job.create({
            data: {
                employerProfileId: profile.id,
                title: input.title,
                description: input.description,
                categoryId: refs.category.id,
                city: input.city,
                areaId: refs.area.id,
                addressLine: input.addressLine,
                ...(input.lat !== undefined ? { lat: input.lat } : {}),
                ...(input.lng !== undefined ? { lng: input.lng } : {}),
                startsOn: dateToDb(input.startsOn),
                endsOn: dateToDb(input.endsOn),
                dayStartTime: timeToDb(input.dayStartTime),
                dayEndTime: timeToDb(input.dayEndTime),
                payType: input.payType,
                payAmountPaise: BigInt(input.payAmountPaise),
                headcountRequired: input.headcountRequired,
                ...(input.minExperienceYears !== undefined
                    ? { minExperienceYears: input.minExperienceYears }
                    : {}),
                ...(input.requirementsNote !== undefined ? { requirementsNote: input.requirementsNote } : {}),
                status: 'DRAFT',
                workDays: { create: days.map((d) => ({ workDate: dateToDb(d.date), startTime: timeToDb(d.startTime), endTime: timeToDb(d.endTime) })) },
                ...(refs.skills.length ? { skills: { create: refs.skills.map((s) => ({ skillId: s.id })) } } : {}),
                ...(refs.welfare.length
                    ? { welfare: { create: refs.welfare.map((w) => ({ welfareItemId: w.welfareItemId, note: w.note })) } }
                    : {}),
            },
            include: JOB_INCLUDE,
        });
        await this.audit(accountId, 'EMPLOYER', 'JOB_CREATED', job.publicId);
        return this.toDto(job, await this.viewerContext(job, accountId), null, false);
    }
    async update(accountId, publicId, patch) {
        const profile = await this.employerProfile(accountId);
        const job = await this.prisma.job.findUnique({ where: { publicId }, include: JOB_INCLUDE });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        if (job.status !== 'DRAFT') {
            throw new ApiError('STATE_INVALID', 'Only draft jobs can be edited — cancel instead');
        }
        const startsOn = patch.startsOn ?? isoDate(job.startsOn);
        const endsOn = patch.endsOn ?? isoDate(job.endsOn);
        const dayStartTime = patch.dayStartTime ?? hhmm(job.dayStartTime);
        const dayEndTime = patch.dayEndTime ?? hhmm(job.dayEndTime);
        const datesChanged = startsOn !== isoDate(job.startsOn) ||
            endsOn !== isoDate(job.endsOn) ||
            dayStartTime !== hhmm(job.dayStartTime) ||
            dayEndTime !== hhmm(job.dayEndTime) ||
            patch.workDays !== undefined;
        const days = datesChanged
            ? deriveWorkDays(startsOn, endsOn, dayStartTime, dayEndTime, patch.workDays)
            : null;
        const refs = patch.categoryId || patch.areaId || patch.skillIds || patch.welfare
            ? await this.resolveRefs({
                categoryId: patch.categoryId ?? job.category.publicId,
                areaId: patch.areaId ?? job.area.publicId,
                skillIds: patch.skillIds,
                welfare: patch.welfare,
            })
            : null;
        await this.prisma.$transaction(async (tx) => {
            if (days)
                await tx.jobWorkDay.deleteMany({ where: { jobId: job.id } });
            if (patch.skillIds !== undefined)
                await tx.jobSkill.deleteMany({ where: { jobId: job.id } });
            if (patch.welfare !== undefined)
                await tx.jobWelfare.deleteMany({ where: { jobId: job.id } });
            await tx.job.update({
                where: { id: job.id },
                data: {
                    ...(patch.title !== undefined ? { title: patch.title } : {}),
                    ...(patch.description !== undefined ? { description: patch.description } : {}),
                    ...(refs?.category ? { categoryId: refs.category.id } : {}),
                    ...(patch.city !== undefined ? { city: patch.city } : {}),
                    ...(refs?.area ? { areaId: refs.area.id } : {}),
                    ...(patch.addressLine !== undefined ? { addressLine: patch.addressLine } : {}),
                    ...(patch.lat !== undefined ? { lat: patch.lat } : {}),
                    ...(patch.lng !== undefined ? { lng: patch.lng } : {}),
                    ...(patch.startsOn !== undefined ? { startsOn: dateToDb(patch.startsOn) } : {}),
                    ...(patch.endsOn !== undefined ? { endsOn: dateToDb(patch.endsOn) } : {}),
                    ...(patch.dayStartTime !== undefined ? { dayStartTime: timeToDb(patch.dayStartTime) } : {}),
                    ...(patch.dayEndTime !== undefined ? { dayEndTime: timeToDb(patch.dayEndTime) } : {}),
                    ...(patch.payType !== undefined ? { payType: patch.payType } : {}),
                    ...(patch.payAmountPaise !== undefined ? { payAmountPaise: BigInt(patch.payAmountPaise) } : {}),
                    ...(patch.headcountRequired !== undefined ? { headcountRequired: patch.headcountRequired } : {}),
                    ...(patch.minExperienceYears !== undefined ? { minExperienceYears: patch.minExperienceYears } : {}),
                    ...(patch.requirementsNote !== undefined ? { requirementsNote: patch.requirementsNote } : {}),
                    ...(days
                        ? { workDays: { create: days.map((d) => ({ workDate: dateToDb(d.date), startTime: timeToDb(d.startTime), endTime: timeToDb(d.endTime) })) } }
                        : {}),
                    ...(refs && patch.skillIds
                        ? { skills: { create: refs.skills.map((s) => ({ skillId: s.id })) } }
                        : {}),
                    ...(refs && patch.welfare
                        ? { welfare: { create: refs.welfare.map((w) => ({ welfareItemId: w.welfareItemId, note: w.note })) } }
                        : {}),
                },
            });
        });
        const updated = await this.prisma.job.findUnique({ where: { id: job.id }, include: JOB_INCLUDE });
        await this.audit(accountId, 'EMPLOYER', 'JOB_UPDATED', publicId);
        return this.toDto(updated, await this.viewerContext(job, accountId), null, false);
    }
    async mine(accountId, query) {
        const profile = await this.employerProfile(accountId);
        const limit = Math.min(Math.max(query.limit ?? 20, 1), 50);
        const skip = decodeOffset(query.cursor);
        const where = {
            employerProfileId: profile.id,
            ...(query.status ? { status: query.status } : {}),
        };
        const [rows, total] = await Promise.all([
            this.prisma.job.findMany({
                where,
                include: JOB_INCLUDE,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit + 1,
            }),
            this.prisma.job.count({ where }),
        ]);
        const hasMore = rows.length > limit;
        const page = hasMore ? rows.slice(0, limit) : rows;
        const viewer = await this.viewerContext({ id: -1n, employerProfileId: profile.id }, accountId);
        const items = await Promise.all(page.map((j) => this.toDto(j, { ...viewer, isOwner: true }, null, false)));
        return { data: items, meta: { next: hasMore ? `o:${skip + limit}` : null, count: total } };
    }
    async publish(accountId, publicId) {
        const profile = await this.employerProfile(accountId);
        const job = await this.prisma.job.findUnique({ where: { publicId }, include: { _count: { select: { welfare: true } } } });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        if (job._count.welfare === 0) {
            throw new ApiError('VALIDATION_FAILED', 'Declare at least one welfare item before publishing');
        }
        const kyc = await this.kycStatusOf(accountId);
        assertJobAction(job.status, 'PUBLISH', 'EMPLOYER', { kycStatus: kyc });
        await this.prisma.$transaction([
            this.prisma.job.update({
                where: { id: job.id },
                data: { status: 'OPEN', publishedAt: new Date() },
            }),
            this.prisma.employerProfile.update({
                where: { id: profile.id },
                data: { jobsPostedCount: { increment: 1 } },
            }),
        ]);
        await this.audit(accountId, 'EMPLOYER', 'JOB_PUBLISHED', publicId);
        return { publicId, status: 'OPEN' };
    }
    async cancel(accountId, publicId, input) {
        const profile = await this.employerProfile(accountId);
        const job = await this.prisma.job.findUnique({ where: { publicId } });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        assertJobAction(job.status, 'CANCEL', 'EMPLOYER', {
            crewHandlingConfirmed: input.crewHandlingConfirmed,
        });
        const affected = await this.prisma.application.findMany({
            where: { jobId: job.id, status: { in: SWEEPABLE } },
            select: { workerProfile: { select: { accountId: true } } },
        });
        const recipients = [...new Set([accountId, ...affected.map((a) => a.workerProfile.accountId)])];
        await this.prisma.$transaction([
            this.prisma.job.update({
                where: { id: job.id },
                data: { status: 'CANCELLED', cancelledAt: new Date(), cancelReason: input.reason },
            }),
            this.prisma.application.updateMany({
                where: { jobId: job.id, status: { in: SWEEPABLE } },
                data: { status: 'EXPIRED' },
            }),
            this.prisma.crewMember.updateMany({
                where: { jobId: job.id, status: 'ACTIVE' },
                data: { status: 'RELEASED', releasedAt: new Date(), releasedReason: input.reason },
            }),
            this.prisma.earning.updateMany({
                where: { jobId: job.id, status: 'PENDING' },
                data: { status: 'CANCELLED', adjustmentReason: 'Job cancelled' },
            }),
        ]);
        await this.audit(accountId, 'EMPLOYER', 'JOB_CANCELLED', publicId);
        await this.dispatcher.enqueue({
            eventKey: 'JOB_CANCELLED',
            recipientAccountIds: recipients,
            contextType: 'JOB',
            contextPublicId: publicId,
            args: { jobTitle: job.title, reason: input.reason },
        });
        return { publicId, status: 'CANCELLED' };
    }
    async complete(accountId, publicId) {
        const profile = await this.employerProfile(accountId);
        const job = await this.prisma.job.findUnique({ where: { publicId } });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        const unresolved = await this.prisma.attendanceRecord.count({
            where: { jobId: job.id, status: { in: ['NOT_STARTED', 'CHECKED_IN', 'CHECKED_OUT'] } },
        });
        if (unresolved > 0) {
            throw new ApiError('STATE_INVALID', 'Resolve every attendance record first (approve, check out, or mark no-show)');
        }
        assertJobAction(job.status, 'COMPLETE', 'EMPLOYER', { attendanceResolved: true });
        await this.prisma.job.update({ where: { id: job.id }, data: { status: 'COMPLETED' } });
        const earnings = await this.payments.finalizeJobEarnings(job.id);
        if (earnings.eligible > 0) {
            await this.dispatcher.enqueue({
                eventKey: 'EARNINGS_READY',
                recipientAccountIds: [accountId],
                contextType: 'JOB',
                contextPublicId: publicId,
                args: { count: String(earnings.eligible) },
            });
        }
        const crewAccounts = await this.prisma.crewMember.findMany({
            where: { jobId: job.id },
            select: { workerProfile: { select: { accountId: true } } },
            distinct: ['workerProfileId'],
        });
        await this.dispatcher.enqueue({
            eventKey: 'RATING_REQUEST',
            recipientAccountIds: [accountId, ...crewAccounts.map((c) => c.workerProfile.accountId)],
            contextType: 'JOB',
            contextPublicId: publicId,
            args: {},
        });
        await this.audit(accountId, 'EMPLOYER', 'JOB_COMPLETED', publicId);
        return { publicId, status: 'COMPLETED', earnings };
    }
    async remove(accountId, publicId) {
        const profile = await this.employerProfile(accountId);
        const job = await this.prisma.job.findUnique({ where: { publicId } });
        if (!job || job.employerProfileId !== profile.id)
            throw new ApiError('NOT_FOUND', 'Job not found');
        assertJobAction(job.status, 'DELETE', 'EMPLOYER');
        await this.prisma.$transaction([
            this.prisma.jobWelfare.deleteMany({ where: { jobId: job.id } }),
            this.prisma.jobSkill.deleteMany({ where: { jobId: job.id } }),
            this.prisma.jobWorkDay.deleteMany({ where: { jobId: job.id } }),
            this.prisma.job.delete({ where: { id: job.id } }),
        ]);
        await this.audit(accountId, 'EMPLOYER', 'JOB_DELETED', publicId);
        return { publicId, deleted: true };
    }
    async feed(accountId, query) {
        const limit = Math.min(Math.max(query.limit ?? 20, 1), 50);
        const skip = decodeOffset(query.cursor);
        const skillIds = query.skillIds ? query.skillIds.split(',').filter(Boolean) : [];
        const welfareCodes = query.welfareCodes ? query.welfareCodes.split(',').filter(Boolean) : [];
        const where = {
            status: { in: ['OPEN', 'HIRING'] },
            hiddenAt: null,
            ...(query.categoryId ? { category: { publicId: query.categoryId } } : {}),
            ...(query.city ? { city: query.city } : {}),
            ...(query.areaId ? { area: { publicId: query.areaId } } : {}),
            ...(query.from || query.to
                ? {
                    ...(query.from ? { endsOn: { gte: dateToDb(query.from) } } : {}),
                    ...(query.to ? { startsOn: { lte: dateToDb(query.to) } } : {}),
                }
                : {}),
            ...(query.payMinPaise ? { payAmountPaise: { gte: BigInt(query.payMinPaise) } } : {}),
            ...(skillIds.length ? { skills: { some: { skill: { publicId: { in: skillIds } } } } } : {}),
            ...(welfareCodes.length
                ? { welfare: { some: { welfareItem: { code: { in: welfareCodes } } } } }
                : {}),
            ...(query.q
                ? {
                    OR: [
                        { title: { contains: query.q } },
                        { description: { contains: query.q } },
                    ],
                }
                : {}),
        };
        const orderBy = query.sort === 'DATE_ASC'
            ? [{ startsOn: 'asc' }, { id: 'asc' }]
            : query.sort === 'PAY_DESC'
                ? [{ payAmountPaise: 'desc' }, { id: 'desc' }]
                : [{ startsOn: 'desc' }, { id: 'desc' }];
        const [rows, total, badges] = await Promise.all([
            this.prisma.job.findMany({
                where,
                include: JOB_INCLUDE,
                orderBy,
                skip,
                take: limit + 1,
            }),
            this.prisma.job.count({ where }),
            this.workerBadgeContext(accountId),
        ]);
        const hasMore = rows.length > limit;
        const page = hasMore ? rows.slice(0, limit) : rows;
        const items = await Promise.all(page.map(async (j) => {
            const viewer = await this.viewerContext(j, accountId);
            return this.toDto(j, viewer, badges, true);
        }));
        return { data: items, meta: { next: hasMore ? `o:${skip + limit}` : null, count: total } };
    }
    async detail(accountId, publicId) {
        const job = await this.prisma.job.findUnique({ where: { publicId }, include: JOB_INCLUDE });
        if (!job)
            throw new ApiError('NOT_FOUND', 'Job not found');
        const viewer = await this.viewerContext(job, accountId);
        if (job.status === 'DRAFT' && !viewer.isOwner) {
            throw new ApiError('NOT_FOUND', 'Job not found');
        }
        if (job.hiddenAt && !viewer.isOwner) {
            const acct = await this.prisma.account.findUnique({
                where: { id: accountId },
                select: { role: true },
            });
            if (acct?.role !== 'admin')
                throw new ApiError('NOT_FOUND', 'Job not found');
        }
        const badges = viewer.workerProfileId !== null ? await this.workerBadgeContext(accountId) : null;
        return this.toDto(job, viewer, badges, badges !== null);
    }
    async expireSweep() {
        const today = new Date();
        const cutoff = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
        const stale = await this.prisma.job.findMany({
            where: { status: { in: ['OPEN', 'HIRING'] }, endsOn: { lt: new Date(cutoff) } },
            select: { id: true, publicId: true },
        });
        if (stale.length === 0)
            return { expired: 0 };
        for (const job of stale) {
            await this.prisma.$transaction([
                this.prisma.job.update({ where: { id: job.id }, data: { status: 'EXPIRED' } }),
                this.prisma.application.updateMany({
                    where: { jobId: job.id, status: { in: SWEEPABLE } },
                    data: { status: 'EXPIRED' },
                }),
                this.prisma.auditLog.create({
                    data: {
                        actorAccountId: null,
                        actorRole: 'SYSTEM',
                        action: 'JOB_EXPIRED',
                        entityType: 'JOB',
                        entityPublicId: job.publicId,
                    },
                }),
            ]);
        }
        this.logger.log(`J10 sweep expired ${stale.length} job(s)`);
        return { expired: stale.length };
    }
};
JobsService = JobsService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        DispatcherService,
        PaymentsService])
], JobsService);
export { JobsService };
//# sourceMappingURL=jobs.service.js.map
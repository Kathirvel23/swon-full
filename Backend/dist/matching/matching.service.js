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
import { ApplicationsService } from '../applications/applications.service.js';
import { ApiError } from '../common/api-error.js';
import { withIdempotency } from '../common/idempotency.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { WEIGHTS_VERSION, assertRespondable, availabilityMilli, computeScore, distanceBand as bandOf, haversineKm, overlapMilli, proximityMilli, ratingMilli, reasonCodes, recencyMilli, reliabilityMilli, skillMatchMilli, } from './matching.domain.js';
const decodeLimit = (v) => {
    const n = Number(v ?? 20);
    if (!Number.isInteger(n) || n < 1 || n > 50)
        return 20;
    return n;
};
let MatchingService = class MatchingService {
    prisma;
    dispatcher;
    applications;
    sweepTimer;
    constructor(prisma, dispatcher, applications) {
        this.prisma = prisma;
        this.dispatcher = dispatcher;
        this.applications = applications;
    }
    onModuleInit() {
        if (process.env.NODE_ENV === 'test')
            return;
        this.sweepTimer = setInterval(() => {
            void this.sweepExpiring();
        }, 60_000);
        this.sweepTimer.unref?.();
    }
    onModuleDestroy() {
        if (this.sweepTimer)
            clearInterval(this.sweepTimer);
    }
    async sweepExpiring() {
        try {
            const now = new Date();
            const horizon = new Date(now.getTime() + 5 * 60_000);
            const rows = await this.prisma.quickMatchOffer.findMany({
                where: { status: 'PENDING', respondBy: { gt: now, lte: horizon } },
                select: {
                    respondBy: true,
                    jobId: true,
                    workerProfile: { select: { accountId: true } },
                    job: { select: { publicId: true, title: true } },
                },
                take: 500,
            });
            if (rows.length === 0)
                return;
            const byJob = new Map();
            for (const r of rows) {
                const key = r.jobId.toString();
                let bucket = byJob.get(key);
                if (!bucket) {
                    bucket = { job: r.job, recipients: new Set(), respondBy: r.respondBy };
                    byJob.set(key, bucket);
                }
                bucket.recipients.add(r.workerProfile.accountId.toString());
                if (r.respondBy < bucket.respondBy)
                    bucket.respondBy = r.respondBy;
            }
            for (const bucket of byJob.values()) {
                const minutesLeft = Math.max(1, Math.ceil((bucket.respondBy.getTime() - now.getTime()) / 60_000));
                await this.dispatcher.enqueue({
                    eventKey: 'QUICKMATCH_EXPIRING',
                    recipientAccountIds: [...bucket.recipients].map((s) => BigInt(s)),
                    contextType: 'JOB',
                    contextPublicId: bucket.job.publicId,
                    args: { jobTitle: bucket.job.title, minutesLeft },
                });
            }
        }
        catch {
        }
    }
    idem() {
        return this.prisma.idempotencyKey;
    }
    async jobCtx(publicId) {
        const job = await this.prisma.job.findUnique({
            where: { publicId },
            include: {
                area: { select: { lat: true, lng: true, name: true, city: true } },
                employer: { select: { accountId: true, orgName: true } },
                skills: { select: { skillId: true } },
            },
        });
        if (!job)
            throw new ApiError('NOT_FOUND', 'Job not found');
        return job;
    }
    assertOwner(ctx, caller) {
        if (ctx.employer.accountId !== caller.accountId) {
            throw new ApiError('NOT_OWNER', 'You do not own this job');
        }
    }
    scoreWorker(wp, ctx, lastActivityMs, hasSlot) {
        const jobLat = ctx.area ? Number(ctx.area.lat) : ctx.lat ? Number(ctx.lat) : Number.NaN;
        const jobLng = ctx.area ? Number(ctx.area.lng) : ctx.lng ? Number(ctx.lng) : Number.NaN;
        const wLat = wp.area?.lat != null ? Number(wp.area.lat) : Number.NaN;
        const wLng = wp.area?.lng != null ? Number(wp.area.lng) : Number.NaN;
        const km = haversineKm(wLat, wLng, jobLat, jobLng);
        const signals = {
            proximityMilli: proximityMilli(km),
            skillMatchMilli: skillMatchMilli(ctx.skills.map((s) => s.skillId), wp.skills.map((s) => s.skillId)),
            reliabilityMilli: reliabilityMilli(wp.attendanceRateMilli, wp.jobsDoneCount),
            ratingMilli: ratingMilli(wp.avgRatingMilli, wp.ratingsCount),
            recencyMilli: recencyMilli(lastActivityMs, Date.now()),
            availabilityMilli: availabilityMilli(wp.openToWork),
            overlapMilli: overlapMilli(hasSlot),
        };
        const band = km === null
            ? wp.area?.city && wp.area.city === ctx.city
                ? 'same-city'
                : 'unknown'
            : bandOf(km);
        return {
            signals,
            score: computeScore(signals),
            distanceBand: band,
            reasonCodes: reasonCodes(signals),
        };
    }
    async candidates(caller, jobPublicId, query) {
        const startedAt = Date.now();
        const ctx = await this.jobCtx(jobPublicId);
        this.assertOwner(ctx, caller);
        const [crewRows, appliedRows] = await Promise.all([
            this.prisma.crewMember.findMany({ where: { jobId: ctx.id }, select: { workerProfileId: true } }),
            this.prisma.application.findMany({ where: { jobId: ctx.id }, select: { workerProfileId: true } }),
        ]);
        const crewIds = new Set(crewRows.map((r) => r.workerProfileId.toString()));
        const appliedIds = new Set(appliedRows.map((r) => r.workerProfileId.toString()));
        const includeApplied = query.includeApplied === true || query.includeApplied === 'true';
        const excluded = new Set(crewIds);
        if (!includeApplied)
            for (const id of appliedIds)
                excluded.add(id);
        const pool = (await this.prisma.workerProfile.findMany({
            where: { account: { status: { not: 'SUSPENDED' } } },
            select: {
                id: true,
                publicId: true,
                accountId: true,
                city: true,
                openToWork: true,
                avgRatingMilli: true,
                ratingsCount: true,
                jobsDoneCount: true,
                attendanceRateMilli: true,
                experienceYears: true,
                area: { select: { lat: true, lng: true, city: true } },
                skills: { select: { skillId: true } },
            },
            take: 500,
        }));
        const visible = pool.filter((w) => !excluded.has(w.id.toString()));
        const lastMap = await this.lastCompletedByWorker(visible.map((w) => w.id));
        const slotSet = await this.availableInWindow(visible.map((w) => w.id), ctx.startsOn, ctx.endsOn);
        const scored = visible.map((wp) => {
            const s = this.scoreWorker(wp, ctx, lastMap.get(wp.id.toString()) ?? null, slotSet.has(wp.id.toString()));
            const candidate = {
                workerPublicId: wp.publicId,
                score: s.score,
                distanceBand: s.distanceBand,
                signals: s.signals,
                reasonCodes: s.reasonCodes,
            };
            return candidate;
        });
        scored.sort((a, b) => b.score - a.score);
        const limit = decodeLimit(query.limit);
        const top = scored.slice(0, limit);
        const log = await this.prisma.matchLog.create({
            data: {
                jobId: ctx.id,
                requestedByAccountId: caller.accountId,
                candidatesJson: top.map((c) => ({
                    workerPublicId: c.workerPublicId,
                    score: c.score,
                    reasonCodes: c.reasonCodes,
                })),
                weightsVersion: WEIGHTS_VERSION,
            },
        });
        return {
            jobPublicId: ctx.publicId,
            weightsVersion: WEIGHTS_VERSION,
            logId: log.publicId,
            candidates: top,
            ignoredCount: excluded.size,
            takenMs: Date.now() - startedAt,
        };
    }
    async lastCompletedByWorker(ids) {
        const map = new Map();
        if (ids.length === 0)
            return map;
        const rows = await this.prisma.crewMember.findMany({
            where: { workerProfileId: { in: ids }, job: { status: 'COMPLETED' } },
            select: { workerProfileId: true, job: { select: { endsOn: true } } },
            orderBy: { hiredAt: 'desc' },
            take: 2000,
        });
        for (const r of rows) {
            const k = r.workerProfileId.toString();
            if (!map.has(k))
                map.set(k, r.job.endsOn.getTime());
        }
        return map;
    }
    async availableInWindow(ids, from, to) {
        const set = new Set();
        if (ids.length === 0)
            return set;
        const slots = await this.prisma.availabilitySlot.findMany({
            where: { workerProfileId: { in: ids }, workDate: { gte: from, lte: to }, status: 'AVAILABLE' },
            select: { workerProfileId: true },
        });
        for (const s of slots)
            set.add(s.workerProfileId.toString());
        return set;
    }
    async launch(caller, input, idemKey) {
        return withIdempotency(this.idem(), {
            key: idemKey,
            route: 'POST /quick-match',
            accountId: caller.accountId,
            request: { ...input },
            run: async () => {
                const ctx = await this.jobCtx(input.jobPublicId);
                this.assertOwner(ctx, caller);
                return this.launchInner(ctx, input);
            },
        });
    }
    async launchInner(ctx, input) {
        if (['FILLED', 'COMPLETED', 'CANCELLED', 'CLOSED', 'EXPIRED'].includes(await this.jobStatus(ctx.id))) {
            throw new ApiError('JOB_ALREADY_FILLED', 'This job is no longer accepting workers');
        }
        const status = await this.jobStatus(ctx.id);
        if (!['OPEN', 'HIRING'].includes(status)) {
            throw new ApiError('JOB_NOT_OPEN', 'FlashMatch needs an OPEN or HIRING opportunity');
        }
        const [crewRows, appliedRows, offerRows] = await Promise.all([
            this.prisma.crewMember.findMany({ where: { jobId: ctx.id }, select: { workerProfileId: true } }),
            this.prisma.application.findMany({ where: { jobId: ctx.id }, select: { workerProfileId: true } }),
            this.prisma.quickMatchOffer.findMany({ where: { jobId: ctx.id }, select: { workerProfileId: true } }),
        ]);
        const taken = new Set([...crewRows, ...appliedRows, ...offerRows].map((r) => r.workerProfileId.toString()));
        const pool = (await this.prisma.workerProfile.findMany({
            where: { openToWork: true, account: { status: { not: 'SUSPENDED' } } },
            select: {
                id: true,
                publicId: true,
                accountId: true,
                city: true,
                openToWork: true,
                avgRatingMilli: true,
                ratingsCount: true,
                jobsDoneCount: true,
                attendanceRateMilli: true,
                experienceYears: true,
                area: { select: { lat: true, lng: true, city: true } },
                skills: { select: { skillId: true } },
            },
            take: 500,
        }));
        const lastMap = await this.lastCompletedByWorker(pool.map((w) => w.id));
        const slotSet = await this.availableInWindow(pool.map((w) => w.id), ctx.startsOn, ctx.endsOn);
        const jobLat = ctx.area ? Number(ctx.area.lat) : ctx.lat ? Number(ctx.lat) : Number.NaN;
        const jobLng = ctx.area ? Number(ctx.area.lng) : ctx.lng ? Number(ctx.lng) : Number.NaN;
        let skipped = 0;
        const wave = [];
        for (const wp of pool) {
            if (taken.has(wp.id.toString())) {
                skipped += 1;
                continue;
            }
            const wLat = wp.area?.lat != null ? Number(wp.area.lat) : Number.NaN;
            const wLng = wp.area?.lng != null ? Number(wp.area.lng) : Number.NaN;
            const km = haversineKm(wLat, wLng, jobLat, jobLng);
            const inRadius = km !== null
                ? km <= input.radiusKm
                : Boolean(wp.area?.city && wp.area.city === ctx.city) || wp.city === ctx.city;
            if (!inRadius) {
                skipped += 1;
                continue;
            }
            const s = this.scoreWorker(wp, ctx, lastMap.get(wp.id.toString()) ?? null, slotSet.has(wp.id.toString()));
            wave.push({ worker: wp, score: s.score, band: s.distanceBand });
        }
        wave.sort((a, b) => b.score - a.score);
        const targets = wave.slice(0, input.waveSize);
        const lastWave = await this.prisma.quickMatchOffer.aggregate({
            where: { jobId: ctx.id },
            _max: { waveNo: true },
        });
        const waveNo = (lastWave._max.waveNo ?? 0) + 1;
        const respondBy = new Date(Date.now() + 30 * 60_000);
        if (targets.length > 0) {
            await this.prisma.quickMatchOffer.createMany({
                data: targets.map((t) => ({
                    jobId: ctx.id,
                    workerProfileId: t.worker.id,
                    status: 'PENDING',
                    waveNo,
                    requiredHeadcount: input.headcount,
                    respondBy,
                    requirementSnapshot: input.requirementSnapshot,
                    windowStart: new Date(input.windowStart),
                    windowEnd: new Date(input.windowEnd),
                    distanceBand: t.band,
                })),
            });
            await this.dispatcher.enqueue({
                eventKey: 'QUICKMATCH_OFFER',
                recipientAccountIds: targets.map((t) => t.worker.accountId),
                contextType: 'JOB',
                contextPublicId: ctx.publicId,
                args: { jobTitle: ctx.title, respondBy: respondBy.toISOString() },
            });
        }
        return { created: targets.length, skipped, waveNo, respondBy: respondBy.toISOString() };
    }
    async jobStatus(jobId) {
        const j = await this.prisma.job.findUnique({ where: { id: jobId }, select: { status: true } });
        return j?.status ?? 'NOT_FOUND';
    }
    async myOffers(caller, status) {
        await this.prisma.quickMatchOffer.updateMany({
            where: {
                workerProfile: { accountId: caller.accountId },
                status: 'PENDING',
                respondBy: { lt: new Date() },
            },
            data: { status: 'EXPIRED' },
        });
        const rows = await this.prisma.quickMatchOffer.findMany({
            where: {
                workerProfile: { accountId: caller.accountId },
                ...(status ? { status } : {}),
            },
            include: {
                job: {
                    select: {
                        publicId: true,
                        title: true,
                        city: true,
                        startsOn: true,
                        endsOn: true,
                        payAmountPaise: true,
                        payType: true,
                        area: { select: { name: true } },
                        employer: { select: { orgName: true } },
                    },
                },
            },
            orderBy: { respondBy: 'desc' },
            take: 50,
        });
        const now = Date.now();
        const ctxByJob = new Map();
        for (const pub of new Set(rows.map((r) => r.job.publicId))) {
            try {
                ctxByJob.set(pub, await this.jobCtx(pub));
            }
            catch {
            }
        }
        const workerIds = [...new Set(rows.map((r) => r.workerProfileId))];
        const workerRows = workerIds.length
            ? (await this.prisma.workerProfile.findMany({
                where: { id: { in: workerIds } },
                select: {
                    id: true,
                    publicId: true,
                    accountId: true,
                    city: true,
                    openToWork: true,
                    avgRatingMilli: true,
                    ratingsCount: true,
                    jobsDoneCount: true,
                    attendanceRateMilli: true,
                    experienceYears: true,
                    area: { select: { lat: true, lng: true, city: true } },
                    skills: { select: { skillId: true } },
                },
            }))
            : [];
        const wpById = new Map(workerRows.map((w) => [w.id.toString(), w]));
        const lastMap = await this.lastCompletedByWorker(workerIds);
        const slotCache = new Map();
        const slotSetFor = async (from, to) => {
            const key = `${from.getTime()}|${to.getTime()}`;
            let set = slotCache.get(key);
            if (!set) {
                set = await this.availableInWindow(workerIds, from, to);
                slotCache.set(key, set);
            }
            return set;
        };
        const reasonsByRow = new Map();
        for (const r of rows) {
            const ctx = ctxByJob.get(r.job.publicId);
            const wp = wpById.get(r.workerProfileId.toString());
            if (!ctx || !wp) {
                reasonsByRow.set(r.publicId, []);
                continue;
            }
            const slots = await slotSetFor(r.windowStart ?? r.job.startsOn, r.windowEnd ?? r.job.endsOn);
            reasonsByRow.set(r.publicId, this.scoreWorker(wp, ctx, lastMap.get(wp.id.toString()) ?? null, slots.has(wp.id.toString())).reasonCodes);
        }
        return rows.map((r) => {
            const job = r.job;
            return {
                publicId: r.publicId,
                status: r.status,
                job: {
                    publicId: job.publicId,
                    title: job.title,
                    city: job.city,
                    areaName: job.area?.name ?? '',
                    payAmountPaise: Number(job.payAmountPaise),
                    payType: job.payType,
                    employerName: job.employer.orgName,
                },
                requirementSnapshot: r.requirementSnapshot ?? '',
                windowStart: (r.windowStart ?? job.startsOn).toISOString(),
                windowEnd: (r.windowEnd ?? job.endsOn).toISOString(),
                respondBy: r.respondBy.toISOString(),
                respondedAt: r.respondedAt?.toISOString() ?? null,
                distanceBand: r.distanceBand,
                expiringSoon: r.status === 'PENDING' && r.respondBy.getTime() - now <= 5 * 60_000,
                reasonCodes: reasonsByRow.get(r.publicId) ?? [],
            };
        });
    }
    async availability(caller, jobPublicId, radiusKmRaw) {
        const radiusKm = Math.min(25, Math.max(1, Math.floor(Number(radiusKmRaw ?? 5)) || 5));
        const ctx = await this.jobCtx(jobPublicId);
        this.assertOwner(ctx, caller);
        const [crewRows, appliedRows, offerRows, poolRaw] = await Promise.all([
            this.prisma.crewMember.findMany({ where: { jobId: ctx.id }, select: { workerProfileId: true } }),
            this.prisma.application.findMany({ where: { jobId: ctx.id }, select: { workerProfileId: true } }),
            this.prisma.quickMatchOffer.findMany({ where: { jobId: ctx.id }, select: { workerProfileId: true } }),
            this.prisma.workerProfile.findMany({
                where: { openToWork: true, account: { status: { not: 'SUSPENDED' } } },
                select: {
                    id: true,
                    publicId: true,
                    accountId: true,
                    city: true,
                    openToWork: true,
                    avgRatingMilli: true,
                    ratingsCount: true,
                    jobsDoneCount: true,
                    attendanceRateMilli: true,
                    experienceYears: true,
                    area: { select: { lat: true, lng: true, city: true } },
                    skills: { select: { skillId: true } },
                },
                take: 500,
            }),
        ]);
        const taken = new Set([...crewRows, ...appliedRows, ...offerRows].map((r) => r.workerProfileId.toString()));
        const pool = poolRaw;
        const busyRows = await this.prisma.crewMember.findMany({
            where: {
                status: 'ACTIVE',
                jobId: { not: ctx.id },
                job: { startsOn: { lte: ctx.endsOn }, endsOn: { gte: ctx.startsOn } },
            },
            select: { workerProfileId: true },
        });
        const busyElsewhere = new Set(busyRows.map((b) => b.workerProfileId.toString()));
        const jobLat = ctx.area ? Number(ctx.area.lat) : ctx.lat ? Number(ctx.lat) : Number.NaN;
        const jobLng = ctx.area ? Number(ctx.area.lng) : ctx.lng ? Number(ctx.lng) : Number.NaN;
        const jobSkillIds = new Set(ctx.skills.map((s) => s.skillId.toString()));
        let availableNearby = 0;
        let matchingSkills = 0;
        let currentlyWorking = 0;
        let potentialMatches = 0;
        const bandCounts = new Map();
        for (const wp of pool) {
            const wLat = wp.area?.lat != null ? Number(wp.area.lat) : Number.NaN;
            const wLng = wp.area?.lng != null ? Number(wp.area.lng) : Number.NaN;
            const km = haversineKm(wLat, wLng, jobLat, jobLng);
            const inRadius = km !== null
                ? km <= radiusKm
                : Boolean(wp.area?.city && wp.area.city === ctx.city) || wp.city === ctx.city;
            if (!inRadius)
                continue;
            availableNearby += 1;
            if (wp.skills.some((s) => jobSkillIds.has(s.skillId.toString())))
                matchingSkills += 1;
            const isTaken = taken.has(wp.id.toString());
            if (isTaken || busyElsewhere.has(wp.id.toString())) {
                currentlyWorking += 1;
            }
            else {
                potentialMatches += 1;
                const s = this.scoreWorker(wp, ctx, null, false);
                bandCounts.set(s.distanceBand, (bandCounts.get(s.distanceBand) ?? 0) + 1);
            }
        }
        return {
            jobPublicId: ctx.publicId,
            radiusKm,
            availableNearby,
            matchingSkills,
            currentlyWorking,
            potentialMatches,
            bands: [...bandCounts.entries()].map(([band, count]) => ({ band, count })),
        };
    }
    async respond(caller, offerPublicId, body) {
        const offer = await this.prisma.quickMatchOffer.findUnique({
            where: { publicId: offerPublicId },
            include: {
                job: { select: { publicId: true, title: true, employer: { select: { accountId: true } } } },
                workerProfile: { select: { accountId: true } },
            },
        });
        if (!offer || offer.workerProfile.accountId !== caller.accountId) {
            throw new ApiError('NOT_FOUND', 'Offer not found');
        }
        const now = Date.now();
        assertRespondable(offer.status, now, offer.respondBy.getTime());
        if (body.response === 'ACCEPT') {
            const application = await this.applications.apply(caller.accountId, {
                jobId: offer.job.publicId,
                coverNote: body.coverNote,
                offerId: offer.publicId,
            }, `qm-respond-${offer.publicId}`);
            return {
                status: 'ACCEPTED',
                application: { publicId: application.publicId, status: application.status },
            };
        }
        const claimed = await this.prisma.quickMatchOffer.updateMany({
            where: { id: offer.id, status: 'PENDING', respondBy: { gte: new Date() } },
            data: { status: 'DECLINED', respondedAt: new Date() },
        });
        if (claimed.count === 0) {
            const fresh = await this.prisma.quickMatchOffer.findUnique({ where: { id: offer.id } });
            if (fresh && fresh.respondBy.getTime() < Date.now()) {
                await this.prisma.quickMatchOffer.update({
                    where: { id: offer.id },
                    data: { status: 'EXPIRED' },
                });
                throw new ApiError('QUICKMATCH_EXPIRED', 'This offer has expired');
            }
            throw new ApiError('STATE_INVALID', `Offer already ${(fresh?.status ?? 'unknown').toLowerCase()}`);
        }
        await this.dispatcher.enqueue({
            eventKey: 'QUICKMATCH_DECLINED',
            recipientAccountIds: [offer.job.employer.accountId],
            contextType: 'JOB',
            contextPublicId: offer.job.publicId,
            args: { jobTitle: offer.job.title },
        });
        return { status: 'DECLINED', application: null };
    }
};
MatchingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        DispatcherService,
        ApplicationsService])
], MatchingService);
export { MatchingService };
//# sourceMappingURL=matching.service.js.map
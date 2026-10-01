import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { ApplicationsService } from '../applications/applications.service.js';
import { ApiError } from '../common/api-error.js';
import { withIdempotency, type IdempotencyDelegate } from '../common/idempotency.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  WEIGHTS_VERSION,
  assertRespondable,
  availabilityMilli,
  computeScore,
  distanceBand as bandOf,
  haversineKm,
  overlapMilli,
  proximityMilli,
  ratingMilli,
  reasonCodes,
  recencyMilli,
  reliabilityMilli,
  skillMatchMilli,
} from './matching.domain.js';
import type {
  MatchCandidate,
  MatchResult,
  QuickMatchCreate,
  QuickMatchOfferDto,
  QuickMatchRespond,
} from '@workbridge/contracts';

/**
 * §16 scoring pipeline + the Quick Match adjacent-worker loop (§14 row 13).
 * Candidates: server-authoritative scores from seven fixed signals, every
 * request persisted as a match_log row (reproducible via weightsVersion).
 * Quick Match: employer launches a wave of timed offers to nearby open
 * workers; a worker's accept claims the offer and creates the application in
 * one transaction (source=QUICK_MATCH); declines notify the employer.
 */

interface Caller {
  accountId: bigint;
  role: 'worker' | 'employer' | 'admin' | null;
}

interface JobCtx {
  id: bigint;
  publicId: string;
  title: string;
  city: string;
  startsOn: Date;
  endsOn: Date;
  dayStartTime: Date;
  dayEndTime: Date;
  payAmountPaise: bigint;
  payType: string;
  lat: unknown;
  lng: unknown;
  area: { lat: unknown; lng: unknown; name: string; city: string } | null;
  employer: { accountId: bigint; orgName: string };
  skills: Array<{ skillId: bigint }>;
}

interface WorkerLite {
  id: bigint;
  publicId: string;
  accountId: bigint;
  city: string | null;
  openToWork: boolean;
  avgRatingMilli: number;
  ratingsCount: number;
  jobsDoneCount: number;
  attendanceRateMilli: number | null;
  experienceYears: number | null;
  area: { lat: unknown; lng: unknown; city: string } | null;
  skills: Array<{ skillId: bigint }>;
}

const decodeLimit = (v: unknown): number => {
  const n = Number(v ?? 20);
  if (!Number.isInteger(n) || n < 1 || n > 50) return 20;
  return n;
};

@Injectable()
export class MatchingService implements OnModuleInit, OnModuleDestroy {
  private sweepTimer?: ReturnType<typeof setInterval>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: DispatcherService,
    private readonly applications: ApplicationsService,
  ) {}

  /**
   * QUICKMATCH_EXPIRING producer (owner brief §24 "offer expiring"): one
   * in-process 60s sweep — the platform has no job scheduler and the brief
   * forbids new infrastructure, so the existing outbox dispatcher is driven
   * from here. Dedupe is per (event, job, recipient): a worker gets at most
   * one expiring notice per opportunity (repeat waves are silent — noted in
   * the implementation report). Skipped under NODE_ENV=test so vitest runs
   * never inherit live timers.
   */
  onModuleInit(): void {
    if (process.env.NODE_ENV === 'test') return;
    this.sweepTimer = setInterval(() => {
      void this.sweepExpiring();
    }, 60_000);
    this.sweepTimer.unref?.();
  }

  onModuleDestroy(): void {
    if (this.sweepTimer) clearInterval(this.sweepTimer);
  }

  private async sweepExpiring(): Promise<void> {
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
      if (rows.length === 0) return;
      const byJob = new Map<string, { job: { publicId: string; title: string }; recipients: Set<string>; respondBy: Date }>();
      for (const r of rows) {
        const key = r.jobId.toString();
        let bucket = byJob.get(key);
        if (!bucket) {
          bucket = { job: r.job, recipients: new Set(), respondBy: r.respondBy };
          byJob.set(key, bucket);
        }
        bucket.recipients.add(r.workerProfile.accountId.toString());
        if (r.respondBy < bucket.respondBy) bucket.respondBy = r.respondBy;
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
    } catch {
      /* sweep is best-effort — never crash the module on a transient DB error */
    }
  }

  private idem(): IdempotencyDelegate {
    return this.prisma.idempotencyKey as unknown as IdempotencyDelegate;
  }

  private async jobCtx(publicId: string): Promise<JobCtx> {
    const job = await this.prisma.job.findUnique({
      where: { publicId },
      include: {
        area: { select: { lat: true, lng: true, name: true, city: true } },
        employer: { select: { accountId: true, orgName: true } },
        skills: { select: { skillId: true } },
      },
    });
    if (!job) throw new ApiError('NOT_FOUND', 'Job not found');
    return job as unknown as JobCtx;
  }

  private assertOwner(ctx: JobCtx, caller: Caller): void {
    if (ctx.employer.accountId !== caller.accountId) {
      throw new ApiError('NOT_OWNER', 'You do not own this job');
    }
  }

  /** Shared §16 signal computation for one worker against one job. */
  private scoreWorker(wp: WorkerLite, ctx: JobCtx, lastActivityMs: number | null, hasSlot: boolean) {
    const jobLat = ctx.area ? Number(ctx.area.lat) : ctx.lat ? Number(ctx.lat) : Number.NaN;
    const jobLng = ctx.area ? Number(ctx.area.lng) : ctx.lng ? Number(ctx.lng) : Number.NaN;
    const wLat = wp.area?.lat != null ? Number(wp.area.lat) : Number.NaN;
    const wLng = wp.area?.lng != null ? Number(wp.area.lng) : Number.NaN;
    const km = haversineKm(wLat, wLng, jobLat, jobLng);

    const signals = {
      proximityMilli: proximityMilli(km),
      skillMatchMilli: skillMatchMilli(
        ctx.skills.map((s) => s.skillId),
        wp.skills.map((s) => s.skillId),
      ),
      reliabilityMilli: reliabilityMilli(wp.attendanceRateMilli, wp.jobsDoneCount),
      ratingMilli: ratingMilli(wp.avgRatingMilli, wp.ratingsCount),
      recencyMilli: recencyMilli(lastActivityMs, Date.now()),
      availabilityMilli: availabilityMilli(wp.openToWork),
      overlapMilli: overlapMilli(hasSlot),
    };
    const band =
      km === null
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

  // ------------------------------------------------------------- candidates
  async candidates(
    caller: Caller,
    jobPublicId: string,
    query: { limit?: unknown; includeApplied?: unknown },
  ): Promise<MatchResult> {
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

    const excluded = new Set<string>(crewIds);
    if (!includeApplied) for (const id of appliedIds) excluded.add(id);

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
    })) as unknown as WorkerLite[];

    const visible = pool.filter((w) => !excluded.has(w.id.toString()));
    const lastMap = await this.lastCompletedByWorker(visible.map((w) => w.id));
    const slotSet = await this.availableInWindow(
      visible.map((w) => w.id),
      ctx.startsOn,
      ctx.endsOn,
    );

    const scored = visible.map((wp) => {
      const s = this.scoreWorker(
        wp,
        ctx,
        lastMap.get(wp.id.toString()) ?? null,
        slotSet.has(wp.id.toString()),
      );
      const candidate: MatchCandidate = {
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

  private async lastCompletedByWorker(ids: bigint[]): Promise<Map<string, number>> {
    const map = new Map<string, number>();
    if (ids.length === 0) return map;
    const rows = await this.prisma.crewMember.findMany({
      where: { workerProfileId: { in: ids }, job: { status: 'COMPLETED' } },
      select: { workerProfileId: true, job: { select: { endsOn: true } } },
      orderBy: { hiredAt: 'desc' },
      take: 2000,
    });
    for (const r of rows) {
      const k = r.workerProfileId.toString();
      if (!map.has(k)) map.set(k, r.job.endsOn.getTime());
    }
    return map;
  }

  private async availableInWindow(ids: bigint[], from: Date, to: Date): Promise<Set<string>> {
    const set = new Set<string>();
    if (ids.length === 0) return set;
    const slots = await this.prisma.availabilitySlot.findMany({
      where: { workerProfileId: { in: ids }, workDate: { gte: from, lte: to }, status: 'AVAILABLE' },
      select: { workerProfileId: true },
    });
    for (const s of slots) set.add(s.workerProfileId.toString());
    return set;
  }

  // ------------------------------------------------------------- quick match
  async launch(caller: Caller, input: QuickMatchCreate, idemKey?: string) {
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

  private async launchInner(ctx: JobCtx, input: QuickMatchCreate) {
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
    const taken = new Set(
      [...crewRows, ...appliedRows, ...offerRows].map((r) => r.workerProfileId.toString()),
    );

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
    })) as unknown as WorkerLite[];

    const lastMap = await this.lastCompletedByWorker(pool.map((w) => w.id));
    const slotSet = await this.availableInWindow(pool.map((w) => w.id), ctx.startsOn, ctx.endsOn);

    const jobLat = ctx.area ? Number(ctx.area.lat) : ctx.lat ? Number(ctx.lat) : Number.NaN;
    const jobLng = ctx.area ? Number(ctx.area.lng) : ctx.lng ? Number(ctx.lng) : Number.NaN;

    let skipped = 0;
    const wave: Array<{ worker: WorkerLite; score: number; band: string }> = [];
    for (const wp of pool) {
      if (taken.has(wp.id.toString())) {
        skipped += 1;
        continue;
      }
      const wLat = wp.area?.lat != null ? Number(wp.area.lat) : Number.NaN;
      const wLng = wp.area?.lng != null ? Number(wp.area.lng) : Number.NaN;
      const km = haversineKm(wLat, wLng, jobLat, jobLng);
      const inRadius =
        km !== null
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

  private async jobStatus(jobId: bigint): Promise<string> {
    const j = await this.prisma.job.findUnique({ where: { id: jobId }, select: { status: true } });
    return j?.status ?? 'NOT_FOUND';
  }

  async myOffers(caller: Caller, status?: string): Promise<QuickMatchOfferDto[]> {
    // Lazy expiry: anything past its window flips to EXPIRED on sight.
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

    // --- match reasons (owner brief §18): recompute the SAME reasonCodes
    // vocabulary the candidates endpoint uses, at read time — no schema
    // change, no client-invented reasons. Batched: one ctx per distinct job,
    // one worker fetch, one availability set per distinct window.
    const ctxByJob = new Map<string, JobCtx>();
    for (const pub of new Set(rows.map((r) => r.job.publicId))) {
      try {
        ctxByJob.set(pub, await this.jobCtx(pub));
      } catch {
        /* job vanished mid-read — reasons stay empty for those rows */
      }
    }
    const workerIds = [...new Set(rows.map((r) => r.workerProfileId))];
    const workerRows = workerIds.length
      ? ((await this.prisma.workerProfile.findMany({
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
        })) as unknown as WorkerLite[])
      : [];
    const wpById = new Map(workerRows.map((w) => [w.id.toString(), w]));
    const lastMap = await this.lastCompletedByWorker(workerIds);
    const slotCache = new Map<string, Set<string>>();
    const slotSetFor = async (from: Date, to: Date): Promise<Set<string>> => {
      const key = `${from.getTime()}|${to.getTime()}`;
      let set = slotCache.get(key);
      if (!set) {
        set = await this.availableInWindow(workerIds, from, to);
        slotCache.set(key, set);
      }
      return set;
    };
    // reason codes per offer row, computed BEFORE the synchronous DTO map
    const reasonsByRow = new Map<string, string[]>();
    for (const r of rows) {
      const ctx = ctxByJob.get(r.job.publicId);
      const wp = wpById.get(r.workerProfileId.toString());
      if (!ctx || !wp) {
        reasonsByRow.set(r.publicId, []);
        continue;
      }
      const slots = await slotSetFor(r.windowStart ?? r.job.startsOn, r.windowEnd ?? r.job.endsOn);
      reasonsByRow.set(
        r.publicId,
        this.scoreWorker(
          wp,
          ctx,
          lastMap.get(wp.id.toString()) ?? null,
          slots.has(wp.id.toString()),
        ).reasonCodes,
      );
    }

    return rows.map((r) => {
      const job = r.job;
      return {
        publicId: r.publicId,
        status: r.status as QuickMatchOfferDto['status'],
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
        expiringSoon:
          r.status === 'PENDING' && r.respondBy.getTime() - now <= 5 * 60_000,
        reasonCodes: reasonsByRow.get(r.publicId) ?? [],
      };
    });
  }

  /**
   * Quick Hire availability preview (owner brief §16/§17): REAL aggregate
   * counts for an owned job — open-to-work pool within the radius, skill
   * overlap, booked-in-window (currently working), score-eligible potential
   * matches — plus a distance-band distribution for the approximate-cluster
   * display. Aggregates only: no individual worker location ever leaves the
   * server (§17 privacy rule). Classification mirrors launchInner exactly.
   */
  async availability(caller: Caller, jobPublicId: string, radiusKmRaw?: number) {
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
    const taken = new Set(
      [...crewRows, ...appliedRows, ...offerRows].map((r) => r.workerProfileId.toString()),
    );
    const pool = poolRaw as unknown as WorkerLite[];
    // busy elsewhere: ACTIVE crew on ANOTHER job overlapping this job's dates
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
    const bandCounts = new Map<string, number>();

    for (const wp of pool) {
      const wLat = wp.area?.lat != null ? Number(wp.area.lat) : Number.NaN;
      const wLng = wp.area?.lng != null ? Number(wp.area.lng) : Number.NaN;
      const km = haversineKm(wLat, wLng, jobLat, jobLng);
      const inRadius =
        km !== null
          ? km <= radiusKm
          : Boolean(wp.area?.city && wp.area.city === ctx.city) || wp.city === ctx.city;
      if (!inRadius) continue;

      availableNearby += 1;
      if (wp.skills.some((s) => jobSkillIds.has(s.skillId.toString()))) matchingSkills += 1;

      const isTaken = taken.has(wp.id.toString());
      if (isTaken || busyElsewhere.has(wp.id.toString())) {
        // engaged already (this job's crew/applied/offers, or another job's
        // ACTIVE crew in the same date range) → "currently working"
        currentlyWorking += 1;
      } else {
        // launchable right now (mirrors launchInner inclusion exactly)
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

  async respond(caller: Caller, offerPublicId: string, body: QuickMatchRespond) {
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
      const application = await this.applications.apply(
        caller.accountId,
        {
          jobId: offer.job.publicId,
          coverNote: body.coverNote,
          offerId: offer.publicId,
        },
        `qm-respond-${offer.publicId}`, // replay-safe double-tap
      );
      return {
        status: 'ACCEPTED' as const,
        application: { publicId: application.publicId, status: application.status },
      };
    }

    // DECLINE — claim the offer (guard against a simultaneous accept).
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
    return { status: 'DECLINED' as const, application: null };
  }
}

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { ApiError } from '../common/api-error.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import {
  assertJobAction,
  deriveWorkDays,
  payLabel,
  type JobStatus,
} from './jobs.domain.js';
import type { JobCreate, JobSearch, JobFeedItem, JobCancel, JobMineQuery } from '@workbridge/contracts';

/**
 * Job lifecycle (M1) + discovery feed — Wave 3 (H4/H5).
 * Employer commands validate ownership + the publish gate (#10 CONFIRMED:
 * KYC VERIFIED to publish); the worker feed applies deterministic filters
 * server-side (§16) with eligibility badges + area-to-area distance.
 * Address/coordinates are shared with workers only post-hire (§18).
 */

interface JobRelations {
  id: bigint;
  publicId: string;
  employerProfileId: bigint;
  title: string;
  description: string;
  status: string;
  city: string;
  addressLine: string;
  lat: { toString(): string } | null;
  lng: { toString(): string } | null;
  startsOn: Date;
  endsOn: Date;
  dayStartTime: Date;
  dayEndTime: Date;
  payType: string;
  payAmountPaise: bigint;
  currency: string;
  headcountRequired: number;
  hiredCount: number;
  applicationCount: number;
  minExperienceYears: number | null;
  requirementsNote: string | null;
  publishedAt: Date | null;
  cancelledAt: Date | null;
  cancelReason: string | null;
  createdAt: Date;
  category: { publicId: string; code: string; name: string };
  area: { publicId: string; name: string; lat: { toString(): string } | null; lng: { toString(): string } | null };
  workDays: { workDate: Date; startTime: Date; endTime: Date }[];
  skills: { skill: { publicId: string; name: string } }[];
  welfare: { note: string | null; welfareItem: { code: string; label: string } }[];
  employer: {
    publicId: string;
    orgName: string;
    orgType: string;
    avgRatingMilli: number;
    ratingsCount: number;
    accountId: bigint;
  };
}

const JOB_INCLUDE = {
  category: true,
  area: true,
  workDays: { orderBy: { workDate: 'asc' as const } },
  skills: { include: { skill: true } },
  welfare: { include: { welfareItem: true } },
  employer: true,
};

const hhmm = (d: Date): string => d.toISOString().slice(11, 16);
const isoDate = (d: Date): string => d.toISOString().slice(0, 10);
const timeToDb = (t: string): Date => new Date(`1970-01-01T${t}:00.000Z`);
const dateToDb = (d: string): Date => new Date(`${d}T00:00:00.000Z`);
const dec = (v: { toString(): string } | null): number | null =>
  v === null ? null : Number(v.toString());

/** Great-circle km between two points; null when either side is unknown. */
const distanceKm = (
  a: { lat: number | null; lng: number | null },
  b: { lat: number | null; lng: number | null },
): number | null => {
  if (a.lat === null || a.lng === null || b.lat === null || b.lng === null) return null;
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(s)) * 10) / 10;
};

export const decodeOffset = (cursor?: string): number => {
  if (!cursor) return 0;
  const m = /^o:(\d{1,7})$/.exec(cursor);
  if (!m) throw new ApiError('VALIDATION_FAILED', 'Invalid cursor');
  return Number(m[1]);
};

/** Non-terminal application states that die when a job is cancelled. */
const SWEEPABLE = ['APPLIED', 'SHORTLISTED', 'WAITLISTED', 'HIRED'];

interface ViewerContext {
  accountId: bigint | null;
  workerProfileId: bigint | null;
  isOwner: boolean;
  applied: boolean;
  applicationStatus?: string;
  hasCrewSeat: boolean;
}

interface WorkerBadgeContext {
  skillIds: Set<string>;
  experienceYears: number;
  kycOk: boolean;
  areaId: bigint | null;
  lat: number | null;
  lng: number | null;
}

@Injectable()
export class JobsService implements OnModuleInit {
  private readonly logger = new Logger(JobsService.name);
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: DispatcherService,
    private readonly payments: PaymentsService,
  ) {}

  onModuleInit(): void {
    if (process.env.NODE_ENV === 'test') return;
    // J10 sweep: past-ends unfilled jobs → EXPIRED (hourly, dev server only).
    this.timer = setInterval(() => {
      this.expireSweep().catch((e) => this.logger.warn(`expire sweep failed: ${String(e)}`));
    }, 60 * 60 * 1000);
    this.timer.unref?.();
  }

  // ------------------------------------------------------------------ helpers

  private async employerProfile(accountId: bigint) {
    const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
    if (!profile) {
      throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
    }
    return profile;
  }

  private async kycStatusOf(accountId: bigint): Promise<string> {
    const sub = await this.prisma.kycSubmission.findFirst({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
      select: { status: true },
    });
    return sub?.status ?? 'NONE';
  }

  private async workerBadgeContext(accountId: bigint): Promise<WorkerBadgeContext | null> {
    const wp = await this.prisma.workerProfile.findUnique({
      where: { accountId },
      include: {
        skills: { select: { skill: { select: { publicId: true } } } },
        area: { select: { lat: true, lng: true } },
      },
    });
    if (!wp) return null;
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

  private async viewerContext(
    job: { id: bigint; employerProfileId: bigint },
    accountId: bigint | null,
  ): Promise<ViewerContext> {
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

  /** DTO builder — single source of truth for worker/employer/detail/feed views. */
  private async toDto(
    job: JobRelations,
    viewer: ViewerContext,
    badges: WorkerBadgeContext | null,
    withBadges: boolean,
  ): Promise<JobFeedItem> {
    // §18: address + exact coordinates shared with workers only post-hire.
    const ownerView = viewer.isOwner || viewer.workerProfileId === null; // employer/admin viewers
    const canSeeAddress = ownerView || viewer.hasCrewSeat;

    const base = {
      publicId: job.publicId,
      title: job.title,
      description: job.description,
      status: job.status as JobStatus,
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
      payType: job.payType as 'HOUR' | 'DAY' | 'TOTAL',
      payAmountPaise: Number(job.payAmountPaise),
      currency: 'INR' as const,
      payLabel: payLabel(job.payType as 'HOUR' | 'DAY' | 'TOTAL', Number(job.payAmountPaise)),
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
      } satisfies JobFeedItem['employer'],
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

    if (!withBadges || !badges) return base as JobFeedItem;

    const jobSkillIds = new Set(job.skills.map((s) => s.skill.publicId));
    let matchesSkills = jobSkillIds.size === 0;
    if (!matchesSkills) {
      for (const id of jobSkillIds) if (badges.skillIds.has(id)) { matchesSkills = true; break; }
    }
    const jobPoint = { lat: dec(job.lat), lng: dec(job.lng) };
    const fallbackPoint =
      jobPoint.lat === null ? { lat: dec(job.area.lat), lng: dec(job.area.lng) } : jobPoint;
    return {
      ...(base as JobFeedItem),
      distanceKm: distanceKm(fallbackPoint, { lat: badges.lat, lng: badges.lng }),
      viewerBadges: {
        matchesSkills,
        experienceOk: job.minExperienceYears === null || badges.experienceYears >= job.minExperienceYears,
        kycOk: badges.kycOk,
      },
    };
  }

  private async audit(
    accountId: bigint | null,
    role: string | null,
    action: string,
    publicId: string,
  ): Promise<void> {
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

  private async resolveRefs(input: { categoryId: string; areaId: string; skillIds?: string[]; welfare?: { code: string; note?: string }[] }) {
    const [category, area] = await Promise.all([
      this.prisma.jobCategory.findUnique({ where: { publicId: input.categoryId } }),
      this.prisma.area.findUnique({ where: { publicId: input.areaId } }),
    ]);
    if (!category || !category.active) throw new ApiError('VALIDATION_FAILED', 'Unknown job category');
    if (!area || !area.active) throw new ApiError('VALIDATION_FAILED', 'Unknown work area');

    let skills: { id: bigint }[] = [];
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

    let welfare: { welfareItemId: bigint; note: string | null }[] = [];
    if (input.welfare && input.welfare.length > 0) {
      const codes = [...new Set(input.welfare.map((w) => w.code))];
      const items = await this.prisma.welfareItem.findMany({
        where: { code: { in: codes }, active: true },
        select: { id: true, code: true },
      });
      if (items.length !== codes.length) throw new ApiError('VALIDATION_FAILED', 'Unknown welfare code');
      const byCode = new Map(items.map((i) => [i.code, i.id]));
      welfare = input.welfare.map((w) => ({
        welfareItemId: byCode.get(w.code)!,
        note: w.note ?? null,
      }));
    }
    return { category, area, skills, welfare };
  }

  // --------------------------------------------------------- employer commands

  async create(accountId: bigint, input: JobCreate) {
    const profile = await this.employerProfile(accountId);
    if (input.endsOn < input.startsOn) {
      throw new ApiError('VALIDATION_FAILED', 'endsOn must be on or after startsOn');
    }
    const days = deriveWorkDays(
      input.startsOn, input.endsOn, input.dayStartTime, input.dayEndTime, input.workDays,
    );
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

  async update(accountId: bigint, publicId: string, patch: Partial<JobCreate>) {
    const profile = await this.employerProfile(accountId);
    const job = await this.prisma.job.findUnique({ where: { publicId }, include: JOB_INCLUDE });
    if (!job || job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Job not found');
    if (job.status !== 'DRAFT') {
      throw new ApiError('STATE_INVALID', 'Only draft jobs can be edited — cancel instead');
    }

    const startsOn = patch.startsOn ?? isoDate(job.startsOn);
    const endsOn = patch.endsOn ?? isoDate(job.endsOn);
    const dayStartTime = patch.dayStartTime ?? hhmm(job.dayStartTime);
    const dayEndTime = patch.dayEndTime ?? hhmm(job.dayEndTime);
    const datesChanged =
      startsOn !== isoDate(job.startsOn) ||
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
      if (days) await tx.jobWorkDay.deleteMany({ where: { jobId: job.id } });
      if (patch.skillIds !== undefined) await tx.jobSkill.deleteMany({ where: { jobId: job.id } });
      if (patch.welfare !== undefined) await tx.jobWelfare.deleteMany({ where: { jobId: job.id } });
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
    return this.toDto(updated!, await this.viewerContext(job, accountId), null, false);
  }

  async mine(accountId: bigint, query: JobMineQuery) {
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
    const viewer = await this.viewerContext(
      { id: -1n, employerProfileId: profile.id } as never,
      accountId,
    );
    const items = await Promise.all(
      page.map((j) =>
        this.toDto(
          j,
          { ...viewer, isOwner: true },
          null,
          false,
        ),
      ),
    );
    return { data: items, meta: { next: hasMore ? `o:${skip + limit}` : null, count: total } };
  }

  async publish(accountId: bigint, publicId: string) {
    const profile = await this.employerProfile(accountId);
    const job = await this.prisma.job.findUnique({ where: { publicId }, include: { _count: { select: { welfare: true } } } });
    if (!job || job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Job not found');
    if (job._count.welfare === 0) {
      throw new ApiError('VALIDATION_FAILED', 'Declare at least one welfare item before publishing');
    }
    const kyc = await this.kycStatusOf(accountId);
    assertJobAction(job.status as JobStatus, 'PUBLISH', 'EMPLOYER', { kycStatus: kyc });

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
    return { publicId, status: 'OPEN' as const };
  }

  async cancel(accountId: bigint, publicId: string, input: JobCancel) {
    const profile = await this.employerProfile(accountId);
    const job = await this.prisma.job.findUnique({ where: { publicId } });
    if (!job || job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Job not found');
    assertJobAction(job.status as JobStatus, 'CANCEL', 'EMPLOYER', {
      crewHandlingConfirmed: input.crewHandlingConfirmed,
    });

    // Collect the humans to notify BEFORE the sweep (A9: queue → EXPIRED).
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
      // M4 P8: shell earnings die with the job (J9 guarantees zero approved
      // attendance — IN_PROGRESS jobs cannot be cancelled).
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
    return { publicId, status: 'CANCELLED' as const };
  }

  /**
   * J7 — employer completes an IN_PROGRESS job. Every attendance record must
   * be resolved first (APPROVED or NO_SHOW; manual NO_SHOW correction or the
   * 5-minute sweep handles no-shows). Then M4 P1 runs: each crew earning
   * turns ELIGIBLE with its locked amount (approved work × job terms), or
   * CANCELLED when nothing was approved — never a silent ₹0 payable.
   */
  async complete(accountId: bigint, publicId: string) {
    const profile = await this.employerProfile(accountId);
    const job = await this.prisma.job.findUnique({ where: { publicId } });
    if (!job || job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Job not found');

    const unresolved = await this.prisma.attendanceRecord.count({
      where: { jobId: job.id, status: { in: ['NOT_STARTED', 'CHECKED_IN', 'CHECKED_OUT'] } },
    });
    if (unresolved > 0) {
      throw new ApiError('STATE_INVALID', 'Resolve every attendance record first (approve, check out, or mark no-show)');
    }
    // J7 guard: the friendly check above already proved attendanceResolved
    assertJobAction(job.status as JobStatus, 'COMPLETE', 'EMPLOYER', { attendanceResolved: true });
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
    // §22.8: both sides get the rate-this-job prompt once the job completes.
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
    return { publicId, status: 'COMPLETED' as const, earnings };
  }

  /** J11 — hard delete, drafts only, children first (no cascade). */
  async remove(accountId: bigint, publicId: string) {
    const profile = await this.employerProfile(accountId);
    const job = await this.prisma.job.findUnique({ where: { publicId } });
    if (!job || job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Job not found');
    assertJobAction(job.status as JobStatus, 'DELETE', 'EMPLOYER');
    await this.prisma.$transaction([
      this.prisma.jobWelfare.deleteMany({ where: { jobId: job.id } }),
      this.prisma.jobSkill.deleteMany({ where: { jobId: job.id } }),
      this.prisma.jobWorkDay.deleteMany({ where: { jobId: job.id } }),
      this.prisma.job.delete({ where: { id: job.id } }),
    ]);
    await this.audit(accountId, 'EMPLOYER', 'JOB_DELETED', publicId);
    return { publicId, deleted: true };
  }

  // ------------------------------------------------------------- discovery

  async feed(accountId: bigint, query: JobSearch) {
    const limit = Math.min(Math.max(query.limit ?? 20, 1), 50);
    const skip = decodeOffset(query.cursor);
    const skillIds = query.skillIds ? query.skillIds.split(',').filter(Boolean) : [];
    const welfareCodes = query.welfareCodes ? query.welfareCodes.split(',').filter(Boolean) : [];

    const where = {
      status: { in: ['OPEN', 'HIRING'] },
      hiddenAt: null, // admin-moderated jobs are invisible in discovery
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

    // §16: deterministic server-side ordering; RELEVANCE = date order + client badges.
    const orderBy =
      query.sort === 'DATE_ASC'
        ? [{ startsOn: 'asc' as const }, { id: 'asc' as const }]
        : query.sort === 'PAY_DESC'
          ? [{ payAmountPaise: 'desc' as const }, { id: 'desc' as const }]
          : [{ startsOn: 'desc' as const }, { id: 'desc' as const }];

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
    const items = await Promise.all(
      page.map(async (j) => {
        const viewer = await this.viewerContext(j, accountId);
        return this.toDto(j, viewer, badges, true);
      }),
    );
    return { data: items, meta: { next: hasMore ? `o:${skip + limit}` : null, count: total } };
  }

  async detail(accountId: bigint, publicId: string) {
    const job = await this.prisma.job.findUnique({ where: { publicId }, include: JOB_INCLUDE });
    if (!job) throw new ApiError('NOT_FOUND', 'Job not found');
    const viewer = await this.viewerContext(job, accountId);
    if (job.status === 'DRAFT' && !viewer.isOwner) {
      throw new ApiError('NOT_FOUND', 'Job not found'); // drafts never leak
    }
    if (job.hiddenAt && !viewer.isOwner) {
      // admin-moderated: hidden from everyone but the owner (admins see via console)
      const acct = await this.prisma.account.findUnique({
        where: { id: accountId },
        select: { role: true },
      });
      if (acct?.role !== 'admin') throw new ApiError('NOT_FOUND', 'Job not found');
    }
    const badges = viewer.workerProfileId !== null ? await this.workerBadgeContext(accountId) : null;
    return this.toDto(job, viewer, badges, badges !== null);
  }

  // ----------------------------------------------------------------- system

  /** J10: past-ends unfilled jobs → EXPIRED + application sweep + audit. */
  async expireSweep(): Promise<{ expired: number }> {
    const today = new Date();
    const cutoff = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const stale = await this.prisma.job.findMany({
      where: { status: { in: ['OPEN', 'HIRING'] }, endsOn: { lt: new Date(cutoff) } },
      select: { id: true, publicId: true },
    });
    if (stale.length === 0) return { expired: 0 };
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
}

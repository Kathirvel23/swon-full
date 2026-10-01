import { Injectable, OnModuleInit } from '@nestjs/common';

import { ApiError } from '../common/api-error.js';
import { hmacish, randomToken, safeEqualHex } from '../common/crypto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import {
  approveEligible,
  assertCheckInWindow,
  assertCheckOutWindow,
  assertCorrect,
  assertReverseCheckIn,
  computeDurationMinutes,
  noShowDue,
  type AttendanceStatus,
  type DayWindow,
} from './attendance.domain.js';
import type { AttendanceCheck, AttendanceTokenDto, CorrectAttendance, RosterRow } from '@workbridge/contracts';

/**
 * H8 attendance (M3, §19): rotating signed QR payloads (≤60 s, single-use
 * per worker/day — nonce recorded), check-in/out windows around the work
 * day, employer roster with manual marks, day approval, and the in-process
 * sweeps (auto-checkout at day_end+grace, NO_SHOW at day_end+cutoff).
 *
 * Geofence is intentionally NOT enforced in V1 (owner decision: optional);
 * coordinates, when the client sends them, are recorded for audit only.
 * Tokens are minted server-side (employer display or the worker's own
 * "today" screen) — the signature is the authority, never client claims.
 */

const GRACE_MIN = 60; // early check-in / auto-checkout after day end
const CUTOFF_MIN = 120; // late check-in cutoff / NO_SHOW trigger after day end
const TOKEN_TTL_SEC = 60;
const ROTATE_EVERY_SEC = 30;

const secret = (): string => {
  const s = process.env.ATTENDANCE_TOKEN_SECRET ?? process.env.JWT_ACCESS_SECRET ?? '';
  if (!s) throw new ApiError('VALIDATION_FAILED', 'ATTENDANCE_TOKEN_SECRET is not configured');
  return s;
};

const isoDate = (d: Date): string => d.toISOString().slice(0, 10);
const minutesOfDay = (d: Date): number => d.getUTCHours() * 60 + d.getUTCMinutes();
/** V1 jobs are Asia/Kolkata — wall clock as minutes-from-midnight IST. */
const nowMinutesIst = (): number => {
  const ist = new Date(Date.now() + 330 * 60_000);
  return ist.getUTCHours() * 60 + ist.getUTCMinutes();
};
const todayIst = (): string => isoDate(new Date(Date.now() + 330 * 60_000));

interface TokenClaims {
  j: string; // job publicId
  d: string; // work date
  n: string; // nonce (recorded on check-in)
  e: number; // expiry epoch seconds
}

interface JobRelations {
  id: bigint;
  publicId: string;
  status: string;
  startsOn: Date;
  endsOn: Date;
  employerProfileId: bigint;
  workDays: { id: bigint; workDate: Date; startTime: Date; endTime: Date }[];
}

@Injectable()
export class AttendanceService implements OnModuleInit {
  private timer?: NodeJS.Timeout;

  constructor(
    private readonly prisma: PrismaService,
    private readonly dispatcher: DispatcherService,
  ) {}

  onModuleInit(): void {
    if (process.env.NODE_ENV === 'test') return;
    // T2/T4 sweeps: auto-checkout + NO_SHOW every 5 minutes (single node V1).
    this.timer = setInterval(() => {
      this.sweep().catch(() => undefined);
    }, 5 * 60 * 1000);
    this.timer.unref?.();
  }

  // ------------------------------------------------------------------ tokens

  private sign(claims: TokenClaims): string {
    const body = Buffer.from(JSON.stringify(claims)).toString('base64url');
    return `${body}.${hmacish(body, secret())}`;
  }

  private verify(payload: string): TokenClaims {
    const dot = payload.lastIndexOf('.');
    if (dot <= 0) throw new ApiError('ATTENDANCE_TOKEN_INVALID', 'Malformed attendance token');
    const body = payload.slice(0, dot);
    const sig = payload.slice(dot + 1);
    if (!safeEqualHex(sig, hmacish(body, secret()))) {
      throw new ApiError('ATTENDANCE_TOKEN_INVALID', 'Attendance token signature mismatch');
    }
    let claims: TokenClaims;
    try {
      claims = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as TokenClaims;
    } catch {
      throw new ApiError('ATTENDANCE_TOKEN_INVALID', 'Attendance token unreadable');
    }
    if (!claims?.j || !claims?.d || !claims?.e) {
      throw new ApiError('ATTENDANCE_TOKEN_INVALID', 'Attendance token incomplete');
    }
    if (claims.e < Math.floor(Date.now() / 1000)) {
      throw new ApiError('ATTENDANCE_TOKEN_EXPIRED', 'This QR code has expired — ask for a fresh one');
    }
    return claims;
  }

  private tokenDto(jobPublicId: string, workDate: string): AttendanceTokenDto {
    return {
      payload: this.sign({
        j: jobPublicId,
        d: workDate,
        n: randomToken(),
        e: Math.floor(Date.now() / 1000) + TOKEN_TTL_SEC,
      }),
      expiresSec: TOKEN_TTL_SEC,
      rotateEverySec: ROTATE_EVERY_SEC,
      jobPublicId,
      workDate,
    };
  }

  private async jobOwned(accountId: bigint, jobPublicId: string): Promise<JobRelations> {
    const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
    if (!profile) throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
    const job = await this.prisma.job.findUnique({
      where: { publicId: jobPublicId },
      include: { workDays: { orderBy: { workDate: 'asc' } } },
    });
    if (!job || job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Job not found');
    return job as unknown as JobRelations;
  }

  private windowOf(workDay: { startTime: Date; endTime: Date }): DayWindow {
    return {
      start: minutesOfDay(workDay.startTime),
      end: minutesOfDay(workDay.endTime),
      grace: GRACE_MIN,
      cutoff: CUTOFF_MIN,
    };
  }

  /** T0: records exist per crew × work day (created at hire) — find, don't create. */
  private async recordFor(jobId: bigint, workDate: string, workerProfileId: bigint) {
    const workDay = await this.prisma.jobWorkDay.findFirst({
      where: { jobId, workDate: new Date(`${workDate}T00:00:00.000Z`) },
    });
    if (!workDay) throw new ApiError('NOT_FOUND', 'No work day on that date');
    const record = await this.prisma.attendanceRecord.findFirst({
      where: { jobId, workDayId: workDay.id, workerProfileId },
      include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
    });
    if (!record) throw new ApiError('NOT_FOUND', 'No attendance record for that worker/day');
    return { workDay, record };
  }

  private dto(r: {
    publicId: string;
    status: string;
    workDay: { workDate: Date };
    checkInAt: Date | null;
    checkOutAt: Date | null;
    checkSource: string | null;
    durationMinutes: number | null;
    correctionReason: string | null;
    worker: { publicId: string; fullName: string };
    jobPublicId?: string;
  }, jobPublicId: string) {
    return {
      publicId: r.publicId,
      status: r.status,
      workDate: isoDate(r.workDay.workDate),
      checkInAt: r.checkInAt?.toISOString() ?? null,
      checkOutAt: r.checkOutAt?.toISOString() ?? null,
      checkSource: r.checkSource as 'SCAN' | 'EMPLOYER' | 'CORRECTED' | null,
      durationMinutes: r.durationMinutes,
      worker: { publicId: r.worker.publicId, fullName: r.worker.fullName, photoUrl: null },
      jobPublicId,
      correctionReason: r.correctionReason,
    };
  }

  private async audit(accountId: bigint | null, role: string, action: string, publicId: string, before?: unknown, after?: unknown) {
    await this.prisma.auditLog.create({
      data: {
        actorAccountId: accountId,
        actorRole: role,
        action,
        entityType: 'ATTENDANCE',
        entityPublicId: publicId,
        beforeJson: before as object | undefined,
        afterJson: after as object | undefined,
      },
    });
  }

  // ------------------------------------------------------------------ issue

  /** Employer: rotating QR for the work day that matches `date` (default today). */
  async issueToken(accountId: bigint, jobPublicId: string, date?: string): Promise<AttendanceTokenDto> {
    const job = await this.jobOwned(accountId, jobPublicId);
    const day = date ?? todayIst();
    const workDay = job.workDays.find((w) => isoDate(w.workDate) === day);
    if (!workDay) throw new ApiError('VALIDATION_FAILED', 'That date is not a work day for this job');
    if (!['OPEN', 'HIRING', 'FILLED', 'IN_PROGRESS'].includes(job.status)) {
      throw new ApiError('STATE_INVALID', `Job is ${job.status} — no attendance to take`);
    }
    return this.tokenDto(job.publicId, day);
  }

  /** Worker: today's shift (own crew seat) — token + current record for one-tap check-in/out. */
  async today(accountId: bigint) {
    const wp = await this.prisma.workerProfile.findUnique({ where: { accountId } });
    if (!wp) throw new ApiError('PROFILE_INCOMPLETE', 'Complete your work profile first');
    const day = todayIst();
    const crew = await this.prisma.crewMember.findFirst({
      where: {
        workerProfileId: wp.id,
        status: 'ACTIVE',
        job: { startsOn: { lte: new Date(`${day}T00:00:00.000Z`) } },
      },
      include: { job: { include: { workDays: { orderBy: { workDate: 'asc' } } } } },
    });
    if (!crew) return { token: null, record: null, job: null, workDate: day };
    const job = crew.job as unknown as JobRelations & { title: string; city: string; area: { name: string } | null };
    const workDay = job.workDays.find((w) => isoDate(w.workDate) === day);
    if (!workDay) return { token: null, record: null, job: null, workDate: day };

    const { record } = await this.recordFor(job.id, day, wp.id);
    return {
      token: this.tokenDto(job.publicId, day),
      record: this.dto(record as never, job.publicId),
      job: { publicId: job.publicId, title: job.title, city: job.city, areaName: job.area?.name ?? '' },
      workDate: day,
    };
  }

  // ------------------------------------------------------------------- check

  async check(accountId: bigint, input: AttendanceCheck) {
    const claims = this.verify(input.payload); // always verify — even for manual marks
    if (input.workerPublicId && input.workDate && input.workDate !== claims.d) {
      throw new ApiError('VALIDATION_FAILED', 'Manual mark date does not match the token day');
    }
    const job = await this.prisma.job.findUnique({
      where: { publicId: claims.j },
      include: { workDays: { orderBy: { workDate: 'asc' } } },
    });
    if (!job) throw new ApiError('NOT_FOUND', 'Job not found');
    if (['CANCELLED', 'EXPIRED', 'CLOSED', 'COMPLETED'].includes(job.status)) {
      throw new ApiError('STATE_INVALID', `Job is ${job.status}`);
    }

    // Who is being marked: manual = employer picks the worker; scan = self.
    let workerProfileId: bigint;
    let source: 'SCAN' | 'EMPLOYER';
    let role: string;
    if (input.workerPublicId) {
      const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
      if (!profile || profile.id !== job.employerProfileId) {
        throw new ApiError('FORBIDDEN', 'Only the hiring employer can mark attendance manually');
      }
      const target = await this.prisma.workerProfile.findUnique({ where: { publicId: input.workerPublicId } });
      if (!target) throw new ApiError('NOT_FOUND', 'Worker not found');
      workerProfileId = target.id;
      source = 'EMPLOYER';
      role = 'EMPLOYER';
    } else {
      const wp = await this.prisma.workerProfile.findUnique({ where: { accountId } });
      if (!wp) throw new ApiError('PROFILE_INCOMPLETE', 'Complete your work profile first');
      workerProfileId = wp.id;
      source = 'SCAN';
      role = 'WORKER';
    }

    const crew = await this.prisma.crewMember.findFirst({
      where: { jobId: job.id, workerProfileId, status: { in: ['ACTIVE', 'NO_SHOW'] } },
    });
    if (!crew) throw new ApiError('FORBIDDEN', 'That worker is not on this crew');

    const { workDay, record } = await this.recordFor(job.id, claims.d, workerProfileId);
    const day = this.windowOf(workDay);
    const now = nowMinutesIst();
    const before = { status: record.status, checkInAt: record.checkInAt, checkOutAt: record.checkOutAt };

    if (input.action === 'IN') {
      if ((record.status as AttendanceStatus) !== 'NOT_STARTED') {
        throw new ApiError('ATTENDANCE_DUPLICATE', 'Already checked in for this day');
      }
      assertCheckInWindow(now, day);
      const updated = await this.prisma.$transaction(async (tx) => {
        const fresh = await tx.attendanceRecord.findUnique({ where: { id: record.id } });
        if (!fresh || fresh.status !== 'NOT_STARTED') {
          throw new ApiError('ATTENDANCE_DUPLICATE', 'Already checked in for this day');
        }
        const row = await tx.attendanceRecord.update({
          where: { id: record.id },
          data: {
            status: 'CHECKED_IN',
            checkInAt: new Date(),
            checkSource: source,
            checkTokenId: claims.n,
            sourceLat: input.lat ?? null,
            sourceLng: input.lng ?? null,
          },
          include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
        });
        // J6: first check-in of the job opens the crew workspace.
        if (['OPEN', 'HIRING', 'FILLED'].includes(job.status)) {
          await tx.job.update({ where: { id: job.id }, data: { status: 'IN_PROGRESS' } });
        }
        return row;
      });
      await this.audit(accountId, role, 'ATTENDANCE_CHECK_IN', record.publicId, before, { status: 'CHECKED_IN', checkInAt: updated.checkInAt });
      return this.dto(updated as never, job.publicId);
    }

    // action === 'OUT'
    if ((record.status as AttendanceStatus) === 'CHECKED_OUT') {
      throw new ApiError('ATTENDANCE_DUPLICATE', 'Already checked out for this day');
    }
    if ((record.status as AttendanceStatus) !== 'CHECKED_IN') {
      throw new ApiError('STATE_INVALID', `Cannot check out from ${record.status}`);
    }
    assertCheckOutWindow(now, day);
    if (!record.checkInAt) throw new ApiError('STATE_INVALID', 'No check-in to close');
    const duration = computeDurationMinutes(record.checkInAt.toISOString(), new Date().toISOString());
    const updated = await this.prisma.$transaction(async (tx) => {
      const fresh = await tx.attendanceRecord.findUnique({ where: { id: record.id } });
      if (!fresh || fresh.status !== 'CHECKED_IN') {
        throw new ApiError('ATTENDANCE_DUPLICATE', 'Already checked out for this day');
      }
      return tx.attendanceRecord.update({
        where: { id: record.id },
        data: {
          status: 'CHECKED_OUT',
          checkOutAt: new Date(),
          checkSource: source,
          durationMinutes: duration,
          checkTokenId: claims.n,
        },
        include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
      });
    });
    await this.audit(accountId, role, 'ATTENDANCE_CHECK_OUT', record.publicId, before, { status: 'CHECKED_OUT', durationMinutes: duration });
    return this.dto(updated as never, job.publicId);
  }

  // ------------------------------------------------------------------ roster

  async roster(accountId: bigint, jobPublicId: string, date?: string) {
    const job = await this.jobOwned(accountId, jobPublicId);
    const day = date ?? (job.workDays.some((w) => isoDate(w.workDate) === todayIst()) ? todayIst() : isoDate(job.workDays[0]?.workDate ?? new Date()));
    const workDay = job.workDays.find((w) => isoDate(w.workDate) === day);
    if (!workDay) throw new ApiError('VALIDATION_FAILED', 'That date is not a work day for this job');

    const crew = await this.prisma.crewMember.findMany({
      where: { jobId: job.id, status: { in: ['ACTIVE', 'NO_SHOW', 'COMPLETED'] } },
      orderBy: { hiredAt: 'asc' },
      include: { workerProfile: { select: { publicId: true, fullName: true } } },
    });
    const records = await this.prisma.attendanceRecord.findMany({
      where: { jobId: job.id, workDayId: workDay.id },
      include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
    });
    const earnings = await this.prisma.earning.findMany({ where: { jobId: job.id } });
    const earningByWorker = new Map(earnings.map((e) => [e.workerProfileId.toString(), e.status]));

    const rows: RosterRow[] = crew.map((c) => {
      const record = records.find((r) => r.workerProfileId === c.workerProfileId);
      return {
        worker: {
          publicId: c.workerProfile.publicId,
          fullName: c.workerProfile.fullName,
          photoUrl: null,
          crewStatus: c.status as 'ACTIVE' | 'COMPLETED' | 'RELEASED' | 'NO_SHOW',
        },
        attendance: record ? (this.dto(record as never, job.publicId) as unknown as RosterRow['attendance']) : null,
        earningStatus: earningByWorker.get(c.workerProfileId.toString()) ?? 'PENDING',
      };
    });
    return { date: day, rows };
  }

  // ---------------------------------------------------------------- approve

  /** T3: bulk approve CHECKED_OUT records for the employer's own job. */
  async approve(accountId: bigint, recordIds: string[]) {
    const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
    if (!profile) throw new ApiError('PROFILE_INCOMPLETE', 'Complete your organisation profile first');
    const records = await this.prisma.attendanceRecord.findMany({
      where: { publicId: { in: recordIds } },
      include: { job: { select: { employerProfileId: true, publicId: true } }, worker: { select: { accountId: true } } },
    });
    if (records.length !== recordIds.length) throw new ApiError('NOT_FOUND', 'Some records were not found');
    for (const r of records) {
      if (r.job.employerProfileId !== profile.id) throw new ApiError('NOT_FOUND', 'Some records were not found');
      approveEligible(r.status as AttendanceStatus);
    }
    await this.prisma.attendanceRecord.updateMany({
      where: { publicId: { in: recordIds }, status: 'CHECKED_OUT' },
      data: { status: 'APPROVED' },
    });
    await this.audit(accountId, 'EMPLOYER', 'ATTENDANCE_APPROVED', records[0].job.publicId);
    await this.dispatcher.enqueue({
      eventKey: 'ATTENDANCE_APPROVED',
      recipientAccountIds: [...new Set(records.map((r) => r.worker.accountId))],
      contextType: 'JOB',
      contextPublicId: records[0].job.publicId,
      args: { days: String(records.length) },
    });
    return { approved: records.length };
  }

  // ----------------------------------------------------- correct / reverse

  /** T5 reversal (status → NOT_STARTED) and T6 audited corrections. */
  async correct(accountId: bigint, recordId: string, input: CorrectAttendance, role: 'EMPLOYER' | 'ADMIN') {
    const record = await this.prisma.attendanceRecord.findUnique({
      where: { publicId: recordId },
      include: { workDay: true, worker: { select: { publicId: true, fullName: true } }, job: { select: { employerProfileId: true, publicId: true } } },
    });
    if (!record) throw new ApiError('NOT_FOUND', 'Record not found');
    if (role === 'EMPLOYER') {
      const profile = await this.prisma.employerProfile.findUnique({ where: { accountId } });
      if (!profile || profile.id !== record.job.employerProfileId) throw new ApiError('NOT_FOUND', 'Record not found');
    }
    const current = record.status as AttendanceStatus;
    const isReversal = input.status === 'NOT_STARTED';
    if (isReversal) {
      assertReverseCheckIn(current, input.reason);
    } else {
      assertCorrect(current, { reason: input.reason, status: input.status as AttendanceStatus | undefined });
    }

    const before = { status: record.status, checkInAt: record.checkInAt, checkOutAt: record.checkOutAt, durationMinutes: record.durationMinutes };
    const data = isReversal
      ? { status: 'NOT_STARTED', checkInAt: null, checkOutAt: null, durationMinutes: null, checkSource: 'CORRECTED' as const, correctionReason: input.reason, correctedByAccountId: accountId }
      : {
          ...(input.status ? { status: input.status } : {}),
          ...(input.checkInAt ? { checkInAt: new Date(input.checkInAt) } : {}),
          ...(input.checkOutAt ? { checkOutAt: new Date(input.checkOutAt) } : {}),
          checkSource: 'CORRECTED' as const,
          correctionReason: input.reason,
          correctedByAccountId: accountId,
        };
    const updated = await this.prisma.attendanceRecord.update({
      where: { id: record.id },
      data,
      include: { workDay: true, worker: { select: { publicId: true, fullName: true } } },
    });
    await this.audit(accountId, role, isReversal ? 'ATTENDANCE_REVERSED' : 'ATTENDANCE_CORRECTED', record.publicId, before, {
      status: updated.status,
      checkInAt: updated.checkInAt,
      checkOutAt: updated.checkOutAt,
    });
    return this.dto(updated as never, record.job.publicId);
  }

  // ---------------------------------------------------------------- sweeps

  /** T2 auto-checkout + T4 NO_SHOW — run in-process every 5 minutes. */
  async sweep() {
    const now = nowMinutesIst();
    const open = await this.prisma.attendanceRecord.findMany({
      where: { status: 'CHECKED_IN' },
      include: { workDay: true, job: { select: { publicId: true, status: true, employerProfileId: true } }, worker: { select: { accountId: true } } },
    });
    let autoClosed = 0;
    for (const r of open) {
      if (!r.workDay) continue; // dangling work-day ref (FK-off wipes) — skip
      const day = this.windowOf(r.workDay);
      // a work date in the past is always overdue — minutes-of-day windows
      // cannot cross midnight (IST near-midnight edge)
      const pastDay = isoDate(r.workDay.workDate) < todayIst();
      if (!pastDay && now <= day.end + day.grace) continue;
      if (!r.checkInAt) continue;
      await this.prisma.attendanceRecord.update({
        where: { id: r.id },
        data: { status: 'CHECKED_OUT', checkOutAt: new Date(), durationMinutes: computeDurationMinutes(r.checkInAt.toISOString(), new Date().toISOString()) },
      });
      await this.audit(null, 'SYSTEM', 'ATTENDANCE_AUTO_CLOSED', r.publicId);
      autoClosed += 1;
    }

    const pending = await this.prisma.attendanceRecord.findMany({
      where: { status: 'NOT_STARTED' },
      include: { workDay: true, job: { select: { publicId: true, employerProfileId: true } }, worker: { select: { accountId: true } } },
    });
    let noShows = 0;
    for (const r of pending) {
      if (!r.workDay) continue; // dangling work-day ref (FK-off wipes) — skip
      const day = this.windowOf(r.workDay);
      const pastDay = isoDate(r.workDay.workDate) < todayIst();
      if (!pastDay && !noShowDue('NOT_STARTED', now, day)) continue;
      await this.prisma.attendanceRecord.update({ where: { id: r.id }, data: { status: 'NO_SHOW' } });
      await this.prisma.crewMember.updateMany({
        where: { jobId: r.jobId, workerProfileId: r.workerProfileId, status: 'ACTIVE' },
        data: { status: 'NO_SHOW' },
      });
      await this.audit(null, 'SYSTEM', 'ATTENDANCE_NO_SHOW', r.publicId);
      await this.dispatcher.enqueue({
        eventKey: 'ATTENDANCE_NO_SHOW',
        recipientAccountIds: [r.worker.accountId, r.job.employerProfileId ? (await this.prisma.employerProfile.findUnique({ where: { id: r.job.employerProfileId }, select: { accountId: true } }))?.accountId ?? 0n : 0n].filter((x) => x !== 0n),
        contextType: 'JOB',
        contextPublicId: r.job.publicId,
        args: { workDate: isoDate(r.workDay.workDate) },
      });
      noShows += 1;
    }
    return { autoClosed, noShows };
  }
}

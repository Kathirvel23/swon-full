import { Injectable } from '@nestjs/common';

import { ApiError } from '../common/api-error.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  computeIncentivePaise,
  normalisePct,
  pctFromConfig,
  statusToStored,
  summarise,
  uiStatus,
  WRITABLE,
  type UiStatus,
} from './staff.domain.js';

/**
 * Event Attendance Manager (owner brief 2026-10-05).
 *
 * A HIRED worker can be made ATTENDANCE_MANAGER for ONE job. That is an
 * EVENT-SCOPED capability stored in job_staff_assignment — never a global role.
 * Every manager endpoint re-derives the permission from that row, so changing
 * a job id in a request cannot unlock another event (§28).
 *
 * Attendance writes reuse the EXISTING attendance_record semantics (the same
 * manual mark the employer roster uses: check_source = EMPLOYER), with
 * correctedByAccountId recording WHO did it. Approved days are frozen — the
 * host must use the correction path.
 *
 * The incentive is computed ONLY here (server) from platform_config or the
 * per-event override, and written idempotently onto the manager's earning
 * adjustment (set, never accumulate → no duplicate bonus).
 */

/** platform_config key holding the default attendance-manager incentive %. */
const INCENTIVE_CONFIG_KEY = 'ATTENDANCE_MANAGER_INCENTIVE_PCT';

const today = (): string => new Date().toISOString().slice(0, 10);
const asDate = (yyyyMmDd: string): Date => new Date(`${yyyyMmDd}T00:00:00.000Z`);

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  // ------------------------------------------------------------- identity

  private async workerOf(accountId: bigint) {
    const w = await this.prisma.workerProfile.findUnique({ where: { accountId } });
    if (!w) throw new ApiError('FORBIDDEN', 'No worker profile on this account');
    return w;
  }

  private async employerOf(accountId: bigint) {
    const e = await this.prisma.employerProfile.findUnique({ where: { accountId } });
    if (!e) throw new ApiError('FORBIDDEN', 'Only the hiring host can manage event staff');
    return e;
  }

  /** EVENT-SCOPED gate for every manager endpoint. */
  private async assertManager(accountId: bigint, jobPublicId: string) {
    const worker = await this.workerOf(accountId);
    const job = await this.prisma.job.findUnique({
      where: { publicId: jobPublicId },
      select: {
        id: true,
        publicId: true,
        title: true,
        city: true,
        area: { select: { name: true } },
      },
    });
    if (!job) throw new ApiError('NOT_FOUND', 'Job not found');
    const assignment = await this.prisma.jobStaffAssignment.findFirst({
      where: {
        jobId: job.id,
        workerProfileId: worker.id,
        role: 'ATTENDANCE_MANAGER',
        status: 'ACTIVE',
      },
      select: { publicId: true, incentivePct: true },
    });
    if (!assignment) {
      throw new ApiError('FORBIDDEN', 'You are not the attendance manager for this event');
    }
    return { worker, job, assignment };
  }

  private async ownedJob(accountId: bigint, jobPublicId: string) {
    const employer = await this.employerOf(accountId);
    const job = await this.prisma.job.findUnique({
      where: { publicId: jobPublicId },
      select: { id: true, publicId: true, employerProfileId: true },
    });
    if (!job || job.employerProfileId !== employer.id) throw new ApiError('NOT_FOUND', 'Job not found');
    return { employer, job };
  }

  private async defaultPct(): Promise<number> {
    const row = await this.prisma.platformConfig.findUnique({
      where: { key: INCENTIVE_CONFIG_KEY },
      select: { valueJson: true },
    });
    return pctFromConfig(row?.valueJson ?? null);
  }

  // ------------------------------------------------- worker: my events

  /** The events THIS worker manages (drives the mobile entry point). */
  async myEvents(accountId: string) {
    const worker = await this.workerOf(BigInt(accountId));
    const rows = await this.prisma.jobStaffAssignment.findMany({
      where: { workerProfileId: worker.id, role: 'ATTENDANCE_MANAGER', status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      select: {
        publicId: true,
        incentivePct: true,
        job: {
          select: { publicId: true, title: true, startsOn: true, endsOn: true, city: true, status: true },
        },
      },
    });
    const fallback = await this.defaultPct();
    return rows.map((r) => ({
      assignmentPublicId: r.publicId,
      role: 'ATTENDANCE_MANAGER' as const,
      incentivePct: r.incentivePct == null ? fallback : normalisePct(Number(r.incentivePct)),
      job: {
        publicId: r.job.publicId,
        title: r.job.title,
        startsOn: r.job.startsOn.toISOString().slice(0, 10),
        endsOn: r.job.endsOn.toISOString().slice(0, 10),
        city: r.job.city,
        status: r.job.status,
      },
    }));
  }

  // --------------------------------------------- manager: event roster

  /** The event's crew + derived attendance + summary (manager only). */
  async eventAttendance(accountId: string, jobPublicId: string, date?: string) {
    const { job } = await this.assertManager(BigInt(accountId), jobPublicId);
    const workDate = date ?? today();

    const workDay = await this.prisma.jobWorkDay.findUnique({
      where: { jobId_workDate: { jobId: job.id, workDate: asDate(workDate) } },
      select: { id: true, startTime: true },
    });

    const crew = await this.prisma.crewMember.findMany({
      where: { jobId: job.id, status: { in: ['ACTIVE', 'COMPLETED', 'NO_SHOW'] } },
      orderBy: { hiredAt: 'asc' },
      select: {
        publicId: true,
        status: true,
        workerProfile: { select: { publicId: true, fullName: true } },
      },
    });

    const records = workDay
      ? await this.prisma.attendanceRecord.findMany({
          where: { jobId: job.id, workDayId: workDay.id },
          select: {
            publicId: true,
            status: true,
            checkInAt: true,
            checkOutAt: true,
            worker: { select: { publicId: true } },
          },
        })
      : [];
    const byWorker = new Map(records.map((r) => [r.worker.publicId, r]));

    const rows = crew.map((c) => {
      const rec = byWorker.get(c.workerProfile.publicId) ?? null;
      return {
        worker: {
          publicId: c.workerProfile.publicId,
          fullName: c.workerProfile.fullName,
          crewStatus: c.status,
        },
        status: uiStatus(rec, workDay?.startTime ?? null),
        recordPublicId: rec?.publicId ?? null,
        checkInAt: rec?.checkInAt?.toISOString() ?? null,
        checkOutAt: rec?.checkOutAt?.toISOString() ?? null,
        approved: rec?.status === 'APPROVED',
      };
    });

    return {
      job: {
        publicId: job.publicId,
        title: job.title,
        city: job.city,
        areaName: job.area?.name ?? null,
      },
      date: workDate,
      hasWorkDay: workDay != null,
      summary: summarise(rows.map((r) => r.status)),
      workers: rows,
    };
  }

  /** Manual mark by the event manager (PRESENT | ABSENT | NOT_MARKED). */
  async mark(
    accountId: string,
    jobPublicId: string,
    input: { workerPublicId: string; status: UiStatus; date?: string },
  ) {
    const acct = BigInt(accountId);
    const { job } = await this.assertManager(acct, jobPublicId);
    if (!WRITABLE.includes(input.status)) {
      throw new ApiError('VALIDATION_FAILED', 'LATE is derived from the check-in time and cannot be set by hand');
    }

    const target = await this.prisma.workerProfile.findUnique({
      where: { publicId: input.workerPublicId },
      select: { id: true },
    });
    if (!target) throw new ApiError('NOT_FOUND', 'Worker not found');

    const crew = await this.prisma.crewMember.findUnique({
      where: { jobId_workerProfileId: { jobId: job.id, workerProfileId: target.id } },
      select: { id: true },
    });
    if (!crew) throw new ApiError('FORBIDDEN', 'That worker is not on this event crew');

    const workDate = input.date ?? today();
    const workDay = await this.prisma.jobWorkDay.findUnique({
      where: { jobId_workDate: { jobId: job.id, workDate: asDate(workDate) } },
      select: { id: true, startTime: true },
    });
    if (!workDay) throw new ApiError('VALIDATION_FAILED', 'That date is not a work day for this event');

    const existing = await this.prisma.attendanceRecord.findUnique({
      where: {
        jobId_workerProfileId_workDayId: {
          jobId: job.id,
          workerProfileId: target.id,
          workDayId: workDay.id,
        },
      },
      select: { id: true, status: true, checkInAt: true },
    });
    if (existing?.status === 'APPROVED') {
      throw new ApiError('FORBIDDEN', 'That day is already approved — ask the host to correct it');
    }

    const stored = statusToStored(input.status);
    const now = new Date();
    const data = {
      status: stored,
      checkInAt: stored === 'CHECKED_IN' ? (existing?.checkInAt ?? now) : null,
      checkSource: 'EMPLOYER', // the only "manual" source the schema allows
      correctedByAccountId: acct,
      correctionReason: 'Marked by event attendance manager',
    };

    const record = existing
      ? await this.prisma.attendanceRecord.update({ where: { id: existing.id }, data })
      : await this.prisma.attendanceRecord.create({
          data: {
            jobId: job.id,
            workDayId: workDay.id,
            workerProfileId: target.id,
            crewMemberId: crew.id,
            ...data,
          },
        });

    return {
      recordPublicId: record.publicId,
      status: uiStatus(record, workDay.startTime),
    };
  }

  /** What the manager will earn for managing this event (read-only view). */
  async incentiveFor(accountId: string, jobPublicId: string) {
    const { worker, job, assignment } = await this.assertManager(BigInt(accountId), jobPublicId);
    const pct =
      assignment.incentivePct == null
        ? await this.defaultPct()
        : normalisePct(Number(assignment.incentivePct));

    const earning = await this.prisma.earning.findUnique({
      where: { jobId_workerProfileId: { jobId: job.id, workerProfileId: worker.id } },
      select: { amountPaise: true, adjustmentPaise: true, currency: true, status: true },
    });
    const base = Number(earning?.amountPaise ?? 0);
    const incentive = computeIncentivePaise(base, pct);
    return {
      basePaise: base,
      pct,
      incentivePaise: incentive,
      totalPaise: base + incentive,
      appliedPaise: Number(earning?.adjustmentPaise ?? 0),
      currency: earning?.currency ?? 'INR',
      earningStatus: earning?.status ?? null,
    };
  }

  // ------------------------------------- host: staff + incentive config

  /** Who manages attendance on this event (host view). */
  async staff(accountId: string, jobPublicId: string) {
    const { job } = await this.ownedJob(BigInt(accountId), jobPublicId);
    const rows = await this.prisma.jobStaffAssignment.findMany({
      where: { jobId: job.id, role: 'ATTENDANCE_MANAGER', status: 'ACTIVE' },
      orderBy: { createdAt: 'asc' },
      select: {
        publicId: true,
        incentivePct: true,
        worker: { select: { publicId: true, fullName: true } },
      },
    });
    const fallback = await this.defaultPct();
    return rows.map((r) => ({
      worker: { publicId: r.worker.publicId, fullName: r.worker.fullName },
      assignmentPublicId: r.publicId,
      incentivePct: r.incentivePct == null ? fallback : normalisePct(Number(r.incentivePct)),
      overridden: r.incentivePct != null,
    }));
  }

  /** Designate a hired crew member as the event's attendance manager. */
  async assign(
    accountId: string,
    jobPublicId: string,
    input: { workerPublicId: string; incentivePct?: number },
  ) {
    const acct = BigInt(accountId);
    const { job } = await this.ownedJob(acct, jobPublicId);
    const worker = await this.prisma.workerProfile.findUnique({
      where: { publicId: input.workerPublicId },
      select: { id: true, publicId: true, fullName: true },
    });
    if (!worker) throw new ApiError('NOT_FOUND', 'Worker not found');

    const crew = await this.prisma.crewMember.findUnique({
      where: { jobId_workerProfileId: { jobId: job.id, workerProfileId: worker.id } },
      select: { id: true, status: true },
    });
    if (!crew || crew.status !== 'ACTIVE') {
      throw new ApiError('FORBIDDEN', 'Only an active crew member can manage attendance');
    }

    const pct = input.incentivePct == null ? null : normalisePct(input.incentivePct);
    const row = await this.prisma.jobStaffAssignment.upsert({
      where: {
        jobId_workerProfileId_role: {
          jobId: job.id,
          workerProfileId: worker.id,
          role: 'ATTENDANCE_MANAGER',
        },
      },
      create: {
        jobId: job.id,
        workerProfileId: worker.id,
        role: 'ATTENDANCE_MANAGER',
        status: 'ACTIVE',
        assignedByAccountId: acct,
        incentivePct: pct,
      },
      update: { status: 'ACTIVE', assignedByAccountId: acct, incentivePct: pct },
      select: { publicId: true },
    });

    const effective = pct ?? (await this.defaultPct());
    return {
      assignmentPublicId: row.publicId,
      worker: { publicId: worker.publicId, fullName: worker.fullName },
      incentivePct: effective,
    };
  }

  /** Remove the capability (the person stays a normal worker on this event). */
  async revoke(accountId: string, jobPublicId: string, workerPublicId: string) {
    const { job } = await this.ownedJob(BigInt(accountId), jobPublicId);
    const worker = await this.prisma.workerProfile.findUnique({
      where: { publicId: workerPublicId },
      select: { id: true },
    });
    if (!worker) throw new ApiError('NOT_FOUND', 'Worker not found');
    const row = await this.prisma.jobStaffAssignment.findUnique({
      where: {
        jobId_workerProfileId_role: {
          jobId: job.id,
          workerProfileId: worker.id,
          role: 'ATTENDANCE_MANAGER',
        },
      },
      select: { id: true },
    });
    if (!row) throw new ApiError('NOT_FOUND', 'Not an attendance manager on this event');
    await this.prisma.jobStaffAssignment.update({
      where: { id: row.id },
      data: { status: 'REVOKED' },
    });
    return { revoked: true };
  }

  /**
   * Stamp the incentive onto the manager's earning for this event. Idempotent:
   * the adjustment is SET from the base amount, so re-running can never stack.
   */
  async applyIncentive(accountId: string, jobPublicId: string) {
    const { job } = await this.ownedJob(BigInt(accountId), jobPublicId);
    const assignment = await this.prisma.jobStaffAssignment.findFirst({
      where: { jobId: job.id, role: 'ATTENDANCE_MANAGER', status: 'ACTIVE' },
      orderBy: { createdAt: 'asc' },
      select: { workerProfileId: true, incentivePct: true },
    });
    if (!assignment) throw new ApiError('NOT_FOUND', 'No attendance manager on this event');

    const pct =
      assignment.incentivePct == null
        ? await this.defaultPct()
        : normalisePct(Number(assignment.incentivePct));

    const earning = await this.prisma.earning.findUnique({
      where: { jobId_workerProfileId: { jobId: job.id, workerProfileId: assignment.workerProfileId } },
      select: { id: true, publicId: true, amountPaise: true, status: true },
    });
    if (!earning) throw new ApiError('NOT_FOUND', 'The manager has no earning for this event yet');
    if (earning.status === 'PAID' || earning.status === 'PROCESSING') {
      throw new ApiError('VALIDATION_FAILED', 'That earning is already being paid — adjust before payment');
    }

    const incentive = computeIncentivePaise(Number(earning.amountPaise), pct);
    const updated = await this.prisma.earning.update({
      where: { id: earning.id },
      data: {
        adjustmentPaise: incentive,
        adjustmentReason: incentive > 0 ? `Attendance manager incentive ${pct}%` : null,
      },
      select: { publicId: true, amountPaise: true },
    });
    return {
      earningPublicId: updated.publicId,
      pct,
      incentivePaise: incentive,
      totalPaise: Number(updated.amountPaise) + incentive,
    };
  }
}

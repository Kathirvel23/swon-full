import { ApiError } from '../common/api-error.js';

/**
 * M3 attendance state machine (Database/STATE_MACHINES.md T0–T6) + the §19
 * time-window rules. Pure — no Prisma, no Nest. Times are minutes-from-
 * midnight in the job's timezone (Asia/Kolkata for all V1 jobs).
 */

export type AttendanceStatus = 'NOT_STARTED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'APPROVED' | 'NO_SHOW';

export interface DayWindow {
  /** day start, minutes from midnight */
  start: number;
  /** day end, minutes from midnight */
  end: number;
  /** minutes allowed BEFORE day start (early check-in) */
  grace: number;
  /** minutes allowed AFTER day start (late check-in) and after day end (auto-close) */
  cutoff: number;
}

/** T1 guard: [day_start − grace, day_start + cutoff]. */
export function assertCheckInWindow(nowMinutes: number, day: DayWindow): void {
  if (nowMinutes < day.start - day.grace || nowMinutes > day.start + day.cutoff) {
    throw new ApiError('ATTENDANCE_WINDOW_CLOSED', 'Outside the check-in window for this shift');
  }
}

/** T2 guard: checkout runs until day end + grace (auto-close boundary). */
export function assertCheckOutWindow(nowMinutes: number, day: DayWindow): void {
  if (nowMinutes > day.end + day.grace) {
    throw new ApiError('ATTENDANCE_WINDOW_CLOSED', 'The check-out window for this day has closed');
  }
}

/** T2 side effect: whole minutes between check-in and check-out. */
export function computeDurationMinutes(checkInAt: string, checkOutAt: string): number {
  const ms = Date.parse(checkOutAt) - Date.parse(checkInAt);
  if (Number.isNaN(ms) || ms < 0) {
    throw new ApiError('VALIDATION_FAILED', 'Check-out must come after check-in');
  }
  return Math.floor(ms / 60_000);
}

/** T3: only a closed-out day can be approved (NO_SHOW days stay NO_SHOW). */
export function approveEligible(status: AttendanceStatus): AttendanceStatus {
  if (status !== 'CHECKED_OUT') {
    throw new ApiError('STATE_INVALID', `Cannot approve a ${status} record`);
  }
  return 'APPROVED';
}

/** T4 sweep: no check-in by day end + cutoff → NO_SHOW. */
export function noShowDue(status: AttendanceStatus, nowMinutes: number, day: DayWindow): boolean {
  return status === 'NOT_STARTED' && nowMinutes >= day.end + day.cutoff;
}

/** T5: erroneous check-in reversal — reason mandatory (≥5 chars, mirrors contract). */
export function assertReverseCheckIn(status: AttendanceStatus, reason?: string): void {
  if (!reason || reason.trim().length < 5) {
    throw new ApiError('VALIDATION_FAILED', 'A reversal reason is required');
  }
  if (status !== 'CHECKED_IN') {
    throw new ApiError('STATE_INVALID', `Only a CHECKED_IN record can be reversed (this is ${status})`);
  }
}

/**
 * T6: audited edits of times/status — never silent, never re-entry.
 * The day's final state cannot walk backwards; reversal (T5) is a separate,
 * reason-tracked path. Corrections touch an already-checked-in record only.
 */
export function assertCorrect(
  status: AttendanceStatus,
  patch: { reason?: string; status?: AttendanceStatus; checkInAt?: string; checkOutAt?: string },
): void {
  if (!patch.reason || patch.reason.trim().length < 5) {
    throw new ApiError('VALIDATION_FAILED', 'A correction reason is required');
  }
  if (status === 'NOT_STARTED') {
    // Nothing was ever checked in — the only legal correction is the
    // employer declaring the no-show early (T4, with a reason).
    if (patch.status !== 'NO_SHOW') {
      throw new ApiError('STATE_INVALID', 'Nothing has been checked in yet');
    }
    return;
  }
  if (patch.status) {
    // ✗ APPROVED → earlier states (day final — corrections edit values, not re-entry)
    if (status === 'APPROVED' || patch.status === 'NOT_STARTED') {
      throw new ApiError('STATE_INVALID', 'Corrections never reopen a day — use the reversal path');
    }
  }
}

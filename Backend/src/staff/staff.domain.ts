/**
 * Event Attendance Manager — pure logic (owner brief 2026-10-05).
 *
 * The stored attendance state machine (NOT_STARTED | CHECKED_IN | CHECKED_OUT |
 * APPROVED | NO_SHOW) drives PAYMENT eligibility, so it is left exactly as it
 * is. The manager's vocabulary (PRESENT | LATE | ABSENT | NOT_MARKED) is a
 * DERIVED view of it: LATE is computed from the check-in time and is never
 * written back. No money-linked column changes.
 */

/** Manager vocabulary — what the event manager sees per worker. */
export type UiStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'NOT_MARKED';

/** Minutes past the shift start before an arrival counts as LATE. */
export const LATE_GRACE_MIN = 10;

/** What a manager is allowed to write (LATE is derived, never set). */
export const WRITABLE: readonly UiStatus[] = ['PRESENT', 'ABSENT', 'NOT_MARKED'];

/**
 * Derive the manager-facing status. `record` is the stored row (or null when
 * nothing has been marked yet); `dayStart` is the work day's start time.
 */
export function uiStatus(
  record: { status: string; checkInAt: Date | null } | null,
  dayStart: Date | null,
  graceMin: number = LATE_GRACE_MIN,
): UiStatus {
  if (record == null || record.status === 'NOT_STARTED') return 'NOT_MARKED';
  if (record.status === 'NO_SHOW') return 'ABSENT';
  if (record.checkInAt != null && dayStart != null) {
    const lateAfter = dayStart.getTime() + graceMin * 60_000;
    if (record.checkInAt.getTime() > lateAfter) return 'LATE';
  }
  return 'PRESENT';
}

/** Manager vocabulary → stored status (only these are legal writes). */
export function statusToStored(ui: UiStatus): 'CHECKED_IN' | 'NO_SHOW' | 'NOT_STARTED' {
  if (ui === 'ABSENT') return 'NO_SHOW';
  if (ui === 'NOT_MARKED') return 'NOT_STARTED';
  return 'CHECKED_IN';
}

export function summarise(statuses: readonly UiStatus[]) {
  return {
    total: statuses.length,
    present: statuses.filter((s) => s === 'PRESENT').length,
    late: statuses.filter((s) => s === 'LATE').length,
    absent: statuses.filter((s) => s === 'ABSENT').length,
    notMarked: statuses.filter((s) => s === 'NOT_MARKED').length,
  };
}

/** Clamp a configured percentage into 0…100 — a stored value is never trusted. */
export function normalisePct(raw: unknown): number {
  const n = typeof raw === 'number' ? raw : Number(raw);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(100, n);
}

/** Read the % out of a platform_config JSON value (a bare number or { pct }). */
export function pctFromConfig(value: unknown): number {
  if (typeof value === 'number') return normalisePct(value);
  if (value !== null && typeof value === 'object' && 'pct' in (value as Record<string, unknown>)) {
    return normalisePct((value as Record<string, unknown>).pct);
  }
  return 0;
}

/** Incentive = base × pct / 100, in paise. Server-side authority (§26). */
export function computeIncentivePaise(basePaise: number, pct: number): number {
  if (!Number.isFinite(basePaise) || basePaise <= 0) return 0;
  const p = normalisePct(pct);
  if (p <= 0) return 0;
  return Math.round((basePaise * p) / 100);
}

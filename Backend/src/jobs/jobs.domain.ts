import { ApiError } from '../common/api-error.js';

type ApiErrorCode = ConstructorParameters<typeof ApiError>[0];

/**
 * M1 job state machine (Database/STATE_MACHINES.md rows J1–J11) as a pure
 * transition table: state × event × actor × guards → next status, or a
 * catalog error. One spec row per table line (unit-tested RED-first).
 * Side effects (notifications, denorms, application sweeps) live in
 * jobs.service.ts — this file decides WHAT is legal, never writes.
 */

export type JobStatus =
  | 'DRAFT' | 'OPEN' | 'HIRING' | 'FILLED' | 'IN_PROGRESS'
  | 'COMPLETED' | 'CLOSED' | 'CANCELLED' | 'EXPIRED';

export type JobActor = 'EMPLOYER' | 'ADMIN' | 'WORKER' | 'SYSTEM';

export interface JobGuards {
  /** J9: employer confirmed the crew-handling step in the cancel dialog. */
  crewHandlingConfirmed?: boolean;
  /** J7: every work day's attendance ∈ {APPROVED, NO_SHOW}. */
  attendanceResolved?: boolean;
  /** J8: all linked earnings ∈ {PAID, CANCELLED} or grace elapsed. */
  earningsSettled?: boolean;
  /** J1: #10 CONFIRMED gate — publish requires VERIFIED. */
  kycStatus?: string | null;
}

export type JobEvent =
  | 'PUBLISH' | 'FIRST_APPLICATION' | 'STAFFED' | 'SHORTFALL' | 'RELEASE_ALL'
  | 'START' | 'COMPLETE' | 'CLOSE' | 'CANCEL' | 'EXPIRE' | 'DELETE';

interface EventRule {
  from: JobStatus[];
  to: JobStatus | 'DELETED';
  actors: JobActor[];
  guard?: (g: JobGuards) => ApiErrorCode | null; // returns error code or null
}

const RULES: Record<JobEvent, EventRule> = {
  PUBLISH: {
    from: ['DRAFT'], to: 'OPEN', actors: ['EMPLOYER'],
    guard: (g) => (g.kycStatus === 'VERIFIED' ? null : 'KYC_REQUIRED'), // §36a #10
  },
  FIRST_APPLICATION: { from: ['OPEN'], to: 'HIRING', actors: ['SYSTEM'] }, // J2
  STAFFED: { from: ['OPEN', 'HIRING'], to: 'FILLED', actors: ['SYSTEM'] }, // J3
  SHORTFALL: { from: ['FILLED'], to: 'HIRING', actors: ['SYSTEM'] }, // J4
  RELEASE_ALL: { from: ['HIRING'], to: 'OPEN', actors: ['SYSTEM'] }, // J5
  START: {
    from: ['OPEN', 'HIRING', 'FILLED'], to: 'IN_PROGRESS',
    actors: ['SYSTEM', 'EMPLOYER'],
  }, // J6
  COMPLETE: {
    from: ['IN_PROGRESS'], to: 'COMPLETED', actors: ['EMPLOYER', 'SYSTEM'],
    guard: (g) => (g.attendanceResolved ? null : 'STATE_INVALID'),
  }, // J7
  CLOSE: {
    from: ['COMPLETED'], to: 'CLOSED', actors: ['EMPLOYER', 'SYSTEM'],
    guard: (g) => (g.earningsSettled ? null : 'STATE_INVALID'),
  }, // J8
  CANCEL: {
    from: ['OPEN', 'HIRING', 'FILLED'], to: 'CANCELLED',
    actors: ['EMPLOYER', 'ADMIN'],
    guard: (g) => (g.crewHandlingConfirmed ? null : 'VALIDATION_FAILED'),
  }, // J9 — NOT IN_PROGRESS (that state simply isn't allowed)
  EXPIRE: { from: ['OPEN', 'HIRING'], to: 'EXPIRED', actors: ['SYSTEM'] }, // J10
  DELETE: { from: ['DRAFT'], to: 'DELETED', actors: ['EMPLOYER'] }, // J11
};

/** Pure transition: returns the target status or throws the catalog error. */
export function assertJobAction(
  current: JobStatus,
  event: JobEvent,
  actor: JobActor,
  guards: JobGuards = {},
): JobStatus | 'DELETED' {
  const rule = RULES[event];
  if (!rule) throw new ApiError('VALIDATION_FAILED', `Unknown job event: ${event}`);
  if (!rule.from.includes(current)) {
    throw new ApiError('STATE_INVALID', `Job in ${current} cannot ${event}`);
  }
  if (!rule.actors.includes(actor)) {
    throw new ApiError('FORBIDDEN', `Role ${actor} cannot ${event} a job`);
  }
  const guardCode = rule.guard?.(guards);
  if (guardCode) throw new ApiError(guardCode, guardMessage(guardCode, current, event));
  return rule.to;
}

function guardMessage(code: string, current: JobStatus, event: JobEvent): string {
  if (code === 'KYC_REQUIRED') {
    return 'Verify your identity before publishing jobs (KYC required to publish)';
  }
  if (code === 'VALIDATION_FAILED') {
    return 'Confirm how hired crew will be handled before cancelling';
  }
  return `Job in ${current} cannot ${event}`;
}

// ---------------------------------------------------------------------------
// W3 helpers
// ---------------------------------------------------------------------------

export interface WorkDay {
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
}

const MAX_DERIVED_DAYS = 90;
const MAX_RANGE_DAYS = 366;

const toUtcMs = (date: string): number => {
  const [y, m, d] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
};

const fromUtcMs = (ms: number): string => new Date(ms).toISOString().slice(0, 10);

/**
 * Explicit work days win (times default to the job's day window); otherwise
 * every day in [startsOn..endsOn] is derived. Ranges are validated before
 * expansion — reversed or absurd windows are rejected, never silently clamped.
 */
export function deriveWorkDays(
  startsOn: string,
  endsOn: string,
  dayStartTime: string,
  dayEndTime: string,
  explicit?: { date: string; startTime?: string; endTime?: string; headcount?: number }[],
): WorkDay[] {
  const start = toUtcMs(startsOn);
  const end = toUtcMs(endsOn);
  if (Number.isNaN(start) || Number.isNaN(end) || end < start) {
    throw new ApiError('VALIDATION_FAILED', 'endsOn must be on or after startsOn');
  }
  if (end - start > MAX_RANGE_DAYS * 86_400_000) {
    throw new ApiError('VALIDATION_FAILED', `Work window cannot exceed ${MAX_RANGE_DAYS} days`);
  }

  if (explicit && explicit.length > 0) {
    const days: WorkDay[] = explicit.map((w) => {
      const ms = toUtcMs(w.date);
      if (Number.isNaN(ms) || ms < start || ms > end) {
        throw new ApiError('VALIDATION_FAILED', `Work day ${w.date} is outside the job's date range`);
      }
      return {
        date: w.date,
        startTime: w.startTime ?? dayStartTime,
        endTime: w.endTime ?? dayEndTime,
      };
    });
    return days;
  }

  const days: WorkDay[] = [];
  for (let ms = start; ms <= end; ms += 86_400_000) {
    if (days.length >= MAX_DERIVED_DAYS) {
      throw new ApiError('VALIDATION_FAILED', `Too many work days — list explicit days (max ${MAX_DERIVED_DAYS})`);
    }
    days.push({ date: fromUtcMs(ms), startTime: dayStartTime, endTime: dayEndTime });
  }
  return days;
}

/** Pre-rendered human pay label (server-side fallback, §8 money rules). */
export function payLabel(payType: 'HOUR' | 'DAY' | 'TOTAL', payAmountPaise: number): string {
  const rupees = Math.round(payAmountPaise / 100).toLocaleString('en-IN');
  if (payType === 'HOUR') return `₹${rupees} / hour`;
  if (payType === 'DAY') return `₹${rupees} / day`;
  return `₹${rupees} total`;
}

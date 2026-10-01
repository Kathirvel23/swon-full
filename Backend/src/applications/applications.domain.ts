import { ApiError } from '../common/api-error.js';

/**
 * M2 application state machine (Database/STATE_MACHINES.md A0–A10) plus the
 * job-status derivations J2–J5 that the hire/release transactions perform.
 * Pure — no Prisma, no Nest. Mirrors jobs.domain.ts: guards throw ApiError
 * with catalog codes so the HTTP layer needs no translation.
 */

export type ApplicationAction =
  | 'shortlist' // A1, A4
  | 'waitlist' // A2, A4
  | 'reject' // A3
  | 'hire' // A5
  | 'release' // A8 (employer cancels a hired seat, reason required)
  | 'withdraw'; // A6/A7 (worker self)

type From = string; // application status on the row

/** A1–A5, A8: legal `from` states per action (A0 apply is job-side, A9 system). */
const ACTION_RULES: Record<ApplicationAction, readonly From[]> = {
  // A1: APPLIED → SHORTLISTED; A4 swap: WAITLISTED → SHORTLISTED
  shortlist: ['APPLIED', 'WAITLISTED'],
  // A2: APPLIED → WAITLISTED; A4 swap: SHORTLISTED → WAITLISTED
  waitlist: ['APPLIED', 'SHORTLISTED'],
  // A3: APPLIED / WAITLISTED / SHORTLISTED → REJECTED
  reject: ['APPLIED', 'WAITLISTED', 'SHORTLISTED'],
  // A5: live pre-hire states → HIRED
  hire: ['APPLIED', 'WAITLISTED', 'SHORTLISTED'],
  // A8: HIRED → CANCELLED (crew → RELEASED, reason required — checked by caller)
  release: ['HIRED'],
  // A6: pre-hire self-withdraw; A7: HIRED self-withdraw (job pre-start — caller checks J6 lock)
  withdraw: ['APPLIED', 'WAITLISTED', 'SHORTLISTED', 'HIRED'],
};

export function assertApplicationAction(action: ApplicationAction, from: From): void {
  const allowed = ACTION_RULES[action];
  if (!allowed) throw new ApiError('VALIDATION_FAILED', `Unknown application action: ${action}`);
  if (!allowed.includes(from)) {
    throw new ApiError('APPLICATION_NOT_APPLICABLE', `Application in ${from} cannot ${action}`);
  }
}

/**
 * A0 job-side guards: job ∈ {OPEN, HIRING} and a free seat.
 * Note the deliberate order: a FILLED row (or seats taken inside a race
 * window) reports JOB_ALREADY_FILLED — the closer, more useful code.
 */
export function assertCanApply(jobStatus: string, headcountRequired: number, hiredCount: number): void {
  if (jobStatus === 'CANCELLED') throw new ApiError('JOB_CANCELLED', 'Job was cancelled');
  if (jobStatus === 'FILLED') {
    throw new ApiError('JOB_ALREADY_FILLED', 'No seats left');
  }
  if (hiredCount >= headcountRequired) {
    throw new ApiError('JOB_ALREADY_FILLED', 'No seats left');
  }
  if (jobStatus !== 'OPEN' && jobStatus !== 'HIRING') {
    throw new ApiError('JOB_NOT_OPEN', `Job is ${jobStatus}`);
  }
}

/** A6/A7: worker may withdraw only before the job locks up (J6 IN_PROGRESS). */
export function assertWithdraw(from: From, jobStatus: string): void {
  const allowed = ACTION_RULES.withdraw;
  if (!allowed.includes(from)) {
    throw new ApiError('APPLICATION_NOT_APPLICABLE', `Application in ${from} cannot withdraw`);
  }
  if (jobStatus === 'IN_PROGRESS' || jobStatus === 'COMPLETED' || jobStatus === 'CLOSED') {
    throw new ApiError('STATE_INVALID', `Job is ${jobStatus} — work already started`);
  }
}

/** J2: first application on an OPEN job flips it to HIRING (System). */
export function statusAfterFirstApplication(jobStatus: string): string {
  return jobStatus === 'OPEN' ? 'HIRING' : jobStatus;
}

/** J3: hire tx — FILLED when the seat taken fills the headcount, else HIRING. */
export function statusAfterHire(hiredCountAfter: number, headcountRequired: number): string {
  return hiredCountAfter >= headcountRequired ? 'FILLED' : 'HIRING';
}

/** J4/J5: release tx — last seat out normalizes back to OPEN, else HIRING. */
export function statusAfterRelease(hiredCountAfter: number, _headcountRequired: number): string {
  return hiredCountAfter === 0 ? 'OPEN' : 'HIRING';
}

/**
 * §16/§17 overlap: date-only windows (inclusive) that touch on any day
 * count as conflicting — a worker cannot crew two jobs on the same date.
 */
export function windowsOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  // ISO yyyy-mm-dd compares lexicographically = chronologically.
  return aStart <= bEnd && bStart <= aEnd;
}

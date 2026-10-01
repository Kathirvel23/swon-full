import { describe, expect, it } from 'vitest';

import { ApiError } from '../../common/api-error.js';
import {
  assertJobAction,
  deriveWorkDays,
  payLabel,
  type JobActor,
  type JobGuards,
} from '../jobs.domain.js';

/**
 * RED-first unit tests for the M1 job state machine
 * (Database/STATE_MACHINES.md — one test per row + one per ✗ example),
 * plus W3 helpers: derived work days and the pay label.
 */

const code = (fn: () => unknown): string => {
  try {
    fn();
    return 'NO_ERROR';
  } catch (e) {
    return e instanceof ApiError ? e.code : `UNEXPECTED:${String(e)}`;
  }
};

const employer: JobActor = 'EMPLOYER';
const admin: JobActor = 'ADMIN';
const system: JobActor = 'SYSTEM';
const guards: JobGuards = { crewHandlingConfirmed: true, attendanceResolved: true, earningsSettled: true };

describe('M1 — J1 publish (DRAFT → OPEN)', () => {
  it('J1: employer publishes a draft → OPEN', () => {
    expect(assertJobAction('DRAFT', 'PUBLISH', employer, { ...guards, kycStatus: 'VERIFIED' })).toBe('OPEN');
  });
  it('J1 guard: KYC gate (#10 verify-to-publish) blocks publish → KYC_REQUIRED', () => {
    expect(code(() => assertJobAction('DRAFT', 'PUBLISH', employer, { ...guards, kycStatus: 'NONE' }))).toBe('KYC_REQUIRED');
    expect(code(() => assertJobAction('DRAFT', 'PUBLISH', employer, { ...guards, kycStatus: 'SUBMITTED' }))).toBe('KYC_REQUIRED');
    expect(code(() => assertJobAction('DRAFT', 'PUBLISH', employer, { ...guards, kycStatus: 'REJECTED' }))).toBe('KYC_REQUIRED');
  });
  it('J1: only DRAFT can be published → STATE_INVALID elsewhere', () => {
    expect(code(() => assertJobAction('OPEN', 'PUBLISH', employer, { ...guards, kycStatus: 'VERIFIED' }))).toBe('STATE_INVALID');
    expect(code(() => assertJobAction('CANCELLED', 'PUBLISH', employer, { ...guards, kycStatus: 'VERIFIED' }))).toBe('STATE_INVALID');
  });
});

describe('M1 — system transitions J2–J8', () => {
  it('J2: OPEN → HIRING (first application)', () => {
    expect(assertJobAction('OPEN', 'FIRST_APPLICATION', system, guards)).toBe('HIRING');
  });
  it('J3: HIRING → FILLED when staffed', () => {
    expect(assertJobAction('HIRING', 'STAFFED', system, guards)).toBe('FILLED');
    expect(assertJobAction('OPEN', 'STAFFED', system, guards)).toBe('FILLED');
  });
  it('J4: FILLED → HIRING on shortfall (release)', () => {
    expect(assertJobAction('FILLED', 'SHORTFALL', system, guards)).toBe('HIRING');
  });
  it('J5: HIRING → OPEN when all seats released', () => {
    expect(assertJobAction('HIRING', 'RELEASE_ALL', system, guards)).toBe('OPEN');
  });
  it('J6: OPEN/HIRING/FILLED → IN_PROGRESS (first check-in)', () => {
    expect(assertJobAction('OPEN', 'START', system, guards)).toBe('IN_PROGRESS');
    expect(assertJobAction('HIRING', 'START', employer, guards)).toBe('IN_PROGRESS');
    expect(assertJobAction('FILLED', 'START', system, guards)).toBe('IN_PROGRESS');
  });
  it('J6 guard: DRAFT cannot start', () => {
    expect(code(() => assertJobAction('DRAFT', 'START', system, guards))).toBe('STATE_INVALID');
  });
  it('J7: IN_PROGRESS → COMPLETED only when attendance resolved', () => {
    expect(assertJobAction('IN_PROGRESS', 'COMPLETE', employer, guards)).toBe('COMPLETED');
    expect(code(() => assertJobAction('IN_PROGRESS', 'COMPLETE', employer, { ...guards, attendanceResolved: false }))).toBe('STATE_INVALID');
  });
  it('J8: COMPLETED → CLOSED when earnings settled (or grace)', () => {
    expect(assertJobAction('COMPLETED', 'CLOSE', system, guards)).toBe('CLOSED');
    expect(code(() => assertJobAction('COMPLETED', 'CLOSE', system, { ...guards, earningsSettled: false }))).toBe('STATE_INVALID');
  });
});

describe('M1 — J9 cancel', () => {
  it('J9: employer cancels an OPEN/HIRING/FILLED job with confirmation → CANCELLED', () => {
    expect(assertJobAction('OPEN', 'CANCEL', employer, guards)).toBe('CANCELLED');
    expect(assertJobAction('HIRING', 'CANCEL', employer, guards)).toBe('CANCELLED');
    expect(assertJobAction('FILLED', 'CANCEL', employer, guards)).toBe('CANCELLED');
  });
  it('J9: admin can cancel too', () => {
    expect(assertJobAction('OPEN', 'CANCEL', admin, guards)).toBe('CANCELLED');
  });
  it('J9 guard: crew-handling confirmation required → VALIDATION_FAILED', () => {
    expect(code(() => assertJobAction('OPEN', 'CANCEL', employer, { ...guards, crewHandlingConfirmed: false }))).toBe('VALIDATION_FAILED');
  });
  it('J9 guard: IN_PROGRESS / terminal jobs cannot be cancelled', () => {
    expect(code(() => assertJobAction('IN_PROGRESS', 'CANCEL', employer, guards))).toBe('STATE_INVALID');
    expect(code(() => assertJobAction('CANCELLED', 'CANCEL', employer, guards))).toBe('STATE_INVALID');
    expect(code(() => assertJobAction('CLOSED', 'CANCEL', employer, guards))).toBe('STATE_INVALID');
  });
  it('J9 actor: a worker never cancels', () => {
    expect(code(() => assertJobAction('OPEN', 'CANCEL', 'WORKER' as JobActor, guards))).toBe('FORBIDDEN');
  });
});

describe('M1 — J10 expire + J11 draft delete', () => {
  it('J10: past-ends unfilled OPEN/HIRING → EXPIRED (system sweep)', () => {
    expect(assertJobAction('OPEN', 'EXPIRE', system, guards)).toBe('EXPIRED');
    expect(assertJobAction('HIRING', 'EXPIRE', system, guards)).toBe('EXPIRED');
    expect(code(() => assertJobAction('FILLED', 'EXPIRE', system, guards))).toBe('STATE_INVALID');
  });
  it('J11: DRAFT → hard delete (employer owner only)', () => {
    expect(assertJobAction('DRAFT', 'DELETE', employer, guards)).toBe('DELETED');
    expect(code(() => assertJobAction('OPEN', 'DELETE', employer, guards))).toBe('STATE_INVALID');
  });
});

describe('M1 — ✗ examples (terminal/no-reopen)', () => {
  it('COMPLETED → * is invalid (repost instead)', () => {
    expect(code(() => assertJobAction('COMPLETED', 'PUBLISH', employer, { ...guards, kycStatus: 'VERIFIED' }))).toBe('STATE_INVALID');
    expect(code(() => assertJobAction('COMPLETED', 'CANCEL', employer, guards))).toBe('STATE_INVALID');
  });
  it('CANCELLED / CLOSED / EXPIRED are terminal', () => {
    for (const s of ['CANCELLED', 'CLOSED', 'EXPIRED'] as const) {
      expect(code(() => assertJobAction(s, 'PUBLISH', employer, { ...guards, kycStatus: 'VERIFIED' }))).toBe('STATE_INVALID');
      expect(code(() => assertJobAction(s, 'START', system, guards))).toBe('STATE_INVALID');
      expect(code(() => assertJobAction(s, 'CANCEL', employer, guards))).toBe('STATE_INVALID');
    }
  });
  it('IN_PROGRESS cannot be cancelled (must complete/correct)', () => {
    expect(code(() => assertJobAction('IN_PROGRESS', 'CANCEL', admin, guards))).toBe('STATE_INVALID');
  });
});

describe('W3 helpers — work days + pay label', () => {
  it('deriveWorkDays expands the range when no explicit days are given', () => {
    const days = deriveWorkDays('2026-10-01', '2026-10-03', '09:00', '18:00');
    expect(days.map((d) => d.date)).toEqual(['2026-10-01', '2026-10-02', '2026-10-03']);
    expect(days[0].startTime).toBe('09:00');
    expect(days[0].endTime).toBe('18:00');
  });

  it('explicit work days win (with default times filled in)', () => {
    const days = deriveWorkDays('2026-10-01', '2026-10-05', '09:00', '18:00', [
      { date: '2026-10-02' },
      { date: '2026-10-04', startTime: '10:00', endTime: '16:00' },
    ]);
    expect(days).toHaveLength(2);
    expect(days[1]).toEqual({ date: '2026-10-04', startTime: '10:00', endTime: '16:00' });
    expect(days[0].startTime).toBe('09:00');
  });

  it('reversed date range rejected; insane range rejected', () => {
    expect(code(() => deriveWorkDays('2026-10-05', '2026-10-01', '09:00', '18:00'))).toBe('VALIDATION_FAILED');
    expect(code(() => deriveWorkDays('2026-10-01', '2027-10-01', '09:00', '18:00'))).toBe('VALIDATION_FAILED');
  });

  it('payLabel renders human money labels (paise → ₹)', () => {
    expect(payLabel('DAY', 75_000)).toBe('₹750 / day');
    expect(payLabel('HOUR', 12_500)).toBe('₹125 / hour');
    expect(payLabel('TOTAL', 450_000)).toBe('₹4,500 total');
  });
});

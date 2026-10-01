import { describe, expect, it } from 'vitest';

import { ApiError } from '../../common/api-error.js';
import {
  assertApplicationAction,
  assertCanApply,
  assertWithdraw,
  statusAfterFirstApplication,
  statusAfterHire,
  statusAfterRelease,
  windowsOverlap,
} from '../applications.domain.js';

function code(fn: () => void): string {
  try {
    fn();
    return 'NO_THROW';
  } catch (e) {
    if (e instanceof ApiError) return e.code;
    return `UNEXPECTED:${String(e)}`;
  }
}

describe('M2 application state machine (STATE_MACHINES.md A0–A10)', () => {
  // A1/A4 — shortlist: from APPLIED, or swap WAITLISTED → SHORTLISTED
  it('A1: APPLIED → SHORTLISTED via shortlist', () => {
    expect(() => assertApplicationAction('shortlist', 'APPLIED')).not.toThrow();
  });
  it('A4: WAITLISTED → SHORTLISTED via shortlist (swap)', () => {
    expect(() => assertApplicationAction('shortlist', 'WAITLISTED')).not.toThrow();
  });
  it('A1: HIRED cannot be shortlisted', () => {
    expect(code(() => assertApplicationAction('shortlist', 'HIRED'))).toBe('APPLICATION_NOT_APPLICABLE');
  });
  it('A10: REJECTED is terminal for shortlist', () => {
    expect(code(() => assertApplicationAction('shortlist', 'REJECTED'))).toBe('APPLICATION_NOT_APPLICABLE');
  });

  // A2/A4 — waitlist: from APPLIED, or swap SHORTLISTED → WAITLISTED
  it('A2: APPLIED → WAITLISTED via waitlist', () => {
    expect(() => assertApplicationAction('waitlist', 'APPLIED')).not.toThrow();
  });
  it('A4: SHORTLISTED → WAITLISTED via waitlist (swap)', () => {
    expect(() => assertApplicationAction('waitlist', 'SHORTLISTED')).not.toThrow();
  });
  it('A2: WITHDRAWN cannot be waitlisted', () => {
    expect(code(() => assertApplicationAction('waitlist', 'WITHDRAWN'))).toBe('APPLICATION_NOT_APPLICABLE');
  });

  // A3 — reject from any live pre-hire state
  it.each(['APPLIED', 'SHORTLISTED', 'WAITLISTED'] as const)(
    'A3: %s → REJECTED via reject',
    (from) => {
      expect(() => assertApplicationAction('reject', from)).not.toThrow();
    },
  );
  it('A3: HIRED cannot be rejected (use release)', () => {
    expect(code(() => assertApplicationAction('reject', 'HIRED'))).toBe('APPLICATION_NOT_APPLICABLE');
  });
  it('A10: EXPIRED is terminal for reject', () => {
    expect(code(() => assertApplicationAction('reject', 'EXPIRED'))).toBe('APPLICATION_NOT_APPLICABLE');
  });

  // A5 — hire from the three live pre-hire states only
  it.each(['APPLIED', 'SHORTLISTED', 'WAITLISTED'] as const)(
    'A5: %s → HIRED via hire',
    (from) => {
      expect(() => assertApplicationAction('hire', from)).not.toThrow();
    },
  );
  it('A5: WITHDRAWN cannot be hired', () => {
    expect(code(() => assertApplicationAction('hire', 'WITHDRAWN'))).toBe('APPLICATION_NOT_APPLICABLE');
  });
  it('A5: already HIRED is not hirable again', () => {
    expect(code(() => assertApplicationAction('hire', 'HIRED'))).toBe('APPLICATION_NOT_APPLICABLE');
  });

  // A8 — employer release: only from HIRED
  it('A8: HIRED → CANCELLED via release', () => {
    expect(() => assertApplicationAction('release', 'HIRED')).not.toThrow();
  });
  it('A8: APPLIED cannot be released (use reject)', () => {
    expect(code(() => assertApplicationAction('release', 'APPLIED'))).toBe('APPLICATION_NOT_APPLICABLE');
  });
});

describe('A0 apply guard (job-side)', () => {
  it('apply allowed on OPEN with free slots', () => {
    expect(() => assertCanApply('OPEN', 3, 2)).not.toThrow();
  });
  it('apply allowed on HIRING with free slots', () => {
    expect(() => assertCanApply('HIRING', 3, 0)).not.toThrow();
  });
  it('apply blocked when FILLED (JOB_ALREADY_FILLED)', () => {
    expect(code(() => assertCanApply('FILLED', 2, 2))).toBe('JOB_ALREADY_FILLED');
  });
  it('apply blocked when all slots taken but status not yet FILLED (race window)', () => {
    expect(code(() => assertCanApply('HIRING', 2, 2))).toBe('JOB_ALREADY_FILLED');
  });
  it('apply blocked on DRAFT (JOB_NOT_OPEN)', () => {
    expect(code(() => assertCanApply('DRAFT', 3, 0))).toBe('JOB_NOT_OPEN');
  });
  it('apply blocked on COMPLETED (JOB_NOT_OPEN)', () => {
    expect(code(() => assertCanApply('COMPLETED', 3, 0))).toBe('JOB_NOT_OPEN');
  });
  it('apply blocked on CANCELLED (JOB_CANCELLED)', () => {
    expect(code(() => assertCanApply('CANCELLED', 3, 0))).toBe('JOB_CANCELLED');
  });
  it('apply blocked on EXPIRED (JOB_NOT_OPEN)', () => {
    expect(code(() => assertCanApply('EXPIRED', 3, 0))).toBe('JOB_NOT_OPEN');
  });
});

describe('A6/A7 withdraw guard', () => {
  it('A6: APPLIED withdraw allowed before job start', () => {
    expect(() => assertWithdraw('APPLIED', 'OPEN')).not.toThrow();
    expect(() => assertWithdraw('SHORTLISTED', 'HIRING')).not.toThrow();
    expect(() => assertWithdraw('WAITLISTED', 'HIRING')).not.toThrow();
  });
  it('A7: HIRED withdraw allowed while job pre-start', () => {
    expect(() => assertWithdraw('HIRED', 'FILLED')).not.toThrow();
  });
  it('A7: HIRED withdraw blocked once IN_PROGRESS (J6 locks mutations)', () => {
    expect(code(() => assertWithdraw('HIRED', 'IN_PROGRESS'))).toBe('STATE_INVALID');
  });
  it('A6: REJECTED cannot withdraw (terminal)', () => {
    expect(code(() => assertWithdraw('REJECTED', 'OPEN'))).toBe('APPLICATION_NOT_APPLICABLE');
  });
});

describe('job status derivations (M1 J2–J5)', () => {
  it('J2: first application flips OPEN → HIRING', () => {
    expect(statusAfterFirstApplication('OPEN')).toBe('HIRING');
  });
  it('J2: HIRING stays HIRING on later applications', () => {
    expect(statusAfterFirstApplication('HIRING')).toBe('HIRING');
  });
  it('J2: FILLED / CANCELLED untouched by applications', () => {
    expect(statusAfterFirstApplication('FILLED')).toBe('FILLED');
    expect(statusAfterFirstApplication('CANCELLED')).toBe('CANCELLED');
  });
  it('J3: hire filling the last slot → FILLED', () => {
    expect(statusAfterHire(3, 3)).toBe('FILLED');
  });
  it('J3: hire with slots remaining → HIRING', () => {
    expect(statusAfterHire(1, 3)).toBe('HIRING');
  });
  it('J4: release with crew remaining → HIRING', () => {
    expect(statusAfterRelease(2, 3)).toBe('HIRING');
  });
  it('J5: last crew released → OPEN (normalization)', () => {
    expect(statusAfterRelease(0, 3)).toBe('OPEN');
  });
});

describe('§16/§17 double-booking overlap helper', () => {
  it('identical windows overlap', () => {
    expect(windowsOverlap('2026-11-02', '2026-11-05', '2026-11-02', '2026-11-05')).toBe(true);
  });
  it('partial overlap counts', () => {
    expect(windowsOverlap('2026-11-02', '2026-11-05', '2026-11-05', '2026-11-08')).toBe(true);
    expect(windowsOverlap('2026-11-05', '2026-11-07', '2026-11-01', '2026-11-05')).toBe(true);
  });
  it('disjoint windows do not overlap', () => {
    expect(windowsOverlap('2026-11-02', '2026-11-04', '2026-11-05', '2026-11-08')).toBe(false);
    expect(windowsOverlap('2026-11-10', '2026-11-12', '2026-11-01', '2026-11-03')).toBe(false);
  });
  it('same-day hire and other job do not overlap (single day each, different days)', () => {
    expect(windowsOverlap('2026-11-14', '2026-11-14', '2026-11-15', '2026-11-15')).toBe(false);
  });
});

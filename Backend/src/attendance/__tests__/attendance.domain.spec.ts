import { describe, expect, it } from 'vitest';

import { ApiError } from '../../common/api-error.js';
import {
  assertCheckInWindow,
  assertCheckOutWindow,
  assertCorrect,
  assertReverseCheckIn,
  approveEligible,
  computeDurationMinutes,
  noShowDue,
  type AttendanceStatus,
} from '../attendance.domain.js';

function code(fn: () => void): string {
  try {
    fn();
    return 'NO_THROW';
  } catch (e) {
    if (e instanceof ApiError) return e.code;
    return `UNEXPECTED:${String(e)}`;
  }
}

/** Window helper input: minutes from midnight for the day's times. */
const day = { start: 9 * 60, end: 18 * 60, grace: 60, cutoff: 120 };

describe('M3 T1 check-in window (§19)', () => {
  it('allows check-in at day start', () => {
    expect(() => assertCheckInWindow(9 * 60, day)).not.toThrow();
  });
  it('allows check-in within grace before day start', () => {
    expect(() => assertCheckInWindow(8 * 60 + 30, day)).not.toThrow();
  });
  it('allows check-in until day start + cutoff', () => {
    expect(() => assertCheckInWindow(11 * 60, day)).not.toThrow();
  });
  it('rejects check-in before grace (ATTENDANCE_WINDOW_CLOSED)', () => {
    expect(code(() => assertCheckInWindow(7 * 60, day))).toBe('ATTENDANCE_WINDOW_CLOSED');
  });
  it('rejects check-in after cutoff', () => {
    expect(code(() => assertCheckInWindow(11 * 60 + 1, day))).toBe('ATTENDANCE_WINDOW_CLOSED');
  });
});

describe('M3 T2 checkout window (auto-close at day end + grace)', () => {
  it('allows checkout from check-in moment onward', () => {
    expect(() => assertCheckOutWindow(10 * 60, day)).not.toThrow();
  });
  it('allows checkout at day end + grace boundary', () => {
    expect(() => assertCheckOutWindow(19 * 60, day)).not.toThrow();
  });
  it('rejects checkout after day end + grace (auto-close already ran)', () => {
    expect(code(() => assertCheckOutWindow(19 * 60 + 1, day))).toBe('ATTENDANCE_WINDOW_CLOSED');
  });
});

describe('duration computation (T2)', () => {
  it('computes whole minutes between check-in and check-out', () => {
    expect(computeDurationMinutes('2026-11-02T09:00:00.000Z', '2026-11-02T17:30:00.000Z')).toBe(510);
  });
  it('floors partial minutes', () => {
    expect(computeDurationMinutes('2026-11-02T09:00:00.000Z', '2026-11-02T09:59:59.000Z')).toBe(59);
  });
});

describe('T3 approval eligibility', () => {
  it('CHECKED_OUT → APPROVED allowed', () => {
    expect(approveEligible('CHECKED_OUT')).toBe('APPROVED');
  });
  it('NOT_STARTED cannot be approved (no work happened)', () => {
    expect(code(() => approveEligible('NOT_STARTED'))).toBe('STATE_INVALID');
  });
  it('CHECKED_IN cannot be approved (day not closed)', () => {
    expect(code(() => approveEligible('CHECKED_IN'))).toBe('STATE_INVALID');
  });
  it('APPROVED is final (no double approve)', () => {
    expect(code(() => approveEligible('APPROVED'))).toBe('STATE_INVALID');
  });
  it('NO_SHOW cannot be approved', () => {
    expect(code(() => approveEligible('NO_SHOW'))).toBe('STATE_INVALID');
  });
});

describe('T4 no-show sweep trigger', () => {
  it('NOT_STARTED past day end + cutoff is a no-show', () => {
    expect(noShowDue('NOT_STARTED', 18 * 60 + 120 + 1, day)).toBe(true);
    expect(noShowDue('NOT_STARTED', 18 * 60 + 120, day)).toBe(true); // boundary counts
  });
  it('NOT_STARTED before the cutoff is not yet a no-show', () => {
    expect(noShowDue('NOT_STARTED', 18 * 60 + 119, day)).toBe(false);
    expect(noShowDue('NOT_STARTED', 12 * 60, day)).toBe(false);
  });
  it('checked-in workers are never swept to NO_SHOW', () => {
    expect(noShowDue('CHECKED_IN', 23 * 60, day)).toBe(false);
    expect(noShowDue('APPROVED', 23 * 60, day)).toBe(false);
  });
});

describe('T5 reversal (erroneous check-in, reason mandatory)', () => {
  it('CHECKED_IN → NOT_STARTED with reason', () => {
    expect(() => assertReverseCheckIn('CHECKED_IN', 'Scanned the wrong day')).not.toThrow();
  });
  it('missing/too-short reason rejected', () => {
    expect(code(() => assertReverseCheckIn('CHECKED_IN', ''))).toBe('VALIDATION_FAILED');
    expect(code(() => assertReverseCheckIn('CHECKED_IN', 'x'))).toBe('VALIDATION_FAILED');
  });
  it('only CHECKED_IN can be reversed', () => {
    expect(code(() => assertReverseCheckIn('APPROVED', 'long enough reason'))).toBe('STATE_INVALID');
    expect(code(() => assertReverseCheckIn('CHECKED_OUT', 'long enough reason'))).toBe('STATE_INVALID');
  });
});

describe('T6 corrections (audited edits, never re-entry)', () => {
  it('time correction on an approved record allowed with reason', () => {
    expect(() =>
      assertCorrect('APPROVED', { reason: 'Clock drift on the tablet', checkInAt: '2026-11-02T09:05:00.000Z' }),
    ).not.toThrow();
  });
  it('correction cannot reopen the day (APPROVED → CHECKED_IN forbidden)', () => {
    expect(code(() => assertCorrect('APPROVED', { reason: 'Clock drift on the tablet', status: 'CHECKED_IN' as AttendanceStatus }))).toBe('STATE_INVALID');
  });
  it('reason is mandatory', () => {
    expect(code(() => assertCorrect('APPROVED', { checkInAt: '2026-11-02T09:05:00.000Z' }))).toBe('VALIDATION_FAILED');
  });
  it('NOT_STARTED records have nothing to correct yet', () => {
    expect(code(() => assertCorrect('NOT_STARTED', { reason: 'Trying to correct nothing' }))).toBe('STATE_INVALID');
  });
});

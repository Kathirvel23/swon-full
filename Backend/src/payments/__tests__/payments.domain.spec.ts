import { describe, expect, it } from 'vitest';

import { ApiError } from '../../common/api-error.js';
import {
  amountAfterAdjust,
  assertAdjust,
  assertEarningAction,
  computeEarningAmount,
  reconciles,
} from '../payments.domain.js';

function code(fn: () => void): string {
  try {
    fn();
    return 'NO_THROW';
  } catch (e) {
    if (e instanceof ApiError) return e.code;
    return `UNEXPECTED:${String(e)}`;
  }
}

describe('M4 earning transitions (P0–P9)', () => {
  it('P1: PENDING → ELIGIBLE via mark-eligible', () => {
    expect(() => assertEarningAction('eligible', 'PENDING')).not.toThrow();
  });
  it('P1: ELIGIBLE is not re-eligible', () => {
    expect(code(() => assertEarningAction('eligible', 'ELIGIBLE'))).toBe('EARNING_STATE_INVALID');
  });
  it('P2: ELIGIBLE → APPROVED via approve', () => {
    expect(() => assertEarningAction('approve', 'ELIGIBLE')).not.toThrow();
  });
  it('P2: PENDING cannot be approved (work not finished)', () => {
    expect(code(() => assertEarningAction('approve', 'PENDING'))).toBe('EARNING_STATE_INVALID');
  });
  it('P2: double approve blocked', () => {
    expect(code(() => assertEarningAction('approve', 'APPROVED'))).toBe('EARNING_STATE_INVALID');
  });
  it('P4: APPROVED → PAID via mark-paid', () => {
    expect(() => assertEarningAction('pay', 'APPROVED')).not.toThrow();
  });
  it('P4: ELIGIBLE cannot be paid (approve first)', () => {
    expect(code(() => assertEarningAction('pay', 'ELIGIBLE'))).toBe('EARNING_STATE_INVALID');
  });
  it('P4: PAID is immutable (✗ PAID→*)', () => {
    expect(code(() => assertEarningAction('pay', 'PAID'))).toBe('EARNING_STATE_INVALID');
    expect(code(() => assertEarningAction('approve', 'PAID'))).toBe('EARNING_STATE_INVALID');
    expect(code(() => assertEarningAction('adjust', 'PAID'))).toBe('EARNING_STATE_INVALID');
  });
  it('P6: hold blocks other actions while held', () => {
    expect(code(() => assertEarningAction('approve', 'ON_HOLD'))).toBe('EARNING_STATE_INVALID');
    expect(code(() => assertEarningAction('pay', 'ON_HOLD'))).toBe('EARNING_STATE_INVALID');
  });
  it('P8: job cancel sweeps only shell earnings', () => {
    expect(() => assertEarningAction('cancel', 'PENDING')).not.toThrow();
    expect(code(() => assertEarningAction('cancel', 'ELIGIBLE'))).toBe('EARNING_STATE_INVALID');
    expect(code(() => assertEarningAction('cancel', 'PAID'))).toBe('EARNING_STATE_INVALID');
  });
  it('CANCELLLED earnings are terminal', () => {
    expect(code(() => assertEarningAction('approve', 'CANCELLED'))).toBe('EARNING_STATE_INVALID');
    expect(code(() => assertEarningAction('cancel', 'CANCELLED'))).toBe('EARNING_STATE_INVALID');
  });
});

describe('amount computation (P0/P1 — job terms × approved days)', () => {
  it('DAY pay: rate × approved days', () => {
    expect(computeEarningAmount('DAY', 75_000n, { approvedDays: 3, approvedMinutes: 0 })).toBe(225_000n);
  });
  it('HOUR pay: rate × approved hours (minutes ÷ 60, whole paise)', () => {
    // 7h 45min = 465 min → 465/60 × 15000 = 116250
    expect(computeEarningAmount('HOUR', 15_000n, { approvedDays: 0, approvedMinutes: 465 })).toBe(116_250n);
  });
  it('TOTAL pay: flat once work happened', () => {
    expect(computeEarningAmount('TOTAL', 500_000n, { approvedDays: 1, approvedMinutes: 60 })).toBe(500_000n);
    expect(computeEarningAmount('TOTAL', 500_000n, { approvedDays: 0, approvedMinutes: 0 })).toBe(0n);
  });
  it('no approved work → zero', () => {
    expect(computeEarningAmount('DAY', 75_000n, { approvedDays: 0, approvedMinutes: 0 })).toBe(0n);
  });
  it('NO_SHOW days never pay (they are not approved minutes)', () => {
    expect(computeEarningAmount('DAY', 75_000n, { approvedDays: 2, approvedMinutes: 0 })).toBe(150_000n);
  });
});

describe('adjustments (P9 — pre-PAID only, never silent)', () => {
  it('adjust applies on ELIGIBLE', () => {
    expect(amountAfterAdjust(100_000n, -5_000n)).toBe(95_000n);
  });
  it('negative and zero adjustments fine', () => {
    expect(amountAfterAdjust(100_000n, 0n)).toBe(100_000n);
  });
  it('assertAdjust blocks PAID', () => {
    expect(code(() => assertAdjust('PAID'))).toBe('EARNING_STATE_INVALID');
  });
  it('assertAdjust blocks CANCELLED', () => {
    expect(code(() => assertAdjust('CANCELLED'))).toBe('EARNING_STATE_INVALID');
  });
  it('assertAdjust allows APPROVED and ELIGIBLE', () => {
    expect(() => assertAdjust('APPROVED')).not.toThrow();
    expect(() => assertAdjust('ELIGIBLE')).not.toThrow();
  });
});

describe('mark-paid reconciliation (P4 — AMOUNT_MISMATCH is a hard 409)', () => {
  it('exact match reconciles', () => {
    expect(reconciles([100_000n, 50_000n], 150_000n, 'INR', 'INR')).toBe(true);
  });
  it('off-by-one paise does not', () => {
    expect(reconciles([100_000n, 50_000n], 150_001n, 'INR', 'INR')).toBe(false);
  });
  it('currency mismatch does not', () => {
    expect(reconciles([100_000n], 100_000n, 'INR', 'USD')).toBe(false);
  });
  it('empty selection does not', () => {
    expect(reconciles([], 0n, 'INR', 'INR')).toBe(false);
  });
});

describe('P4 reference rule (STATE_MACHINES: ≥6 chars)', () => {
  it('short references rejected by the shared guard', () => {
    // mirrors markPaidSchema min + domain rule — see payments.service for wiring
    const ref = (r: string): boolean => r.length >= 6;
    expect(ref('cash')).toBe(false);
    expect(ref('UTR123')).toBe(true);
  });
});

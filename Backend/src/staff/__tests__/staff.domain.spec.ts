import { describe, expect, it } from 'vitest';

import {
  computeIncentivePaise,
  normalisePct,
  pctFromConfig,
  statusToStored,
  summarise,
  uiStatus,
} from '../staff.domain.js';

/**
 * Owner brief §21 (statuses) + §38 tests 6-7 (incentive arithmetic).
 * Pure logic only — no database.
 */

const DAY_START = new Date('2026-10-05T04:30:00.000Z'); // 10:00 IST
const at = (minsAfterStart: number) =>
  new Date(DAY_START.getTime() + minsAfterStart * 60_000);

describe('uiStatus — manager vocabulary derived from the stored state machine', () => {
  it('no record → NOT_MARKED', () => {
    expect(uiStatus(null, DAY_START)).toBe('NOT_MARKED');
  });

  it('NOT_STARTED → NOT_MARKED', () => {
    expect(uiStatus({ status: 'NOT_STARTED', checkInAt: null }, DAY_START)).toBe('NOT_MARKED');
  });

  it('NO_SHOW → ABSENT', () => {
    expect(uiStatus({ status: 'NO_SHOW', checkInAt: null }, DAY_START)).toBe('ABSENT');
  });

  it('checked in within the grace window → PRESENT', () => {
    expect(uiStatus({ status: 'CHECKED_IN', checkInAt: at(4) }, DAY_START)).toBe('PRESENT');
  });

  it('checked in after the grace window → LATE (computed, never stored)', () => {
    expect(uiStatus({ status: 'CHECKED_IN', checkInAt: at(25) }, DAY_START)).toBe('LATE');
  });

  it('APPROVED is present-side and still respects lateness', () => {
    expect(uiStatus({ status: 'APPROVED', checkInAt: at(2) }, DAY_START)).toBe('PRESENT');
    expect(uiStatus({ status: 'APPROVED', checkInAt: at(60) }, DAY_START)).toBe('LATE');
  });
});

describe('statusToStored — only the three legal manager writes', () => {
  it('PRESENT/LATE write CHECKED_IN, ABSENT writes NO_SHOW, NOT_MARKED writes NOT_STARTED', () => {
    expect(statusToStored('PRESENT')).toBe('CHECKED_IN');
    expect(statusToStored('LATE')).toBe('CHECKED_IN');
    expect(statusToStored('ABSENT')).toBe('NO_SHOW');
    expect(statusToStored('NOT_MARKED')).toBe('NOT_STARTED');
  });
});

describe('computeIncentivePaise — §38 tests 6 and 7', () => {
  it('₹1,000 base at 5% → ₹50 incentive, ₹1,050 total', () => {
    const base = 100_000; // paise
    const incentive = computeIncentivePaise(base, 5);
    expect(incentive).toBe(5_000);
    expect(base + incentive).toBe(105_000);
  });

  it('₹1,000 base at 10% → ₹100 incentive, ₹1,100 total', () => {
    const base = 100_000;
    const incentive = computeIncentivePaise(base, 10);
    expect(incentive).toBe(10_000);
    expect(base + incentive).toBe(110_000);
  });

  it('0% / missing / nonsense always yields 0', () => {
    expect(computeIncentivePaise(100_000, 0)).toBe(0);
    expect(computeIncentivePaise(100_000, Number.NaN)).toBe(0);
    expect(computeIncentivePaise(0, 5)).toBe(0);
    expect(computeIncentivePaise(-1, 5)).toBe(0);
  });

  it('rounds to the paise (no fractional currency)', () => {
    expect(computeIncentivePaise(99_999, 5)).toBe(5_000); // 4999.95 → 5000
  });

  it('clamps an absurd configured percentage to 100', () => {
    expect(normalisePct(250)).toBe(100);
    expect(normalisePct(-5)).toBe(0);
  });
});

describe('pctFromConfig — platform_config shape tolerance', () => {
  it('accepts a bare number', () => {
    expect(pctFromConfig(7.5)).toBe(7.5);
  });
  it('accepts { pct }', () => {
    expect(pctFromConfig({ pct: 10 })).toBe(10);
  });
  it('rejects anything else', () => {
    expect(pctFromConfig(null)).toBe(0);
    expect(pctFromConfig('nonsense')).toBe(0);
    expect(pctFromConfig({})).toBe(0);
  });
});

describe('summarise — the header on the manager screen', () => {
  it('counts each bucket', () => {
    expect(
      summarise(['PRESENT', 'PRESENT', 'LATE', 'ABSENT', 'NOT_MARKED', 'NOT_MARKED']),
    ).toEqual({ total: 6, present: 2, late: 1, absent: 1, notMarked: 2 });
  });
});

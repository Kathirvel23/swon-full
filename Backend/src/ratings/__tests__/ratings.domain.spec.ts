import { describe, expect, it } from 'vitest';

import {
  assertCanRate,
  commentVisible,
  recomputeAggregate,
} from '../ratings.domain.js';

/**
 * Ratings rules (§14 row 12, §22.8): only counterparties of a COMPLETED job,
 * one rating per (job, rater, ratee), double-blind comments (visible when both
 * sides submit OR 48 h pass), aggregates recomputed in integer milli-units.
 */
describe('ratings.domain', () => {
  const employer = 1n;
  const hiredWorkerA = 2n;
  const hiredWorkerB = 3n;
  const outsider = 9n;
  const hired = [hiredWorkerA, hiredWorkerB];

  const base = {
    jobStatus: 'COMPLETED',
    callerAccountId: employer,
    rateeAccountId: hiredWorkerA,
    employerAccountId: employer,
    hiredAccountIds: hired,
    alreadyRated: false,
  };

  describe('assertCanRate', () => {
    it('accepts the employer rating a hired worker', () => {
      expect(() => assertCanRate({ ...base })).not.toThrow();
    });

    it('accepts a hired worker rating the employer', () => {
      expect(() =>
        assertCanRate({
          ...base,
          callerAccountId: hiredWorkerA,
          rateeAccountId: employer,
        }),
      ).not.toThrow();
    });

    it('refuses jobs that are not COMPLETED (any other status)', () => {
      for (const jobStatus of ['OPEN', 'HIRING', 'IN_PROGRESS', 'CANCELLED', 'CLOSED']) {
        expect(() => assertCanRate({ ...base, jobStatus })).toThrowError(/completed/i);
      }
    });

    it('refuses a duplicate rating with ALREADY_RATED', () => {
      try {
        assertCanRate({ ...base, alreadyRated: true });
        expect.unreachable('should have thrown');
      } catch (e) {
        expect((e as Error & { code?: string }).code).toBe('ALREADY_RATED');
      }
    });

    it('refuses the employer rating someone they never hired', () => {
      expect(() =>
        assertCanRate({ ...base, rateeAccountId: outsider }),
      ).toThrowError(/party/i);
    });

    it('refuses a worker rating another worker', () => {
      expect(() =>
        assertCanRate({
          ...base,
          callerAccountId: hiredWorkerA,
          rateeAccountId: hiredWorkerB,
        }),
      ).toThrowError(/party/i);
    });

    it('refuses an outsider rating anybody', () => {
      expect(() =>
        assertCanRate({
          ...base,
          callerAccountId: outsider,
          rateeAccountId: employer,
        }),
      ).toThrowError(/party/i);
    });

    it('refuses self-rating', () => {
      expect(() =>
        assertCanRate({ ...base, rateeAccountId: employer }),
      ).toThrowError(/party/i);
    });

    it('released crew members can still rate (they were hired)', () => {
      expect(() =>
        assertCanRate({
          ...base,
          callerAccountId: hiredWorkerA,
          rateeAccountId: employer,
          hiredAccountIds: [hiredWorkerA], // released earlier — membership kept
        }),
      ).not.toThrow();
    });
  });

  describe('commentVisible (double-blind)', () => {
    const t0 = Date.parse('2026-09-25T10:00:00.000Z');
    const h48 = 48 * 60 * 60 * 1000;

    it('hidden while the counterpart has not submitted (within 48 h)', () => {
      expect(commentVisible({ bothSubmitted: false, createdAtMs: t0, nowMs: t0 + 60_000 })).toBe(false);
    });

    it('visible once both sides submitted', () => {
      expect(commentVisible({ bothSubmitted: true, createdAtMs: t0, nowMs: t0 + 60_000 })).toBe(true);
    });

    it('visible after 48 h even if the counterpart never rates', () => {
      expect(commentVisible({ bothSubmitted: false, createdAtMs: t0, nowMs: t0 + h48 })).toBe(true);
    });

    it('still hidden at 47 h 59 min when one side is silent', () => {
      expect(commentVisible({ bothSubmitted: false, createdAtMs: t0, nowMs: t0 + h48 - 60_000 })).toBe(false);
    });
  });

  describe('recomputeAggregate', () => {
    it('empty set → 0 milli, count 0, zero distribution', () => {
      expect(recomputeAggregate([])).toEqual({
        avgRatingMilli: 0,
        ratingsCount: 0,
        distribution: { five: 0, four: 0, three: 0, two: 0, one: 0 },
      });
    });

    it('single 5 → 5000', () => {
      expect(recomputeAggregate([5]).avgRatingMilli).toBe(5000);
    });

    it('5 + 4 → 4500 (integer milli, no float drift)', () => {
      expect(recomputeAggregate([5, 4]).avgRatingMilli).toBe(4500);
    });

    it('rounds half up: [5,5,5,5,4] → 4800', () => {
      expect(recomputeAggregate([5, 5, 5, 5, 4]).avgRatingMilli).toBe(4800);
    });

    it('counts the distribution per bucket', () => {
      const r = recomputeAggregate([5, 5, 4, 3, 1]);
      expect(r.ratingsCount).toBe(5);
      expect(r.distribution).toEqual({ five: 2, four: 1, three: 1, two: 0, one: 1 });
    });

    it('rejects scores outside 1..5', () => {
      expect(() => recomputeAggregate([0])).toThrowError(/1..5/);
      expect(() => recomputeAggregate([6])).toThrowError(/1..5/);
    });
  });
});

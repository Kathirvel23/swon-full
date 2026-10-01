import { describe, expect, it } from 'vitest';

import {
  WEIGHTS,
  WEIGHTS_VERSION,
  availabilityMilli,
  computeScore,
  distanceBand,
  haversineKm,
  overlapMilli,
  proximityMilli,
  ratingMilli,
  reasonCodes,
  recencyMilli,
  reliabilityMilli,
  respondTransition,
  skillMatchMilli,
  assertRespondable,
} from '../matching.domain.js';

/**
 * §16 scoring pipeline: seven milli-unit signals combined with fixed weights
 * (versioned so every match_log row is reproducible), plus the Quick Match
 * respond guards (PENDING + within window, else EXPIRED/STATE_INVALID).
 */
describe('matching.domain', () => {
  it('weights sum to 100 and carry a version', () => {
    const sum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
    expect(sum).toBe(100);
    expect(WEIGHTS_VERSION).toBeGreaterThanOrEqual(1);
  });

  describe('computeScore', () => {
    const all1000 = {
      proximityMilli: 1000,
      skillMatchMilli: 1000,
      reliabilityMilli: 1000,
      ratingMilli: 1000,
      recencyMilli: 1000,
      availabilityMilli: 1000,
      overlapMilli: 1000,
    };

    it('all-perfect signals → 1000', () => {
      expect(computeScore(all1000)).toBe(1000);
    });

    it('all-zero signals → 0', () => {
      expect(
        computeScore({
          proximityMilli: 0,
          skillMatchMilli: 0,
          reliabilityMilli: 0,
          ratingMilli: 0,
          recencyMilli: 0,
          availabilityMilli: 0,
          overlapMilli: 0,
        }),
      ).toBe(0);
    });

    it('stays within 0..1000 for odd mixes', () => {
      const s = computeScore({
        proximityMilli: 333,
        skillMatchMilli: 667,
        reliabilityMilli: 999,
        ratingMilli: 1,
        recencyMilli: 500,
        availabilityMilli: 0,
        overlapMilli: 1000,
      });
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThanOrEqual(1000);
      expect(Number.isInteger(s)).toBe(true);
    });
  });

  describe('proximityMilli + distanceBand', () => {
    it('Coimbatore Junction → Udhammsinghal distance is sane', () => {
      // ~ km between two known Coimbatore points
      const km = haversineKm(11.0168, 76.9558, 11.0055, 76.9806);
      expect(km).toBeGreaterThan(1);
      expect(km).toBeLessThan(10);
    });

    it('under 2 km is a perfect signal', () => {
      expect(proximityMilli(1.2)).toBe(1000);
      expect(distanceBand(1.2)).toBe('<2km');
    });

    it('far away decays but never hits zero', () => {
      expect(proximityMilli(80)).toBeGreaterThanOrEqual(100);
      expect(proximityMilli(null)).toBeGreaterThanOrEqual(300); // unknown coords: neutral-ish
      expect(distanceBand(null)).toBe('unknown');
    });
  });

  describe('skillMatchMilli', () => {
    it('exact skill overlap → 1000', () => {
      expect(skillMatchMilli([1n, 2n], [2n, 1n])).toBe(1000);
    });

    it('half overlap → 500', () => {
      expect(skillMatchMilli([1n, 2n], [2n, 9n])).toBe(500);
    });

    it('no job skills required → neutral 800 (skills-free job)', () => {
      expect(skillMatchMilli([], [1n])).toBe(800);
      expect(skillMatchMilli([], [])).toBe(800);
    });

    it('worker with no skills vs required → 0', () => {
      expect(skillMatchMilli([1n, 2n], [])).toBe(0);
    });
  });

  describe('soft signals', () => {
    it('reliability prefers the measured attendance rate, falls back to history', () => {
      expect(reliabilityMilli(950, 5)).toBe(950);
      expect(reliabilityMilli(null, 5)).toBeGreaterThanOrEqual(700);
      expect(reliabilityMilli(null, 0)).toBeLessThan(reliabilityMilli(null, 5));
    });

    it('unrated worker is neutral, top-rated scores high', () => {
      expect(ratingMilli(0, 0)).toBe(600);
      expect(ratingMilli(4800, 3)).toBe(960);
      expect(ratingMilli(3000, 2)).toBe(600);
    });

    it('recency decays over months', () => {
      const now = Date.parse('2026-09-25T00:00:00.000Z');
      expect(recencyMilli(now, now)).toBe(1000);
      expect(recencyMilli(now - 40 * 86400_000, now)).toBeGreaterThanOrEqual(600);
      expect(recencyMilli(now - 400 * 86400_000, now)).toBeLessThanOrEqual(300);
      expect(recencyMilli(null, now)).toBe(500); // never worked here: unknown
    });

    it('open-to-work flag + date-window availability', () => {
      expect(availabilityMilli(true)).toBe(1000);
      expect(availabilityMilli(false)).toBe(400);
      expect(overlapMilli(true)).toBe(1000);
      expect(overlapMilli(false)).toBe(300);
    });
  });

  describe('reasonCodes', () => {
    it('emits chips for the strong signals only', () => {
      const codes = reasonCodes({
        proximityMilli: 950,
        skillMatchMilli: 900,
        reliabilityMilli: 700,
        ratingMilli: 400,
        recencyMilli: 600,
        availabilityMilli: 1000,
        overlapMilli: 300,
      });
      expect(codes).toContain('NEARBY');
      expect(codes).toContain('STRONG_SKILLS');
      expect(codes).not.toContain('TOP_RATED');
      expect(codes.length).toBeGreaterThan(0);
    });
  });

  describe('Quick Match respond guards', () => {
    it('accepts a PENDING offer inside the window', () => {
      expect(() => assertRespondable('PENDING', Date.now(), Date.now() + 60_000)).not.toThrow();
    });

    it('expired window → QUICKMATCH_EXPIRED (and the row flips EXPIRED)', () => {
      try {
        assertRespondable('PENDING', Date.now(), Date.now() - 1);
        expect.unreachable('should have thrown');
      } catch (e) {
        expect((e as Error & { code?: string }).code).toBe('QUICKMATCH_EXPIRED');
      }
      expect(respondTransition('PENDING', 'ACCEPT', Date.now() - 1)).toBe('EXPIRED');
    });

    it('accepted offer → ACCEPTED; declined → DECLINED', () => {
      const now = Date.now();
      expect(respondTransition('PENDING', 'ACCEPT', now + 60_000)).toBe('ACCEPTED');
      expect(respondTransition('PENDING', 'DECLINE', now + 60_000)).toBe('DECLINED');
    });

    it('a decided offer cannot be decided again', () => {
      expect(() => assertRespondable('ACCEPTED', Date.now(), Date.now() + 60_000)).toThrowError(
        /pending/i,
      );
    });
  });
});

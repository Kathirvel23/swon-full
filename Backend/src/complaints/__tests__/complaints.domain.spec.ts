import { describe, expect, it } from 'vitest';

import {
  assertTransition,
  canReopen,
  holdEligible,
  isPartyOfLink,
  rateLimitOk,
  releaseTarget,
} from '../complaints.domain.js';

/**
 * M7 complaint machine (Database/STATE_MACHINES.md L0–L7): documented
 * transitions only, party authorization on the link target, payment holds on
 * APPROVED earnings with release back to APPROVED, one reopen, spam limit.
 */
describe('complaints.domain', () => {
  describe('assertTransition', () => {
    it('admin can move OPEN → UNDER_REVIEW (L1)', () => {
      expect(() => assertTransition('OPEN', 'UNDER_REVIEW', 'ADMIN')).not.toThrow();
    });

    it('admin can review → waiting → resolved/dismissed (L2/L4/L5)', () => {
      expect(() => assertTransition('UNDER_REVIEW', 'WAITING_ON_PARTY', 'ADMIN')).not.toThrow();
      expect(() => assertTransition('UNDER_REVIEW', 'RESOLVED', 'ADMIN')).not.toThrow();
      expect(() => assertTransition('WAITING_ON_PARTY', 'RESOLVED', 'ADMIN')).not.toThrow();
      expect(() => assertTransition('WAITING_ON_PARTY', 'DISMISSED', 'ADMIN')).not.toThrow();
    });

    it('a party replying under WAITING_ON_PARTY moves back to UNDER_REVIEW (L3)', () => {
      expect(() => assertTransition('WAITING_ON_PARTY', 'UNDER_REVIEW', 'WORKER')).not.toThrow();
      expect(() => assertTransition('WAITING_ON_PARTY', 'UNDER_REVIEW', 'EMPLOYER')).not.toThrow();
    });

    it('admin can reopen a decided case once (L7)', () => {
      expect(() => assertTransition('RESOLVED', 'OPEN', 'ADMIN')).not.toThrow();
      expect(() => assertTransition('DISMISSED', 'OPEN', 'ADMIN')).not.toThrow();
    });

    it('parties cannot decide their own case', () => {
      expect(() => assertTransition('UNDER_REVIEW', 'RESOLVED', 'WORKER')).toThrowError(/admin/i);
      expect(() => assertTransition('UNDER_REVIEW', 'DISMISSED', 'EMPLOYER')).toThrowError(/admin/i);
    });

    it('no skipping: OPEN cannot jump straight to RESOLVED or CLOSED_TIMEOUT', () => {
      expect(() => assertTransition('OPEN', 'RESOLVED', 'ADMIN')).toThrowError(/open/i);
      expect(() => assertTransition('OPEN', 'CLOSED_TIMEOUT', 'SYSTEM')).toThrowError(/open/i);
    });

    it('resolved cases cannot be re-decided except via reopen', () => {
      expect(() => assertTransition('RESOLVED', 'DISMISSED', 'ADMIN')).toThrowError(/resolved/i);
      expect(() => assertTransition('RESOLVED', 'WAITING_ON_PARTY', 'ADMIN')).toThrowError(/resolved/i);
    });

    it('system sweep closes timed-out waits (L6)', () => {
      expect(() => assertTransition('WAITING_ON_PARTY', 'CLOSED_TIMEOUT', 'SYSTEM')).not.toThrow();
      expect(() => assertTransition('OPEN', 'CLOSED_TIMEOUT', 'SYSTEM')).toThrowError(/open/i);
    });
  });

  describe('canReopen', () => {
    it('first reopen allowed, second refused (L7 once only)', () => {
      expect(canReopen(0)).toBe(true);
      expect(canReopen(1)).toBe(false);
    });
  });

  describe('isPartyOfLink', () => {
    const employer = 1n;
    const worker = 2n;
    const other = 9n;

    it('job: employer owner and crew are parties, strangers are not', () => {
      const link = { employerAccountId: employer, partyAccountIds: [worker] };
      expect(isPartyOfLink(link, employer)).toBe(true);
      expect(isPartyOfLink(link, worker)).toBe(true);
      expect(isPartyOfLink(link, other)).toBe(false);
    });
  });

  describe('rate limit', () => {
    it('under the cap passes, at the cap refuses', () => {
      expect(rateLimitOk(4, 5)).toBe(true);
      expect(rateLimitOk(5, 5)).toBe(false);
    });
  });

  describe('payment holds (P6/P7)', () => {
    it('only APPROVED earnings can be held (money already agreed, not yet paid)', () => {
      expect(holdEligible('APPROVED')).toBe(true);
      expect(holdEligible('PAID')).toBe(false);
      expect(holdEligible('PENDING')).toBe(false);
      expect(holdEligible('ELIGIBLE')).toBe(false);
      expect(holdEligible('CANCELLED')).toBe(false);
    });

    it('release always returns the money to APPROVED (pre-PAID by definition)', () => {
      expect(releaseTarget()).toBe('APPROVED');
    });
  });
});

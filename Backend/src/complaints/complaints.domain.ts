import { ApiError } from '../common/api-error.js';

/**
 * M7 complaint machine (Database/STATE_MACHINES.md L0–L7) + the payment-hold
 * rules it triggers (M4 P6/P7). Pure — no Prisma, no Nest.
 */

export type ComplaintActor = 'WORKER' | 'EMPLOYER' | 'ADMIN' | 'SYSTEM';

/** from → to → actors allowed to make the move. Anything absent is illegal. */
const LEGAL: Record<string, Record<string, readonly ComplaintActor[]>> = {
  OPEN: {
    UNDER_REVIEW: ['ADMIN'], // L1
  },
  UNDER_REVIEW: {
    WAITING_ON_PARTY: ['ADMIN'], // L2
    RESOLVED: ['ADMIN'], // L4
    DISMISSED: ['ADMIN'], // L5
  },
  WAITING_ON_PARTY: {
    UNDER_REVIEW: ['WORKER', 'EMPLOYER', 'ADMIN'], // L3 — party reply
    RESOLVED: ['ADMIN'], // L4
    DISMISSED: ['ADMIN'], // L5
    CLOSED_TIMEOUT: ['SYSTEM'], // L6 — 7-day sweep
  },
  RESOLVED: {
    OPEN: ['ADMIN'], // L7 reopen
  },
  DISMISSED: {
    OPEN: ['ADMIN'], // L7 reopen
  },
};

export function assertTransition(from: string, to: string, actor: ComplaintActor): void {
  const targets = LEGAL[from];
  const allowedActors = targets?.[to];
  if (!allowedActors) {
    throw new ApiError(
      'STATE_INVALID',
      `${from} cannot go to ${to} — it must follow the documented complaint path`,
    );
  }
  if (!allowedActors.includes(actor)) {
    throw new ApiError('ADMIN_PERMISSION_REQUIRED', 'Only an admin can move a complaint between these states');
  }
}

/** L7: a decided case may be reopened exactly once. */
export function canReopen(reopenCount: number): boolean {
  return reopenCount === 0;
}

export interface LinkParties {
  employerAccountId: bigint;
  partyAccountIds: bigint[];
}

/** L0 party check: the job owner and the crew (or the linked entities' sides). */
export function isPartyOfLink(link: LinkParties | null, callerAccountId: bigint): boolean {
  if (!link) return true; // unlinked complaint — the submitter is inherently its party
  if (link.employerAccountId === callerAccountId) return true;
  return link.partyAccountIds.some((id) => id === callerAccountId);
}

/** L0 spam guard: max 5 complaints per account per rolling 24 h. */
export function rateLimitOk(countLast24h: number, cap = 5): boolean {
  return countLast24h < cap;
}

/** P6: only APPROVED earnings (agreed money, not yet paid) may be held. */
export function holdEligible(status: string): boolean {
  return status === 'APPROVED';
}

/** P7: released money returns to APPROVED (it was pre-PAID by definition). */
export function releaseTarget(): 'APPROVED' {
  return 'APPROVED';
}

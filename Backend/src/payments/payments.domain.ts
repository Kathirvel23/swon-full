import { ApiError } from '../common/api-error.js';

/**
 * M4 earning/payment state machine (Database/STATE_MACHINES.md P0–P9).
 * Record-only V1 (§36a #6): no gateway, no platform fees — the system
 * computes, humans record. PAID is immutable (✗ PAID→*) and every worker-
 * initiated money transition is refused at the API layer (role guard).
 */

export type EarningStatus =
  | 'PENDING' | 'ELIGIBLE' | 'APPROVED' | 'PROCESSING'
  | 'PAID' | 'FAILED' | 'ON_HOLD' | 'CANCELLED';

export type EarningAction = 'eligible' | 'approve' | 'pay' | 'adjust' | 'cancel' | 'hold' | 'release';

/** Legal `from` states per action (P1, P2, P4, P6–P9). */
const ACTION_RULES: Record<EarningAction, readonly EarningStatus[]> = {
  eligible: ['PENDING'], // P1
  approve: ['ELIGIBLE'], // P2
  pay: ['APPROVED', 'PROCESSING'], // P4
  adjust: ['PENDING', 'ELIGIBLE', 'APPROVED', 'PROCESSING'], // P9 pre-PAID only
  cancel: ['PENDING'], // P8
  hold: ['ELIGIBLE', 'APPROVED'], // P6
  release: ['ON_HOLD'], // P7
};

export function assertEarningAction(action: EarningAction, status: string): void {
  const allowed = ACTION_RULES[action];
  if (!allowed) throw new ApiError('VALIDATION_FAILED', `Unknown earning action: ${action}`);
  if (!allowed.includes(status as EarningStatus)) {
    throw new ApiError('EARNING_STATE_INVALID', `Earning in ${status} cannot ${action}`);
  }
}

/**
 * P0/P1 amount = job terms × approved work. NO_SHOW days carry no minutes,
 * so they never pay. HOUR floors to whole paise via integer division.
 */
export function computeEarningAmount(
  payType: string, // HOUR | DAY | TOTAL (loose on purpose: DB is a plain string
  ratePaise: bigint,
  approved: { approvedDays: number; approvedMinutes: number },
): bigint {
  if (approved.approvedDays === 0 && approved.approvedMinutes === 0) return 0n;
  switch (payType) {
    case 'DAY':
      return ratePaise * BigInt(approved.approvedDays);
    case 'HOUR':
      return (ratePaise * BigInt(approved.approvedMinutes)) / 60n;
    case 'TOTAL':
      return ratePaise;
    default:
      return 0n;
  }
}

/** P9: adjustments apply only pre-PAID (checked by assertAdjust). */
export function amountAfterAdjust(amountPaise: bigint, deltaPaise: bigint): bigint {
  return amountPaise + deltaPaise;
}

export function assertAdjust(status: string): void {
  if (!ACTION_RULES.adjust.includes(status as EarningStatus)) {
    throw new ApiError('EARNING_STATE_INVALID', `A ${status} earning cannot be adjusted`);
  }
}

/**
 * P4 reconciliation: the client's echoed total must equal the server's
 * locked amounts, in the same currency — otherwise 409 AMOUNT_MISMATCH.
 * An empty selection never reconciles (mark-paid needs targets).
 */
export function reconciles(
  lockedAmounts: bigint[],
  totalPaise: bigint,
  requestCurrency: string,
  lockedCurrency: string,
): boolean {
  if (lockedAmounts.length === 0) return false;
  if (requestCurrency !== lockedCurrency) return false;
  const sum = lockedAmounts.reduce((acc, n) => acc + n, 0n);
  return sum === totalPaise;
}

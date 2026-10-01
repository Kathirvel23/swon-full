export type EarningStatus = 'PENDING' | 'ELIGIBLE' | 'APPROVED' | 'PROCESSING' | 'PAID' | 'FAILED' | 'ON_HOLD' | 'CANCELLED';
export type EarningAction = 'eligible' | 'approve' | 'pay' | 'adjust' | 'cancel' | 'hold' | 'release';
export declare function assertEarningAction(action: EarningAction, status: string): void;
export declare function computeEarningAmount(payType: string, ratePaise: bigint, approved: {
    approvedDays: number;
    approvedMinutes: number;
}): bigint;
export declare function amountAfterAdjust(amountPaise: bigint, deltaPaise: bigint): bigint;
export declare function assertAdjust(status: string): void;
export declare function reconciles(lockedAmounts: bigint[], totalPaise: bigint, requestCurrency: string, lockedCurrency: string): boolean;

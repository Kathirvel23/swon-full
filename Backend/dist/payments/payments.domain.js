import { ApiError } from '../common/api-error.js';
const ACTION_RULES = {
    eligible: ['PENDING'],
    approve: ['ELIGIBLE'],
    pay: ['APPROVED', 'PROCESSING'],
    adjust: ['PENDING', 'ELIGIBLE', 'APPROVED', 'PROCESSING'],
    cancel: ['PENDING'],
    hold: ['ELIGIBLE', 'APPROVED'],
    release: ['ON_HOLD'],
};
export function assertEarningAction(action, status) {
    const allowed = ACTION_RULES[action];
    if (!allowed)
        throw new ApiError('VALIDATION_FAILED', `Unknown earning action: ${action}`);
    if (!allowed.includes(status)) {
        throw new ApiError('EARNING_STATE_INVALID', `Earning in ${status} cannot ${action}`);
    }
}
export function computeEarningAmount(payType, ratePaise, approved) {
    if (approved.approvedDays === 0 && approved.approvedMinutes === 0)
        return 0n;
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
export function amountAfterAdjust(amountPaise, deltaPaise) {
    return amountPaise + deltaPaise;
}
export function assertAdjust(status) {
    if (!ACTION_RULES.adjust.includes(status)) {
        throw new ApiError('EARNING_STATE_INVALID', `A ${status} earning cannot be adjusted`);
    }
}
export function reconciles(lockedAmounts, totalPaise, requestCurrency, lockedCurrency) {
    if (lockedAmounts.length === 0)
        return false;
    if (requestCurrency !== lockedCurrency)
        return false;
    const sum = lockedAmounts.reduce((acc, n) => acc + n, 0n);
    return sum === totalPaise;
}
//# sourceMappingURL=payments.domain.js.map
import { ApiError } from '../common/api-error.js';
const LEGAL = {
    OPEN: {
        UNDER_REVIEW: ['ADMIN'],
    },
    UNDER_REVIEW: {
        WAITING_ON_PARTY: ['ADMIN'],
        RESOLVED: ['ADMIN'],
        DISMISSED: ['ADMIN'],
    },
    WAITING_ON_PARTY: {
        UNDER_REVIEW: ['WORKER', 'EMPLOYER', 'ADMIN'],
        RESOLVED: ['ADMIN'],
        DISMISSED: ['ADMIN'],
        CLOSED_TIMEOUT: ['SYSTEM'],
    },
    RESOLVED: {
        OPEN: ['ADMIN'],
    },
    DISMISSED: {
        OPEN: ['ADMIN'],
    },
};
export function assertTransition(from, to, actor) {
    const targets = LEGAL[from];
    const allowedActors = targets?.[to];
    if (!allowedActors) {
        throw new ApiError('STATE_INVALID', `${from} cannot go to ${to} — it must follow the documented complaint path`);
    }
    if (!allowedActors.includes(actor)) {
        throw new ApiError('ADMIN_PERMISSION_REQUIRED', 'Only an admin can move a complaint between these states');
    }
}
export function canReopen(reopenCount) {
    return reopenCount === 0;
}
export function isPartyOfLink(link, callerAccountId) {
    if (!link)
        return true;
    if (link.employerAccountId === callerAccountId)
        return true;
    return link.partyAccountIds.some((id) => id === callerAccountId);
}
export function rateLimitOk(countLast24h, cap = 5) {
    return countLast24h < cap;
}
export function holdEligible(status) {
    return status === 'APPROVED';
}
export function releaseTarget() {
    return 'APPROVED';
}
//# sourceMappingURL=complaints.domain.js.map
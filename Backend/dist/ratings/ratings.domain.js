import { ApiError } from '../common/api-error.js';
export function assertCanRate(ctx) {
    if (ctx.jobStatus !== 'COMPLETED') {
        throw new ApiError('STATE_INVALID', 'Only completed jobs can be rated');
    }
    if (ctx.alreadyRated) {
        throw new ApiError('ALREADY_RATED', 'You have already rated this job');
    }
    const callerIsEmployer = ctx.callerAccountId === ctx.employerAccountId;
    const callerIsHired = ctx.hiredAccountIds.some((id) => id === ctx.callerAccountId);
    if (!callerIsEmployer && !callerIsHired) {
        throw new ApiError('NOT_JOB_PARTY', 'You are not a party of this job');
    }
    const rateeIsCounterpart = callerIsEmployer
        ? ctx.hiredAccountIds.some((id) => id === ctx.rateeAccountId)
        : ctx.rateeAccountId === ctx.employerAccountId;
    if (!rateeIsCounterpart) {
        throw new ApiError('NOT_JOB_PARTY', 'You can only rate the counterparty of this job');
    }
}
export function commentVisible(input) {
    return input.bothSubmitted || input.nowMs - input.createdAtMs >= 48 * 60 * 60 * 1000;
}
export function recomputeAggregate(scores) {
    const distribution = { five: 0, four: 0, three: 0, two: 0, one: 0 };
    let sum = 0;
    for (const s of scores) {
        if (!Number.isInteger(s) || s < 1 || s > 5) {
            throw new ApiError('VALIDATION_FAILED', 'Rating scores must be integers 1..5');
        }
        sum += s;
        if (s === 5)
            distribution.five += 1;
        else if (s === 4)
            distribution.four += 1;
        else if (s === 3)
            distribution.three += 1;
        else if (s === 2)
            distribution.two += 1;
        else
            distribution.one += 1;
    }
    const count = scores.length;
    const avgRatingMilli = count === 0 ? 0 : Math.round((sum * 1000) / count);
    return { avgRatingMilli, ratingsCount: count, distribution };
}
//# sourceMappingURL=ratings.domain.js.map
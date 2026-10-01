import { ApiError } from '../common/api-error.js';
const ACTION_RULES = {
    shortlist: ['APPLIED', 'WAITLISTED'],
    waitlist: ['APPLIED', 'SHORTLISTED'],
    reject: ['APPLIED', 'WAITLISTED', 'SHORTLISTED'],
    hire: ['APPLIED', 'WAITLISTED', 'SHORTLISTED'],
    release: ['HIRED'],
    withdraw: ['APPLIED', 'WAITLISTED', 'SHORTLISTED', 'HIRED'],
};
export function assertApplicationAction(action, from) {
    const allowed = ACTION_RULES[action];
    if (!allowed)
        throw new ApiError('VALIDATION_FAILED', `Unknown application action: ${action}`);
    if (!allowed.includes(from)) {
        throw new ApiError('APPLICATION_NOT_APPLICABLE', `Application in ${from} cannot ${action}`);
    }
}
export function assertCanApply(jobStatus, headcountRequired, hiredCount) {
    if (jobStatus === 'CANCELLED')
        throw new ApiError('JOB_CANCELLED', 'Job was cancelled');
    if (jobStatus === 'FILLED') {
        throw new ApiError('JOB_ALREADY_FILLED', 'No seats left');
    }
    if (hiredCount >= headcountRequired) {
        throw new ApiError('JOB_ALREADY_FILLED', 'No seats left');
    }
    if (jobStatus !== 'OPEN' && jobStatus !== 'HIRING') {
        throw new ApiError('JOB_NOT_OPEN', `Job is ${jobStatus}`);
    }
}
export function assertWithdraw(from, jobStatus) {
    const allowed = ACTION_RULES.withdraw;
    if (!allowed.includes(from)) {
        throw new ApiError('APPLICATION_NOT_APPLICABLE', `Application in ${from} cannot withdraw`);
    }
    if (jobStatus === 'IN_PROGRESS' || jobStatus === 'COMPLETED' || jobStatus === 'CLOSED') {
        throw new ApiError('STATE_INVALID', `Job is ${jobStatus} — work already started`);
    }
}
export function statusAfterFirstApplication(jobStatus) {
    return jobStatus === 'OPEN' ? 'HIRING' : jobStatus;
}
export function statusAfterHire(hiredCountAfter, headcountRequired) {
    return hiredCountAfter >= headcountRequired ? 'FILLED' : 'HIRING';
}
export function statusAfterRelease(hiredCountAfter, _headcountRequired) {
    return hiredCountAfter === 0 ? 'OPEN' : 'HIRING';
}
export function windowsOverlap(aStart, aEnd, bStart, bEnd) {
    return aStart <= bEnd && bStart <= aEnd;
}
//# sourceMappingURL=applications.domain.js.map
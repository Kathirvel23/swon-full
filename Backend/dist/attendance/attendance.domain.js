import { ApiError } from '../common/api-error.js';
export function assertCheckInWindow(nowMinutes, day) {
    if (nowMinutes < day.start - day.grace || nowMinutes > day.start + day.cutoff) {
        throw new ApiError('ATTENDANCE_WINDOW_CLOSED', 'Outside the check-in window for this shift');
    }
}
export function assertCheckOutWindow(nowMinutes, day) {
    if (nowMinutes > day.end + day.grace) {
        throw new ApiError('ATTENDANCE_WINDOW_CLOSED', 'The check-out window for this day has closed');
    }
}
export function computeDurationMinutes(checkInAt, checkOutAt) {
    const ms = Date.parse(checkOutAt) - Date.parse(checkInAt);
    if (Number.isNaN(ms) || ms < 0) {
        throw new ApiError('VALIDATION_FAILED', 'Check-out must come after check-in');
    }
    return Math.floor(ms / 60_000);
}
export function approveEligible(status) {
    if (status !== 'CHECKED_OUT') {
        throw new ApiError('STATE_INVALID', `Cannot approve a ${status} record`);
    }
    return 'APPROVED';
}
export function noShowDue(status, nowMinutes, day) {
    return status === 'NOT_STARTED' && nowMinutes >= day.end + day.cutoff;
}
export function assertReverseCheckIn(status, reason) {
    if (!reason || reason.trim().length < 5) {
        throw new ApiError('VALIDATION_FAILED', 'A reversal reason is required');
    }
    if (status !== 'CHECKED_IN') {
        throw new ApiError('STATE_INVALID', `Only a CHECKED_IN record can be reversed (this is ${status})`);
    }
}
export function assertCorrect(status, patch) {
    if (!patch.reason || patch.reason.trim().length < 5) {
        throw new ApiError('VALIDATION_FAILED', 'A correction reason is required');
    }
    if (status === 'NOT_STARTED') {
        if (patch.status !== 'NO_SHOW') {
            throw new ApiError('STATE_INVALID', 'Nothing has been checked in yet');
        }
        return;
    }
    if (patch.status) {
        if (status === 'APPROVED' || patch.status === 'NOT_STARTED') {
            throw new ApiError('STATE_INVALID', 'Corrections never reopen a day — use the reversal path');
        }
    }
}
//# sourceMappingURL=attendance.domain.js.map
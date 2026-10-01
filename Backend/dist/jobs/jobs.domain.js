import { ApiError } from '../common/api-error.js';
const RULES = {
    PUBLISH: {
        from: ['DRAFT'], to: 'OPEN', actors: ['EMPLOYER'],
        guard: (g) => (g.kycStatus === 'VERIFIED' ? null : 'KYC_REQUIRED'),
    },
    FIRST_APPLICATION: { from: ['OPEN'], to: 'HIRING', actors: ['SYSTEM'] },
    STAFFED: { from: ['OPEN', 'HIRING'], to: 'FILLED', actors: ['SYSTEM'] },
    SHORTFALL: { from: ['FILLED'], to: 'HIRING', actors: ['SYSTEM'] },
    RELEASE_ALL: { from: ['HIRING'], to: 'OPEN', actors: ['SYSTEM'] },
    START: {
        from: ['OPEN', 'HIRING', 'FILLED'], to: 'IN_PROGRESS',
        actors: ['SYSTEM', 'EMPLOYER'],
    },
    COMPLETE: {
        from: ['IN_PROGRESS'], to: 'COMPLETED', actors: ['EMPLOYER', 'SYSTEM'],
        guard: (g) => (g.attendanceResolved ? null : 'STATE_INVALID'),
    },
    CLOSE: {
        from: ['COMPLETED'], to: 'CLOSED', actors: ['EMPLOYER', 'SYSTEM'],
        guard: (g) => (g.earningsSettled ? null : 'STATE_INVALID'),
    },
    CANCEL: {
        from: ['OPEN', 'HIRING', 'FILLED'], to: 'CANCELLED',
        actors: ['EMPLOYER', 'ADMIN'],
        guard: (g) => (g.crewHandlingConfirmed ? null : 'VALIDATION_FAILED'),
    },
    EXPIRE: { from: ['OPEN', 'HIRING'], to: 'EXPIRED', actors: ['SYSTEM'] },
    DELETE: { from: ['DRAFT'], to: 'DELETED', actors: ['EMPLOYER'] },
};
export function assertJobAction(current, event, actor, guards = {}) {
    const rule = RULES[event];
    if (!rule)
        throw new ApiError('VALIDATION_FAILED', `Unknown job event: ${event}`);
    if (!rule.from.includes(current)) {
        throw new ApiError('STATE_INVALID', `Job in ${current} cannot ${event}`);
    }
    if (!rule.actors.includes(actor)) {
        throw new ApiError('FORBIDDEN', `Role ${actor} cannot ${event} a job`);
    }
    const guardCode = rule.guard?.(guards);
    if (guardCode)
        throw new ApiError(guardCode, guardMessage(guardCode, current, event));
    return rule.to;
}
function guardMessage(code, current, event) {
    if (code === 'KYC_REQUIRED') {
        return 'Verify your identity before publishing jobs (KYC required to publish)';
    }
    if (code === 'VALIDATION_FAILED') {
        return 'Confirm how hired crew will be handled before cancelling';
    }
    return `Job in ${current} cannot ${event}`;
}
const MAX_DERIVED_DAYS = 90;
const MAX_RANGE_DAYS = 366;
const toUtcMs = (date) => {
    const [y, m, d] = date.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
};
const fromUtcMs = (ms) => new Date(ms).toISOString().slice(0, 10);
export function deriveWorkDays(startsOn, endsOn, dayStartTime, dayEndTime, explicit) {
    const start = toUtcMs(startsOn);
    const end = toUtcMs(endsOn);
    if (Number.isNaN(start) || Number.isNaN(end) || end < start) {
        throw new ApiError('VALIDATION_FAILED', 'endsOn must be on or after startsOn');
    }
    if (end - start > MAX_RANGE_DAYS * 86_400_000) {
        throw new ApiError('VALIDATION_FAILED', `Work window cannot exceed ${MAX_RANGE_DAYS} days`);
    }
    if (explicit && explicit.length > 0) {
        const days = explicit.map((w) => {
            const ms = toUtcMs(w.date);
            if (Number.isNaN(ms) || ms < start || ms > end) {
                throw new ApiError('VALIDATION_FAILED', `Work day ${w.date} is outside the job's date range`);
            }
            return {
                date: w.date,
                startTime: w.startTime ?? dayStartTime,
                endTime: w.endTime ?? dayEndTime,
            };
        });
        return days;
    }
    const days = [];
    for (let ms = start; ms <= end; ms += 86_400_000) {
        if (days.length >= MAX_DERIVED_DAYS) {
            throw new ApiError('VALIDATION_FAILED', `Too many work days — list explicit days (max ${MAX_DERIVED_DAYS})`);
        }
        days.push({ date: fromUtcMs(ms), startTime: dayStartTime, endTime: dayEndTime });
    }
    return days;
}
export function payLabel(payType, payAmountPaise) {
    const rupees = Math.round(payAmountPaise / 100).toLocaleString('en-IN');
    if (payType === 'HOUR')
        return `₹${rupees} / hour`;
    if (payType === 'DAY')
        return `₹${rupees} / day`;
    return `₹${rupees} total`;
}
//# sourceMappingURL=jobs.domain.js.map
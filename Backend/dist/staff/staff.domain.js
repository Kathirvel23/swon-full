export const LATE_GRACE_MIN = 10;
export const WRITABLE = ['PRESENT', 'ABSENT', 'NOT_MARKED'];
export function uiStatus(record, dayStart, graceMin = LATE_GRACE_MIN) {
    if (record == null || record.status === 'NOT_STARTED')
        return 'NOT_MARKED';
    if (record.status === 'NO_SHOW')
        return 'ABSENT';
    if (record.checkInAt != null && dayStart != null) {
        const lateAfter = dayStart.getTime() + graceMin * 60_000;
        if (record.checkInAt.getTime() > lateAfter)
            return 'LATE';
    }
    return 'PRESENT';
}
export function statusToStored(ui) {
    if (ui === 'ABSENT')
        return 'NO_SHOW';
    if (ui === 'NOT_MARKED')
        return 'NOT_STARTED';
    return 'CHECKED_IN';
}
export function summarise(statuses) {
    return {
        total: statuses.length,
        present: statuses.filter((s) => s === 'PRESENT').length,
        late: statuses.filter((s) => s === 'LATE').length,
        absent: statuses.filter((s) => s === 'ABSENT').length,
        notMarked: statuses.filter((s) => s === 'NOT_MARKED').length,
    };
}
export function normalisePct(raw) {
    const n = typeof raw === 'number' ? raw : Number(raw);
    if (!Number.isFinite(n) || n <= 0)
        return 0;
    return Math.min(100, n);
}
export function pctFromConfig(value) {
    if (typeof value === 'number')
        return normalisePct(value);
    if (value !== null && typeof value === 'object' && 'pct' in value) {
        return normalisePct(value.pct);
    }
    return 0;
}
export function computeIncentivePaise(basePaise, pct) {
    if (!Number.isFinite(basePaise) || basePaise <= 0)
        return 0;
    const p = normalisePct(pct);
    if (p <= 0)
        return 0;
    return Math.round((basePaise * p) / 100);
}
//# sourceMappingURL=staff.domain.js.map
import { ApiError } from '../common/api-error.js';
export const WEIGHTS_VERSION = 1;
export const WEIGHTS = {
    proximity: 25,
    skill: 25,
    reliability: 15,
    rating: 15,
    recency: 10,
    availability: 5,
    overlap: 5,
};
const clampMilli = (v) => Math.max(0, Math.min(1000, Math.round(v)));
export function computeScore(s) {
    const raw = (WEIGHTS.proximity / 100) * s.proximityMilli +
        (WEIGHTS.skill / 100) * s.skillMatchMilli +
        (WEIGHTS.reliability / 100) * s.reliabilityMilli +
        (WEIGHTS.rating / 100) * s.ratingMilli +
        (WEIGHTS.recency / 100) * s.recencyMilli +
        (WEIGHTS.availability / 100) * s.availabilityMilli +
        (WEIGHTS.overlap / 100) * s.overlapMilli;
    return clampMilli(raw);
}
export function haversineKm(lat1, lng1, lat2, lng2) {
    if (!Number.isFinite(lat1) || !Number.isFinite(lng1) || !Number.isFinite(lat2) || !Number.isFinite(lng2)) {
        return null;
    }
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
}
export function distanceBand(km) {
    if (km === null)
        return 'unknown';
    if (km < 2)
        return '<2km';
    if (km < 5)
        return '<5km';
    if (km < 10)
        return '<10km';
    if (km < 25)
        return '<25km';
    return '25km+';
}
export function proximityMilli(km) {
    if (km === null)
        return 400;
    if (km < 2)
        return 1000;
    if (km < 5)
        return 850;
    if (km < 10)
        return 700;
    if (km < 25)
        return 500;
    return 250;
}
export function skillMatchMilli(jobSkillIds, workerSkillIds) {
    if (jobSkillIds.length === 0)
        return 800;
    if (workerSkillIds.length === 0)
        return 0;
    const have = new Set(workerSkillIds.map(String));
    const hit = jobSkillIds.filter((id) => have.has(String(id))).length;
    return clampMilli((hit / jobSkillIds.length) * 1000);
}
export function reliabilityMilli(attendanceRateMilli, jobsDoneCount) {
    if (attendanceRateMilli !== null)
        return clampMilli(attendanceRateMilli);
    if (jobsDoneCount === 0)
        return 500;
    return clampMilli(700 + Math.min(jobsDoneCount, 10) * 20);
}
export function ratingMilli(avgRatingMilli, ratingsCount) {
    if (ratingsCount === 0)
        return 600;
    return clampMilli(avgRatingMilli / 5);
}
export function recencyMilli(lastActivityMs, nowMs) {
    if (lastActivityMs === null)
        return 500;
    const ageDays = Math.max(0, (nowMs - lastActivityMs) / 86400_000);
    if (ageDays <= 7)
        return 1000;
    if (ageDays <= 30)
        return 900;
    if (ageDays <= 90)
        return 700;
    if (ageDays <= 180)
        return 500;
    if (ageDays <= 365)
        return 350;
    return 150;
}
export function availabilityMilli(openToWork) {
    return openToWork ? 1000 : 400;
}
export function overlapMilli(hasSlotInWindow) {
    return hasSlotInWindow ? 1000 : 300;
}
export function reasonCodes(s) {
    const codes = [];
    if (s.proximityMilli >= 900)
        codes.push('NEARBY');
    if (s.skillMatchMilli >= 900)
        codes.push('STRONG_SKILLS');
    if (s.ratingMilli >= 900)
        codes.push('TOP_RATED');
    if (s.reliabilityMilli >= 900)
        codes.push('HIGHLY_RELIABLE');
    if (s.recencyMilli >= 900)
        codes.push('ACTIVE_RECENTLY');
    if (s.availabilityMilli >= 900)
        codes.push('OPEN_TO_WORK');
    if (s.overlapMilli >= 900)
        codes.push('AVAILABLE_THOSE_DATES');
    if (codes.length === 0)
        codes.push('GOOD_OVERALL_MATCH');
    return codes;
}
export function assertRespondable(status, nowMs, respondByMs) {
    if (status !== 'PENDING') {
        throw new ApiError('STATE_INVALID', `Only PENDING offers can be answered (this one is ${status})`);
    }
    if (nowMs > respondByMs) {
        throw new ApiError('QUICKMATCH_EXPIRED', 'This offer has expired');
    }
}
export function respondTransition(status, response, respondByMs, nowMs = Date.now()) {
    if (status !== 'PENDING')
        return status;
    if (nowMs > respondByMs)
        return 'EXPIRED';
    return response === 'ACCEPT' ? 'ACCEPTED' : 'DECLINED';
}
//# sourceMappingURL=matching.domain.js.map
import { ApiError } from '../common/api-error.js';

/**
 * §16 scoring pipeline + Quick Match respond guards. Pure — no Prisma, no
 * Nest. Every signal is an integer in milli-units (0..1000) so the weighted
 * total is exact and reproducible; weights carry a version number that is
 * stored on every match_log row.
 */

export const WEIGHTS_VERSION = 1;

export const WEIGHTS = {
  proximity: 25,
  skill: 25,
  reliability: 15,
  rating: 15,
  recency: 10,
  availability: 5,
  overlap: 5,
} as const; // sums to 100

export interface Signals {
  proximityMilli: number;
  skillMatchMilli: number;
  reliabilityMilli: number;
  ratingMilli: number;
  recencyMilli: number;
  availabilityMilli: number;
  overlapMilli: number;
}

const clampMilli = (v: number): number => Math.max(0, Math.min(1000, Math.round(v)));

/** Σ (weight/100 × signal) → 0..1000, integer. */
export function computeScore(s: Signals): number {
  const raw =
    (WEIGHTS.proximity / 100) * s.proximityMilli +
    (WEIGHTS.skill / 100) * s.skillMatchMilli +
    (WEIGHTS.reliability / 100) * s.reliabilityMilli +
    (WEIGHTS.rating / 100) * s.ratingMilli +
    (WEIGHTS.recency / 100) * s.recencyMilli +
    (WEIGHTS.availability / 100) * s.availabilityMilli +
    (WEIGHTS.overlap / 100) * s.overlapMilli;
  return clampMilli(raw);
}

/** Great-circle distance in km (null when either point lacks coordinates). */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number | null {
  if (!Number.isFinite(lat1) || !Number.isFinite(lng1) || !Number.isFinite(lat2) || !Number.isFinite(lng2)) {
    return null;
  }
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function distanceBand(km: number | null): string {
  if (km === null) return 'unknown';
  if (km < 2) return '<2km';
  if (km < 5) return '<5km';
  if (km < 10) return '<10km';
  if (km < 25) return '<25km';
  return '25km+';
}

export function proximityMilli(km: number | null): number {
  if (km === null) return 400; // unknown coordinates: mildly pessimistic neutral
  if (km < 2) return 1000;
  if (km < 5) return 850;
  if (km < 10) return 700;
  if (km < 25) return 500;
  return 250;
}

/** Required-job skills covered by the worker's skills. Job without skills → neutral 800. */
export function skillMatchMilli(jobSkillIds: bigint[], workerSkillIds: bigint[]): number {
  if (jobSkillIds.length === 0) return 800;
  if (workerSkillIds.length === 0) return 0;
  const have = new Set(workerSkillIds.map(String));
  const hit = jobSkillIds.filter((id) => have.has(String(id))).length;
  return clampMilli((hit / jobSkillIds.length) * 1000);
}

/** Measured attendance rate when present, else jobs-done history as a proxy. */
export function reliabilityMilli(attendanceRateMilli: number | null, jobsDoneCount: number): number {
  if (attendanceRateMilli !== null) return clampMilli(attendanceRateMilli);
  if (jobsDoneCount === 0) return 500; // unknown: neutral
  return clampMilli(700 + Math.min(jobsDoneCount, 10) * 20);
}

/** Average rating scaled to milli; unrated → neutral 600. */
export function ratingMilli(avgRatingMilli: number, ratingsCount: number): number {
  if (ratingsCount === 0) return 600;
  return clampMilli(avgRatingMilli / 5);
}

/** Days since the worker's last completed job; never worked here → 500. */
export function recencyMilli(lastActivityMs: number | null, nowMs: number): number {
  if (lastActivityMs === null) return 500;
  const ageDays = Math.max(0, (nowMs - lastActivityMs) / 86400_000);
  if (ageDays <= 7) return 1000;
  if (ageDays <= 30) return 900;
  if (ageDays <= 90) return 700;
  if (ageDays <= 180) return 500;
  if (ageDays <= 365) return 350;
  return 150;
}

export function availabilityMilli(openToWork: boolean): number {
  return openToWork ? 1000 : 400;
}

/** Availability slot covers the job's dates/times. */
export function overlapMilli(hasSlotInWindow: boolean): number {
  return hasSlotInWindow ? 1000 : 300;
}

/** UI chips — only strong signals earn a code (kept stable for tests/i18n). */
export function reasonCodes(s: Signals): string[] {
  const codes: string[] = [];
  if (s.proximityMilli >= 900) codes.push('NEARBY');
  if (s.skillMatchMilli >= 900) codes.push('STRONG_SKILLS');
  if (s.ratingMilli >= 900) codes.push('TOP_RATED');
  if (s.reliabilityMilli >= 900) codes.push('HIGHLY_RELIABLE');
  if (s.recencyMilli >= 900) codes.push('ACTIVE_RECENTLY');
  if (s.availabilityMilli >= 900) codes.push('OPEN_TO_WORK');
  if (s.overlapMilli >= 900) codes.push('AVAILABLE_THOSE_DATES');
  if (codes.length === 0) codes.push('GOOD_OVERALL_MATCH');
  return codes;
}

// ---------------------------------------------------------------- Quick Match

/** PENDING + inside the window; expired window → QUICKMATCH_EXPIRED. */
export function assertRespondable(status: string, nowMs: number, respondByMs: number): void {
  if (status !== 'PENDING') {
    throw new ApiError('STATE_INVALID', `Only PENDING offers can be answered (this one is ${status})`);
  }
  if (nowMs > respondByMs) {
    throw new ApiError('QUICKMATCH_EXPIRED', 'This offer has expired');
  }
}

/** Final row status for a respond attempt (expired window wins over the choice). */
export function respondTransition(
  status: string,
  response: 'ACCEPT' | 'DECLINE',
  respondByMs: number,
  nowMs: number = Date.now(),
): string {
  if (status !== 'PENDING') return status;
  if (nowMs > respondByMs) return 'EXPIRED';
  return response === 'ACCEPT' ? 'ACCEPTED' : 'DECLINED';
}

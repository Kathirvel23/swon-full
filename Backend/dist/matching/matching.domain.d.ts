export declare const WEIGHTS_VERSION = 1;
export declare const WEIGHTS: {
    readonly proximity: 25;
    readonly skill: 25;
    readonly reliability: 15;
    readonly rating: 15;
    readonly recency: 10;
    readonly availability: 5;
    readonly overlap: 5;
};
export interface Signals {
    proximityMilli: number;
    skillMatchMilli: number;
    reliabilityMilli: number;
    ratingMilli: number;
    recencyMilli: number;
    availabilityMilli: number;
    overlapMilli: number;
}
export declare function computeScore(s: Signals): number;
export declare function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number | null;
export declare function distanceBand(km: number | null): string;
export declare function proximityMilli(km: number | null): number;
export declare function skillMatchMilli(jobSkillIds: bigint[], workerSkillIds: bigint[]): number;
export declare function reliabilityMilli(attendanceRateMilli: number | null, jobsDoneCount: number): number;
export declare function ratingMilli(avgRatingMilli: number, ratingsCount: number): number;
export declare function recencyMilli(lastActivityMs: number | null, nowMs: number): number;
export declare function availabilityMilli(openToWork: boolean): number;
export declare function overlapMilli(hasSlotInWindow: boolean): number;
export declare function reasonCodes(s: Signals): string[];
export declare function assertRespondable(status: string, nowMs: number, respondByMs: number): void;
export declare function respondTransition(status: string, response: 'ACCEPT' | 'DECLINE', respondByMs: number, nowMs?: number): string;

export interface RateContext {
    jobStatus: string;
    callerAccountId: bigint;
    rateeAccountId: bigint;
    employerAccountId: bigint;
    hiredAccountIds: bigint[];
    alreadyRated: boolean;
}
export declare function assertCanRate(ctx: RateContext): void;
export declare function commentVisible(input: {
    bothSubmitted: boolean;
    createdAtMs: number;
    nowMs: number;
}): boolean;
export interface Aggregate {
    avgRatingMilli: number;
    ratingsCount: number;
    distribution: {
        five: number;
        four: number;
        three: number;
        two: number;
        one: number;
    };
}
export declare function recomputeAggregate(scores: number[]): Aggregate;

import { z } from 'zod';
/**
 * /ratings — mutual, double-blind for 48 h (§14 row 12, §22.8).
 * One rating per (job, rater, ratee); only counterparties of a COMPLETED job.
 */
export declare const RATING_TAGS: readonly ["ON_TIME", "SAFE_ENVIRONMENT", "CLEAR_PAY", "RESPECTFUL", "GOOD_WORK", "RELIABLE", "NEEDS_IMPROVEMENT"];
export declare const ratingTagSchema: z.ZodEnum<{
    ON_TIME: "ON_TIME";
    SAFE_ENVIRONMENT: "SAFE_ENVIRONMENT";
    CLEAR_PAY: "CLEAR_PAY";
    RESPECTFUL: "RESPECTFUL";
    GOOD_WORK: "GOOD_WORK";
    RELIABLE: "RELIABLE";
    NEEDS_IMPROVEMENT: "NEEDS_IMPROVEMENT";
}>;
export type RatingTag = z.infer<typeof ratingTagSchema>;
export declare const ratingCreateSchema: z.ZodObject<{
    jobPublicId: z.ZodString;
    rateeAccountPublicId: z.ZodString;
    score: z.ZodNumber;
    tags: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        ON_TIME: "ON_TIME";
        SAFE_ENVIRONMENT: "SAFE_ENVIRONMENT";
        CLEAR_PAY: "CLEAR_PAY";
        RESPECTFUL: "RESPECTFUL";
        GOOD_WORK: "GOOD_WORK";
        RELIABLE: "RELIABLE";
        NEEDS_IMPROVEMENT: "NEEDS_IMPROVEMENT";
    }>>>;
    comment: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RatingCreate = z.infer<typeof ratingCreateSchema>;
export declare const ratingDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    score: z.ZodNumber;
    tags: z.ZodArray<z.ZodEnum<{
        ON_TIME: "ON_TIME";
        SAFE_ENVIRONMENT: "SAFE_ENVIRONMENT";
        CLEAR_PAY: "CLEAR_PAY";
        RESPECTFUL: "RESPECTFUL";
        GOOD_WORK: "GOOD_WORK";
        RELIABLE: "RELIABLE";
        NEEDS_IMPROVEMENT: "NEEDS_IMPROVEMENT";
    }>>;
    comment: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    commentVisible: z.ZodBoolean;
    jobPublicId: z.ZodString;
    jobTitle: z.ZodString;
    raterRole: z.ZodEnum<{
        EMPLOYER: "EMPLOYER";
        WORKER: "WORKER";
    }>;
    rater: z.ZodObject<{
        publicId: z.ZodString;
        displayName: z.ZodString;
        photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        revealed: z.ZodBoolean;
    }, z.core.$strip>;
    ratee: z.ZodObject<{
        publicId: z.ZodString;
        displayName: z.ZodString;
        photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type RatingDto = z.infer<typeof ratingDtoSchema>;
/** /me/rating-summary — lightweight aggregate for profile cards */
export declare const ratingSummarySchema: z.ZodObject<{
    avgRatingMilli: z.ZodNumber;
    ratingsCount: z.ZodNumber;
    distribution: z.ZodObject<{
        five: z.ZodNumber;
        four: z.ZodNumber;
        three: z.ZodNumber;
        two: z.ZodNumber;
        one: z.ZodNumber;
    }, z.core.$strip>;
    pendingCount: z.ZodNumber;
}, z.core.$strip>;
export type RatingSummary = z.infer<typeof ratingSummarySchema>;
export declare const pendingRatingsQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const ratingErrors: readonly ["ALREADY_RATED", "NOT_JOB_PARTY", "STATE_INVALID", "VALIDATION_FAILED", "NOT_FOUND"];
//# sourceMappingURL=ratings.d.ts.map
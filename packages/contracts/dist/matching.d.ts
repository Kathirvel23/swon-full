import { z } from 'zod';
/**
 * /matching — legacy-compatible discovery (§16 score pipeline) and the
 * Quick Match adjacent-worker loop (§14 row 13). Signals used by scoring are
 * fixed here so admin weights config maps 1:1: proximity, skill match,
 * reliability, rating, recency, availability, overlap (§16).
 */
export declare const matchCandidateSchema: z.ZodObject<{
    workerPublicId: z.ZodString;
    score: z.ZodNumber;
    distanceBand: z.ZodString;
    signals: z.ZodObject<{
        proximityMilli: z.ZodNumber;
        skillMatchMilli: z.ZodNumber;
        reliabilityMilli: z.ZodNumber;
        ratingMilli: z.ZodNumber;
        recencyMilli: z.ZodNumber;
        availabilityMilli: z.ZodNumber;
        overlapMilli: z.ZodNumber;
    }, z.core.$strip>;
    reasonCodes: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type MatchCandidate = z.infer<typeof matchCandidateSchema>;
export declare const matchResultSchema: z.ZodObject<{
    jobPublicId: z.ZodString;
    weightsVersion: z.ZodNumber;
    logId: z.ZodString;
    candidates: z.ZodArray<z.ZodObject<{
        workerPublicId: z.ZodString;
        score: z.ZodNumber;
        distanceBand: z.ZodString;
        signals: z.ZodObject<{
            proximityMilli: z.ZodNumber;
            skillMatchMilli: z.ZodNumber;
            reliabilityMilli: z.ZodNumber;
            ratingMilli: z.ZodNumber;
            recencyMilli: z.ZodNumber;
            availabilityMilli: z.ZodNumber;
            overlapMilli: z.ZodNumber;
        }, z.core.$strip>;
        reasonCodes: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
    ignoredCount: z.ZodNumber;
    takenMs: z.ZodNumber;
}, z.core.$strip>;
export type MatchResult = z.infer<typeof matchResultSchema>;
export declare const matchQuerySchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    includeApplied: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export declare const quickMatchCreateSchema: z.ZodObject<{
    jobPublicId: z.ZodString;
    headcount: z.ZodNumber;
    windowStart: z.ZodString;
    windowEnd: z.ZodString;
    requirementSnapshot: z.ZodString;
    radiusKm: z.ZodDefault<z.ZodNumber>;
    waveSize: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export type QuickMatchCreate = z.infer<typeof quickMatchCreateSchema>;
export declare const quickMatchOfferDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    status: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        EXPIRED: "EXPIRED";
        PENDING: "PENDING";
        ACCEPTED: "ACCEPTED";
        DECLINED: "DECLINED";
    }>;
    job: z.ZodObject<{
        publicId: z.ZodString;
        title: z.ZodString;
        city: z.ZodString;
        areaName: z.ZodString;
        payAmountPaise: z.ZodNumber;
        payType: z.ZodString;
        employerName: z.ZodString;
    }, z.core.$strip>;
    requirementSnapshot: z.ZodString;
    windowStart: z.ZodString;
    windowEnd: z.ZodString;
    respondBy: z.ZodString;
    respondedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    distanceBand: z.ZodString;
    expiringSoon: z.ZodBoolean;
    reasonCodes: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type QuickMatchOfferDto = z.infer<typeof quickMatchOfferDtoSchema>;
export declare const quickMatchRespondSchema: z.ZodObject<{
    response: z.ZodEnum<{
        ACCEPT: "ACCEPT";
        DECLINE: "DECLINE";
    }>;
    coverNote: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type QuickMatchRespond = z.infer<typeof quickMatchRespondSchema>;
export declare const quickMatchQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        CANCELLED: "CANCELLED";
        EXPIRED: "EXPIRED";
        PENDING: "PENDING";
        ACCEPTED: "ACCEPTED";
        DECLINED: "DECLINED";
    }>>;
}, z.core.$strip>;
export declare const matchingErrors: readonly ["STATE_INVALID", "QUICKMATCH_EXPIRED", "JOB_ALREADY_FILLED", "JOB_NOT_OPEN", "DUPLICATE_APPLICATION", "CREW_DOUBLE_JOB", "NOT_OWNER", "NOT_FOUND", "IDEMPOTENCY_KEY_REUSED"];
//# sourceMappingURL=matching.d.ts.map
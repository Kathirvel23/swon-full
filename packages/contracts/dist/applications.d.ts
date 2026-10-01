import { z } from 'zod';
/**
 * /applications + /hiring — worker apply/withdraw and the employer's
 * Application Queue decisions (§14 rows 7–8). The queue answers "who should
 * we hire?" — crew/roster lives in crew.ts (§10 of the brief: queue ≠ crew).
 */
export declare const applyInputSchema: z.ZodObject<{
    jobId: z.ZodString;
    coverNote: z.ZodOptional<z.ZodString>;
    offerId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ApplyInput = z.infer<typeof applyInputSchema>;
export declare const applicationDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    status: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        EXPIRED: "EXPIRED";
        APPLIED: "APPLIED";
        SHORTLISTED: "SHORTLISTED";
        WAITLISTED: "WAITLISTED";
        HIRED: "HIRED";
        REJECTED: "REJECTED";
        WITHDRAWN: "WITHDRAWN";
    }>;
    source: z.ZodEnum<{
        APPLY: "APPLY";
        QUICK_MATCH: "QUICK_MATCH";
    }>;
    appliedAt: z.ZodString;
    decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    decisionNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    job: z.ZodObject<{
        publicId: z.ZodString;
        title: z.ZodString;
        city: z.ZodString;
        areaName: z.ZodString;
        startsOn: z.ZodString;
        endsOn: z.ZodString;
        payAmountPaise: z.ZodNumber;
        payType: z.ZodString;
        headcountRequired: z.ZodNumber;
        hiredCount: z.ZodNumber;
        employerName: z.ZodString;
        status: z.ZodString;
    }, z.core.$strip>;
    crewSeat: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        COMPLETED: "COMPLETED";
        NO_SHOW: "NO_SHOW";
        RELEASED: "RELEASED";
        NONE: "NONE";
    }>;
}, z.core.$strip>;
export type ApplicationDto = z.infer<typeof applicationDtoSchema>;
export declare const myApplicationsQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodString>;
    active: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export type QueueQuery = z.infer<typeof queueQuerySchema>;
export declare const withdrawInputSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type WithdrawInput = z.infer<typeof withdrawInputSchema>;
export declare const DECISION_ACTIONS: readonly ["shortlist", "waitlist", "reject", "hire", "release"];
export declare const decisionActionSchema: z.ZodEnum<{
    shortlist: "shortlist";
    waitlist: "waitlist";
    reject: "reject";
    hire: "hire";
    release: "release";
}>;
export type DecisionAction = z.infer<typeof decisionActionSchema>;
export declare const applicationDecisionSchema: z.ZodObject<{
    action: z.ZodEnum<{
        shortlist: "shortlist";
        waitlist: "waitlist";
        reject: "reject";
        hire: "hire";
        release: "release";
    }>;
    note: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ApplicationDecision = z.infer<typeof applicationDecisionSchema>;
export declare const bulkDecisionItemSchema: z.ZodObject<{
    applicationId: z.ZodString;
    action: z.ZodEnum<{
        shortlist: "shortlist";
        waitlist: "waitlist";
        reject: "reject";
        hire: "hire";
        release: "release";
    }>;
    note: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const bulkDecisionSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        applicationId: z.ZodString;
        action: z.ZodEnum<{
            shortlist: "shortlist";
            waitlist: "waitlist";
            reject: "reject";
            hire: "hire";
            release: "release";
        }>;
        note: z.ZodOptional<z.ZodString>;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type BulkDecision = z.infer<typeof bulkDecisionSchema>;
/** Bulk answers §14: 422 with per-row results — never half-apply silently. */
export declare const bulkDecisionResultSchema: z.ZodObject<{
    results: z.ZodArray<z.ZodObject<{
        applicationId: z.ZodString;
        ok: z.ZodBoolean;
        code: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<{
            CANCELLED: "CANCELLED";
            EXPIRED: "EXPIRED";
            APPLIED: "APPLIED";
            SHORTLISTED: "SHORTLISTED";
            WAITLISTED: "WAITLISTED";
            HIRED: "HIRED";
            REJECTED: "REJECTED";
            WITHDRAWN: "WITHDRAWN";
        }>>;
    }, z.core.$strip>>;
    succeeded: z.ZodNumber;
    failed: z.ZodNumber;
}, z.core.$strip>;
export type BulkDecisionResult = z.infer<typeof bulkDecisionResultSchema>;
export declare const queueItemSchema: z.ZodObject<{
    application: z.ZodObject<{
        status: z.ZodEnum<{
            CANCELLED: "CANCELLED";
            EXPIRED: "EXPIRED";
            APPLIED: "APPLIED";
            SHORTLISTED: "SHORTLISTED";
            WAITLISTED: "WAITLISTED";
            HIRED: "HIRED";
            REJECTED: "REJECTED";
            WITHDRAWN: "WITHDRAWN";
        }>;
        publicId: z.ZodString;
        source: z.ZodEnum<{
            APPLY: "APPLY";
            QUICK_MATCH: "QUICK_MATCH";
        }>;
        appliedAt: z.ZodString;
        decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        decisionNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        crewSeat: z.ZodEnum<{
            ACTIVE: "ACTIVE";
            COMPLETED: "COMPLETED";
            NO_SHOW: "NO_SHOW";
            RELEASED: "RELEASED";
            NONE: "NONE";
        }>;
        worker: z.ZodObject<{
            publicId: z.ZodString;
            fullName: z.ZodString;
            photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            avgRatingMilli: z.ZodNumber;
            ratingsCount: z.ZodNumber;
            jobsDoneCount: z.ZodNumber;
            kycBadge: z.ZodBoolean;
            distanceBand: z.ZodOptional<z.ZodString>;
            skills: z.ZodArray<z.ZodObject<{
                skillId: z.ZodString;
                name: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>;
        conflictWarning: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
export type QueueItem = z.infer<typeof queueItemSchema>;
export type MyApplicationsQuery = z.infer<typeof myApplicationsQuerySchema>;
export declare const queueQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<{
        APPLIED_AT: "APPLIED_AT";
        RATING: "RATING";
        DISTANCE: "DISTANCE";
    }>>;
}, z.core.$strip>;
export declare const applyErrors: readonly ["JOB_NOT_OPEN", "JOB_ALREADY_FILLED", "JOB_CANCELLED", "DUPLICATE_APPLICATION", "CREW_DOUBLE_JOB", "ACCOUNT_SUSPENDED", "KYC_REQUIRED", "NOT_FOUND", "RATE_LIMITED"];
export declare const decisionErrors: readonly ["STATE_INVALID", "JOB_ALREADY_FILLED", "HIRE_RACE_LOST", "CREW_DOUBLE_JOB", "NOT_OWNER", "NOT_FOUND", "IDEMPOTENCY_KEY_REUSED"];
//# sourceMappingURL=applications.d.ts.map
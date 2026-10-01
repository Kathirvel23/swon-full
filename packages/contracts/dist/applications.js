import { z } from 'zod';
import { applicationStatusSchema, pageQuerySchema, publicIdSchema } from './common.js';
/**
 * /applications + /hiring — worker apply/withdraw and the employer's
 * Application Queue decisions (§14 rows 7–8). The queue answers "who should
 * we hire?" — crew/roster lives in crew.ts (§10 of the brief: queue ≠ crew).
 */
// ---------------------------------------------------------------------------
// Worker side
// ---------------------------------------------------------------------------
export const applyInputSchema = z.object({
    jobId: publicIdSchema,
    coverNote: z.string().max(300).optional(),
    /** present when applying via a Quick Match offer */
    offerId: publicIdSchema.optional(),
});
export const applicationDtoSchema = z.object({
    publicId: publicIdSchema,
    status: applicationStatusSchema,
    source: z.enum(['APPLY', 'QUICK_MATCH']),
    appliedAt: z.string().datetime(),
    decidedAt: z.string().datetime().nullish(),
    decisionNote: z.string().nullish(),
    job: z.object({
        publicId: publicIdSchema,
        title: z.string(),
        city: z.string(),
        areaName: z.string(),
        startsOn: z.string(),
        endsOn: z.string(),
        payAmountPaise: z.number(),
        payType: z.string(),
        headcountRequired: z.number().int(),
        hiredCount: z.number().int(),
        employerName: z.string(),
        status: z.string(),
    }),
    /** worker-side: seat secured? → drives Work-tab crew card */
    crewSeat: z.enum(['NONE', 'ACTIVE', 'RELEASED', 'NO_SHOW', 'COMPLETED']),
});
export const myApplicationsQuerySchema = pageQuerySchema.extend({
    status: z.string().optional(), // comma-separated applicationStatus
    active: z.coerce.boolean().optional(), // shorthand: current jobs only
});
export const withdrawInputSchema = z.object({
    reason: z.string().max(255).optional(),
});
export const DECISION_ACTIONS = [
    'shortlist', 'waitlist', 'reject', 'hire', 'release',
];
export const decisionActionSchema = z.enum(DECISION_ACTIONS);
export const applicationDecisionSchema = z.object({
    action: decisionActionSchema,
    note: z.string().max(255).optional(),
    /** required for release (M2-A8) */
    reason: z.string().max(255).optional(),
});
export const bulkDecisionItemSchema = z.object({
    applicationId: publicIdSchema,
    action: decisionActionSchema,
    note: z.string().max(255).optional(),
    reason: z.string().max(255).optional(),
});
export const bulkDecisionSchema = z.object({
    items: z.array(bulkDecisionItemSchema).min(1).max(100),
});
/** Bulk answers §14: 422 with per-row results — never half-apply silently. */
export const bulkDecisionResultSchema = z.object({
    results: z.array(z.object({
        applicationId: publicIdSchema,
        ok: z.boolean(),
        code: z.string().optional(), // ErrorCode on failure
        status: applicationStatusSchema.optional(), // resulting status on success
    })),
    succeeded: z.number().int(),
    failed: z.number().int(),
});
export const queueItemSchema = z.object({
    application: applicationDtoSchema.omit({ job: true }).extend({
        worker: z.object({
            publicId: publicIdSchema,
            fullName: z.string(),
            photoUrl: z.string().url().nullish(),
            avgRatingMilli: z.number().int(),
            ratingsCount: z.number().int(),
            jobsDoneCount: z.number().int(),
            kycBadge: z.boolean(),
            distanceBand: z.string().optional(),
            skills: z.array(z.object({ skillId: publicIdSchema, name: z.string() })),
        }),
        conflictWarning: z.boolean(), // already hired for overlapping window (§16/§17)
    }),
});
export const queueQuerySchema = pageQuerySchema.extend({
    status: z.string().optional(), // filter chips: APPLIED,SHORTLISTED,WAITLISTED
    sort: z.enum(['APPLIED_AT', 'RATING', 'DISTANCE']).default('APPLIED_AT'),
});
export const applyErrors = [
    'JOB_NOT_OPEN', 'JOB_ALREADY_FILLED', 'JOB_CANCELLED', 'DUPLICATE_APPLICATION',
    'CREW_DOUBLE_JOB', 'ACCOUNT_SUSPENDED', 'KYC_REQUIRED', 'NOT_FOUND', 'RATE_LIMITED',
];
export const decisionErrors = [
    'STATE_INVALID', 'JOB_ALREADY_FILLED', 'HIRE_RACE_LOST', 'CREW_DOUBLE_JOB',
    'NOT_OWNER', 'NOT_FOUND', 'IDEMPOTENCY_KEY_REUSED',
];

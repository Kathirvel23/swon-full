import { z } from 'zod';
import { isoDateSchema, jobStatusSchema, localTimeSchema, moneyPaiseSchema, pageQuerySchema, paginated, payTypeSchema, publicIdSchema, } from './common.js';
/**
 * /jobs — creation, lifecycle commands, discovery feed (§14 row 6).
 * Owner mutations only; drafts are private; live jobs worker-readable.
 * Lifecycle transitions live in Database/STATE_MACHINES.md (M1).
 */
export const jobWorkDayInputSchema = z.object({
    date: isoDateSchema,
    startTime: localTimeSchema.optional(), // defaults to job dayStartTime
    endTime: localTimeSchema.optional(),
    headcount: z.number().int().min(1).max(500).optional(),
});
export const jobCreateSchema = z.object({
    title: z.string().min(5).max(120),
    description: z.string().min(20).max(5000),
    categoryId: publicIdSchema,
    city: z.string().min(2).max(60),
    areaId: publicIdSchema,
    addressLine: z.string().min(3).max(255),
    lat: z.number().optional(),
    lng: z.number().optional(),
    startsOn: isoDateSchema,
    endsOn: isoDateSchema,
    dayStartTime: localTimeSchema,
    dayEndTime: localTimeSchema,
    workDays: z.array(jobWorkDayInputSchema).max(30).optional(), // else derived: every day in range
    payType: payTypeSchema,
    payAmountPaise: moneyPaiseSchema.refine((n) => n > 0, 'Pay must be positive'),
    headcountRequired: z.number().int().min(1).max(500),
    minExperienceYears: z.number().int().min(0).max(50).optional(),
    requirementsNote: z.string().max(500).optional(),
    skillIds: z.array(publicIdSchema).max(20).default([]),
    welfare: z
        .array(z.object({ code: z.string(), note: z.string().max(255).optional() }))
        .max(20)
        .default([]),
});
export const jobPatchSchema = jobCreateSchema.partial().refine((v) => Object.keys(v).length > 0, 'Empty patch');
export const jobDtoSchema = z.object({
    publicId: publicIdSchema,
    title: z.string(),
    description: z.string(),
    status: jobStatusSchema,
    category: z.object({ publicId: publicIdSchema, code: z.string(), name: z.string() }),
    city: z.string(),
    area: z.object({ publicId: publicIdSchema, name: z.string() }),
    addressLine: z.string(), // shared only post-hire for workers (§18 note)
    coordinatesAvailable: z.boolean(),
    startsOn: isoDateSchema,
    endsOn: isoDateSchema,
    dayStartTime: localTimeSchema,
    dayEndTime: localTimeSchema,
    workDays: z.array(z.object({ date: isoDateSchema, startTime: localTimeSchema, endTime: localTimeSchema })),
    payType: payTypeSchema,
    payAmountPaise: moneyPaiseSchema,
    currency: z.literal('INR'),
    payLabel: z.string(), // pre-rendered human label server-side fallback: "₹750 / day"
    headcountRequired: z.number().int(),
    hiredCount: z.number().int(),
    applicationCount: z.number().int(),
    minExperienceYears: z.number().int().nullish(),
    requirementsNote: z.string().nullish(),
    skills: z.array(z.object({ skillId: publicIdSchema, name: z.string() })),
    welfare: z.array(z.object({ code: z.string(), label: z.string(), note: z.string().nullish() })),
    employer: z.object({
        publicId: publicIdSchema,
        orgName: z.string(),
        orgType: z.string(),
        avgRatingMilli: z.number().int(),
        ratingsCount: z.number().int(),
        kycBadge: z.boolean(),
    }),
    publishedAt: z.string().datetime().nullish(),
    cancelReason: z.string().nullish(),
    /** worker-side: what the caller has already done here */
    viewerState: z
        .object({
        applied: z.boolean(),
        applicationStatus: z.string().optional(),
        hasCrewSeat: z.boolean(),
        isOwner: z.boolean(),
    })
        .optional(),
    createdAt: z.string().datetime(),
});
// Discovery feed — deterministic filters server-side (§16 filter stage)
export const jobSearchSchema = pageQuerySchema.extend({
    categoryId: publicIdSchema.optional(),
    city: z.string().optional(),
    areaId: publicIdSchema.optional(),
    from: isoDateSchema.optional(),
    to: isoDateSchema.optional(),
    payMinPaise: moneyPaiseSchema.optional(),
    skillIds: z.string().optional(), // comma-separated publicIds (URL form)
    welfareCodes: z.string().optional(), // comma-separated welfare codes (W3 filter)
    q: z.string().max(80).optional(),
    sort: z.enum(['DATE_ASC', 'DATE_DESC', 'PAY_DESC', 'RELEVANCE']).default('DATE_DESC'),
});
/**
 * Feed item = jobDto + discovery-only viewer context (W3): distance between
 * the job's area and the viewer's profile area, plus eligibility badges
 * (skill overlap, experience, KYC readiness — #10 gate is enforced at apply).
 */
export const jobFeedItemSchema = jobDtoSchema.extend({
    distanceKm: z.number().nullish(),
    viewerBadges: z
        .object({
        matchesSkills: z.boolean(),
        experienceOk: z.boolean(),
        kycOk: z.boolean(),
    })
        .optional(),
});
export const jobListSchema = paginated(jobFeedItemSchema);
/** Employer's own jobs (drafts included). */
export const jobMineQuerySchema = pageQuerySchema.extend({
    status: jobStatusSchema.optional(),
});
// Lifecycle commands (state machine M1 — server rejects invalid transitions with 409)
export const jobPublishOutputSchema = z.object({ publicId: publicIdSchema, status: z.literal('OPEN') });
export const jobCancelSchema = z.object({
    reason: z.string().min(5).max(255),
    /** employer must confirm hired-crew handling step (M1-J9 guard) */
    crewHandlingConfirmed: z.boolean().refine((v) => v, 'Confirm crew handling'),
});
export const jobErrors = [
    'VALIDATION_FAILED', 'NOT_OWNER', 'STATE_INVALID', 'KYC_REQUIRED', 'NOT_FOUND', 'RATE_LIMITED',
];

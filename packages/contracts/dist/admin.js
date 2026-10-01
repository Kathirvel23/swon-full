import { z } from 'zod';
import { pageQuerySchema, publicIdSchema } from './common.js';
/**
 * /admin — separate React admin app calls these (§36a #5); RBAC is a
 * permission TABLE, not an if-chain (§15), and every bulk endpoint
 * authorizes per row. Dashboards & export shape: architecture §14 row 16.
 */
// ---------------------------------------------------------------------------
// Dashboard metrics (operational — not a business dashboard)
// ---------------------------------------------------------------------------
export const adminMetricsSchema = z.object({
    queues: z.object({
        kycWaiting: z.number().int(),
        complaintsOpen: z.number().int(),
        reportsOpen: z.number().int(),
        paymentsFlagged: z.number().int(),
        smsFailed: z.number().int(),
        pushFailed: z.number().int(),
        unmatchedJobs: z.number().int(), // OPEN + zero qualified candidates
        overdueKyc: z.number().int(), // >24 h waiting
    }),
    day: z.object({
        activeJobs: z.number().int(),
        applications: z.number().int(),
        hires: z.number().int(),
        attendanceRateMilli: z.number().int(),
        payoutsRecordedPaise: z.number(),
        newAccounts: z.number().int(),
        otpSmsSent: z.number().int(),
    }),
    generatedAt: z.string().datetime(),
});
// ---------------------------------------------------------------------------
// Users & moderation
// ---------------------------------------------------------------------------
export const adminUsersQuerySchema = pageQuerySchema.extend({
    q: z.string().max(80).optional(), // phone (admin may search raw) / name / id
    role: z.enum(['worker', 'employer', 'admin']).optional(),
    status: z.string().optional(),
    kycStatus: z.string().optional(),
});
export const adminUserDtoSchema = z.object({
    publicId: publicIdSchema,
    phoneMasked: z.string(),
    role: z.string(),
    status: z.string(),
    kycStatus: z.string(),
    displayName: z.string(),
    createdAt: z.string().datetime(),
    sanctions: z.array(z.object({ type: z.string(), reason: z.string(), endsAt: z.string().datetime().nullish(), liftedAt: z.string().datetime().nullish() })),
});
export const sanctionInputSchema = z.object({
    accountPublicId: publicIdSchema,
    type: z.enum(['WARN', 'SUSPEND', 'BAN', 'PAYMENT_HOLD']),
    reason: z.string().min(5).max(255),
    endsAt: z.string().datetime().optional(),
    linkedComplaintPublicId: publicIdSchema.optional(),
});
export const jobModerationSchema = z.object({
    action: z.enum(['HIDE', 'RESTORE']),
    reason: z.string().min(5).max(255),
});
// ---------------------------------------------------------------------------
// Audit & config (admin-only surfaces)
// ---------------------------------------------------------------------------
export const auditQuerySchema = pageQuerySchema.extend({
    entityType: z.string().optional(),
    entityPublicId: publicIdSchema.optional(),
    actorAccountId: publicIdSchema.optional(),
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
});
export const auditEntryDtoSchema = z.object({
    publicId: publicIdSchema,
    at: z.string().datetime(),
    actor: z.object({ publicId: publicIdSchema.nullish(), role: z.string().nullish() }).nullish(),
    action: z.string(),
    entityType: z.string(),
    entityPublicId: z.string(),
    before: z.unknown().nullish(),
    after: z.unknown().nullish(),
    requestId: z.string().nullish(),
});
export const matchWeightsSchema = z.object({
    proximity: z.number().min(0).max(1),
    skill: z.number().min(0).max(1),
    reliability: z.number().min(0).max(1),
    rating: z.number().min(0).max(1),
    recency: z.number().min(0).max(1),
    availability: z.number().min(0).max(1),
    overlap: z.number().min(0).max(1),
}).refine((v) => Math.abs(Object.values(v).reduce((a, b) => a + b, 0) - 1) < 0.001, {
    message: 'Weights must sum to 1 (±0.001) — every change is versioned in match_log',
});
export const platformConfigPatchSchema = z.object({
    key: z.string().min(3).max(60),
    valueJson: z.unknown(),
});
export const adminErrors = [
    'ADMIN_PERMISSION_REQUIRED', 'FORBIDDEN', 'VALIDATION_FAILED', 'NOT_FOUND',
    'STATE_INVALID', 'RATE_LIMITED',
];

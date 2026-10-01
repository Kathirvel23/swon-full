import { z } from 'zod';
import { currencySchema, earningStatusSchema, moneyPaiseSchema, pageQuerySchema, publicIdSchema, } from './common.js';
/**
 * /payments & /earnings — record-only ledger for V1 (§36a #6: no gateway,
 * no platform fees, no TDS/TDS-removal flows; system computes, humans record
 * — mark-paid must reconcile exactly: AMOUNT_MISMATCH, §12.4 P4).
 * Non-module convenience operations (approve/mark-pay) ride /earnings.
 */
export const earningDtoSchema = z.object({
    publicId: publicIdSchema,
    status: earningStatusSchema,
    amountPaise: moneyPaiseSchema,
    adjustmentPaise: z.number().int(),
    adjustmentReason: z.string().nullish(),
    currency: currencySchema,
    job: z.object({
        publicId: publicIdSchema,
        title: z.string(),
        startsOn: z.string(),
        endsOn: z.string(),
    }),
    worker: z.object({
        publicId: publicIdSchema,
        fullName: z.string(),
        photoUrl: z.string().url().nullish(),
    }).optional(), // absent on worker "my earnings" (self)
    attendanceMinutes: z.number().int(),
    approvedAt: z.string().datetime().nullish(),
    paidAt: z.string().datetime().nullish(),
    holdReason: z.string().nullish(),
});
export const myEarningsQuerySchema = pageQuerySchema.extend({
    status: z.string().optional(), // comma-separated
});
export const jobEarningsQuerySchema = pageQuerySchema.extend({
    status: z.string().optional(),
});
// ---------------------------------------------------------------------------
// Employer: approve + mark paid
// ---------------------------------------------------------------------------
export const approveEarningsSchema = z.object({
    earningIds: z.array(publicIdSchema).min(1).max(200),
});
export const markPaidSchema = z.object({
    /** optional subset — default: every APPROVED earning of the job */
    earningIds: z.array(publicIdSchema).min(1).max(200).optional(),
    reference: z.string().min(6).max(64), // UTR / bank ref / "cash" — STATE_MACHINES P4 floor is 6
    paidAt: z.string().datetime().optional(),
    evidenceUploadTicket: z.string().optional(), // receipt/photo presign result
    /** client's total echo — server must match locked amounts or 409 */
    totalPaise: moneyPaiseSchema,
    currency: currencySchema,
    note: z.string().max(255).optional(),
});
export const paymentTransactionDtoSchema = z.object({
    publicId: publicIdSchema,
    status: z.enum(['PROCESSING', 'PAID', 'FAILED']),
    reference: z.string(),
    amountPaise: moneyPaiseSchema,
    currency: currencySchema,
    paidAt: z.string().datetime().nullish(),
    evidenceUrl: z.string().url().nullish(), // presigned, admin/owner only
    earnings: z.array(z.object({ earningId: publicIdSchema, amountPaise: moneyPaiseSchema })),
});
// ---------------------------------------------------------------------------
// Admin oversight (§15 table: hold/release, corrections)
// ---------------------------------------------------------------------------
export const paymentHoldSchema = z.object({
    earningId: publicIdSchema,
    complaintId: publicIdSchema, // required link — every hold traces to a case
    reason: z.string().min(5).max(255),
});
export const paymentReleaseSchema = z.object({
    earningId: publicIdSchema,
    reason: z.string().min(5).max(255),
    restoreStatus: z.enum(['ELIGIBLE', 'APPROVED']),
});
export const payoutQueueQuerySchema = pageQuerySchema.extend({
    jobPublicId: publicIdSchema.optional(),
    workerPublicId: publicIdSchema.optional(),
    status: z.string().optional(),
});
export const paymentErrors = [
    'EARNING_STATE_INVALID', 'AMOUNT_MISMATCH', 'NOT_OWNER', 'NOT_JOB_PARTY', 'NOT_FOUND',
    'IDEMPOTENCY_KEY_REUSED', 'VALIDATION_FAILED', 'FORBIDDEN', 'ADMIN_PERMISSION_REQUIRED',
];

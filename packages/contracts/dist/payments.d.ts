import { z } from 'zod';
/**
 * /payments & /earnings — record-only ledger for V1 (§36a #6: no gateway,
 * no platform fees, no TDS/TDS-removal flows; system computes, humans record
 * — mark-paid must reconcile exactly: AMOUNT_MISMATCH, §12.4 P4).
 * Non-module convenience operations (approve/mark-pay) ride /earnings.
 */
export declare const earningDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    status: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        APPROVED: "APPROVED";
        PENDING: "PENDING";
        ELIGIBLE: "ELIGIBLE";
        PROCESSING: "PROCESSING";
        PAID: "PAID";
        FAILED: "FAILED";
        ON_HOLD: "ON_HOLD";
    }>;
    amountPaise: z.ZodNumber;
    adjustmentPaise: z.ZodNumber;
    adjustmentReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currency: z.ZodLiteral<"INR">;
    job: z.ZodObject<{
        publicId: z.ZodString;
        title: z.ZodString;
        startsOn: z.ZodString;
        endsOn: z.ZodString;
    }, z.core.$strip>;
    worker: z.ZodOptional<z.ZodObject<{
        publicId: z.ZodString;
        fullName: z.ZodString;
        photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    attendanceMinutes: z.ZodNumber;
    approvedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    paidAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    holdReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type EarningDto = z.infer<typeof earningDtoSchema>;
export declare const myEarningsQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const jobEarningsQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const approveEarningsSchema: z.ZodObject<{
    earningIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type ApproveEarnings = z.infer<typeof approveEarningsSchema>;
export declare const markPaidSchema: z.ZodObject<{
    earningIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    reference: z.ZodString;
    paidAt: z.ZodOptional<z.ZodString>;
    evidenceUploadTicket: z.ZodOptional<z.ZodString>;
    totalPaise: z.ZodNumber;
    currency: z.ZodLiteral<"INR">;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type MarkPaid = z.infer<typeof markPaidSchema>;
export declare const paymentTransactionDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    status: z.ZodEnum<{
        PROCESSING: "PROCESSING";
        PAID: "PAID";
        FAILED: "FAILED";
    }>;
    reference: z.ZodString;
    amountPaise: z.ZodNumber;
    currency: z.ZodLiteral<"INR">;
    paidAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    evidenceUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    earnings: z.ZodArray<z.ZodObject<{
        earningId: z.ZodString;
        amountPaise: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PaymentTransactionDto = z.infer<typeof paymentTransactionDtoSchema>;
export declare const paymentHoldSchema: z.ZodObject<{
    earningId: z.ZodString;
    complaintId: z.ZodString;
    reason: z.ZodString;
}, z.core.$strip>;
export declare const paymentReleaseSchema: z.ZodObject<{
    earningId: z.ZodString;
    reason: z.ZodString;
    restoreStatus: z.ZodEnum<{
        APPROVED: "APPROVED";
        ELIGIBLE: "ELIGIBLE";
    }>;
}, z.core.$strip>;
export declare const payoutQueueQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    jobPublicId: z.ZodOptional<z.ZodString>;
    workerPublicId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const paymentErrors: readonly ["EARNING_STATE_INVALID", "AMOUNT_MISMATCH", "NOT_OWNER", "NOT_JOB_PARTY", "NOT_FOUND", "IDEMPOTENCY_KEY_REUSED", "VALIDATION_FAILED", "FORBIDDEN", "ADMIN_PERMISSION_REQUIRED"];
//# sourceMappingURL=payments.d.ts.map
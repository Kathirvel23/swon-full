import { z } from 'zod';
/**
 * Shared primitives — the vocabulary every endpoint contract speaks.
 * Source-of-truth mapping: architecture.md §14 (conventions), §8 (money/time),
 * §24 (envelopes). Server remains authoritative; schemas here reject malformed
 * input BEFORE business logic (§14 validation rule).
 */
/** Success envelope: { data } (list endpoints add meta). */
export declare const dataEnvelope: <T extends z.ZodType>(data: T) => z.ZodObject<{
    data: T;
}, z.core.$strip>;
export declare const errorDetailSchema: z.ZodObject<{
    field: z.ZodOptional<z.ZodString>;
    issue: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ErrorDetail = z.infer<typeof errorDetailSchema>;
export declare const errorEnvelopeSchema: z.ZodObject<{
    error: z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodArray<z.ZodObject<{
            field: z.ZodOptional<z.ZodString>;
            issue: z.ZodString;
            message: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        requestId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type ErrorEnvelope = z.infer<typeof errorEnvelopeSchema>;
/** Cursor pagination (§14): opaque cursor + limit; meta echoes nextCursor. */
export declare const pageQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type PageQuery = z.infer<typeof pageQuerySchema>;
export declare const pageMetaSchema: z.ZodObject<{
    nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hasMore: z.ZodBoolean;
    limit: z.ZodNumber;
}, z.core.$strip>;
export type PageMeta = z.infer<typeof pageMetaSchema>;
export declare const paginated: <T extends z.ZodType>(item: T) => z.ZodObject<{
    data: z.ZodArray<T>;
    meta: z.ZodObject<{
        nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        hasMore: z.ZodBoolean;
        limit: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
/** Required header on side-effecting mutations (§14): apply/hire/check-in/approve/pay/quick-match. */
export declare const idempotencyKeySchema: z.ZodString;
/**
 * External identity — never expose internal bigint ids (§8).
 * cuids are ~25 chars; SEED TAXONOMY ids are descriptive and longer
 * (e.g. cat_leaf_healthcare_support_patient_attendant = 45) — 64 fits all.
 */
export declare const publicIdSchema: z.ZodString;
/** Indian mobile in E.164 (+91XXXXXXXXXX) — OTP login is phone-first (§15). */
export declare const phoneSchema: z.ZodString;
/** Money: integer paise only (§8). ₹150.00 = 15000. */
export declare const moneyPaiseSchema: z.ZodNumber;
export declare const currencySchema: z.ZodLiteral<"INR">;
export declare const latSchema: z.ZodNumber;
export declare const lngSchema: z.ZodNumber;
/** Job schedules are local-date + local-time with explicit tz (§8). */
export declare const isoDateSchema: z.ZodString;
export declare const localTimeSchema: z.ZodString;
export declare const timezoneSchema: z.ZodLiteral<"Asia/Kolkata">;
export declare const accountStatusSchema: z.ZodEnum<{
    PENDING_VERIFICATION: "PENDING_VERIFICATION";
    ACTIVE: "ACTIVE";
    SUSPENDED: "SUSPENDED";
    CLOSED: "CLOSED";
}>;
export declare const roleSchema: z.ZodEnum<{
    worker: "worker";
    employer: "employer";
    admin: "admin";
}>;
export declare const jobStatusSchema: z.ZodEnum<{
    CLOSED: "CLOSED";
    DRAFT: "DRAFT";
    OPEN: "OPEN";
    HIRING: "HIRING";
    FILLED: "FILLED";
    IN_PROGRESS: "IN_PROGRESS";
    COMPLETED: "COMPLETED";
    CANCELLED: "CANCELLED";
    EXPIRED: "EXPIRED";
}>;
export declare const applicationStatusSchema: z.ZodEnum<{
    CANCELLED: "CANCELLED";
    EXPIRED: "EXPIRED";
    APPLIED: "APPLIED";
    SHORTLISTED: "SHORTLISTED";
    WAITLISTED: "WAITLISTED";
    HIRED: "HIRED";
    REJECTED: "REJECTED";
    WITHDRAWN: "WITHDRAWN";
}>;
export declare const attendanceStatusSchema: z.ZodEnum<{
    NOT_STARTED: "NOT_STARTED";
    CHECKED_IN: "CHECKED_IN";
    CHECKED_OUT: "CHECKED_OUT";
    APPROVED: "APPROVED";
    NO_SHOW: "NO_SHOW";
}>;
export declare const earningStatusSchema: z.ZodEnum<{
    CANCELLED: "CANCELLED";
    APPROVED: "APPROVED";
    PENDING: "PENDING";
    ELIGIBLE: "ELIGIBLE";
    PROCESSING: "PROCESSING";
    PAID: "PAID";
    FAILED: "FAILED";
    ON_HOLD: "ON_HOLD";
}>;
export declare const kycStatusSchema: z.ZodEnum<{
    DRAFT: "DRAFT";
    REJECTED: "REJECTED";
    SUBMITTED: "SUBMITTED";
    UNDER_REVIEW: "UNDER_REVIEW";
    VERIFIED: "VERIFIED";
}>;
export declare const complaintStatusSchema: z.ZodEnum<{
    OPEN: "OPEN";
    UNDER_REVIEW: "UNDER_REVIEW";
    WAITING_ON_PARTY: "WAITING_ON_PARTY";
    RESOLVED: "RESOLVED";
    DISMISSED: "DISMISSED";
    CLOSED_TIMEOUT: "CLOSED_TIMEOUT";
}>;
export declare const crewStatusSchema: z.ZodEnum<{
    ACTIVE: "ACTIVE";
    COMPLETED: "COMPLETED";
    NO_SHOW: "NO_SHOW";
    RELEASED: "RELEASED";
}>;
export declare const offerStatusSchema: z.ZodEnum<{
    CANCELLED: "CANCELLED";
    EXPIRED: "EXPIRED";
    PENDING: "PENDING";
    ACCEPTED: "ACCEPTED";
    DECLINED: "DECLINED";
}>;
export declare const payTypeSchema: z.ZodEnum<{
    HOUR: "HOUR";
    DAY: "DAY";
    TOTAL: "TOTAL";
}>;
export declare const bearerHeaderSchema: z.ZodString;
//# sourceMappingURL=common.d.ts.map
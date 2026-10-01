import { z } from 'zod';

/**
 * Shared primitives — the vocabulary every endpoint contract speaks.
 * Source-of-truth mapping: architecture.md §14 (conventions), §8 (money/time),
 * §24 (envelopes). Server remains authoritative; schemas here reject malformed
 * input BEFORE business logic (§14 validation rule).
 */

// ---------------------------------------------------------------------------
// Envelopes & pagination
// ---------------------------------------------------------------------------

/** Success envelope: { data } (list endpoints add meta). */
export const dataEnvelope = <T extends z.ZodType>(data: T) =>
  z.object({ data });

export const errorDetailSchema = z.object({
  field: z.string().optional(),
  issue: z.string(),
  message: z.string().optional(),
});
export type ErrorDetail = z.infer<typeof errorDetailSchema>;

export const errorEnvelopeSchema = z.object({
  error: z.object({
    code: z.string(), // catalog: errors.ts
    message: z.string(),
    details: z.array(errorDetailSchema).optional(),
    requestId: z.string().optional(),
  }),
});
export type ErrorEnvelope = z.infer<typeof errorEnvelopeSchema>;

/** Cursor pagination (§14): opaque cursor + limit; meta echoes nextCursor. */
export const pageQuerySchema = z.object({
  cursor: z.string().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
export type PageQuery = z.infer<typeof pageQuerySchema>;

export const pageMetaSchema = z.object({
  nextCursor: z.string().nullish(),
  hasMore: z.boolean(),
  limit: z.number().int(),
});
export type PageMeta = z.infer<typeof pageMetaSchema>;

export const paginated = <T extends z.ZodType>(item: T) =>
  z.object({
    data: z.array(item),
    meta: pageMetaSchema,
  });

/** Required header on side-effecting mutations (§14): apply/hire/check-in/approve/pay/quick-match. */
export const idempotencyKeySchema = z.string().min(8).max(80);

// ---------------------------------------------------------------------------
// Identifiers, money, phone, location, time
// ---------------------------------------------------------------------------

/**
 * External identity — never expose internal bigint ids (§8).
 * cuids are ~25 chars; SEED TAXONOMY ids are descriptive and longer
 * (e.g. cat_leaf_healthcare_support_patient_attendant = 45) — 64 fits all.
 */
export const publicIdSchema = z.string().min(10).max(64);

/** Indian mobile in E.164 (+91XXXXXXXXXX) — OTP login is phone-first (§15). */
export const phoneSchema = z
  .string()
  .regex(/^\+91[6-9]\d{9}$/, 'Enter a valid Indian mobile number');

/** Money: integer paise only (§8). ₹150.00 = 15000. */
export const moneyPaiseSchema = z
  .number()
  .int()
  .min(0)
  .max(1_000_000_000_00); // sanity cap: ₹10 crore per record

export const currencySchema = z.literal('INR');

export const latSchema = z.number().min(-90).max(90);
export const lngSchema = z.number().min(-180).max(180);

/** Job schedules are local-date + local-time with explicit tz (§8). */
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD');
export const localTimeSchema = z.string().regex(/^\d{2}:\d{2}$/, 'Expected HH:mm');
export const timezoneSchema = z.literal('Asia/Kolkata'); // V1 fixed (§8); loosened if multi-tz ever ships

// ---------------------------------------------------------------------------
// Status unions (mirror Database/STATE_MACHINES.md — server enforces transitions)
// ---------------------------------------------------------------------------

export const accountStatusSchema = z.enum([
  'PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'CLOSED',
]);
export const roleSchema = z.enum(['worker', 'employer', 'admin']);

export const jobStatusSchema = z.enum([
  'DRAFT', 'OPEN', 'HIRING', 'FILLED', 'IN_PROGRESS', 'COMPLETED', 'CLOSED', 'CANCELLED', 'EXPIRED',
]);
export const applicationStatusSchema = z.enum([
  'APPLIED', 'SHORTLISTED', 'WAITLISTED', 'HIRED', 'REJECTED', 'WITHDRAWN', 'CANCELLED', 'EXPIRED',
]);
export const attendanceStatusSchema = z.enum([
  'NOT_STARTED', 'CHECKED_IN', 'CHECKED_OUT', 'APPROVED', 'NO_SHOW',
]);
export const earningStatusSchema = z.enum([
  'PENDING', 'ELIGIBLE', 'APPROVED', 'PROCESSING', 'PAID', 'FAILED', 'ON_HOLD', 'CANCELLED',
]);
export const kycStatusSchema = z.enum(['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED']);
export const complaintStatusSchema = z.enum([
  'OPEN', 'UNDER_REVIEW', 'WAITING_ON_PARTY', 'RESOLVED', 'DISMISSED', 'CLOSED_TIMEOUT',
]);
export const crewStatusSchema = z.enum(['ACTIVE', 'COMPLETED', 'RELEASED', 'NO_SHOW']);
export const offerStatusSchema = z.enum(['PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'CANCELLED']);
export const payTypeSchema = z.enum(['HOUR', 'DAY', 'TOTAL']);

// ---------------------------------------------------------------------------
// Auth headers (§14)
// ---------------------------------------------------------------------------

export const bearerHeaderSchema = z.string().regex(/^Bearer\s+[A-Za-z0-9\-._~+/]+=*$/, 'Malformed Authorization header');

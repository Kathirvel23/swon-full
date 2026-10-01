import { z } from 'zod';
import { attendanceStatusSchema, isoDateSchema, latSchema, lngSchema, publicIdSchema } from './common.js';
/**
 * /attendance — QR check-in/out, employer roster, approvals (§14 row 9, §19).
 * Tokens are server-signed + rotating (≤60 s) + single-use; the payload's
 * authenticity is NEVER trusted from the client — signature checked server-side.
 */
// ---------------------------------------------------------------------------
// Employer: display token (worker scans it with camera/QR)
// ---------------------------------------------------------------------------
export const attendanceTokenDtoSchema = z.object({
    /** opaque signed payload (jobPublicId, workDate, nonce, exp, sig) */
    payload: z.string().min(20),
    expiresSec: z.number().int().positive(),
    /** rotating seconds — client re-fetches on this cadence */
    rotateEverySec: z.number().int().positive(),
    jobPublicId: publicIdSchema,
    workDate: isoDateSchema,
});
// ---------------------------------------------------------------------------
// Worker (or employer manual): check action
// ---------------------------------------------------------------------------
export const attendanceCheckSchema = z.object({
    payload: z.string().min(20), // scanned QR payload (or manual marker)
    action: z.enum(['IN', 'OUT']),
    lat: latSchema.optional(),
    lng: lngSchema.optional(),
    /** manual mode (employer roster tap) — no payload */
    workerPublicId: publicIdSchema.optional(),
    workDate: isoDateSchema.optional(),
    reason: z.string().max(255).optional(), // required for manual correction paths
});
export const attendanceRecordDtoSchema = z.object({
    publicId: publicIdSchema,
    status: attendanceStatusSchema,
    workDate: isoDateSchema,
    checkInAt: z.string().datetime().nullish(),
    checkOutAt: z.string().datetime().nullish(),
    checkSource: z.enum(['SCAN', 'EMPLOYER', 'CORRECTED']).nullish(),
    durationMinutes: z.number().int().nullish(),
    worker: z.object({
        publicId: publicIdSchema,
        fullName: z.string(),
        photoUrl: z.string().url().nullish(),
    }),
    jobPublicId: publicIdSchema,
    correctionReason: z.string().nullish(),
});
// ---------------------------------------------------------------------------
// Employer roster + approvals
// ---------------------------------------------------------------------------
export const jobAttendanceQuerySchema = z.object({
    date: isoDateSchema.optional(), // default: job's current work day
});
export const rosterRowSchema = z.object({
    worker: z.object({
        publicId: publicIdSchema,
        fullName: z.string(),
        photoUrl: z.string().url().nullish(),
        crewStatus: z.enum(['ACTIVE', 'COMPLETED', 'RELEASED', 'NO_SHOW']),
    }),
    attendance: attendanceRecordDtoSchema.omit({ worker: true, jobPublicId: true }).nullable(),
    earningStatus: z.string(),
});
export const approveAttendanceSchema = z.object({
    recordIds: z.array(publicIdSchema).min(1).max(200), // bulk ok (§14)
});
export const correctAttendanceSchema = z.object({
    status: attendanceStatusSchema.optional(),
    checkInAt: z.string().datetime().optional(),
    checkOutAt: z.string().datetime().optional(),
    reason: z.string().min(5).max(255), // mandatory (M3-T5/T6)
});
export const attendanceErrors = [
    'ATTENDANCE_TOKEN_INVALID', 'ATTENDANCE_TOKEN_EXPIRED', 'ATTENDANCE_DUPLICATE',
    'ATTENDANCE_WINDOW_CLOSED', 'CREW_DOUBLE_JOB', 'STATE_INVALID', 'NOT_OWNER',
    'FORBIDDEN', 'NOT_FOUND',
];

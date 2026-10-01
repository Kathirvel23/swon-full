import { z } from 'zod';
import { complaintStatusSchema, pageQuerySchema, publicIdSchema } from './common.js';
/**
 * /complaints — worker/employer cases + admin queue (§14 row 16, M7 machine).
 * 0..1 linked entity (job/application/earning/attendance/account); status moves
 * only in the documented transitions; admin resolution is append-logged.
 */
export const COMPLAINT_TYPES = ['PAYMENT', 'SAFETY', 'HARASSMENT', 'NO_SHOW', 'FRAUD', 'OTHER'];
export const complaintTypeSchema = z.enum(COMPLAINT_TYPES);
export const COMPLAINT_LINK_TYPES = ['JOB', 'APPLICATION', 'EARNING', 'ATTENDANCE', 'ACCOUNT'];
export const complaintCreateSchema = z.object({
    type: complaintTypeSchema,
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    linkType: z.enum(COMPLAINT_LINK_TYPES).optional(),
    linkPublicId: publicIdSchema.optional(),
    narrative: z.string().min(20).max(4000), // explain-then-submit (§25 principle)
    evidenceUploadTickets: z.array(z.string()).max(5).optional(),
}).refine((v) => (v.linkType && v.linkPublicId) || (!v.linkType && !v.linkPublicId), {
    message: 'linkType and linkPublicId must be provided together',
    path: ['linkPublicId'],
});
export const complaintEventDtoSchema = z.object({
    publicId: publicIdSchema,
    kind: z.enum(['NOTE', 'PARTY_REPLY', 'STATUS_CHANGE', 'EVIDENCE']),
    body: z.string().nullish(),
    actor: z.object({
        publicId: publicIdSchema,
        role: z.enum(['WORKER', 'EMPLOYER', 'ADMIN']),
        displayName: z.string(),
    }),
    evidenceUrl: z.string().url().nullish(), // presigned, scoped to case parties
    createdAt: z.string().datetime(),
});
export const complaintDtoSchema = z.object({
    publicId: publicIdSchema,
    type: complaintTypeSchema,
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    status: complaintStatusSchema,
    link: z.object({ type: z.enum(COMPLAINT_LINK_TYPES), publicId: publicIdSchema }).nullish(),
    narrative: z.string(),
    resolutionNote: z.string().nullish(),
    resolvedAt: z.string().datetime().nullish(),
    events: z.array(complaintEventDtoSchema),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export const myComplaintsQuerySchema = pageQuerySchema.extend({
    status: complaintStatusSchema.optional(),
});
export const complaintReplySchema = z.object({
    body: z.string().min(2).max(2000),
    evidenceUploadTickets: z.array(z.string()).max(3).optional(),
});
// Admin (case work)
export const adminComplaintsQuerySchema = pageQuerySchema.extend({
    status: complaintStatusSchema.optional(),
    type: complaintTypeSchema.optional(),
    severity: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    sort: z.enum(['CREATED_AT', 'SEVERITY']).default('SEVERITY'),
});
export const complaintStatusUpdateSchema = z.object({
    status: z.enum(['UNDER_REVIEW', 'WAITING_ON_PARTY', 'RESOLVED', 'DISMISSED', 'CLOSED_TIMEOUT']),
    note: z.string().min(5).max(4000),
    /** RESOLVED may attach an administrative remedy */
    sanction: z
        .object({ type: z.enum(['WARN', 'SUSPEND', 'BAN', 'PAYMENT_HOLD']), reason: z.string().min(5), accountPublicId: publicIdSchema })
        .optional(),
});
export const complaintErrors = [
    'VALIDATION_FAILED', 'STATE_INVALID', 'NOT_JOB_PARTY', 'NOT_FOUND', 'FORBIDDEN',
    'ADMIN_PERMISSION_REQUIRED', 'FILE_TOO_LARGE',
];

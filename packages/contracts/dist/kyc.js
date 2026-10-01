import { z } from 'zod';
import { isoDateSchema, kycStatusSchema, pageQuerySchema, publicIdSchema } from './common.js';
/**
 * /kyc (+ /admin/kyc) — verification lifecycle (§14 row 5, M5 machine).
 * Documents live in private storage: the API hands out presigned access and
 * logs every document view (§20 / document_access_log).
 */
export const KYC_ID_TYPES = ['PAN', 'VOTER', 'DRIVING', 'PASSPORT']; // Aadhaar deferred (R2)
export const kycIdTypeSchema = z.enum(KYC_ID_TYPES);
export const kycSubmitInputSchema = z.object({
    idType: kycIdTypeSchema,
    /** last 4 visible chars only in responses; full value encrypted server-side */
    idNumber: z.string().min(4).max(20),
    consentAccepted: z.literal(true), // versioned text snapshot stored (DPDP)
    consentVersion: z.string().min(3).max(20),
});
export const kycDocumentMetaSchema = z.object({
    publicId: publicIdSchema,
    docType: z.enum(['ID_FRONT', 'ID_BACK', 'SELFIE', 'ADDRESS_PROOF']),
    uploadedAt: z.string().datetime(),
    sizeBytes: z.number().int(),
    mime: z.string(),
});
/** Presign response — upload goes directly to private storage (§2.3). */
export const uploadTicketSchema = z.object({
    uploadUrl: z.string().url(), // presigned PUT, minutes to live
    headers: z.record(z.string(), z.string()).optional(),
    documentId: publicIdSchema,
    maxBytes: z.number().int(),
    expiresSec: z.number().int(),
});
export const kycSubmissionDtoSchema = z.object({
    publicId: publicIdSchema,
    status: kycStatusSchema,
    idType: kycIdTypeSchema,
    idNumberMasked: z.string(), // e.g. ABCDE1234F → "XXXXX1234F"
    attempts: z.number().int(),
    maxAttempts: z.number().int(),
    rejectionReason: z.string().nullish(),
    documents: z.array(kycDocumentMetaSchema),
    submittedAt: z.string().datetime().nullish(),
    decidedAt: z.string().datetime().nullish(),
    createdAt: z.string().datetime(),
});
// ---------------------------------------------------------------------------
// Admin: queue + decide (§14 /admin)
// ---------------------------------------------------------------------------
export const kycQueueQuerySchema = pageQuerySchema.extend({
    status: z.enum(['SUBMITTED', 'UNDER_REVIEW', 'REJECTED']).optional(),
    q: z.string().max(80).optional(), // name / masked id
});
export const kycQueueItemSchema = z.object({
    submission: kycSubmissionDtoSchema,
    account: z.object({
        publicId: publicIdSchema,
        phoneMasked: z.string(),
        role: z.string(),
        createdAt: z.string().datetime(),
    }),
    applicantName: z.string(),
    waitingHours: z.number().int(),
});
export const kycDecideSchema = z.object({
    decision: z.enum(['VERIFIED', 'REJECTED']),
    reason: z.string().max(255).optional(), // required when REJECTED
    idNumberMatched: z.boolean(), // admin attestation after viewing docs
}).refine((v) => v.decision !== 'REJECTED' || (v.reason && v.reason.length >= 5), {
    message: 'Rejection reason (≥5 chars) is required',
    path: ['reason'],
});
export const kycErrors = [
    'KYC_SUBMISSION_ACTIVE', 'KYC_ATTEMPT_CAP', 'VALIDATION_FAILED', 'DOCUMENT_REQUIRED',
    'FILE_TOO_LARGE', 'FILE_TYPE_NOT_ALLOWED', 'FORBIDDEN', 'ADMIN_PERMISSION_REQUIRED', 'NOT_FOUND',
];
// ---------------------------------------------------------------------------
// Consent copy (DPDP): shown verbatim before submit; the exact accepted text is
// snapshotted per submission (kyc_consent.text_snapshot). Owner approves the
// wording once — changing wording = bump the version.
// ---------------------------------------------------------------------------
export const KYC_CONSENT_VERSION = '2026-09-v1';
export const KYC_CONSENT_TEXT = 'I consent to WorkBridge collecting, storing and using my identity details and documents ' +
    'solely for identity verification, fraud prevention and platform safety. My documents are ' +
    'stored encrypted, are viewable only by authorized reviewers (every view is logged), and are ' +
    'never shown to other users. I may request deletion of my data through platform support, ' +
    'subject to any record-keeping the law requires.';
/** GET /kyc — active submission (or none yet). */
export const kycActiveOutputSchema = z.object({ submission: kycSubmissionDtoSchema.nullable() });
/** POST /kyc/documents/upload-ticket — which document are we requesting a slot for. */
export const kycUploadTicketInputSchema = z.object({
    docType: z.enum(['ID_FRONT', 'ID_BACK', 'SELFIE', 'ADDRESS_PROOF']),
});
/** POST /admin/kyc/{id}/decision — outcome + resulting account KYC status. */
export const kycDecisionOutputSchema = z.object({
    submission: kycSubmissionDtoSchema,
    accountKycStatus: z.string(),
});

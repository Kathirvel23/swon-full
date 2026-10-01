import { z } from 'zod';
/**
 * /kyc (+ /admin/kyc) — verification lifecycle (§14 row 5, M5 machine).
 * Documents live in private storage: the API hands out presigned access and
 * logs every document view (§20 / document_access_log).
 */
export declare const KYC_ID_TYPES: readonly ["PAN", "VOTER", "DRIVING", "PASSPORT"];
export declare const kycIdTypeSchema: z.ZodEnum<{
    PAN: "PAN";
    VOTER: "VOTER";
    DRIVING: "DRIVING";
    PASSPORT: "PASSPORT";
}>;
export declare const kycSubmitInputSchema: z.ZodObject<{
    idType: z.ZodEnum<{
        PAN: "PAN";
        VOTER: "VOTER";
        DRIVING: "DRIVING";
        PASSPORT: "PASSPORT";
    }>;
    idNumber: z.ZodString;
    consentAccepted: z.ZodLiteral<true>;
    consentVersion: z.ZodString;
}, z.core.$strip>;
export type KycSubmitInput = z.infer<typeof kycSubmitInputSchema>;
export declare const kycDocumentMetaSchema: z.ZodObject<{
    publicId: z.ZodString;
    docType: z.ZodEnum<{
        ID_FRONT: "ID_FRONT";
        ID_BACK: "ID_BACK";
        SELFIE: "SELFIE";
        ADDRESS_PROOF: "ADDRESS_PROOF";
    }>;
    uploadedAt: z.ZodString;
    sizeBytes: z.ZodNumber;
    mime: z.ZodString;
}, z.core.$strip>;
/** Presign response — upload goes directly to private storage (§2.3). */
export declare const uploadTicketSchema: z.ZodObject<{
    uploadUrl: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    documentId: z.ZodString;
    maxBytes: z.ZodNumber;
    expiresSec: z.ZodNumber;
}, z.core.$strip>;
export type UploadTicket = z.infer<typeof uploadTicketSchema>;
export declare const kycSubmissionDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    status: z.ZodEnum<{
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        VERIFIED: "VERIFIED";
    }>;
    idType: z.ZodEnum<{
        PAN: "PAN";
        VOTER: "VOTER";
        DRIVING: "DRIVING";
        PASSPORT: "PASSPORT";
    }>;
    idNumberMasked: z.ZodString;
    attempts: z.ZodNumber;
    maxAttempts: z.ZodNumber;
    rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    documents: z.ZodArray<z.ZodObject<{
        publicId: z.ZodString;
        docType: z.ZodEnum<{
            ID_FRONT: "ID_FRONT";
            ID_BACK: "ID_BACK";
            SELFIE: "SELFIE";
            ADDRESS_PROOF: "ADDRESS_PROOF";
        }>;
        uploadedAt: z.ZodString;
        sizeBytes: z.ZodNumber;
        mime: z.ZodString;
    }, z.core.$strip>>;
    submittedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type KycSubmissionDto = z.infer<typeof kycSubmissionDtoSchema>;
export declare const kycQueueQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        REJECTED: "REJECTED";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
    }>>;
    q: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const kycQueueItemSchema: z.ZodObject<{
    submission: z.ZodObject<{
        publicId: z.ZodString;
        status: z.ZodEnum<{
            DRAFT: "DRAFT";
            REJECTED: "REJECTED";
            SUBMITTED: "SUBMITTED";
            UNDER_REVIEW: "UNDER_REVIEW";
            VERIFIED: "VERIFIED";
        }>;
        idType: z.ZodEnum<{
            PAN: "PAN";
            VOTER: "VOTER";
            DRIVING: "DRIVING";
            PASSPORT: "PASSPORT";
        }>;
        idNumberMasked: z.ZodString;
        attempts: z.ZodNumber;
        maxAttempts: z.ZodNumber;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        documents: z.ZodArray<z.ZodObject<{
            publicId: z.ZodString;
            docType: z.ZodEnum<{
                ID_FRONT: "ID_FRONT";
                ID_BACK: "ID_BACK";
                SELFIE: "SELFIE";
                ADDRESS_PROOF: "ADDRESS_PROOF";
            }>;
            uploadedAt: z.ZodString;
            sizeBytes: z.ZodNumber;
            mime: z.ZodString;
        }, z.core.$strip>>;
        submittedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
    }, z.core.$strip>;
    account: z.ZodObject<{
        publicId: z.ZodString;
        phoneMasked: z.ZodString;
        role: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$strip>;
    applicantName: z.ZodString;
    waitingHours: z.ZodNumber;
}, z.core.$strip>;
export type KycQueueItem = z.infer<typeof kycQueueItemSchema>;
export declare const kycDecideSchema: z.ZodObject<{
    decision: z.ZodEnum<{
        REJECTED: "REJECTED";
        VERIFIED: "VERIFIED";
    }>;
    reason: z.ZodOptional<z.ZodString>;
    idNumberMatched: z.ZodBoolean;
}, z.core.$strip>;
export type KycDecide = z.infer<typeof kycDecideSchema>;
export declare const kycErrors: readonly ["KYC_SUBMISSION_ACTIVE", "KYC_ATTEMPT_CAP", "VALIDATION_FAILED", "DOCUMENT_REQUIRED", "FILE_TOO_LARGE", "FILE_TYPE_NOT_ALLOWED", "FORBIDDEN", "ADMIN_PERMISSION_REQUIRED", "NOT_FOUND"];
export declare const KYC_CONSENT_VERSION = "2026-09-v1";
export declare const KYC_CONSENT_TEXT: string;
/** GET /kyc — active submission (or none yet). */
export declare const kycActiveOutputSchema: z.ZodObject<{
    submission: z.ZodNullable<z.ZodObject<{
        publicId: z.ZodString;
        status: z.ZodEnum<{
            DRAFT: "DRAFT";
            REJECTED: "REJECTED";
            SUBMITTED: "SUBMITTED";
            UNDER_REVIEW: "UNDER_REVIEW";
            VERIFIED: "VERIFIED";
        }>;
        idType: z.ZodEnum<{
            PAN: "PAN";
            VOTER: "VOTER";
            DRIVING: "DRIVING";
            PASSPORT: "PASSPORT";
        }>;
        idNumberMasked: z.ZodString;
        attempts: z.ZodNumber;
        maxAttempts: z.ZodNumber;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        documents: z.ZodArray<z.ZodObject<{
            publicId: z.ZodString;
            docType: z.ZodEnum<{
                ID_FRONT: "ID_FRONT";
                ID_BACK: "ID_BACK";
                SELFIE: "SELFIE";
                ADDRESS_PROOF: "ADDRESS_PROOF";
            }>;
            uploadedAt: z.ZodString;
            sizeBytes: z.ZodNumber;
            mime: z.ZodString;
        }, z.core.$strip>>;
        submittedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type KycActiveOutput = z.infer<typeof kycActiveOutputSchema>;
/** POST /kyc/documents/upload-ticket — which document are we requesting a slot for. */
export declare const kycUploadTicketInputSchema: z.ZodObject<{
    docType: z.ZodEnum<{
        ID_FRONT: "ID_FRONT";
        ID_BACK: "ID_BACK";
        SELFIE: "SELFIE";
        ADDRESS_PROOF: "ADDRESS_PROOF";
    }>;
}, z.core.$strip>;
export type KycUploadTicketInput = z.infer<typeof kycUploadTicketInputSchema>;
/** POST /admin/kyc/{id}/decision — outcome + resulting account KYC status. */
export declare const kycDecisionOutputSchema: z.ZodObject<{
    submission: z.ZodObject<{
        publicId: z.ZodString;
        status: z.ZodEnum<{
            DRAFT: "DRAFT";
            REJECTED: "REJECTED";
            SUBMITTED: "SUBMITTED";
            UNDER_REVIEW: "UNDER_REVIEW";
            VERIFIED: "VERIFIED";
        }>;
        idType: z.ZodEnum<{
            PAN: "PAN";
            VOTER: "VOTER";
            DRIVING: "DRIVING";
            PASSPORT: "PASSPORT";
        }>;
        idNumberMasked: z.ZodString;
        attempts: z.ZodNumber;
        maxAttempts: z.ZodNumber;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        documents: z.ZodArray<z.ZodObject<{
            publicId: z.ZodString;
            docType: z.ZodEnum<{
                ID_FRONT: "ID_FRONT";
                ID_BACK: "ID_BACK";
                SELFIE: "SELFIE";
                ADDRESS_PROOF: "ADDRESS_PROOF";
            }>;
            uploadedAt: z.ZodString;
            sizeBytes: z.ZodNumber;
            mime: z.ZodString;
        }, z.core.$strip>>;
        submittedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        decidedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
    }, z.core.$strip>;
    accountKycStatus: z.ZodString;
}, z.core.$strip>;
export type KycDecisionOutput = z.infer<typeof kycDecisionOutputSchema>;
//# sourceMappingURL=kyc.d.ts.map
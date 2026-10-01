import { z } from 'zod';
/**
 * /complaints — worker/employer cases + admin queue (§14 row 16, M7 machine).
 * 0..1 linked entity (job/application/earning/attendance/account); status moves
 * only in the documented transitions; admin resolution is append-logged.
 */
export declare const COMPLAINT_TYPES: readonly ["PAYMENT", "SAFETY", "HARASSMENT", "NO_SHOW", "FRAUD", "OTHER"];
export declare const complaintTypeSchema: z.ZodEnum<{
    NO_SHOW: "NO_SHOW";
    PAYMENT: "PAYMENT";
    SAFETY: "SAFETY";
    HARASSMENT: "HARASSMENT";
    FRAUD: "FRAUD";
    OTHER: "OTHER";
}>;
export declare const COMPLAINT_LINK_TYPES: readonly ["JOB", "APPLICATION", "EARNING", "ATTENDANCE", "ACCOUNT"];
export declare const complaintCreateSchema: z.ZodObject<{
    type: z.ZodEnum<{
        NO_SHOW: "NO_SHOW";
        PAYMENT: "PAYMENT";
        SAFETY: "SAFETY";
        HARASSMENT: "HARASSMENT";
        FRAUD: "FRAUD";
        OTHER: "OTHER";
    }>;
    severity: z.ZodDefault<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>>;
    linkType: z.ZodOptional<z.ZodEnum<{
        JOB: "JOB";
        APPLICATION: "APPLICATION";
        EARNING: "EARNING";
        ATTENDANCE: "ATTENDANCE";
        ACCOUNT: "ACCOUNT";
    }>>;
    linkPublicId: z.ZodOptional<z.ZodString>;
    narrative: z.ZodString;
    evidenceUploadTickets: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type ComplaintCreate = z.infer<typeof complaintCreateSchema>;
export declare const complaintEventDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    kind: z.ZodEnum<{
        NOTE: "NOTE";
        PARTY_REPLY: "PARTY_REPLY";
        STATUS_CHANGE: "STATUS_CHANGE";
        EVIDENCE: "EVIDENCE";
    }>;
    body: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    actor: z.ZodObject<{
        publicId: z.ZodString;
        role: z.ZodEnum<{
            EMPLOYER: "EMPLOYER";
            WORKER: "WORKER";
            ADMIN: "ADMIN";
        }>;
        displayName: z.ZodString;
    }, z.core.$strip>;
    evidenceUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export declare const complaintDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    type: z.ZodEnum<{
        NO_SHOW: "NO_SHOW";
        PAYMENT: "PAYMENT";
        SAFETY: "SAFETY";
        HARASSMENT: "HARASSMENT";
        FRAUD: "FRAUD";
        OTHER: "OTHER";
    }>;
    severity: z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>;
    status: z.ZodEnum<{
        OPEN: "OPEN";
        UNDER_REVIEW: "UNDER_REVIEW";
        WAITING_ON_PARTY: "WAITING_ON_PARTY";
        RESOLVED: "RESOLVED";
        DISMISSED: "DISMISSED";
        CLOSED_TIMEOUT: "CLOSED_TIMEOUT";
    }>;
    link: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        type: z.ZodEnum<{
            JOB: "JOB";
            APPLICATION: "APPLICATION";
            EARNING: "EARNING";
            ATTENDANCE: "ATTENDANCE";
            ACCOUNT: "ACCOUNT";
        }>;
        publicId: z.ZodString;
    }, z.core.$strip>>>;
    narrative: z.ZodString;
    resolutionNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolvedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    events: z.ZodArray<z.ZodObject<{
        publicId: z.ZodString;
        kind: z.ZodEnum<{
            NOTE: "NOTE";
            PARTY_REPLY: "PARTY_REPLY";
            STATUS_CHANGE: "STATUS_CHANGE";
            EVIDENCE: "EVIDENCE";
        }>;
        body: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        actor: z.ZodObject<{
            publicId: z.ZodString;
            role: z.ZodEnum<{
                EMPLOYER: "EMPLOYER";
                WORKER: "WORKER";
                ADMIN: "ADMIN";
            }>;
            displayName: z.ZodString;
        }, z.core.$strip>;
        evidenceUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type ComplaintDto = z.infer<typeof complaintDtoSchema>;
export declare const myComplaintsQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        OPEN: "OPEN";
        UNDER_REVIEW: "UNDER_REVIEW";
        WAITING_ON_PARTY: "WAITING_ON_PARTY";
        RESOLVED: "RESOLVED";
        DISMISSED: "DISMISSED";
        CLOSED_TIMEOUT: "CLOSED_TIMEOUT";
    }>>;
}, z.core.$strip>;
export declare const complaintReplySchema: z.ZodObject<{
    body: z.ZodString;
    evidenceUploadTickets: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const adminComplaintsQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        OPEN: "OPEN";
        UNDER_REVIEW: "UNDER_REVIEW";
        WAITING_ON_PARTY: "WAITING_ON_PARTY";
        RESOLVED: "RESOLVED";
        DISMISSED: "DISMISSED";
        CLOSED_TIMEOUT: "CLOSED_TIMEOUT";
    }>>;
    type: z.ZodOptional<z.ZodEnum<{
        NO_SHOW: "NO_SHOW";
        PAYMENT: "PAYMENT";
        SAFETY: "SAFETY";
        HARASSMENT: "HARASSMENT";
        FRAUD: "FRAUD";
        OTHER: "OTHER";
    }>>;
    severity: z.ZodOptional<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
    }>>;
    sort: z.ZodDefault<z.ZodEnum<{
        CREATED_AT: "CREATED_AT";
        SEVERITY: "SEVERITY";
    }>>;
}, z.core.$strip>;
export declare const complaintStatusUpdateSchema: z.ZodObject<{
    status: z.ZodEnum<{
        UNDER_REVIEW: "UNDER_REVIEW";
        WAITING_ON_PARTY: "WAITING_ON_PARTY";
        RESOLVED: "RESOLVED";
        DISMISSED: "DISMISSED";
        CLOSED_TIMEOUT: "CLOSED_TIMEOUT";
    }>;
    note: z.ZodString;
    sanction: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<{
            WARN: "WARN";
            SUSPEND: "SUSPEND";
            BAN: "BAN";
            PAYMENT_HOLD: "PAYMENT_HOLD";
        }>;
        reason: z.ZodString;
        accountPublicId: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ComplaintStatusUpdate = z.infer<typeof complaintStatusUpdateSchema>;
export declare const complaintErrors: readonly ["VALIDATION_FAILED", "STATE_INVALID", "NOT_JOB_PARTY", "NOT_FOUND", "FORBIDDEN", "ADMIN_PERMISSION_REQUIRED", "FILE_TOO_LARGE"];
//# sourceMappingURL=complaints.d.ts.map
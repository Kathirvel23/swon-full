import { z } from 'zod';
/**
 * /admin — separate React admin app calls these (§36a #5); RBAC is a
 * permission TABLE, not an if-chain (§15), and every bulk endpoint
 * authorizes per row. Dashboards & export shape: architecture §14 row 16.
 */
export declare const adminMetricsSchema: z.ZodObject<{
    queues: z.ZodObject<{
        kycWaiting: z.ZodNumber;
        complaintsOpen: z.ZodNumber;
        reportsOpen: z.ZodNumber;
        paymentsFlagged: z.ZodNumber;
        smsFailed: z.ZodNumber;
        pushFailed: z.ZodNumber;
        unmatchedJobs: z.ZodNumber;
        overdueKyc: z.ZodNumber;
    }, z.core.$strip>;
    day: z.ZodObject<{
        activeJobs: z.ZodNumber;
        applications: z.ZodNumber;
        hires: z.ZodNumber;
        attendanceRateMilli: z.ZodNumber;
        payoutsRecordedPaise: z.ZodNumber;
        newAccounts: z.ZodNumber;
        otpSmsSent: z.ZodNumber;
    }, z.core.$strip>;
    generatedAt: z.ZodString;
}, z.core.$strip>;
export type AdminMetrics = z.infer<typeof adminMetricsSchema>;
export declare const adminUsersQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    q: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        worker: "worker";
        employer: "employer";
        admin: "admin";
    }>>;
    status: z.ZodOptional<z.ZodString>;
    kycStatus: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const adminUserDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    phoneMasked: z.ZodString;
    role: z.ZodString;
    status: z.ZodString;
    kycStatus: z.ZodString;
    displayName: z.ZodString;
    createdAt: z.ZodString;
    sanctions: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        reason: z.ZodString;
        endsAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        liftedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const sanctionInputSchema: z.ZodObject<{
    accountPublicId: z.ZodString;
    type: z.ZodEnum<{
        WARN: "WARN";
        SUSPEND: "SUSPEND";
        BAN: "BAN";
        PAYMENT_HOLD: "PAYMENT_HOLD";
    }>;
    reason: z.ZodString;
    endsAt: z.ZodOptional<z.ZodString>;
    linkedComplaintPublicId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SanctionInput = z.infer<typeof sanctionInputSchema>;
export declare const jobModerationSchema: z.ZodObject<{
    action: z.ZodEnum<{
        HIDE: "HIDE";
        RESTORE: "RESTORE";
    }>;
    reason: z.ZodString;
}, z.core.$strip>;
export declare const auditQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    entityType: z.ZodOptional<z.ZodString>;
    entityPublicId: z.ZodOptional<z.ZodString>;
    actorAccountId: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const auditEntryDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    at: z.ZodString;
    actor: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        publicId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        role: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
    action: z.ZodString;
    entityType: z.ZodString;
    entityPublicId: z.ZodString;
    before: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    after: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    requestId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const matchWeightsSchema: z.ZodObject<{
    proximity: z.ZodNumber;
    skill: z.ZodNumber;
    reliability: z.ZodNumber;
    rating: z.ZodNumber;
    recency: z.ZodNumber;
    availability: z.ZodNumber;
    overlap: z.ZodNumber;
}, z.core.$strip>;
export type MatchWeights = z.infer<typeof matchWeightsSchema>;
export declare const platformConfigPatchSchema: z.ZodObject<{
    key: z.ZodString;
    valueJson: z.ZodUnknown;
}, z.core.$strip>;
export declare const adminErrors: readonly ["ADMIN_PERMISSION_REQUIRED", "FORBIDDEN", "VALIDATION_FAILED", "NOT_FOUND", "STATE_INVALID", "RATE_LIMITED"];
//# sourceMappingURL=admin.d.ts.map
import { z } from 'zod';
/**
 * /auth — sessions, OTP, tokens (architecture §14 row 1, §15 token model).
 * Phone-first, no passwords. Access ~15 min; refresh ~30 d, rotates on use;
 * replay of a rotated refresh revokes the whole family (REFRESH_TOKEN_REUSED).
 */
export declare const otpRequestInputSchema: z.ZodObject<{
    phone: z.ZodString;
}, z.core.$strip>;
export type OtpRequestInput = z.infer<typeof otpRequestInputSchema>;
export declare const otpRequestOutputSchema: z.ZodObject<{
    challengeId: z.ZodString;
    cooldownSec: z.ZodNumber;
    expiresSec: z.ZodNumber;
    devCode: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type OtpRequestOutput = z.infer<typeof otpRequestOutputSchema>;
export declare const otpVerifyInputSchema: z.ZodObject<{
    challengeId: z.ZodString;
    code: z.ZodString;
}, z.core.$strip>;
export type OtpVerifyInput = z.infer<typeof otpVerifyInputSchema>;
export declare const tokenPairSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    tokenType: z.ZodLiteral<"Bearer">;
    expiresInSec: z.ZodNumber;
}, z.core.$strip>;
export declare const accountSummarySchema: z.ZodObject<{
    publicId: z.ZodString;
    role: z.ZodNullable<z.ZodEnum<{
        worker: "worker";
        employer: "employer";
        admin: "admin";
    }>>;
    status: z.ZodEnum<{
        PENDING_VERIFICATION: "PENDING_VERIFICATION";
        ACTIVE: "ACTIVE";
        SUSPENDED: "SUSPENDED";
        CLOSED: "CLOSED";
    }>;
    phoneMasked: z.ZodString;
    isNewAccount: z.ZodBoolean;
    profileCompletePct: z.ZodNumber;
    kycStatus: z.ZodEnum<{
        DRAFT: "DRAFT";
        REJECTED: "REJECTED";
        SUBMITTED: "SUBMITTED";
        UNDER_REVIEW: "UNDER_REVIEW";
        VERIFIED: "VERIFIED";
        NONE: "NONE";
    }>;
}, z.core.$strip>;
export type AccountSummary = z.infer<typeof accountSummarySchema>;
export declare const otpVerifyOutputSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    tokenType: z.ZodLiteral<"Bearer">;
    expiresInSec: z.ZodNumber;
    account: z.ZodObject<{
        publicId: z.ZodString;
        role: z.ZodNullable<z.ZodEnum<{
            worker: "worker";
            employer: "employer";
            admin: "admin";
        }>>;
        status: z.ZodEnum<{
            PENDING_VERIFICATION: "PENDING_VERIFICATION";
            ACTIVE: "ACTIVE";
            SUSPENDED: "SUSPENDED";
            CLOSED: "CLOSED";
        }>;
        phoneMasked: z.ZodString;
        isNewAccount: z.ZodBoolean;
        profileCompletePct: z.ZodNumber;
        kycStatus: z.ZodEnum<{
            DRAFT: "DRAFT";
            REJECTED: "REJECTED";
            SUBMITTED: "SUBMITTED";
            UNDER_REVIEW: "UNDER_REVIEW";
            VERIFIED: "VERIFIED";
            NONE: "NONE";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type OtpVerifyOutput = z.infer<typeof otpVerifyOutputSchema>;
export declare const refreshInputSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
export type RefreshInput = z.infer<typeof refreshInputSchema>;
export declare const refreshOutputSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    tokenType: z.ZodLiteral<"Bearer">;
    expiresInSec: z.ZodNumber;
    rotated: z.ZodLiteral<true>;
}, z.core.$strip>;
export type RefreshOutput = z.infer<typeof refreshOutputSchema>;
export declare const logoutInputSchema: z.ZodObject<{
    refreshToken: z.ZodOptional<z.ZodString>;
    allDevices: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const sessionDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    userAgent: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    issuedAt: z.ZodString;
    lastUsedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    current: z.ZodBoolean;
}, z.core.$strip>;
export type SessionDto = z.infer<typeof sessionDtoSchema>;
export declare const otpRequestErrors: readonly ["OTP_COOLDOWN", "RATE_LIMITED", "SMS_QUOTA_EXCEEDED", "VALIDATION_FAILED"];
export declare const otpVerifyErrors: readonly ["OTP_INVALID", "OTP_EXPIRED", "OTP_MAX_ATTEMPTS", "NOT_FOUND"];
export declare const refreshErrors: readonly ["TOKEN_INVALID", "REFRESH_TOKEN_REUSED", "ACCOUNT_SUSPENDED", "ACCOUNT_CLOSED"];
//# sourceMappingURL=auth.d.ts.map
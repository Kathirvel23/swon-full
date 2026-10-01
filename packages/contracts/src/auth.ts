import { z } from 'zod';

import { accountStatusSchema, phoneSchema, publicIdSchema, roleSchema } from './common.js';

/**
 * /auth — sessions, OTP, tokens (architecture §14 row 1, §15 token model).
 * Phone-first, no passwords. Access ~15 min; refresh ~30 d, rotates on use;
 * replay of a rotated refresh revokes the whole family (REFRESH_TOKEN_REUSED).
 */

export const otpRequestInputSchema = z.object({
  phone: phoneSchema,
});
export type OtpRequestInput = z.infer<typeof otpRequestInputSchema>;

export const otpRequestOutputSchema = z.object({
  challengeId: publicIdSchema,
  /** seconds until the next legal request (cooldown) */
  cooldownSec: z.number().int().nonnegative(),
  expiresSec: z.number().int().positive(),
  /**
   * Development only, when OTP_SIM=true: the raw 6-digit code, so dev builds
   * can complete login without a real SMS vendor. MUST be absent in production.
   */
  devCode: z.string().regex(/^\d{6}$/).optional(),
});
export type OtpRequestOutput = z.infer<typeof otpRequestOutputSchema>;

export const otpVerifyInputSchema = z.object({
  challengeId: publicIdSchema,
  code: z.string().regex(/^\d{6}$/, 'OTP is 6 digits'),
});
export type OtpVerifyInput = z.infer<typeof otpVerifyInputSchema>;

export const tokenPairSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.literal('Bearer'),
  /** access-token lifetime in seconds (~900) */
  expiresInSec: z.number().int().positive(),
});

export const accountSummarySchema = z.object({
  publicId: publicIdSchema,
  /** NULL for a fresh login until role selection completes (§11.1 onboarding) */
  role: roleSchema.nullable(),
  status: accountStatusSchema,
  phoneMasked: z.string(), // never echo full phone in responses beyond self
  /** first login → client routes to role/profile completion */
  isNewAccount: z.boolean(),
  profileCompletePct: z.number().int().min(0).max(100),
  kycStatus: z.enum(['NONE', 'DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED']),
});
export type AccountSummary = z.infer<typeof accountSummarySchema>;

export const otpVerifyOutputSchema = tokenPairSchema.extend({
  account: accountSummarySchema,
});
export type OtpVerifyOutput = z.infer<typeof otpVerifyOutputSchema>;

export const refreshInputSchema = z.object({
  refreshToken: z.string().min(20),
});
export type RefreshInput = z.infer<typeof refreshInputSchema>;

export const refreshOutputSchema = tokenPairSchema.extend({
  /** rotation — client MUST replace stored refresh token */
  rotated: z.literal(true),
});
export type RefreshOutput = z.infer<typeof refreshOutputSchema>;

export const logoutInputSchema = z.object({
  refreshToken: z.string().min(20).optional(), // omitted ⇒ revoke current session only
  allDevices: z.boolean().default(false),
});

export const sessionDtoSchema = z.object({
  publicId: publicIdSchema,
  userAgent: z.string().nullish(),
  issuedAt: z.string().datetime(),
  lastUsedAt: z.string().datetime().nullish(),
  current: z.boolean(), // this session?
});
export type SessionDto = z.infer<typeof sessionDtoSchema>;

export const otpRequestErrors = ['OTP_COOLDOWN', 'RATE_LIMITED', 'SMS_QUOTA_EXCEEDED', 'VALIDATION_FAILED'] as const;
export const otpVerifyErrors = ['OTP_INVALID', 'OTP_EXPIRED', 'OTP_MAX_ATTEMPTS', 'NOT_FOUND'] as const;
export const refreshErrors = ['TOKEN_INVALID', 'REFRESH_TOKEN_REUSED', 'ACCOUNT_SUSPENDED', 'ACCOUNT_CLOSED'] as const;

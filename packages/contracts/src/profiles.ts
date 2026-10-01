import { z } from 'zod';

import { latSchema, lngSchema, publicIdSchema, roleSchema } from './common.js';

/**
 * /me, /workers, /employers — own-account & profile operations (§14 rows 2–4).
 * UI hiding is UX only: every mutation is self-scoped server-side (§15).
 */

// ---------------------------------------------------------------------------
// Worker profile
// ---------------------------------------------------------------------------

export const workerProfilePatchSchema = z
  .object({
    fullName: z.string().min(2).max(120).optional(),
    bio: z.string().max(500).optional(),
    city: z.string().min(2).max(60).optional(),
    areaId: publicIdSchema.optional(),
    experienceYears: z.number().int().min(0).max(50).optional(),
    photoUploadTicket: z.string().optional(), // result of presign flow (§14 file rules)
    openToWork: z.boolean().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, 'Empty patch');
export type WorkerProfilePatch = z.infer<typeof workerProfilePatchSchema>;

export const skillsInputSchema = z.object({
  skills: z
    .array(z.object({ skillId: publicIdSchema, yearsHint: z.number().int().min(0).max(50).nullish() }))
    .max(30),
});
export type SkillsInput = z.infer<typeof skillsInputSchema>;

export const availabilitySlotInputSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  fromTime: z.string().regex(/^\d{2}:\d{2}$/),
  toTime: z.string().regex(/^\d{2}:\d{2}$/),
  areaId: publicIdSchema.optional(), // omitted = home area only
});
export const availabilityPutSchema = z.object({
  slots: z.array(availabilitySlotInputSchema).max(20),
});
export type AvailabilityPut = z.infer<typeof availabilityPutSchema>;

export const availabilitySlotDtoSchema = z.object({
  publicId: publicIdSchema,
  date: z.string(),
  fromTime: z.string(),
  toTime: z.string(),
  areaId: publicIdSchema.nullish(),
});

export const workerProfileDtoSchema = z.object({
  publicId: publicIdSchema,
  fullName: z.string(),
  photoUrl: z.string().url().nullish(), // presigned, short-lived
  city: z.string().nullish(),
  area: z.object({ publicId: publicIdSchema, name: z.string() }).nullish(),
  bio: z.string().nullish(),
  experienceYears: z.number().int().nullish(),
  openToWork: z.boolean(),
  skills: z.array(z.object({ skillId: publicIdSchema, name: z.string(), yearsHint: z.number().int().nullish() })),
  avgRatingMilli: z.number().int(),
  ratingsCount: z.number().int(),
  jobsDoneCount: z.number().int(),
  profileCompletePct: z.number().int(),
  kycBadge: z.boolean(), // VERIFIED only
  availability: z.array(availabilitySlotDtoSchema),
});
export type WorkerProfileDto = z.infer<typeof workerProfileDtoSchema>;

/** Employer's safe view of a worker (job-context only — §14 /workers row). */
export const workerSafeViewSchema = z.object({
  publicId: publicIdSchema,
  fullName: z.string(),
  photoUrl: z.string().url().nullish(),
  avgRatingMilli: z.number().int(),
  ratingsCount: z.number().int(),
  jobsDoneCount: z.number().int(),
  kycBadge: z.boolean(),
  skills: z.array(z.object({ skillId: publicIdSchema, name: z.string() })),
  distanceBand: z.string().optional(), // V1 distance band, not exact pin (§18)
});
export type WorkerSafeView = z.infer<typeof workerSafeViewSchema>;

// ---------------------------------------------------------------------------
// Employer org profile
// ---------------------------------------------------------------------------

export const orgPatchSchema = z
  .object({
    orgName: z.string().min(2).max(120).optional(),
    orgType: z.enum(['INDIVIDUAL', 'FIRM', 'COMPANY', 'GOVT', 'NGO']).optional(),
    contactName: z.string().min(2).max(120).optional(),
    city: z.string().min(2).max(60).optional(),
    areaId: publicIdSchema.optional(),
    addressLine: z.string().min(3).max(255).optional(),
    panRef: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format').nullish(),
    gstin: z.string().length(15).nullish(),
    welfareDefaults: z.array(z.string()).max(20).optional(), // welfare codes
  })
  .refine((v) => Object.keys(v).length > 0, 'Empty patch');
export type OrgPatch = z.infer<typeof orgPatchSchema>;

export const orgDtoSchema = z.object({
  publicId: publicIdSchema,
  orgName: z.string(),
  orgType: z.enum(['INDIVIDUAL', 'FIRM', 'COMPANY', 'GOVT', 'NGO']),
  contactName: z.string(),
  city: z.string(),
  area: z.object({ publicId: publicIdSchema, name: z.string() }),
  addressLine: z.string(),
  verificationStatus: z.string(),
  avgRatingMilli: z.number().int(),
  ratingsCount: z.number().int(),
  jobsPostedCount: z.number().int(),
  completenessPct: z.number().int(),
});
export type OrgDto = z.infer<typeof orgDtoSchema>;

// ---------------------------------------------------------------------------
// GET /me
// ---------------------------------------------------------------------------

export const meDtoSchema = z.object({
  account: z.object({
    publicId: publicIdSchema,
    /** NULL until onboarding completes role selection */
    role: roleSchema.nullable(),
    phoneMasked: z.string(),
    status: z.string(),
  }),
  workerProfile: z.union([workerProfileDtoSchema, z.null()]),
  org: z.union([orgDtoSchema, z.null()]),
  notificationPrefs: z.object({
    pushEnabled: z.boolean(),
    smsEnabled: z.boolean(),
    quietHours: z.string().nullish(),
  }),
});
export type MeDto = z.infer<typeof meDtoSchema>;

// ---------------------------------------------------------------------------
// POST /me/onboarding — role selection + minimal profile (§11.1, one role per account)
// ---------------------------------------------------------------------------

export const onboardInputSchema = z.discriminatedUnion('role', [
  z.object({
    role: z.literal('worker'),
    fullName: z.string().min(2).max(120),
    city: z.string().min(2).max(60).optional(),
    areaId: publicIdSchema.optional(),
    bio: z.string().max(500).optional(),
    experienceYears: z.number().int().min(0).max(50).optional(),
  }),
  z.object({
    role: z.literal('employer'),
    orgName: z.string().min(2).max(120),
    orgType: z.enum(['INDIVIDUAL', 'FIRM', 'COMPANY', 'GOVT', 'NGO']).optional(),
    contactName: z.string().min(2).max(120),
    city: z.string().min(2).max(60),
    areaId: publicIdSchema,
    addressLine: z.string().min(3).max(255),
    panRef: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format').nullish(),
    gstin: z.string().length(15).nullish(),
  }),
]);
export type OnboardInput = z.infer<typeof onboardInputSchema>;

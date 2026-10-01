import { z } from 'zod';

import { publicIdSchema } from './common.js';

/**
 * /config — public, unauthenticated bootstrap (§14 row 17). Everything a
 * client needs to render before login: org/welfare catalogs live with their
 * domains; this carries feature flags and V1 distance bands (no map pin
 * leak: exact lat/lng to workers only post-hire — §18).
 */

export const distanceBandsSchema = z.object({
  /** ordered km bands — scoring buckets proximity into these (§16) */
  bandsKm: z.array(z.number().int().positive()).max(10), // e.g. [2,5,10,25]
  labelFormat: z.string(), // e.g. "Within {km} km"
});

export const publicConfigSchema = z.object({
  appVersionMin: z.string(),
  otp: z.object({
    cooldownSec: z.number().int(),
    expiresSec: z.number().int(),
    maxAttempts: z.number().int(),
  }),
  quickMatch: z.object({
    respondSec: z.number().int(), // offer lifetime
    waveSizeDefault: z.number().int(),
  }),
  attendance: z.object({
    tokenRotateSec: z.number().int(), // ≤60 (§19)
    tokenTtlSec: z.number().int(),
    graceMinutes: z.number().int(),
    noShowAfterHours: z.number().int(),
  }),
  distanceBands: distanceBandsSchema,
  features: z.record(z.string(), z.boolean()), // additive feature flags (§26)
  locale: z.object({ default: z.string(), supported: z.array(z.string()) }),
  kycPolicy: z.object({
    /** gate policy (§36a #10 default): verify-to-be-hired / to-publish */
    requiredForHire: z.boolean(),
    requiredForPublish: z.boolean(),
    maxAttempts: z.number().int(),
  }),
  maintenanceMode: z.boolean(),
});
export type PublicConfig = z.infer<typeof publicConfigSchema>;

// ---------------------------------------------------------------------------
// GET /catalog — reference data for onboarding + job forms (seeded, Wave 1)
// ---------------------------------------------------------------------------

export const catalogOutputSchema = z.object({
  areas: z.array(
    z.object({
      publicId: publicIdSchema,
      city: z.string(),
      name: z.string(),
      nameTa: z.string().nullish(),
    }),
  ),
  skills: z.array(z.object({ publicId: publicIdSchema, code: z.string(), name: z.string() })),
  categories: z.array(z.object({ publicId: publicIdSchema, code: z.string(), name: z.string() })),
});
export type CatalogOutput = z.infer<typeof catalogOutputSchema>;

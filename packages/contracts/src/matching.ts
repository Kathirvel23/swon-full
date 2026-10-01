import { z } from 'zod';

import { isoDateSchema, localTimeSchema, pageQuerySchema, publicIdSchema } from './common.js';

/**
 * /matching — legacy-compatible discovery (§16 score pipeline) and the
 * Quick Match adjacent-worker loop (§14 row 13). Signals used by scoring are
 * fixed here so admin weights config maps 1:1: proximity, skill match,
 * reliability, rating, recency, availability, overlap (§16).
 */

export const matchCandidateSchema = z.object({
  workerPublicId: publicIdSchema,
  score: z.number().min(0).max(1000), // scaled 0..1000, server-authoritative
  distanceBand: z.string(), // V1 band label, not exact pin (§18)
  signals: z.object({
    proximityMilli: z.number().int(),
    skillMatchMilli: z.number().int(),
    reliabilityMilli: z.number().int(),
    ratingMilli: z.number().int(),
    recencyMilli: z.number().int(),
    availabilityMilli: z.number().int(),
    overlapMilli: z.number().int(),
  }),
  reasonCodes: z.array(z.string()), // explainability strings for UI chips
});
export type MatchCandidate = z.infer<typeof matchCandidateSchema>;

export const matchResultSchema = z.object({
  jobPublicId: publicIdSchema,
  weightsVersion: z.number().int(),
  logId: publicIdSchema, // match_log row — every weight change is inspectable
  candidates: z.array(matchCandidateSchema),
  ignoredCount: z.number().int(),
  takenMs: z.number().int(),
});
export type MatchResult = z.infer<typeof matchResultSchema>;

export const matchQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(50).default(20),
  includeApplied: z.coerce.boolean().default(false),
});

// ---------------------------------------------------------------------------
// Quick Match (H6)
// ---------------------------------------------------------------------------

export const quickMatchCreateSchema = z.object({
  jobPublicId: publicIdSchema,
  headcount: z.number().int().min(1).max(50),
  windowStart: z.string().datetime(),
  windowEnd: z.string().datetime(),
  requirementSnapshot: z.string().max(255),
  radiusKm: z.number().int().min(1).max(25).default(5),
  waveSize: z.number().int().min(1).max(30).default(10),
});
export type QuickMatchCreate = z.infer<typeof quickMatchCreateSchema>;

export const quickMatchOfferDtoSchema = z.object({
  publicId: publicIdSchema,
  status: z.enum(['PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'CANCELLED']),
  job: z.object({
    publicId: publicIdSchema,
    title: z.string(),
    city: z.string(),
    areaName: z.string(),
    payAmountPaise: z.number(),
    payType: z.string(),
    employerName: z.string(),
  }),
  requirementSnapshot: z.string(),
  windowStart: z.string().datetime(),
  windowEnd: z.string().datetime(),
  respondBy: z.string().datetime(),
  respondedAt: z.string().datetime().nullish(),
  distanceBand: z.string(),
  /** true while respondBy is within 5 minutes */
  expiringSoon: z.boolean(),
  /** match-reason codes (same vocabulary as MatchCandidate.reasonCodes) */
  reasonCodes: z.array(z.string()).optional(),
});
export type QuickMatchOfferDto = z.infer<typeof quickMatchOfferDtoSchema>;

export const quickMatchRespondSchema = z.object({
  response: z.enum(['ACCEPT', 'DECLINE']),
  /** accepted ⇒ immediate application row (source=QUICK_MATCH) in the same tx */
  coverNote: z.string().max(300).optional(),
});
export type QuickMatchRespond = z.infer<typeof quickMatchRespondSchema>;

export const quickMatchQuerySchema = pageQuerySchema.extend({
  status: z.enum(['PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'CANCELLED']).optional(),
});

export const matchingErrors = [
  'STATE_INVALID', 'QUICKMATCH_EXPIRED', 'JOB_ALREADY_FILLED', 'JOB_NOT_OPEN',
  'DUPLICATE_APPLICATION', 'CREW_DOUBLE_JOB', 'NOT_OWNER', 'NOT_FOUND', 'IDEMPOTENCY_KEY_REUSED',
] as const;

import { z } from 'zod';

import { pageQuerySchema, publicIdSchema } from './common.js';

/**
 * /ratings — mutual, double-blind for 48 h (§14 row 12, §22.8).
 * One rating per (job, rater, ratee); only counterparties of a COMPLETED job.
 */

export const RATING_TAGS = [
  'ON_TIME', 'SAFE_ENVIRONMENT', 'CLEAR_PAY', 'RESPECTFUL',
  'GOOD_WORK', 'RELIABLE', 'NEEDS_IMPROVEMENT',
] as const;
export const ratingTagSchema = z.enum(RATING_TAGS);
export type RatingTag = z.infer<typeof ratingTagSchema>;

export const ratingCreateSchema = z.object({
  jobPublicId: publicIdSchema,
  /** who is being rated — server verifies caller is the counterpart */
  rateeAccountPublicId: publicIdSchema,
  score: z.number().int().min(1).max(5),
  tags: z.array(ratingTagSchema).max(7).default([]),
  comment: z.string().max(300).optional(),
});
export type RatingCreate = z.infer<typeof ratingCreateSchema>;

export const ratingDtoSchema = z.object({
  publicId: publicIdSchema,
  score: z.number().int().min(1).max(5),
  tags: z.array(z.enum(RATING_TAGS)),
  comment: z.string().nullish(), // hidden until both submit OR 48 h pass
  commentVisible: z.boolean(),
  jobPublicId: publicIdSchema,
  jobTitle: z.string(),
  raterRole: z.enum(['WORKER', 'EMPLOYER']),
  rater: z.object({
    publicId: publicIdSchema,
    displayName: z.string(), // anonymous-app view until reveal
    photoUrl: z.string().url().nullish(),
    revealed: z.boolean(),
  }),
  ratee: z.object({ publicId: publicIdSchema, displayName: z.string(), photoUrl: z.string().url().nullish() }),
  createdAt: z.string().datetime(),
});
export type RatingDto = z.infer<typeof ratingDtoSchema>;

/** /me/rating-summary — lightweight aggregate for profile cards */
export const ratingSummarySchema = z.object({
  avgRatingMilli: z.number().int(), // milli-units: 4500 = 4.5★ (§8-adjacent integer rule)
  ratingsCount: z.number().int(),
  distribution: z.object({
    five: z.number().int(), four: z.number().int(), three: z.number().int(),
    two: z.number().int(), one: z.number().int(),
  }),
  pendingCount: z.number().int(), // jobs awaiting my rating
});
export type RatingSummary = z.infer<typeof ratingSummarySchema>;

export const pendingRatingsQuerySchema = pageQuerySchema.extend({});

export const ratingErrors = [
  'ALREADY_RATED', 'NOT_JOB_PARTY', 'STATE_INVALID', 'VALIDATION_FAILED', 'NOT_FOUND',
] as const;

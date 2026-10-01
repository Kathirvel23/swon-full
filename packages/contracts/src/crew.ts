import { z } from 'zod';

import { crewStatusSchema, pageQuerySchema, publicIdSchema } from './common.js';

/**
 * H7 crew roster (§10: queue ≠ crew). A hired application gains a
 * crew_member row atomically (M2-A5); the roster is the employer's live
 * "who is on this job" view — attendance (W5) reads the same rows.
 */

export type CrewStatus = z.infer<typeof crewStatusSchema>;

export const crewMemberDtoSchema = z.object({
  publicId: publicIdSchema,
  status: crewStatusSchema,
  hiredAt: z.string().datetime(),
  releasedAt: z.string().datetime().nullish(),
  releasedReason: z.string().nullish(),
  applicationPublicId: publicIdSchema,
  worker: z.object({
    publicId: publicIdSchema,
    fullName: z.string(),
    photoUrl: z.string().nullish(),
    avgRatingMilli: z.number().int(),
    ratingsCount: z.number().int(),
    experienceYears: z.number().int().nullish(),
    skills: z.array(z.object({ skillId: publicIdSchema, name: z.string() })),
    kycBadge: z.boolean(),
  }),
});
export type CrewMemberDto = z.infer<typeof crewMemberDtoSchema>;

export const crewRosterQuerySchema = pageQuerySchema.extend({
  status: crewStatusSchema.optional(),
});

export type CrewRosterQuery = z.infer<typeof crewRosterQuerySchema>;

export const crewRosterSummarySchema = z.object({
  seatsRequired: z.number().int(),
  seatsFilled: z.number().int(),
  seatsReleased: z.number().int(),
  jobStatus: z.string(),
});
export type CrewRosterSummary = z.infer<typeof crewRosterSummarySchema>;

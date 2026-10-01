import { z } from 'zod';
import { crewStatusSchema, pageQuerySchema, publicIdSchema } from './common.js';
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
export const crewRosterQuerySchema = pageQuerySchema.extend({
    status: crewStatusSchema.optional(),
});
export const crewRosterSummarySchema = z.object({
    seatsRequired: z.number().int(),
    seatsFilled: z.number().int(),
    seatsReleased: z.number().int(),
    jobStatus: z.string(),
});

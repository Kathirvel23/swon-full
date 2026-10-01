import { z } from 'zod';
import { crewStatusSchema } from './common.js';
/**
 * H7 crew roster (§10: queue ≠ crew). A hired application gains a
 * crew_member row atomically (M2-A5); the roster is the employer's live
 * "who is on this job" view — attendance (W5) reads the same rows.
 */
export type CrewStatus = z.infer<typeof crewStatusSchema>;
export declare const crewMemberDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        COMPLETED: "COMPLETED";
        NO_SHOW: "NO_SHOW";
        RELEASED: "RELEASED";
    }>;
    hiredAt: z.ZodString;
    releasedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    releasedReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    applicationPublicId: z.ZodString;
    worker: z.ZodObject<{
        publicId: z.ZodString;
        fullName: z.ZodString;
        photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        avgRatingMilli: z.ZodNumber;
        ratingsCount: z.ZodNumber;
        experienceYears: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        skills: z.ZodArray<z.ZodObject<{
            skillId: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>>;
        kycBadge: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CrewMemberDto = z.infer<typeof crewMemberDtoSchema>;
export declare const crewRosterQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        COMPLETED: "COMPLETED";
        NO_SHOW: "NO_SHOW";
        RELEASED: "RELEASED";
    }>>;
}, z.core.$strip>;
export type CrewRosterQuery = z.infer<typeof crewRosterQuerySchema>;
export declare const crewRosterSummarySchema: z.ZodObject<{
    seatsRequired: z.ZodNumber;
    seatsFilled: z.ZodNumber;
    seatsReleased: z.ZodNumber;
    jobStatus: z.ZodString;
}, z.core.$strip>;
export type CrewRosterSummary = z.infer<typeof crewRosterSummarySchema>;
//# sourceMappingURL=crew.d.ts.map
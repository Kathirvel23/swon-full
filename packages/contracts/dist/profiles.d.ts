import { z } from 'zod';
/**
 * /me, /workers, /employers — own-account & profile operations (§14 rows 2–4).
 * UI hiding is UX only: every mutation is self-scoped server-side (§15).
 */
export declare const workerProfilePatchSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    areaId: z.ZodOptional<z.ZodString>;
    experienceYears: z.ZodOptional<z.ZodNumber>;
    photoUploadTicket: z.ZodOptional<z.ZodString>;
    openToWork: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type WorkerProfilePatch = z.infer<typeof workerProfilePatchSchema>;
export declare const skillsInputSchema: z.ZodObject<{
    skills: z.ZodArray<z.ZodObject<{
        skillId: z.ZodString;
        yearsHint: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SkillsInput = z.infer<typeof skillsInputSchema>;
export declare const availabilitySlotInputSchema: z.ZodObject<{
    date: z.ZodString;
    fromTime: z.ZodString;
    toTime: z.ZodString;
    areaId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const availabilityPutSchema: z.ZodObject<{
    slots: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        fromTime: z.ZodString;
        toTime: z.ZodString;
        areaId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type AvailabilityPut = z.infer<typeof availabilityPutSchema>;
export declare const availabilitySlotDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    date: z.ZodString;
    fromTime: z.ZodString;
    toTime: z.ZodString;
    areaId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const workerProfileDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    fullName: z.ZodString;
    photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    area: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        publicId: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>>;
    bio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    experienceYears: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    openToWork: z.ZodBoolean;
    skills: z.ZodArray<z.ZodObject<{
        skillId: z.ZodString;
        name: z.ZodString;
        yearsHint: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>>;
    avgRatingMilli: z.ZodNumber;
    ratingsCount: z.ZodNumber;
    jobsDoneCount: z.ZodNumber;
    profileCompletePct: z.ZodNumber;
    kycBadge: z.ZodBoolean;
    availability: z.ZodArray<z.ZodObject<{
        publicId: z.ZodString;
        date: z.ZodString;
        fromTime: z.ZodString;
        toTime: z.ZodString;
        areaId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type WorkerProfileDto = z.infer<typeof workerProfileDtoSchema>;
/** Employer's safe view of a worker (job-context only — §14 /workers row). */
export declare const workerSafeViewSchema: z.ZodObject<{
    publicId: z.ZodString;
    fullName: z.ZodString;
    photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    avgRatingMilli: z.ZodNumber;
    ratingsCount: z.ZodNumber;
    jobsDoneCount: z.ZodNumber;
    kycBadge: z.ZodBoolean;
    skills: z.ZodArray<z.ZodObject<{
        skillId: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>;
    distanceBand: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type WorkerSafeView = z.infer<typeof workerSafeViewSchema>;
export declare const orgPatchSchema: z.ZodObject<{
    orgName: z.ZodOptional<z.ZodString>;
    orgType: z.ZodOptional<z.ZodEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        FIRM: "FIRM";
        COMPANY: "COMPANY";
        GOVT: "GOVT";
        NGO: "NGO";
    }>>;
    contactName: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    areaId: z.ZodOptional<z.ZodString>;
    addressLine: z.ZodOptional<z.ZodString>;
    panRef: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gstin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    welfareDefaults: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type OrgPatch = z.infer<typeof orgPatchSchema>;
export declare const orgDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    orgName: z.ZodString;
    orgType: z.ZodEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        FIRM: "FIRM";
        COMPANY: "COMPANY";
        GOVT: "GOVT";
        NGO: "NGO";
    }>;
    contactName: z.ZodString;
    city: z.ZodString;
    area: z.ZodObject<{
        publicId: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>;
    addressLine: z.ZodString;
    verificationStatus: z.ZodString;
    avgRatingMilli: z.ZodNumber;
    ratingsCount: z.ZodNumber;
    jobsPostedCount: z.ZodNumber;
    completenessPct: z.ZodNumber;
}, z.core.$strip>;
export type OrgDto = z.infer<typeof orgDtoSchema>;
export declare const meDtoSchema: z.ZodObject<{
    account: z.ZodObject<{
        publicId: z.ZodString;
        role: z.ZodNullable<z.ZodEnum<{
            worker: "worker";
            employer: "employer";
            admin: "admin";
        }>>;
        phoneMasked: z.ZodString;
        status: z.ZodString;
    }, z.core.$strip>;
    workerProfile: z.ZodUnion<readonly [z.ZodObject<{
        publicId: z.ZodString;
        fullName: z.ZodString;
        photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        area: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            publicId: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>>>;
        bio: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        experienceYears: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        openToWork: z.ZodBoolean;
        skills: z.ZodArray<z.ZodObject<{
            skillId: z.ZodString;
            name: z.ZodString;
            yearsHint: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, z.core.$strip>>;
        avgRatingMilli: z.ZodNumber;
        ratingsCount: z.ZodNumber;
        jobsDoneCount: z.ZodNumber;
        profileCompletePct: z.ZodNumber;
        kycBadge: z.ZodBoolean;
        availability: z.ZodArray<z.ZodObject<{
            publicId: z.ZodString;
            date: z.ZodString;
            fromTime: z.ZodString;
            toTime: z.ZodString;
            areaId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodNull]>;
    org: z.ZodUnion<readonly [z.ZodObject<{
        publicId: z.ZodString;
        orgName: z.ZodString;
        orgType: z.ZodEnum<{
            INDIVIDUAL: "INDIVIDUAL";
            FIRM: "FIRM";
            COMPANY: "COMPANY";
            GOVT: "GOVT";
            NGO: "NGO";
        }>;
        contactName: z.ZodString;
        city: z.ZodString;
        area: z.ZodObject<{
            publicId: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>;
        addressLine: z.ZodString;
        verificationStatus: z.ZodString;
        avgRatingMilli: z.ZodNumber;
        ratingsCount: z.ZodNumber;
        jobsPostedCount: z.ZodNumber;
        completenessPct: z.ZodNumber;
    }, z.core.$strip>, z.ZodNull]>;
    notificationPrefs: z.ZodObject<{
        pushEnabled: z.ZodBoolean;
        smsEnabled: z.ZodBoolean;
        quietHours: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type MeDto = z.infer<typeof meDtoSchema>;
export declare const onboardInputSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    role: z.ZodLiteral<"worker">;
    fullName: z.ZodString;
    city: z.ZodOptional<z.ZodString>;
    areaId: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    experienceYears: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>, z.ZodObject<{
    role: z.ZodLiteral<"employer">;
    orgName: z.ZodString;
    orgType: z.ZodOptional<z.ZodEnum<{
        INDIVIDUAL: "INDIVIDUAL";
        FIRM: "FIRM";
        COMPANY: "COMPANY";
        GOVT: "GOVT";
        NGO: "NGO";
    }>>;
    contactName: z.ZodString;
    city: z.ZodString;
    areaId: z.ZodString;
    addressLine: z.ZodString;
    panRef: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gstin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>], "role">;
export type OnboardInput = z.infer<typeof onboardInputSchema>;
//# sourceMappingURL=profiles.d.ts.map
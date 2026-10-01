import { z } from 'zod';
/**
 * /jobs — creation, lifecycle commands, discovery feed (§14 row 6).
 * Owner mutations only; drafts are private; live jobs worker-readable.
 * Lifecycle transitions live in Database/STATE_MACHINES.md (M1).
 */
export declare const jobWorkDayInputSchema: z.ZodObject<{
    date: z.ZodString;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    headcount: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const jobCreateSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    categoryId: z.ZodString;
    city: z.ZodString;
    areaId: z.ZodString;
    addressLine: z.ZodString;
    lat: z.ZodOptional<z.ZodNumber>;
    lng: z.ZodOptional<z.ZodNumber>;
    startsOn: z.ZodString;
    endsOn: z.ZodString;
    dayStartTime: z.ZodString;
    dayEndTime: z.ZodString;
    workDays: z.ZodOptional<z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        startTime: z.ZodOptional<z.ZodString>;
        endTime: z.ZodOptional<z.ZodString>;
        headcount: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    payType: z.ZodEnum<{
        HOUR: "HOUR";
        DAY: "DAY";
        TOTAL: "TOTAL";
    }>;
    payAmountPaise: z.ZodNumber;
    headcountRequired: z.ZodNumber;
    minExperienceYears: z.ZodOptional<z.ZodNumber>;
    requirementsNote: z.ZodOptional<z.ZodString>;
    skillIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
    welfare: z.ZodDefault<z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type JobCreate = z.infer<typeof jobCreateSchema>;
export declare const jobPatchSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    areaId: z.ZodOptional<z.ZodString>;
    addressLine: z.ZodOptional<z.ZodString>;
    lat: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    lng: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    startsOn: z.ZodOptional<z.ZodString>;
    endsOn: z.ZodOptional<z.ZodString>;
    dayStartTime: z.ZodOptional<z.ZodString>;
    dayEndTime: z.ZodOptional<z.ZodString>;
    workDays: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        startTime: z.ZodOptional<z.ZodString>;
        endTime: z.ZodOptional<z.ZodString>;
        headcount: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>>;
    payType: z.ZodOptional<z.ZodEnum<{
        HOUR: "HOUR";
        DAY: "DAY";
        TOTAL: "TOTAL";
    }>>;
    payAmountPaise: z.ZodOptional<z.ZodNumber>;
    headcountRequired: z.ZodOptional<z.ZodNumber>;
    minExperienceYears: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    requirementsNote: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    skillIds: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
    welfare: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export type JobPatch = z.infer<typeof jobPatchSchema>;
export declare const jobDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    status: z.ZodEnum<{
        CLOSED: "CLOSED";
        DRAFT: "DRAFT";
        OPEN: "OPEN";
        HIRING: "HIRING";
        FILLED: "FILLED";
        IN_PROGRESS: "IN_PROGRESS";
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
        EXPIRED: "EXPIRED";
    }>;
    category: z.ZodObject<{
        publicId: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>;
    city: z.ZodString;
    area: z.ZodObject<{
        publicId: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>;
    addressLine: z.ZodString;
    coordinatesAvailable: z.ZodBoolean;
    startsOn: z.ZodString;
    endsOn: z.ZodString;
    dayStartTime: z.ZodString;
    dayEndTime: z.ZodString;
    workDays: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        startTime: z.ZodString;
        endTime: z.ZodString;
    }, z.core.$strip>>;
    payType: z.ZodEnum<{
        HOUR: "HOUR";
        DAY: "DAY";
        TOTAL: "TOTAL";
    }>;
    payAmountPaise: z.ZodNumber;
    currency: z.ZodLiteral<"INR">;
    payLabel: z.ZodString;
    headcountRequired: z.ZodNumber;
    hiredCount: z.ZodNumber;
    applicationCount: z.ZodNumber;
    minExperienceYears: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    requirementsNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    skills: z.ZodArray<z.ZodObject<{
        skillId: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>;
    welfare: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        label: z.ZodString;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    employer: z.ZodObject<{
        publicId: z.ZodString;
        orgName: z.ZodString;
        orgType: z.ZodString;
        avgRatingMilli: z.ZodNumber;
        ratingsCount: z.ZodNumber;
        kycBadge: z.ZodBoolean;
    }, z.core.$strip>;
    publishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cancelReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    viewerState: z.ZodOptional<z.ZodObject<{
        applied: z.ZodBoolean;
        applicationStatus: z.ZodOptional<z.ZodString>;
        hasCrewSeat: z.ZodBoolean;
        isOwner: z.ZodBoolean;
    }, z.core.$strip>>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type JobDto = z.infer<typeof jobDtoSchema>;
export declare const jobSearchSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    categoryId: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    areaId: z.ZodOptional<z.ZodString>;
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    payMinPaise: z.ZodOptional<z.ZodNumber>;
    skillIds: z.ZodOptional<z.ZodString>;
    welfareCodes: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
    sort: z.ZodDefault<z.ZodEnum<{
        DATE_ASC: "DATE_ASC";
        DATE_DESC: "DATE_DESC";
        PAY_DESC: "PAY_DESC";
        RELEVANCE: "RELEVANCE";
    }>>;
}, z.core.$strip>;
export type JobSearch = z.infer<typeof jobSearchSchema>;
/**
 * Feed item = jobDto + discovery-only viewer context (W3): distance between
 * the job's area and the viewer's profile area, plus eligibility badges
 * (skill overlap, experience, KYC readiness — #10 gate is enforced at apply).
 */
export declare const jobFeedItemSchema: z.ZodObject<{
    publicId: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    status: z.ZodEnum<{
        CLOSED: "CLOSED";
        DRAFT: "DRAFT";
        OPEN: "OPEN";
        HIRING: "HIRING";
        FILLED: "FILLED";
        IN_PROGRESS: "IN_PROGRESS";
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
        EXPIRED: "EXPIRED";
    }>;
    category: z.ZodObject<{
        publicId: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>;
    city: z.ZodString;
    area: z.ZodObject<{
        publicId: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>;
    addressLine: z.ZodString;
    coordinatesAvailable: z.ZodBoolean;
    startsOn: z.ZodString;
    endsOn: z.ZodString;
    dayStartTime: z.ZodString;
    dayEndTime: z.ZodString;
    workDays: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        startTime: z.ZodString;
        endTime: z.ZodString;
    }, z.core.$strip>>;
    payType: z.ZodEnum<{
        HOUR: "HOUR";
        DAY: "DAY";
        TOTAL: "TOTAL";
    }>;
    payAmountPaise: z.ZodNumber;
    currency: z.ZodLiteral<"INR">;
    payLabel: z.ZodString;
    headcountRequired: z.ZodNumber;
    hiredCount: z.ZodNumber;
    applicationCount: z.ZodNumber;
    minExperienceYears: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    requirementsNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    skills: z.ZodArray<z.ZodObject<{
        skillId: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>;
    welfare: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        label: z.ZodString;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    employer: z.ZodObject<{
        publicId: z.ZodString;
        orgName: z.ZodString;
        orgType: z.ZodString;
        avgRatingMilli: z.ZodNumber;
        ratingsCount: z.ZodNumber;
        kycBadge: z.ZodBoolean;
    }, z.core.$strip>;
    publishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    cancelReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    viewerState: z.ZodOptional<z.ZodObject<{
        applied: z.ZodBoolean;
        applicationStatus: z.ZodOptional<z.ZodString>;
        hasCrewSeat: z.ZodBoolean;
        isOwner: z.ZodBoolean;
    }, z.core.$strip>>;
    createdAt: z.ZodString;
    distanceKm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    viewerBadges: z.ZodOptional<z.ZodObject<{
        matchesSkills: z.ZodBoolean;
        experienceOk: z.ZodBoolean;
        kycOk: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type JobFeedItem = z.infer<typeof jobFeedItemSchema>;
export declare const jobListSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        publicId: z.ZodString;
        title: z.ZodString;
        description: z.ZodString;
        status: z.ZodEnum<{
            CLOSED: "CLOSED";
            DRAFT: "DRAFT";
            OPEN: "OPEN";
            HIRING: "HIRING";
            FILLED: "FILLED";
            IN_PROGRESS: "IN_PROGRESS";
            COMPLETED: "COMPLETED";
            CANCELLED: "CANCELLED";
            EXPIRED: "EXPIRED";
        }>;
        category: z.ZodObject<{
            publicId: z.ZodString;
            code: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>;
        city: z.ZodString;
        area: z.ZodObject<{
            publicId: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>;
        addressLine: z.ZodString;
        coordinatesAvailable: z.ZodBoolean;
        startsOn: z.ZodString;
        endsOn: z.ZodString;
        dayStartTime: z.ZodString;
        dayEndTime: z.ZodString;
        workDays: z.ZodArray<z.ZodObject<{
            date: z.ZodString;
            startTime: z.ZodString;
            endTime: z.ZodString;
        }, z.core.$strip>>;
        payType: z.ZodEnum<{
            HOUR: "HOUR";
            DAY: "DAY";
            TOTAL: "TOTAL";
        }>;
        payAmountPaise: z.ZodNumber;
        currency: z.ZodLiteral<"INR">;
        payLabel: z.ZodString;
        headcountRequired: z.ZodNumber;
        hiredCount: z.ZodNumber;
        applicationCount: z.ZodNumber;
        minExperienceYears: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        requirementsNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        skills: z.ZodArray<z.ZodObject<{
            skillId: z.ZodString;
            name: z.ZodString;
        }, z.core.$strip>>;
        welfare: z.ZodArray<z.ZodObject<{
            code: z.ZodString;
            label: z.ZodString;
            note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$strip>>;
        employer: z.ZodObject<{
            publicId: z.ZodString;
            orgName: z.ZodString;
            orgType: z.ZodString;
            avgRatingMilli: z.ZodNumber;
            ratingsCount: z.ZodNumber;
            kycBadge: z.ZodBoolean;
        }, z.core.$strip>;
        publishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        cancelReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        viewerState: z.ZodOptional<z.ZodObject<{
            applied: z.ZodBoolean;
            applicationStatus: z.ZodOptional<z.ZodString>;
            hasCrewSeat: z.ZodBoolean;
            isOwner: z.ZodBoolean;
        }, z.core.$strip>>;
        createdAt: z.ZodString;
        distanceKm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        viewerBadges: z.ZodOptional<z.ZodObject<{
            matchesSkills: z.ZodBoolean;
            experienceOk: z.ZodBoolean;
            kycOk: z.ZodBoolean;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    meta: z.ZodObject<{
        nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        hasMore: z.ZodBoolean;
        limit: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
/** Employer's own jobs (drafts included). */
export declare const jobMineQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        CLOSED: "CLOSED";
        DRAFT: "DRAFT";
        OPEN: "OPEN";
        HIRING: "HIRING";
        FILLED: "FILLED";
        IN_PROGRESS: "IN_PROGRESS";
        COMPLETED: "COMPLETED";
        CANCELLED: "CANCELLED";
        EXPIRED: "EXPIRED";
    }>>;
}, z.core.$strip>;
export type JobMineQuery = z.infer<typeof jobMineQuerySchema>;
export declare const jobPublishOutputSchema: z.ZodObject<{
    publicId: z.ZodString;
    status: z.ZodLiteral<"OPEN">;
}, z.core.$strip>;
export declare const jobCancelSchema: z.ZodObject<{
    reason: z.ZodString;
    crewHandlingConfirmed: z.ZodBoolean;
}, z.core.$strip>;
export type JobCancel = z.infer<typeof jobCancelSchema>;
export declare const jobErrors: readonly ["VALIDATION_FAILED", "NOT_OWNER", "STATE_INVALID", "KYC_REQUIRED", "NOT_FOUND", "RATE_LIMITED"];
//# sourceMappingURL=jobs.d.ts.map
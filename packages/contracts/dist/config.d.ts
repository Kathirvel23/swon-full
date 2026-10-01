import { z } from 'zod';
/**
 * /config — public, unauthenticated bootstrap (§14 row 17). Everything a
 * client needs to render before login: org/welfare catalogs live with their
 * domains; this carries feature flags and V1 distance bands (no map pin
 * leak: exact lat/lng to workers only post-hire — §18).
 */
export declare const distanceBandsSchema: z.ZodObject<{
    bandsKm: z.ZodArray<z.ZodNumber>;
    labelFormat: z.ZodString;
}, z.core.$strip>;
export declare const publicConfigSchema: z.ZodObject<{
    appVersionMin: z.ZodString;
    otp: z.ZodObject<{
        cooldownSec: z.ZodNumber;
        expiresSec: z.ZodNumber;
        maxAttempts: z.ZodNumber;
    }, z.core.$strip>;
    quickMatch: z.ZodObject<{
        respondSec: z.ZodNumber;
        waveSizeDefault: z.ZodNumber;
    }, z.core.$strip>;
    attendance: z.ZodObject<{
        tokenRotateSec: z.ZodNumber;
        tokenTtlSec: z.ZodNumber;
        graceMinutes: z.ZodNumber;
        noShowAfterHours: z.ZodNumber;
    }, z.core.$strip>;
    distanceBands: z.ZodObject<{
        bandsKm: z.ZodArray<z.ZodNumber>;
        labelFormat: z.ZodString;
    }, z.core.$strip>;
    features: z.ZodRecord<z.ZodString, z.ZodBoolean>;
    locale: z.ZodObject<{
        default: z.ZodString;
        supported: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    kycPolicy: z.ZodObject<{
        requiredForHire: z.ZodBoolean;
        requiredForPublish: z.ZodBoolean;
        maxAttempts: z.ZodNumber;
    }, z.core.$strip>;
    maintenanceMode: z.ZodBoolean;
}, z.core.$strip>;
export type PublicConfig = z.infer<typeof publicConfigSchema>;
export declare const catalogOutputSchema: z.ZodObject<{
    areas: z.ZodArray<z.ZodObject<{
        publicId: z.ZodString;
        city: z.ZodString;
        name: z.ZodString;
        nameTa: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    skills: z.ZodArray<z.ZodObject<{
        publicId: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>;
    categories: z.ZodArray<z.ZodObject<{
        publicId: z.ZodString;
        code: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CatalogOutput = z.infer<typeof catalogOutputSchema>;
//# sourceMappingURL=config.d.ts.map
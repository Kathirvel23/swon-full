import { z } from 'zod';
/**
 * /welfare — job welfare declarations (§14 row 15): hydrate job cards,
 * keep the taxonomy admin-configurable (no hardcoded welfare list, §26).
 */
export declare const welfareItemDtoSchema: z.ZodObject<{
    code: z.ZodString;
    label: z.ZodString;
    labelTa: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    category: z.ZodEnum<{
        SAFETY: "SAFETY";
        OTHER: "OTHER";
        FOOD: "FOOD";
        TRANSPORT: "TRANSPORT";
        FACILITY: "FACILITY";
    }>;
    active: z.ZodBoolean;
    sortOrder: z.ZodNumber;
}, z.core.$strip>;
export type WelfareItemDto = z.infer<typeof welfareItemDtoSchema>;
export declare const welfareCatalogQuerySchema: z.ZodObject<{
    activeOnly: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export declare const jobWelfareDtoSchema: z.ZodObject<{
    code: z.ZodString;
    label: z.ZodString;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/** Employer default set (org profile welfareDefaults) */
export declare const employerWelfareDefaultsSchema: z.ZodObject<{
    codes: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const welfareErrors: readonly ["VALIDATION_FAILED", "NOT_FOUND", "FORBIDDEN"];
//# sourceMappingURL=welfare.d.ts.map
import { z } from 'zod';
import { publicIdSchema } from './common.js';
/**
 * /welfare — job welfare declarations (§14 row 15): hydrate job cards,
 * keep the taxonomy admin-configurable (no hardcoded welfare list, §26).
 */
export const welfareItemDtoSchema = z.object({
    code: z.string(), // WATER | MEALS | TRANSPORT | SAFETY_KIT | FIRST_AID | ...
    label: z.string(),
    labelTa: z.string().nullish(), // Tamil label when provided
    category: z.enum(['FOOD', 'TRANSPORT', 'SAFETY', 'FACILITY', 'OTHER']),
    active: z.boolean(),
    sortOrder: z.number().int(),
});
export const welfareCatalogQuerySchema = z.object({
    activeOnly: z.coerce.boolean().default(true),
});
export const jobWelfareDtoSchema = z.object({
    code: z.string(),
    label: z.string(),
    note: z.string().nullish(), // employer's free-text ("hot lunch at 1 PM")
});
/** Employer default set (org profile welfareDefaults) */
export const employerWelfareDefaultsSchema = z.object({
    codes: z.array(z.string()).max(20),
});
export const welfareErrors = ['VALIDATION_FAILED', 'NOT_FOUND', 'FORBIDDEN'];

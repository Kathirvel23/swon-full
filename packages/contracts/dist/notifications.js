import { z } from 'zod';
import { pageQuerySchema, paginated, publicIdSchema } from './common.js';
import { NOTIFICATION_EVENTS } from './events.js';
/**
 * /notifications — in-app inbox + device/push prefs (§14 row 14, §22 rules).
 * In-app is the system of record: if it failed to land, the whole event failed.
 */
export const notificationDtoSchema = z.object({
    publicId: publicIdSchema,
    eventKey: z.enum(Object.keys(NOTIFICATION_EVENTS)),
    titleKey: z.string(), // client renders localized — never pre-translated text
    bodyParams: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).nullish(),
    context: z
        .object({ type: z.enum(['JOB', 'APPLICATION', 'EARNING', 'KYC', 'COMPLAINT', 'ACCOUNT']), publicId: publicIdSchema })
        .nullish(),
    readAt: z.string().datetime().nullish(),
    createdAt: z.string().datetime(),
});
export const notificationsQuerySchema = pageQuerySchema.extend({
    unread: z.coerce.boolean().optional(),
    contextType: z.string().optional(),
});
export const unreadCountSchema = z.object({ unread: z.number().int() });
export const markReadSchema = z.object({ ids: z.array(publicIdSchema).min(1).max(200).optional(), all: z.boolean().optional() })
    .refine((v) => v.all === true || (v.ids && v.ids.length > 0), 'ids or all required');
// ---------------------------------------------------------------------------
// Devices & preferences (M4: push/token mgmt, prefs)
// ---------------------------------------------------------------------------
export const pushTokenRegisterSchema = z.object({
    token: z.string().min(10),
    platform: z.enum(['IOS', 'ANDROID', 'WEB']),
    deviceName: z.string().max(80).optional(),
});
export const notificationPrefsSchema = z.object({
    pushEnabled: z.boolean().optional(),
    smsEnabled: z.boolean().optional(), // OTP SMS is exempt — unmuteable (§22)
    quietHours: z
        .string()
        .regex(/^\d{2}:\d{2}-\d{2}:\d{2}$/)
        .nullish(), // e.g. 22:00-07:00
});
export const notificationErrors = ['VALIDATION_FAILED', 'NOT_FOUND', 'FORBIDDEN'];
/** GET /notifications — cursor page of the in-app inbox (unread-first). */
export const notificationsListSchema = paginated(notificationDtoSchema);
/** POST /notifications/read → refreshed unread count. */
export const markReadOutputSchema = unreadCountSchema;

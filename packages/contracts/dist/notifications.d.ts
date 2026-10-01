import { z } from 'zod';
/**
 * /notifications — in-app inbox + device/push prefs (§14 row 14, §22 rules).
 * In-app is the system of record: if it failed to land, the whole event failed.
 */
export declare const notificationDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    eventKey: z.ZodEnum<{
        [x: string]: string;
    }>;
    titleKey: z.ZodString;
    bodyParams: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>>>;
    context: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        type: z.ZodEnum<{
            JOB: "JOB";
            APPLICATION: "APPLICATION";
            EARNING: "EARNING";
            ACCOUNT: "ACCOUNT";
            KYC: "KYC";
            COMPLAINT: "COMPLAINT";
        }>;
        publicId: z.ZodString;
    }, z.core.$strip>>>;
    readAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, z.core.$strip>;
export type NotificationDto = z.infer<typeof notificationDtoSchema>;
export declare const notificationsQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    unread: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    contextType: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const unreadCountSchema: z.ZodObject<{
    unread: z.ZodNumber;
}, z.core.$strip>;
export declare const markReadSchema: z.ZodObject<{
    ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
    all: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const pushTokenRegisterSchema: z.ZodObject<{
    token: z.ZodString;
    platform: z.ZodEnum<{
        IOS: "IOS";
        ANDROID: "ANDROID";
        WEB: "WEB";
    }>;
    deviceName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type PushTokenRegister = z.infer<typeof pushTokenRegisterSchema>;
export declare const notificationPrefsSchema: z.ZodObject<{
    pushEnabled: z.ZodOptional<z.ZodBoolean>;
    smsEnabled: z.ZodOptional<z.ZodBoolean>;
    quietHours: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type NotificationPrefs = z.infer<typeof notificationPrefsSchema>;
export declare const notificationErrors: readonly ["VALIDATION_FAILED", "NOT_FOUND", "FORBIDDEN"];
/** GET /notifications — cursor page of the in-app inbox (unread-first). */
export declare const notificationsListSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        publicId: z.ZodString;
        eventKey: z.ZodEnum<{
            [x: string]: string;
        }>;
        titleKey: z.ZodString;
        bodyParams: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>>>;
        context: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            type: z.ZodEnum<{
                JOB: "JOB";
                APPLICATION: "APPLICATION";
                EARNING: "EARNING";
                ACCOUNT: "ACCOUNT";
                KYC: "KYC";
                COMPLAINT: "COMPLAINT";
            }>;
            publicId: z.ZodString;
        }, z.core.$strip>>>;
        readAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
    }, z.core.$strip>>;
    meta: z.ZodObject<{
        nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        hasMore: z.ZodBoolean;
        limit: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export type NotificationsList = z.infer<typeof notificationsListSchema>;
/** POST /notifications/read → refreshed unread count. */
export declare const markReadOutputSchema: z.ZodObject<{
    unread: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=notifications.d.ts.map
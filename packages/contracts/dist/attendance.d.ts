import { z } from 'zod';
/**
 * /attendance — QR check-in/out, employer roster, approvals (§14 row 9, §19).
 * Tokens are server-signed + rotating (≤60 s) + single-use; the payload's
 * authenticity is NEVER trusted from the client — signature checked server-side.
 */
export declare const attendanceTokenDtoSchema: z.ZodObject<{
    payload: z.ZodString;
    expiresSec: z.ZodNumber;
    rotateEverySec: z.ZodNumber;
    jobPublicId: z.ZodString;
    workDate: z.ZodString;
}, z.core.$strip>;
export type AttendanceTokenDto = z.infer<typeof attendanceTokenDtoSchema>;
export declare const attendanceCheckSchema: z.ZodObject<{
    payload: z.ZodString;
    action: z.ZodEnum<{
        IN: "IN";
        OUT: "OUT";
    }>;
    lat: z.ZodOptional<z.ZodNumber>;
    lng: z.ZodOptional<z.ZodNumber>;
    workerPublicId: z.ZodOptional<z.ZodString>;
    workDate: z.ZodOptional<z.ZodString>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type AttendanceCheck = z.infer<typeof attendanceCheckSchema>;
export declare const attendanceRecordDtoSchema: z.ZodObject<{
    publicId: z.ZodString;
    status: z.ZodEnum<{
        NOT_STARTED: "NOT_STARTED";
        CHECKED_IN: "CHECKED_IN";
        CHECKED_OUT: "CHECKED_OUT";
        APPROVED: "APPROVED";
        NO_SHOW: "NO_SHOW";
    }>;
    workDate: z.ZodString;
    checkInAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    checkOutAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    checkSource: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        SCAN: "SCAN";
        EMPLOYER: "EMPLOYER";
        CORRECTED: "CORRECTED";
    }>>>;
    durationMinutes: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    worker: z.ZodObject<{
        publicId: z.ZodString;
        fullName: z.ZodString;
        photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    jobPublicId: z.ZodString;
    correctionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type AttendanceRecordDto = z.infer<typeof attendanceRecordDtoSchema>;
export declare const jobAttendanceQuerySchema: z.ZodObject<{
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const rosterRowSchema: z.ZodObject<{
    worker: z.ZodObject<{
        publicId: z.ZodString;
        fullName: z.ZodString;
        photoUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        crewStatus: z.ZodEnum<{
            ACTIVE: "ACTIVE";
            COMPLETED: "COMPLETED";
            NO_SHOW: "NO_SHOW";
            RELEASED: "RELEASED";
        }>;
    }, z.core.$strip>;
    attendance: z.ZodNullable<z.ZodObject<{
        status: z.ZodEnum<{
            NOT_STARTED: "NOT_STARTED";
            CHECKED_IN: "CHECKED_IN";
            CHECKED_OUT: "CHECKED_OUT";
            APPROVED: "APPROVED";
            NO_SHOW: "NO_SHOW";
        }>;
        publicId: z.ZodString;
        workDate: z.ZodString;
        checkInAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        checkOutAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        checkSource: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            SCAN: "SCAN";
            EMPLOYER: "EMPLOYER";
            CORRECTED: "CORRECTED";
        }>>>;
        durationMinutes: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        correctionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>;
    earningStatus: z.ZodString;
}, z.core.$strip>;
export type RosterRow = z.infer<typeof rosterRowSchema>;
export declare const approveAttendanceSchema: z.ZodObject<{
    recordIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type ApproveAttendance = z.infer<typeof approveAttendanceSchema>;
export declare const correctAttendanceSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        NOT_STARTED: "NOT_STARTED";
        CHECKED_IN: "CHECKED_IN";
        CHECKED_OUT: "CHECKED_OUT";
        APPROVED: "APPROVED";
        NO_SHOW: "NO_SHOW";
    }>>;
    checkInAt: z.ZodOptional<z.ZodString>;
    checkOutAt: z.ZodOptional<z.ZodString>;
    reason: z.ZodString;
}, z.core.$strip>;
export type CorrectAttendance = z.infer<typeof correctAttendanceSchema>;
export declare const attendanceErrors: readonly ["ATTENDANCE_TOKEN_INVALID", "ATTENDANCE_TOKEN_EXPIRED", "ATTENDANCE_DUPLICATE", "ATTENDANCE_WINDOW_CLOSED", "CREW_DOUBLE_JOB", "STATE_INVALID", "NOT_OWNER", "FORBIDDEN", "NOT_FOUND"];
//# sourceMappingURL=attendance.d.ts.map
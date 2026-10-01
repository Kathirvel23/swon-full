export type AttendanceStatus = 'NOT_STARTED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'APPROVED' | 'NO_SHOW';
export interface DayWindow {
    start: number;
    end: number;
    grace: number;
    cutoff: number;
}
export declare function assertCheckInWindow(nowMinutes: number, day: DayWindow): void;
export declare function assertCheckOutWindow(nowMinutes: number, day: DayWindow): void;
export declare function computeDurationMinutes(checkInAt: string, checkOutAt: string): number;
export declare function approveEligible(status: AttendanceStatus): AttendanceStatus;
export declare function noShowDue(status: AttendanceStatus, nowMinutes: number, day: DayWindow): boolean;
export declare function assertReverseCheckIn(status: AttendanceStatus, reason?: string): void;
export declare function assertCorrect(status: AttendanceStatus, patch: {
    reason?: string;
    status?: AttendanceStatus;
    checkInAt?: string;
    checkOutAt?: string;
}): void;

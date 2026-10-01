import { type AuthenticatedRequest } from '../common/guards.js';
import { AttendanceService } from './attendance.service.js';
import type { AttendanceCheck, CorrectAttendance } from '@workbridge/contracts';
export declare class AttendanceController {
    private readonly attendance;
    constructor(attendance: AttendanceService);
    issue(req: AuthenticatedRequest, publicId: string, body: {
        date?: string;
    } | undefined): Promise<{
        data: {
            payload: string;
            expiresSec: number;
            rotateEverySec: number;
            jobPublicId: string;
            workDate: string;
        };
    }>;
    today(req: AuthenticatedRequest): Promise<{
        data: {
            token: null;
            record: null;
            job: null;
            workDate: string;
        } | {
            token: {
                payload: string;
                expiresSec: number;
                rotateEverySec: number;
                jobPublicId: string;
                workDate: string;
            };
            record: {
                publicId: string;
                status: string;
                workDate: string;
                checkInAt: string | null;
                checkOutAt: string | null;
                checkSource: "SCAN" | "EMPLOYER" | "CORRECTED" | null;
                durationMinutes: number | null;
                worker: {
                    publicId: string;
                    fullName: string;
                    photoUrl: null;
                };
                jobPublicId: string;
                correctionReason: string | null;
            };
            job: {
                publicId: string;
                title: string;
                city: string;
                areaName: string;
            };
            workDate: string;
        };
    }>;
    check(req: AuthenticatedRequest, body: AttendanceCheck): Promise<{
        data: {
            publicId: string;
            status: string;
            workDate: string;
            checkInAt: string | null;
            checkOutAt: string | null;
            checkSource: "SCAN" | "EMPLOYER" | "CORRECTED" | null;
            durationMinutes: number | null;
            worker: {
                publicId: string;
                fullName: string;
                photoUrl: null;
            };
            jobPublicId: string;
            correctionReason: string | null;
        };
    }>;
    roster(req: AuthenticatedRequest, publicId: string, date?: string): Promise<{
        data: {
            date: string;
            rows: {
                worker: {
                    publicId: string;
                    fullName: string;
                    crewStatus: "ACTIVE" | "COMPLETED" | "RELEASED" | "NO_SHOW";
                    photoUrl?: string | null | undefined;
                };
                attendance: {
                    status: "APPROVED" | "NOT_STARTED" | "CHECKED_IN" | "CHECKED_OUT" | "NO_SHOW";
                    publicId: string;
                    workDate: string;
                    checkInAt?: string | null | undefined;
                    checkOutAt?: string | null | undefined;
                    checkSource?: "EMPLOYER" | "SCAN" | "CORRECTED" | null | undefined;
                    durationMinutes?: number | null | undefined;
                    correctionReason?: string | null | undefined;
                } | null;
                earningStatus: string;
            }[];
        };
    }>;
    approve(req: AuthenticatedRequest, body: {
        recordIds: string[];
    }): Promise<{
        data: {
            approved: number;
        };
    }>;
    correct(req: AuthenticatedRequest, recordId: string, body: CorrectAttendance): Promise<{
        data: {
            publicId: string;
            status: string;
            workDate: string;
            checkInAt: string | null;
            checkOutAt: string | null;
            checkSource: "SCAN" | "EMPLOYER" | "CORRECTED" | null;
            durationMinutes: number | null;
            worker: {
                publicId: string;
                fullName: string;
                photoUrl: null;
            };
            jobPublicId: string;
            correctionReason: string | null;
        };
    }>;
}

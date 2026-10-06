import { z } from 'zod';
import { type AuthenticatedRequest } from '../common/guards.js';
import { StaffService } from './staff.service.js';
declare const markSchema: z.ZodObject<{
    workerPublicId: z.ZodString;
    status: z.ZodEnum<{
        PRESENT: "PRESENT";
        ABSENT: "ABSENT";
        NOT_MARKED: "NOT_MARKED";
    }>;
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const assignSchema: z.ZodObject<{
    workerPublicId: z.ZodString;
    incentivePct: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
type MarkInput = z.infer<typeof markSchema>;
type AssignInput = z.infer<typeof assignSchema>;
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
    myEvents(req: AuthenticatedRequest): Promise<{
        data: {
            events: {
                assignmentPublicId: string;
                role: "ATTENDANCE_MANAGER";
                incentivePct: number;
                job: {
                    publicId: string;
                    title: string;
                    startsOn: string;
                    endsOn: string;
                    city: string;
                    status: string;
                };
            }[];
        };
    }>;
    eventAttendance(publicId: string, date: string | undefined, req: AuthenticatedRequest): Promise<{
        data: {
            job: {
                publicId: string;
                title: string;
                city: string;
                areaName: string;
            };
            date: string;
            hasWorkDay: boolean;
            summary: {
                total: number;
                present: number;
                late: number;
                absent: number;
                notMarked: number;
            };
            workers: {
                worker: {
                    publicId: string;
                    fullName: string;
                    crewStatus: string;
                };
                status: import("./staff.domain.js").UiStatus;
                recordPublicId: string | null;
                checkInAt: string | null;
                checkOutAt: string | null;
                approved: boolean;
            }[];
        };
    }>;
    mark(publicId: string, body: MarkInput, req: AuthenticatedRequest): Promise<{
        data: {
            recordPublicId: string;
            status: import("./staff.domain.js").UiStatus;
        };
    }>;
    incentive(publicId: string, req: AuthenticatedRequest): Promise<{
        data: {
            basePaise: number;
            pct: number;
            incentivePaise: number;
            totalPaise: number;
            appliedPaise: number;
            currency: string;
            earningStatus: string | null;
        };
    }>;
    staffList(publicId: string, req: AuthenticatedRequest): Promise<{
        data: {
            staff: {
                worker: {
                    publicId: string;
                    fullName: string;
                };
                assignmentPublicId: string;
                incentivePct: number;
                overridden: boolean;
            }[];
        };
    }>;
    assign(publicId: string, body: AssignInput, req: AuthenticatedRequest): Promise<{
        data: {
            assignmentPublicId: string;
            worker: {
                publicId: string;
                fullName: string;
            };
            incentivePct: number;
        };
    }>;
    revoke(publicId: string, workerPublicId: string, req: AuthenticatedRequest): Promise<{
        data: {
            revoked: boolean;
        };
    }>;
    applyIncentive(publicId: string, req: AuthenticatedRequest): Promise<{
        data: {
            earningPublicId: string;
            pct: number;
            incentivePaise: number;
            totalPaise: number;
        };
    }>;
}
export {};

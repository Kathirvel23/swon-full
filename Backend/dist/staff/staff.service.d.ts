import { PrismaService } from '../prisma/prisma.service.js';
import { type UiStatus } from './staff.domain.js';
export declare class StaffService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private workerOf;
    private employerOf;
    private assertManager;
    private ownedJob;
    private defaultPct;
    myEvents(accountId: string): Promise<{
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
    }[]>;
    eventAttendance(accountId: string, jobPublicId: string, date?: string): Promise<{
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
            status: UiStatus;
            recordPublicId: string | null;
            checkInAt: string | null;
            checkOutAt: string | null;
            approved: boolean;
        }[];
    }>;
    mark(accountId: string, jobPublicId: string, input: {
        workerPublicId: string;
        status: UiStatus;
        date?: string;
    }): Promise<{
        recordPublicId: string;
        status: UiStatus;
    }>;
    incentiveFor(accountId: string, jobPublicId: string): Promise<{
        basePaise: number;
        pct: number;
        incentivePaise: number;
        totalPaise: number;
        appliedPaise: number;
        currency: string;
        earningStatus: string | null;
    }>;
    staff(accountId: string, jobPublicId: string): Promise<{
        worker: {
            publicId: string;
            fullName: string;
        };
        assignmentPublicId: string;
        incentivePct: number;
        overridden: boolean;
    }[]>;
    assign(accountId: string, jobPublicId: string, input: {
        workerPublicId: string;
        incentivePct?: number;
    }): Promise<{
        assignmentPublicId: string;
        worker: {
            publicId: string;
            fullName: string;
        };
        incentivePct: number;
    }>;
    revoke(accountId: string, jobPublicId: string, workerPublicId: string): Promise<{
        revoked: boolean;
    }>;
    applyIncentive(accountId: string, jobPublicId: string): Promise<{
        earningPublicId: string;
        pct: number;
        incentivePaise: number;
        totalPaise: number;
    }>;
}

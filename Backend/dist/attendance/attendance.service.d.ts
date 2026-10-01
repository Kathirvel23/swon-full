import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import type { AttendanceCheck, AttendanceTokenDto, CorrectAttendance } from '@workbridge/contracts';
export declare class AttendanceService implements OnModuleInit {
    private readonly prisma;
    private readonly dispatcher;
    private timer?;
    constructor(prisma: PrismaService, dispatcher: DispatcherService);
    onModuleInit(): void;
    private sign;
    private verify;
    private tokenDto;
    private jobOwned;
    private windowOf;
    private recordFor;
    private dto;
    private audit;
    issueToken(accountId: bigint, jobPublicId: string, date?: string): Promise<AttendanceTokenDto>;
    today(accountId: bigint): Promise<{
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
    }>;
    check(accountId: bigint, input: AttendanceCheck): Promise<{
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
    }>;
    roster(accountId: bigint, jobPublicId: string, date?: string): Promise<{
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
    }>;
    approve(accountId: bigint, recordIds: string[]): Promise<{
        approved: number;
    }>;
    correct(accountId: bigint, recordId: string, input: CorrectAttendance, role: 'EMPLOYER' | 'ADMIN'): Promise<{
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
    }>;
    sweep(): Promise<{
        autoClosed: number;
        noShows: number;
    }>;
}

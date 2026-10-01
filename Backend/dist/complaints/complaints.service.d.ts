import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { ComplaintCreate, ComplaintDto, ComplaintStatusUpdate } from '@workbridge/contracts';
interface Caller {
    accountId: bigint;
    role: 'worker' | 'employer' | 'admin' | null;
}
export declare class ComplaintsService {
    private readonly prisma;
    private readonly dispatcher;
    constructor(prisma: PrismaService, dispatcher: DispatcherService);
    private linkInfo;
    private assertParty;
    submit(caller: Caller, input: ComplaintCreate): Promise<ComplaintDto>;
    my(caller: Caller, status?: string): Promise<ComplaintDto[]>;
    reply(caller: Caller, publicId: string, body: string, tickets?: string[]): Promise<{
        status: string;
        repliedAt: string;
    }>;
    adminList(query: {
        status?: string;
        type?: string;
        severity?: string;
        sort?: string;
    }): Promise<{
        publicId: string;
        type: "PAYMENT" | "SAFETY" | "OTHER" | "NO_SHOW" | "HARASSMENT" | "FRAUD";
        severity: "LOW" | "MEDIUM" | "HIGH";
        status: "UNDER_REVIEW" | "OPEN" | "WAITING_ON_PARTY" | "RESOLVED" | "DISMISSED" | "CLOSED_TIMEOUT";
        narrative: string;
        events: {
            publicId: string;
            kind: "NOTE" | "PARTY_REPLY" | "STATUS_CHANGE" | "EVIDENCE";
            actor: {
                publicId: string;
                role: "EMPLOYER" | "ADMIN" | "WORKER";
                displayName: string;
            };
            createdAt: string;
            body?: string | null | undefined;
            evidenceUrl?: string | null | undefined;
        }[];
        createdAt: string;
        updatedAt: string;
        link?: {
            type: "ACCOUNT" | "JOB" | "APPLICATION" | "EARNING" | "ATTENDANCE";
            publicId: string;
        } | null | undefined;
        resolutionNote?: string | null | undefined;
        resolvedAt?: string | null | undefined;
    }[]>;
    decide(caller: Caller, publicId: string, update: ComplaintStatusUpdate): Promise<{
        publicId: string;
        status: "UNDER_REVIEW" | "WAITING_ON_PARTY" | "RESOLVED" | "DISMISSED" | "CLOSED_TIMEOUT";
    }>;
    reinstate(caller: Caller, accountPublicId: string, note: string): Promise<{
        publicId: string;
        status: string;
    }>;
    sweepTimeouts(): Promise<number>;
    private toDto;
}
export {};

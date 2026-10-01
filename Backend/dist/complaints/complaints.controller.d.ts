import { type AuthenticatedRequest } from '../common/guards.js';
import { ComplaintsService } from './complaints.service.js';
import type { ComplaintCreate, ComplaintStatusUpdate } from '@workbridge/contracts';
export declare class ComplaintsController {
    private readonly complaints;
    constructor(complaints: ComplaintsService);
    submit(req: AuthenticatedRequest, body: ComplaintCreate): Promise<{
        data: {
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
        };
    }>;
    my(req: AuthenticatedRequest, status?: string): Promise<{
        data: {
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
        }[];
    }>;
    reply(req: AuthenticatedRequest, publicId: string, body: {
        body: string;
        evidenceUploadTickets?: string[];
    }): Promise<{
        data: {
            status: string;
            repliedAt: string;
        };
    }>;
    adminList(status?: string, type?: string, severity?: string, sort?: string): Promise<{
        data: {
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
        }[];
    }>;
    decide(req: AuthenticatedRequest, publicId: string, body: ComplaintStatusUpdate): Promise<{
        data: {
            publicId: string;
            status: "UNDER_REVIEW" | "WAITING_ON_PARTY" | "RESOLVED" | "DISMISSED" | "CLOSED_TIMEOUT";
        };
    }>;
    reinstate(req: AuthenticatedRequest, publicId: string, body: {
        note: string;
    }): Promise<{
        data: {
            publicId: string;
            status: string;
        };
    }>;
}

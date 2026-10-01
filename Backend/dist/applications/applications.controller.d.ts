import { type ApplicationDecision, type ApplyInput, type BulkDecision, type CrewRosterQuery, type MyApplicationsQuery, type QueueQuery, type WithdrawInput } from '@workbridge/contracts';
import { type AuthenticatedRequest } from '../common/guards.js';
import { ApplicationsService } from './applications.service.js';
export declare class ApplicationsController {
    private readonly apps;
    constructor(apps: ApplicationsService);
    private idem;
    apply(req: AuthenticatedRequest, body: ApplyInput): Promise<{
        data: {
            publicId: string;
            status: string;
            jobId: string;
        };
    }>;
    mine(req: AuthenticatedRequest, query: MyApplicationsQuery): Promise<import("./applications.service.js").Page<unknown>>;
    withdraw(req: AuthenticatedRequest, publicId: string, body: WithdrawInput): Promise<{
        data: {
            publicId: string;
            status: "WITHDRAWN";
        };
    }>;
    queue(req: AuthenticatedRequest, publicId: string, query: QueueQuery): Promise<import("./applications.service.js").Page<unknown>>;
    decide(req: AuthenticatedRequest, publicId: string, body: ApplicationDecision): Promise<{
        data: {
            publicId: string;
            status: string;
        };
    }>;
    bulk(req: AuthenticatedRequest, body: BulkDecision): Promise<{
        data: {
            results: {
                applicationId: string;
                ok: boolean;
                code?: string | undefined;
                status?: "REJECTED" | "HIRED" | "CANCELLED" | "EXPIRED" | "APPLIED" | "SHORTLISTED" | "WAITLISTED" | "WITHDRAWN" | undefined;
            }[];
            succeeded: number;
            failed: number;
        };
    }>;
    roster(req: AuthenticatedRequest, publicId: string, query: CrewRosterQuery): Promise<{
        data: {
            items: import("@workbridge/contracts").CrewMemberDto[];
            summary: import("@workbridge/contracts").CrewRosterSummary;
        };
        meta: {
            next?: string;
        };
    }>;
}

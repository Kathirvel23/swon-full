import { PrismaService } from '../prisma/prisma.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import type { ApplicationDecision, ApplyInput, BulkDecision, BulkDecisionResult, MyApplicationsQuery, QueueQuery, WithdrawInput } from '@workbridge/contracts';
import type { CrewMemberDto, CrewRosterQuery, CrewRosterSummary } from '@workbridge/contracts';
export interface Page<T> {
    data: T[];
    meta: {
        next?: string;
    };
}
export declare class ApplicationsService {
    private readonly prisma;
    private readonly dispatcher;
    constructor(prisma: PrismaService, dispatcher: DispatcherService);
    private workerProfile;
    private employerProfile;
    private kycStatusOf;
    private kycBadges;
    private audit;
    private idem;
    private assertNoConflict;
    apply(accountId: bigint, input: ApplyInput, idempotencyKey?: string): Promise<{
        publicId: string;
        status: string;
        jobId: string;
    }>;
    mine(accountId: bigint, query: MyApplicationsQuery): Promise<Page<unknown>>;
    withdraw(accountId: bigint, publicId: string, input?: WithdrawInput): Promise<{
        publicId: string;
        status: "WITHDRAWN";
    }>;
    private notifyShortfall;
    queue(accountId: bigint, jobPublicId: string, query: QueueQuery): Promise<Page<unknown>>;
    decide(accountId: bigint, applicationPublicId: string, input: ApplicationDecision, idempotencyKey?: string): Promise<{
        publicId: string;
        status: string;
    }>;
    private decideCore;
    private hireCore;
    private releaseCore;
    bulk(accountId: bigint, input: BulkDecision): Promise<BulkDecisionResult>;
    roster(accountId: bigint, jobPublicId: string, query: CrewRosterQuery): Promise<{
        data: {
            items: CrewMemberDto[];
            summary: CrewRosterSummary;
        };
        meta: {
            next?: string;
        };
    }>;
}

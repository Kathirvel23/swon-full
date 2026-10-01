import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ApplicationsService } from '../applications/applications.service.js';
import { DispatcherService } from '../notifications/dispatcher.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { MatchResult, QuickMatchCreate, QuickMatchOfferDto, QuickMatchRespond } from '@workbridge/contracts';
interface Caller {
    accountId: bigint;
    role: 'worker' | 'employer' | 'admin' | null;
}
export declare class MatchingService implements OnModuleInit, OnModuleDestroy {
    private readonly prisma;
    private readonly dispatcher;
    private readonly applications;
    private sweepTimer?;
    constructor(prisma: PrismaService, dispatcher: DispatcherService, applications: ApplicationsService);
    onModuleInit(): void;
    onModuleDestroy(): void;
    private sweepExpiring;
    private idem;
    private jobCtx;
    private assertOwner;
    private scoreWorker;
    candidates(caller: Caller, jobPublicId: string, query: {
        limit?: unknown;
        includeApplied?: unknown;
    }): Promise<MatchResult>;
    private lastCompletedByWorker;
    private availableInWindow;
    launch(caller: Caller, input: QuickMatchCreate, idemKey?: string): Promise<{
        created: number;
        skipped: number;
        waveNo: number;
        respondBy: string;
    }>;
    private launchInner;
    private jobStatus;
    myOffers(caller: Caller, status?: string): Promise<QuickMatchOfferDto[]>;
    availability(caller: Caller, jobPublicId: string, radiusKmRaw?: number): Promise<{
        jobPublicId: string;
        radiusKm: number;
        availableNearby: number;
        matchingSkills: number;
        currentlyWorking: number;
        potentialMatches: number;
        bands: {
            band: string;
            count: number;
        }[];
    }>;
    respond(caller: Caller, offerPublicId: string, body: QuickMatchRespond): Promise<{
        status: "ACCEPTED";
        application: {
            publicId: string;
            status: string;
        };
    } | {
        status: "DECLINED";
        application: null;
    }>;
}
export {};

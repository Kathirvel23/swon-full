import { PrismaService } from '../prisma/prisma.service.js';
import type { RatingCreate, RatingDto, RatingSummary } from '@workbridge/contracts';
interface Caller {
    accountId: bigint;
    role: 'worker' | 'employer' | 'admin' | null;
}
export declare class RatingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(caller: Caller, input: RatingCreate): Promise<RatingDto>;
    summary(caller: Caller): Promise<RatingSummary>;
    pending(caller: Caller): Promise<{
        jobPublicId: string;
        jobTitle: string;
        ratee: {
            publicId: string;
            displayName: string;
        };
        rateeRole: "WORKER" | "EMPLOYER";
    }[]>;
    private pendingRows;
    list(caller: Caller, scope: 'received' | 'given'): Promise<RatingDto[]>;
    private refreshAggregate;
    private toDto;
    private accountName;
}
export {};

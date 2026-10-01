import type { EventKey } from '@workbridge/contracts';
import { PrismaService } from '../prisma/prisma.service.js';
export interface EnqueueInput {
    eventKey: EventKey;
    recipientAccountIds: bigint[];
    contextType?: 'JOB' | 'APPLICATION' | 'EARNING' | 'KYC' | 'COMPLAINT' | 'ACCOUNT';
    contextPublicId?: string;
    args?: Record<string, string | number | boolean>;
}
export declare class DispatcherService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    enqueue(input: EnqueueInput): Promise<void>;
    dispatchPending(limit?: number): Promise<number>;
}

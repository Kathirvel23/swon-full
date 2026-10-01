import { PrismaService } from '../prisma/prisma.service.js';
import type { WelfareItemDto } from '@workbridge/contracts';
export declare class WelfareService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private deriveCategory;
    catalog(activeOnly: boolean): Promise<WelfareItemDto[]>;
}

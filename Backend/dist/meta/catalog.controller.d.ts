import type { CatalogOutput } from '@workbridge/contracts';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class CatalogController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCatalog(): Promise<{
        data: CatalogOutput;
    }>;
}

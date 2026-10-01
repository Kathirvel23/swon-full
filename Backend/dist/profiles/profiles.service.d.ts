import type { AvailabilityPut, OrgDto, MeDto, OnboardInput, OrgPatch, SkillsInput, WorkerProfileDto, WorkerProfilePatch } from '@workbridge/contracts';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class ProfilesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    me(accountId: bigint, photoUrlBase?: string): Promise<MeDto>;
    onboard(accountId: bigint, input: OnboardInput): Promise<{
        role: string;
    }>;
    patchWorker(accountId: bigint, patch: WorkerProfilePatch): Promise<WorkerProfileDto>;
    patchOrg(accountId: bigint, patch: OrgPatch): Promise<OrgDto>;
    putSkills(accountId: bigint, input: SkillsInput): Promise<WorkerProfileDto>;
    putAvailability(accountId: bigint, input: AvailabilityPut): Promise<WorkerProfileDto>;
    setPhoto(accountId: bigint, storageKey: string): Promise<WorkerProfileDto>;
    savePhoto(accountId: bigint, file: {
        mimetype: string;
        buffer: Buffer;
    }): Promise<{
        storageKey: string;
    }>;
    private requireWorkerProfile;
    private resolveAreaId;
    private recomputeWorkerPct;
}

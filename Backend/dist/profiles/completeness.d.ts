export interface WorkerCompletenessInput {
    fullName: string | null | undefined;
    photoStorageKey: string | null | undefined;
    areaId: string | bigint | null | undefined;
    bio: string | null | undefined;
    experienceYears: number | null | undefined;
    skillsCount: number;
    availabilityCount: number;
}
export declare function computeWorkerCompletePct(i: WorkerCompletenessInput): number;
export interface EmployerCompletenessInput {
    orgName: string | null | undefined;
    orgType: string | null | undefined;
    contactName: string | null | undefined;
    city: string | null | undefined;
    areaId: string | bigint | null | undefined;
    addressLine: string | null | undefined;
}
export declare function computeEmployerCompletePct(i: EmployerCompletenessInput): number;

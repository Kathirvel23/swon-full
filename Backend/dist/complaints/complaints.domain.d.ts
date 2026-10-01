export type ComplaintActor = 'WORKER' | 'EMPLOYER' | 'ADMIN' | 'SYSTEM';
export declare function assertTransition(from: string, to: string, actor: ComplaintActor): void;
export declare function canReopen(reopenCount: number): boolean;
export interface LinkParties {
    employerAccountId: bigint;
    partyAccountIds: bigint[];
}
export declare function isPartyOfLink(link: LinkParties | null, callerAccountId: bigint): boolean;
export declare function rateLimitOk(countLast24h: number, cap?: number): boolean;
export declare function holdEligible(status: string): boolean;
export declare function releaseTarget(): 'APPROVED';

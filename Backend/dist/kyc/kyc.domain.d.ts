export type KycStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';
export declare function normalizeId(raw: string): string;
export declare function maskIdNumber(id: string): string;
export declare function idNumberHmac(id: string, secret: string): string;
export declare function encryptIdNumber(id: string, secret: string): Uint8Array<ArrayBuffer>;
export declare function decryptIdNumber(blob: Buffer, secret: string): string;
export declare function assertCanCreate(current: KycStatus | null, attempts: number, maxAttempts: number): KycStatus;
export declare function assertSubmittable(input: {
    status: KycStatus;
    docCount: number;
    consentGranted: boolean;
    attempts: number;
    maxAttempts: number;
}): KycStatus;
export declare function assertPicks(status: KycStatus): KycStatus;
export declare function assertDecidable(status: KycStatus, input: {
    decision: 'VERIFIED' | 'REJECTED';
    reason?: string;
    idNumberMatched: boolean;
}): KycStatus;
export declare function gateAllows(kycStatus: string | null | undefined, _gate: 'HIRE' | 'PUBLISH'): boolean;
export declare function docRules(mime: string, bytes: number, maxBytes: number): true;

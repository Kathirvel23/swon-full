export interface OtpChallengeRow {
    id: string;
    phone: string;
    purpose: 'LOGIN';
    codeHash: string;
    attempts: number;
    maxAttempts: number;
    expiresAt: Date;
    cooldownUntil: Date | null;
    consumedAt: Date | null;
}
export interface OtpStore {
    findActiveByPhone(phone: string, purpose: 'LOGIN'): Promise<OtpChallengeRow | null>;
    findById(id: string): Promise<OtpChallengeRow | null>;
    create(data: {
        id: string;
        phone: string;
        purpose: 'LOGIN';
        codeHash: string;
        maxAttempts: number;
        expiresAt: Date;
        cooldownUntil: Date;
    }): Promise<OtpChallengeRow>;
    update(id: string, data: Partial<Pick<OtpChallengeRow, 'attempts' | 'consumedAt' | 'codeHash' | 'expiresAt'>>): Promise<OtpChallengeRow>;
}
export interface OtpServiceOpts {
    cooldownSec: number;
    ttlSec: number;
    maxAttempts: number;
    sim: boolean;
    hashSecret: string;
}
export declare class OtpService {
    readonly store: OtpStore;
    private readonly opts;
    constructor(store: OtpStore, opts: OtpServiceOpts);
    request(phone: string, onCode?: (code: string) => Promise<void>): Promise<{
        challengeId: string;
        cooldownSec: number;
        expiresSec: number;
        devCode?: string;
    }>;
    verify(challengeId: string, code: string): Promise<{
        ok: true;
        phone: string;
    }>;
}

export interface AccessClaims {
    sub: string;
    publicId: string;
    role: 'worker' | 'employer' | 'admin' | null;
    sid: string;
}
export interface SessionStore {
    findByRefreshHash(hash: string): Promise<SessionRow | null>;
    findById(id: string): Promise<SessionRow | null>;
    create(data: {
        id: string;
        accountId: string;
        refreshTokenHash: string;
        userAgent: string | null;
        ipHash: string | null;
        familyId: string;
        issuedAt: Date;
        expiresAt: Date;
    }): Promise<SessionRow>;
    revoke(id: string, rotated?: boolean): Promise<void>;
    revokeFamily(familyId: string): Promise<void>;
    revokeAllForAccount(accountId: string): Promise<void>;
}
export interface SessionRow {
    id: string;
    accountId?: string;
    refreshTokenHash: string;
    userAgent: string | null;
    ipHash: string | null;
    familyId: string;
    issuedAt: Date;
    expiresAt: Date;
    revokedAt: Date | null;
    lastUsedAt: Date | null;
}
export interface TokenServiceOpts {
    accessSecret: string;
    accessTtlSec: number;
    refreshTtlDays: number;
}
export declare class TokenService {
    private readonly store;
    private readonly opts;
    private readonly key;
    constructor(store: SessionStore, opts: TokenServiceOpts);
    signAccessToken(input: {
        accountId: string;
        publicId: string;
        role: 'worker' | 'employer' | 'admin' | null;
        sessionId: string;
    }, override?: {
        ttlSec?: number;
    }): Promise<string>;
    verifyAccessToken(token: string): Promise<AccessClaims>;
    issueSession(input: {
        accountId: string;
        userAgent?: string | null;
        ip?: string | null;
    }): Promise<{
        refreshToken: string;
        session: SessionRow;
    }>;
    rotateRefresh(refreshToken: string, ctx: {
        userAgent?: string | null;
        ip?: string | null;
    }): Promise<{
        refreshToken: string;
        session: SessionRow;
    }>;
    revokeByRefreshToken(refreshToken: string): Promise<void>;
    revokeSession(sessionId: string): Promise<void>;
    revokeAllSessions(accountId: string): Promise<void>;
}

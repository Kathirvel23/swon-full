import type { PrismaService } from '../prisma/prisma.service.js';
import type { OtpChallengeRow, OtpStore } from './otp.service.js';
import type { SessionRow, SessionStore } from './token.service.js';
export declare class PrismaOtpStore implements OtpStore {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private map;
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
export declare class PrismaSessionStore implements SessionStore {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private map;
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

import { ConfigService } from '@nestjs/config';
import type { AccountSummary, SessionDto } from '@workbridge/contracts';
import { PrismaService } from '../prisma/prisma.service.js';
import { OtpService } from './otp.service.js';
import { type SmsPort } from './sms.service.js';
import { TokenService } from './token.service.js';
export interface RequestMeta {
    ip?: string | null;
    userAgent?: string | null;
    requestId?: string | null;
}
export declare class AuthService {
    private readonly prisma;
    private readonly otp;
    private readonly tokens;
    private readonly sms;
    private readonly config;
    private readonly rateBuckets;
    constructor(prisma: PrismaService, otp: OtpService, tokens: TokenService, sms: SmsPort, config: ConfigService);
    requestOtp(phone: string, meta: RequestMeta): Promise<{
        challengeId: string;
        cooldownSec: number;
        expiresSec: number;
        devCode?: string;
    }>;
    verifyOtp(challengeId: string, code: string, meta: RequestMeta): Promise<{
        accessToken: string;
        refreshToken: string;
        tokenType: "Bearer";
        expiresInSec: number;
        account: {
            publicId: string;
            role: "worker" | "employer" | "admin" | null;
            status: "PENDING_VERIFICATION" | "ACTIVE" | "SUSPENDED" | "CLOSED";
            phoneMasked: string;
            isNewAccount: boolean;
            profileCompletePct: number;
            kycStatus: "DRAFT" | "REJECTED" | "SUBMITTED" | "UNDER_REVIEW" | "VERIFIED" | "NONE";
        };
    }>;
    refresh(refreshToken: string, meta: RequestMeta): Promise<{
        accessToken: string;
        refreshToken: string;
        tokenType: "Bearer";
        expiresInSec: number;
        rotated: true;
    }>;
    logout(input: {
        refreshToken?: string;
        allDevices?: boolean;
    }, auth: {
        accountId: string;
        sessionId: string;
    }): Promise<{
        ok: boolean;
    }>;
    listSessions(accountId: string, currentSessionId: string): Promise<SessionDto[]>;
    revokeSession(accountId: string, sessionPublicId: string): Promise<{
        ok: boolean;
    }>;
    private assertLoginAllowed;
    summary(accountId: bigint, isNewAccount?: boolean): Promise<AccountSummary>;
    private checkRate;
}

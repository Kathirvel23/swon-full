import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { type AuthenticatedRequest } from '../common/guards.js';
import { AuthService } from './auth.service.js';
export declare class AuthController {
    private readonly auth;
    private readonly config;
    constructor(auth: AuthService, config: ConfigService);
    requestOtp(body: {
        phone: string;
    }, req: Request): Promise<{
        data: Record<string, unknown>;
    }>;
    verifyOtp(body: {
        challengeId: string;
        code: string;
    }, req: Request): Promise<{
        data: {
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
        };
    }>;
    refresh(body: {
        refreshToken: string;
    }, req: Request): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            tokenType: "Bearer";
            expiresInSec: number;
            rotated: true;
        };
    }>;
    logout(body: {
        refreshToken?: string;
        allDevices?: boolean;
    }, req: AuthenticatedRequest): Promise<{
        data: {
            ok: boolean;
        };
    }>;
    listSessions(req: AuthenticatedRequest): Promise<{
        data: {
            sessions: {
                publicId: string;
                issuedAt: string;
                current: boolean;
                userAgent?: string | null | undefined;
                lastUsedAt?: string | null | undefined;
            }[];
        };
    }>;
    revokeSession(params: {
        publicId: string;
    }, req: AuthenticatedRequest): Promise<{
        data: {
            ok: boolean;
        };
    }>;
}

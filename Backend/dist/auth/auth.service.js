var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiError } from '../common/api-error.js';
import { maskPhone, sha256Hex } from '../common/crypto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { computeEmployerCompletePct } from '../profiles/completeness.js';
import { OtpService } from './otp.service.js';
import { SMS_PORT } from './sms.service.js';
import { TokenService } from './token.service.js';
let AuthService = class AuthService {
    prisma;
    otp;
    tokens;
    sms;
    config;
    rateBuckets = new Map();
    constructor(prisma, otp, tokens, sms, config) {
        this.prisma = prisma;
        this.otp = otp;
        this.tokens = tokens;
        this.sms = sms;
        this.config = config;
    }
    async requestOtp(phone, meta) {
        this.checkRate(meta.ip ?? 'unknown');
        return this.otp.request(phone, (code) => this.sms.sendOtp(phone, code));
    }
    async verifyOtp(challengeId, code, meta) {
        const { phone } = await this.otp.verify(challengeId, code);
        let account = await this.prisma.account.findUnique({ where: { phone } });
        let isNewAccount = false;
        const adminPhones = this.config.get('admin.phones') ?? [];
        const isAdminPhone = adminPhones.includes(phone);
        if (!account) {
            account = await this.prisma.account.create({
                data: {
                    phone,
                    phoneVerifiedAt: new Date(),
                    lastLoginAt: new Date(),
                    ...(isAdminPhone ? { role: 'admin' } : {}),
                },
            });
            isNewAccount = true;
            await this.prisma.notification.create({
                data: {
                    recipientAccountId: account.id,
                    eventKey: 'ACCOUNT_WELCOME',
                    titleKey: 'event.account_welcome',
                    contextType: 'ACCOUNT',
                    contextPublicId: account.publicId,
                },
            });
        }
        else {
            this.assertLoginAllowed(account.status);
            const grant = isAdminPhone && account.role !== 'admin' ? { role: 'admin' } : {};
            await this.prisma.account.update({
                where: { id: account.id },
                data: { lastLoginAt: new Date(), phoneVerifiedAt: account.phoneVerifiedAt ?? new Date(), ...grant },
            });
            account = { ...account, lastLoginAt: new Date(), ...grant };
        }
        await this.prisma.auditLog.create({
            data: {
                actorAccountId: account.id,
                actorRole: account.role,
                action: isNewAccount ? 'ACCOUNT_REGISTERED' : 'ACCOUNT_LOGIN',
                entityType: 'ACCOUNT',
                entityPublicId: account.publicId,
                requestId: meta.requestId ?? null,
                ipHash: meta.ip ? sha256Hex(meta.ip) : null,
            },
        });
        const { refreshToken, session } = await this.tokens.issueSession({
            accountId: account.id.toString(),
            userAgent: meta.userAgent,
            ip: meta.ip,
        });
        const accessToken = await this.tokens.signAccessToken({
            accountId: account.id.toString(),
            publicId: account.publicId,
            role: account.role ?? null,
            sessionId: session.id,
        });
        return {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresInSec: this.config.get('auth.accessTtlSec') ?? 900,
            account: await this.summary(account.id, isNewAccount),
        };
    }
    async refresh(refreshToken, meta) {
        const rotated = await this.tokens.rotateRefresh(refreshToken, meta);
        const session = rotated.session;
        const account = await this.prisma.account.findUnique({
            where: { id: BigInt(session.accountId ?? '0') },
        });
        if (!account)
            throw new ApiError('TOKEN_INVALID', 'Session account missing');
        this.assertLoginAllowed(account.status);
        const accessToken = await this.tokens.signAccessToken({
            accountId: account.id.toString(),
            publicId: account.publicId,
            role: account.role ?? null,
            sessionId: session.id,
        });
        return {
            accessToken,
            refreshToken: rotated.refreshToken,
            tokenType: 'Bearer',
            expiresInSec: this.config.get('auth.accessTtlSec') ?? 900,
            rotated: true,
        };
    }
    async logout(input, auth) {
        if (input.allDevices) {
            await this.tokens.revokeAllSessions(auth.accountId);
        }
        else if (input.refreshToken) {
            await this.tokens.revokeByRefreshToken(input.refreshToken);
        }
        else {
            await this.tokens.revokeSession(auth.sessionId);
        }
        return { ok: true };
    }
    async listSessions(accountId, currentSessionId) {
        const rows = await this.prisma.session.findMany({
            where: { accountId: BigInt(accountId), revokedAt: null, expiresAt: { gt: new Date() } },
            orderBy: { issuedAt: 'desc' },
        });
        return rows.map((row) => ({
            publicId: row.publicId,
            userAgent: row.userAgent,
            issuedAt: row.issuedAt.toISOString(),
            lastUsedAt: row.lastUsedAt ? row.lastUsedAt.toISOString() : null,
            current: row.publicId === currentSessionId,
        }));
    }
    async revokeSession(accountId, sessionPublicId) {
        const row = await this.prisma.session.findUnique({ where: { publicId: sessionPublicId } });
        if (!row || row.accountId.toString() !== accountId) {
            throw new ApiError('NOT_FOUND', 'Session not found');
        }
        await this.tokens.revokeSession(sessionPublicId);
        return { ok: true };
    }
    assertLoginAllowed(status) {
        if (status === 'SUSPENDED')
            throw new ApiError('ACCOUNT_SUSPENDED', 'Account suspended — contact support');
        if (status === 'CLOSED')
            throw new ApiError('ACCOUNT_CLOSED', 'Account closed');
    }
    async summary(accountId, isNewAccount = false) {
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            include: {
                workerProfile: { include: { skills: true, availability: true } },
                employerProfile: true,
            },
        });
        if (!account)
            throw new ApiError('NOT_FOUND', 'Account not found');
        let profileCompletePct = 0;
        if (account.workerProfile) {
            profileCompletePct = account.workerProfile.profileCompletePct;
        }
        else if (account.employerProfile) {
            profileCompletePct = computeEmployerCompletePct(account.employerProfile);
        }
        const kyc = await this.prisma.kycSubmission.findFirst({
            where: { accountId: account.id },
            orderBy: { createdAt: 'desc' },
            select: { status: true },
        });
        return {
            publicId: account.publicId,
            role: account.role ?? null,
            status: account.status,
            phoneMasked: maskPhone(account.phone),
            isNewAccount,
            profileCompletePct,
            kycStatus: (kyc?.status ?? 'NONE'),
        };
    }
    checkRate(ip, max = 10, windowMs = 60_000) {
        const now = Date.now();
        const recent = (this.rateBuckets.get(ip) ?? []).filter((t) => now - t < windowMs);
        if (recent.length >= max) {
            throw new ApiError('RATE_LIMITED', 'Too many requests from this device — try again in a minute');
        }
        recent.push(now);
        this.rateBuckets.set(ip, recent);
    }
};
AuthService = __decorate([
    Injectable(),
    __param(3, Inject(SMS_PORT)),
    __metadata("design:paramtypes", [PrismaService,
        OtpService,
        TokenService, Object, ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map
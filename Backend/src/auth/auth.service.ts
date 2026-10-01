import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AccountSummary, SessionDto } from '@workbridge/contracts';

import { ApiError } from '../common/api-error.js';
import { maskPhone, sha256Hex } from '../common/crypto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { computeEmployerCompletePct } from '../profiles/completeness.js';
import { OtpService } from './otp.service.js';
import { SMS_PORT, type SmsPort } from './sms.service.js';
import { TokenService } from './token.service.js';

export interface RequestMeta {
  ip?: string | null;
  userAgent?: string | null;
  requestId?: string | null;
}

/**
 * Auth orchestration (§11.1 verify → §14 /auth routes): find-or-create the
 * account on first login, mint rotating sessions, enforce account status
 * (SUSPENDED/CLOSED cannot obtain tokens), write audit + welcome notification.
 */
@Injectable()
export class AuthService {
  private readonly rateBuckets = new Map<string, number[]>(); // in-memory IP window (§23)

  constructor(
    private readonly prisma: PrismaService,
    private readonly otp: OtpService,
    private readonly tokens: TokenService,
    @Inject(SMS_PORT) private readonly sms: SmsPort,
    private readonly config: ConfigService,
  ) {}

  async requestOtp(phone: string, meta: RequestMeta) {
    this.checkRate(meta.ip ?? 'unknown');
    return this.otp.request(phone, (code) => this.sms.sendOtp(phone, code));
  }

  async verifyOtp(challengeId: string, code: string, meta: RequestMeta) {
    const { phone } = await this.otp.verify(challengeId, code);

    let account = await this.prisma.account.findUnique({ where: { phone } });
    let isNewAccount = false;

    // Admin bootstrap (#4 CONFIRMED): phones on ADMIN_PHONES get role admin
    // server-side at every login — no separate password system (§15).
    const adminPhones = this.config.get<string[]>('admin.phones') ?? [];
    const isAdminPhone = adminPhones.includes(phone);

    if (!account) {
      account = await this.prisma.account.create({
        data: {
          phone,
          phoneVerifiedAt: new Date(),
          lastLoginAt: new Date(),
          ...(isAdminPhone ? { role: 'admin' as const } : {}),
        },
      });
      isNewAccount = true;
      // H1 DoD: welcome (in-app) on registration
      await this.prisma.notification.create({
        data: {
          recipientAccountId: account.id,
          eventKey: 'ACCOUNT_WELCOME',
          titleKey: 'event.account_welcome',
          contextType: 'ACCOUNT',
          contextPublicId: account.publicId,
        },
      });
    } else {
      this.assertLoginAllowed(account.status);
      const grant = isAdminPhone && account.role !== 'admin' ? { role: 'admin' as const } : {};
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
      role: (account.role as AccountSummary['role']) ?? null,
      sessionId: session.id,
    });

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer' as const,
      expiresInSec: this.config.get<number>('auth.accessTtlSec') ?? 900,
      account: await this.summary(account.id, isNewAccount),
    };
  }

  async refresh(refreshToken: string, meta: RequestMeta) {
    const rotated = await this.tokens.rotateRefresh(refreshToken, meta);
    const session = rotated.session;
    const account = await this.prisma.account.findUnique({
      where: { id: BigInt(session.accountId ?? '0') },
    });
    if (!account) throw new ApiError('TOKEN_INVALID', 'Session account missing');
    this.assertLoginAllowed(account.status);

    const accessToken = await this.tokens.signAccessToken({
      accountId: account.id.toString(),
      publicId: account.publicId,
      role: (account.role as AccountSummary['role']) ?? null,
      sessionId: session.id,
    });
    return {
      accessToken,
      refreshToken: rotated.refreshToken, // NEW token — the old one is now dead
      tokenType: 'Bearer' as const,
      expiresInSec: this.config.get<number>('auth.accessTtlSec') ?? 900,
      rotated: true as const,
    };
  }

  async logout(
    input: { refreshToken?: string; allDevices?: boolean },
    auth: { accountId: string; sessionId: string },
  ) {
    if (input.allDevices) {
      await this.tokens.revokeAllSessions(auth.accountId);
    } else if (input.refreshToken) {
      await this.tokens.revokeByRefreshToken(input.refreshToken);
    } else {
      await this.tokens.revokeSession(auth.sessionId);
    }
    return { ok: true };
  }

  async listSessions(accountId: string, currentSessionId: string): Promise<SessionDto[]> {
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

  async revokeSession(accountId: string, sessionPublicId: string) {
    const row = await this.prisma.session.findUnique({ where: { publicId: sessionPublicId } });
    if (!row || row.accountId.toString() !== accountId) {
      throw new ApiError('NOT_FOUND', 'Session not found');
    }
    await this.tokens.revokeSession(sessionPublicId);
    return { ok: true };
  }

  private assertLoginAllowed(status: string): void {
    if (status === 'SUSPENDED') throw new ApiError('ACCOUNT_SUSPENDED', 'Account suspended — contact support');
    if (status === 'CLOSED') throw new ApiError('ACCOUNT_CLOSED', 'Account closed');
  }

  /** AccountSummary per contracts — shared by verify/refresh responses. */
  async summary(accountId: bigint, isNewAccount = false): Promise<AccountSummary> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: {
        workerProfile: { include: { skills: true, availability: true } },
        employerProfile: true,
      },
    });
    if (!account) throw new ApiError('NOT_FOUND', 'Account not found');

    let profileCompletePct = 0;
    if (account.workerProfile) {
      profileCompletePct = account.workerProfile.profileCompletePct;
    } else if (account.employerProfile) {
      profileCompletePct = computeEmployerCompletePct(account.employerProfile);
    }

    const kyc = await this.prisma.kycSubmission.findFirst({
      where: { accountId: account.id },
      orderBy: { createdAt: 'desc' },
      select: { status: true },
    });

    return {
      publicId: account.publicId,
      role: (account.role as AccountSummary['role']) ?? null,
      status: account.status as AccountSummary['status'],
      phoneMasked: maskPhone(account.phone),
      isNewAccount,
      profileCompletePct,
      kycStatus: (kyc?.status ?? 'NONE') as AccountSummary['kycStatus'],
    };
  }

  /** Sliding-window per-IP limit for OTP requests — 10/min, in-memory (§23). */
  private checkRate(ip: string, max = 10, windowMs = 60_000): void {
    const now = Date.now();
    const recent = (this.rateBuckets.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      throw new ApiError('RATE_LIMITED', 'Too many requests from this device — try again in a minute');
    }
    recent.push(now);
    this.rateBuckets.set(ip, recent);
  }
}

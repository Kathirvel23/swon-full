import type { PrismaService } from '../prisma/prisma.service.js';
import type { OtpChallengeRow, OtpStore } from './otp.service.js';
import type { SessionRow, SessionStore } from './token.service.js';

/**
 * Prisma-backed adapters for the auth stores. Identity everywhere is the
 * publicId (cuid) the API exposes — internal BigInt ids never leak.
 */

export class PrismaOtpStore implements OtpStore {
  constructor(private readonly prisma: PrismaService) {}

  private map(row: {
    publicId: string;
    phone: string;
    purpose: string;
    codeHash: string;
    attempts: number;
    maxAttempts: number;
    expiresAt: Date;
    cooldownUntil: Date | null;
    consumedAt: Date | null;
  }): OtpChallengeRow {
    return {
      id: row.publicId,
      phone: row.phone,
      purpose: 'LOGIN',
      codeHash: row.codeHash,
      attempts: row.attempts,
      maxAttempts: row.maxAttempts,
      expiresAt: row.expiresAt,
      cooldownUntil: row.cooldownUntil,
      consumedAt: row.consumedAt,
    };
  }

  async findActiveByPhone(phone: string, purpose: 'LOGIN'): Promise<OtpChallengeRow | null> {
    const row = await this.prisma.otpChallenge.findFirst({
      where: { phone, purpose, consumedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return row ? this.map(row) : null;
  }

  async findById(id: string): Promise<OtpChallengeRow | null> {
    const row = await this.prisma.otpChallenge.findUnique({ where: { publicId: id } });
    return row ? this.map(row) : null;
  }

  async create(data: {
    id: string;
    phone: string;
    purpose: 'LOGIN';
    codeHash: string;
    maxAttempts: number;
    expiresAt: Date;
    cooldownUntil: Date;
  }): Promise<OtpChallengeRow> {
    const row = await this.prisma.otpChallenge.create({
      data: {
        publicId: data.id,
        phone: data.phone,
        purpose: data.purpose,
        codeHash: data.codeHash,
        maxAttempts: data.maxAttempts,
        expiresAt: data.expiresAt,
        cooldownUntil: data.cooldownUntil,
      },
    });
    return this.map(row);
  }

  async update(
    id: string,
    data: Partial<Pick<OtpChallengeRow, 'attempts' | 'consumedAt' | 'codeHash' | 'expiresAt'>>,
  ): Promise<OtpChallengeRow> {
    const row = await this.prisma.otpChallenge.update({ where: { publicId: id }, data });
    return this.map(row);
  }
}

export class PrismaSessionStore implements SessionStore {
  constructor(private readonly prisma: PrismaService) {}

  private map(row: {
    publicId: string;
    accountId: bigint;
    refreshTokenHash: string;
    familyId: string;
    userAgent: string | null;
    ipHash: string | null;
    issuedAt: Date;
    expiresAt: Date;
    revokedAt: Date | null;
    lastUsedAt: Date | null;
  }): SessionRow {
    return {
      id: row.publicId,
      accountId: row.accountId.toString(),
      refreshTokenHash: row.refreshTokenHash,
      familyId: row.familyId,
      userAgent: row.userAgent,
      ipHash: row.ipHash,
      issuedAt: row.issuedAt,
      expiresAt: row.expiresAt,
      revokedAt: row.revokedAt,
      lastUsedAt: row.lastUsedAt,
    };
  }

  async findByRefreshHash(hash: string): Promise<SessionRow | null> {
    const row = await this.prisma.session.findUnique({ where: { refreshTokenHash: hash } });
    return row ? this.map(row) : null;
  }

  async findById(id: string): Promise<SessionRow | null> {
    const row = await this.prisma.session.findUnique({ where: { publicId: id } });
    return row ? this.map(row) : null;
  }

  async create(data: {
    id: string;
    accountId: string;
    refreshTokenHash: string;
    userAgent: string | null;
    ipHash: string | null;
    familyId: string;
    issuedAt: Date;
    expiresAt: Date;
  }): Promise<SessionRow> {
    const row = await this.prisma.session.create({
      data: {
        publicId: data.id,
        accountId: BigInt(data.accountId),
        refreshTokenHash: data.refreshTokenHash,
        familyId: data.familyId,
        userAgent: data.userAgent,
        ipHash: data.ipHash,
        issuedAt: data.issuedAt,
        expiresAt: data.expiresAt,
      },
    });
    return this.map(row);
  }

  async revoke(id: string, rotated?: boolean): Promise<void> {
    await this.prisma.session.updateMany({
      where: { publicId: id, revokedAt: null },
      // lastUsedAt is stamped only for ROTATED sessions — it is the theft
      // marker used to distinguish replay (REFRESH_TOKEN_REUSED) from logout
      // (TOKEN_INVALID). See TokenService.rotateRefresh.
      data: rotated ? { revokedAt: new Date(), lastUsedAt: new Date() } : { revokedAt: new Date() },
    });
  }

  async revokeFamily(familyId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { familyId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllForAccount(accountId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { accountId: BigInt(accountId), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
}

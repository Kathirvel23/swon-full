import { jwtVerify, SignJWT } from 'jose';

import { ApiError } from '../common/api-error.js';
import { hmacish, randomToken } from '../common/crypto.js';

/**
 * Access JWT (HS256, ~15 min) + rotating opaque refresh sessions (§15).
 * Refresh tokens are stored only as SHA-256 hashes; rotation keeps the family
 * id; replay of an already-rotated token revokes the whole family (theft
 * detection) → REFRESH_TOKEN_REUSED.
 */

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

export class TokenService {
  private readonly key: Uint8Array;

  constructor(
    private readonly store: SessionStore,
    private readonly opts: TokenServiceOpts,
  ) {
    this.key = new TextEncoder().encode(opts.accessSecret);
  }

  async signAccessToken(
    input: { accountId: string; publicId: string; role: 'worker' | 'employer' | 'admin' | null; sessionId: string },
    override?: { ttlSec?: number },
  ): Promise<string> {
    const ttl = override?.ttlSec ?? this.opts.accessTtlSec;
    return new SignJWT({ publicId: input.publicId, role: input.role, sid: input.sessionId })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(input.accountId)
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + ttl)
      .sign(this.key);
  }

  async verifyAccessToken(token: string): Promise<AccessClaims> {
    try {
      const { payload } = await jwtVerify(token, this.key, { algorithms: ['HS256'] });
      const str = (v: unknown): string => (typeof v === 'string' ? v : '');
      return {
        sub: str(payload.sub),
        publicId: str(payload.publicId),
        role: typeof payload.role === 'string' ? (payload.role as AccessClaims['role']) : null,
        sid: str(payload.sid),
      };
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === 'ERR_JWT_EXPIRED') throw new ApiError('TOKEN_EXPIRED', 'Access token expired');
      throw new ApiError('TOKEN_INVALID', 'Invalid access token');
    }
  }
  async issueSession(input: { accountId: string; userAgent?: string | null; ip?: string | null }): Promise<{
    refreshToken: string;
    session: SessionRow;
  }> {
    const refreshToken = randomToken();
    const session = await this.store.create({
      id: `ses_${randomId()}`,
      accountId: input.accountId,
      refreshTokenHash: hmacish(refreshToken, this.opts.accessSecret),
      userAgent: input.userAgent ?? null,
      ipHash: input.ip ? hmacish(input.ip, this.opts.accessSecret) : null,
      familyId: `fam_${randomId()}`,
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + this.opts.refreshTtlDays * 86_400_000),
    });
    return { refreshToken, session };
  }

  async rotateRefresh(
    refreshToken: string,
    ctx: { userAgent?: string | null; ip?: string | null },
  ): Promise<{ refreshToken: string; session: SessionRow }> {
    const hash = hmacish(refreshToken, this.opts.accessSecret);
    const row = await this.store.findByRefreshHash(hash);
    if (!row) throw new ApiError('TOKEN_INVALID', 'Unknown refresh token');

    if (row.revokedAt) {
      // lastUsedAt is stamped ONLY on rotation (see rotate below): a revoked
      // row with it = replayed rotated token ⇒ assume theft, kill the family.
      // A revoked row without it = logged-out/revoked session ⇒ plain invalid.
      if (row.lastUsedAt) {
        await this.store.revokeFamily(row.familyId);
        throw new ApiError('REFRESH_TOKEN_REUSED', 'Session revoked — please log in again');
      }
      throw new ApiError('TOKEN_INVALID', 'Session already logged out');
    }
    if (row.expiresAt < new Date()) throw new ApiError('TOKEN_EXPIRED', 'Session expired');

    await this.store.revoke(row.id, true); // rotated = stamp lastUsedAt (theft marker)
    const next = randomToken();
    const session = await this.store.create({
      id: `ses_${randomId()}`,
      accountId: row.accountId ?? '',
      refreshTokenHash: hmacish(next, this.opts.accessSecret),
      userAgent: ctx.userAgent ?? row.userAgent,
      ipHash: ctx.ip ? hmacish(ctx.ip, this.opts.accessSecret) : row.ipHash,
      familyId: row.familyId,
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + this.opts.refreshTtlDays * 86_400_000),
    });
    return { refreshToken: next, session };
  }

  async revokeByRefreshToken(refreshToken: string): Promise<void> {
    const row = await this.store.findByRefreshHash(hmacish(refreshToken, this.opts.accessSecret));
    if (row && !row.revokedAt) await this.store.revoke(row.id);
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.store.revoke(sessionId);
  }

  async revokeAllSessions(accountId: string): Promise<void> {
    await this.store.revokeAllForAccount(accountId);
  }
}

function randomId(): string {
  const bytes = new Uint8Array(9);
  globalThis.crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString('base64url').replace(/[-_]/g, 'x').slice(0, 12);
}

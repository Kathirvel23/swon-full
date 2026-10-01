import { ApiError } from '../common/api-error.js';
import { hmacish, randomOtp, safeEqualHex } from '../common/crypto.js';

/**
 * OTP challenge mechanics (§14 /auth/otp/*, §23 rate rules, SEED platform_config):
 * 60 s cooldown · 120 s TTL · 5 attempts · SHA-256(code+secret) at rest.
 * Storage is injected so unit tests run against memory and production runs
 * against Prisma (see prisma-otp.store.ts).
 */

export interface OtpChallengeRow {
  id: string; // publicId — the challengeId the client sees
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

export class OtpService {
  constructor(
    public readonly store: OtpStore,
    private readonly opts: OtpServiceOpts,
  ) {}

  async request(
    phone: string,
    onCode?: (code: string) => Promise<void>,
  ): Promise<{ challengeId: string; cooldownSec: number; expiresSec: number; devCode?: string }> {
    const now = new Date();
    const active = await this.store.findActiveByPhone(phone, 'LOGIN');
    if (active && active.cooldownUntil && active.cooldownUntil > now) {
      const remaining = Math.ceil((active.cooldownUntil.getTime() - now.getTime()) / 1000);
      throw new ApiError('OTP_COOLDOWN', `Wait ${remaining}s before requesting another code`);
    }

    const code = randomOtp();
    const challenge = await this.store.create({
      id: `otp_${cryptoRandomSuffix()}`,
      phone,
      purpose: 'LOGIN',
      codeHash: hmacish(code, this.opts.hashSecret),
      maxAttempts: this.opts.maxAttempts,
      expiresAt: new Date(now.getTime() + this.opts.ttlSec * 1000),
      cooldownUntil: new Date(now.getTime() + this.opts.cooldownSec * 1000),
    });

    // delivery callback: the raw code leaves the service ONLY for SMS delivery
    if (onCode) await onCode(code);

    return {
      challengeId: challenge.id,
      cooldownSec: this.opts.cooldownSec,
      expiresSec: this.opts.ttlSec,
      ...(this.opts.sim ? { devCode: code } : {}),
    };
  }

  async verify(challengeId: string, code: string): Promise<{ ok: true; phone: string }> {
    const row = await this.store.findById(challengeId);
    if (!row) throw new ApiError('NOT_FOUND', 'Challenge not found');
    if (row.consumedAt) throw new ApiError('OTP_INVALID', 'Code already used');
    if (row.expiresAt < new Date()) throw new ApiError('OTP_EXPIRED', 'Code expired');
    if (row.attempts >= row.maxAttempts) throw new ApiError('OTP_MAX_ATTEMPTS', 'Too many attempts');

    const match = safeEqualHex(hmacish(code, this.opts.hashSecret), row.codeHash);
    if (!match) {
      const attempts = row.attempts + 1;
      await this.store.update(row.id, { attempts });
      if (attempts >= row.maxAttempts) throw new ApiError('OTP_MAX_ATTEMPTS', 'Too many attempts');
      throw new ApiError('OTP_INVALID', 'Incorrect code');
    }

    await this.store.update(row.id, { consumedAt: new Date() });
    return { ok: true, phone: row.phone };
  }
}

function cryptoRandomSuffix(): string {
  const bytes = new Uint8Array(9);
  globalThis.crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString('base64url').slice(0, 12);
}

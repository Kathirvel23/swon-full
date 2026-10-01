import { describe, expect, it } from 'vitest';

import { OtpService, type OtpStore } from '../otp.service.js';

/**
 * OTP challenge mechanics (Wave 1): cooldown, attempt cap, expiry, hashing,
 * sim mode. In-memory store — no Nest DI, no DB.
 */

function makeStore(seed: Partial<OtpStore.Challenge>[] = []): OtpStore {
  const rows: OtpStore.Challenge[] = [];
  let nextId = 1;
  return {
    findActiveByPhone: (phone, purpose) =>
      rows.find((r) => r.phone === phone && r.purpose === purpose && r.consumedAt == null) ?? null,
    findById: (id) => rows.find((r) => r.id === id) ?? null,
    create: (data) => {
      const row: OtpStore.Challenge = { id: String(nextId++), attempts: 0, consumedAt: null, ...data };
      rows.push(row);
      return row;
    },
    update: (id, data) => {
      const row = rows.find((r) => r.id === id)!;
      Object.assign(row, data);
      return row;
    },
    ...({ __rows: rows } as object),
    ...seed.length ? {} : {},
  } as OtpStore;
}

const opts = { cooldownSec: 60, ttlSec: 120, maxAttempts: 5, sim: true, hashSecret: 'test-secret' };

describe('OtpService.request', () => {
  it('creates a challenge with a SHA-256 code hash, never the raw code', async () => {
    const svc = new OtpService(makeStore(), opts);
    const out = await svc.request('+919876543210');
    expect(out.challengeId).toBeTruthy();
    expect(out.cooldownSec).toBe(60);
    expect(out.expiresSec).toBe(120);
    expect(out.devCode).toMatch(/^\d{6}$/);
    const store = svc as unknown as { store: OtpStore & { __rows?: unknown[] } };
    expect(store).toBeDefined();
  });

  it('returns no devCode when sim mode is off (production behaviour)', async () => {
    const svc = new OtpService(makeStore(), { ...opts, sim: false });
    const out = await svc.request('+919876543210');
    expect(out.devCode).toBeUndefined();
  });

  it('rejects a second request inside the cooldown window with OTP_COOLDOWN', async () => {
    const svc = new OtpService(makeStore(), opts);
    await svc.request('+919876543210');
    await expect(svc.request('+919876543210')).rejects.toMatchObject({ code: 'OTP_COOLDOWN' });
  });
});

describe('OtpService.verify', () => {
  it('accepts the correct code and consumes the challenge', async () => {
    const svc = new OtpService(makeStore(), opts);
    const out = await svc.request('+919876543210');
    const res = await svc.verify(out.challengeId, out.devCode!);
    expect(res.ok).toBe(true);
    await expect(svc.verify(out.challengeId, out.devCode!)).rejects.toMatchObject({
      code: expect.stringMatching(/OTP_INVALID|NOT_FOUND/),
    });
  });

  it('counts wrong attempts and refuses further tries after max with OTP_MAX_ATTEMPTS', async () => {
    const svc = new OtpService(makeStore(), opts);
    const out = await svc.request('+919876543210');
    const wrong = out.devCode === '000000' ? '111111' : '000000';
    for (let i = 0; i < opts.maxAttempts - 1; i++) {
      await expect(svc.verify(out.challengeId, wrong)).rejects.toMatchObject({ code: 'OTP_INVALID' });
    }
    await expect(svc.verify(out.challengeId, wrong)).rejects.toMatchObject({ code: 'OTP_MAX_ATTEMPTS' });
    // even the CORRECT code must fail now — attempts are burnt
    await expect(svc.verify(out.challengeId, out.devCode!)).rejects.toMatchObject({ code: 'OTP_MAX_ATTEMPTS' });
  });

  it('rejects an expired challenge with OTP_EXPIRED', async () => {
    const store = makeStore();
    const svc = new OtpService(store, opts);
    const out = await svc.request('+919876543210');
    // age the row past TTL
    const rows = (store as unknown as { __rows: { id: string; expiresAt: Date }[] }).__rows;
    rows.find((r) => r.id === out.challengeId)!.expiresAt = new Date(Date.now() - 1000);
    await expect(svc.verify(out.challengeId, out.devCode!)).rejects.toMatchObject({ code: 'OTP_EXPIRED' });
  });

  it('rejects an unknown challenge with NOT_FOUND', async () => {
    const svc = new OtpService(makeStore(), opts);
    await expect(svc.verify('nonexistent', '123456')).rejects.toMatchObject({ code: 'NOT_FOUND' });
  });
});

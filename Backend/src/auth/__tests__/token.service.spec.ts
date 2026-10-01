import { describe, expect, it } from 'vitest';

import { TokenService, type SessionRow, type SessionStore } from '../token.service.js';

/**
 * Access tokens + rotating refresh sessions (§15): rotation, theft detection
 * (reuse of a rotated token ⇒ family revoked), expiry mapping.
 */

const opts = { accessSecret: 'x'.repeat(64), accessTtlSec: 900, refreshTtlDays: 30 };

describe('TokenService access tokens', () => {
  it('signs and verifies a roundtrip with sub/publicId/role/sid', async () => {
    const svc = new TokenService({} as SessionStore, opts);
    const token = await svc.signAccessToken({
      accountId: '42',
      publicId: 'acc_test',
      role: 'worker',
      sessionId: 'ses_1',
    });
    const claims = await svc.verifyAccessToken(token);
    expect(claims.sub).toBe('42');
    expect(claims.publicId).toBe('acc_test');
    expect(claims.role).toBe('worker');
    expect(claims.sid).toBe('ses_1');
  });

  it('maps a tampered token to TOKEN_INVALID and an expired one to TOKEN_EXPIRED', async () => {
    const svc = new TokenService({} as SessionStore, opts);
    const token = await svc.signAccessToken({ accountId: '1', publicId: 'a', role: null, sessionId: 's' });
    await expect(svc.verifyAccessToken(`${token.slice(0, -3)}abc`)).rejects.toMatchObject({
      code: expect.stringMatching(/TOKEN_INVALID|TOKEN_EXPIRED/),
    });

    const expired = await svc.signAccessToken(
      { accountId: '1', publicId: 'a', role: null, sessionId: 's' },
      { ttlSec: -10 },
    );
    await expect(svc.verifyAccessToken(expired)).rejects.toMatchObject({ code: 'TOKEN_EXPIRED' });
  });
});

function makeStore(): SessionStore & { rows: SessionRow[] } {
  const rows: SessionRow[] = [];
  let n = 1;
  return {
    rows,
    findByRefreshHash: (h) => rows.find((r) => r.refreshTokenHash === h) ?? null,
    findById: (id) => rows.find((r) => r.id === id) ?? null,
    create: (data) => {
      const row: SessionRow = {
        id: `ses_${n++}`,
        revokedAt: null,
        lastUsedAt: null,
        familyId: 'fam_new',
        ...data,
      } as SessionRow;
      rows.push(row);
      return row;
    },
    revoke: (id, rotated) => {
      const row = rows.find((r) => r.id === id);
      if (row) {
        row.revokedAt = new Date();
        if (rotated) row.lastUsedAt = new Date();
      }
    },
    revokeFamily: (familyId) => {
      rows.filter((r) => r.familyId === familyId && !r.revokedAt).forEach((r) => (r.revokedAt = new Date()));
    },
  };
}

describe('TokenService refresh sessions', () => {
  it('issues a session with a hashed refresh token (never the raw value)', async () => {
    const store = makeStore();
    const svc = new TokenService(store, opts);
    const issued = await svc.issueSession({ accountId: '42', userAgent: 'test', ip: '1.2.3.4' });
    expect(issued.refreshToken.length).toBeGreaterThan(20);
    expect(store.rows[0].refreshTokenHash).not.toBe(issued.refreshToken);
    expect(store.rows[0].refreshTokenHash).toMatch(/^[0-9a-f]{64}$/);
  });

  it('rotates: valid refresh yields a new token in the same family and revokes the old row', async () => {
    const store = makeStore();
    const svc = new TokenService(store, opts);
    const first = await svc.issueSession({ accountId: '42', userAgent: 'test' });
    const second = await svc.rotateRefresh(first.refreshToken, { userAgent: 'test' });
    expect(second.refreshToken).not.toBe(first.refreshToken);
    expect(store.rows[0].revokedAt).not.toBeNull();
    expect(store.rows[1].familyId).toBe(store.rows[0].familyId);
  });

  it('theft detection: replaying an already-rotated refresh revokes the whole family (REFRESH_TOKEN_REUSED)', async () => {
    const store = makeStore();
    const svc = new TokenService(store, opts);
    const first = await svc.issueSession({ accountId: '42', userAgent: 'test' });
    await svc.rotateRefresh(first.refreshToken, { userAgent: 'test' }); // legitimate use
    await expect(svc.rotateRefresh(first.refreshToken, { userAgent: 'evil' })).rejects.toMatchObject({
      code: 'REFRESH_TOKEN_REUSED',
    });
    // every session in the family is now dead — including the newest one
    expect(store.rows.every((r) => r.revokedAt !== null)).toBe(true);
  });

  it('unknown refresh token maps to TOKEN_INVALID', async () => {
    const svc = new TokenService(makeStore(), opts);
    await expect(svc.rotateRefresh('not-a-real-token-value', {})).rejects.toMatchObject({
      code: 'TOKEN_INVALID',
    });
  });

  it('a LOGGED-OUT refresh (revoked, never rotated) is TOKEN_INVALID, not a family kill', async () => {
    const store = makeStore();
    const svc = new TokenService(store, opts);
    const first = await svc.issueSession({ accountId: '42', userAgent: 'test' });
    await svc.revokeByRefreshToken(first.refreshToken); // logout path
    await expect(svc.rotateRefresh(first.refreshToken, {})).rejects.toMatchObject({
      code: 'TOKEN_INVALID',
    });
  });
});

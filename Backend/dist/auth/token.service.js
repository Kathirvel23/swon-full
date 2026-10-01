import { jwtVerify, SignJWT } from 'jose';
import { ApiError } from '../common/api-error.js';
import { hmacish, randomToken } from '../common/crypto.js';
export class TokenService {
    store;
    opts;
    key;
    constructor(store, opts) {
        this.store = store;
        this.opts = opts;
        this.key = new TextEncoder().encode(opts.accessSecret);
    }
    async signAccessToken(input, override) {
        const ttl = override?.ttlSec ?? this.opts.accessTtlSec;
        return new SignJWT({ publicId: input.publicId, role: input.role, sid: input.sessionId })
            .setProtectedHeader({ alg: 'HS256' })
            .setSubject(input.accountId)
            .setIssuedAt()
            .setExpirationTime(Math.floor(Date.now() / 1000) + ttl)
            .sign(this.key);
    }
    async verifyAccessToken(token) {
        try {
            const { payload } = await jwtVerify(token, this.key, { algorithms: ['HS256'] });
            const str = (v) => (typeof v === 'string' ? v : '');
            return {
                sub: str(payload.sub),
                publicId: str(payload.publicId),
                role: typeof payload.role === 'string' ? payload.role : null,
                sid: str(payload.sid),
            };
        }
        catch (err) {
            const code = err.code;
            if (code === 'ERR_JWT_EXPIRED')
                throw new ApiError('TOKEN_EXPIRED', 'Access token expired');
            throw new ApiError('TOKEN_INVALID', 'Invalid access token');
        }
    }
    async issueSession(input) {
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
    async rotateRefresh(refreshToken, ctx) {
        const hash = hmacish(refreshToken, this.opts.accessSecret);
        const row = await this.store.findByRefreshHash(hash);
        if (!row)
            throw new ApiError('TOKEN_INVALID', 'Unknown refresh token');
        if (row.revokedAt) {
            if (row.lastUsedAt) {
                await this.store.revokeFamily(row.familyId);
                throw new ApiError('REFRESH_TOKEN_REUSED', 'Session revoked — please log in again');
            }
            throw new ApiError('TOKEN_INVALID', 'Session already logged out');
        }
        if (row.expiresAt < new Date())
            throw new ApiError('TOKEN_EXPIRED', 'Session expired');
        await this.store.revoke(row.id, true);
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
    async revokeByRefreshToken(refreshToken) {
        const row = await this.store.findByRefreshHash(hmacish(refreshToken, this.opts.accessSecret));
        if (row && !row.revokedAt)
            await this.store.revoke(row.id);
    }
    async revokeSession(sessionId) {
        await this.store.revoke(sessionId);
    }
    async revokeAllSessions(accountId) {
        await this.store.revokeAllForAccount(accountId);
    }
}
function randomId() {
    const bytes = new Uint8Array(9);
    globalThis.crypto.getRandomValues(bytes);
    return Buffer.from(bytes).toString('base64url').replace(/[-_]/g, 'x').slice(0, 12);
}
//# sourceMappingURL=token.service.js.map
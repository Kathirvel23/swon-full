import { ApiError } from '../common/api-error.js';
import { hmacish, randomOtp, safeEqualHex } from '../common/crypto.js';
export class OtpService {
    store;
    opts;
    constructor(store, opts) {
        this.store = store;
        this.opts = opts;
    }
    async request(phone, onCode) {
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
        if (onCode)
            await onCode(code);
        return {
            challengeId: challenge.id,
            cooldownSec: this.opts.cooldownSec,
            expiresSec: this.opts.ttlSec,
            ...(this.opts.sim ? { devCode: code } : {}),
        };
    }
    async verify(challengeId, code) {
        const row = await this.store.findById(challengeId);
        if (!row)
            throw new ApiError('NOT_FOUND', 'Challenge not found');
        if (row.consumedAt)
            throw new ApiError('OTP_INVALID', 'Code already used');
        if (row.expiresAt < new Date())
            throw new ApiError('OTP_EXPIRED', 'Code expired');
        if (row.attempts >= row.maxAttempts)
            throw new ApiError('OTP_MAX_ATTEMPTS', 'Too many attempts');
        const match = safeEqualHex(hmacish(code, this.opts.hashSecret), row.codeHash);
        if (!match) {
            const attempts = row.attempts + 1;
            await this.store.update(row.id, { attempts });
            if (attempts >= row.maxAttempts)
                throw new ApiError('OTP_MAX_ATTEMPTS', 'Too many attempts');
            throw new ApiError('OTP_INVALID', 'Incorrect code');
        }
        await this.store.update(row.id, { consumedAt: new Date() });
        return { ok: true, phone: row.phone };
    }
}
function cryptoRandomSuffix() {
    const bytes = new Uint8Array(9);
    globalThis.crypto.getRandomValues(bytes);
    return Buffer.from(bytes).toString('base64url').slice(0, 12);
}
//# sourceMappingURL=otp.service.js.map
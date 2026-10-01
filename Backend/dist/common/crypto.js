import { createHash, randomInt, timingSafeEqual } from 'node:crypto';
export const hmacish = (value, secret) => createHash('sha256').update(`${value}::${secret}`).digest('hex');
export const sha256Hex = (value) => createHash('sha256').update(value).digest('hex');
export const safeEqualHex = (a, b) => {
    const ba = Buffer.from(a, 'hex');
    const bb = Buffer.from(b, 'hex');
    return ba.length === bb.length && timingSafeEqual(ba, bb);
};
export const randomOtp = () => String(randomInt(0, 1_000_000)).padStart(6, '0');
export const randomToken = () => {
    const bytes = new Uint8Array(32);
    globalThis.crypto.getRandomValues(bytes);
    return Buffer.from(bytes).toString('base64url');
};
export const maskPhone = (phone) => {
    if (phone.length <= 6)
        return '***';
    return `${phone.slice(0, 3)}${'*'.repeat(phone.length - 7)}${phone.slice(-4)}`;
};
//# sourceMappingURL=crypto.js.map
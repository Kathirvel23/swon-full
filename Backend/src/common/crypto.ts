import { createHash, randomInt, timingSafeEqual } from 'node:crypto';

/** sha256 hex of value+secret — OTP codes and refresh tokens are never stored raw. */
export const hmacish = (value: string, secret: string): string =>
  createHash('sha256').update(`${value}::${secret}`).digest('hex');

export const sha256Hex = (value: string): string => createHash('sha256').update(value).digest('hex');

/** Constant-time hex compare (same length guaranteed by sha256). */
export const safeEqualHex = (a: string, b: string): boolean => {
  const ba = Buffer.from(a, 'hex');
  const bb = Buffer.from(b, 'hex');
  return ba.length === bb.length && timingSafeEqual(ba, bb);
};

/** Cryptographically random 6-digit OTP. */
export const randomOtp = (): string => String(randomInt(0, 1_000_000)).padStart(6, '0');

/** Cryptographically random opaque token (refresh), URL-safe. */
export const randomToken = (): string => {
  const bytes = new Uint8Array(32);
  globalThis.crypto.getRandomValues(bytes);
  return Buffer.from(bytes).toString('base64url');
};

/** +919876543210 → +91******3210 (responses never echo the full phone beyond self). */
export const maskPhone = (phone: string): string => {
  if (phone.length <= 6) return '***';
  return `${phone.slice(0, 3)}${'*'.repeat(phone.length - 7)}${phone.slice(-4)}`;
};

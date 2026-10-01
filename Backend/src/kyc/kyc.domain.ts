import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes } from 'node:crypto';

import { ApiError } from '../common/api-error.js';

/**
 * KYC domain rules — M5 state machine (Database/STATE_MACHINES.md) with the
 * owner-CONFIRMED decisions: #9 ID types (PAN/VOTER/DRIVING/PASSPORT) and
 * #10 gate policy (verify to be hired / to publish). Pure functions: no DB,
 * no HTTP — unit-tested first (RED→GREEN), orchestration lives in kyc.service.
 */

export type KycStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED';

/** Uppercase, no spaces — the form every id comparison/hashing uses. */
export function normalizeId(raw: string): string {
  return raw.trim().replace(/\s+/g, '').toUpperCase();
}

/** Masked tail per contracts example (ABCDE1234F → XXXXX1234F): last 5 visible, short ids fully masked. */
export function maskIdNumber(id: string): string {
  const clean = normalizeId(id);
  if (clean.length <= 5) return 'X'.repeat(clean.length);
  return 'X'.repeat(clean.length - 5) + clean.slice(-5);
}

/** SHA-256 HMAC of the normalized id — dup/fraud dedupe without storing plaintext keys. */
export function idNumberHmac(id: string, secret: string): string {
  return createHmac('sha256', secret).update(normalizeId(id)).digest('hex');
}

function keyFor(secret: string): Buffer {
  return createHash('sha256').update(secret).digest(); // 32 bytes for AES-256
}

/** App-layer encryption at rest (§20): iv(12) | tag(16) | ciphertext. */
export function encryptIdNumber(id: string, secret: string): Uint8Array<ArrayBuffer> {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', keyFor(secret), iv);
  const ct = Buffer.concat([cipher.update(normalizeId(id), 'utf8'), cipher.final()]);
  const raw = Buffer.concat([iv, cipher.getAuthTag(), ct]);
  const out = new Uint8Array(raw.length); // fresh ArrayBuffer-backed — Prisma Bytes wants Uint8Array<ArrayBuffer>
  out.set(raw);
  return out;
}

export function decryptIdNumber(blob: Buffer, secret: string): string {
  const iv = blob.subarray(0, 12);
  const tag = blob.subarray(12, 28);
  const ct = blob.subarray(28);
  const decipher = createDecipheriv('aes-256-gcm', keyFor(secret), iv);
  decipher.setAuthTag(tag);
  try {
    return Buffer.concat([decipher.update(ct), decipher.final()]).toString('utf8');
  } catch {
    throw new ApiError('VALIDATION_FAILED', 'Stored identity number cannot be decrypted');
  }
}

/** K0 / K5 — may this account open (or re-open) a submission? Returns target status. */
export function assertCanCreate(current: KycStatus | null, attempts: number, maxAttempts: number): KycStatus {
  if (current === null) return 'DRAFT';
  if (current === 'VERIFIED') {
    throw new ApiError('STATE_INVALID', 'Account already verified — corrections go through support');
  }
  if (current === 'REJECTED') {
    if (attempts >= maxAttempts) {
      throw new ApiError('KYC_ATTEMPT_CAP', `Verification attempts used (${maxAttempts}) — contact support`);
    }
    return 'DRAFT';
  }
  throw new ApiError('KYC_SUBMISSION_ACTIVE', 'A verification is already in progress');
}

/** K1 — DRAFT → SUBMITTED gate: docs + consent + attempt cap. */
export function assertSubmittable(input: {
  status: KycStatus;
  docCount: number;
  consentGranted: boolean;
  attempts: number;
  maxAttempts: number;
}): KycStatus {
  if (input.status !== 'DRAFT') {
    throw new ApiError('KYC_SUBMISSION_ACTIVE', 'Submission is not editable in its current state');
  }
  if (input.attempts > input.maxAttempts) {
    throw new ApiError('KYC_ATTEMPT_CAP', `Verification attempts used (${input.maxAttempts}) — contact support`);
  }
  if (input.docCount < 1) {
    throw new ApiError('DOCUMENT_REQUIRED', 'Upload at least one identity document before submitting');
  }
  if (!input.consentGranted) {
    throw new ApiError('VALIDATION_FAILED', 'Consent to the verification terms is required');
  }
  return 'SUBMITTED';
}

/** K2 — queue pick (SUBMITTED → UNDER_REVIEW). */
export function assertPicks(status: KycStatus): KycStatus {
  if (status !== 'SUBMITTED') {
    throw new ApiError('STATE_INVALID', `Cannot start review from ${status}`);
  }
  return 'UNDER_REVIEW';
}

/** K3/K4 — admin decision. VERIFIED needs the view attestation; REJECTED needs a reason. */
export function assertDecidable(
  status: KycStatus,
  input: { decision: 'VERIFIED' | 'REJECTED'; reason?: string; idNumberMatched: boolean },
): KycStatus {
  if (status !== 'SUBMITTED' && status !== 'UNDER_REVIEW') {
    throw new ApiError('STATE_INVALID', `Cannot decide a submission in ${status}`);
  }
  if (input.decision === 'VERIFIED') {
    if (input.idNumberMatched !== true) {
      throw new ApiError('VALIDATION_FAILED', 'Confirm you viewed the documents and the number matches');
    }
    return 'VERIFIED';
  }
  if (!input.reason || input.reason.trim().length < 5) {
    throw new ApiError('VALIDATION_FAILED', 'Rejection reason (≥5 chars) is required');
  }
  return 'REJECTED';
}

/** #10 CONFIRMED gate policy: browse/apply free; VERIFIED unlocks hire/publish. */
export function gateAllows(kycStatus: string | null | undefined, _gate: 'HIRE' | 'PUBLISH'): boolean {
  return kycStatus === 'VERIFIED';
}

/** K1 document rules: images only, within the size cap. */
export function docRules(mime: string, bytes: number, maxBytes: number): true {
  if (!mime.toLowerCase().startsWith('image/')) {
    throw new ApiError('FILE_TYPE_NOT_ALLOWED', 'Only images are accepted (JPEG/PNG)');
  }
  if (bytes > maxBytes) {
    throw new ApiError('FILE_TOO_LARGE', `File exceeds ${Math.round(maxBytes / (1024 * 1024))} MB`);
  }
  return true;
}

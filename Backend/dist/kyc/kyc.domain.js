import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes } from 'node:crypto';
import { ApiError } from '../common/api-error.js';
export function normalizeId(raw) {
    return raw.trim().replace(/\s+/g, '').toUpperCase();
}
export function maskIdNumber(id) {
    const clean = normalizeId(id);
    if (clean.length <= 5)
        return 'X'.repeat(clean.length);
    return 'X'.repeat(clean.length - 5) + clean.slice(-5);
}
export function idNumberHmac(id, secret) {
    return createHmac('sha256', secret).update(normalizeId(id)).digest('hex');
}
function keyFor(secret) {
    return createHash('sha256').update(secret).digest();
}
export function encryptIdNumber(id, secret) {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', keyFor(secret), iv);
    const ct = Buffer.concat([cipher.update(normalizeId(id), 'utf8'), cipher.final()]);
    const raw = Buffer.concat([iv, cipher.getAuthTag(), ct]);
    const out = new Uint8Array(raw.length);
    out.set(raw);
    return out;
}
export function decryptIdNumber(blob, secret) {
    const iv = blob.subarray(0, 12);
    const tag = blob.subarray(12, 28);
    const ct = blob.subarray(28);
    const decipher = createDecipheriv('aes-256-gcm', keyFor(secret), iv);
    decipher.setAuthTag(tag);
    try {
        return Buffer.concat([decipher.update(ct), decipher.final()]).toString('utf8');
    }
    catch {
        throw new ApiError('VALIDATION_FAILED', 'Stored identity number cannot be decrypted');
    }
}
export function assertCanCreate(current, attempts, maxAttempts) {
    if (current === null)
        return 'DRAFT';
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
export function assertSubmittable(input) {
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
export function assertPicks(status) {
    if (status !== 'SUBMITTED') {
        throw new ApiError('STATE_INVALID', `Cannot start review from ${status}`);
    }
    return 'UNDER_REVIEW';
}
export function assertDecidable(status, input) {
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
export function gateAllows(kycStatus, _gate) {
    return kycStatus === 'VERIFIED';
}
export function docRules(mime, bytes, maxBytes) {
    if (!mime.toLowerCase().startsWith('image/')) {
        throw new ApiError('FILE_TYPE_NOT_ALLOWED', 'Only images are accepted (JPEG/PNG)');
    }
    if (bytes > maxBytes) {
        throw new ApiError('FILE_TOO_LARGE', `File exceeds ${Math.round(maxBytes / (1024 * 1024))} MB`);
    }
    return true;
}
//# sourceMappingURL=kyc.domain.js.map
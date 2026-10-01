import { describe, expect, it } from 'vitest';

import { ApiError } from '../../common/api-error.js';
import {
  assertCanCreate,
  assertDecidable,
  assertSubmittable,
  decryptIdNumber,
  docRules,
  encryptIdNumber,
  gateAllows,
  idNumberHmac,
  maskIdNumber,
  normalizeId,
} from '../kyc.domain.js';

/**
 * RED-first unit tests for the KYC domain (M5 state machine, §36a #9/#10
 * CONFIRMED, contracts kyc.ts). Pure rules only — no DB, no HTTP.
 */

const SECRET = 'test-secret-0123456789abcdef0123456789abcdef';

const code = (fn: () => unknown): string => {
  try {
    fn();
    return 'NO_ERROR';
  } catch (e) {
    return e instanceof ApiError ? e.code : `UNEXPECTED:${String(e)}`;
  }
};

describe('kyc.domain — id handling (#9: PAN/VOTER/DRIVING/PASSPORT)', () => {
  it('normalizeId trims, uppercases, strips spaces', () => {
    expect(normalizeId(' abcde 1234f ')).toBe('ABCDE1234F');
  });

  it('maskIdNumber matches the contracts example (tail visible, short ids fully masked)', () => {
    expect(maskIdNumber('ABCDE1234F')).toBe('XXXXX1234F');
    expect(maskIdNumber('A123')).toBe('XXXX'); // min length → fully masked
  });

  it('hmac is deterministic per secret and differs across secrets', () => {
    expect(idNumberHmac('ABCDE1234F', SECRET)).toBe(idNumberHmac('ABCDE1234F', SECRET));
    expect(idNumberHmac('ABCDE1234F', SECRET)).not.toBe(idNumberHmac('ABCDE1234F', `${SECRET}x`));
    expect(idNumberHmac('ABCDE1234F', SECRET)).toHaveLength(64); // sha256 hex
  });

  it('encrypt/decrypt round-trips (app-layer encryption at rest, §20)', () => {
    const enc = encryptIdNumber('ABCDE1234F', SECRET);
    expect(enc).toBeInstanceOf(Uint8Array);
    expect(decryptIdNumber(enc, SECRET)).toBe('ABCDE1234F');
    expect(() => decryptIdNumber(enc, 'wrong-secret-wrong-secret-wrong!!')).toThrow();
  });
});

describe('kyc.domain — M5 transitions (K0 create gate)', () => {
  it('K0: no submission → create allowed', () => {
    expect(assertCanCreate(null, 0, 3)).toBe('DRAFT');
  });

  it('K0: active DRAFT/SUBMITTED/UNDER_REVIEW → KYC_SUBMISSION_ACTIVE', () => {
    expect(code(() => assertCanCreate('DRAFT', 1, 3))).toBe('KYC_SUBMISSION_ACTIVE');
    expect(code(() => assertCanCreate('SUBMITTED', 1, 3))).toBe('KYC_SUBMISSION_ACTIVE');
    expect(code(() => assertCanCreate('UNDER_REVIEW', 1, 3))).toBe('KYC_SUBMISSION_ACTIVE');
  });

  it('K0: VERIFIED is terminal → STATE_INVALID (correction = sanction path)', () => {
    expect(code(() => assertCanCreate('VERIFIED', 1, 3))).toBe('STATE_INVALID');
  });

  it('K5: REJECTED → resubmit allowed until the attempt cap', () => {
    expect(assertCanCreate('REJECTED', 2, 3)).toBe('DRAFT');
    expect(code(() => assertCanCreate('REJECTED', 3, 3))).toBe('KYC_ATTEMPT_CAP');
  });
});

describe('kyc.domain — K1 submit gate', () => {
  const happy = { docCount: 2, consentGranted: true, attempts: 1, maxAttempts: 3 };

  it('happy path → SUBMITTED', () => {
    expect(assertSubmittable({ status: 'DRAFT', ...happy })).toBe('SUBMITTED');
  });

  it('no documents → DOCUMENT_REQUIRED', () => {
    expect(code(() => assertSubmittable({ status: 'DRAFT', ...happy, docCount: 0 }))).toBe('DOCUMENT_REQUIRED');
  });

  it('missing consent → VALIDATION_FAILED', () => {
    expect(code(() => assertSubmittable({ status: 'DRAFT', ...happy, consentGranted: false }))).toBe('VALIDATION_FAILED');
  });

  it('not DRAFT → KYC_SUBMISSION_ACTIVE', () => {
    expect(code(() => assertSubmittable({ status: 'SUBMITTED', ...happy }))).toBe('KYC_SUBMISSION_ACTIVE');
  });

  it('attempt cap exceeded → KYC_ATTEMPT_CAP', () => {
    expect(code(() => assertSubmittable({ status: 'DRAFT', ...happy, attempts: 4 }))).toBe('KYC_ATTEMPT_CAP');
  });
});

describe('kyc.domain — K3/K4 decide gate', () => {
  it('UNDER_REVIEW + verified attestation → VERIFIED', () => {
    expect(assertDecidable('UNDER_REVIEW', { decision: 'VERIFIED', idNumberMatched: true })).toBe('VERIFIED');
  });

  it('SUBMITTED (admin picked straight into decision) is also decidable', () => {
    expect(assertDecidable('SUBMITTED', { decision: 'VERIFIED', idNumberMatched: true })).toBe('VERIFIED');
  });

  it('REJECTED requires a reason ≥5 chars', () => {
    expect(code(() => assertDecidable('UNDER_REVIEW', { decision: 'REJECTED', idNumberMatched: true }))).toBe('VALIDATION_FAILED');
    expect(code(() => assertDecidable('UNDER_REVIEW', { decision: 'REJECTED', reason: 'blur', idNumberMatched: true }))).toBe('VALIDATION_FAILED');
    expect(assertDecidable('UNDER_REVIEW', { decision: 'REJECTED', reason: 'Photo does not match ID', idNumberMatched: true })).toBe('REJECTED');
  });

  it('VERIFIED requires the idNumberMatched attestation', () => {
    expect(code(() => assertDecidable('UNDER_REVIEW', { decision: 'VERIFIED', idNumberMatched: false }))).toBe('VALIDATION_FAILED');
  });

  it('DRAFT/VERIFIED/REJECTED are not decidable → STATE_INVALID', () => {
    expect(code(() => assertDecidable('DRAFT', { decision: 'VERIFIED', idNumberMatched: true }))).toBe('STATE_INVALID');
    expect(code(() => assertDecidable('VERIFIED', { decision: 'VERIFIED', idNumberMatched: true }))).toBe('STATE_INVALID');
    expect(code(() => assertDecidable('REJECTED', { decision: 'VERIFIED', idNumberMatched: true }))).toBe('STATE_INVALID');
  });
});

describe('kyc.domain — #10 gate policy (CONFIRMED: verify to hire / to publish)', () => {
  it('VERIFIED unlocks both gates', () => {
    expect(gateAllows('VERIFIED', 'HIRE')).toBe(true);
    expect(gateAllows('VERIFIED', 'PUBLISH')).toBe(true);
  });

  it('everything else (NONE/DRAFT/SUBMITTED/UNDER_REVIEW/REJECTED/null) blocks both', () => {
    for (const s of [null, 'NONE', 'DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'REJECTED']) {
      expect(gateAllows(s, 'HIRE')).toBe(false);
      expect(gateAllows(s, 'PUBLISH')).toBe(false);
    }
  });
});

describe('kyc.domain — document rules (K1 guard)', () => {
  const max = 5 * 1024 * 1024;
  it('images within the cap pass', () => {
    expect(docRules('image/jpeg', 1024, max)).toBe(true);
    expect(docRules('image/png', max, max)).toBe(true);
  });
  it('non-image mime → FILE_TYPE_NOT_ALLOWED', () => {
    expect(code(() => docRules('text/plain', 10, max))).toBe('FILE_TYPE_NOT_ALLOWED');
    expect(code(() => docRules('application/pdf', 10, max))).toBe('FILE_TYPE_NOT_ALLOWED');
  });
  it('oversized → FILE_TOO_LARGE', () => {
    expect(code(() => docRules('image/jpeg', max + 1, max))).toBe('FILE_TOO_LARGE');
  });
});

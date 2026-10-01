import { describe, expect, it } from 'vitest';

import { ApiError } from '../../common/api-error.js';
import { channelsFor } from '../channels.js';

/**
 * RED-first: notification channel matrix (M3-core, §12 outbox rules).
 * INAPP is unconditional; PUSH/SMS follow the event table ∧ account prefs.
 */

const code = (fn: () => unknown): string => {
  try {
    fn();
    return 'NO_ERROR';
  } catch (e) {
    return e instanceof ApiError ? e.code : `UNEXPECTED:${String(e)}`;
  }
};

describe('notifications — channelsFor', () => {
  const allOn = { pushEnabled: true, smsEnabled: true } as const;
  const allOff = { pushEnabled: false, smsEnabled: false } as const;

  it('KYC_DECISION (INAPP+PUSH) with push on → both channels', () => {
    expect(channelsFor('KYC_DECISION', allOn)).toEqual(['INAPP', 'PUSH']);
  });

  it('push preference off strips PUSH but keeps INAPP', () => {
    expect(channelsFor('KYC_SUBMITTED', { pushEnabled: false, smsEnabled: true })).toEqual(['INAPP']);
  });

  it('INAPP survives even when every preference is off', () => {
    expect(channelsFor('KYC_DECISION', allOff)).toEqual(['INAPP']);
  });

  it('unknown event key → VALIDATION_FAILED (typo guard)', () => {
    expect(code(() => channelsFor('NO_SUCH_EVENT' as never, allOn))).toBe('VALIDATION_FAILED');
  });
});

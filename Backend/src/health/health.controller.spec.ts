import { describe, expect, it } from 'vitest';

import { HealthController } from './health.controller.js';

describe('HealthController', () => {
  it('returns the success envelope with status ok', () => {
    const result = new HealthController().getHealth();

    expect(result.data.status).toBe('ok');
    expect(result.data.service).toBe('workbridge-api');
    expect(Number.isNaN(Date.parse(result.data.timestamp))).toBe(false);
  });
});

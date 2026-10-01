import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { PublicConfig } from '@workbridge/contracts';

import { Public } from '../common/guards.js';

/**
 * GET /config — public bootstrap (§14 row 17): what a client needs before
 * login. Static V1 values mirror Database/SEED_DATA.md platform_config seeds;
 * once admin editing lands (Wave 7) this reads the table instead.
 */
@Controller('config')
export class ConfigController {
  constructor(private readonly config: ConfigService) {}

  @Public()
  @Get()
  getConfig(): { data: PublicConfig } {
    const otp = this.config.get<{ cooldownSec: number; ttlSec: number; maxAttempts: number }>('otp')!;
    return {
      data: {
        appVersionMin: '1.0.0',
        otp: {
          cooldownSec: otp.cooldownSec,
          expiresSec: otp.ttlSec,
          maxAttempts: otp.maxAttempts,
        },
        quickMatch: { respondSec: 1800, waveSizeDefault: 2 },
        attendance: { tokenRotateSec: 60, tokenTtlSec: 60, graceMinutes: 30, noShowAfterHours: 24 },
        distanceBands: { bandsKm: [2, 5, 10, 25], labelFormat: 'Within {km} km' },
        features: {},
        locale: { default: 'en', supported: ['en', 'ta'] },
        kycPolicy: { requiredForHire: true, requiredForPublish: true, maxAttempts: 3 },
        maintenanceMode: false,
      },
    };
  }
}

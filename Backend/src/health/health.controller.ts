import { Controller, Get } from '@nestjs/common';

import { Public } from '../common/guards.js';

/**
 * GET /api/v1/health — public, unauthenticated liveness endpoint (§26).
 * Response uses the success envelope { data } (§14). The mobile dev hub
 * calls exactly this endpoint to prove client → API connectivity.
 */
@Controller()
export class HealthController {
  @Public()
  @Get('health')
  getHealth(): {
    data: { status: string; service: string; timestamp: string };
  } {
    return {
      data: {
        status: 'ok',
        service: 'workbridge-api',
        timestamp: new Date().toISOString(),
      },
    };
  }
}

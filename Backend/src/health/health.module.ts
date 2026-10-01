import { Module } from '@nestjs/common';

import { HealthController } from './health.controller.js';

/** Liveness/readiness surface of the API (foundation only). */
@Module({
  controllers: [HealthController],
})
export class HealthModule {}

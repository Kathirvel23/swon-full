import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllExceptionsFilter } from './common/all-exceptions.filter.js';
import { RequestIdInterceptor } from './common/request-id.interceptor.js';

/** Versioned URL prefix for every route (architecture §14). */
export const API_PREFIX = 'api/v1';

/**
 * Shared app configuration, used by BOTH the real bootstrap (main.ts) and the
 * e2e tests — so tests exercise exactly the production wiring (prefix, CORS,
 * request-id, error envelope), not a parallel copy of it.
 */
export function configureApp(app: INestApplication): void {
  const config = app.get(ConfigService);

  app.setGlobalPrefix(API_PREFIX);
  app.enableCors({
    origin: config.get<string[]>('corsOrigins') ?? [],
    exposedHeaders: ['x-request-id'],
  });
  app.useGlobalInterceptors(new RequestIdInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
}

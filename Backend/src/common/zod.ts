import type { ArgumentsHost } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { z } from 'zod';

import { ApiError } from './api-error.js';

/**
 * Request-scoped Zod parsing: @ZodBody(schema) / @ZodQuery(schema) return the
 * TYPED, parsed value or throw ApiError('VALIDATION_FAILED') with per-field
 * details — one validation path for every endpoint (§24).
 *
 * The schema is captured in the decorator factory CLOSURE (never passed as
 * decorator data): Nest 12 interprets object `data` as an options bag and
 * would hand `undefined` to the factory.
 */
const parseWith = (key: 'body' | 'query' | 'params', schema: z.ZodType, host: ArgumentsHost) => {
  const req = host.switchToHttp().getRequest<Record<string, unknown>>();
  const parsed = schema.safeParse(req[key]);
  if (!parsed.success) {
    throw new ApiError(
      'VALIDATION_FAILED',
      'Validation failed',
      parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    );
  }
  return parsed.data;
};

export const ZodBody = <T extends z.ZodType>(schema: T) =>
  createParamDecorator((_data: unknown, host: ArgumentsHost) => parseWith('body', schema, host))();

export const ZodQuery = <T extends z.ZodType>(schema: T) =>
  createParamDecorator((_data: unknown, host: ArgumentsHost) => parseWith('query', schema, host))();

export const ZodParams = <T extends z.ZodType>(schema: T) =>
  createParamDecorator((_data: unknown, host: ArgumentsHost) => parseWith('params', schema, host))();

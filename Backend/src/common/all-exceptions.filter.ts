import { randomUUID } from 'node:crypto';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { REQUEST_ID_HEADER } from './request-id.interceptor.js';

const STATUS_CODES: Record<number, string> = {
  // fallbacks when an HttpException carries no explicit catalog code —
  // keys are SWON error codes (packages/contracts/src/errors.ts)
  400: 'VALIDATION_FAILED',
  401: 'UNAUTHENTICATED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'STATE_INVALID',
  413: 'FILE_TOO_LARGE',
  429: 'RATE_LIMITED',
  500: 'INTERNAL',
  503: 'SERVICE_UNAVAILABLE',
};

type ErrorEnvelopeBody = {
  error: { code: string; message: string; details?: unknown; requestId: string };
};

/**
 * Single error exit for the whole API — every failure becomes the error
 * envelope from architecture §24: { error: { code, message, details, requestId } }.
 * Stacks are logged, never returned. Unknown exceptions become a generic 500.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const request = http.getRequest<Request & { requestId?: string }>();

    const inbound = request.headers[REQUEST_ID_HEADER];
    const headerValue = Array.isArray(inbound) ? inbound[0] : inbound;
    const requestId = request.requestId ?? headerValue ?? randomUUID();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = STATUS_CODES[status]!;
    let message = 'An unexpected error occurred. Please try again.';
    let details: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = STATUS_CODES[status] ?? `HTTP_${status}`;
      const body = exception.getResponse();

      if (typeof body === 'string') {
        message = body;
      } else if (typeof body === 'object' && body !== null) {
        const record = body as Record<string, unknown>;
        if (typeof record.code === 'string') code = record.code;
        if (Array.isArray(record.message)) {
          message = 'Validation failed.';
          details = record.message;
        } else if (typeof record.message === 'string') {
          message = record.message;
        } else {
          message = exception.message;
        }
        if (record.details !== undefined) details = record.details;
      } else {
        message = exception.message;
      }
    }

    const logContext = `${request.method} ${request.url} -> ${status}`;
    if (status >= 500) {
      this.logger.error(
        logContext,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(logContext);
    }

    response.setHeader(REQUEST_ID_HEADER, requestId);
    response.status(status).json({
      error: { code, message, details, requestId },
    } satisfies ErrorEnvelopeBody);
  }
}

import { HttpException } from '@nestjs/common';
import { statusForCode, type ErrorCode } from '@workbridge/contracts';

/**
 * One error contract (§24): ApiError carries a CATALOG code; the foundation's
 * AllExceptionsFilter turns it into { error: { code, message, details,
 * requestId } } with the HTTP status derived from statusForCode().
 * Services throw ApiError only; unknown exceptions become a generic 500
 * inside the filter — internals are logged, never returned.
 */
export class ApiError extends HttpException {
  constructor(
    public readonly code: ErrorCode,
    message?: string,
    public readonly details?: unknown,
  ) {
    super({ code, message: message ?? code, details }, statusForCode(code));
    this.name = 'ApiError';
  }
}

export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;

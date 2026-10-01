import { HttpException } from '@nestjs/common';
import { type ErrorCode } from '@workbridge/contracts';
export declare class ApiError extends HttpException {
    readonly code: ErrorCode;
    readonly details?: unknown | undefined;
    constructor(code: ErrorCode, message?: string, details?: unknown | undefined);
}
export declare const isApiError: (e: unknown) => e is ApiError;

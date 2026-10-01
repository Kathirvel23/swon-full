import { randomUUID } from 'node:crypto';

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Observable } from 'rxjs';

export const REQUEST_ID_HEADER = 'x-request-id';

/**
 * Request-id propagation (architecture §26): accepts an inbound x-request-id
 * (cross-service tracing), otherwise mints one, attaches it to the request
 * for the exception filter, and echoes it on every response.
 */
@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const http = context.switchToHttp();
    const request = http.getRequest<Request & { requestId?: string }>();
    const inbound = request.headers[REQUEST_ID_HEADER];
    const headerValue = Array.isArray(inbound) ? inbound[0] : inbound;
    const requestId = (headerValue && headerValue.trim()) || randomUUID();
    request.requestId = requestId;

    const response = http.getResponse<Response>();
    response.setHeader(REQUEST_ID_HEADER, requestId);

    return next.handle();
  }
}

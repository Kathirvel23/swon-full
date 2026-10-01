var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
import { randomUUID } from 'node:crypto';
import { Catch, HttpException, HttpStatus, Logger, } from '@nestjs/common';
import { REQUEST_ID_HEADER } from './request-id.interceptor.js';
const STATUS_CODES = {
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
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    logger = new Logger(AllExceptionsFilter_1.name);
    catch(exception, host) {
        const http = host.switchToHttp();
        const response = http.getResponse();
        const request = http.getRequest();
        const inbound = request.headers[REQUEST_ID_HEADER];
        const headerValue = Array.isArray(inbound) ? inbound[0] : inbound;
        const requestId = request.requestId ?? headerValue ?? randomUUID();
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let code = STATUS_CODES[status];
        let message = 'An unexpected error occurred. Please try again.';
        let details;
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            code = STATUS_CODES[status] ?? `HTTP_${status}`;
            const body = exception.getResponse();
            if (typeof body === 'string') {
                message = body;
            }
            else if (typeof body === 'object' && body !== null) {
                const record = body;
                if (typeof record.code === 'string')
                    code = record.code;
                if (Array.isArray(record.message)) {
                    message = 'Validation failed.';
                    details = record.message;
                }
                else if (typeof record.message === 'string') {
                    message = record.message;
                }
                else {
                    message = exception.message;
                }
                if (record.details !== undefined)
                    details = record.details;
            }
            else {
                message = exception.message;
            }
        }
        const logContext = `${request.method} ${request.url} -> ${status}`;
        if (status >= 500) {
            this.logger.error(logContext, exception instanceof Error ? exception.stack : String(exception));
        }
        else {
            this.logger.warn(logContext);
        }
        response.setHeader(REQUEST_ID_HEADER, requestId);
        response.status(status).json({
            error: { code, message, details, requestId },
        });
    }
};
AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    Catch()
], AllExceptionsFilter);
export { AllExceptionsFilter };
//# sourceMappingURL=all-exceptions.filter.js.map
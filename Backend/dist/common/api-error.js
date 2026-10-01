import { HttpException } from '@nestjs/common';
import { statusForCode } from '@workbridge/contracts';
export class ApiError extends HttpException {
    code;
    details;
    constructor(code, message, details) {
        super({ code, message: message ?? code, details }, statusForCode(code));
        this.code = code;
        this.details = details;
        this.name = 'ApiError';
    }
}
export const isApiError = (e) => e instanceof ApiError;
//# sourceMappingURL=api-error.js.map
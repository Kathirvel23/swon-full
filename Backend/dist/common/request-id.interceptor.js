var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
export const REQUEST_ID_HEADER = 'x-request-id';
let RequestIdInterceptor = class RequestIdInterceptor {
    intercept(context, next) {
        if (context.getType() !== 'http') {
            return next.handle();
        }
        const http = context.switchToHttp();
        const request = http.getRequest();
        const inbound = request.headers[REQUEST_ID_HEADER];
        const headerValue = Array.isArray(inbound) ? inbound[0] : inbound;
        const requestId = (headerValue && headerValue.trim()) || randomUUID();
        request.requestId = requestId;
        const response = http.getResponse();
        response.setHeader(REQUEST_ID_HEADER, requestId);
        return next.handle();
    }
};
RequestIdInterceptor = __decorate([
    Injectable()
], RequestIdInterceptor);
export { RequestIdInterceptor };
//# sourceMappingURL=request-id.interceptor.js.map
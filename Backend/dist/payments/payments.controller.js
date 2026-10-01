var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Headers, Param, Post, Query, Req } from '@nestjs/common';
import { Roles, authOf } from '../common/guards.js';
import { PaymentsService } from './payments.service.js';
let PaymentsController = class PaymentsController {
    payments;
    constructor(payments) {
        this.payments = payments;
    }
    my(req, query) {
        return this.payments.myEarnings(authOf(req).accountIdBig, {
            cursor: query.cursor,
            limit: Math.min(Math.max(Number(query.limit) || 20, 1), 50),
            status: query.status,
        });
    }
    forJob(req, publicId, query) {
        return this.payments.jobEarnings(authOf(req).accountIdBig, publicId, {
            cursor: query.cursor,
            limit: Math.min(Math.max(Number(query.limit) || 20, 1), 50),
            status: query.status,
        });
    }
    async approve(req, body, key) {
        return { data: await this.payments.approve(authOf(req).accountIdBig, body, key) };
    }
    async paid(req, body, key) {
        return { data: await this.payments.markPaid(authOf(req).accountIdBig, body, key) };
    }
};
__decorate([
    Get('earnings'),
    Roles('worker'),
    __param(0, Req()),
    __param(1, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "my", null);
__decorate([
    Get('jobs/:publicId/earnings'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "forJob", null);
__decorate([
    Post('earnings/approve'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Headers('idempotency-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "approve", null);
__decorate([
    Post('earnings/mark-paid'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Headers('idempotency-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "paid", null);
PaymentsController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [PaymentsService])
], PaymentsController);
export { PaymentsController };
//# sourceMappingURL=payments.controller.js.map
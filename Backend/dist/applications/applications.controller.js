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
import { Controller, Get, HttpCode, Param, Post, Req } from '@nestjs/common';
import { applicationDecisionSchema, applyInputSchema, bulkDecisionSchema, crewRosterQuerySchema, myApplicationsQuerySchema, queueQuerySchema, withdrawInputSchema, } from '@workbridge/contracts';
import { Roles, authOf } from '../common/guards.js';
import { ApiError } from '../common/api-error.js';
import { ZodBody, ZodQuery } from '../common/zod.js';
import { ApplicationsService } from './applications.service.js';
let ApplicationsController = class ApplicationsController {
    apps;
    constructor(apps) {
        this.apps = apps;
    }
    idem(req) {
        const raw = req.headers['idempotency-key'];
        const value = Array.isArray(raw) ? raw[0] : raw;
        if (!value || value.length < 8 || value.length > 80) {
            throw new ApiError('VALIDATION_FAILED', 'Idempotency-Key header required (8–80 chars)');
        }
        return value;
    }
    async apply(req, body) {
        const data = await this.apps.apply(authOf(req).accountIdBig, body, this.idem(req));
        return { data };
    }
    mine(req, query) {
        return this.apps.mine(authOf(req).accountIdBig, query);
    }
    async withdraw(req, publicId, body) {
        return { data: await this.apps.withdraw(authOf(req).accountIdBig, publicId, body) };
    }
    queue(req, publicId, query) {
        return this.apps.queue(authOf(req).accountIdBig, publicId, query);
    }
    async decide(req, publicId, body) {
        return {
            data: await this.apps.decide(authOf(req).accountIdBig, publicId, body, this.idem(req)),
        };
    }
    async bulk(req, body) {
        return { data: await this.apps.bulk(authOf(req).accountIdBig, body) };
    }
    roster(req, publicId, query) {
        return this.apps.roster(authOf(req).accountIdBig, publicId, query);
    }
};
__decorate([
    Post('applications'),
    HttpCode(201),
    Roles('worker'),
    __param(0, Req()),
    __param(1, ZodBody(applyInputSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "apply", null);
__decorate([
    Get('applications'),
    Roles('worker'),
    __param(0, Req()),
    __param(1, ZodQuery(myApplicationsQuerySchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "mine", null);
__decorate([
    Post('applications/:publicId/withdraw'),
    HttpCode(200),
    Roles('worker'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, ZodBody(withdrawInputSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "withdraw", null);
__decorate([
    Get('jobs/:publicId/queue'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, ZodQuery(queueQuerySchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "queue", null);
__decorate([
    Post('applications/:publicId/decision'),
    HttpCode(200),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, ZodBody(applicationDecisionSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "decide", null);
__decorate([
    Post('applications/bulk-decision'),
    HttpCode(200),
    Roles('employer'),
    __param(0, Req()),
    __param(1, ZodBody(bulkDecisionSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationsController.prototype, "bulk", null);
__decorate([
    Get('jobs/:publicId/crew'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, ZodQuery(crewRosterQuerySchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "roster", null);
ApplicationsController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [ApplicationsService])
], ApplicationsController);
export { ApplicationsController };
//# sourceMappingURL=applications.controller.js.map
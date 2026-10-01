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
import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Req } from '@nestjs/common';
import { jobCancelSchema, jobCreateSchema, jobMineQuerySchema, jobPatchSchema, jobSearchSchema, } from '@workbridge/contracts';
import { Roles, authOf } from '../common/guards.js';
import { ZodBody, ZodQuery } from '../common/zod.js';
import { JobsService } from './jobs.service.js';
let JobsController = class JobsController {
    jobs;
    constructor(jobs) {
        this.jobs = jobs;
    }
    async create(req, body) {
        return { data: await this.jobs.create(authOf(req).accountIdBig, body) };
    }
    async update(req, publicId, body) {
        return { data: await this.jobs.update(authOf(req).accountIdBig, publicId, body) };
    }
    mine(req, query) {
        return this.jobs.mine(authOf(req).accountIdBig, query);
    }
    async publish(req, publicId) {
        return { data: await this.jobs.publish(authOf(req).accountIdBig, publicId) };
    }
    async cancel(req, publicId, body) {
        return { data: await this.jobs.cancel(authOf(req).accountIdBig, publicId, body) };
    }
    async complete(req, publicId) {
        return { data: await this.jobs.complete(authOf(req).accountIdBig, publicId) };
    }
    async remove(req, publicId) {
        return { data: await this.jobs.remove(authOf(req).accountIdBig, publicId) };
    }
    feed(req, query) {
        return this.jobs.feed(authOf(req).accountIdBig, query);
    }
    async detail(req, publicId) {
        return { data: await this.jobs.detail(authOf(req).accountIdBig, publicId) };
    }
};
__decorate([
    Post(),
    Roles('employer'),
    __param(0, Req()),
    __param(1, ZodBody(jobCreateSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "create", null);
__decorate([
    Patch(':publicId'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, ZodBody(jobPatchSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "update", null);
__decorate([
    Get('mine'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, ZodQuery(jobMineQuerySchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "mine", null);
__decorate([
    Post(':publicId/publish'),
    HttpCode(201),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "publish", null);
__decorate([
    Post(':publicId/cancel'),
    HttpCode(201),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, ZodBody(jobCancelSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "cancel", null);
__decorate([
    Post(':publicId/complete'),
    HttpCode(201),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "complete", null);
__decorate([
    Delete(':publicId'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "remove", null);
__decorate([
    Get(),
    __param(0, Req()),
    __param(1, ZodQuery(jobSearchSchema)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], JobsController.prototype, "feed", null);
__decorate([
    Get(':publicId'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "detail", null);
JobsController = __decorate([
    Controller('jobs'),
    __metadata("design:paramtypes", [JobsService])
], JobsController);
export { JobsController };
let AdminJobsController = class AdminJobsController {
    jobs;
    constructor(jobs) {
        this.jobs = jobs;
    }
    async sweep() {
        return { data: await this.jobs.expireSweep() };
    }
};
__decorate([
    Post('expire-sweep'),
    HttpCode(200),
    Roles('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminJobsController.prototype, "sweep", null);
AdminJobsController = __decorate([
    Controller('admin/jobs'),
    __metadata("design:paramtypes", [JobsService])
], AdminJobsController);
export { AdminJobsController };
//# sourceMappingURL=jobs.controller.js.map
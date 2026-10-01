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
import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Roles, authOf } from '../common/guards.js';
import { AdminService } from './admin.service.js';
let AdminController = class AdminController {
    admin;
    constructor(admin) {
        this.admin = admin;
    }
    caller(req) {
        const auth = authOf(req);
        return { accountId: auth.accountIdBig, role: auth.role };
    }
    async stats() {
        return { data: await this.admin.stats() };
    }
    async audit(limit, offset, action, entityType, entityPublicId) {
        return this.admin.auditList({ limit, offset, action, entityType, entityPublicId });
    }
    async accounts(query, status, role) {
        return { data: await this.admin.searchAccounts(query, status, role) };
    }
    async accountDetail(publicId) {
        return { data: await this.admin.accountDetail(publicId) };
    }
    async sanction(req, publicId, body) {
        return { data: await this.admin.sanction(this.caller(req), publicId, body) };
    }
    async jobs(status, hidden, query) {
        return { data: await this.admin.jobsList({ status, hidden, query }) };
    }
    async hide(req, publicId, body) {
        return { data: await this.admin.hideJob(this.caller(req), publicId, body.reason ?? '') };
    }
    async restore(req, publicId) {
        return { data: await this.admin.restoreJob(this.caller(req), publicId) };
    }
    async payments() {
        return { data: await this.admin.paymentsOverview() };
    }
    async releaseHold(req, publicId, body) {
        return { data: await this.admin.releaseHold(this.caller(req), publicId, body.reason ?? '') };
    }
    async config() {
        return { data: await this.admin.configList() };
    }
    async configSet(req, key, body) {
        return { data: await this.admin.configSet(this.caller(req), key, body.value) };
    }
};
__decorate([
    Get('stats'),
    Roles('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "stats", null);
__decorate([
    Get('audit'),
    Roles('admin'),
    __param(0, Query('limit')),
    __param(1, Query('offset')),
    __param(2, Query('action')),
    __param(3, Query('entityType')),
    __param(4, Query('entityPublicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "audit", null);
__decorate([
    Get('accounts'),
    Roles('admin'),
    __param(0, Query('query')),
    __param(1, Query('status')),
    __param(2, Query('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "accounts", null);
__decorate([
    Get('accounts/:publicId'),
    Roles('admin'),
    __param(0, Param('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "accountDetail", null);
__decorate([
    Post('accounts/:publicId/sanctions'),
    Roles('admin'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "sanction", null);
__decorate([
    Get('jobs'),
    Roles('admin'),
    __param(0, Query('status')),
    __param(1, Query('hidden')),
    __param(2, Query('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "jobs", null);
__decorate([
    Post('jobs/:publicId/hide'),
    HttpCode(200),
    Roles('admin'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "hide", null);
__decorate([
    Post('jobs/:publicId/restore'),
    HttpCode(200),
    Roles('admin'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "restore", null);
__decorate([
    Get('payments/overview'),
    Roles('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "payments", null);
__decorate([
    Post('payments/earnings/:publicId/release-hold'),
    HttpCode(200),
    Roles('admin'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "releaseHold", null);
__decorate([
    Get('config'),
    Roles('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "config", null);
__decorate([
    Put('config/:key'),
    Roles('admin'),
    __param(0, Req()),
    __param(1, Param('key')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "configSet", null);
AdminController = __decorate([
    Controller('admin'),
    __metadata("design:paramtypes", [AdminService])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controller.js.map
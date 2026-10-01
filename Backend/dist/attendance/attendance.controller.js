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
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Roles, authOf } from '../common/guards.js';
import { AttendanceService } from './attendance.service.js';
let AttendanceController = class AttendanceController {
    attendance;
    constructor(attendance) {
        this.attendance = attendance;
    }
    async issue(req, publicId, body) {
        return { data: await this.attendance.issueToken(authOf(req).accountIdBig, publicId, body?.date) };
    }
    async today(req) {
        return { data: await this.attendance.today(authOf(req).accountIdBig) };
    }
    async check(req, body) {
        return { data: await this.attendance.check(authOf(req).accountIdBig, body) };
    }
    async roster(req, publicId, date) {
        return { data: await this.attendance.roster(authOf(req).accountIdBig, publicId, date) };
    }
    async approve(req, body) {
        return { data: await this.attendance.approve(authOf(req).accountIdBig, body.recordIds) };
    }
    async correct(req, recordId, body) {
        const auth = authOf(req);
        const role = auth.role === 'admin' ? 'ADMIN' : 'EMPLOYER';
        return { data: await this.attendance.correct(auth.accountIdBig, recordId, body, role) };
    }
};
__decorate([
    Post('jobs/:publicId/attendance/token'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "issue", null);
__decorate([
    Get('attendance/today'),
    Roles('worker', 'admin'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "today", null);
__decorate([
    Post('attendance/check'),
    Roles('worker', 'employer'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "check", null);
__decorate([
    Get('jobs/:publicId/roster'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Param('publicId')),
    __param(2, Query('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "roster", null);
__decorate([
    Post('attendance/approve'),
    Roles('employer'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "approve", null);
__decorate([
    Post('attendance/:recordId/correct'),
    Roles('employer', 'admin'),
    __param(0, Req()),
    __param(1, Param('recordId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "correct", null);
AttendanceController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [AttendanceService])
], AttendanceController);
export { AttendanceController };
//# sourceMappingURL=attendance.controller.js.map
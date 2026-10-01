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
import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Roles, authOf } from '../common/guards.js';
import { RatingsService } from './ratings.service.js';
let RatingsController = class RatingsController {
    ratings;
    constructor(ratings) {
        this.ratings = ratings;
    }
    async create(req, body) {
        const auth = authOf(req);
        return { data: await this.ratings.create({ accountId: auth.accountIdBig, role: auth.role }, body) };
    }
    async summary(req) {
        const auth = authOf(req);
        return { data: await this.ratings.summary({ accountId: auth.accountIdBig, role: auth.role }) };
    }
    async pending(req) {
        const auth = authOf(req);
        return { data: await this.ratings.pending({ accountId: auth.accountIdBig, role: auth.role }) };
    }
    async list(req, scope) {
        const auth = authOf(req);
        return {
            data: await this.ratings.list({ accountId: auth.accountIdBig, role: auth.role }, scope === 'given' ? 'given' : 'received'),
        };
    }
};
__decorate([
    Post('ratings'),
    Roles('worker', 'employer'),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "create", null);
__decorate([
    Get('me/rating-summary'),
    Roles('worker', 'employer'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "summary", null);
__decorate([
    Get('ratings/pending'),
    Roles('worker', 'employer'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "pending", null);
__decorate([
    Get('ratings'),
    Roles('worker', 'employer'),
    __param(0, Req()),
    __param(1, Query('scope')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RatingsController.prototype, "list", null);
RatingsController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [RatingsService])
], RatingsController);
export { RatingsController };
//# sourceMappingURL=ratings.controller.js.map
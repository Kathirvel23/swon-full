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
import { BadRequestException, Controller, Get, Patch, Post, Put, Req, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { availabilityPutSchema, onboardInputSchema, orgPatchSchema, skillsInputSchema, workerProfilePatchSchema, } from '@workbridge/contracts';
import { authOf } from '../common/guards.js';
import { ZodBody } from '../common/zod.js';
import { ProfilesService } from './profiles.service.js';
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
let ProfilesController = class ProfilesController {
    profiles;
    constructor(profiles) {
        this.profiles = profiles;
    }
    async me(req) {
        const auth = authOf(req);
        return { data: await this.profiles.me(auth.accountIdBig, baseOf(req)) };
    }
    async onboard(body, req) {
        const auth = authOf(req);
        const result = await this.profiles.onboard(auth.accountIdBig, body);
        return { data: { ...(await this.profiles.me(auth.accountIdBig, baseOf(req))), role: result.role } };
    }
    async patchWorker(body, req) {
        const auth = authOf(req);
        return { data: await this.profiles.patchWorker(auth.accountIdBig, body) };
    }
    async patchOrg(body, req) {
        const auth = authOf(req);
        return { data: await this.profiles.patchOrg(auth.accountIdBig, body) };
    }
    async putSkills(body, req) {
        const auth = authOf(req);
        return { data: await this.profiles.putSkills(auth.accountIdBig, body) };
    }
    async putAvailability(body, req) {
        const auth = authOf(req);
        return { data: await this.profiles.putAvailability(auth.accountIdBig, body) };
    }
    async uploadPhoto(file, req) {
        if (!file)
            throw new BadRequestException('Attach the photo as multipart field "file"');
        const auth = authOf(req);
        const result = await this.profiles.savePhoto(auth.accountIdBig, file);
        return { data: { ...result, photoUrl: `${baseOf(req)}/files/${result.storageKey}` } };
    }
};
__decorate([
    Get(),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "me", null);
__decorate([
    Post('onboarding'),
    __param(0, ZodBody(onboardInputSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "onboard", null);
__decorate([
    Patch(),
    __param(0, ZodBody(workerProfilePatchSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "patchWorker", null);
__decorate([
    Patch('org'),
    __param(0, ZodBody(orgPatchSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "patchOrg", null);
__decorate([
    Put('skills'),
    __param(0, ZodBody(skillsInputSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "putSkills", null);
__decorate([
    Put('availability'),
    __param(0, ZodBody(availabilityPutSchema)),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "putAvailability", null);
__decorate([
    Post('photo'),
    UseInterceptors(FileInterceptor('file', {
        limits: { fileSize: MAX_PHOTO_BYTES },
        fileFilter: (_req, file, cb) => {
            if (!file.mimetype.startsWith('image/')) {
                cb(new BadRequestException('Only images are allowed'), false);
                return;
            }
            cb(null, true);
        },
    })),
    __param(0, UploadedFile()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "uploadPhoto", null);
ProfilesController = __decorate([
    Controller('me'),
    __metadata("design:paramtypes", [ProfilesService])
], ProfilesController);
export { ProfilesController };
function baseOf(req) {
    const proto = req.headers['x-forwarded-proto'] ?? req.protocol ?? 'http';
    const host = req.headers['x-forwarded-host'] ?? req.headers.host ?? 'localhost';
    return `${proto}://${host}/api/v1`;
}
//# sourceMappingURL=profiles.controller.js.map
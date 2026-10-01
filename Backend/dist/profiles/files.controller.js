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
import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
let FilesController = class FilesController {
    async serve(key, res) {
        if (!key || key !== basename(key) || key.includes('..')) {
            throw new NotFoundException('File not found');
        }
        const dir = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');
        let buffer;
        try {
            buffer = await readFile(join(dir, key));
        }
        catch {
            throw new NotFoundException('File not found');
        }
        const ext = key.split('.').pop()?.toLowerCase() ?? '';
        res.setHeader('content-type', MIME_BY_EXT[ext] ?? 'application/octet-stream');
        res.setHeader('cache-control', 'private, max-age=3600');
        res.send(buffer);
    }
};
__decorate([
    Get(':key'),
    __param(0, Param('key')),
    __param(1, Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "serve", null);
FilesController = __decorate([
    Controller('files')
], FilesController);
export { FilesController };
const MIME_BY_EXT = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    heic: 'image/heic',
    bin: 'application/octet-stream',
};
//# sourceMappingURL=files.controller.js.map
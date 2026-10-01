var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { Public } from '../common/guards.js';
import { PrismaService } from '../prisma/prisma.service.js';
let CatalogController = class CatalogController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCatalog() {
        const [areas, skills, categories] = await Promise.all([
            this.prisma.area.findMany({
                where: { active: true },
                orderBy: [{ city: 'asc' }, { sortOrder: 'asc' }],
            }),
            this.prisma.skill.findMany({ where: { active: true }, orderBy: { name: 'asc' } }),
            this.prisma.jobCategory.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
        ]);
        return {
            data: {
                areas: areas.map((a) => ({
                    publicId: a.publicId,
                    city: a.city,
                    name: a.name,
                    nameTa: a.nameTa,
                })),
                skills: skills.map((s) => ({ publicId: s.publicId, code: s.code, name: s.name })),
                categories: categories.map((c) => ({ publicId: c.publicId, code: c.code, name: c.name })),
            },
        };
    }
};
__decorate([
    Public(),
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "getCatalog", null);
CatalogController = __decorate([
    Controller('catalog'),
    __metadata("design:paramtypes", [PrismaService])
], CatalogController);
export { CatalogController };
//# sourceMappingURL=catalog.controller.js.map
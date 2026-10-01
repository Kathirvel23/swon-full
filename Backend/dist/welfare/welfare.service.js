var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let WelfareService = class WelfareService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    deriveCategory(code) {
        const c = code.toUpperCase();
        if (/(MEAL|FOOD|WATER|DRINK|BREAKFAST|LUNCH|DINNER|SNACK|TEA)/.test(c))
            return 'FOOD';
        if (/(TRANSPORT|BUS|TRAVEL|DROP|COMMUTE|AUTO)/.test(c))
            return 'TRANSPORT';
        if (/(SAFETY|KIT|HELMET|BOOT|GLOVE|VEST|GOGGLE|MASK|AID|FIRST)/.test(c))
            return 'SAFETY';
        if (/(TOILET|REST|SHADE|SEAT|BATH|LOCKER|POTABLE|STORE|PARKING)/.test(c))
            return 'FACILITY';
        return 'OTHER';
    }
    async catalog(activeOnly) {
        const rows = await this.prisma.welfareItem.findMany({
            where: activeOnly ? { active: true } : {},
            orderBy: [{ sortOrder: 'asc' }, { code: 'asc' }],
        });
        return rows.map((w) => ({
            code: w.code,
            label: w.label,
            labelTa: w.labelTa,
            category: this.deriveCategory(w.code),
            active: w.active,
            sortOrder: w.sortOrder,
        }));
    }
};
WelfareService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], WelfareService);
export { WelfareService };
//# sourceMappingURL=welfare.service.js.map
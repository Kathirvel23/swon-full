import { Controller, Get } from '@nestjs/common';
import type { CatalogOutput } from '@workbridge/contracts';

import { Public } from '../common/guards.js';
import { PrismaService } from '../prisma/prisma.service.js';

/**
 * GET /catalog — seeded reference data (areas, skills, categories) needed by
 * onboarding forms and later job forms. Public: it is data, not user data.
 */
@Controller('catalog')
export class CatalogController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  async getCatalog(): Promise<{ data: CatalogOutput }> {
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
}

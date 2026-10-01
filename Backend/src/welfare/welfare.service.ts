import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import type { WelfareItemDto } from '@workbridge/contracts';

/**
 * Welfare catalog (§14 row 15 / §26): admin-configurable taxonomy, no
 * hardcoded list. The display category is derived from the code so existing
 * rows keep working when codes are added in the admin console later.
 */
@Injectable()
export class WelfareService {
  constructor(private readonly prisma: PrismaService) {}

  private deriveCategory(code: string): WelfareItemDto['category'] {
    const c = code.toUpperCase();
    if (/(MEAL|FOOD|WATER|DRINK|BREAKFAST|LUNCH|DINNER|SNACK|TEA)/.test(c)) return 'FOOD';
    if (/(TRANSPORT|BUS|TRAVEL|DROP|COMMUTE|AUTO)/.test(c)) return 'TRANSPORT';
    if (/(SAFETY|KIT|HELMET|BOOT|GLOVE|VEST|GOGGLE|MASK|AID|FIRST)/.test(c)) return 'SAFETY';
    if (/(TOILET|REST|SHADE|SEAT|BATH|LOCKER|POTABLE|STORE|PARKING)/.test(c)) return 'FACILITY';
    return 'OTHER';
  }

  async catalog(activeOnly: boolean): Promise<WelfareItemDto[]> {
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
}

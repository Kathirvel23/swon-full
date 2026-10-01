import { Controller, Get } from '@nestjs/common';
import { welfareCatalogQuerySchema } from '@workbridge/contracts';

import { Public } from '../common/guards.js';
import { ZodQuery } from '../common/zod.js';

import { WelfareService } from './welfare.service.js';

/** GET /welfare/catalog — static-ish taxonomy, safe to read pre-login. */
@Controller('welfare')
export class WelfareController {
  constructor(private readonly welfare: WelfareService) {}

  @Get('catalog')
  @Public()
  catalog(@ZodQuery(welfareCatalogQuerySchema) query: { activeOnly: boolean }) {
    return this.welfare.catalog(query.activeOnly).then((data) => ({ data }));
  }
}

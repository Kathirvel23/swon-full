import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { kycDecideSchema, kycQueueQuerySchema } from '@workbridge/contracts';
import type { Response } from 'express';

import { authOf, Roles, type AuthenticatedRequest } from '../common/guards.js';
import { ZodBody, ZodQuery } from '../common/zod.js';
import { KycService } from './kyc.service.js';

/**
 * /admin/kyc (§14 row 5) — queue (oldest first, 24h metric), pick (K2),
 * document view (bytes + DocumentAccessLog VIEW), decision (K3/K4).
 * @Roles('admin') on every handler — admin grant is server-side (#4 CONFIRMED).
 */
@Controller('admin/kyc')
export class AdminKycController {
  constructor(private readonly kyc: KycService) {}

  @Get()
  @Roles('admin')
  async queue(@ZodQuery(kycQueueQuerySchema) query: Parameters<KycService['adminQueue']>[0]) {
    return this.kyc.adminQueue(query);
  }

  @Get(':publicId')
  @Roles('admin')
  async pick(@Param('publicId') publicId: string) {
    return { data: await this.kyc.adminPick(publicId) };
  }

  @Get(':publicId/documents/:docType')
  @Roles('admin')
  async viewDocument(
    @Param('publicId') publicId: string,
    @Param('docType') docType: string,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    const auth = authOf(req);
    const { buffer, mime } = await this.kyc.adminViewDocument(publicId, docType, auth.accountIdBig);
    res.setHeader('Content-Type', mime || 'application/octet-stream');
    res.setHeader('Content-Disposition', `inline; filename="${docType.toLowerCase()}"`);
    res.send(buffer);
  }

  @Post(':publicId/decision')
  @Roles('admin')
  async decide(
    @Param('publicId') publicId: string,
    @ZodBody(kycDecideSchema) body: Parameters<KycService['adminDecide']>[2],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.kyc.adminDecide(auth.accountIdBig, publicId, body) };
  }
}

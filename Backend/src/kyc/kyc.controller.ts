import { BadRequestException, Controller, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { kycSubmitInputSchema, kycUploadTicketInputSchema } from '@workbridge/contracts';
import type { Request } from 'express';

import { authOf, type AuthenticatedRequest } from '../common/guards.js';
import { ZodBody } from '../common/zod.js';
import { KycService } from './kyc.service.js';

const MAX_KYC_FILE_BYTES = 5 * 1024 * 1024; // multer early-stop; exact cap enforced by domain docRules (config.kyc.maxBytes)

/**
 * /kyc (§14 row 5) — worker/employer side of the M5 machine: create/resubmit
 * (K0/K5), upload ticket + PUT target, submit (K1). Admin routes live in
 * admin-kyc.controller.ts. Everything self-scoped by the token's account.
 */
@Controller('kyc')
export class KycController {
  constructor(private readonly kyc: KycService) {}

  @Get()
  async active(@Req() req: AuthenticatedRequest) {
    const auth = authOf(req);
    return { data: await this.kyc.getActive(auth.accountIdBig) };
  }

  @Post()
  async create(
    @ZodBody(kycSubmitInputSchema) body: Parameters<KycService['create']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.kyc.create(auth.accountIdBig, body, { ip: req.ip }) };
  }

  @Post('documents/upload-ticket')
  async ticket(
    @ZodBody(kycUploadTicketInputSchema) body: { docType: string },
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.kyc.issueTicket(auth.accountIdBig, body.docType, originOf(req)) };
  }

  @Put('upload/:ticket')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MAX_KYC_FILE_BYTES },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Only images are allowed'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  async upload(
    @Param('ticket') ticket: string,
    @UploadedFile() file: { mimetype: string; size: number; buffer: Buffer } | undefined,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Attach the document as multipart field "file"');
    const auth = authOf(req);
    return { data: await this.kyc.saveDocument(auth.accountIdBig, ticket, file) };
  }

  @Post('submit')
  async submit(@Req() req: AuthenticatedRequest) {
    const auth = authOf(req);
    return { data: await this.kyc.submit(auth.accountIdBig) };
  }
}

/** Origin of the current request (the service appends /api/v1/... itself). */
function originOf(req: Request): string {
  const proto = (req.headers['x-forwarded-proto'] as string | undefined) ?? req.protocol ?? 'http';
  const host = (req.headers['x-forwarded-host'] as string | undefined) ?? req.headers.host ?? 'localhost';
  return `${proto}://${host}`;
}

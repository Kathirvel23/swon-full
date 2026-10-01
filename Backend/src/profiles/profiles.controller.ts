import {
  BadRequestException,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  availabilityPutSchema,
  onboardInputSchema,
  orgPatchSchema,
  skillsInputSchema,
  workerProfilePatchSchema,
} from '@workbridge/contracts';
import type { Request } from 'express';

import { authOf, type AuthenticatedRequest } from '../common/guards.js';
import { ZodBody } from '../common/zod.js';
import { ProfilesService } from './profiles.service.js';

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

/**
 * /me (§14 rows 2–4) — everything self-scoped by the token's account.
 * @Roles is deliberately absent: a fresh login (role = null) must be able to
 * reach POST /me/onboarding; role-restricted surfaces come in later waves.
 */
@Controller('me')
export class ProfilesController {
  constructor(private readonly profiles: ProfilesService) {}

  @Get()
  async me(@Req() req: AuthenticatedRequest) {
    const auth = authOf(req);
    return { data: await this.profiles.me(auth.accountIdBig, baseOf(req)) };
  }

  @Post('onboarding')
  async onboard(@ZodBody(onboardInputSchema) body: Parameters<ProfilesService['onboard']>[1], @Req() req: AuthenticatedRequest) {
    const auth = authOf(req);
    const result = await this.profiles.onboard(auth.accountIdBig, body);
    return { data: { ...(await this.profiles.me(auth.accountIdBig, baseOf(req))), role: result.role } };
  }

  @Patch()
  async patchWorker(
    @ZodBody(workerProfilePatchSchema) body: Parameters<ProfilesService['patchWorker']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.profiles.patchWorker(auth.accountIdBig, body) };
  }

  @Patch('org')
  async patchOrg(
    @ZodBody(orgPatchSchema) body: Parameters<ProfilesService['patchOrg']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.profiles.patchOrg(auth.accountIdBig, body) };
  }

  @Put('skills')
  async putSkills(
    @ZodBody(skillsInputSchema) body: Parameters<ProfilesService['putSkills']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.profiles.putSkills(auth.accountIdBig, body) };
  }

  @Put('availability')
  async putAvailability(
    @ZodBody(availabilityPutSchema) body: Parameters<ProfilesService['putAvailability']>[1],
    @Req() req: AuthenticatedRequest,
  ) {
    const auth = authOf(req);
    return { data: await this.profiles.putAvailability(auth.accountIdBig, body) };
  }

  /** Profile photo: 5 MB max, images only, stored locally behind an interface (§14 file rules; storage vendor = decision #14). */
  @Post('photo')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MAX_PHOTO_BYTES },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new BadRequestException('Only images are allowed'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  async uploadPhoto(
    @UploadedFile() file: { originalname: string; mimetype: string; buffer: Buffer } | undefined,
    @Req() req: AuthenticatedRequest,
  ) {
    if (!file) throw new BadRequestException('Attach the photo as multipart field "file"');
    const auth = authOf(req);
    const result = await this.profiles.savePhoto(auth.accountIdBig, file);
    return { data: { ...result, photoUrl: `${baseOf(req)}/files/${result.storageKey}` } };
  }
}

/** Origin of the current request — used to build absolute photo/file URLs. */
function baseOf(req: Request): string {
  const proto = (req.headers['x-forwarded-proto'] as string | undefined) ?? req.protocol ?? 'http';
  const host = (req.headers['x-forwarded-host'] as string | undefined) ?? req.headers.host ?? 'localhost';
  return `${proto}://${host}/api/v1`;
}

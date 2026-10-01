import { Module } from '@nestjs/common';

import { FilesController } from './files.controller.js';
import { ProfilesController } from './profiles.controller.js';
import { ProfilesService } from './profiles.service.js';

/** H1/H2 profiles: /me routes + authenticated file serving. */
@Module({
  controllers: [ProfilesController, FilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}

import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import type { Response } from 'express';

/**
 * GET /files/:key — serves locally stored profile photos to AUTHENTICATED
 * callers (§14 file rules). Key is sanitized to a bare filename (no path
 * traversal); KYC documents get a stricter, logged route in Wave 3 (H3).
 */
@Controller('files')
export class FilesController {
  @Get(':key')
  async serve(@Param('key') key: string, @Res() res: Response): Promise<void> {
    if (!key || key !== basename(key) || key.includes('..')) {
      throw new NotFoundException('File not found');
    }
    const dir = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');
    let buffer: Buffer;
    try {
      buffer = await readFile(join(dir, key));
    } catch {
      throw new NotFoundException('File not found');
    }
    const ext = key.split('.').pop()?.toLowerCase() ?? '';
    res.setHeader('content-type', MIME_BY_EXT[ext] ?? 'application/octet-stream');
    res.setHeader('cache-control', 'private, max-age=3600');
    res.send(buffer);
  }
}

const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  heic: 'image/heic',
  bin: 'application/octet-stream',
};

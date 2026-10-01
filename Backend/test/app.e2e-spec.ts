import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';

/**
 * Foundation e2e: boots the REAL app wiring (prefix, request-id, error
 * envelope) and proves the two contract points the mobile client relies on:
 * 1. GET /api/v1/health → success envelope
 * 2. unknown route → error envelope with requestId + x-request-id header
 */
describe('Foundation (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/v1/health returns { data: status ok }', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/health').expect(200);

    expect(response.body.data.status).toBe('ok');
    expect(response.body.data.service).toBe('workbridge-api');
    expect(response.headers['x-request-id']).toBeDefined();
  });

  it('unknown route returns the error envelope with a request id', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/does-not-exist').expect(404);

    expect(response.body.error.code).toBe('NOT_FOUND');
    expect(typeof response.body.error.message).toBe('string');
    expect(typeof response.body.error.requestId).toBe('string');
    expect(response.headers['x-request-id']).toBe(response.body.error.requestId);
  });
});

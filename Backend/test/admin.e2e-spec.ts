import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Admin oversight (the console's backing API):
 *   - stats / audit read (append-only trail)
 *   - account search + direct M6 sanctions (C2 revocation, suspend blocks
 *     fresh logins until C3 reinstate)
 *   - jobs moderation: hide/restore removes the job from discovery and from
 *     worker detail views while the owner keeps access
 *   - payments oversight: payout queue, holds, audited manual release (P9)
 *   - platform_config read/write with MATCH_WEIGHTS sum validation
 *
 * Fixture style: fresh phones (never reuse masked digits from tool output).
 */

const PHONES = {
  emp: '+919000100996',
  worker: '+919000100997',
  stranger: '+919000100998',
};

let app: INestApplication;
let prisma: PrismaService;
let areaId: string;
let categoryId: string;
let empToken = '';
let workerToken = '';
let adminToken = '';
let adminPhone = '';
let jobPublicId = '';
let approvedEarningPublicId = '';
let heldEarningPublicId = '';

const http = () => request(app.getHttpServer());

async function register(phone: string): Promise<{ access: string; refresh: string }> {
  const req = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: req.body.data.challengeId, code: req.body.data.devCode })
    .expect(201);
  return { access: verify.body.data.accessToken, refresh: verify.body.data.refreshToken };
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);

  adminPhone = (process.env.ADMIN_PHONES ?? '').split(',')[0].trim();
  expect(adminPhone).not.toBe('');

  const phones = [...Object.values(PHONES), adminPhone].map((p) => `'${p}'`).join(',');
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    for (const tbl of ['job_work_day', 'job_skill', 'job_welfare', 'application', 'crew_member', 'attendance_record', 'earning']) {
      await tx.$executeRawUnsafe(
        `DELETE x FROM ${tbl} x JOIN job jj ON jj.id = x.job_id JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
      );
    }
    await tx.$executeRawUnsafe(
      `DELETE j FROM job j JOIN employer_profile ep ON ep.id = j.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe(`DELETE FROM idempotency_key WHERE \`key\` LIKE 'admin-%'`);
    await tx.$executeRawUnsafe(`DELETE s FROM sanction s JOIN account a ON a.id = s.account_id WHERE a.phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });

  const catalog = await http().get('/api/v1/catalog').expect(200);
  areaId = catalog.body.data.areas[0].publicId;
  categoryId = catalog.body.data.categories.find((c: { code: string }) => c.code === 'WAREHOUSE').publicId;

  const emp0 = await register(PHONES.emp);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${emp0.access}`)
    .send({
      role: 'employer',
      orgName: 'Adminfix Traders',
      orgType: 'FIRM',
      contactName: 'Adminfix Owner',
      city: 'Coimbatore',
      areaId,
      addressLine: '7, Adminfix Street',
    })
    .expect(201);
  const wk0 = await register(PHONES.worker);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${wk0.access}`)
    .send({ role: 'worker', fullName: 'Adminfix Worker', city: 'Coimbatore', areaId, bio: 'Admin fixture', experienceYears: 3 })
    .expect(201);
  const st0 = await register(PHONES.stranger);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${st0.access}`)
    .send({ role: 'worker', fullName: 'Adminfix Crew', city: 'Coimbatore', areaId, bio: 'Admin fixture 2', experienceYears: 1 })
    .expect(201);

  empToken = (await register(PHONES.emp)).access;
  workerToken = (await register(PHONES.worker)).access;
  adminToken = (await register(adminPhone)).access;

  const welfare = await http().get('/api/v1/welfare/catalog').expect(200);
  const welfareCodes = welfare.body.data.slice(0, 1).map((w: { code: string }) => w.code);
  // SETUP shortcut (documented): employer VERIFIED directly — the K0–K5 flow
  // itself is proven in kyc.e2e-spec.ts; publish is gated on it (verify-to-publish).
  const empAcc = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.emp } });
  await prisma.kycSubmission.create({
    data: {
      accountId: empAcc.id,
      status: 'VERIFIED',
      idType: 'PAN',
      idNumberEnc: Buffer.from('E2E-SETUP'),
      idNumberHash: `admin-kyc-${empAcc.id}`,
      submittedAt: new Date(),
      decidedAt: new Date(),
    },
  });

  const draft = await http()
    .post('/api/v1/jobs')
    .set('Authorization', `Bearer ${empToken}`)
    .send({
      title: 'Admin fixture job',
      description: 'Moderation tests hide and restore this job.',
      categoryId,
      city: 'Coimbatore',
      areaId,
      addressLine: '7, Adminfix Estate',
      lat: 11.01,
      lng: 77.02,
      startsOn: new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
      endsOn: new Date(Date.now() + 86_400_000).toISOString().slice(0, 10),
      dayStartTime: '09:00',
      dayEndTime: '18:00',
      payType: 'DAY',
      payAmountPaise: 65_000,
      headcountRequired: 2,
      welfare: welfareCodes.map((code: string) => ({ code })),
    })
    .expect(201);
  jobPublicId = draft.body.data.publicId;

  // SETUP shortcuts (states under test; earning creation is journey-proven):
  const job = await prisma.job.findUniqueOrThrow({ where: { publicId: jobPublicId } });
  const workerAcc = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.worker } });
  const wp = await prisma.workerProfile.findUniqueOrThrow({ where: { accountId: workerAcc.id } });
  const strangerAcc = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.stranger } });
  const sp = await prisma.workerProfile.findUniqueOrThrow({ where: { accountId: strangerAcc.id } });
  approvedEarningPublicId = (
    await prisma.earning.create({
      data: { jobId: job.id, workerProfileId: wp.id, status: 'APPROVED', amountPaise: 65_000n, approvedAt: new Date() },
    })
  ).publicId;
  heldEarningPublicId = (
    await prisma.earning.create({
      data: { jobId: job.id, workerProfileId: sp.id, status: 'ON_HOLD', amountPaise: 65_000n },
    })
  ).publicId;
});

afterAll(async () => {
  await app?.close();
});

describe('admin oversight console API', () => {
  it('stats: dashboard counters are plain numbers', async () => {
    const res = await http().get('/api/v1/admin/stats').set('Authorization', `Bearer ${adminToken}`).expect(200);
    const d = res.body.data;
    expect(d.accounts).toBeGreaterThan(0);
    for (const k of ['workers', 'employers', 'suspended', 'openJobs', 'openComplaints', 'pendingKyc', 'unpaidEarnings', 'heldEarnings']) {
      expect(typeof d[k]).toBe('number');
    }
    expect(d.heldEarnings).toBeGreaterThanOrEqual(1);
  });

  it('accounts: search finds the fixture worker; detail shows profile + no sanctions yet', async () => {
    const res = await http()
      .get('/api/v1/admin/accounts')
      .query({ query: '9000100997' })
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body.data).toHaveLength(1);
    const row = res.body.data[0];
    expect(row.role).toBe('worker');
    expect(row.name).toBe('Adminfix Worker');

    const detail = await http()
      .get(`/api/v1/admin/accounts/${row.publicId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(detail.body.data.activeSessions).toBeGreaterThanOrEqual(1);
    expect(detail.body.data.sanctions).toHaveLength(0);
  });

  it('sanctions: validation and guard rails (reason, self, admin)', async () => {
    const search = await http()
      .get('/api/v1/admin/accounts')
      .query({ query: '9000100997' })
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    const workerPublicId = search.body.data[0].publicId;
    const adminSearch = await http()
      .get('/api/v1/admin/accounts')
      .query({ query: adminPhone })
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    const adminPublicId = adminSearch.body.data[0].publicId;

    await http()
      .post(`/api/v1/admin/accounts/${workerPublicId}/sanctions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ type: 'SUSPEND', reason: 'short' })
      .expect(422);
    await http()
      .post(`/api/v1/admin/accounts/${adminPublicId}/sanctions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ type: 'SUSPEND', reason: 'Testing admin protection rule' })
      .expect(403);
    await http()
      .post(`/api/v1/admin/accounts/${workerPublicId}/sanctions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ type: 'BLOCK', reason: 'Not a real sanction type at all' })
      .expect(422);
  });

  it('sanctions: SUSPEND blocks fresh logins until reinstate (M6 C2/C3)', async () => {
    const search = await http()
      .get('/api/v1/admin/accounts')
      .query({ query: '9000100997' })
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    const workerPublicId = search.body.data[0].publicId;

    await http()
      .post(`/api/v1/admin/accounts/${workerPublicId}/sanctions`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ type: 'SUSPEND', reason: 'Automated admin oversight test suspension' })
      .expect(201);

    // fresh login must be refused while suspended (verify gate) — ACCOUNT_SUSPENDED=403
    const blockedReq = await http().post('/api/v1/auth/otp/request').send({ phone: PHONES.worker });
    expect([201, 403]).toContain(blockedReq.status);
    if (blockedReq.status === 201) {
      await http()
        .post('/api/v1/auth/otp/verify')
        .send({ challengeId: blockedReq.body.data.challengeId, code: blockedReq.body.data.devCode })
        .expect(403);
    }

    await http()
      .post(`/api/v1/admin/accounts/${workerPublicId}/reinstate`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ note: 'Oversight test complete — restoring account' })
      .expect(201); // Nest POST default

    await http().post('/api/v1/auth/otp/request').send({ phone: PHONES.worker }).expect(201);
  });

  it('jobs moderation: hide removes from discovery + worker detail, owner keeps access', async () => {
    await http()
      .post(`/api/v1/jobs/${jobPublicId}/publish`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(201);

    const feedBefore = await http().get('/api/v1/jobs').set('Authorization', `Bearer ${workerToken}`).expect(200);
    expect(feedBefore.body.data.some((j: { publicId: string }) => j.publicId === jobPublicId)).toBe(true);

    await http()
      .post(`/api/v1/admin/jobs/${jobPublicId}/hide`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ reason: 'Reported misleading pay — admin test' })
      .expect(200);

    const feedAfter = await http().get('/api/v1/jobs').set('Authorization', `Bearer ${workerToken}`).expect(200);
    expect(feedAfter.body.data.some((j: { publicId: string }) => j.publicId === jobPublicId)).toBe(false);

    await http().get(`/api/v1/jobs/${jobPublicId}`).set('Authorization', `Bearer ${workerToken}`).expect(404);
    await http().get(`/api/v1/jobs/${jobPublicId}`).set('Authorization', `Bearer ${empToken}`).expect(200);

    await http()
      .post(`/api/v1/admin/jobs/${jobPublicId}/hide`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ reason: 'Second hide must fail with a state error' })
      .expect(409);

    await http()
      .post(`/api/v1/admin/jobs/${jobPublicId}/restore`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    const feedRestored = await http().get('/api/v1/jobs').set('Authorization', `Bearer ${workerToken}`).expect(200);
    expect(feedRestored.body.data.some((j: { publicId: string }) => j.publicId === jobPublicId)).toBe(true);

    await http().post(`/api/v1/admin/jobs/${jobPublicId}/restore`).set('Authorization', `Bearer ${adminToken}`).expect(409);
  });

  it('payments oversight: queues both earnings; manual release is validated + audited', async () => {
    const res = await http()
      .get('/api/v1/admin/payments/overview')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(res.body.data.awaitingPayment.some((e: { publicId: string }) => e.publicId === approvedEarningPublicId)).toBe(true);
    expect(res.body.data.onHold.some((e: { publicId: string }) => e.publicId === heldEarningPublicId)).toBe(true);

    await http()
      .post(`/api/v1/admin/payments/earnings/${heldEarningPublicId}/release-hold`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ reason: 'x' })
      .expect(422);

    const rel = await http()
      .post(`/api/v1/admin/payments/earnings/${heldEarningPublicId}/release-hold`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ reason: 'Complaint resolved elsewhere — manual admin release' })
      .expect(200);
    expect(rel.body.data.status).toBe('APPROVED');

    await http()
      .post(`/api/v1/admin/payments/earnings/${heldEarningPublicId}/release-hold`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ reason: 'Second release must fail with a state error' })
      .expect(409);

    const audit = await http()
      .get('/api/v1/admin/audit')
      .query({ entityType: 'EARNING', entityPublicId: heldEarningPublicId })
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(audit.body.data.some((a: { action: string }) => a.action === 'HOLD_RELEASED')).toBe(true);
  });

  it('audit: jobs moderation left an append-only trail', async () => {
    const res = await http()
      .get('/api/v1/admin/audit')
      .query({ entityType: 'JOB', entityPublicId: jobPublicId })
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    const actions = res.body.data.map((a: { action: string }) => a.action);
    expect(actions).toContain('JOB_HIDDEN');
    expect(actions).toContain('JOB_RESTORED');
    expect(res.body.meta.count).toBeGreaterThanOrEqual(2);
  });

  it('config: read returns match weights; writes bump versions; bad weights rejected', async () => {
    const res = await http().get('/api/v1/admin/config').set('Authorization', `Bearer ${adminToken}`).expect(200);
    expect(res.body.data.matchWeights.version).toBeGreaterThanOrEqual(1);
    const sum = Object.values(res.body.data.matchWeights.weights as Record<string, number>).reduce((a, b) => a + b, 0);
    expect(Math.abs(sum - 100)).toBeLessThan(1); // percent convention (matching.domain)

    await http()
      .put('/api/v1/admin/config/MATCH_WEIGHTS')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ value: { proximity: 2 } })
      .expect(422);

    // version is cumulative across runs (platform_config is NOT wiped) — assert the increment
    const flagRow = res.body.data.flags.find((f: { key: string }) => f.key === 'ADMIN_SMOKE_FLAG');
    const baseVersion = (flagRow?.version as number | undefined) ?? 0;
    const first = await http()
      .put('/api/v1/admin/config/ADMIN_SMOKE_FLAG')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ value: { enabled: true } })
      .expect(200);
    expect(first.body.data.version).toBe(baseVersion + 1);
    const second = await http()
      .put('/api/v1/admin/config/ADMIN_SMOKE_FLAG')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ value: { enabled: false } })
      .expect(200);
    expect(second.body.data.version).toBe(baseVersion + 2);

    const audit = await http()
      .get('/api/v1/admin/audit')
      .query({ entityType: 'CONFIG', entityPublicId: 'ADMIN_SMOKE_FLAG' })
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
    expect(audit.body.meta.count).toBeGreaterThanOrEqual(2);
  });

  it('guards: non-admin callers are rejected from every oversight route', async () => {
    await http().get('/api/v1/admin/stats').set('Authorization', `Bearer ${workerToken}`).expect(403);
    await http().get('/api/v1/admin/accounts').set('Authorization', `Bearer ${empToken}`).expect(403);
    await http().get('/api/v1/admin/payments/overview').set('Authorization', `Bearer ${workerToken}`).expect(403);
    await http().get('/api/v1/admin/audit').expect(401);
  });
});

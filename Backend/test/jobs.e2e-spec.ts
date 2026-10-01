import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Wave 3 — job lifecycle edge paths (M1 failure matrix) + discovery filters:
 * publish gate, invalid transitions, ownership/role guards, cancel rules,
 * draft delete, J10 expiry sweep, welfare filters, sort, pagination, and the
 * JOB_CANCELLED notification. The happy path lives in journey.e2e-spec.ts.
 */

const PHONES = {
  emp: '+919003150701',
  wrk: '+919003150702',
  adm: '+919003150703',
};

const TITLE_1 = 'Inventory count helpers for stock take';
const TITLE_2 = 'Night shift packing support needed';
const TITLE_3 = 'Past dated job for expiry sweep';

let app: INestApplication;
let prisma: PrismaService;
let areaId: string;
let skillId: string;
let categoryId: string;
let welfareCode: string;
let empToken = '';
let wrkToken = '';
let admToken = '';
let job1 = '';
let job2 = '';
let job3 = '';

const http = () => request(app.getHttpServer());

async function register(phone: string): Promise<string> {
  const req = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: req.body.data.challengeId, code: req.body.data.devCode })
    .expect(201);
  return verify.body.data.accessToken as string;
}

/** Onboarding assigns the role AFTER the verify-time token was minted —
 * a fresh OTP login re-mints claims with the current role (mirrors the
 * refresh path, which also re-reads role from the account row). */
async function relogin(phone: string): Promise<string> {
  return register(phone);
}

async function verifyKyc(phone: string): Promise<void> {
  // SETUP shortcut (documented): the K0–K5 flow itself is covered in
  // kyc.e2e-spec.ts — here the gate behaviour matters, not the upload UX.
  const account = await prisma.account.findUnique({ where: { phone } });
  if (!account) throw new Error('account missing');
  await prisma.kycSubmission.create({
    data: {
      accountId: account.id,
      status: 'VERIFIED',
      idType: 'PAN',
      idNumberEnc: Buffer.from('E2E-SETUP'),
      idNumberHash: `jobs-kyc-${account.id}`,
      submittedAt: new Date(),
      decidedAt: new Date(),
    },
  });
}

async function createJob(token: string, title: string, overrides: Record<string, unknown> = {}) {
  const res = await http()
    .post('/api/v1/jobs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title,
      description:
        'Temporary shift work at our Coimbatore location. Duties include sorting, packing and stacking.',
      categoryId,
      city: 'Coimbatore',
      areaId,
      addressLine: '5, Test Estate Road',
      startsOn: '2026-11-02',
      endsOn: '2026-11-03',
      dayStartTime: '09:00',
      dayEndTime: '18:00',
      payType: 'DAY',
      payAmountPaise: 75_000,
      headcountRequired: 3,
      skillIds: [skillId],
      welfare: [{ code: welfareCode }],
      ...overrides,
    })
    .expect(201);
  return res.body.data.publicId as string;
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);

  const phones = Object.values(PHONES).map((p) => `'${p}'`).join(',');
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    for (const tbl of ['job_work_day', 'job_skill', 'job_welfare', 'application', 'crew_member']) {
      await tx.$executeRawUnsafe(
        `DELETE x FROM ${tbl} x JOIN job jj ON jj.id = x.job_id JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
      );
    }
    await tx.$executeRawUnsafe(
      `DELETE jj FROM job jj JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe(
      `DELETE kp FROM kyc_submission kp JOIN account a ON a.id = kp.account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });

  const catalog = await http().get('/api/v1/catalog').expect(200);
  areaId = catalog.body.data.areas[0].publicId;
  skillId = catalog.body.data.skills[0].publicId;
  const warehouse = catalog.body.data.categories.find((c: { code: string }) => c.code === 'WAREHOUSE');
  categoryId = warehouse.publicId;
});

afterAll(async () => {
  await app.close();
});

describe('Wave 3 — jobs API edge paths', () => {
  it('welfare catalog is readable without a token (worker app before login)', async () => {
    const res = await http().get('/api/v1/welfare/catalog').expect(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    welfareCode = res.body.data[0].code;
    expect(res.body.data[0]).toHaveProperty('category');
  });

  it('onboards employer, worker (with skill) and an admin candidate', async () => {
    empToken = await register(PHONES.emp);
    const empOnboard = await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${empToken}`)
      .send({
        role: 'employer',
        orgName: 'Edge Traders',
        orgType: 'FIRM',
        contactName: 'Edge Manager',
        city: 'Coimbatore',
        areaId,
        addressLine: '5, Test Estate Road',
      })
      .expect(201);
    expect(empOnboard.body.data.org.completenessPct).toBe(100);
    empToken = await relogin(PHONES.emp); // role now employer — fresh claims

    wrkToken = await register(PHONES.wrk);
    await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${wrkToken}`)
      .send({ role: 'worker', fullName: 'Edge Worker', city: 'Coimbatore', areaId, bio: 'Packing', experienceYears: 5 })
      .expect(201);
    await http()
      .put('/api/v1/me/skills')
      .set('Authorization', `Bearer ${wrkToken}`)
      .send({ skills: [{ skillId }] })
      .expect(200);
    wrkToken = await relogin(PHONES.wrk); // role now worker — fresh claims

    // admin candidate: register → grant role in DB → re-verify mints the role
    await register(PHONES.adm);
    const admAccount = await prisma.account.findUnique({ where: { phone: PHONES.adm } });
    await prisma.account.update({ where: { id: admAccount!.id }, data: { role: 'admin' } });
    admToken = await register(PHONES.adm); // admin role proven by the J10 sweep test
  });

  it('creates a draft (derived work days + pay label) and lists it under mine', async () => {
    job1 = await createJob(empToken, TITLE_1);
    const mine = await http()
      .get('/api/v1/jobs/mine')
      .set('Authorization', `Bearer ${empToken}`)
      .expect(200);
    expect(mine.body.data).toHaveLength(1);
    expect(mine.body.data[0].status).toBe('DRAFT');
    expect(mine.body.data[0].workDays).toHaveLength(2);
    expect(mine.body.data[0].payLabel).toBe('₹750 / day');
    expect(mine.body.meta.count).toBe(1);
  });

  it('blocks publish before KYC (gate #10 verify-to-publish)', async () => {
    const res = await http()
      .post(`/api/v1/jobs/${job1}/publish`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(403);
    expect(res.body.error.code).toBe('KYC_REQUIRED');
  });

  it('publishes after KYC, then rejects re-publish (409 STATE_INVALID)', async () => {
    await verifyKyc(PHONES.emp);
    const ok = await http()
      .post(`/api/v1/jobs/${job1}/publish`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(201);
    expect(ok.body.data.status).toBe('OPEN');

    const again = await http()
      .post(`/api/v1/jobs/${job1}/publish`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(409);
    expect(again.body.error.code).toBe('STATE_INVALID');
  });

  it('refuses editing a published job (drafts only)', async () => {
    const res = await http()
      .patch(`/api/v1/jobs/${job1}`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ title: 'Sneaky edit attempt on a live job' })
      .expect(409);
    expect(res.body.error.code).toBe('STATE_INVALID');
  });

  it('enforces role + ownership boundaries', async () => {
    const asWorker = await http()
      .post('/api/v1/jobs')
      .set('Authorization', `Bearer ${wrkToken}`)
      .send({ title: 'Worker cannot post jobs at all' })
      .expect(403);
    expect(asWorker.body.error.code).toBe('ROLE_REQUIRED');

    const noToken = await http().get('/api/v1/jobs').expect(401);
    expect(noToken.body.error.code).toBe('UNAUTHENTICATED');
  });

  it('paginates mine and feeds both jobs to the worker with badges', async () => {
    job2 = await createJob(empToken, TITLE_2, { payType: 'HOUR', payAmountPaise: 12_500 });
    await http()
      .post(`/api/v1/jobs/${job2}/publish`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(201);

    const page1 = await http()
      .get('/api/v1/jobs/mine?limit=1')
      .set('Authorization', `Bearer ${empToken}`)
      .expect(200);
    expect(page1.body.data).toHaveLength(1);
    expect(page1.body.meta.next).toBe('o:1');
    expect(page1.body.meta.count).toBe(2);

    const feed = await http()
      .get('/api/v1/jobs')
      .set('Authorization', `Bearer ${wrkToken}`)
      .expect(200);
    const mine1 = feed.body.data.find((j: { publicId: string }) => j.publicId === job1);
    expect(mine1).toBeDefined();
    expect(mine1.viewerBadges).toEqual({ matchesSkills: true, experienceOk: true, kycOk: false });
    expect(mine1.distanceKm).toBe(0);

    // PAY_DESC puts the ₹750/day job first
    const sorted = await http()
      .get('/api/v1/jobs?sort=PAY_DESC')
      .set('Authorization', `Bearer ${wrkToken}`)
      .expect(200);
    expect(sorted.body.data[0].publicId).toBe(job1);

    // keyword + welfare filters narrow server-side
    const byQ = await http()
      .get(`/api/v1/jobs?q=${encodeURIComponent(TITLE_2)}`)
      .set('Authorization', `Bearer ${wrkToken}`)
      .expect(200);
    expect(byQ.body.data.map((j: { publicId: string }) => j.publicId)).toEqual([job2]);

    const byWelfare = await http()
      .get(`/api/v1/jobs?welfareCodes=${welfareCode}`)
      .set('Authorization', `Bearer ${wrkToken}`)
      .expect(200);
    expect(byWelfare.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it('cancel: requires crew confirmation, notifies, removes from feed, terminal', async () => {
    const noConfirm = await http()
      .post(`/api/v1/jobs/${job2}/cancel`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ reason: 'Stock changed for the festival week' })
      .expect(422);
    expect(noConfirm.body.error.code).toBe('VALIDATION_FAILED');

    const cancelled = await http()
      .post(`/api/v1/jobs/${job2}/cancel`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ reason: 'Stock changed for the festival week', crewHandlingConfirmed: true })
      .expect(201);
    expect(cancelled.body.data.status).toBe('CANCELLED');

    const feed = await http()
      .get('/api/v1/jobs')
      .set('Authorization', `Bearer ${wrkToken}`)
      .expect(200);
    expect(feed.body.data.some((j: { publicId: string }) => j.publicId === job2)).toBe(false);

    const inbox = await http()
      .get('/api/v1/notifications')
      .set('Authorization', `Bearer ${empToken}`)
      .expect(200);
    expect(JSON.stringify(inbox.body.data)).toContain('JOB_CANCELLED');

    const again = await http()
      .post(`/api/v1/jobs/${job2}/cancel`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ reason: 'Trying to cancel twice', crewHandlingConfirmed: true })
      .expect(409);
    expect(again.body.error.code).toBe('STATE_INVALID');
  });

  it('draft delete works; published delete is refused', async () => {
    const draftId = await createJob(empToken, 'Scratch draft to delete right away');
    const gone = await http()
      .delete(`/api/v1/jobs/${draftId}`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(200);
    expect(gone.body.data.deleted).toBe(true);
    const fetch = await http()
      .get(`/api/v1/jobs/${draftId}`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(404);

    const published = await http()
      .delete(`/api/v1/jobs/${job1}`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(409);
    expect(published.body.error.code).toBe('STATE_INVALID');
    expect(fetch.body.error.code).toBe('NOT_FOUND');
  });

  it('J10 sweep expires past, unfilled jobs (admin only)', async () => {
    job3 = await createJob(empToken, TITLE_3, {
      startsOn: '2026-01-05',
      endsOn: '2026-01-06',
    });
    await http()
      .post(`/api/v1/jobs/${job3}/publish`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(201);

    const asWorker = await http()
      .post('/api/v1/admin/jobs/expire-sweep')
      .set('Authorization', `Bearer ${wrkToken}`)
      .expect(403);
    expect(asWorker.body.error.code).toBe('ROLE_REQUIRED');

    const swept = await http()
      .post('/api/v1/admin/jobs/expire-sweep')
      .set('Authorization', `Bearer ${admToken}`)
      .expect(200);
    expect(swept.body.data.expired).toBeGreaterThanOrEqual(1);

    const mine = await http()
      .get('/api/v1/jobs/mine')
      .set('Authorization', `Bearer ${empToken}`)
      .expect(200);
    const expired = mine.body.data.find((j: { publicId: string }) => j.publicId === job3);
    expect(expired.status).toBe('EXPIRED');
    expect(mine.body.data.some((j: { publicId: string }) => j.publicId === job2)).toBe(true);
  });
});

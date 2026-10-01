import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Wave 1 integration suite — boots the REAL app against the MySQL TEST
 * database (vitest.config.e2e.ts env). Same journey as the live smoke
 * run, plus assertions the smoke can't make: DB side effects (welcome
 * notification, audit rows) and the suspended-account login block.
 *
 * Each suite wipes ITS OWN test phones first → deterministic re-runs.
 */
const P1 = '+919351000001'; // register → onboard → skills
const P2 = '+919351000002'; // refresh rotation / logout
const P3 = '+919351000003'; // suspended login block
const P4 = '+919351000004'; // employer org patch
const PHONES = [P1, P2, P3, P4];

let app: INestApplication;
let prisma: PrismaService;

const http = () => request(app.getHttpServer());

async function wipe(phones: string[]): Promise<void> {
  const list = phones.map((p) => `'${p}'`).join(',');
  // One transaction = one pooled connection: SET FOREIGN_KEY_CHECKS must sit
  // on the SAME connection as the DELETEs, or the pool races it (1451).
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${list})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${list})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });
}

async function requestOtp(phone: string) {
  const res = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  return res.body.data as { challengeId: string; devCode: string };
}

async function verifyOtp(challengeId: string, code: string, expected = 201) {
  const res = await http().post('/api/v1/auth/otp/verify').send({ challengeId, code });
  expect(res.status).toBe(expected);
  return res.body;
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);
  await wipe(PHONES);
});

afterAll(async () => {
  await app.close();
});

describe('Wave 1 auth integration (e2e, real DB)', () => {
  it('register → verify → tokens + ACCOUNT_WELCOME notification + audit rows', async () => {
    const { challengeId, devCode } = await requestOtp(P1);
    const body = await verifyOtp(challengeId, devCode);

    expect(body.data.accessToken).toBeTruthy();
    expect(body.data.refreshToken).toBeTruthy();
    expect(body.data.account.isNewAccount).toBe(true);
    expect(body.data.account.status).toBe('PENDING_VERIFICATION');
    expect(body.data.account.role).toBeNull();

    const account = await prisma.account.findUnique({ where: { phone: P1 } });
    expect(account).toBeTruthy();

    const welcome = await prisma.notification.findFirst({
      where: { recipientAccountId: account!.id, eventKey: 'ACCOUNT_WELCOME' },
    });
    expect(welcome).toBeTruthy();

    const registered = await prisma.auditLog.count({
      where: { actorAccountId: account!.id, action: 'ACCOUNT_REGISTERED' },
    });
    expect(registered).toBe(1);

    // /me works with the fresh token; protected route rejects garbage
    const me = await http()
      .get('/api/v1/me')
      .set('Authorization', `Bearer ${body.data.accessToken}`)
      .expect(200);
    expect(me.body.data.account.publicId).toBe(account!.publicId);

    await http().get('/api/v1/me').expect(401);
  });

  it('wrong OTP code is rejected; cooldown is disabled in tests', async () => {
    const { challengeId } = await requestOtp(P1);
    await verifyOtp(challengeId, '000000', 401); // wrong code → OTP_INVALID
    // back-to-back request succeeded above → cooldown 0 confirmed
  });

  it('onboarding makes an ACTIVE worker, writes PROFILE audit + completeness', async () => {
    const catalog = await http().get('/api/v1/catalog').expect(200);
    const areaId = catalog.body.data.areas[0].publicId;
    const skillId = catalog.body.data.skills[0].publicId;

    const { challengeId, devCode } = await requestOtp(P1);
    const login = await verifyOtp(challengeId, devCode);
    const token = login.data.accessToken;

    const onboard = await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: 'worker',
        fullName: 'Integration Worker',
        city: 'Coimbatore',
        areaId,
        bio: 'Event setup',
        experienceYears: 3,
      })
      .expect(201);
    expect(onboard.body.data.account.role).toBe('worker');
    expect(onboard.body.data.account.status).toBe('ACTIVE');

    const skills = await http()
      .put('/api/v1/me/skills')
      .set('Authorization', `Bearer ${token}`)
      .send({ skills: [{ skillId, yearsHint: 2 }] })
      .expect(200);
    expect(skills.body.data.profileCompletePct).toBeGreaterThan(0);

    const account = await prisma.account.findUnique({ where: { phone: P1 } });
    const onboarded = await prisma.auditLog.count({
      where: { actorAccountId: account!.id, action: 'ACCOUNT_ONBOARDED' },
    });
    expect(onboarded).toBe(1);

    // double onboarding is a 409 (state machine M0: choose role exactly once)
    await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${token}`)
      .send({ role: 'employer', orgName: 'Dup Org', orgType: 'FIRM', contactName: 'Dup Contact', city: 'Coimbatore', areaId, addressLine: '1, Main St' })
      .expect(409);
  });

  it('refresh rotates the token; replay of the old one is REFRESH_TOKEN_REUSED', async () => {
    const { challengeId, devCode } = await requestOtp(P2);
    const login = await verifyOtp(challengeId, devCode);
    const oldRefresh = login.data.refreshToken;

    const rotated = await http().post('/api/v1/auth/refresh').send({ refreshToken: oldRefresh }).expect(201);
    expect(rotated.body.data.rotated).toBe(true);
    expect(rotated.body.data.refreshToken).not.toBe(oldRefresh);

    const replay = await http().post('/api/v1/auth/refresh').send({ refreshToken: oldRefresh });
    expect(replay.status).toBe(401);
    expect(replay.body.error.code).toBe('REFRESH_TOKEN_REUSED');

    // logout with the CURRENT token, then it must not refresh
    const logout = await http()
      .post('/api/v1/auth/logout')
      .set('Authorization', `Bearer ${rotated.body.data.accessToken}`)
      .send({ refreshToken: rotated.body.data.refreshToken })
      .expect(201);
    expect(logout.body.data.ok).toBe(true);

    const afterLogout = await http().post('/api/v1/auth/refresh').send({ refreshToken: rotated.body.data.refreshToken });
    expect(afterLogout.status).toBe(401);
    expect(afterLogout.body.error.code).toBe('TOKEN_INVALID');
  });

  it('a SUSPENDED account cannot log in again', async () => {
    // first login creates P3, then we suspend from the DB (admin action = Wave 5)
    const first = await requestOtp(P3);
    await verifyOtp(first.challengeId, first.devCode);

    const account = await prisma.account.findUnique({ where: { phone: P3 } });
    await prisma.account.update({ where: { id: account!.id }, data: { status: 'SUSPENDED' } });

    const second = await requestOtp(P3);
    const body = await verifyOtp(second.challengeId, second.devCode, 403);
    expect(body.error.code).toBe('ACCOUNT_SUSPENDED');
  });

  it('H2 worker profile: PATCH /me, PUT availability, photo upload', async () => {
    const { challengeId, devCode } = await requestOtp(P1);
    const login = await verifyOtp(challengeId, devCode);
    const token = login.data.accessToken;

    // PATCH /me — partial update, no role change allowed here (self-scoped)
    const patch = await http()
      .patch('/api/v1/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ bio: 'Updated via integration test', openToWork: false })
      .expect(200);
    expect(patch.body.data.bio).toBe('Updated via integration test');
    expect(patch.body.data.openToWork).toBe(false);

    // PUT /me/availability — replace-all set
    const availability = await http()
      .put('/api/v1/me/availability')
      .set('Authorization', `Bearer ${token}`)
      .send({ slots: [{ date: '2026-09-30', fromTime: '09:00', toTime: '17:00' }] })
      .expect(200);
    expect(availability.body.data.availability ?? availability.body.data.slots).toBeTruthy();

    const me = await http()
      .get('/api/v1/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(me.body.data.workerProfile.availability).toHaveLength(1);

    // POST /me/photo — multipart, image only, 5 MB cap
    const photo = await http()
      .post('/api/v1/me/photo')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('not-a-real-png-but-image/png'), {
        filename: 'p.png',
        contentType: 'image/png',
      })
      .expect(201);
    expect(photo.body.data.photoUrl).toContain('/files/');

    const notImage = await http()
      .post('/api/v1/me/photo')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('plain'), { filename: 'p.txt', contentType: 'text/plain' });
    expect(notImage.status).toBeGreaterThanOrEqual(400);
  });

  it('H2 employer profile: PATCH /me/org updates the org', async () => {
    const { challengeId, devCode } = await requestOtp(P4);
    const login = await verifyOtp(challengeId, devCode);
    const token = login.data.accessToken;

    const catalog = await http().get('/api/v1/catalog').expect(200);
    const areaId = catalog.body.data.areas[0].publicId;

    await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: 'employer',
        orgName: 'Patch Test Traders',
        orgType: 'FIRM',
        contactName: 'Patch Manager',
        city: 'Coimbatore',
        areaId,
        addressLine: '9, Test Street',
      })
      .expect(201);

    const patch = await http()
      .patch('/api/v1/me/org')
      .set('Authorization', `Bearer ${token}`)
      .send({ orgName: 'Renamed Traders', panRef: 'ABCDE1234F' })
      .expect(200);
    expect(patch.body.data.orgName).toBe('Renamed Traders');
    expect(patch.body.data.completenessPct).toBe(100);
  });
});

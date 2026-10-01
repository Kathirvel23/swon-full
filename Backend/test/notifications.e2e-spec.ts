import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { DispatcherService } from '../src/notifications/dispatcher.service.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * Notifications (§14 row 14, §22): in-app inbox mechanics (pages, unread
 * filter, mark-read, counts), push-token registration, and preferences
 * (push/SMS mute + quiet hours). OTP SMS stays unmuteable by contract.
 * Fixture: notifications are produced through the REAL dispatcher (outbox →
 * delivery → inbox) — no synthetic rows.
 */

const PHONES = {
  user: '+919000000981',
  other: '+919000000982',
};

let app: INestApplication;
let prisma: PrismaService;
let dispatcher: DispatcherService;
let token = '';
let otherToken = '';
let accountPublicId = '';

const http = () => request(app.getHttpServer());

async function register(phone: string): Promise<string> {
  const req = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: req.body.data.challengeId, code: req.body.data.devCode })
    .expect(201);
  return verify.body.data.accessToken as string;
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  prisma = app.get(PrismaService);
  dispatcher = app.get(DispatcherService);

  const phones = Object.values(PHONES).map((p) => `'${p}'`).join(',');
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    await tx.$executeRawUnsafe(`DELETE FROM notification WHERE recipient_account_id IN (SELECT id FROM account WHERE phone IN (${phones}))`);
    await tx.$executeRawUnsafe(`DELETE FROM notification_pref WHERE account_id IN (SELECT id FROM account WHERE phone IN (${phones}))`);
    await tx.$executeRawUnsafe(`DELETE FROM push_token WHERE account_id IN (SELECT id FROM account WHERE phone IN (${phones}))`);
    await tx.$executeRawUnsafe("DELETE FROM idempotency_key WHERE `key` LIKE 'notif-%'");
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });

  token = await register(PHONES.user);
  otherToken = await register(PHONES.other);
  const acc = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.user } });
  accountPublicId = acc.publicId;

  // Real dispatcher path: outbox → INAPP delivery → inbox row.
  const accId = acc.id;
  await dispatcher.enqueue({
    eventKey: 'ACCOUNT_WELCOME',
    recipientAccountIds: [accId],
    contextType: 'ACCOUNT',
    contextPublicId: accountPublicId,
    args: {},
  });
  await dispatcher.enqueue({
    eventKey: 'APPLICATION_SUBMITTED',
    recipientAccountIds: [accId],
    contextType: 'APPLICATION',
    contextPublicId: 'notif-fixture-app',
    args: { jobTitle: 'Fixture role' },
  });
  await dispatcher.enqueue({
    eventKey: 'APPLICATION_SHORTLISTED',
    recipientAccountIds: [accId],
    contextType: 'APPLICATION',
    contextPublicId: 'notif-fixture-app2',
    args: { jobTitle: 'Fixture role 2' },
  });
});

afterAll(async () => {
  await app?.close();
});

describe('notifications inbox', () => {
  it('lists my notifications unread-first with catalog keys (not translated text)', async () => {
    const res = await http().get('/api/v1/notifications').set('Authorization', `Bearer ${token}`).expect(200);
    expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    expect(res.body.data[0].eventKey).toBeTruthy();
    expect(res.body.data[0].titleKey).toMatch(/^event\./); // i18n key, client renders
    expect(res.body.data[0].readAt).toBeNull(); // unread-first
  });

  it('another account sees none of mine', async () => {
    const res = await http().get('/api/v1/notifications').set('Authorization', `Bearer ${otherToken}`).expect(200);
    // (the other account has its OWN welcome row — but never my fixtures)
    const leaked = res.body.data.filter(
      (n: { context?: { publicId?: string } | null }) =>
        n.context?.publicId === 'notif-fixture-app' ||
        n.context?.publicId === 'notif-fixture-app2' ||
        n.context?.publicId === accountPublicId,
    );
    expect(leaked).toHaveLength(0);
    const mine = await http().get('/api/v1/notifications').set('Authorization', `Bearer ${token}`).expect(200);
    expect(mine.body.data.length).toBeGreaterThan(res.body.data.length);
  });

  it('unread-count tracks reads: mark one → count drops, mark all → zero', async () => {
    const before = await http().get('/api/v1/notifications/unread-count').set('Authorization', `Bearer ${token}`).expect(200);
    const total = before.body.data.unread;
    expect(total).toBeGreaterThanOrEqual(3);

    const list = await http().get('/api/v1/notifications').set('Authorization', `Bearer ${token}`).expect(200);
    const one = list.body.data[list.body.data.length - 1].publicId;
    const afterOne = await http()
      .post('/api/v1/notifications/read')
      .set('Authorization', `Bearer ${token}`)
      .send({ ids: [one] })
      .expect(201);
    expect(afterOne.body.data.unread).toBe(total - 1);

    const afterAllRead = await http()
      .post('/api/v1/notifications/read')
      .set('Authorization', `Bearer ${token}`)
      .send({ all: true })
      .expect(201);
    expect(afterAllRead.body.data.unread).toBe(0);
  });

  it('unread filter returns only unread rows again', async () => {
    const res = await http()
      .get('/api/v1/notifications?unread=true')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(res.body.data).toHaveLength(0); // just marked everything read
  });

  it('read with neither ids nor all is a validation error', async () => {
    const res = await http()
      .post('/api/v1/notifications/read')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(422);
  });

  it('registers a push token (upsert per account+token)', async () => {
    const first = await http()
      .post('/api/v1/devices/push-token')
      .set('Authorization', `Bearer ${token}`)
      .send({ token: 'fixture-push-token-0001', platform: 'ANDROID', deviceName: 'Test phone' })
      .expect(201);
    const again = await http()
      .post('/api/v1/devices/push-token')
      .set('Authorization', `Bearer ${token}`)
      .send({ token: 'fixture-push-token-0001', platform: 'ANDROID' })
      .expect(201);
    const rows = await prisma.pushToken.count({
      where: { account: { phone: PHONES.user }, token: 'fixture-push-token-0001' },
    });
    expect(rows).toBe(1);
    expect(first.body.data).toBeTruthy();
    expect(again.body.data).toBeTruthy();
  });

  it('requires auth on every route', async () => {
    await http().get('/api/v1/notifications').expect(401);
    await http().get('/api/v1/me/notification-prefs').expect(401);
    await http().put('/api/v1/me/notification-prefs').send({ pushEnabled: false }).expect(401);
  });
});

describe('notification preferences (§22)', () => {
  it('defaults: push+SMS on, no quiet hours', async () => {
    const res = await http().get('/api/v1/me/notification-prefs').set('Authorization', `Bearer ${token}`).expect(200);
    expect(res.body.data.pushEnabled).toBe(true);
    expect(res.body.data.smsEnabled).toBe(true);
    expect(res.body.data.quietHours).toBeNull();
  });

  it('updates persist and partial patches keep the rest', async () => {
    await http()
      .put('/api/v1/me/notification-prefs')
      .set('Authorization', `Bearer ${token}`)
      .send({ pushEnabled: false, quietHours: '22:00-07:00' })
      .expect(200);
    const readBack = await http().get('/api/v1/me/notification-prefs').set('Authorization', `Bearer ${token}`).expect(200);
    expect(readBack.body.data.pushEnabled).toBe(false);
    expect(readBack.body.data.smsEnabled).toBe(true); // untouched
    expect(readBack.body.data.quietHours).toBe('22:00-07:00');

    await http()
      .put('/api/v1/me/notification-prefs')
      .set('Authorization', `Bearer ${token}`)
      .send({ smsEnabled: false })
      .expect(200);
    const second = await http().get('/api/v1/me/notification-prefs').set('Authorization', `Bearer ${token}`).expect(200);
    expect(second.body.data.pushEnabled).toBe(false); // still muted
    expect(second.body.data.smsEnabled).toBe(false);
  });

  it('rejects a malformed quiet-hours window', async () => {
    const res = await http()
      .put('/api/v1/me/notification-prefs')
      .set('Authorization', `Bearer ${token}`)
      .send({ quietHours: 'at-night' });
    expect(res.status).toBe(422);
  });

  it('preferences are per-account', async () => {
    const other = await http().get('/api/v1/me/notification-prefs').set('Authorization', `Bearer ${otherToken}`).expect(200);
    expect(other.body.data.pushEnabled).toBe(true); // other account untouched
  });

  it('a muted inbox still receives (§22 critical events stay in-app)', async () => {
    // push is OFF for this account from the test above
    const acc = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.user } });
    await dispatcher.enqueue({
      eventKey: 'ACCOUNT_SUSPENDED',
      recipientAccountIds: [acc.id],
      contextType: 'ACCOUNT',
      args: { reason: 'fixture' },
    });
    const inbox = await http().get('/api/v1/notifications').set('Authorization', `Bearer ${token}`).expect(200);
    const critical = inbox.body.data.find((n: { eventKey: string }) => n.eventKey === 'ACCOUNT_SUSPENDED');
    expect(critical).toBeTruthy();
    // …and the PUSH channel was skipped by the preference plan
    const pushDeliveries = await prisma.notificationDelivery.count({
      where: { channel: 'PUSH', recipientAccountId: acc.id, outbox: { eventKey: 'ACCOUNT_SUSPENDED' } },
    });
    const inappDeliveries = await prisma.notificationDelivery.count({
      where: { channel: 'INAPP', recipientAccountId: acc.id, outbox: { eventKey: 'ACCOUNT_SUSPENDED' } },
    });
    expect(inappDeliveries).toBe(1);
    expect(pushDeliveries).toBe(0);
  });
});

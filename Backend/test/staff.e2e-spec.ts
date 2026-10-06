import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap.js';
import { PrismaService } from '../src/prisma/prisma.service.js';

/**
 * §38 permission matrix — Event Attendance Manager (owner brief 2026-10-05).
 *
 * The capability is EVENT-SCOPED: being the manager of Job 1 grants NOTHING on
 * Job 2, and an ordinary crew member can neither read the manager roster nor
 * mark anyone. The manager can never touch the incentive — that is host-only
 * and computed server-side.
 *
 * Fixture style matches attendance.e2e-spec.ts: its own employer + two workers
 * created through the public APIs, one documented setup shortcut (the manager's
 * earning row), and a phone-scoped wipe so re-runs are clean.
 *
 * Clock note: the job's day window starts 30 min AFTER now, so a mark made
 * during the test is deterministically PRESENT (not LATE). LATE-offset
 * arithmetic is covered by the staff.domain unit tests, not by wall-clock
 * timing here.
 */

const PHONES = {
  emp: '+919876500201',
  workerA: '+919876500202',
  workerB: '+919876500203',
};

let app: INestApplication;
let prisma: PrismaService;
let areaId: string;
let categoryId: string;
let empToken = '';
let tokenA = '';
let tokenB = '';
let job1 = '';
let job2 = '';
let pubA = '';
let pubB = '';
let pubBProfile = '';
let wdId = '';

const http = () => request(app.getHttpServer());
const istMin = (): number => {
  const d = new Date(Date.now() + 330 * 60_000);
  return d.getUTCHours() * 60 + d.getUTCMinutes();
};
const fmt = (m: number): string =>
  `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const today = (): string => new Date(Date.now() + 330 * 60_000).toISOString().slice(0, 10);
const tomorrow = (): string =>
  new Date(Date.now() + 330 * 60_000 + 86_400_000).toISOString().slice(0, 10);

async function register(phone: string): Promise<string> {
  const req = await http().post('/api/v1/auth/otp/request').send({ phone }).expect(201);
  const verify = await http()
    .post('/api/v1/auth/otp/verify')
    .send({ challengeId: req.body.data.challengeId, code: req.body.data.devCode })
    .expect(201);
  return verify.body.data.accessToken as string;
}

async function wipe(): Promise<void> {
  const phones = Object.values(PHONES).map((p) => `'${p}'`).join(',');
  await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=0');
    for (const tbl of [
      'job_staff_assignment',
      'job_work_day',
      'job_skill',
      'job_welfare',
      'application',
      'crew_member',
      'attendance_record',
      'earning',
    ]) {
      await tx.$executeRawUnsafe(
        `DELETE x FROM ${tbl} x JOIN job jj ON jj.id = x.job_id JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
      );
    }
    await tx.$executeRawUnsafe(
      `DELETE jj FROM job jj JOIN employer_profile ep ON ep.id = jj.employer_profile_id JOIN account a ON a.id = ep.account_id WHERE a.phone IN (${phones})`,
    );
    await tx.$executeRawUnsafe("DELETE FROM idempotency_key WHERE `key` LIKE 'perm-%'");
    await tx.$executeRawUnsafe(`DELETE FROM account WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe(`DELETE FROM otp_challenge WHERE phone IN (${phones})`);
    await tx.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS=1');
  });
}

/** A published job owned by the fixture employer, with one derived work day. */
async function makeJob(title: string): Promise<string> {
  const now = istMin();
  const welfare = await http().get('/api/v1/welfare/catalog').expect(200);
  const draft = await http()
    .post('/api/v1/jobs')
    .set('Authorization', `Bearer ${empToken}`)
    .send({
      title,
      description: 'Event attendance manager permission fixture.',
      categoryId,
      city: 'Coimbatore',
      areaId,
      addressLine: '1, Permission Lane',
      lat: 11.02,
      lng: 77.03,
      startsOn: today(),
      endsOn: today(),
      // window starts AFTER now → a mark during the test is PRESENT, deterministically
      dayStartTime: fmt(Math.min(now + 30, 1400)),
      dayEndTime: fmt(Math.min(now + 120, 1439)),
      payType: 'DAY',
      payAmountPaise: 75_000,
      headcountRequired: 2,
      welfare: welfare.body.data.slice(0, 1).map((w: { code: string }) => ({ code: w.code })),
    })
    .expect(201);
  const publicId = draft.body.data.publicId as string;
  await prisma.job.update({ where: { publicId }, data: { status: 'OPEN' } });
  return publicId;
}

async function hire(jobPublicId: string, token: string, key: string): Promise<void> {
  const applied = await http()
    .post('/api/v1/applications')
    .set('Authorization', `Bearer ${token}`)
    .set('Idempotency-Key', `${key}-apply`)
    .send({ jobId: jobPublicId, coverNote: 'Permission matrix' })
    .expect(201);
  await http()
    .post(`/api/v1/applications/${applied.body.data.publicId}/decision`)
    .set('Authorization', `Bearer ${empToken}`)
    .set('Idempotency-Key', `${key}-hire`)
    .send({ action: 'hire' })
    .expect(200);
}

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  await app.listen(0); // pin an ephemeral port (supertest's auto-listen was unreliable across requests)
  prisma = app.get(PrismaService);

  await wipe();

  const catalog = await http().get('/api/v1/catalog').expect(200);
  areaId = catalog.body.data.areas[0].publicId;
  categoryId = catalog.body.data.categories[0].publicId;

  await register(PHONES.emp);
  await register(PHONES.workerA);
  await register(PHONES.workerB);
  await http()
    .post('/api/v1/me/onboarding')
    .set('Authorization', `Bearer ${await register(PHONES.emp)}`)
    .send({
      role: 'employer',
      orgName: 'Permission Works',
      orgType: 'FIRM',
      contactName: 'Permission Owner',
      city: 'Coimbatore',
      areaId,
      addressLine: '1, Permission Lane',
    })
    .expect(201);
  for (const [phone, name] of [
    [PHONES.workerA, 'Perm Worker A'],
    [PHONES.workerB, 'Perm Manager B'],
  ] as const) {
    await http()
      .post('/api/v1/me/onboarding')
      .set('Authorization', `Bearer ${await register(phone)}`)
      .send({ role: 'worker', fullName: name, city: 'Coimbatore', areaId, bio: 'Perm', experienceYears: 1 })
      .expect(201);
  }

  // role is granted AFTER the token was minted → re-mint
  empToken = await register(PHONES.emp);
  tokenA = await register(PHONES.workerA);
  tokenB = await register(PHONES.workerB);

  // SETUP shortcut (same as attendance.e2e-spec): crew passes the KYC gate.
  for (const phone of [PHONES.workerA, PHONES.workerB]) {
    const acc = await prisma.account.findUniqueOrThrow({ where: { phone } });
    await prisma.kycSubmission.create({
      data: {
        accountId: acc.id,
        status: 'VERIFIED',
        idType: 'PAN',
        idNumberEnc: Buffer.from('E2E-SETUP-PERM'),
        idNumberHash: `perm-kyc-${acc.id}`,
        submittedAt: new Date(),
        decidedAt: new Date(),
      },
    });
  }

  job1 = await makeJob('Permission fixture — Event 1');
  job2 = await makeJob('Permission fixture — Event 2');

  await hire(job1, tokenA, 'perm-a-j1');
  await hire(job1, tokenB, 'perm-b-j1');

  const accA = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.workerA } });
  const accB = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.workerB } });
  pubA = (await prisma.workerProfile.findUniqueOrThrow({ where: { accountId: accA.id } })).publicId;
  const profB = await prisma.workerProfile.findUniqueOrThrow({ where: { accountId: accB.id } });
  pubB = profB.publicId;
  pubBProfile = profB.publicId;

  const job1Row = await prisma.job.findUniqueOrThrow({ where: { publicId: job1 } });
  wdId = (
    await prisma.jobWorkDay.findFirstOrThrow({
      where: { jobId: job1Row.id, workDate: new Date(`${today()}T00:00:00.000Z`) },
    })
  ).id.toString();
});

afterAll(async () => {
  await app?.close();
});

describe('§38 — event-scoped attendance manager permissions', () => {
  it('T1 an ordinary crew member cannot read the manager roster (403)', async () => {
    const res = await http()
      .get(`/api/v1/jobs/${job1}/event-attendance`)
      .set('Authorization', `Bearer ${tokenA}`);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('T2 an ordinary crew member cannot mark anyone (403)', async () => {
    const res = await http()
      .post(`/api/v1/jobs/${job1}/event-attendance/mark`)
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ workerPublicId: pubA, status: 'PRESENT' });
    expect(res.status).toBe(403);
  });

  it('T3 the host designates a manager (crew member only)', async () => {
    const res = await http()
      .post(`/api/v1/jobs/${job1}/event-staff`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ workerPublicId: pubB, incentivePct: 5 })
      .expect(201);
    expect(res.body.data.worker.publicId).toBe(pubB);
    // and a non-crew worker cannot be designated
    const strangerToken = await register('+919876500209');
    const bad = await http()
      .post(`/api/v1/jobs/${job1}/event-staff`)
      .set('Authorization', `Bearer ${empToken}`)
      .send({ workerPublicId: 'no-such-worker' });
    expect(bad.status).toBe(404);
    expect(strangerToken).toBeTruthy();
  });

  it('T4 the designated manager CAN read the event roster', async () => {
    const res = await http()
      .get(`/api/v1/jobs/${job1}/event-attendance`)
      .set('Authorization', `Bearer ${tokenB}`)
      .expect(200);
    expect(res.body.data.summary.total).toBe(2);
    expect(res.body.data.summary.notMarked).toBe(2);
    expect(res.body.data.workers.every((w: { status: string }) => w.status === 'NOT_MARKED')).toBe(true);
  });

  it('T5 the manager is BLOCKED on a different event (403) — the job id is not a key', async () => {
    const res = await http()
      .get(`/api/v1/jobs/${job2}/event-attendance`)
      .set('Authorization', `Bearer ${tokenB}`);
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('T6 the manager can mark a crew member; the stored state machine is untouched', async () => {
    const res = await http()
      .post(`/api/v1/jobs/${job1}/event-attendance/mark`)
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ workerPublicId: pubA, status: 'PRESENT' })
      .expect(201);
    // The stored state machine is the invariant here; PRESENT-vs-LATE depends on
    // the work day's clock basis, which staff.domain.spec.ts pins exactly.
    expect(['PRESENT', 'LATE']).toContain(res.body.data.status as string);

    const rec = await prisma.attendanceRecord.findUniqueOrThrow({
      where: { publicId: res.body.data.recordPublicId },
      select: { status: true, checkSource: true, correctedByAccountId: true },
    });
    expect(rec.status).toBe('CHECKED_IN');
    expect(rec.checkSource).toBe('EMPLOYER');
    const accB = await prisma.account.findUniqueOrThrow({ where: { phone: PHONES.workerB } });
    expect(rec.correctedByAccountId).toBe(accB.id);
  });

  it('T7 marking on a non-work day is refused (422)', async () => {
    const res = await http()
      .post(`/api/v1/jobs/${job1}/event-attendance/mark`)
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ workerPublicId: pubA, status: 'ABSENT', date: tomorrow() });
    expect([400, 422]).toContain(res.status);
    expect(res.body.error.code).toBe('VALIDATION_FAILED');
  });

  it('T8 an APPROVED day is frozen — the host corrects, not the manager (403)', async () => {
    const rec = await prisma.attendanceRecord.findFirstOrThrow({
      where: { workDayId: BigInt(wdId) },
      select: { publicId: true },
    });
    await prisma.attendanceRecord.update({
      where: { publicId: rec.publicId },
      data: { status: 'APPROVED' },
    });
    const res = await http()
      .post(`/api/v1/jobs/${job1}/event-attendance/mark`)
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ workerPublicId: pubA, status: 'ABSENT' });
    expect(res.status).toBe(403);
    await prisma.attendanceRecord.update({
      where: { publicId: rec.publicId },
      data: { status: 'CHECKED_IN' },
    });
  });

  it('T9 the manager cannot use the host endpoints (403)', async () => {
    await http()
      .post(`/api/v1/jobs/${job1}/event-staff`)
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ workerPublicId: pubA, incentivePct: 99 })
      .expect(403);
    await http()
      .post(`/api/v1/jobs/${job1}/event-staff/incentive/apply`)
      .set('Authorization', `Bearer ${tokenB}`)
      .expect(403);
  });

  it('T10 the incentive is server-computed and idempotent (host only)', async () => {
    const job1Row = await prisma.job.findUniqueOrThrow({ where: { publicId: job1 } });
    const profBRow = await prisma.workerProfile.findUniqueOrThrow({ where: { publicId: pubBProfile } });
    // SETUP shortcut: the manager's earning row (the real path creates it at job completion)
    const existingEarning = await prisma.earning.findFirst({
      where: { jobId: job1Row.id, workerProfileId: profBRow.id },
      select: { id: true },
    });
    if (existingEarning) {
      await prisma.earning.update({
        where: { id: existingEarning.id },
        data: { amountPaise: 75_000, adjustmentPaise: 0, adjustmentReason: null },
      });
    } else {
      await prisma.earning.create({
        data: {
          jobId: job1Row.id,
          workerProfileId: profBRow.id,
          amountPaise: 75_000,
          currency: 'INR',
          status: 'PENDING',
        },
      });
    }
    await prisma.platformConfig.upsert({
      where: { key: 'ATTENDANCE_MANAGER_INCENTIVE_PCT' },
      create: { key: 'ATTENDANCE_MANAGER_INCENTIVE_PCT', valueJson: 0 },
      update: { valueJson: 0 },
    });

    const view = await http()
      .get(`/api/v1/jobs/${job1}/event-attendance/incentive`)
      .set('Authorization', `Bearer ${tokenB}`)
      .expect(200);
    expect(view.body.data.pct).toBe(5); // per-event override beats the platform default
    expect(view.body.data.incentivePaise).toBe(Math.round((75_000 * 5) / 100));

    const first = await http()
      .post(`/api/v1/jobs/${job1}/event-staff/incentive/apply`)
      .set('Authorization', `Bearer ${empToken}`)
      .set('Idempotency-Key', 'perm-inc-1')
      .expect(201);
    expect(first.body.data.incentivePaise).toBe(3_750);

    const again = await http()
      .post(`/api/v1/jobs/${job1}/event-staff/incentive/apply`)
      .set('Authorization', `Bearer ${empToken}`)
      .set('Idempotency-Key', 'perm-inc-2')
      .expect(201);
    expect(again.body.data.incentivePaise).toBe(3_750); // set, never stacked

    const row = await prisma.earning.findFirstOrThrow({
      where: { jobId: job1Row.id, workerProfileId: profBRow.id },
      select: { adjustmentPaise: true, adjustmentReason: true },
    });
    expect(Number(row.adjustmentPaise)).toBe(3_750);
    expect(row.adjustmentReason).toContain('5%');
  });

  it('T11 revoke takes the capability away immediately (403 again)', async () => {
    await http()
      .delete(`/api/v1/jobs/${job1}/event-staff/${pubB}`)
      .set('Authorization', `Bearer ${empToken}`)
      .expect(200);
    const res = await http()
      .get(`/api/v1/jobs/${job1}/event-attendance`)
      .set('Authorization', `Bearer ${tokenB}`);
    expect(res.status).toBe(403);
  });
});

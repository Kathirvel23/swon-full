import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';
import type {
  AvailabilityPut,
  OrgDto,
  MeDto,
  OnboardInput,
  OrgPatch,
  SkillsInput,
  WorkerProfileDto,
  WorkerProfilePatch,
} from '@workbridge/contracts';

import { ApiError } from '../common/api-error.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { computeEmployerCompletePct, computeWorkerCompletePct } from './completeness.js';

/**
 * /me (§14 rows 2–4): self-scoped profile reads/writes + §11.1 onboarding.
 * UI hiding is UX only — every method re-scopes by the caller's accountId.
 */
@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async me(accountId: bigint, photoUrlBase?: string): Promise<MeDto> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: {
        workerProfile: {
          include: {
            skills: { include: { skill: true } },
            availability: { include: { area: { select: { publicId: true, name: true } } }, orderBy: { workDate: 'asc' } },
            area: { select: { publicId: true, name: true } },
          },
        },
        employerProfile: { include: { area: { select: { publicId: true, name: true } } } },
        notificationPref: true,
      },
    });
    if (!account) throw new ApiError('NOT_FOUND', 'Account not found');

    const workerProfile: WorkerProfileDto | null = account.workerProfile
      ? {
          publicId: account.workerProfile.publicId,
          fullName: account.workerProfile.fullName,
          photoUrl: account.workerProfile.photoStorageKey
            ? `${photoUrlBase ?? ''}/files/${account.workerProfile.photoStorageKey}`
            : null,
          city: account.workerProfile.city,
          area: account.workerProfile.area,
          bio: account.workerProfile.bio,
          experienceYears: account.workerProfile.experienceYears,
          openToWork: account.workerProfile.openToWork,
          skills: account.workerProfile.skills.map((ws) => ({
            skillId: ws.skill.publicId,
            name: ws.skill.name,
            yearsHint: ws.yearsHint,
          })),
          avgRatingMilli: account.workerProfile.avgRatingMilli,
          ratingsCount: account.workerProfile.ratingsCount,
          jobsDoneCount: account.workerProfile.jobsDoneCount,
          profileCompletePct: account.workerProfile.profileCompletePct,
          kycBadge: false, // flipped by H3 decision flow
          availability: account.workerProfile.availability.map((slot) => ({
            publicId: slot.publicId,
            date: slot.workDate.toISOString().slice(0, 10),
            fromTime: slot.fromTime.toISOString().slice(11, 16),
            toTime: slot.toTime.toISOString().slice(11, 16),
            areaId: slot.area?.publicId ?? null,
          })),
        }
      : null;

    const org: OrgDto | null = account.employerProfile
      ? {
          publicId: account.employerProfile.publicId,
          orgName: account.employerProfile.orgName,
          orgType: account.employerProfile.orgType as OrgDto['orgType'],
          contactName: account.employerProfile.contactName,
          city: account.employerProfile.city,
          area: account.employerProfile.area,
          addressLine: account.employerProfile.addressLine,
          verificationStatus: account.employerProfile.verificationStatus,
          avgRatingMilli: account.employerProfile.avgRatingMilli,
          ratingsCount: account.employerProfile.ratingsCount,
          jobsPostedCount: account.employerProfile.jobsPostedCount,
          completenessPct: computeEmployerCompletePct(account.employerProfile),
        }
      : null;

    return {
      account: {
        publicId: account.publicId,
        role: (account.role as MeDto['account']['role']) ?? null,
        phoneMasked: mask(account.phone),
        status: account.status,
      },
      workerProfile,
      org,
      notificationPrefs: account.notificationPref
        ? {
            pushEnabled: account.notificationPref.pushEnabled,
            smsEnabled: account.notificationPref.smsEnabled,
            quietHours: account.notificationPref.quietHours,
          }
        : { pushEnabled: true, smsEnabled: true, quietHours: null },
    };
  }

  /** POST /me/onboarding — one-time role selection + minimal profile (§11.1). */
  async onboard(accountId: bigint, input: OnboardInput): Promise<{ role: string }> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: { workerProfile: true, employerProfile: true },
    });
    if (!account) throw new ApiError('NOT_FOUND', 'Account not found');
    if (account.role || account.workerProfile || account.employerProfile) {
      throw new ApiError('STATE_INVALID', 'Role already selected — one role per account');
    }

    if (input.role === 'worker') {
      const areaId = input.areaId ? await this.resolveAreaId(input.areaId) : null;
      await this.prisma.workerProfile.create({
        data: {
          accountId: account.id,
          fullName: input.fullName,
          city: input.city ?? null,
          areaId,
          bio: input.bio ?? null,
          experienceYears: input.experienceYears ?? null,
        },
      });
    } else {
      const areaId = await this.resolveAreaId(input.areaId);
      await this.prisma.employerProfile.create({
        data: {
          accountId: account.id,
          orgName: input.orgName,
          orgType: input.orgType ?? 'INDIVIDUAL',
          contactName: input.contactName,
          city: input.city,
          areaId,
          addressLine: input.addressLine,
          panRef: input.panRef ?? null,
          gstin: input.gstin ?? null,
        },
      });
    }

    await this.prisma.account.update({
      where: { id: account.id },
      data: { role: input.role, status: 'ACTIVE' }, // minimal profile done → ACTIVE (§11.1)
    });
    await this.prisma.notificationPref.upsert({
      where: { accountId: account.id },
      create: { accountId: account.id },
      update: {},
    });
    await this.prisma.auditLog.create({
      data: {
        actorAccountId: account.id,
        actorRole: input.role,
        action: 'ACCOUNT_ONBOARDED',
        entityType: 'ACCOUNT',
        entityPublicId: account.publicId,
      },
    });
    await this.recomputeWorkerPct(accountId); // employer pct is computed on read
    return { role: input.role };
  }

  async patchWorker(accountId: bigint, patch: WorkerProfilePatch): Promise<WorkerProfileDto> {
    const profile = await this.requireWorkerProfile(accountId);
    const areaId =
      patch.areaId !== undefined ? await this.resolveAreaId(patch.areaId) : undefined;
    await this.prisma.workerProfile.update({
      where: { id: profile.id },
      data: {
        ...(patch.fullName !== undefined ? { fullName: patch.fullName } : {}),
        ...(patch.bio !== undefined ? { bio: patch.bio } : {}),
        ...(patch.city !== undefined ? { city: patch.city } : {}),
        ...(areaId !== undefined ? { areaId } : {}),
        ...(patch.experienceYears !== undefined ? { experienceYears: patch.experienceYears } : {}),
        ...(patch.openToWork !== undefined ? { openToWork: patch.openToWork } : {}),
      },
    });
    await this.recomputeWorkerPct(accountId);
    return (await this.me(accountId)).workerProfile as WorkerProfileDto;
  }

  async patchOrg(accountId: bigint, patch: OrgPatch): Promise<OrgDto> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: { employerProfile: true },
    });
    if (!account?.employerProfile) {
      throw new ApiError('NOT_FOUND', 'Employer profile not found — complete onboarding first');
    }
    const areaId =
      patch.areaId !== undefined ? await this.resolveAreaId(patch.areaId) : undefined;
    await this.prisma.employerProfile.update({
      where: { id: account.employerProfile.id },
      data: {
        ...(patch.orgName !== undefined ? { orgName: patch.orgName } : {}),
        ...(patch.orgType !== undefined ? { orgType: patch.orgType } : {}),
        ...(patch.contactName !== undefined ? { contactName: patch.contactName } : {}),
        ...(patch.city !== undefined ? { city: patch.city } : {}),
        ...(areaId !== undefined ? { areaId } : {}),
        ...(patch.addressLine !== undefined ? { addressLine: patch.addressLine } : {}),
        ...(patch.panRef !== undefined ? { panRef: patch.panRef } : {}),
        ...(patch.gstin !== undefined ? { gstin: patch.gstin } : {}),
      },
    });
    return (await this.me(accountId)).org as OrgDto;
  }

  /** PUT /me/skills — replace-all set, validated against the skill catalog. */
  async putSkills(accountId: bigint, input: SkillsInput): Promise<WorkerProfileDto> {
    const profile = await this.requireWorkerProfile(accountId);
    const uniqueIds = [...new Set(input.skills.map((s) => s.skillId))];
    const skills = await this.prisma.skill.findMany({ where: { publicId: { in: uniqueIds } } });
    if (skills.length !== uniqueIds.length) {
      throw new ApiError('NOT_FOUND', 'Unknown skill in selection');
    }
    await this.prisma.$transaction([
      this.prisma.workerSkill.deleteMany({ where: { workerProfileId: profile.id } }),
      this.prisma.workerSkill.createMany({
        data: input.skills.map((s) => ({
          workerProfileId: profile.id,
          skillId: skills.find((k) => k.publicId === s.skillId)!.id,
          yearsHint: s.yearsHint ?? null,
        })),
      }),
    ]);
    await this.recomputeWorkerPct(accountId);
    return (await this.me(accountId)).workerProfile as WorkerProfileDto;
  }

  /** PUT /me/availability — replace-all set (dedupe exact duplicates, from < to). */
  async putAvailability(accountId: bigint, input: AvailabilityPut): Promise<WorkerProfileDto> {
    const profile = await this.requireWorkerProfile(accountId);

    const seen = new Set<string>();
    const rows: { workDate: Date; fromTime: Date; toTime: Date; areaId: bigint | null }[] = [];
    for (const slot of input.slots) {
      if (slot.fromTime >= slot.toTime) {
        throw new ApiError('VALIDATION_FAILED', `fromTime must be before toTime (${slot.date})`);
      }
      const key = `${slot.date}|${slot.fromTime}|${slot.toTime}`;
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({
        workDate: new Date(`${slot.date}T00:00:00.000Z`),
        fromTime: new Date(`1970-01-01T${slot.fromTime}:00.000Z`),
        toTime: new Date(`1970-01-01T${slot.toTime}:00.000Z`),
        areaId: slot.areaId ? await this.resolveAreaId(slot.areaId) : null,
      });
    }

    await this.prisma.$transaction([
      this.prisma.availabilitySlot.deleteMany({ where: { workerProfileId: profile.id } }),
      this.prisma.availabilitySlot.createMany({
        data: rows.map((r) => ({ ...r, workerProfileId: profile.id })),
      }),
    ]);
    await this.recomputeWorkerPct(accountId);
    return (await this.me(accountId)).workerProfile as WorkerProfileDto;
  }

  async setPhoto(accountId: bigint, storageKey: string): Promise<WorkerProfileDto> {
    const profile = await this.requireWorkerProfile(accountId);
    await this.prisma.workerProfile.update({
      where: { id: profile.id },
      data: { photoStorageKey: storageKey },
    });
    await this.recomputeWorkerPct(accountId);
    return (await this.me(accountId)).workerProfile as WorkerProfileDto;
  }

  /**
   * Local photo storage (Wave 1): files land under UPLOAD_DIR (default
   * Backend/uploads) behind this one method — swapping to object storage
   * presign (owner decision #14) changes ONLY this method.
   */
  async savePhoto(
    accountId: bigint,
    file: { mimetype: string; buffer: Buffer },
  ): Promise<{ storageKey: string }> {
    const ext = EXT_BY_MIME[file.mimetype] ?? 'bin';
    const dir = process.env.UPLOAD_DIR ?? join(process.cwd(), 'uploads');
    await mkdir(dir, { recursive: true });
    const storageKey = `${randomUUID()}.${ext}`;
    await writeFile(join(dir, storageKey), file.buffer);
    await this.setPhoto(accountId, storageKey);
    return { storageKey };
  }

  // --- internals ----------------------------------------------------------

  private async requireWorkerProfile(accountId: bigint) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: { workerProfile: true },
    });
    if (!account?.workerProfile) {
      throw new ApiError('NOT_FOUND', 'Worker profile not found — complete onboarding first');
    }
    return account.workerProfile;
  }

  private async resolveAreaId(publicId: string): Promise<bigint> {
    const area = await this.prisma.area.findUnique({ where: { publicId } });
    if (!area) throw new ApiError('NOT_FOUND', 'Unknown area');
    return area.id;
  }

  /** Refresh the stored worker profileCompletePct after any mutation (§9 H1). */
  private async recomputeWorkerPct(accountId: bigint): Promise<void> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: {
        workerProfile: {
          include: {
            _count: { select: { skills: true, availability: true } },
            area: { select: { publicId: true } },
          },
        },
      },
    });
    if (!account?.workerProfile) return;
    const p = account.workerProfile;
    const pct = computeWorkerCompletePct({
      fullName: p.fullName,
      photoStorageKey: p.photoStorageKey,
      areaId: p.area?.publicId ?? null,
      bio: p.bio,
      experienceYears: p.experienceYears,
      skillsCount: p._count.skills,
      availabilityCount: p._count.availability,
    });
    await this.prisma.workerProfile.update({
      where: { id: p.id },
      data: { profileCompletePct: pct },
    });
  }
}

function mask(phone: string): string {
  if (phone.length <= 6) return '***';
  return `${phone.slice(0, 3)}${'*'.repeat(phone.length - 7)}${phone.slice(-4)}`;
}

const EXT_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
};

import { Injectable } from '@nestjs/common';

import { ApiError } from '../common/api-error.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { assertCanRate, commentVisible, recomputeAggregate } from './ratings.domain.js';
import type { RatingCreate, RatingDto, RatingSummary, RatingTag } from '@workbridge/contracts';

/**
 * Ratings (§14 row 12, §22.8): mutual, double-blind for 48 h. Only
 * counterparties of a COMPLETED job; one rating per (job, rater, ratee).
 * Aggregate columns (avgRatingMilli ×1000, ratingsCount) on the ratee's
 * profile are recomputed from scratch on every insert — the integer rule
 * keeps them exact. Comments (and the rater's name) stay hidden until both
 * sides submit or 48 h pass, whichever comes first.
 */

interface Caller {
  accountId: bigint;
  role: 'worker' | 'employer' | 'admin' | null;
}

interface RatingRow {
  id: bigint;
  publicId: string;
  jobId: bigint;
  raterAccountId: bigint;
  rateeAccountId: bigint;
  raterRole: string;
  score: number;
  tags: unknown;
  comment: string | null;
  createdAt: Date;
}

@Injectable()
export class RatingsService {
  constructor(private readonly prisma: PrismaService) {}

  // -------------------------------------------------------------- create
  async create(caller: Caller, input: RatingCreate): Promise<RatingDto> {
    const job = await this.prisma.job.findUnique({
      where: { publicId: input.jobPublicId },
      select: {
        id: true,
        publicId: true,
        title: true,
        status: true,
        employer: {
          select: {
            accountId: true,
            orgName: true,
            account: { select: { id: true, publicId: true } },
          },
        },
        crew: {
          select: {
            workerProfile: {
              select: {
                accountId: true,
                fullName: true,
                account: { select: { id: true, publicId: true } },
              },
            },
          },
        },
      },
    });
    if (!job) throw new ApiError('NOT_FOUND', 'Job not found');

    const rateeAccount = await this.prisma.account.findUnique({
      where: { publicId: input.rateeAccountPublicId },
      select: { id: true, publicId: true },
    });
    if (!rateeAccount) throw new ApiError('NOT_FOUND', 'Ratee not found');

    const hiredAccountIds = [
      ...new Map(job.crew.map((c) => [c.workerProfile.accountId, c.workerProfile])).values(),
    ].map((wp) => (wp as { accountId: bigint }).accountId);

    const already = await this.prisma.rating.findUnique({
      where: {
        jobId_raterAccountId_rateeAccountId: {
          jobId: job.id,
          raterAccountId: caller.accountId,
          rateeAccountId: rateeAccount.id,
        },
      },
      select: { id: true },
    });

    assertCanRate({
      jobStatus: job.status,
      callerAccountId: caller.accountId,
      rateeAccountId: rateeAccount.id,
      employerAccountId: job.employer.account.id,
      hiredAccountIds,
      alreadyRated: already !== null,
    });

    let row: RatingRow;
    try {
      row = (await this.prisma.rating.create({
        data: {
          jobId: job.id,
          raterAccountId: caller.accountId,
          rateeAccountId: rateeAccount.id,
          raterRole: caller.role === 'employer' ? 'EMPLOYER' : 'WORKER',
          score: input.score,
          tags: input.tags && input.tags.length > 0 ? input.tags : undefined,
          comment: input.comment?.trim() ? input.comment.trim() : undefined,
        },
      })) as unknown as RatingRow;
    } catch (e) {
      // UNIQUE(job, rater, ratee) — the race twin of the pre-check above.
      if ((e as { code?: string }).code === 'P2002') {
        throw new ApiError('ALREADY_RATED', 'You have already rated this job');
      }
      throw e;
    }

    await this.refreshAggregate(rateeAccount.id);

    const counterpartRated = await this.prisma.rating.findUnique({
      where: {
        jobId_raterAccountId_rateeAccountId: {
          jobId: job.id,
          raterAccountId: rateeAccount.id,
          rateeAccountId: caller.accountId,
        },
      },
      select: { id: true },
    });

    return this.toDto(row, {
      jobPublicId: job.publicId,
      jobTitle: job.title,
      bothSubmitted: counterpartRated !== null,
      nowMs: Date.now(),
    });
  }

  // -------------------------------------------------------------- summary
  async summary(caller: Caller): Promise<RatingSummary> {
    const received = await this.prisma.rating.findMany({
      where: { rateeAccountId: caller.accountId },
      select: { score: true },
    });
    const agg = recomputeAggregate(received.map((r) => r.score));
    const pending = await this.pendingRows(caller);
    return {
      avgRatingMilli: agg.avgRatingMilli,
      ratingsCount: agg.ratingsCount,
      distribution: agg.distribution,
      pendingCount: pending.length,
    };
  }

  // -------------------------------------------------------------- pending
  async pending(caller: Caller) {
    return this.pendingRows(caller);
  }

  private async pendingRows(caller: Caller) {
    const items: Array<{
      jobPublicId: string;
      jobTitle: string;
      ratee: { publicId: string; displayName: string };
      rateeRole: 'WORKER' | 'EMPLOYER';
    }> = [];

    if (caller.role === 'worker') {
      const crew = await this.prisma.crewMember.findMany({
        where: { workerProfile: { accountId: caller.accountId }, job: { status: 'COMPLETED' } },
        select: {
          jobId: true,
          job: {
            select: {
              publicId: true,
              title: true,
              employer: { select: { orgName: true, account: { select: { publicId: true, id: true } } } },
            },
          },
        },
        orderBy: { hiredAt: 'desc' },
        take: 50,
      });
      for (const c of crew) {
        const rated = await this.prisma.rating.findUnique({
          where: {
            jobId_raterAccountId_rateeAccountId: {
              jobId: c.jobId,
              raterAccountId: caller.accountId,
              rateeAccountId: c.job.employer.account.id,
            },
          },
          select: { id: true },
        });
        if (!rated) {
          items.push({
            jobPublicId: c.job.publicId,
            jobTitle: c.job.title,
            ratee: { publicId: c.job.employer.account.publicId, displayName: c.job.employer.orgName },
            rateeRole: 'EMPLOYER',
          });
        }
      }
      return items;
    }

    const jobs = await this.prisma.job.findMany({
      where: { employer: { accountId: caller.accountId }, status: 'COMPLETED' },
      select: {
        id: true,
        publicId: true,
        title: true,
        crew: {
          select: {
            workerProfile: {
              select: {
                accountId: true,
                fullName: true,
                account: { select: { id: true, publicId: true } },
              },
            },
          },
        },
      },
      orderBy: { startsOn: 'desc' },
      take: 50,
    });
    for (const job of jobs) {
      const seen = new Set<bigint>();
      for (const c of job.crew) {
        if (seen.has(c.workerProfile.accountId)) continue;
        seen.add(c.workerProfile.accountId);
        const rated = await this.prisma.rating.findUnique({
          where: {
            jobId_raterAccountId_rateeAccountId: {
              jobId: job.id,
              raterAccountId: caller.accountId,
              rateeAccountId: c.workerProfile.accountId,
            },
          },
          select: { id: true },
        });
        if (!rated) {
          items.push({
            jobPublicId: job.publicId,
            jobTitle: job.title,
            ratee: {
              publicId: c.workerProfile.account.publicId,
              displayName: c.workerProfile.fullName,
            },
            rateeRole: 'WORKER',
          });
        }
      }
    }
    return items;
  }

  // -------------------------------------------------------------- lists
  async list(caller: Caller, scope: 'received' | 'given'): Promise<RatingDto[]> {
    const rows = (await this.prisma.rating.findMany({
      where:
        scope === 'received'
          ? { rateeAccountId: caller.accountId }
          : { raterAccountId: caller.accountId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })) as unknown as RatingRow[];

    const out: RatingDto[] = [];
    for (const row of rows) {
      const job = await this.prisma.job.findUnique({
        where: { id: row.jobId },
        select: { publicId: true, title: true },
      });
      const counterpartRated =
        (await this.prisma.rating.findUnique({
          where: {
            jobId_raterAccountId_rateeAccountId: {
              jobId: row.jobId,
              raterAccountId: row.rateeAccountId,
              rateeAccountId: row.raterAccountId,
            },
          },
          select: { id: true },
        })) !== null;
      out.push(
        await this.toDto(row, {
          jobPublicId: job?.publicId ?? '',
          jobTitle: job?.title ?? '(deleted job)',
          bothSubmitted: counterpartRated,
          nowMs: Date.now(),
        }),
      );
    }
    return out;
  }

  // -------------------------------------------------------------- internals
  private async refreshAggregate(rateeAccountId: bigint): Promise<void> {
    const scores = await this.prisma.rating.findMany({
      where: { rateeAccountId },
      select: { score: true },
    });
    const agg = recomputeAggregate(scores.map((s) => s.score));
    const data = { avgRatingMilli: agg.avgRatingMilli, ratingsCount: agg.ratingsCount };
    const wp = await this.prisma.workerProfile.findUnique({
      where: { accountId: rateeAccountId },
      select: { id: true },
    });
    if (wp) {
      await this.prisma.workerProfile.update({ where: { id: wp.id }, data });
      return;
    }
    const ep = await this.prisma.employerProfile.findUnique({
      where: { accountId: rateeAccountId },
      select: { id: true },
    });
    if (ep) {
      await this.prisma.employerProfile.update({ where: { id: ep.id }, data });
    }
  }

  private async toDto(
    row: RatingRow,
    ctx: { jobPublicId: string; jobTitle: string; bothSubmitted: boolean; nowMs: number },
  ): Promise<RatingDto> {
    const revealed = commentVisible({
      bothSubmitted: ctx.bothSubmitted,
      createdAtMs: row.createdAt.getTime(),
      nowMs: ctx.nowMs,
    });
    const [rater, ratee] = await Promise.all([
      this.accountName(row.raterAccountId),
      this.accountName(row.rateeAccountId),
    ]);
    return {
      publicId: row.publicId,
      score: row.score,
      tags: (row.tags as unknown as RatingTag[] | null) ?? [],
      comment: revealed ? row.comment : null,
      commentVisible: revealed,
      jobPublicId: ctx.jobPublicId,
      jobTitle: ctx.jobTitle,
      raterRole: row.raterRole as 'WORKER' | 'EMPLOYER',
      rater: {
        publicId: rater.publicId,
        displayName: revealed ? rater.displayName : 'Anonymous',
        photoUrl: null,
        revealed,
      },
      ratee: { publicId: ratee.publicId, displayName: ratee.displayName, photoUrl: null },
      createdAt: row.createdAt.toISOString(),
    };
  }

  private async accountName(accountId: bigint): Promise<{ publicId: string; displayName: string }> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      select: {
        publicId: true,
        role: true,
        workerProfile: { select: { fullName: true } },
        employerProfile: { select: { orgName: true } },
      },
    });
    if (!account) return { publicId: 'unknown', displayName: 'Unknown' };
    const displayName =
      account.workerProfile?.fullName ?? account.employerProfile?.orgName ?? 'SWON user';
    return { publicId: account.publicId, displayName };
  }
}

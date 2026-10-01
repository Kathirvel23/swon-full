var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ApiError } from '../common/api-error.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { assertCanRate, commentVisible, recomputeAggregate } from './ratings.domain.js';
let RatingsService = class RatingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(caller, input) {
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
        if (!job)
            throw new ApiError('NOT_FOUND', 'Job not found');
        const rateeAccount = await this.prisma.account.findUnique({
            where: { publicId: input.rateeAccountPublicId },
            select: { id: true, publicId: true },
        });
        if (!rateeAccount)
            throw new ApiError('NOT_FOUND', 'Ratee not found');
        const hiredAccountIds = [
            ...new Map(job.crew.map((c) => [c.workerProfile.accountId, c.workerProfile])).values(),
        ].map((wp) => wp.accountId);
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
        let row;
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
            }));
        }
        catch (e) {
            if (e.code === 'P2002') {
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
    async summary(caller) {
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
    async pending(caller) {
        return this.pendingRows(caller);
    }
    async pendingRows(caller) {
        const items = [];
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
            const seen = new Set();
            for (const c of job.crew) {
                if (seen.has(c.workerProfile.accountId))
                    continue;
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
    async list(caller, scope) {
        const rows = (await this.prisma.rating.findMany({
            where: scope === 'received'
                ? { rateeAccountId: caller.accountId }
                : { raterAccountId: caller.accountId },
            orderBy: { createdAt: 'desc' },
            take: 50,
        }));
        const out = [];
        for (const row of rows) {
            const job = await this.prisma.job.findUnique({
                where: { id: row.jobId },
                select: { publicId: true, title: true },
            });
            const counterpartRated = (await this.prisma.rating.findUnique({
                where: {
                    jobId_raterAccountId_rateeAccountId: {
                        jobId: row.jobId,
                        raterAccountId: row.rateeAccountId,
                        rateeAccountId: row.raterAccountId,
                    },
                },
                select: { id: true },
            })) !== null;
            out.push(await this.toDto(row, {
                jobPublicId: job?.publicId ?? '',
                jobTitle: job?.title ?? '(deleted job)',
                bothSubmitted: counterpartRated,
                nowMs: Date.now(),
            }));
        }
        return out;
    }
    async refreshAggregate(rateeAccountId) {
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
    async toDto(row, ctx) {
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
            tags: row.tags ?? [],
            comment: revealed ? row.comment : null,
            commentVisible: revealed,
            jobPublicId: ctx.jobPublicId,
            jobTitle: ctx.jobTitle,
            raterRole: row.raterRole,
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
    async accountName(accountId) {
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
            select: {
                publicId: true,
                role: true,
                workerProfile: { select: { fullName: true } },
                employerProfile: { select: { orgName: true } },
            },
        });
        if (!account)
            return { publicId: 'unknown', displayName: 'Unknown' };
        const displayName = account.workerProfile?.fullName ?? account.employerProfile?.orgName ?? 'SWON user';
        return { publicId: account.publicId, displayName };
    }
};
RatingsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], RatingsService);
export { RatingsService };
//# sourceMappingURL=ratings.service.js.map
import { describe, expect, it } from 'vitest';
import { MatchingService } from '../matching.service';

/**
 * Quick Hire sweep (owner brief §24 'offer expiring'): the 60s interval is
 * skipped under NODE_ENV=test, but the sweep body itself must group offers
 * per job and enqueue one QUICKMATCH_EXPIRING per job with all recipients.
 */
describe('MatchingService.sweepExpiring', () => {
  it('groups PENDING offers by job and enqueues one expiring event per job', async () => {
    const enqueued: Array<{
      eventKey: string;
      recipientAccountIds: bigint[];
      contextType: string;
      contextPublicId: string;
      args: Record<string, unknown>;
    }> = [];
    const respondBy = new Date(Date.now() + 4 * 60_000); // inside the 5min horizon
    const prisma = {
      quickMatchOffer: {
        findMany: async () => [
          {
            respondBy,
            jobId: 7n,
            workerProfile: { accountId: 11n },
            job: { publicId: 'job-1', title: 'Warehouse Assistant' },
          },
          {
            respondBy,
            jobId: 7n,
            workerProfile: { accountId: 12n },
            job: { publicId: 'job-1', title: 'Warehouse Assistant' },
          },
        ],
      },
    };
    const dispatcher = {
      enqueue: async (e: (typeof enqueued)[number]) => {
        enqueued.push(e);
      },
    };
    const svc = new MatchingService(
      prisma as never,
      dispatcher as never,
      {} as never,
    );

    await (svc as unknown as { sweepExpiring: () => Promise<void> }).sweepExpiring();

    expect(enqueued).toHaveLength(1);
    expect(enqueued[0].eventKey).toBe('QUICKMATCH_EXPIRING');
    expect(enqueued[0].contextType).toBe('JOB');
    expect(enqueued[0].contextPublicId).toBe('job-1');
    expect(enqueued[0].recipientAccountIds).toHaveLength(2);
    expect(enqueued[0].args.jobTitle).toBe('Warehouse Assistant');
    expect(enqueued[0].args.minutesLeft).toBe(4);
  });

  it('is a no-op when no offer is inside the horizon', async () => {
    const enqueued: unknown[] = [];
    const prisma = { quickMatchOffer: { findMany: async () => [] } };
    const dispatcher = { enqueue: async (e: unknown) => void enqueued.push(e) };
    const svc = new MatchingService(
      prisma as never,
      dispatcher as never,
      {} as never,
    );
    await (svc as unknown as { sweepExpiring: () => Promise<void> }).sweepExpiring();
    expect(enqueued).toHaveLength(0);
  });
});

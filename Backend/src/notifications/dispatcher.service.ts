import { Injectable, Logger } from '@nestjs/common';
import type { EventKey } from '@workbridge/contracts';
import { NOTIFICATION_EVENTS } from '@workbridge/contracts';

import { ApiError } from '../common/api-error.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { channelsFor } from './channels.js';

/**
 * Outbox-first notification dispatch (§12/§22, M3-core):
 *   enqueue()  → one deduped notification_outbox row per recipient, then drain.
 *   dispatchPending() → outbox → per-recipient channel plan (event ∧ prefs)
 *                       → notification_delivery rows + the INAPP Notification.
 * INAPP is the system of record; PUSH/SMS are dev-simulated until a device
 * build / SMS vendor (#11) exists — the delivery rows keep the audit trail.
 */

export interface EnqueueInput {
  eventKey: EventKey;
  recipientAccountIds: bigint[];
  contextType?: 'JOB' | 'APPLICATION' | 'EARNING' | 'KYC' | 'COMPLAINT' | 'ACCOUNT';
  contextPublicId?: string;
  args?: Record<string, string | number | boolean>;
}

interface OutboxPayload {
  titleKey: string;
  recipientAccountIds: string[];
  contextType?: string;
  contextPublicId?: string;
  args?: Record<string, string | number | boolean>;
}

@Injectable()
export class DispatcherService {
  private readonly logger = new Logger(DispatcherService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Write deduped outbox rows, then drain immediately (sync in-process dispatcher). */
  async enqueue(input: EnqueueInput): Promise<void> {
    const def = NOTIFICATION_EVENTS[input.eventKey];
    if (!def) throw new ApiError('VALIDATION_FAILED', `Unknown notification event: ${input.eventKey}`);
    if (input.recipientAccountIds.length === 0) return;

    for (const recipient of input.recipientAccountIds) {
      const dedupeKey = `${input.eventKey}:${input.contextType ?? '-'}:${input.contextPublicId ?? '-'}:${recipient}`;
      // one outbox row PER RECIPIENT — the payload must name only that
      // recipient, otherwise every row re-delivers to the whole set (each
      // admin would get every alert N times for N admins).
      const payload: OutboxPayload = {
        titleKey: def.titleKey,
        recipientAccountIds: [recipient.toString()],
        ...(input.contextType ? { contextType: input.contextType } : {}),
        ...(input.contextPublicId ? { contextPublicId: input.contextPublicId } : {}),
        ...(input.args ? { args: input.args } : {}),
      };
      try {
        await this.prisma.notificationOutbox.create({
          data: { eventKey: input.eventKey, dedupeKey, payload: payload as never },
        });
      } catch (e) {
        if ((e as { code?: string }).code === 'P2002') continue; // already enqueued — idempotent
        throw e;
      }
    }
    await this.dispatchPending();
  }

  /** Drain PENDING outbox rows: claim → per-recipient channels → deliveries. */
  async dispatchPending(limit = 50): Promise<number> {
    const rows = await this.prisma.notificationOutbox.findMany({
      where: { status: 'PENDING' },
      orderBy: { id: 'asc' },
      take: limit,
    });
    let processed = 0;

    for (const row of rows) {
      const claimed = await this.prisma.notificationOutbox.updateMany({
        where: { id: row.id, status: 'PENDING' },
        data: { status: 'SENDING', attempts: { increment: 1 } },
      });
      if (claimed.count === 0) continue;

      try {
        const payload = row.payload as unknown as OutboxPayload;
        for (const rid of payload.recipientAccountIds ?? []) {
          const accountId = BigInt(rid);
          const prefs = await this.prisma.notificationPref.findUnique({ where: { accountId } });
          const plan = channelsFor(row.eventKey as EventKey, {
            pushEnabled: prefs?.pushEnabled ?? true,
            smsEnabled: prefs?.smsEnabled ?? true,
          });

          for (const channel of plan) {
            const delivery = await this.prisma.notificationDelivery.create({
              data: { outboxId: row.id, recipientAccountId: accountId, channel },
            });
            let providerRef: string | null = null;

            if (channel === 'INAPP') {
              await this.prisma.notification.create({
                data: {
                  recipientAccountId: accountId,
                  eventKey: row.eventKey,
                  titleKey: payload.titleKey,
                  ...(payload.args ? { bodyParams: payload.args as never } : {}),
                  ...(payload.contextType ? { contextType: payload.contextType } : {}),
                  ...(payload.contextPublicId ? { contextPublicId: payload.contextPublicId } : {}),
                },
              });
              providerRef = 'inapp';
            } else if (channel === 'PUSH') {
              // Dev-sim: delivery logged, real Expo push lands with a device build.
              providerRef = 'push-dev-sim';
              this.logger.debug(`PUSH(dev-sim) ${row.eventKey} → account ${accountId}`);
            } else {
              // SMS vendor open (#11) — dev-sim, OTP SMS path unaffected.
              providerRef = 'sms-dev-sim';
              this.logger.debug(`SMS(dev-sim) ${row.eventKey} → account ${accountId}`);
            }

            await this.prisma.notificationDelivery.update({
              where: { id: delivery.id },
              data: { status: 'SENT', providerRef, attemptedAt: new Date() },
            });
          }
        }
        await this.prisma.notificationOutbox.update({
          where: { id: row.id },
          data: { status: 'SENT' },
        });
        processed += 1;
      } catch (e) {
        const attempts = row.attempts + 1;
        const dead = attempts >= 3;
        this.logger.error(`outbox ${row.id} failed (attempt ${attempts})`, e instanceof Error ? e.message : String(e));
        await this.prisma.notificationOutbox.update({
          where: { id: row.id },
          data: {
            status: dead ? 'DEAD' : 'PENDING',
            nextAttemptAt: dead ? null : new Date(Date.now() + 60_000 * attempts),
          },
        });
      }
    }
    return processed;
  }
}

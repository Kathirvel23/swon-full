import { ApiError } from './api-error.js';
import { sha256Hex } from './crypto.js';

/**
 * Idempotency-Key support (architecture §8): mutating commands (apply,
 * decisions) accept a client-generated key. Replay semantics per the
 * idempotency_key table:
 *   - first use  → row claimed IN_PROGRESS, command runs, response stored (DONE)
 *   - replay     → same request hash + DONE → stored response returned as-is
 *   - reused     → same key, different payload → IDEMPOTENCY_KEY_REUSED (409)
 *   - concurrent → IN_PROGRESS row → IDEMPOTENCY_IN_PROGRESS (409, retry)
 * The key row is deleted when the command fails, so an honest client can
 * retry with the same key after a transient error.
 *
 * Key PK = "<Idempotency-Key>:<route>" (schema comment) — routes never
 * collide even when a client reuses one random key across endpoints.
 */

/** Structural slice of PrismaService the helper needs (avoids Prisma type imports). */
export interface IdempotencyDelegate {
  create(args: { data: Record<string, unknown> }): Promise<unknown>;
  findUnique(args: { where: { key: string } }): Promise<{
    requestHash: string;
    status: string;
    responseJson: unknown;
    expiresAt: Date;
  } | null>;
  update(args: { where: { key: string }; data: Record<string, unknown> }): Promise<unknown>;
  delete(args: { where: { key: string } }): Promise<unknown>;
}

export async function withIdempotency<T>(
  keys: IdempotencyDelegate,
  opts: {
    key: string | undefined;
    route: string;
    accountId: bigint;
    request: unknown;
    run: () => Promise<T>;
  },
): Promise<T> {
  const { key, route, accountId, request, run } = opts;
  if (!key) return run(); // route decided to accept optional keys

  if (key.length < 8 || key.length > 80) {
    throw new ApiError('VALIDATION_FAILED', 'Idempotency-Key must be 8–80 characters');
  }
  const composite = `${key}:${route}`;
  const requestHash = sha256Hex(JSON.stringify(request ?? null));

  // Claim the key. A duplicate PK lands in P2002 → replay/conflict handling.
  try {
    await keys.create({
      data: {
        key: composite,
        accountId,
        requestHash,
        status: 'IN_PROGRESS',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  } catch (e) {
    if ((e as { code?: string }).code !== 'P2002') throw e;

    const existing = await keys.findUnique({ where: { key: composite } });
    if (!existing) throw e; // freed between create and read — caller retries
    if (existing.expiresAt.getTime() < Date.now()) {
      await keys.delete({ where: { key: composite } }).catch(() => undefined);
      throw new ApiError('IDEMPOTENCY_KEY_REUSED', 'Key expired — retry with a fresh key');
    }
    if (existing.requestHash !== requestHash) {
      throw new ApiError('IDEMPOTENCY_KEY_REUSED', 'Key already used with a different payload');
    }
    if (existing.status === 'DONE') return existing.responseJson as T;
    throw new ApiError('IDEMPOTENCY_IN_PROGRESS', 'Original request still running — retry shortly');
  }

  try {
    const result = await run();
    await keys.update({
      where: { key: composite },
      data: { status: 'DONE', responseJson: result as object },
    });
    return result;
  } catch (e) {
    await keys.delete({ where: { key: composite } }).catch(() => undefined);
    throw e;
  }
}

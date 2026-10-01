import { ApiError } from './api-error.js';
import { sha256Hex } from './crypto.js';
export async function withIdempotency(keys, opts) {
    const { key, route, accountId, request, run } = opts;
    if (!key)
        return run();
    if (key.length < 8 || key.length > 80) {
        throw new ApiError('VALIDATION_FAILED', 'Idempotency-Key must be 8–80 characters');
    }
    const composite = `${key}:${route}`;
    const requestHash = sha256Hex(JSON.stringify(request ?? null));
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
    }
    catch (e) {
        if (e.code !== 'P2002')
            throw e;
        const existing = await keys.findUnique({ where: { key: composite } });
        if (!existing)
            throw e;
        if (existing.expiresAt.getTime() < Date.now()) {
            await keys.delete({ where: { key: composite } }).catch(() => undefined);
            throw new ApiError('IDEMPOTENCY_KEY_REUSED', 'Key expired — retry with a fresh key');
        }
        if (existing.requestHash !== requestHash) {
            throw new ApiError('IDEMPOTENCY_KEY_REUSED', 'Key already used with a different payload');
        }
        if (existing.status === 'DONE')
            return existing.responseJson;
        throw new ApiError('IDEMPOTENCY_IN_PROGRESS', 'Original request still running — retry shortly');
    }
    try {
        const result = await run();
        await keys.update({
            where: { key: composite },
            data: { status: 'DONE', responseJson: result },
        });
        return result;
    }
    catch (e) {
        await keys.delete({ where: { key: composite } }).catch(() => undefined);
        throw e;
    }
}
//# sourceMappingURL=idempotency.js.map
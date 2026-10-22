import { describe, expect, it, vi } from 'vitest';

import { AdminService } from '../admin.service.js';
import type { PrismaService } from '../../prisma/prisma.service.js';

/**
 * Account reset ("Delete user") — verifies the admin console can free a phone
 * number without physically deleting history rows, and that admin/self targets
 * are protected.
 */
function build(account: {
  id: bigint;
  phone: string;
  role: string | null;
  status: string;
} | null) {
  const tx = {
    session: { updateMany: vi.fn(async () => ({ count: 1 })) },
    pushToken: { deleteMany: vi.fn(async () => ({ count: 1 })) },
    account: { update: vi.fn(async () => ({})) },
    auditLog: { create: vi.fn(async () => ({})) },
  };
  const prisma = {
    account: { findUnique: vi.fn(async () => account) },
    $transaction: vi.fn(async (fn: (t: typeof tx) => Promise<unknown>) => fn(tx)),
  };
  const dispatcher = { enqueue: vi.fn(async () => undefined) };
  const phase1 = {};
  const service = new AdminService(
    prisma as unknown as PrismaService,
    dispatcher as never,
    phase1 as never,
  );
  return { service, tx, prisma };
}

const caller = { accountId: 1n, role: 'admin' as const };

describe('AdminService.resetAccount', () => {
  it('closes the account, revokes sessions and tombstones the phone', async () => {
    const target = { id: 42n, phone: '+919876543210', role: 'worker', status: 'ACTIVE' };
    const { service, tx } = build(target);

    const result = await service.resetAccount(caller, 'acc_public');

    expect(result).toMatchObject({ publicId: 'acc_public', phoneReleased: true });
    expect(tx.session.updateMany).toHaveBeenCalledWith({
      where: { accountId: 42n, revokedAt: null },
      data: { revokedAt: expect.any(Date) },
    });
    expect(tx.pushToken.deleteMany).toHaveBeenCalledWith({ where: { accountId: 42n } });
    expect(tx.account.update).toHaveBeenCalledWith({
      where: { id: 42n },
      data: {
        status: 'CLOSED',
        closedAt: expect.any(Date),
        phone: 'deleted+acc_public@swon.invalid',
      },
    });
    expect(tx.auditLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ action: 'ACCOUNT_DELETED', entityPublicId: 'acc_public' }),
    });
  });

  it('refuses to delete an admin account', async () => {
    const { service } = build({ id: 2n, phone: '+919999999999', role: 'admin', status: 'ACTIVE' });
    await expect(service.resetAccount(caller, 'adm')).rejects.toMatchObject({ code: 'FORBIDDEN' });
  });

  it('refuses to delete the caller’s own account', async () => {
    const { service } = build({ id: 1n, phone: '+919999999999', role: 'worker', status: 'ACTIVE' });
    await expect(service.resetAccount(caller, 'self')).rejects.toMatchObject({ code: 'FORBIDDEN' });
  });

  it('is idempotent for an already deleted account', async () => {
    const { service, tx } = build({
      id: 3n,
      phone: 'deleted+gone@swon.invalid',
      role: 'worker',
      status: 'CLOSED',
    });
    const result = await service.resetAccount(caller, 'gone');
    expect(result.alreadyDeleted).toBe(true);
    expect(tx.account.update).not.toHaveBeenCalled();
  });

  it('404s for an unknown account', async () => {
    const { service } = build(null);
    await expect(service.resetAccount(caller, 'missing')).rejects.toMatchObject({ code: 'NOT_FOUND' });
  });
});

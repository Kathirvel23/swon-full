import * as SecureStore from 'expo-secure-store';

import { useSession } from '../session';

/**
 * Session-store smoke tests (Phase 2 test-harness deliverable, extended in
 * Wave 1 for the H1 token pair). SecureStore is mocked with an in-memory map —
 * we're testing the STORE's guarantees (hydrate/read/write/clear + hydrated
 * flag), not the OS keystore.
 */
jest.mock('expo-secure-store', () => {
  const mem = new Map<string, string>();
  return {
    getItemAsync: jest.fn(async (k: string) => mem.get(k) ?? null),
    setItemAsync: jest.fn(async (k: string, v: string) => {
      mem.set(k, v);
    }),
    deleteItemAsync: jest.fn(async (k: string) => {
      mem.delete(k);
    }),
  };
});

const resetStore = () => {
  useSession.setState({ accessToken: null, refreshToken: null, account: null, hydrated: false });
};

describe('session store', () => {
  beforeEach(async () => {
    await useSession.getState().clearSession();
    resetStore();
  });

  it('hydrate() with empty keystore → hydrated, no tokens (never fake auth)', async () => {
    expect(useSession.getState().hydrated).toBe(false);
    await useSession.getState().hydrate();
    const s = useSession.getState();
    expect(s.hydrated).toBe(true);
    expect(s.accessToken).toBeNull();
    expect(s.refreshToken).toBeNull();
    expect(s.account).toBeNull();
  });

  it('setTokens() persists BOTH tokens to SecureStore and updates state', async () => {
    await useSession.getState().setTokens('jwt.example.token', 'refresh.example.token');
    const s = useSession.getState();
    expect(s.accessToken).toBe('jwt.example.token');
    expect(s.refreshToken).toBe('refresh.example.token');
    expect(await SecureStore.getItemAsync('wb.access_token')).toBe('jwt.example.token');
    expect(await SecureStore.getItemAsync('wb.refresh_token')).toBe('refresh.example.token');
  });

  it('hydrate() restores a previously stored pair', async () => {
    await useSession.getState().setTokens('jwt.restored', 'refresh.restored');
    resetStore();
    await useSession.getState().hydrate();
    const s = useSession.getState();
    expect(s.accessToken).toBe('jwt.restored');
    expect(s.refreshToken).toBe('refresh.restored');
  });

  it('setAccount() mirrors the backend summary (role nullable until onboarding)', () => {
    useSession.setState({
      account: { publicId: 'acc_public_1', role: null, status: 'PENDING_VERIFICATION' },
    });
    expect(useSession.getState().account?.role).toBeNull();
    useSession.setState({
      account: { publicId: 'acc_public_1', role: 'worker', status: 'ACTIVE' },
    });
    expect(useSession.getState().account?.role).toBe('worker');
  });

  it('clearSession() removes BOTH tokens AND resets the account', async () => {
    await useSession.getState().setTokens('jwt.togo', 'refresh.togo');
    useSession.setState({
      account: { publicId: 'acc_1', role: 'worker', status: 'ACTIVE' },
    });
    await useSession.getState().clearSession();
    const s = useSession.getState();
    expect(s.accessToken).toBeNull();
    expect(s.refreshToken).toBeNull();
    expect(s.account).toBeNull();
    expect(await SecureStore.getItemAsync('wb.access_token')).toBeNull();
    expect(await SecureStore.getItemAsync('wb.refresh_token')).toBeNull();
  });
});

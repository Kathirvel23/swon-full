import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { create } from 'zustand';

/**
 * Session foundation (architecture §6, §15, §23):
 * - On devices, tokens live ONLY in the OS keystore (SecureStore) — never AsyncStorage.
 * - Web runs are development-preview only: an in-memory stand-in keeps the app
 *   runnable in a browser without pretending web storage is secure storage.
 * - H1: both tokens persist; `account` mirrors the backend AccountSummary
 *   (role stays null until onboarding picks one — §11.1).
 */

const TOKEN_KEY = 'wb.access_token';
const REFRESH_KEY = 'wb.refresh_token';

const memoryStore = new Map<string, string>();

const tokenStorage = {
  async get(key: string): Promise<string | null> {
    if (Platform.OS === 'web') return memoryStore.get(key) ?? null;
    return SecureStore.getItemAsync(key);
  },
  async set(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      memoryStore.set(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  async remove(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      memoryStore.delete(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

/** Mirrors backend accountSummarySchema (role nullable until onboarding). */
export type SessionAccount = {
  publicId: string;
  role: 'worker' | 'employer' | 'admin' | null;
  status: string;
  isNewAccount?: boolean;
} | null;

type SessionState = {
  accessToken: string | null;
  refreshToken: string | null;
  account: SessionAccount;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  /** Store the pair returned by OTP verify / refresh (rotated pair). */
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  setAccount: (account: SessionAccount) => void;
  clearSession: () => Promise<void>;
};

export const useSession = create<SessionState>((set) => ({
  accessToken: null,
  refreshToken: null,
  account: null,
  hydrated: false,
  hydrate: async () => {
    const [access, refresh] = await Promise.all([
      tokenStorage.get(TOKEN_KEY),
      tokenStorage.get(REFRESH_KEY),
    ]);
    set({ accessToken: access, refreshToken: refresh, hydrated: true });
  },
  setTokens: async (accessToken: string, refreshToken: string) => {
    await Promise.all([
      tokenStorage.set(TOKEN_KEY, accessToken),
      tokenStorage.set(REFRESH_KEY, refreshToken),
    ]);
    set({ accessToken, refreshToken });
  },
  setAccount: (account: SessionAccount) => set({ account }),
  clearSession: async () => {
    await Promise.all([tokenStorage.remove(TOKEN_KEY), tokenStorage.remove(REFRESH_KEY)]);
    set({ accessToken: null, refreshToken: null, account: null });
  },
}));

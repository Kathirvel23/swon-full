/**
 * Admin API client (§24 envelope rules: success { data }, failure { error }).
 * Wave 2 adds real auth: phone OTP (#4 CONFIRMED — same login as users, admin
 * role granted server-side), bearer header on every request, one silent
 * refresh retry, tokens in localStorage (admin = desktop web only).
 */

const API_BASE = '/api/v1';
const TOKEN_KEY = 'wb_admin_tokens';

export type Tokens = { accessToken: string; refreshToken: string };

export function getTokens(): Tokens | null {
  try {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Tokens;
    return parsed.accessToken && parsed.refreshToken ? parsed : null;
  } catch {
    return null;
  }
}

export function setTokens(tokens: Tokens | null): void {
  if (tokens) localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  else localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly requestId?: string,
    public readonly status?: number,
  ) {
    super(message);
  }
}

async function raw(path: string, init?: RequestInit): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string> | undefined),
  };
  const tokens = getTokens();
  if (tokens) headers.authorization = `Bearer ${tokens.accessToken}`;
  try {
    return await fetch(`${API_BASE}${path}`, { ...init, headers });
  } catch (e) {
    // A cancelled request (AbortController) is not a network failure.
    if (e instanceof DOMException && e.name === 'AbortError') throw e;
    throw new ApiError('SERVICE_UNAVAILABLE', 'Cannot reach the API. Is the backend running?');
  }
}

/**
 * Silent refresh once (§15) — same behaviour as the mobile client.
 * Returns true when a fresh token pair was stored, false when the session
 * is dead (caller drops the stored tokens).
 */
async function refreshSession(): Promise<boolean> {
  const tokens = getTokens();
  if (!tokens) return false;
  const refreshed = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken: tokens.refreshToken }),
  }).catch(() => null);
  if (!refreshed?.ok) return false;
  const payload = (await refreshed.json().catch(() => ({}))) as {
    data?: { accessToken?: string; refreshToken?: string };
  };
  if (!payload.data?.accessToken || !payload.data.refreshToken) return false;
  setTokens({ accessToken: payload.data.accessToken, refreshToken: payload.data.refreshToken });
  return true;
}

async function request<T>(path: string, init?: RequestInit, allowRefresh = true): Promise<T> {
  let res = await raw(path, init);

  if (res.status === 401 && allowRefresh && getTokens()) {
    if (await refreshSession()) res = await raw(path, init);
    if (res.status === 401) setTokens(null); // dead session → login screen
  }

  const body: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = (body as { error?: { code?: string; message?: string; requestId?: string } }).error;
    throw new ApiError(
      err?.code ?? 'INTERNAL',
      err?.message ?? `Request failed (${res.status})`,
      err?.requestId,
      res.status,
    );
  }
  return (body as { data: T }).data;
}

export const api = {
  /** `init.signal` (AbortController) cancels in-flight list requests. */
  get: <T>(path: string, init?: RequestInit) => request<T>(path, init),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body === undefined ? undefined : JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: body === undefined ? undefined : JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
  /**
   * Binary fetch with auth (document preview triggers the VIEW audit row).
   * Shares request()'s silent-refresh-once semantics: a stale access token
   * must not turn a document preview into a dead-end error.
   */
  blob: async (path: string): Promise<Blob> => {
    let res = await raw(path);
    if (res.status === 401 && getTokens()) {
      if (await refreshSession()) res = await raw(path);
      if (res.status === 401) setTokens(null);
    }
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as {
        error?: { code?: string; message?: string; requestId?: string };
      };
      const err = body.error;
      throw new ApiError(
        err?.code ?? 'FETCH_FAILED',
        err?.message ?? `Fetch failed (${res.status})`,
        err?.requestId,
        res.status,
      );
    }
    return res.blob();
  },
};

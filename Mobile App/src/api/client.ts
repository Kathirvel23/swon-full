import { API_BASE_URL } from '@/config/env';
import { useSession } from '@/store/session';

/**
 * API transport layer (architecture §6/§14/§24).
 * Single choke point for: auth header injection, the versioned base URL, the
 * response envelopes, and normalization of every failure into an AppError.
 * Screens never call fetch directly — endpoint functions are added per module wave.
 */

/** Client-side failure taxonomy (architecture §24). */
export type AppErrorKind =
  | 'network'
  | 'validation'
  | 'auth'
  | 'permission'
  | 'not_found'
  | 'conflict'
  | 'rate_limit'
  | 'server'
  | 'unknown';

export class AppError extends Error {
  readonly kind: AppErrorKind;
  readonly code?: string;
  readonly status?: number;
  readonly requestId?: string;
  readonly details?: unknown;

  constructor(init: {
    kind: AppErrorKind;
    message: string;
    code?: string;
    status?: number;
    requestId?: string;
    details?: unknown;
  }) {
    super(init.message);
    this.name = 'AppError';
    this.kind = init.kind;
    this.code = init.code;
    this.status = init.status;
    this.requestId = init.requestId;
    this.details = init.details;
  }
}

function kindForStatus(status: number): AppErrorKind {
  if (status === 400 || status === 422) return 'validation';
  if (status === 401) return 'auth';
  if (status === 403) return 'permission';
  if (status === 404) return 'not_found';
  if (status === 409) return 'conflict';
  if (status === 429) return 'rate_limit';
  if (status >= 500) return 'server';
  return 'unknown';
}

/** Error envelope shape sent by the backend (architecture §24). */
type ErrorEnvelope = {
  error?: { code?: string; message?: string; details?: unknown; requestId?: string };
};

type RequestOptions = {
  body?: unknown;
  /** Multipart upload — content-type is left to the runtime (boundary!). */
  formData?: FormData;
  /** Override the session token (undefined = read current session). */
  accessToken?: string | null;
  /** Extra request headers (e.g. Idempotency-Key on apply/decisions — §8). */
  headers?: Record<string, string>;
  /** Internal: set after one silent-refresh retry to prevent loops. */
  retried?: boolean;
};

/**
 * Silent refresh (§15): one refresh-token exchange, rotated pair persisted,
 * caller retries with the new access token. Returns null when refresh isn't
 * possible (no token / refresh rejected) → caller surfaces the 401.
 */
async function tryRefresh(): Promise<string | null> {
  const { refreshToken, setTokens } = useSession.getState();
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    const payload = (await res.json()) as {
      data?: { accessToken?: string; refreshToken?: string };
    };
    const access = payload.data?.accessToken;
    const refresh = payload.data?.refreshToken;
    if (!access || !refresh) return null;
    await setTokens(access, refresh);
    return access;
  } catch {
    return null;
  }
}

async function request<T>(path: string, method: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const headers: Record<string, string> = { accept: 'application/json' };

  const token =
    options.accessToken !== undefined ? options.accessToken : useSession.getState().accessToken;
  if (token) headers.authorization = `Bearer ${token}`;
  if (options.body !== undefined) headers['content-type'] = 'application/json';
  if (options.headers) Object.assign(headers, options.headers);

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body:
        options.formData !== undefined
          ? options.formData
          : options.body !== undefined
            ? JSON.stringify(options.body)
            : undefined,
    });
  } catch {
    throw new AppError({
      kind: 'network',
      message: 'Network request failed. Check your connection and try again.',
    });
  }

  const headerRequestId = response.headers.get('x-request-id') ?? undefined;

  // Expired access token → silent refresh once, then retry the same request.
  if (response.status === 401 && !options.retried && path !== '/auth/refresh') {
    const fresh = await tryRefresh();
    if (fresh) {
      return request<T>(path, method, { ...options, accessToken: fresh, retried: true });
    }
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const envelope = (payload ?? {}) as ErrorEnvelope;
    // Stale claims after onboarding (role granted AFTER the token was minted):
    // refresh re-reads role from the account row (§15), then retry once.
    if (response.status === 403 && !options.retried && envelope.error?.code === 'ROLE_REQUIRED') {
      const fresh = await tryRefresh();
      if (fresh) {
        return request<T>(path, method, { ...options, accessToken: fresh, retried: true });
      }
    }
    throw new AppError({
      kind: kindForStatus(response.status),
      message:
        envelope.error?.message ?? `Request failed (${response.status}). Please try again.`,
      code: envelope.error?.code,
      status: response.status,
      requestId: envelope.error?.requestId ?? headerRequestId,
      details: envelope.error?.details,
    });
  }

  // Success envelope: every endpoint returns { data } (lists also carry meta).
  // Helper types are the INNER payload — unwrap exactly once, here.
  if (payload !== null && typeof payload === 'object' && !Array.isArray(payload) && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

/** Typed transport for /api/v1. Endpoint helpers are added as modules are built. */
export const api = {
  get: <T>(path: string): Promise<T> => request<T>(path, 'GET'),
  post: <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> =>
    request<T>(path, 'POST', { ...options, body }),
  patch: <T>(path: string, body?: unknown): Promise<T> => request<T>(path, 'PATCH', { body }),
  put: <T>(path: string, body?: unknown): Promise<T> => request<T>(path, 'PUT', { body }),
  delete: <T>(path: string): Promise<T> => request<T>(path, 'DELETE'),
  /** Multipart POST (photo upload etc.) — Authorization injected, no JSON content-type. */
  upload: <T>(path: string, formData: FormData): Promise<T> =>
    request<T>(path, 'POST', { formData }),
  /** Multipart PUT (KYC presigned upload target — §20 direct-to-storage flow). */
  uploadPut: <T>(path: string, formData: FormData): Promise<T> =>
    request<T>(path, 'PUT', { formData }),
};

/** User-facing message for any thrown value (AppError → server copy, else generic). */
export function errorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message;
  return 'Something went wrong. Please try again.';
}

import { useCallback, useEffect, useState, type ReactElement } from 'react';

import { ApiError, api, getTokens, setTokens, type Tokens } from './api';
import { Button, Card, EmptyState, ErrorBanner, LoadingState, StatusPill, statusTone } from './ui';
import {
  AuditPage,
  ConfigPage,
  ComplaintsPage,
  DashboardPage,
  JobsPage,
  PaymentsPage,
  UsersPage,
} from './pages';

/**
 * Admin shell + Wave 2 pages:
 * - Login: phone → OTP → tokens (role must be 'admin', #4 CONFIRMED), silent refresh.
 * - KYC queue: real /admin/kyc data — pick (K2), logged document views (bytes
 *   via authed blob), decide (K3/K4) with the view attestation + reject reason.
 * Every other page stays an explicit placeholder (never fabricate data).
 */

type PageId =
  | 'dashboard' | 'kyc' | 'users' | 'jobs' | 'complaints' | 'payments' | 'config' | 'audit';

const NAV: { id: PageId; label: string; hint: string }[] = [
  { id: 'dashboard', label: 'Dashboard', hint: 'Live queues & day counters' },
  { id: 'kyc', label: 'KYC queue', hint: 'Review → verify/reject, document access audited' },
  { id: 'users', label: 'Users', hint: 'Search, sanctions (warn/suspend/ban), sessions' },
  { id: 'jobs', label: 'Jobs moderation', hint: 'Hide/restore any job, with reason' },
  { id: 'complaints', label: 'Complaints', hint: 'Case work: status moves + outcomes (M7)' },
  { id: 'payments', label: 'Payments oversight', hint: 'Payout queue, holds/releases, corrections' },
  { id: 'config', label: 'Config & flags', hint: 'platform_config + match weights (sum = 1)' },
  { id: 'audit', label: 'Audit view', hint: 'append-only trail, before/after JSON' },
];

// ---------------------------------------------------------------------- auth

type Account = { publicId: string; role: string | null };

/**
 * Console sign-in.
 *
 * The visible gate is the web-server username/password prompt (nginx basic-auth
 * on admin.swon.in). Behind it the console signs in to the API silently on a
 * fixed admin number, so the operator never sees a phone/OTP screen.
 *
 * Ops note: VITE_ADMIN_PHONE must be a number listed in ADMIN_PHONES on the
 * backend, and the API must be in simulated-OTP mode. When real SMS is wired
 * this should become a proper admin username/password sign-in.
 */
const ADMIN_PHONE =
  (typeof window !== 'undefined'
    ? (window as unknown as { __ADMIN_PHONE__?: string }).__ADMIN_PHONE__
    : undefined) ??
  (import.meta.env.VITE_ADMIN_PHONE as string | undefined) ??
  '';

function ConsoleSignIn({ onLogin }: { onLogin: (tokens: Tokens) => void }): ReactElement {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const signIn = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      if (!ADMIN_PHONE) throw new Error('Console is not configured (missing VITE_ADMIN_PHONE).');
      const sent = await api.post<{ challengeId: string; devCode?: string }>('/auth/otp/request', {
        phone: ADMIN_PHONE,
      });
      if (!sent.devCode) {
        throw new Error('Could not sign in automatically. Ask ops to finish the console setup.');
      }
      const res = await api.post<{ accessToken: string; refreshToken: string; account: Account }>(
        '/auth/otp/verify',
        { challengeId: sent.challengeId, code: sent.devCode },
      );
      if (res.account.role !== 'admin') {
        throw new Error(
          'This console account is not an admin on the server. Ask ops to add its number to ADMIN_PHONES.',
        );
      }
      const tokens = { accessToken: res.accessToken, refreshToken: res.refreshToken };
      setTokens(tokens);
      onLogin(tokens);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : e instanceof Error ? e.message : 'Sign-in failed');
    } finally {
      setBusy(false);
    }
  }, [onLogin]);

  useEffect(() => {
    void signIn();
  }, [signIn]);

  return (
    <div className="shell">
      <main className="content" style={{ maxWidth: 440, margin: '0 auto' }}>
        <header>
          <h1>SWON Admin</h1>
          <p className="muted">
            {busy
              ? 'Opening your console…'
              : 'Access is protected by the username and password prompt.'}
          </p>
        </header>
        <Card>
          {busy ? <p className="muted">Signing in…</p> : null}
          <ErrorBanner error={error} />
          {error && !busy ? (
            <div className="row-end">
              <Button variant="primary" className="btn-block" onClick={() => void signIn()}>
                Try again
              </Button>
            </div>
          ) : null}
        </Card>
      </main>
    </div>
  );
}

// ----------------------------------------------------------------------- kyc

type QueueItem = {
  submission: {
    publicId: string;
    status: string;
    idType: string;
    idNumberMasked: string;
    attempts: number;
    maxAttempts: number;
    rejectionReason?: string | null;
    documents: { publicId: string; docType: string; sizeBytes: number; mime: string }[];
    submittedAt?: string | null;
  };
  account: { publicId: string; phoneMasked: string; role: string; createdAt: string };
  applicantName: string;
  waitingHours: number;
};

type Detail = {
  submission: QueueItem['submission'];
  account: QueueItem['account'];
  applicantName: string;
};

function KycQueuePage(): ReactElement {
  const [queue, setQueue] = useState<QueueItem[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [attested, setAttested] = useState(false);
  const [reason, setReason] = useState('');

  const loadQueue = useCallback(async () => {
    try {
      const items = await api.get<QueueItem[]>('/admin/kyc?limit=20');
      setQueue(items);
      setError(null);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Failed to load the queue');
    }
  }, []);

  useEffect(() => {
    void loadQueue();
  }, [loadQueue]);

  // Opening a submission = K2 pick server-side; each document GET = logged VIEW.
  const open = async (publicId: string) => {
    setSelected(publicId);
    setAttested(false);
    setReason('');
    setPreviews({});
    try {
      const d = await api.get<Detail>(`/admin/kyc/${publicId}`);
      setDetail(d);
      for (const doc of d.submission.documents) {
        const blob = await api.blob(`/admin/kyc/${publicId}/documents/${doc.docType}`);
        const url = URL.createObjectURL(blob);
        setPreviews((prev) => ({ ...prev, [doc.docType]: url }));
      }
      setError(null);
    } catch (e) {
      setDetail(null);
      setError(e instanceof ApiError ? e.message : 'Failed to open the submission');
    }
  };

  const decide = async (decision: 'VERIFIED' | 'REJECTED') => {
    if (!selected) return;
    setBusy(true);
    setError(null);
    try {
      await api.post(`/admin/kyc/${selected}/decision`, {
        decision,
        idNumberMatched: decision === 'VERIFIED' ? attested : attested,
        ...(decision === 'REJECTED' ? { reason: reason.trim() } : {}),
      });
      setSelected(null);
      setDetail(null);
      await loadQueue();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Decision failed');
    } finally {
      setBusy(false);
    }
  };

  if (!queue) return <LoadingState label="Loading the KYC queue…" />;

  return (
    <section>
      <ErrorBanner error={error} />
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <p className="muted">{queue.length} waiting (oldest first)</p>
          {queue.length === 0 ? (
            <EmptyState title="Queue is empty" hint="Nothing to review right now — new submissions land here." />
          ) : null}
          {queue.map((item) => (
            <button
              key={item.submission.publicId}
              type="button"
              className={item.submission.publicId === selected ? 'nav active' : 'nav'}
              style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: 6 }}
              onClick={() => void open(item.submission.publicId)}
            >
              <strong>{item.applicantName}</strong> · {item.account.role} · {item.submission.idType}{' '}
              {item.submission.idNumberMasked}
              <br />
              <span className="muted">
                {item.submission.status} · waiting {item.waitingHours}h · attempt {item.submission.attempts}/
                {item.submission.maxAttempts}
              </span>
            </button>
          ))}
        </div>

        <div style={{ flex: 2, minWidth: 300 }}>
          {!detail ? (
            <p className="muted">Pick a submission on the left to start review (opens it and logs the pick).</p>
          ) : (
            <Card>
              <div className="row-between">
                <h2 style={{ margin: 0 }}>{detail.applicantName}</h2>
                <StatusPill tone={statusTone(detail.submission.status)}>
                  {detail.submission.status}
                </StatusPill>
              </div>
              <p className="muted">
                {detail.account.phoneMasked} · {detail.account.role} · ID {detail.submission.idType}{' '}
                {detail.submission.idNumberMasked} (masked; number was verified against the documents at upload)
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {detail.submission.documents.map((doc) => (
                  <figure key={doc.publicId} style={{ margin: 0 }}>
                    {previews[doc.docType] ? (
                      <img
                        src={previews[doc.docType]}
                        alt={doc.docType}
                        style={{ maxWidth: 220, maxHeight: 160, border: '1px solid var(--border)', borderRadius: 8 }}
                      />
                    ) : (
                      <span className="pill">loading {doc.docType}…</span>
                    )}
                    <figcaption className="muted">{doc.docType}</figcaption>
                  </figure>
                ))}
                {detail.submission.documents.length === 0 ? <p>No documents.</p> : null}
              </div>

              <label style={{ display: 'block', margin: '12px 0' }}>
                <input type="checkbox" checked={attested} onChange={(e) => setAttested(e.target.checked)} /> I
                viewed the documents above and the ID number matches
              </label>
              <Button
                variant="primary"
                disabled={!attested || busy || detail.submission.status === 'VERIFIED'}
                onClick={() => void decide('VERIFIED')}
              >
                {busy ? 'Saving…' : 'Approve (VERIFIED)'}
              </Button>

              <label className="field-label" htmlFor="kyc-reject-reason">
                Rejection reason (required, min 5 chars)
              </label>
              <input
                id="kyc-reject-reason"
                className="full"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Photo does not match the ID document"
              />
              <Button
                variant="danger"
                disabled={reason.trim().length < 5 || busy || detail.submission.status === 'REJECTED'}
                onClick={() => void decide('REJECTED')}
              >
                Reject (REJECTED)
              </Button>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------- shell

function HealthTile(): ReactElement {
  const [state, setState] = useState<{ kind: 'loading' } | { kind: 'ok'; status: string } | { kind: 'error'; message: string }>({ kind: 'loading' });
  useEffect(() => {
    let cancelled = false;
    api
      .get<{ status: string }>('/health')
      .then((data) => !cancelled && setState({ kind: 'ok', status: data.status }))
      .catch((e: unknown) => {
        if (cancelled) return;
        const msg = e instanceof ApiError ? e.message : 'Unexpected error';
        setState({ kind: 'error', message: msg });
      });
    return () => {
      cancelled = true;
    };
  }, []);
  if (state.kind === 'loading') return <span className="pill">API: checking…</span>;
  if (state.kind === 'error') return <span className="pill error">API: {state.message}</span>;
  return <span className="pill ok">API: {state.status} · admin console</span>;
}

export function App(): ReactElement {
  const [tokens, setTokensState] = useState<Tokens | null>(getTokens());
  const [page, setPage] = useState<PageId>('dashboard');
  const [checking, setChecking] = useState<boolean>(() => getTokens() !== null);

  // A stale or non-admin session left in localStorage must never hide the
  // sign-in (it would silently 403 every call). Verify once, then drop it.
  useEffect(() => {
    if (!tokens) return;
    let cancelled = false;
    api
      .get<{ account: { role: string | null } }>('/me')
      .then((me) => {
        if (!cancelled && me.account.role !== 'admin') {
          setTokens(null);
          setTokensState(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTokens(null);
          setTokensState(null);
        }
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tokens]);

  if (!tokens) {
    return <ConsoleSignIn onLogin={(t) => setTokensState(t)} />;
  }
  if (checking) {
    return (
      <div className="shell">
        <main className="content" style={{ maxWidth: 440, margin: '0 auto' }}>
          <p className="muted">Opening your console…</p>
        </main>
      </div>
    );
  }

  const current = NAV.find((n) => n.id === page)!;
  const logout = () => {
    setTokens(null);
    setTokensState(null);
  };

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <strong>SWON</strong>
          <span>Admin</span>
        </div>
        <nav>
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === page ? 'nav active' : 'nav'}
              onClick={() => setPage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <HealthTile />
          <button type="button" className="nav" onClick={logout}>
            Reload session
          </button>
        </div>
      </aside>

      <main className="content">
        <header>
          <h1>{current.label}</h1>
          <p className="muted">{current.hint}</p>
        </header>
        {page === 'dashboard' ? (
          <DashboardPage />
        ) : page === 'kyc' ? (
          <KycQueuePage />
        ) : page === 'users' ? (
          <UsersPage />
        ) : page === 'jobs' ? (
          <JobsPage />
        ) : page === 'complaints' ? (
          <ComplaintsPage />
        ) : page === 'payments' ? (
          <PaymentsPage />
        ) : page === 'config' ? (
          <ConfigPage />
        ) : page === 'audit' ? (
          <AuditPage />
        ) : (
          <section className="placeholder">
            <p>No page for this id.</p>
          </section>
        )}
      </main>
    </div>
  );
}

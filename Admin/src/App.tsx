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

function LoginScreen({ onLogin }: { onLogin: (tokens: Tokens) => void }): ReactElement {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [devCode, setDevCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const sendCode = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await api.post<{ challengeId: string; devCode?: string }>('/auth/otp/request', {
        phone: phone.trim(),
      });
      setChallengeId(res.challengeId);
      setDevCode(res.devCode ?? null);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not send the code');
    } finally {
      setBusy(false);
    }
  };

  const verify = async () => {
    if (!challengeId) return;
    setBusy(true);
    setError(null);
    try {
      const res = await api.post<{ accessToken: string; refreshToken: string; account: Account }>(
        '/auth/otp/verify',
        { challengeId, code: code.trim() },
      );
      if (res.account.role !== 'admin') {
        setTokens(null);
        setError('Signed in, but this account has no admin role. Use an admin phone number.');
        return;
      }
      const tokens = { accessToken: res.accessToken, refreshToken: res.refreshToken };
      setTokens(tokens);
      onLogin(tokens);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Verification failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="shell">
      <main className="content" style={{ maxWidth: 440, margin: '0 auto' }}>
        <header>
          <h1>Admin sign-in</h1>
          <p className="muted">Phone OTP — same login as the app; admin role is granted server-side.</p>
        </header>
        <Card>
          <label className="field-label" htmlFor="admin-phone">
            Mobile number
          </label>
          <input
            id="admin-phone"
            className="full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            autoComplete="tel"
          />
          {!challengeId ? (
            <div className="row-end">
              <Button
                variant="primary"
                className="btn-block"
                onClick={() => void sendCode()}
                disabled={busy || phone.length < 12}
              >
                {busy ? 'Sending…' : 'Send code'}
              </Button>
            </div>
          ) : (
            <>
              <label className="field-label" htmlFor="admin-otp">
                6-digit code
              </label>
              <input
                id="admin-otp"
                className="full"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                inputMode="numeric"
                autoComplete="one-time-code"
              />
              {devCode ? <p className="muted">DEV build — your code is {devCode}</p> : null}
              <div className="row-end">
                <Button
                  variant="primary"
                  className="btn-block"
                  onClick={() => void verify()}
                  disabled={busy || code.length !== 6}
                >
                  {busy ? 'Verifying…' : 'Verify & enter'}
                </Button>
              </div>
            </>
          )}
          <ErrorBanner error={error} />
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

  if (!tokens) {
    return <LoginScreen onLogin={(t) => setTokensState(t)} />;
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
            Log out
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

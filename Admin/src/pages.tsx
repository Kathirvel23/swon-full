import { useCallback, useEffect, useState, type ReactElement } from 'react';

import { ApiError, api } from './api';
import { BarChart, DonutChart } from './components/Charts';
import { Dialog } from './components/Dialog';
import { useToast } from './components/Toast';
import { Colors } from './theme';
import {
  Button,
  Card,
  DataTable,
  EmptyState,
  ErrorBanner,
  ErrorState,
  FilterBar,
  LoadingState,
  StatTile,
  StatusPill,
  Toolbar,
  statusTone,
  type Column,
} from './ui';

/**
 * Admin console pages (real data, never mocked): dashboard counters,
 * complaints case work, users + sanctions, jobs moderation, payments
 * oversight, platform config, and the append-only audit trail.
 * Conventions: V3 primitives from ./ui (Button/Card/DataTable/…), api
 * envelope { data } already unwrapped by the client. Display layer only —
 * handlers, endpoints and payload shapes are untouched.
 */

const errText = (e: unknown, fallback: string): string =>
  e instanceof ApiError ? `${e.code}: ${e.message}` : fallback;

// ------------------------------------------------------------------ dashboard

type Stats = Record<string, number>;

export function DashboardPage(): ReactElement {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setStats(await api.get<Stats>('/admin/stats'));
      setError(null);
    } catch (e) {
      setError(errText(e, 'Failed to load stats'));
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  const tiles: { key: string; label: string; tone?: 'money' | 'warm' }[] = [
    { key: 'accounts', label: 'Accounts' },
    { key: 'workers', label: 'Workers' },
    { key: 'employers', label: 'Employers' },
    { key: 'suspended', label: 'Suspended', tone: 'warm' },
    { key: 'openJobs', label: 'Live jobs' },
    { key: 'hiddenJobs', label: 'Hidden jobs' },
    { key: 'openComplaints', label: 'Open cases' },
    { key: 'pendingKyc', label: 'KYC waiting', tone: 'warm' },
    { key: 'unpaidEarnings', label: 'Approved, unpaid', tone: 'money' },
    { key: 'heldEarnings', label: 'On hold', tone: 'money' },
  ];

  if (error && !stats) {
    return (
      <section>
        <ErrorState message={error} onRetry={() => void load()} />
      </section>
    );
  }
  if (!stats) return <LoadingState label="Loading live counters…" />;

  // Accounts by role — only counters /admin/stats really returns are charted.
  const roleSlices = [
    { label: 'Workers', value: typeof stats['workers'] === 'number' ? stats['workers'] : 0, color: Colors.primary },
    { label: 'Employers', value: typeof stats['employers'] === 'number' ? stats['employers'] : 0, color: Colors.orange },
    { label: 'Admins', value: typeof stats['admin'] === 'number' ? stats['admin'] : 0, color: Colors.lavender },
  ].filter((s) => s.value > 0);

  const opsBars = [
    { label: 'Live jobs', value: stats['openJobs'] ?? 0, color: Colors.success },
    { label: 'Hidden', value: stats['hiddenJobs'] ?? 0, color: Colors.danger },
    { label: 'Open cases', value: stats['openComplaints'] ?? 0, color: Colors.info },
    { label: 'KYC waiting', value: stats['pendingKyc'] ?? 0, color: Colors.warning },
    { label: 'Unpaid', value: stats['unpaidEarnings'] ?? 0, color: Colors.green },
    { label: 'On hold', value: stats['heldEarnings'] ?? 0, color: Colors.amber },
  ];
  const accountsTotal = typeof stats['accounts'] === 'number' ? stats['accounts'] : null;

  return (
    <section>
      <ErrorBanner error={error} />
      <Toolbar onRefresh={() => void load()} hint="Live counters from the API" />
      <div className="stat-tiles">
        {tiles.map((tile) => (
          <StatTile key={tile.key} label={tile.label} value={stats[tile.key] ?? 0} tone={tile.tone} />
        ))}
      </div>

      <div className="chart-grid">
        {roleSlices.length > 0 ? (
          <Card className="chart-card">
            <div className="row-between">
              <strong>Accounts by role</strong>
              <span className="muted">
                {accountsTotal !== null
                  ? `of ${accountsTotal} total · /admin/stats`
                  : 'from live counters · /admin/stats'}
              </span>
            </div>
            <DonutChart data={roleSlices} centerLabel="accounts" />
            <p className="muted">
              Every number is a live counter from the same /admin/stats payload as the tiles; roles without a
              counter in that payload are left out (no estimated numbers).
            </p>
          </Card>
        ) : null}

        <Card className="chart-card">
          <div className="row-between">
            <strong>Live operations</strong>
            <span className="muted">open queues today</span>
          </div>
          {opsBars.some((b) => b.value > 0) ? (
            <BarChart data={opsBars} height={190} />
          ) : (
            <EmptyState title="No live activity" hint="All queues are empty right now." />
          )}
          <p className="muted">Counters from /admin/stats — live job/queue/earnings balances at a glance.</p>
        </Card>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------- complaints

type ComplaintEvent = { publicId: string; kind: string; body?: string | null; createdAt: string; actor: { displayName: string; role: string } };
type Complaint = {
  publicId: string;
  type: string;
  severity: string;
  status: string;
  narrative: string;
  resolutionNote?: string | null;
  link?: { type: string; publicId: string } | null;
  events: ComplaintEvent[];
  createdAt: string;
};

const COMPLAINT_STATUSES = ['OPEN', 'UNDER_REVIEW', 'WAITING_ON_PARTY', 'RESOLVED', 'DISMISSED', 'CLOSED_TIMEOUT'];

export function ComplaintsPage(): ReactElement {
  const toast = useToast();
  const [status, setStatus] = useState<string>('OPEN');
  const [rows, setRows] = useState<Complaint[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [nextStatus, setNextStatus] = useState('UNDER_REVIEW');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setRows(await api.get<Complaint[]>(`/admin/complaints?status=${status}`));
      setError(null);
    } catch (e) {
      setError(errText(e, 'Failed to load the queue'));
    }
  }, [status]);
  useEffect(() => {
    setSelected(null);
    void load();
  }, [load]);

  const decide = async (publicId: string) => {
    setBusy(true);
    try {
      await api.post(`/admin/complaints/${publicId}/decision`, { status: nextStatus, note: note.trim() });
      setNote('');
      setSelected(null);
      await load();
      toast.success(`Case moved to ${nextStatus}`, `Complaint ${publicId.slice(0, 10)}…`);
    } catch (e) {
      setError(errText(e, 'Decision failed'));
    } finally {
      setBusy(false);
    }
  };

  const detail = rows?.find((r) => r.publicId === selected) ?? null;

  return (
    <section>
      <ErrorBanner error={error} />
      <FilterBar>
        {COMPLAINT_STATUSES.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={s === status ? 'primary' : 'secondary'}
            aria-pressed={s === status}
            onClick={() => setStatus(s)}
          >
            {s.replace('_', ' ')}
          </Button>
        ))}
      </FilterBar>
      <Toolbar onRefresh={() => void load()} hint={`${rows?.length ?? 0} cases · ${status.toLowerCase()}`} />

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          {rows === null && error ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : rows === null ? (
            <LoadingState label="Loading the queue…" />
          ) : null}
          {rows?.length === 0 ? <EmptyState title={`No cases with status ${status.toLowerCase()}.`} /> : null}
          {rows?.map((c) => (
            <Button
              key={c.publicId}
              variant={c.publicId === selected ? 'primary' : 'secondary'}
              className="full"
              style={{ display: 'block', textAlign: 'left', marginBottom: 6 }}
              onClick={() => setSelected(c.publicId)}
            >
              <strong>{c.type}</strong> · {c.severity}
              <br />
              <span className="muted">{c.narrative.slice(0, 80)}…</span>
            </Button>
          ))}
        </div>

        <div style={{ flex: 2, minWidth: 300 }}>
          {!detail ? (
            <p className="muted">Pick a case to read its timeline and act on it (every move is audited).</p>
          ) : (
            <Card>
              <h2>
                {detail.type} — {detail.status}
              </h2>
              <p>{detail.narrative}</p>
              {detail.link ? <p className="muted">Linked {detail.link.type}: {detail.link.publicId}</p> : null}
              <h3>Timeline</h3>
              {detail.events.map((e) => (
                <p key={e.publicId} className="muted" style={{ margin: '4px 0' }}>
                  {new Date(e.createdAt).toLocaleString('en-IN')} · {e.actor.displayName} ({e.actor.role}) ·{' '}
                  {e.body ?? e.kind}
                </p>
              ))}

              <h3>Next status</h3>
              <select value={nextStatus} onChange={(e) => setNextStatus(e.target.value)}>
                {COMPLAINT_STATUSES.filter((s) => !['OPEN'].includes(s)).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Decision note (min 5 chars) — shown in the timeline"
                rows={3}
                className="full"
                style={{ marginTop: 8 }}
              />
              <div className="row-inline" style={{ marginTop: 8 }}>
                <Button variant="primary" disabled={busy || note.trim().length < 5} onClick={() => void decide(detail.publicId)}>
                  Apply decision
                </Button>
              </div>
              <p className="muted">
                Sanctions (warn/suspend/ban) and payment holds are applied from the Users / Payments tabs, or as a
                remedy inside the decision via API.
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------- users

type AccountRow = {
  publicId: string;
  phone: string;
  role: string | null;
  status: string;
  createdAt: string;
  lastLoginAt?: string | null;
  name?: string | null;
  activeSanctions: { type: string; reason: string; createdAt: string }[];
};
type AccountDetail = AccountRow & {
  activeSessions: number;
  phoneVerifiedAt?: string | null;
  sanctions: { type: string; reason: string; createdAt: string; liftedAt?: string | null }[];
  recentAudit: { at: string; action: string; entityType: string }[];
};

export function UsersPage(): ReactElement {
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [rows, setRows] = useState<AccountRow[] | null>(null);
  const [detail, setDetail] = useState<AccountDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sanctionType, setSanctionType] = useState('WARN');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('query', query.trim());
      if (statusFilter) params.set('status', statusFilter);
      setRows(await api.get<AccountRow[]>(`/admin/accounts?${params.toString()}`));
      setError(null);
    } catch (e) {
      setError(errText(e, 'Search failed'));
    }
  }, [query, statusFilter]);
  useEffect(() => {
    void load();
  }, [load]);

  const open = async (publicId: string) => {
    try {
      setDetail(await api.get<AccountDetail>(`/admin/accounts/${publicId}`));
      setError(null);
    } catch (e) {
      setError(errText(e, 'Failed to open the account'));
    }
  };

  const sanction = async () => {
    if (!detail) return;
    setBusy(true);
    try {
      await api.post(`/admin/accounts/${detail.publicId}/sanctions`, { type: sanctionType, reason: reason.trim() });
      setReason('');
      await open(detail.publicId);
      await load();
      toast.success(`${sanctionType} applied`, `Account ${detail.publicId.slice(0, 8)}…`);
    } catch (e) {
      setError(errText(e, 'Sanction failed'));
    } finally {
      setBusy(false);
    }
  };

  const reinstate = async () => {
    if (!detail) return;
    setBusy(true);
    try {
      await api.post(`/admin/accounts/${detail.publicId}/reinstate`, { note: note.trim() });
      setNote('');
      await open(detail.publicId);
      await load();
      toast.success('Account reinstated', `Sanctions lifted for ${detail.publicId.slice(0, 8)}…`);
    } catch (e) {
      setError(errText(e, 'Reinstate failed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <ErrorBanner error={error} />
      <FilterBar>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Phone or account id…"
          onKeyDown={(e) => e.key === 'Enter' && void load()}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">Any status</option>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="PENDING_VERIFICATION">Pending</option>
          <option value="CLOSED">Closed</option>
        </select>
        <Button variant="primary" size="sm" onClick={() => void load()}>
          Search
        </Button>
      </FilterBar>

      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p className="muted">{rows?.length ?? 0} matches (latest first, max 25)</p>
          {rows === null && error ? (
            <ErrorState message={error} onRetry={() => void load()} />
          ) : rows === null ? (
            <LoadingState label="Searching accounts…" />
          ) : rows.length === 0 ? (
            <EmptyState title="No accounts match" hint="Try a different phone, account id or status filter." />
          ) : null}
          {rows?.map((a) => (
            <Button
              key={a.publicId}
              variant={detail?.publicId === a.publicId ? 'primary' : 'secondary'}
              className="full"
              style={{ display: 'block', textAlign: 'left', marginBottom: 6 }}
              onClick={() => void open(a.publicId)}
            >
              <strong>{a.name ?? a.phone}</strong> · {a.role ?? 'no role'} ·{' '}
              <StatusPill tone={statusTone(a.status)}>{a.status}</StatusPill>
              {a.activeSanctions.length > 0 ? (
                <StatusPill tone="warning"> {a.activeSanctions.length} active</StatusPill>
              ) : null}
              <br />
              <span className="muted">{a.phone}</span>
            </Button>
          ))}
        </div>

        <div style={{ flex: 2, minWidth: 300 }}>
          {!detail ? (
            <p className="muted">Search and pick an account to see sessions, sanctions and its audit trail.</p>
          ) : (
            <Card>
              <h2>
                {detail.name ?? detail.phone} — {detail.status}
              </h2>
              <p className="muted">
                {detail.phone} · {detail.role ?? 'no role'} · joined {new Date(detail.createdAt).toLocaleDateString('en-IN')} ·{' '}
                {detail.activeSessions} live session(s)
              </p>

              <h3>Sanctions</h3>
              {detail.sanctions.length === 0 ? <p className="muted">None.</p> : null}
              {detail.sanctions.map((s, i) => (
                <p key={`${s.type}-${i}`} className="muted" style={{ margin: '4px 0' }}>
                  {s.type} · {new Date(s.createdAt).toLocaleDateString('en-IN')} · {s.reason}
                  {s.liftedAt ? ' (lifted)' : ''}
                </p>
              ))}

              <h3>Apply sanction</h3>
              <div className="row-inline">
                <select value={sanctionType} onChange={(e) => setSanctionType(e.target.value)}>
                  <option value="WARN">WARN</option>
                  <option value="SUSPEND">SUSPEND (blocks login, revokes sessions)</option>
                  <option value="BAN">BAN (blocks login, revokes sessions)</option>
                </select>
                <input
                  className="grow"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason (min 10 chars) — audited"
                />
                <Button
                  variant="primary"
                  disabled={busy || reason.trim().length < 10}
                  onClick={() => (sanctionType === 'WARN' ? void sanction() : setConfirming(true))}
                >
                  Apply
                </Button>
              </div>

              <h3>Reinstate</h3>
              <div className="row-inline">
                <input
                  className="grow"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Reinstate note (min 5 chars) — audited"
                />
                <Button variant="primary" disabled={busy || note.trim().length < 5} onClick={() => void reinstate()}>
                  Lift sanctions & restore
                </Button>
              </div>

              <h3>Recent audit</h3>
              {detail.recentAudit.map((a, i) => (
                <p key={`${a.at}-${i}`} className="muted" style={{ margin: '4px 0' }}>
                  {new Date(a.at).toLocaleString('en-IN')} · {a.action} · {a.entityType}
                </p>
              ))}
            </Card>
          )}
        </div>
      </div>

      <Dialog
        open={confirming}
        title={`Apply ${sanctionType}?`}
        onClose={() => setConfirming(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={busy}
              onClick={() => {
                setConfirming(false);
                void sanction();
              }}
            >
              Confirm {sanctionType}
            </Button>
          </>
        }
      >
        <p>
          <strong>{sanctionType}</strong> blocks this account{detail ? ` ${detail.publicId.slice(0, 8)}…` : ''}.
          This is audited and visible to the operator. Reason: “{reason.trim()}”.
        </p>
        <p className="muted">You can lift it later from the Reinstate control on this account.</p>
      </Dialog>
    </section>
  );
}

// ----------------------------------------------------------------------- jobs

type JobRow = {
  publicId: string;
  title: string;
  city: string;
  status: string;
  headcountRequired: number;
  hiredCount: number;
  applicationCount: number;
  payAmountPaise: string;
  payType: string;
  employerName: string;
  hiddenAt: string | null;
  hiddenReason?: string | null;
  startsOn: string;
};

export function JobsPage(): ReactElement {
  const toast = useToast();
  const [hiddenFilter, setHiddenFilter] = useState('');
  const [text, setText] = useState('');
  const [rows, setRows] = useState<JobRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [hideTarget, setHideTarget] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (hiddenFilter) params.set('hidden', hiddenFilter);
      if (text.trim()) params.set('query', text.trim());
      setRows(await api.get<JobRow[]>(`/admin/jobs?${params.toString()}`));
      setError(null);
    } catch (e) {
      setError(errText(e, 'Failed to load jobs'));
    }
  }, [hiddenFilter, text]);
  useEffect(() => {
    void load();
  }, [load]);

  const hide = async (publicId: string) => {
    setBusy(true);
    try {
      await api.post(`/admin/jobs/${publicId}/hide`, { reason: (reasons[publicId] ?? '').trim() });
      await load();
      toast.success('Job hidden', `Disabled from discovery (${publicId.slice(0, 8)}…)`);
    } catch (e) {
      setError(errText(e, 'Hide failed'));
    } finally {
      setBusy(false);
    }
  };
  const restore = async (publicId: string) => {
    setBusy(true);
    try {
      await api.post(`/admin/jobs/${publicId}/restore`);
      await load();
      toast.success('Job restored', `Back in discovery (${publicId.slice(0, 8)}…)`);
    } catch (e) {
      setError(errText(e, 'Restore failed'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <ErrorBanner error={error} />
      <FilterBar>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Title or city…"
          onKeyDown={(e) => e.key === 'Enter' && void load()}
        />
        <select value={hiddenFilter} onChange={(e) => setHiddenFilter(e.target.value)}>
          <option value="">All jobs</option>
          <option value="false">Visible only</option>
          <option value="true">Hidden only</option>
        </select>
        <Button variant="primary" size="sm" onClick={() => void load()}>
          Search
        </Button>
      </FilterBar>

      <p className="muted">Hide removes the job from discovery and worker views; the employer keeps access. Fully audited.</p>
      {rows === null && error ? (
        <ErrorState message={error} onRetry={() => void load()} />
      ) : rows === null ? (
        <LoadingState label="Loading jobs…" />
      ) : null}
      {rows?.length === 0 ? <EmptyState title="No jobs match." /> : null}
      {rows?.map((j) => (
        <Card key={j.publicId} style={{ marginBottom: 10 }}>
          <strong>{j.title}</strong>{' '}
          {j.hiddenAt ? <StatusPill tone={statusTone('HIDDEN')}>HIDDEN</StatusPill> : null}
          <br />
          <span className="muted">
            {j.city} · <StatusPill tone={statusTone(j.status)}>{j.status}</StatusPill> · {j.employerName} · ₹
            {Math.round(Number(j.payAmountPaise) / 100).toLocaleString('en-IN')} /{' '}
            {j.payType.toLowerCase()} · hired {j.hiredCount}/{j.headcountRequired} · applied {j.applicationCount} · starts{' '}
            {j.startsOn}
          </span>
          {j.hiddenAt && j.hiddenReason ? <p className="muted">Hidden reason: {j.hiddenReason}</p> : null}
          <div className="row-inline" style={{ marginTop: 8 }}>
            {!j.hiddenAt ? (
              <>
                <input
                  className="grow"
                  value={reasons[j.publicId] ?? ''}
                  onChange={(e) => setReasons((prev) => ({ ...prev, [j.publicId]: e.target.value }))}
                  placeholder="Hide reason (min 5 chars)"
                />
                <Button
                  variant="danger"
                  disabled={busy || (reasons[j.publicId] ?? '').trim().length < 5}
                  onClick={() => setHideTarget(j.publicId)}
                >
                  Hide
                </Button>
              </>
            ) : (
              <Button variant="primary" disabled={busy} onClick={() => void restore(j.publicId)}>
                Restore
              </Button>
            )}
          </div>
        </Card>
      ))}

      <Dialog
        open={hideTarget !== null}
        title="Hide this job?"
        onClose={() => setHideTarget(null)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setHideTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={busy}
              onClick={() => {
                const id = hideTarget;
                setHideTarget(null);
                if (id) void hide(id);
              }}
            >
              Confirm hide
            </Button>
          </>
        }
      >
        <p>
          <strong>{rows?.find((j) => j.publicId === hideTarget)?.title ?? 'This job'}</strong> will be removed from
          discovery and worker views. The employer keeps access. This is fully audited.
        </p>
        <p className="muted">
          Reason: “{(hideTarget ? (reasons[hideTarget] ?? '') : '').trim()}” — you can restore it any time.
        </p>
      </Dialog>
    </section>
  );
}

// ------------------------------------------------------------------- payments

type EarningRow = {
  publicId: string;
  amountPaise: string;
  status: string;
  job: { publicId: string; title: string };
  workerFullName: string;
  holdComplaint?: { publicId: string; type: string; status: string } | null;
  approvedAt?: string | null;
  updatedAt: string;
};
type TxRow = {
  publicId: string;
  status: string;
  amountPaise: string;
  reference: string;
  paidAt?: string | null;
  createdAt: string;
  earnings: { earningPublicId: string; status: string }[];
};
type Overview = { awaitingPayment: EarningRow[]; onHold: EarningRow[]; recentTransactions: TxRow[] };

const rupees = (paise: string): string =>
  `₹${Math.round(Number(paise) / 100).toLocaleString('en-IN')}`;

export function PaymentsPage(): ReactElement {
  const toast = useToast();
  const [data, setData] = useState<Overview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [releaseTarget, setReleaseTarget] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setData(await api.get<Overview>('/admin/payments/overview'));
      setError(null);
    } catch (e) {
      setError(errText(e, 'Failed to load payments'));
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  const release = async (publicId: string) => {
    setBusy(true);
    try {
      await api.post(`/admin/payments/earnings/${publicId}/release-hold`, { reason: (reasons[publicId] ?? '').trim() });
      await load();
      toast.success('Hold released', `Earning ${publicId.slice(0, 10)}… moves to the payment queue`);
    } catch (e) {
      setError(errText(e, 'Release failed'));
    } finally {
      setBusy(false);
    }
  };

  if (error && !data) {
    return (
      <section>
        <ErrorState message={error} onRetry={() => void load()} />
      </section>
    );
  }
  if (!data) return <LoadingState label="Loading payments overview…" />;

  const awaitingColumns: Column<EarningRow>[] = [
    {
      key: 'amount',
      header: 'Amount',
      num: true,
      render: (e) => <strong className="money">{rupees(e.amountPaise)}</strong>,
    },
    { key: 'worker', header: 'Worker', render: (e) => e.workerFullName },
    { key: 'job', header: 'Job', render: (e) => <span className="muted">{e.job.title}</span> },
    {
      key: 'status',
      header: 'Status',
      render: (e) => <StatusPill tone={statusTone(e.status)}>{e.status}</StatusPill>,
    },
    {
      key: 'approved',
      header: 'Approved',
      render: (e) => (e.approvedAt ? new Date(e.approvedAt).toLocaleDateString('en-IN') : '—'),
    },
  ];

  const txColumns: Column<TxRow>[] = [
    {
      key: 'amount',
      header: 'Amount',
      num: true,
      render: (t) => <strong className="money">{rupees(t.amountPaise)}</strong>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => <StatusPill tone={statusTone(t.status)}>{t.status}</StatusPill>,
    },
    { key: 'ref', header: 'Reference', render: (t) => <code>{t.reference}</code> },
    { key: 'date', header: 'Recorded', render: (t) => new Date(t.createdAt).toLocaleDateString('en-IN') },
    { key: 'earnings', header: 'Earnings', num: true, render: (t) => t.earnings.length },
  ];

  return (
    <section>
      <ErrorBanner error={error} />
      <Toolbar onRefresh={() => void load()} hint="Record-only ledger — money movement stays outside the app (V1)" />

      <h2>On hold ({data.onHold.length})</h2>
      {data.onHold.length === 0 ? (
        <EmptyState
          title="No held earnings"
          hint="Nothing is on hold right now — released earnings move to the awaiting-payment queue."
        />
      ) : (
        data.onHold.map((e) => (
          <Card key={e.publicId}>
            <div className="row-between">
              <strong className="money md">{rupees(e.amountPaise)}</strong>
              {e.holdComplaint ? (
                <StatusPill tone="warning" title={e.holdComplaint.type}>
                  case {e.holdComplaint.publicId.slice(0, 10)}…
                </StatusPill>
              ) : null}
            </div>
            <p className="muted">
              {e.workerFullName} · {e.job.title}
            </p>
            <div className="row-inline">
              <input
                className="grow"
                value={reasons[e.publicId] ?? ''}
                onChange={(ev) => setReasons((prev) => ({ ...prev, [e.publicId]: ev.target.value }))}
                placeholder="Release reason (min 5 chars) — audited"
                aria-label={`Release reason for ${e.publicId}`}
              />
              <Button
                variant="primary"
                size="sm"
                disabled={busy || (reasons[e.publicId] ?? '').trim().length < 5}
                onClick={() => setReleaseTarget(e.publicId)}
              >
                Release hold
              </Button>
            </div>
          </Card>
        ))
      )}

      <h2>Approved, awaiting payment ({data.awaitingPayment.length})</h2>
      <DataTable
        label="Approved earnings awaiting payment"
        columns={awaitingColumns}
        rows={data.awaitingPayment}
        rowKey={(e) => e.publicId}
        empty={<EmptyState title="Nothing waiting" hint="No approved earnings are waiting for payment." />}
      />

      <h2>Recent recorded payments ({data.recentTransactions.length})</h2>
      <DataTable
        label="Recent recorded payments"
        columns={txColumns}
        rows={data.recentTransactions}
        rowKey={(t) => t.publicId}
        empty={<EmptyState title="No payments recorded yet" hint="Recorded payouts will show up here." />}
      />

      <Dialog
        open={releaseTarget !== null}
        title="Release this hold?"
        onClose={() => setReleaseTarget(null)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setReleaseTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={busy}
              onClick={() => {
                const id = releaseTarget;
                setReleaseTarget(null);
                if (id) void release(id);
              }}
            >
              Confirm release
            </Button>
          </>
        }
      >
        <p>
          This releases a held earning into the awaiting-payment queue so it can be paid out. The release reason is
          audited.
        </p>
        <p className="muted">
          Reason: “{(releaseTarget ? (reasons[releaseTarget] ?? '') : '').trim()}”.
        </p>
      </Dialog>
    </section>
  );
}

// --------------------------------------------------------------------- config

type ConfigRow = { key: string; valueJson: unknown; scope: string; version: number; updatedAt: string };
type ConfigView = {
  flags: ConfigRow[];
  matchWeights: { version: number; weights: Record<string, number> };
};

export function ConfigPage(): ReactElement {
  const toast = useToast();
  const [data, setData] = useState<ConfigView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await api.get<ConfigView>('/admin/config'));
      setError(null);
    } catch (e) {
      setError(errText(e, 'Failed to load config'));
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  const save = async (key: string, raw: string) => {
    setBusy(true);
    try {
      const parsed = JSON.parse(raw) as unknown;
      await api.put(`/admin/config/${key}`, { value: parsed });
      await load();
      toast.success('Config saved', `Flag ${key} updated (version bumped, audited)`);
    } catch (e) {
      setError(
        e instanceof SyntaxError ? 'Value must be valid JSON' : errText(e, 'Save failed'),
      );
    } finally {
      setBusy(false);
    }
  };

  if (error && !data)
    return (
      <section>
        <ErrorState message={error} onRetry={() => void load()} />
      </section>
    );
  if (!data)
    return (
      <section>
        <LoadingState label="Loading platform config…" />
      </section>
    );
  const wSum = Object.values(data.matchWeights.weights).reduce((a, b) => a + b, 0);

  return (
    <section>
      <ErrorBanner error={error} />
      <Toolbar onRefresh={() => void load()} hint="platform_config — every write bumps the version and is audited" />

      <Card>
        <strong>Match weights (read-only — v{data.matchWeights.version}, sums to {wSum})</strong>
        <p className="muted">
          {Object.entries(data.matchWeights.weights)
            .map(([k, v]) => `${k} ${v}%`)
            .join(' · ')}
        </p>
        <p className="muted">Changing match scoring = a code change (weights are unit-tested), not a config edit.</p>
      </Card>

      {data.flags.map((f) => (
        <Card key={f.key}>
          <strong>{f.key}</strong> <span className="pill">v{f.version}</span> <span className="muted">{f.scope}</span>
          <textarea
            value={edits[f.key] ?? JSON.stringify(f.valueJson, null, 2)}
            onChange={(e) => setEdits((prev) => ({ ...prev, [f.key]: e.target.value }))}
            rows={3}
            className="full"
            style={{ marginTop: 6, fontFamily: 'monospace' }}
          />
          <div className="row-inline" style={{ marginTop: 8 }}>
            <Button
              variant="primary"
              size="sm"
              disabled={busy || (edits[f.key] ?? '').trim().length === 0}
              onClick={() => void save(f.key, edits[f.key] ?? '')}
            >
              Save {f.key}
            </Button>
          </div>
        </Card>
      ))}

      <Card>
        <strong>Add / overwrite a flag</strong>
        <div className="row-inline" style={{ marginTop: 6 }}>
          <input value={newKey} onChange={(e) => setNewKey(e.target.value.toUpperCase())} placeholder="SOME_FLAG_NAME" />
          <input
            className="grow"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder='JSON value, e.g. {"enabled": true}'
          />
          <Button
            variant="primary"
            size="sm"
            disabled={busy || !/^[A-Z][A-Z0-9_]{1,59}$/.test(newKey) || newValue.trim().length === 0}
            onClick={() => void save(newKey, newValue)}
          >
            Save flag
          </Button>
        </div>
      </Card>
    </section>
  );
}

// ---------------------------------------------------------------------- audit

type AuditRow = {
  id: string;
  at: string;
  action: string;
  entityType: string;
  entityPublicId: string;
  actorRole: string | null;
  actor: { publicId: string; role: string | null; phone: string } | null;
  requestId?: string | null;
  beforeJson: unknown;
  afterJson: unknown;
};

export function AuditPage(): ReactElement {
  const [action, setAction] = useState('');
  const [entityType, setEntityType] = useState('');
  const [entityPublicId, setEntityPublicId] = useState('');
  const [rows, setRows] = useState<AuditRow[] | null>(null); // client unwraps { data }; meta is dropped
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (action.trim()) params.set('action', action.trim());
    if (entityType.trim()) params.set('entityType', entityType.trim());
    if (entityPublicId.trim()) params.set('entityPublicId', entityPublicId.trim());
    params.set('limit', '100');
    try {
      setRows(await api.get<AuditRow[]>(`/admin/audit?${params.toString()}`));
      setError(null);
    } catch (e) {
      setError(errText(e, 'Failed to load the audit trail'));
    }
  }, [action, entityType, entityPublicId]);
  useEffect(() => {
    void load();
  }, [load]);

  const columns: Column<AuditRow>[] = [
    {
      key: 'action',
      header: 'Action',
      render: (r) => (
        <>
          <strong>{r.action}</strong>
          <div className="muted">
            {r.entityType} {r.entityPublicId}
          </div>
        </>
      ),
    },
    {
      key: 'actor',
      header: 'Actor',
      render: (r) => (
        <>
          <StatusPill tone={r.actorRole === 'admin' ? 'brand' : 'neutral'}>
            {r.actorRole ?? 'system'}
          </StatusPill>
          {r.actor ? <div className="muted">{r.actor.phone}</div> : null}
        </>
      ),
    },
    {
      key: 'at',
      header: 'When',
      render: (r) => (
        <>
          <span className="muted">{new Date(r.at).toLocaleString('en-IN')}</span>
          {r.requestId ? <div className="muted cap">req {r.requestId.slice(0, 12)}…</div> : null}
        </>
      ),
    },
    {
      key: 'changes',
      header: 'Changes',
      render: (r) =>
        r.beforeJson || r.afterJson ? (
          <details>
            <summary>before / after</summary>
            <pre>
              {r.beforeJson ? `before: ${JSON.stringify(r.beforeJson, null, 2)}\n` : ''}
              {r.afterJson ? `after: ${JSON.stringify(r.afterJson, null, 2)}` : ''}
            </pre>
          </details>
        ) : (
          <span className="muted">—</span>
        ),
    },
  ];

  return (
    <section>
      <ErrorBanner error={error} />
      <FilterBar>
        <input
          value={action}
          onChange={(e) => setAction(e.target.value)}
          placeholder="Action e.g. JOB_HIDDEN"
          aria-label="Action filter"
        />
        <input
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          placeholder="Entity e.g. JOB"
          aria-label="Entity type filter"
        />
        <input
          value={entityPublicId}
          onChange={(e) => setEntityPublicId(e.target.value)}
          placeholder="Entity id…"
          aria-label="Entity id filter"
        />
        <Button variant="primary" size="sm" onClick={() => void load()}>
          Filter
        </Button>
      </FilterBar>
      <p className="muted">
        Append-only trail (the app role has no UPDATE/DELETE grant) · showing {rows?.length ?? 0} of up to 100 · newest
        first
      </p>
      {rows === null && error ? (
        <ErrorState message={error} onRetry={() => void load()} />
      ) : (
        <DataTable
          label="Audit trail"
          columns={columns}
          rows={rows}
          rowKey={(r) => r.id}
          empty={
            <EmptyState
              title="No audit rows match those filters"
              hint="Try a wider action, entity type or entity id."
            />
          }
        />
      )}
    </section>
  );
}

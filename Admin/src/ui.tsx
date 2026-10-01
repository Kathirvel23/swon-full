import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';

/**
 * V3 shared UI primitives for the Admin console.
 * Display layer only: no data fetching, no routing, no state of their own —
 * callers keep their existing api.* calls and handlers untouched.
 * Styles live in styles.css (tokens from Documentation/UI_PROTOTYPE.html,
 * status→color map per Documentation/UI_UX_DESIGN.md §2).
 */

export type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

// ------------------------------------------------------------------ button

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'md' | 'sm';
};

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps): ReactElement {
  const classes = ['btn', `btn-${variant}`, size === 'sm' ? 'btn-sm' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}

// ----------------------------------------------------------- status pill

const STATUS_TONES: Record<string, Tone> = {
  // UI_UX_DESIGN.md §2: DRAFT grey · OPEN green · HIRING amber · FILLED teal ·
  // CANCELLED red · COMPLETED blue · PAID green (money)
  DRAFT: 'neutral',
  OPEN: 'success',
  HIRING: 'warning',
  FILLED: 'brand',
  CANCELLED: 'danger',
  COMPLETED: 'info',
  PAID: 'success',
  // admin console statuses
  ACTIVE: 'success',
  PENDING_VERIFICATION: 'warning',
  PENDING: 'warning',
  SUSPENDED: 'danger',
  BANNED: 'danger',
  BAN: 'danger',
  CLOSED: 'neutral',
  VERIFIED: 'success',
  REJECTED: 'danger',
  UNDER_REVIEW: 'warning',
  WAITING_ON_PARTY: 'warning',
  WAITING: 'warning',
  RESOLVED: 'success',
  DISMISSED: 'neutral',
  CLOSED_TIMEOUT: 'neutral',
  ON_HOLD: 'warning',
  HOLD: 'warning',
  APPROVED: 'success',
  PROCESSING: 'warning',
  FAILED: 'danger',
  REFUNDED: 'info',
  HIDDEN: 'danger',
  LIVE: 'success',
  SCHEDULED: 'info',
};

const TONE_RULES: [string[], Tone][] = [
  [['REJECT', 'SUSPEND', 'BAN', 'CANCEL', 'FAIL', 'ERROR', 'HIDDEN', 'BLOCK'], 'danger'],
  [['PENDING', 'REVIEW', 'WAIT', 'HOLD', 'PROCESS', 'SUBMITTED', 'DRAFT'], 'warning'],
  [['APPROV', 'SUCCESS', 'COMPLETE', 'VERIFIED', 'PAID', 'ACTIVE', 'LIVE', 'RESTORED', 'RELEASE'], 'success'],
  [['INFO', 'SCHEDULE', 'CREATED', 'COMPLETED'], 'info'],
];

/** Single status→tone map (never scatter colors in call sites). */
export function statusTone(raw: string): Tone {
  const key = raw.trim().toUpperCase().replace(/[\s-]+/g, '_');
  const exact = STATUS_TONES[key];
  if (exact) return exact;
  for (const [words, tone] of TONE_RULES) {
    if (words.some((w) => key.includes(w))) return tone;
  }
  return 'neutral';
}

export function StatusPill({
  tone = 'neutral',
  title,
  children,
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
}): ReactElement {
  return (
    <span className={`status tone-${tone}`} title={title}>
      {children}
    </span>
  );
}

// ------------------------------------------------------------------ card

export function Card({
  className = '',
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { children?: ReactNode }): ReactElement {
  return (
    <div className={className ? `card ${className}` : 'card'} {...rest}>
      {children}
    </div>
  );
}

// ------------------------------------------------------- toolbar / filter

export function Toolbar({ onRefresh, hint }: { onRefresh: () => void; hint?: string }): ReactElement {
  return (
    <div className="toolbar">
      <Button variant="secondary" size="sm" onClick={onRefresh}>
        Refresh
      </Button>
      {hint ? <span className="muted">{hint}</span> : null}
    </div>
  );
}

export function FilterBar({ children, hint }: { children: ReactNode; hint?: string }): ReactElement {
  return (
    <div className="filterbar">
      {children}
      {hint ? <span className="muted">{hint}</span> : null}
    </div>
  );
}

// ------------------------------------------------------- empty / loading

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}): ReactElement {
  return (
    <div className="state-box">
      <div className="st-art" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="3" y="4.5" width="18" height="15" rx="3.5" />
          <path d="M3 9.5h18M7.5 14h6" strokeLinecap="round" />
        </svg>
      </div>
      <div className="st-t">{title}</div>
      {hint ? <div className="st-d">{hint}</div> : null}
      {action}
    </div>
  );
}

export function LoadingState({ label = 'Loading…' }: { label?: string }): ReactElement {
  return (
    <div className="loading-box" role="status">
      <span className="spin-ring" aria-hidden="true" />
      {label}
    </div>
  );
}

/** Inline error banner (replaces the old color-only error line). */
export function ErrorBanner({ error }: { error: string | null }): ReactElement | null {
  if (!error) return null;
  return (
    <p className="alert-box" role="alert">
      {error}
    </p>
  );
}

// -------------------------------------------------------------- table

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  /** right-align + tabular numerals (amounts, counts) */
  num?: boolean;
};

/**
 * Data table with the five states handled centrally:
 * null → loading, [] → empty, otherwise zebra + hover rows.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  empty,
  label,
}: {
  columns: Column<T>[];
  rows: T[] | null;
  rowKey: (row: T) => string;
  empty?: ReactNode;
  label?: string;
}): ReactElement {
  if (rows === null) return <LoadingState />;
  if (rows.length === 0) {
    return <>{empty ?? <EmptyState title="Nothing to show" hint="No records match the current view." />}</>;
  }
  return (
    <div className="table-wrap">
      <table className="data">
        {label ? <caption>{label}</caption> : null}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={c.num ? 'num' : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((c) => (
                <td key={c.key} className={c.num ? 'num' : undefined}>
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ------------------------------------------------------------ stat tile

export function StatTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone?: 'money' | 'warm';
}): ReactElement {
  return (
    <div className={tone ? `tile ${tone}` : 'tile'}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

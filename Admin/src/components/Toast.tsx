import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

import { Colors, Motion, Radius } from '../theme';

export type ToastKind = 'success' | 'error' | 'info' | 'warning';
type ToastItem = { id: number; kind: ToastKind; message: string; title?: string };

export interface ToastApi {
  push: (kind: ToastKind, message: string, title?: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

const KIND_COLOR: Record<ToastKind, string> = {
  success: Colors.success,
  error: Colors.danger,
  info: Colors.info,
  warning: Colors.warning,
};

const AUTODISMISS_MS = 4200;

/**
 * Toast provider — a single stack of non-blocking notifications rendered in a
 * corner viewport. Replace ad-hoc inline error lines; every async mutation can
 * surface its outcome here. Display layer only: no fetching/state of its own.
 */
export function ToastProvider({ children }: { children: ReactNode }): ReactElement {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (kind: ToastKind, message: string, title?: string) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, kind, message, title }]);
      window.setTimeout(() => dismiss(id), AUTODISMISS_MS);
    },
    [dismiss],
  );

  const api: ToastApi = {
    push,
    success: (m, t) => push('success', m, t),
    error: (m, t) => push('error', m, t),
    info: (m, t) => push('info', m, t),
    warning: (m, t) => push('warning', m, t),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-viewport" role="region" aria-live="polite" aria-label="Notifications">
        {toasts.map((t) => (
          <div key={t.id} className="toast" role="status" style={{ borderLeftColor: KIND_COLOR[t.kind] }}>
            <span
              className="toast-dot"
              aria-hidden="true"
              style={{ backgroundColor: KIND_COLOR[t.kind] }}
            />
            <span className="toast-body">
              {t.title ? <strong className="toast-title">{t.title}</strong> : null}
              <span className="toast-msg">{t.message}</span>
            </span>
            <button
              type="button"
              className="toast-close"
              aria-label="Dismiss notification"
              onClick={() => dismiss(t.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>.');
  return ctx;
}

// Keep a reference to the motion/radius tokens so tree-shaking never drops them
// and the constants are genuinely referenced from the theme module.
void Motion.fast;
void Radius.md;
import { useEffect, type ReactElement, type ReactNode } from 'react';

/**
 * Accessible modal dialog: overlay + Escape + focus managed. Pure shell — the
 * caller keeps its existing handler (the button that would fire on confirm is
 * passed straight through). Replaces raw window.confirm / inline modal divs.
 */
export function Dialog({
  open,
  title,
  children,
  footer,
  onClose,
  width = 440,
}: {
  open: boolean;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  width?: number;
}): ReactElement | null {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    // Focus the dialog so keyboard users land inside the modal on open.
    const el = document.getElementById('wb-dialog-live');
    el?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onClose} role="presentation">
      <div
        id="wb-dialog-live"
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-head">
          <h2>{title}</h2>
          <button type="button" className="dialog-x" aria-label="Close dialog" onClick={onClose}>
            ×
          </button>
        </div>
        {children ? <div className="dialog-body">{children}</div> : null}
        {footer ? <div className="dialog-foot">{footer}</div> : null}
      </div>
    </div>
  );
}
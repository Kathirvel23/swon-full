import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { ToastProvider } from './components/Toast';
import { Colors, Fonts } from './theme';
import './styles.css';

/**
 * Push the code-side token module (src/theme.ts — mirror of the mobile brand)
 * into the CSS custom properties the stylesheet consumes. One source of truth:
 * components import from ./theme for inline values, and the cascade reads the
 * same values here. Static :root defaults in styles.css stay as a no-JS fallback.
 */
function applyTheme(): void {
  const root = document.documentElement;
  const set = (key: string, value: string): void => root.style.setProperty(key, value);
  const c = Colors;

  set('--primary', c.primary);
  set('--primary-dark', c.primaryDark);
  set('--primary-deep', c.primaryDeep);
  set('--primary-light', c.primaryLight);
  set('--tint', c.tint);
  set('--success', c.success);
  set('--warning', c.warning);
  set('--danger', c.danger);
  set('--info', c.info);
  set('--canvas', c.background);
  set('--card', c.card);
  set('--line', c.line);
  set('--border', c.border);
  set('--text', c.text);
  set('--muted', c.textMuted);
  set('--on-brand', c.onPrimary);
  set('--orange', c.orange);
  set('--amber', c.amber);
  set('--green', c.green);
  set('--blue', c.blue);
  set('--font', Fonts.body);
  set('--display', Fonts.display);
}

applyTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);

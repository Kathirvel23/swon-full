/**
 * SWON Admin design tokens — the code mirror of the mobile brand source of
 * truth (`Mobile App/src/constants/theme.ts`, V3 "Vibrant & Dynamic").
 *
 * Single source of truth for color, status→tone, typography, space, radius,
 * motion, gradients and elevation. Screens and components import from here and
 * NEVER hardcode a hex value (plan Factor-12 acceptance: same brand tokens as
 * the mobile app; Factor-1 drift target → 0 hex literals outside a token file).
 *
 * The admin console runs light mode only (ops surface in English). `applyTheme()`
 * (see `main.tsx`) pushes these values into the CSS custom properties that the
 * stylesheet consumes, so one module drives both inline styles and the cascade.
 *
 * Every hex below matches the mobile `light` palette verbatim.
 */

export const Colors = {
  // --- surfaces (V3 warm canvas) ---
  text: '#10201E', // V3 ink
  background: '#F6F3EC', // V3 warm canvas
  backgroundElement: '#FFFFFF', // legacy: raised surface (= card)
  backgroundSelected: '#EAE4D7', // warm pressed/selected fill
  card: '#FFFFFF',
  border: '#E4DDD0', // input/chip border
  line: '#EFEAE0', // card hairline
  textMuted: '#4F5F5C', // V3 muted
  textSecondary: '#4F5F5C',

  // --- brand ---
  primary: '#0F766E', // teal-700 — AA on white
  primaryDark: '#115E59',
  primaryDeep: '#0B4540', // V3 deep teal — gradients
  primaryLight: '#CCFBF1',
  tint: '#EFFCF9', // V3 tint — soft teal fills
  onPrimary: '#FFFFFF',

  // --- semantic ---
  success: '#15803D',
  warning: '#B45309',
  danger: '#B91C1C',
  info: '#1D4ED8',

  // --- V3 contextual accents (by meaning, never rainbow) ---
  orange: '#F97316', // warm energy
  amber: '#F59E0B', // warning / attention
  yellow: '#FDE047',
  coral: '#EF5B47', // urgent
  green: '#16A34A', // money
  blue: '#2563EB', // info
  lavender: '#8B7CF6',

  // --- status fg/bg pairs (mirrors mobile Colors.status) ---
  status: {
    DRAFT: { fg: '#475569', bg: '#F1F5F9' },
    OPEN: { fg: '#15803D', bg: '#DCFCE7' },
    HIRING: { fg: '#B45309', bg: '#FEF3C7' },
    FILLED: { fg: '#115E59', bg: '#CCFBF1' },
    CANCELLED: { fg: '#B91C1C', bg: '#FEE2E2' },
    COMPLETED: { fg: '#1D4ED8', bg: '#DBEAFE' },
    PENDING: { fg: '#475569', bg: '#F1F5F9' },
    ACTIVE: { fg: '#15803D', bg: '#DCFCE7' },
    ELIGIBLE: { fg: '#115E59', bg: '#CCFBF1' },
    PAID: { fg: '#15803D', bg: '#DCFCE7' },
    REJECTED: { fg: '#B91C1C', bg: '#FEE2E2' },
    NO_SHOW: { fg: '#B91C1C', bg: '#FEE2E2' },
    WARNED: { fg: '#B45309', bg: '#FEF3C7' },
    SUSPENDED: { fg: '#B91C1C', bg: '#FEE2E2' },
    BANNED: { fg: '#FFFFFF', bg: '#B91C1C' },
    APPLIED: { fg: '#0B4540', bg: '#CCFBF1' },
    SHORTLISTED: { fg: '#2563EB', bg: '#DBEAFE' },
    WAITLISTED: { fg: '#B45309', bg: '#FEF3C7' },
    HIRED: { fg: '#15803D', bg: '#DCFCE7' },
    WITHDRAWN: { fg: '#4F5F5C', bg: '#EFEAE0' },
    EXPIRED: { fg: '#4F5F5C', bg: '#EFEAE0' },
    RELEASED: { fg: '#4F5F5C', bg: '#EFEAE0' },
    NOT_STARTED: { fg: '#B45309', bg: '#FEF3C7' },
    NONE: { fg: '#B45309', bg: '#FEF3C7' },
    CHECKED_IN: { fg: '#15803D', bg: '#DCFCE7' },
    CHECKED_OUT: { fg: '#1D4ED8', bg: '#DBEAFE' },
    APPROVED: { fg: '#15803D', bg: '#DCFCE7' },
    PROCESSING: { fg: '#1D4ED8', bg: '#DBEAFE' },
    FAILED: { fg: '#B91C1C', bg: '#FEE2E2' },
    ON_HOLD: { fg: '#B45309', bg: '#FEF3C7' },
    // --- admin-only statuses the console renders ---
    PENDING_VERIFICATION: { fg: '#B45309', bg: '#FEF3C7' },
    UNDER_REVIEW: { fg: '#B45309', bg: '#FEF3C7' },
    WAITING_ON_PARTY: { fg: '#B45309', bg: '#FEF3C7' },
    RESOLVED: { fg: '#15803D', bg: '#DCFCE7' },
    DISMISSED: { fg: '#475569', bg: '#F1F5F9' },
    CLOSED_TIMEOUT: { fg: '#475569', bg: '#F1F5F9' },
    VERIFIED: { fg: '#15803D', bg: '#DCFCE7' },
    CLOSED: { fg: '#475569', bg: '#F1F5F9' },
    HIDDEN: { fg: '#B91C1C', bg: '#FEE2E2' },
    LIVE: { fg: '#15803D', bg: '#DCFCE7' },
    REFUNDED: { fg: '#1D4ED8', bg: '#DBEAFE' },
  } as Record<string, { fg: string; bg: string }>,

  skeleton: '#E2E8F0',
  overlay: 'rgba(15, 23, 42, 0.45)',
  scrim: 'rgba(16, 32, 30, 0.45)',
  dangerSoft: '#FEE2E2',
  coralSoft: '#FFF1ED',
  warningSoft: '#FFF7ED',
} as const;

/** Unknown statuses fall back to the neutral draft pair — never a crash. */
const STATUS_FALLBACK: { fg: string; bg: string } = { fg: '#475569', bg: '#F1F5F9' };
export function statusColors(status: string): { fg: string; bg: string } {
  const key = status.toUpperCase().replace(/[\s-]+/g, '_');
  return Colors.status[key] ?? STATUS_FALLBACK;
}

/**
 * V3 typography (§0.4). Both faces are loaded in `index.html` from Google Fonts
 * ("Bricolage Grotesque" display face, "Manrope" body face) — same identities
 * the mobile app bundles via @expo-google-fonts.
 */
export const Fonts = {
  display: '"Bricolage Grotesque", "Manrope", system-ui, sans-serif', // headings, money
  body: '"Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif', // body
  mono: 'ui-monospace, "Cascadia Mono", "Segoe UI Mono", Menlo, monospace',
} as const;

/** 4px grid (design §2). */
export const Spacing = { one: 4, two: 8, mid: 12, three: 16, four: 24, five: 32, six: 64 } as const;

/** Radius scale (matches mobile Radius). */
export const Radius = { sm: 8, md: 12, btn: 14, lg: 18, xl: 24, xxl: 30, pill: 999 } as const;

/** Type scale (px) — mobile TypeScale rendered to CSS. */
export const TypeScale = {
  caption: { fontSize: 12, lineHeight: 16 },
  bodySm: { fontSize: 14, lineHeight: 20 },
  body: { fontSize: 16, lineHeight: 24 },
  titleSm: { fontSize: 18, lineHeight: 24 },
  title: { fontSize: 22, lineHeight: 28 },
  display: { fontSize: 30, lineHeight: 36 },
  heroAmount: { fontSize: 34, lineHeight: 40 },
} as const;

/** Motion (ms) — matches mobile Motion. */
export const Motion = { fast: 140, base: 220, enter: 250, count: 750, easing: 'cubic-bezier(0.22, 0.8, 0.36, 1)' } as const;

/** Elevation — matches mobile Elevation web values. */
export const Elevation = {
  card: '0 1px 3px rgba(16, 32, 30, 0.10)',
  lift: '0 12px 26px -14px rgba(16, 32, 30, 0.35)',
  btn: '0 8px 18px -8px rgba(15, 118, 110, 0.55)',
  pop: '0 18px 40px -16px rgba(11, 69, 64, 0.55)',
} as const;

/** Gradients (matches mobile Gradients). */
export const Gradients = {
  teal: 'linear-gradient(135deg, #0F766E 0%, #0B4540 100%)',
  warm: 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
  money: 'linear-gradient(135deg, #16A34A 0%, #0F766E 100%)',
  deep: 'linear-gradient(160deg, #0B4540 0%, #10201E 120%)',
} as const;

/** Minimum tactile target (design principle 1): 48px. */
export const Touch = { min: 48 } as const;
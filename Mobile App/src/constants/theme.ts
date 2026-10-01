/**
 * SWON design tokens — the code implementation of UI_UX_DESIGN.md §2
 * **as re-synced to V3 "Vibrant & Dynamic"** (§0, 2026-09-29).
 * Single source of truth for color, gradients, type, space, radius,
 * elevation and motion. Screens and components import from here and NEVER
 * hardcode a hex value (plan U1 acceptance test: zero hex literals outside
 * this file — baseline was 43 on 2026-09-29, target 0).
 *
 * Two modes ship per the plan's §4 dark-mode decision:
 *  - `light`  — the design sheet's palette, verbatim.
 *  - `dark`   — same roles, values tuned for AA contrast on dark surfaces.
 * A `useColorScheme` switch wires the mode once the navigation shell (U4)
 * lands; today every screen reads the light mode.
 */
import '@/global.css';

import { Platform, type ViewStyle } from 'react-native';

export type ThemeMode = 'light' | 'dark';

const light = {
  // --- surfaces (V3 warm canvas, design §2) ---
  text: '#10201E', // V3 ink
  background: '#F6F3EC', // V3 warm canvas — replaces slate
  backgroundElement: '#FFFFFF', // legacy key: raised surface (= card)
  backgroundSelected: '#EAE4D7', // warm pressed/selected fill
  textSecondary: '#4F5F5C', // V3 muted — legacy key (= textMuted)
  card: '#FFFFFF',
  border: '#E4DDD0', // input/chip border
  line: '#EFEAE0', // card hairline (V3)
  textMuted: '#4F5F5C',

  // --- brand ---
  primary: '#0F766E', // teal-700 — AA on white, readable in sun
  primaryDark: '#115E59',
  primaryDeep: '#0B4540', // V3 deep teal — gradients/work mode
  primaryLight: '#CCFBF1',
  tint: '#EFFCF9', // V3 tint — soft teal fills
  onPrimary: '#FFFFFF',

  // --- semantic ---
  success: '#15803D',
  warning: '#B45309',
  danger: '#B91C1C',
  info: '#1D4ED8',

  // --- V3 contextual accents (§0.2) — by meaning, never rainbow ---
  orange: '#F97316', // FlashMatch / warm energy
  amber: '#F59E09', // warning / attention
  yellow: '#FDE047', // highlights on dark
  coral: '#EF5B47', // urgent opportunities
  green: '#16A34A', // money
  blue: '#2563EB', // today / info surfaces
  lavender: '#8B7CF6', // part-time / soft accents

  // --- status chip pairs (status → color map lives HERE, per design §2) ---
  status: {
    DRAFT: { fg: '#475569', bg: '#F1F5F9' },
    OPEN: { fg: '#15803D', bg: '#DCFCE7' },
    HIRING: { fg: '#B45309', bg: '#FEF3C7' },
    FILLED: { fg: '#115E59', bg: '#CCFBF1' },
    CANCELLED: { fg: '#B91C1C', bg: '#FEE2E2' },
    COMPLETED: { fg: '#1D4ED8', bg: '#DBEAFE' },
    // non-job statuses used across attendance/payments/users/complaints
    PENDING: { fg: '#475569', bg: '#F1F5F9' },
    ACTIVE: { fg: '#15803D', bg: '#DCFCE7' },
    ELIGIBLE: { fg: '#115E59', bg: '#CCFBF1' },
    PAID: { fg: '#15803D', bg: '#DCFCE7' }, // V3: money = green
    REJECTED: { fg: '#B91C1C', bg: '#FEE2E2' },
    NO_SHOW: { fg: '#B91C1C', bg: '#FEE2E2' },
    WARNED: { fg: '#B45309', bg: '#FEF3C7' },
    SUSPENDED: { fg: '#B91C1C', bg: '#FEE2E2' },
    BANNED: { fg: '#FFFFFF', bg: '#B91C1C' },
    // employment / attendance / earnings statuses (folded from employer-screen local fallbacks)
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
  } satisfies Record<string, { fg: string; bg: string }>,

  skeleton: '#E2E8F0',
  overlay: 'rgba(15, 23, 42, 0.45)',
  scrim: 'rgba(16, 32, 30, 0.45)',
  barSurface: 'rgba(255, 255, 255, 0.96)',
  /** glass surface/border for controls sitting on the teal header gradient */
  onBrandSurface: 'rgba(255, 255, 255, 0.16)',
  onBrandBorder: 'rgba(255, 255, 255, 0.35)',
  /** prototype --on-brand-soft: sub-copy on brand surfaces */
  onPrimarySoft: 'rgba(255, 255, 255, 0.82)',
  /** prototype .btn.primary:disabled bg */
  disabledBg: '#A7BDB9',
  /** prototype .btn.danger (soft red) */
  dangerSoft: '#FEE2E2',
  /** prototype .role-card.on.secondary fill */
  coralSoft: '#FFF1ED',
  /** prototype .devhint fill */
  warningSoft: '#FFF7ED',
};

const dark: typeof light = {
  // --- surfaces ---
  text: '#F1F5F9',
  background: '#0F172A', // slate-900
  backgroundElement: '#1E293B',
  backgroundSelected: '#334155',
  textSecondary: '#94A3B8',
  card: '#1E293B',
  border: '#334155',
  textMuted: '#94A3B8',

  // --- brand (teal-400 keeps AA on dark surfaces) ---
  primary: '#2DD4BF',
  primaryDark: '#0F766E',
  primaryDeep: '#042F2E',
  primaryLight: '#134E4A',
  tint: '#0A2E2B',
  line: '#334155',
  onPrimary: '#0F172A',

  // --- semantic ---
  success: '#4ADE80',
  warning: '#FBBF24',
  danger: '#F87171',
  info: '#60A5FA',

  // --- V3 accents (lightened for dark AA) ---
  orange: '#FB923C',
  amber: '#FBBF24',
  yellow: '#FDE047',
  coral: '#F87171',
  green: '#4ADE80',
  blue: '#60A5FA',
  lavender: '#A78BFA',

  // --- status chip pairs ---
  status: {
    DRAFT: { fg: '#CBD5E1', bg: '#1E293B' },
    OPEN: { fg: '#86EFAC', bg: '#052E16' },
    HIRING: { fg: '#FCD34D', bg: '#451A03' },
    FILLED: { fg: '#5EEAD4', bg: '#042F2E' },
    CANCELLED: { fg: '#FCA5A5', bg: '#450A0A' },
    COMPLETED: { fg: '#93C5FD', bg: '#172554' },
    PENDING: { fg: '#CBD5E1', bg: '#1E293B' },
    ACTIVE: { fg: '#86EFAC', bg: '#052E16' },
    ELIGIBLE: { fg: '#5EEAD4', bg: '#042F2E' },
    PAID: { fg: '#86EFAC', bg: '#052E16' },
    REJECTED: { fg: '#FCA5A5', bg: '#450A0A' },
    NO_SHOW: { fg: '#FCA5A5', bg: '#450A0A' },
    WARNED: { fg: '#FCD34D', bg: '#451A03' },
    SUSPENDED: { fg: '#FCA5A5', bg: '#450A0A' },
    BANNED: { fg: '#FFFFFF', bg: '#B91C1C' },
    APPLIED: { fg: '#5EEAD4', bg: '#042F2E' },
    SHORTLISTED: { fg: '#93C5FD', bg: '#172554' },
    WAITLISTED: { fg: '#FCD34D', bg: '#451A03' },
    HIRED: { fg: '#86EFAC', bg: '#052E16' },
    WITHDRAWN: { fg: '#94A3B8', bg: '#1E293B' },
    EXPIRED: { fg: '#94A3B8', bg: '#1E293B' },
    RELEASED: { fg: '#94A3B8', bg: '#1E293B' },
    NOT_STARTED: { fg: '#FCD34D', bg: '#451A03' },
    NONE: { fg: '#FCD34D', bg: '#451A03' },
    CHECKED_IN: { fg: '#86EFAC', bg: '#052E16' },
    CHECKED_OUT: { fg: '#93C5FD', bg: '#172554' },
    APPROVED: { fg: '#86EFAC', bg: '#052E16' },
    PROCESSING: { fg: '#93C5FD', bg: '#172554' },
    FAILED: { fg: '#FCA5A5', bg: '#450A0A' },
    ON_HOLD: { fg: '#FCD34D', bg: '#451A03' },
  },
  skeleton: '#334155',
  overlay: 'rgba(2, 6, 23, 0.6)',
  scrim: 'rgba(2, 6, 23, 0.6)',
  barSurface: 'rgba(30, 41, 59, 0.96)',
  onBrandSurface: 'rgba(255, 255, 255, 0.18)',
  onBrandBorder: 'rgba(255, 255, 255, 0.30)',
  onPrimarySoft: 'rgba(255, 255, 255, 0.82)',
  disabledBg: '#334155',
  dangerSoft: '#450A0A',
  coralSoft: '#3B1512',
  warningSoft: '#3A2A0B',
};

export const Colors = { light, dark } as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/** Unknown statuses fall back to the neutral draft pair — never a crash. */
export function statusColors(
  status: string,
  mode: ThemeMode = 'light',
): { fg: string; bg: string } {
  const map = Colors[mode].status as Record<string, { fg: string; bg: string }>;
  return map[status] ?? map.DRAFT;
}

/** V3 typography (§0.4): bundled families, loaded once at the app root. */
export const Fonts = {
  /** display face — headings, money, big numbers */
  display: 'BricolageGrotesque_800ExtraBold',
  displaySemi: 'BricolageGrotesque_600SemiBold',
  /** body face */
  body: 'Manrope_400Regular',
  bodySemi: 'Manrope_600SemiBold',
  bodyBold: 'Manrope_700Bold',
  bodyExtra: 'Manrope_800ExtraBold',
  /** legacy aliases — existing screens keep rendering (sans = body) */
  sans: 'Manrope_400Regular',
  serif: 'Manrope_400Regular',
  rounded: 'Manrope_700Bold',
  mono: 'ui-monospace',
} as const;

/** 4dp grid (design §2). Legacy keys kept so existing screens never break. */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  mid: 12, // the design grid's 12
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Radius scale (UI_PROTOTYPE.html): sm8 md12 · button14 · cards lg18 · headers xl24 · heroes xxl30 · pill. */
export const Radius = { sm: 8, md: 12, btn: 14, lg: 18, xl: 24, xxl: 30, pill: 999 } as const;

/** Type scale (design §2): min body 16 for readability outdoors. */
export const TypeScale = {
  caption: { fontSize: 12, lineHeight: 16 },
  bodySm: { fontSize: 14, lineHeight: 20 },
  body: { fontSize: 16, lineHeight: 24 },
  titleSm: { fontSize: 18, lineHeight: 24 },
  title: { fontSize: 22, lineHeight: 28 },
  display: { fontSize: 30, lineHeight: 36 },
  /** Money figures — the hero treatment of the owner's rich direction (§0). */
  heroAmount: { fontSize: 34, lineHeight: 40 },
  /** Work-mode timer / mega numbers (V3). */
  mega: { fontSize: 44, lineHeight: 48 },
} as const;

/** Motion (UI_PROTOTYPE §motion): t-fast140 / t-med220 ease; card entrance,
 *  count-up, FlashMatch pulse — engine is react-native-reanimated; callers
 *  honor prefers-reduced-motion. */
export const Motion = { fast: 140, base: 220, enter: 250, count: 750, easing: 'ease-out' } as const;

/** Elevation (design §2, amended by owner §0): soft card shadow + hairline. */
export const Elevation = {
  card: Platform.select({
    web: { boxShadow: '0 1px 3px rgba(16, 32, 30, 0.10)' },
    default: {
      shadowColor: '#10201E',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
    },
  }) as ViewStyle,
  /** hovered/raised card (V3) */
  lift: Platform.select({
    web: { boxShadow: '0 12px 26px -14px rgba(16, 32, 30, 0.35)' },
    default: {
      shadowColor: '#10201E',
      shadowOpacity: 0.3,
      shadowRadius: 13,
      shadowOffset: { width: 0, height: 12 },
      elevation: 8,
    },
  }) as ViewStyle,
  /** prototype --shadow-btn: primary buttons */
  btn: Platform.select({
    web: { boxShadow: '0 8px 18px -8px rgba(15, 118, 110, 0.55)' },
    default: {
      shadowColor: '#0F766E',
      shadowOpacity: 0.55,
      shadowRadius: 9,
      shadowOffset: { width: 0, height: 8 },
      elevation: 6,
    },
  }) as ViewStyle,
  /** prototype .tabbar: shadow above the bar */
  barTop: Platform.select({
    web: { boxShadow: '0 -8px 20px -14px rgba(16, 32, 30, 0.35)' },
    default: { elevation: 8 },
  }) as ViewStyle,
  /** prototype --shadow-pop: sheets/modals */
  pop: Platform.select({
    web: { boxShadow: '0 18px 40px -16px rgba(11, 69, 64, 0.55)' },
    default: { elevation: 12 },
  }) as ViewStyle,
  sheet: Platform.select({
    ios: {
      shadowColor: '#0F172A',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: -4 },
    },
    android: { elevation: 8 },
    default: {},
  }) as ViewStyle,
} as const;

/** V3 gradients (design §2) — pairs for `expo-linear-gradient`.
 *  Home hero = layered: teal base + warm corner overlay (built in the component). */
export const Gradients = {
  teal: ['#0F766E', '#0B4540'] as const,
  warm: ['#F97316', '#F59E0B'] as const,
  money: ['#16A34A', '#0F766E'] as const,
  deep: ['#0B4540', '#10201E'] as const,
  /** subtle light arc over brand surfaces (host hero, decorative) */
  arc: ['rgba(255, 255, 255, 0.14)', 'rgba(255, 255, 255, 0)'] as const,
  sun: ['#FDE047', '#F97316'] as const,
} as const;

/** Minimum touch target (design principle 1): 48×48 dp. */
export const Touch = { min: 48 } as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

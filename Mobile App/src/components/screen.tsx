import type { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { usePathname } from 'expo-router';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
  MaxContentWidth,
  Radius,
  Spacing,
  Touch,
  TypeScale,
} from '@/constants/theme';
import { TabBar, type TabKey, type TabRole } from '@/components/TabBar';
import { BrandLogo } from '@/components/brandLogo';
import { WingMotif } from '@/components/wingMotif';
import { Enter } from '@/components/motion';

/**
 * Shared screen chrome (Screen/Card/Button) carrying the design tokens of
 * UI_UX_DESIGN.md §2 — plus the owner's 2026-09-28 "rich & polished" direction
 * (§0): every screen opens on a brand-filled header block and cards sit on a
 * soft shadow. The full 24-component inventory lands in `components/ui.tsx`
 * (plan U3); these three keep their original import path so no screen breaks
 * while migrating.
 */

export function Screen({
  title,
  tab,
  logo,
  headerLeft,
  headerSub,
  headerRight,
  children,
}: {
  title: string;
  /** when present, the V3 five-tab bar renders fixed at the bottom (§4) */
  tab?: TabKey;
  /** when true, the animated SWON brand lockup renders above the title
   *  (login only — owner-approved "The Arrival" entrance, 2026-09-30) */
  logo?: boolean;
  /** presentation-only identity slots (avatar / sub-line / action) — when any
   *  is present the header renders as a row with a gentle entrance (worker home) */
  headerLeft?: ReactNode;
  headerSub?: ReactNode;
  headerRight?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const role: TabRole = pathname.startsWith('/employer') ? 'host' : 'worker';
  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <LinearGradient
          colors={[...Gradients.teal]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          {/* wing motif — prototype .topbar::after, verbatim position/size */}
          <View style={styles.headerMotif} pointerEvents="none">
            <WingMotif width={210} height={130} />
          </View>
          {logo ? (
            <View style={styles.headerLogo}>
              <BrandLogo />
            </View>
          ) : null}
          {headerLeft || headerRight || headerSub ? (
            <View style={styles.headerRow}>
              {headerLeft ?? <View style={styles.headerSlot} />}
              <Enter delay={80} style={styles.headerCenter}>
                <Text numberOfLines={1} style={styles.headerTitle} accessibilityRole="header">
                  {title}
                </Text>
                {headerSub ? <View>{headerSub}</View> : null}
              </Enter>
              {headerRight ?? <View style={styles.headerSlot} />}
            </View>
          ) : (
            <Text
              style={[styles.headerTitle, logo ? styles.headerTitleCenter : null]}
              accessibilityRole="header"
            >
              {title}
            </Text>
          )}
        </LinearGradient>
      </SafeAreaView>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, tab ? styles.scrollContentTab : null]}
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
      {tab ? <TabBar role={role} active={tab} /> : null}
    </View>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'warm'
  | 'money'
  | 'onDark';

/**
 * Design §3 Button: 4 variants × md/lg, states default/pressed/disabled/loading.
 * `primary` (legacy prop) is an alias for variant="primary".
 */
export function Button({
  label,
  onPress,
  disabled,
  primary,
  variant,
  size = 'md',
  loading,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  primary?: boolean;
  variant?: ButtonVariant;
  size?: 'md' | 'lg';
  loading?: boolean;
}) {
  const resolved: ButtonVariant = primary ? 'primary' : (variant ?? 'secondary');
  const isDisabled = disabled || loading === true;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading === true }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        size === 'lg' && styles.buttonLg,
        variantStyles[resolved].container,
        pressed && !isDisabled && styles.buttonPressed,
        isDisabled && styles.buttonDisabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles[resolved].label.color as string}
        />
      ) : null}
      <Text
        style={[
          styles.buttonLabel,
          size === 'lg' && styles.buttonLabelLg,
          variantStyles[resolved].label,
          isDisabled && styles.buttonLabelDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/** Prototype .btn variants — colors/shadows verbatim from UI_PROTOTYPE.html. */
const variantStyles = {
  primary: {
    container: { backgroundColor: Colors.light.primary, ...Elevation.btn },
    label: { color: Colors.light.onPrimary },
  },
  secondary: {
    container: {
      backgroundColor: Colors.light.card,
      borderWidth: 1.5,
      borderColor: Colors.light.border,
      ...Elevation.card,
    },
    label: { color: Colors.light.text },
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    label: { color: Colors.light.textMuted, fontFamily: Fonts.bodyBold },
  },
  danger: {
    container: { backgroundColor: Colors.light.dangerSoft },
    label: { color: Colors.light.danger },
  },
  warm: {
    container: { backgroundColor: Colors.light.orange, ...Elevation.lift },
    label: { color: Colors.light.onPrimary },
  },
  money: {
    container: { backgroundColor: Colors.light.green, ...Elevation.lift },
    label: { color: Colors.light.onPrimary },
  },
  onDark: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: Colors.light.onBrandBorder,
    },
    label: { color: Colors.light.onPrimary },
  },
} as const;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  headerSafe: {
    // prototype statusbar sits above the topbar in --primary-deep
    backgroundColor: Colors.light.primaryDeep,
  },
  header: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    overflow: 'hidden', // prototype .topbar { overflow:hidden } — clips the motif
  },
  headerTitle: {
    ...TypeScale.title,
    fontSize: 21, // prototype .topbar .title
    lineHeight: 26,
    fontFamily: Fonts.display,
    color: Colors.light.onPrimary,
  },
  headerLogo: {
    alignSelf: 'center',
    marginBottom: Spacing.one,
  },
  headerTitleCenter: {
    textAlign: 'center',
  },
  headerMotif: {
    position: 'absolute',
    right: -26,
    top: -34,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  headerSlot: {
    width: 44,
    height: 44,
  },
  headerCenter: {
    flex: 1,
    gap: 2,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: Spacing.three,
    gap: Spacing.three,
    paddingBottom: Spacing.six,
  },
  scrollContentTab: {
    // keep the last card clear of the fixed tab bar
    paddingBottom: Spacing.six + 64,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.three,
  },
  card: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  cardTitle: {
    ...TypeScale.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: Colors.light.textMuted,
  },
  cardBody: {
    gap: Spacing.two,
  },
  button: {
    minHeight: Touch.min,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderRadius: Radius.btn, // prototype .btn radius 14
    paddingVertical: 13, // prototype .btn padding 13px
    paddingHorizontal: Spacing.three,
  },
  buttonLg: {
    minHeight: 56,
  },
  buttonPressed: {
    opacity: 0.96,
    transform: [{ translateY: 1 }, { scale: 0.99 }],
  },
  buttonDisabled: Platform.select({
    web: { backgroundColor: Colors.light.disabledBg, boxShadow: 'none' },
    default: { backgroundColor: Colors.light.disabledBg, shadowOpacity: 0, elevation: 0 },
  }) as ViewStyle,
  buttonLabel: {
    ...TypeScale.body,
    fontFamily: Fonts.bodyExtra, // prototype .btn { font-weight:800 }
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  buttonLabelLg: {
    fontSize: 18,
  },
  buttonLabelDisabled: {},
});

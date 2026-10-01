import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/screen';
import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
  MaxContentWidth,
  Radius,
  Spacing,
} from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * H1 — role selection (§11.1, one role per account): choosing routes to the
 * minimal-profile form, which performs POST /me/onboarding (the ONLY place
 * role is written).
 *
 * V3 auth reskin (prototype s-role): full-bleed `--g-home` shell (teal
 * gradient + warm corner glow) with a centred auth-top heading over two
 * prototype `.role-card`s sitting directly on the brand surface — r-xl,
 * 2.5px `--line` border, 52×52 gradient icon tile (teal = work, warm = hire),
 * display title + muted subtitle and a pill flow-chip row. Selected: primary
 * = teal border + tint + lift, secondary = coral border + soft coral + lift.
 * The dashed aside note and full-width primary CTA follow. Selection logic,
 * a11y radio state and routing untouched.
 */

type ChosenRole = 'worker' | 'employer';

/** Prototype `.r-flow` copy — worker journey, verbatim. */
const WORKER_FLOW = ['Discover', 'Match', 'Flight Request', 'Work', 'Earnings'];

/** Prototype `.r-flow` copy — host journey, verbatim. */
const HOST_FLOW = ['Create', 'Discover', 'Bond', 'Attendance', 'Payment'];

/** Alpha-composited theme token (prototype --g-home warm corner glow). */
function glow(hex: string, alpha: number): string {
  const rgb = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(rgb >> 16) & 255}, ${(rgb >> 8) & 255}, ${rgb & 255}, ${alpha})`;
}

/** --g-home's radial: warm 0.30 at the top-right corner, feathered to 0. */
const WARM_GLOW = [
  glow(Colors.light.orange, 0.3),
  glow(Colors.light.orange, 0.14),
  glow(Colors.light.orange, 0),
] as const;


export default function RoleScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<ChosenRole | null>(null);

  const optionCard = (
    role: ChosenRole,
    title: string,
    description: string,
    flow: readonly string[],
  ) => {
    const active = selected === role;
    const gradient = role === 'worker' ? Gradients.teal : Gradients.warm;
    const icon: keyof typeof Ionicons.glyphMap =
      role === 'worker' ? 'briefcase-outline' : 'people-outline';
    return (
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected: active }}
        onPress={() => setSelected(role)}
        style={[
          styles.option,
          active && styles.optionActive,
          active && role === 'employer' && styles.optionActiveHost,
        ]}
      >
        <View style={styles.optionTop}>
          <LinearGradient
            colors={[...gradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconTile}
          >
            <Ionicons name={icon} size={24} color={Colors.light.onPrimary} />
          </LinearGradient>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>{title}</Text>
            <Text style={styles.optionDesc}>{description}</Text>
          </View>
        </View>
        <View style={styles.flow}>
          {flow.map((step) => (
            <Text key={step} style={styles.flowChip}>
              {step}
            </Text>
          ))}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.root}>
      {/* prototype --g-home: linear-gradient(160deg, #0F766E 0%, #0B4540 78%) */}
      <LinearGradient
        colors={[...Gradients.teal]}
        locations={[0, 0.78]}
        start={{ x: 0.35, y: 0 }}
        end={{ x: 0.65, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* ...plus the warm radial glow in the top-right corner */}
      <LinearGradient
        colors={WARM_GLOW}
        locations={[0, 0.34, 0.72]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.1, y: 0.95 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>
            {/* prototype .auth-top — display heading + tag line */}
            <View style={styles.authTop}>
              <Text style={styles.heading} accessibilityRole="header">
                {en.auth.roleTitle}
              </Text>
              <Text style={styles.tag}>How will you use the marketplace?</Text>
            </View>

            <View style={styles.roleGrid}>
              {optionCard(
                'worker',
                en.auth.roleWorker,
                en.auth.roleWorkerDesc,
                WORKER_FLOW,
              )}
              {optionCard(
                'employer',
                en.auth.roleEmployer,
                en.auth.roleEmployerDesc,
                HOST_FLOW,
              )}
            </View>

            <View style={styles.aside}>
              <Text style={styles.asideText}>{en.auth.roleNote}</Text>
            </View>

            <View style={styles.actions}>
              <Button
                variant="primary"
                size="lg"
                label={en.auth.roleContinue}
                disabled={!selected}
                onPress={() =>
                  selected && router.push({ pathname: '/profile', params: { role: selected } })
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.primaryDeep,
  },
  safe: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.three,
    paddingTop: 46, // prototype .auth-screen .screen-body { padding-top: 46px }
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.three,
  },
  authTop: {
    alignItems: 'center',
    marginBottom: -2, // prototype .auth-top { margin-bottom: 14px } (grid gap 16)
  },
  heading: {
    fontSize: 26,
    lineHeight: 32,
    fontFamily: Fonts.display, // prototype s-role heading (display 26/800)
    color: Colors.light.onPrimary,
    textAlign: 'center',
  },
  tag: {
    marginTop: 7,
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.onPrimarySoft,
    textAlign: 'center',
  },
  roleGrid: {
    gap: 13, // prototype .role-grid { gap: 13px }
  },
  option: {
    borderRadius: Radius.xl, // prototype .role-card radius 24
    borderWidth: 2.5,
    borderColor: Colors.light.line,
    paddingTop: 18,
    paddingHorizontal: 17,
    paddingBottom: 17,
    backgroundColor: Colors.light.card,
    gap: 12, // prototype .r-flow { margin-top: 12px }
  },
  optionActive: {
    borderColor: Colors.light.primary, // prototype .role-card.on.primary
    backgroundColor: Colors.light.tint,
    ...Elevation.lift,
  },
  optionActiveHost: {
    borderColor: Colors.light.coral, // prototype .role-card.on.secondary
    backgroundColor: Colors.light.dangerSoft,
  },
  optionTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
  },
  iconTile: {
    width: 52,
    height: 52,
    borderRadius: 17, // prototype .role-card .r-ic (52×52 / r17)
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    flex: 1,
    gap: Spacing.half,
  },
  optionTitle: {
    fontSize: 19,
    lineHeight: 24,
    fontFamily: Fonts.display, // prototype .r-t (display 19/800)
    color: Colors.light.text,
  },
  optionDesc: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold, // prototype .r-s (13/700 muted)
    color: Colors.light.textMuted,
  },
  flow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5, // prototype .r-flow { gap: 5px }
  },
  flowChip: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    backgroundColor: Colors.light.background, // prototype var(--canvas)
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 9,
    overflow: 'hidden',
  },
  aside: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.light.border,
    borderRadius: Radius.lg, // prototype .card.aside-note (r-lg)
    padding: Spacing.three,
    backgroundColor: Colors.light.background, // grid gap already gives the prototype's 16px
  },
  asideText: {
    fontSize: 13.5,
    lineHeight: 22, // prototype aside-note (13.5 / 600 / 1.6)
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  actions: {
    marginTop: -12, // grid gap 16 → prototype CTA { margin-top: 4px }
  },
});

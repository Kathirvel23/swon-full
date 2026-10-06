import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Enter } from '@/components/motion';
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
 * V4 auth reskin (owner reference, 2026-10-05) — the warm "what do you want to
 * do?" onboarding step after OTP. The screen moves off the teal shell onto the
 * V3 warm canvas (#F6F3EC) with the SWON wordmark, a "Welcome to SWON" display
 * heading and the "How do you want to use SWON today?" question over TWO large
 * selectable cards: "Find work" (teal/mint accent, real work photo) and
 * "Hire workers" (warm accent, real work photo). Selected = teal border +
 * mint fill + check badge + lift; the other card stays fully tappable so the
 * choice can be changed. A dynamic "Continue as a Worker / Host →" CTA (disabled
 * until a role is picked) and the honest one-role note close the screen.
 *
 * UNCHANGED UNDERNEATH: the role VALUES stay 'worker' | 'employer', and the
 * action still pushes /profile?role=<value> (role is persisted by
 * POST /me/onboarding on that screen). No API, state or navigation change.
 * Supporting copy only states product truth (the one-role-per-account rule).
 */

type ChosenRole = 'worker' | 'employer';

/** Real, bundled work photos (assets/jobs — CC-licensed, see CREDITS.md). */
const WORKER_PHOTO = require('../../../assets/jobs/construction.jpg') as ImageSourcePropType;
const HOST_PHOTO = require('../../../assets/jobs/cleaning.jpg') as ImageSourcePropType;
const WORDMARK = require('../../../assets/brand/swon-wordmark.png') as ImageSourcePropType;
const WORD_ASPECT = 323 / 1119;

/** Card chips — real product traits, not invented claims. */
const WORKER_CHIPS = ['Daily / Temporary', 'Flexible hours', 'Trusted hosts'] as const;
const HOST_CHIPS = ['Construction', 'Events', 'Delivery', 'More'] as const;

function RoleCard({
  role,
  title,
  description,
  chips,
  photo,
  icon,
  active,
  onSelect,
}: {
  role: ChosenRole;
  title: string;
  description: string;
  chips: readonly string[];
  photo: ImageSourcePropType;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onSelect: () => void;
}) {
  const isWorker = role === 'worker';
  const gradient = isWorker ? Gradients.teal : Gradients.warm;
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${title}. ${description}`}
      onPress={onSelect}
      style={[styles.card, active && styles.cardActive]}
    >
      <View style={styles.cardRow}>
        <LinearGradient
          colors={[...gradient]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconTile}
        >
          <Ionicons name={icon} size={22} color={Colors.light.onPrimary} />
        </LinearGradient>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>{description}</Text>
        </View>
        <Image source={photo} resizeMode="cover" style={styles.thumb} />
      </View>

      <View style={styles.chips}>
        {chips.map((chip) => (
          <Text
            key={chip}
            style={[styles.chip, isWorker ? styles.chipWorker : styles.chipHost]}
          >
            {chip}
          </Text>
        ))}
      </View>

      {active ? (
        <View style={styles.badge} pointerEvents="none">
          <Ionicons name="checkmark" size={15} color={Colors.light.onPrimary} />
        </View>
      ) : null}
    </Pressable>
  );
}

export default function RoleScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<ChosenRole | null>(null);

  const roleLabel =
    selected === 'worker' ? en.common.roleWorker : selected === 'employer' ? en.common.roleEmployer : '';

  return (
    <View style={styles.root}>
      {/* very faint mint brand shape — decoration only */}
      <View style={styles.blobA} pointerEvents="none" />
      <View style={styles.blobB} pointerEvents="none" />

      <SafeAreaView edges={['top']} style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>
            {/* ---- brand + welcome ---- */}
            <Enter style={styles.brandBlock}>
              <Image
                source={WORDMARK}
                resizeMode="contain"
                style={styles.wordmark}
                accessibilityRole="image"
                accessibilityLabel="SWON"
              />
              <Text style={styles.heading} accessibilityRole="header">
                {en.auth.roleTitle}
              </Text>
              <Text style={styles.sub}>{en.auth.roleSub}</Text>
            </Enter>

            {/* ---- the two paths ---- */}
            <View style={styles.grid}>
              <Enter delay={90}>
                <RoleCard
                  role="worker"
                  title={en.auth.roleWorker}
                  description={en.auth.roleWorkerDesc}
                  chips={WORKER_CHIPS}
                  photo={WORKER_PHOTO}
                  icon="construct-outline"
                  active={selected === 'worker'}
                  onSelect={() => setSelected('worker')}
                />
              </Enter>
              <Enter delay={150}>
                <RoleCard
                  role="employer"
                  title={en.auth.roleEmployer}
                  description={en.auth.roleEmployerDesc}
                  chips={HOST_CHIPS}
                  photo={HOST_PHOTO}
                  icon="briefcase-outline"
                  active={selected === 'employer'}
                  onSelect={() => setSelected('employer')}
                />
              </Enter>
            </View>

            {/* ---- action ---- */}
            <Enter delay={210} style={styles.actions}>
              <Button
                variant="primary"
                size="lg"
                label={roleLabel ? en.auth.roleContinueAs(roleLabel) : en.auth.roleContinue}
                disabled={!selected}
                onPress={() =>
                  selected && router.push({ pathname: '/profile', params: { role: selected } })
                }
              />
            </Enter>

            <Text style={styles.note}>{en.auth.roleNote}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background, // #F6F3EC warm canvas
  },
  flex: {
    flex: 1,
  },
  blobA: {
    position: 'absolute',
    top: -70,
    right: -60,
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: 'rgba(204, 251, 241, 0.45)',
  },
  blobB: {
    position: 'absolute',
    top: 90,
    right: -110,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(253, 224, 71, 0.10)',
  },
  scrollContent: {
    padding: Spacing.three + 4,
    paddingTop: Spacing.three,
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  // ---- brand + welcome ----
  brandBlock: {
    marginBottom: 24,
  },
  wordmark: {
    width: 108,
    height: Math.round(108 * WORD_ASPECT),
    marginBottom: 20,
  },
  heading: {
    fontSize: 27,
    lineHeight: 32,
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },
  sub: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 21,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  // ---- cards ----
  grid: {
    gap: 14,
  },
  card: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.card,
    padding: 18,
    gap: 12,
    ...Elevation.card,
  },
  cardActive: {
    borderWidth: 2,
    borderColor: Colors.light.primary, // #0F766E
    backgroundColor: Colors.light.tint,
    padding: 17, // keep the inner box the same size when the border thickens
    ...Elevation.lift,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
  },
  thumb: {
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: Colors.light.line,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyBold,
    borderRadius: Radius.pill,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 9,
    overflow: 'hidden',
  },
  chipWorker: {
    color: Colors.light.primaryDark,
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.primaryLight,
  },
  chipHost: {
    color: Colors.light.warning,
    backgroundColor: Colors.light.warningSoft,
    borderColor: Colors.light.amber,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.light.card,
  },
  // ---- action ----
  actions: {
    marginTop: 22,
  },
  note: {
    marginTop: 14,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },
});

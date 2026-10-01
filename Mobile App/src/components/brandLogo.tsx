import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { useReducedMotion } from '@/components/motion';
import { Colors, Elevation, Radius, Spacing } from '@/constants/theme';

/**
 * BrandLogo — the approved SWON lockup (real assets derived from the owner's
 * logo.jpeg, cut into assets/brand/: dark app icon with the white wordmark,
 * plus the wordmark on a pale card).
 *
 * Entrance = "soft arrival" v2 (owner smoothness pass, 2026-09-30): v1 used a
 * spring + a rotating 180° border arc, which read as a glitchy loading spinner
 * at dev frame rates. v2 is timing-based only (no bounce, no rotation), one
 * shared ease-out curve, overlapping beats:
 *
 *   0ms    icon fades in + scales 0.94 → 1       (520ms, ease-out cubic)
 *   200ms  wordmark card rises 14px + fades in   (480ms, ease-out cubic)
 *   260ms  a COMPLETE mint halo swells outward around the icon
 *          (0.86 → 1.16 scale, 0.55 → 0 opacity, 850ms) — always a whole
 *          circle, so it can never look like a broken spinner; it ends at
 *          opacity 0, so the lockup rests clean
 *
 * Reduced motion renders the static lockup (no animation), matching the
 * components/motion.tsx convention. Used by the login header (Screen logo).
 */
const ICON = require('../../assets/brand/swon-icon-dark.png');
const WORDMARK = require('../../assets/brand/swon-wordmark.png');
const WORD_ASPECT = 323 / 1119;

const EASE_OUT = Easing.out(Easing.cubic);

export function BrandLogo({
  iconSize = 88,
  wordWidth = 148,
}: {
  iconSize?: number;
  wordWidth?: number;
}) {
  const reduced = useReducedMotion();
  const icon = useSharedValue(0);
  const word = useSharedValue(0);
  const halo = useSharedValue(0);

  useEffect(() => {
    if (reduced) {
      icon.value = 1;
      word.value = 1;
      halo.value = 1;
      return;
    }
    icon.value = withTiming(1, { duration: 520, easing: EASE_OUT });
    word.value = withDelay(200, withTiming(1, { duration: 480, easing: EASE_OUT }));
    halo.value = withDelay(260, withTiming(1, { duration: 850, easing: Easing.out(Easing.quad) }));
  }, [icon, word, halo, reduced]);

  const iconStyle = useAnimatedStyle(() => ({
    opacity: icon.value,
    transform: [{ scale: 0.94 + 0.06 * icon.value }],
  }));
  const wordStyle = useAnimatedStyle(() => ({
    opacity: word.value,
    transform: [{ translateY: (1 - word.value) * 14 }],
  }));
  const haloStyle = useAnimatedStyle(() => {
    const p = halo.value;
    // swell over the first third, then dissolve — a full circle at every
    // instant (opacity 0 at rest, so the halo is invisible once settled)
    const opacity = p < 0.35 ? (p / 0.35) * 0.55 : 0.55 * (1 - (p - 0.35) / 0.65);
    return { opacity, transform: [{ scale: 0.86 + 0.3 * p }] };
  });

  return (
    <View style={styles.wrap} accessibilityRole="image" accessibilityLabel="SWON">
      <View style={[styles.iconBox, { width: iconSize, height: iconSize }]}>
        <Animated.Image
          source={ICON}
          resizeMode="contain"
          style={[{ width: iconSize, height: iconSize }, iconStyle]}
        />
        <Animated.View
          pointerEvents="none"
          style={[
            styles.halo,
            {
              width: iconSize + 22,
              height: iconSize + 22,
              borderRadius: (iconSize + 22) / 2,
              left: -11,
              top: -11,
            },
            haloStyle,
          ]}
        />
      </View>
      <Animated.View style={[styles.chip, wordStyle]}>
        <Image
          source={WORDMARK}
          resizeMode="contain"
          style={{ width: wordWidth, height: Math.round(wordWidth * WORD_ASPECT) }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconBox: {
    // halo overflows the icon box; RN defaults allow it
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.light.primaryLight,
  },
  chip: {
    backgroundColor: Colors.light.card,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    // soft lift so the card reads as a brand badge on the teal header
    ...Elevation.lift,
  },
});

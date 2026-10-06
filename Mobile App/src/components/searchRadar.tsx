import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useReducedMotion } from '@/components/motion';
import { Colors, Fonts, Radius, Spacing } from '@/constants/theme';

/**
 * SWON Quick Search radar — the visual "we are scanning this area" layer.
 *
 * Deliberately NOT a sci-fi HUD: a soft mint field, one teal centre (the
 * event/zone), up to three expanding rings and a few abstract pulse dots.
 *
 * PRIVACY: the API returns counts + distance bands only — it never exposes a
 * worker's coordinates — so the dots are DECORATIVE (fixed angles), never a
 * plot of real people. Real numbers are rendered as text by the caller.
 *
 * Runs on Reanimated; the loop is cancelled on unmount and when `active` is
 * false (screen blurred / search finished), so it never animates off-screen.
 */

const SIZE = 232;
const RING = SIZE - 8;

function Ring({
  progress,
  index,
  active,
  reduced,
}: {
  progress: { value: number };
  index: number;
  active: boolean;
  reduced: boolean;
}) {
  const style = useAnimatedStyle(() => {
    if (reduced) return { opacity: 0.18, transform: [{ scale: 0.7 + index * 0.12 }] };
    const v = (progress.value + index / 3) % 1;
    return {
      opacity: active ? (1 - v) * 0.5 : 0,
      transform: [{ scale: 0.34 + 0.66 * v }],
    };
  });
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.ring,
        { width: RING, height: RING, borderRadius: RING / 2 },
        style,
      ]}
    />
  );
}

/** Abstract pulse dots — fixed angles, NOT worker positions. */
const DOTS = [
  { top: '16%', left: '26%', d: 0 },
  { top: '30%', left: '76%', d: 180 },
  { top: '68%', left: '18%', d: 340 },
  { top: '76%', left: '66%', d: 520 },
  { top: '46%', left: '88%', d: 700 },
] as const;

function Dot({ delay, reduced }: { delay: number; reduced: boolean }) {
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => {
      pulse.value = withRepeat(
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.quad) }),
        -1,
        true,
      );
    }, delay);
    return () => {
      clearTimeout(t);
      cancelAnimation(pulse);
    };
  }, [delay, pulse, reduced]);
  const style = useAnimatedStyle(() => ({
    opacity: reduced ? 0.5 : 0.25 + 0.6 * pulse.value,
    transform: [{ scale: reduced ? 1 : 0.85 + 0.35 * pulse.value }],
  }));
  return <Animated.View pointerEvents="none" style={[styles.dot, style]} />;
}

export function SearchRadar({
  active,
  done,
}: {
  /** scanning in progress → rings animate */
  active: boolean;
  /** a result set has landed → calm the field, keep the centre */
  done?: boolean;
}) {
  const reduced = useReducedMotion();
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!active || reduced) {
      cancelAnimation(progress);
      progress.value = done ? 0.5 : 0;
      return;
    }
    progress.value = withRepeat(
      withTiming(1, { duration: 1900, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
    return () => cancelAnimation(progress);
  }, [active, reduced, done, progress]);

  const centre = useAnimatedStyle(() => ({
    transform: [{ scale: active && !reduced ? 0.92 + 0.16 * (1 - progress.value) : 1 }],
  }));

  return (
    <View style={styles.field} accessible accessibilityRole="image" accessibilityLabel="Search area">
      <View style={styles.tint} />
      <Ring progress={progress} index={0} active={active} reduced={reduced} />
      <Ring progress={progress} index={1} active={active} reduced={reduced} />
      <Ring progress={progress} index={2} active={active} reduced={reduced} />
      {DOTS.map((d) => (
        <Dot key={d.d} delay={d.d} reduced={reduced} />
      ))}
      <Animated.View style={[styles.centre, centre]}>
        <View style={styles.centreCore} />
      </Animated.View>
      <View style={styles.centreLabel}>
        <Text style={styles.centreLabelText}>ZONE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: SIZE,
    height: SIZE,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tint: {
    position: 'absolute',
    width: SIZE - 46,
    height: SIZE - 46,
    borderRadius: (SIZE - 46) / 2,
    backgroundColor: Colors.light.tint,
  },
  ring: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  dot: {
    position: 'absolute',
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.light.primaryLight,
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
  },
  centre: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primary,
    shadowColor: Colors.light.primaryDeep,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  centreCore: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.light.card,
  },
  centreLabel: {
    position: 'absolute',
    bottom: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
  },
  centreLabelText: {
    fontSize: 9.5,
    lineHeight: 12,
    letterSpacing: 1.2,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primaryDark,
  },
});

export const RADAR_GAP = Spacing.three;

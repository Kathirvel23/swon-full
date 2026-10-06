import { useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  createAnimatedComponent,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

import { useReducedMotion } from '@/components/motion';
import { Colors, Fonts, Spacing } from '@/constants/theme';

/**
 * SWON splash — the owner-approved brand reveal (6 frames, ~1.2s then hand off).
 *
 *   F1 0.0s  deep-teal brand field (subtle tonal gradient)
 *   F2 0.3s  a mint curve travels across (drawn via animated SVG stroke)
 *   F3 0.6s  the curve closes into the SWON "O" with a soft mint glow
 *   F4 0.9s  the wordmark rises in (fade + scale 0.96 → 1 + translateY); the O resolves into it
 *   F5 1.2s  tagline fades in + three mint loading dots pulse
 *   → once session/font initialisation is ready: 200ms fade/scale out → Login
 *
 * Uses the existing SWON brand assets (geometry untouched); the wordmark ships a
 * light variant (white letters + mint "o") derived from the same artwork so it
 * reads on the teal field. Reduced motion jumps to the final lockup. This overlay
 * never delays hydration/routing — the app boots underneath it.
 */

const WORD_LIGHT = require('../../assets/brand/swon-wordmark-light.png');
const WORD_ASPECT = 323 / 1119;

const EASE_OUT = Easing.out(Easing.cubic);
const R = 46;
const CIRC = 2 * Math.PI * R;
const AnimatedCircle = createAnimatedComponent(Circle);

export function SplashScreen({
  ready,
  onHidden,
}: {
  /** app initialisation complete (fonts loaded + session hydrated) */
  ready: boolean;
  /** called after the exit transition finishes, so the host can unmount us */
  onHidden: () => void;
}) {
  const reduced = useReducedMotion();

  const draw = useSharedValue(0); // 0 → 1 draws the curve
  const ring = useSharedValue(1); // ring visibility (fades as the wordmark lands)
  const word = useSharedValue(0); // wordmark
  const tag = useSharedValue(0); // tagline
  const dots = useSharedValue(0); // loading dots pulse
  const root = useSharedValue(1); // exit fade
  const mountAt = useRef(0);
  const exited = useRef(false);

  // ---- play the 6-frame timeline on mount ----
  useEffect(() => {
    mountAt.current = Date.now();
    if (reduced) {
      draw.value = 1;
      ring.value = 0;
      word.value = 1;
      tag.value = 1;
      dots.value = 1;
      return;
    }
    draw.value = withDelay(150, withTiming(1, { duration: 520, easing: EASE_OUT }));
    ring.value = withDelay(880, withTiming(0, { duration: 340, easing: EASE_OUT }));
    word.value = withDelay(900, withTiming(1, { duration: 460, easing: EASE_OUT }));
    tag.value = withDelay(1200, withTiming(1, { duration: 420, easing: EASE_OUT }));
    const t = setTimeout(() => {
      dots.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 420, easing: Easing.inOut(Easing.quad) }),
          withTiming(0, { duration: 420, easing: Easing.inOut(Easing.quad) }),
        ),
        -1,
        false,
      );
    }, 1250);
    return () => clearTimeout(t);
  }, [reduced, draw, ring, word, tag, dots]);

  // ---- exit: once the app is ready AND the short sequence has played ----
  // Time-based (no setState): waits out the remaining sequence, then runs the
  // ~200ms fade/scale hand-off. Reduced motion skips the wait.
  useEffect(() => {
    if (!ready || exited.current) return;
    const minMs = reduced ? 0 : 1650;
    const wait = Math.max(0, minMs - (Date.now() - mountAt.current));
    const t = setTimeout(() => {
      if (exited.current) return;
      exited.current = true;
      root.value = withTiming(0, { duration: 200, easing: EASE_OUT }, (finished) => {
        if (finished) runOnJS(onHidden)();
      });
    }, wait);
    return () => clearTimeout(t);
  }, [ready, reduced, root, onHidden]);

  const rootStyle = useAnimatedStyle(() => ({
    opacity: root.value,
    transform: [{ scale: 0.985 + 0.015 * root.value }],
  }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: ring.value,
    transform: [
      { rotate: `${-90 + 22 * (1 - draw.value)}deg` },
      { scale: 0.94 + 0.06 * draw.value },
    ],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: 0.6 * ring.value,
    transform: [{ scale: 0.92 + 0.16 * ring.value }],
  }));
  const arcDash = useAnimatedProps(() => ({
    strokeDashoffset: CIRC * (1 - draw.value),
  }));
  const wordStyle = useAnimatedStyle(() => ({
    opacity: word.value,
    transform: [{ translateY: (1 - word.value) * 12 }, { scale: 0.96 + 0.04 * word.value }],
  }));
  const tagStyle = useAnimatedStyle(() => ({
    opacity: tag.value,
    transform: [{ translateY: (1 - tag.value) * 8 }],
  }));

  const WORD_W = 176;

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.root, rootStyle]} pointerEvents="auto">
      {/* F1 — deep-teal brand field with a subtle tonal gradient */}
      <LinearGradient
        colors={['#0B4540', '#0A3A36', '#0B4540']}
        locations={[0, 0.55, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.center}>
        {/* F2/F3 — the travelling curve forming the "O"; F4 resolves into the wordmark */}
        <View style={styles.lockup}>
          <Animated.View style={[styles.ringAbs, ringStyle]} pointerEvents="none">
            <Animated.View style={[styles.glow, glowStyle]} />
            <View style={styles.glowSoft} />
            <Svg width={R * 2 + 20} height={R * 2 + 20} viewBox={`0 0 ${R * 2 + 20} ${R * 2 + 20}`}>
              <AnimatedCircle
                cx={R + 10}
                cy={R + 10}
                r={R}
                stroke={Colors.light.primaryLight}
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={CIRC}
                animatedProps={arcDash}
              />
            </Svg>
          </Animated.View>

          <Animated.View style={[styles.wordWrap, wordStyle]}>
            <Image
              source={WORD_LIGHT}
              resizeMode="contain"
              style={{ width: WORD_W, height: Math.round(WORD_W * WORD_ASPECT) }}
            />
          </Animated.View>
        </View>

        {/* F5 — tagline directly under the lockup */}
        <Animated.View style={tagStyle}>
          <Text style={styles.tagline}>Find work. Build trust. Get paid.</Text>
        </Animated.View>
      </View>

      {/* F5 — subtle loading dots near the bottom */}
      <View style={styles.bottom}>
        <View style={styles.dots}>
          {[0, 1, 2].map((i) => (
            <PulseDot key={i} progress={dots} index={i} />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

function PulseDot({ progress, index }: { progress: { value: number }; index: number }) {
  const style = useAnimatedStyle(() => {
    const v = progress.value;
    const shifted = Math.max(0, Math.min(1, v - index * 0.14));
    return { opacity: 0.28 + 0.72 * shifted, transform: [{ scale: 0.85 + 0.25 * shifted }] };
  });
  return <Animated.View style={[styles.dot, style]} />;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#0B4540',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockup: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.four,
  },
  ringAbs: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    width: 132,
    height: 132,
    borderRadius: 66,
    backgroundColor: 'rgba(204, 251, 241, 0.14)',
  },
  glowSoft: {
    position: 'absolute',
    width: 172,
    height: 172,
    borderRadius: 86,
    backgroundColor: 'rgba(204, 251, 241, 0.05)',
  },
  wordWrap: {
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 92,
    alignItems: 'center',
  },
  tagline: {
    fontFamily: Fonts.bodyBold,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.2,
    color: 'rgba(255,255,255,0.92)',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.light.primaryLight,
  },
});
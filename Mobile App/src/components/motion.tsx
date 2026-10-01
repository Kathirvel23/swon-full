import { useEffect, useState } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Colors, Radius } from '@/constants/theme';

/**
 * Motion primitives (plan U6) — V3 motion language: skeletons on every async
 * surface, soft fade-up entrances, count-ups for money/match, all gated by
 * the system reduced-motion setting (design §2 motion + a11y factor 8).
 */

/** True when the OS (or browser) asks for reduced motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let mounted = true;
    try {
      const api = AccessibilityInfo as unknown as {
        isReduceMotionEnabled?: () => Promise<boolean>;
        addEventListener?: (e: string, cb: (v: boolean) => void) => { remove: () => void };
      };
      if (typeof api.isReduceMotionEnabled === 'function') {
        void api
          .isReduceMotionEnabled()
          .then((v) => {
            if (mounted) setReduced(v === true);
          })
          .catch(() => undefined);
      }
      if (typeof api.addEventListener === 'function') {
        const sub = api.addEventListener('reduceMotionChanged', (v: boolean) => {
          if (mounted) setReduced(v === true);
        });
        return () => {
          mounted = false;
          sub.remove();
        };
      }
    } catch {
      /* platform without the API — default to motion on */
    }
    return () => {
      mounted = false;
    };
  }, []);
  return reduced;
}

/** Design §3 Skeleton — pulsing placeholder block; static under reduced motion. */
export function Skeleton({
  width,
  height = 16,
  radius = Radius.sm,
  style,
}: {
  width: number | `${number}%`;
  height?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const reduced = useReducedMotion();
  const pulse = useSharedValue(0.55);
  useEffect(() => {
    if (reduced) {
      pulse.value = 0.7;
      return;
    }
    pulse.value = withRepeat(withTiming(1, { duration: 850 }), -1, true);
    return undefined;
  }, [reduced, pulse]);
  const animated = useAnimatedStyle(() => ({ opacity: pulse.value }));
  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        { width, height, borderRadius: radius, backgroundColor: Colors.light.line },
        animated,
        style,
      ]}
    />
  );
}

/** Stack of skeleton lines — the standard list/card loading state. */
export function SkeletonLines({ lines = 3, gap = 8 }: { lines?: number; gap?: number }) {
  return (
    <View style={{ gap }}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} width={i === lines - 1 ? '60%' : '100%'} />
      ))}
    </View>
  );
}

/** Fade-up entrance for cards entering the viewport (skipped under reduced motion). */
export function Enter({
  children,
  delay = 0,
  duration = 240,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  /** entrance length in ms (240 = snappy default; longer reads softer) */
  duration?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <View style={style}>{children}</View>;
  }
  return (
    <Animated.View entering={FadeInDown.duration(duration).delay(delay)} style={style}>
      {children}
    </Animated.View>
  );
}

/**
 * Count-up for money/match figures: animates 0 → target once on mount,
 * instantly under reduced motion. Returns the current frame value.
 */
export function useCountUp(target: number, duration = 750): number {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduced) return undefined;
    let raf = 0;
    const start = Date.now();
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, reduced]);
  return reduced ? target : value;
}

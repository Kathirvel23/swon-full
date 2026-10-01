import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { IconButton } from '@/components/ui';
import { ProgressRing } from '@/components/marketplace';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';

/**
 * Feedback & data-viz set (UI_UX_DESIGN.md §3, batch U3c): Sheet (bottom
 * overlay), Toast, Timeline, CountdownRing, EarningsChart. Pure token
 * colours — the five loading/empty/offline states land in U8.
 */

/** Design §3 Sheet — modal bottom sheet, rounded top, grab handle. */
export function Sheet({
  visible,
  onClose,
  title,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Close sheet" />
      <View style={styles.sheet} accessibilityViewIsModal>
        <View style={styles.grab} />
        {title ? (
          <View style={styles.sheetHead}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <IconButton name="close" accessibilityLabel="Close" onPress={onClose} size={20} />
          </View>
        ) : null}
        <View style={styles.sheetBody}>{children}</View>
      </View>
    </Modal>
  );
}

/** Design §3 Toast — transient confirmation strip (top, below header). */
export function Toast({
  message,
  tone = 'green',
  actionLabel,
  onAction,
}: {
  message: string;
  tone?: 'green' | 'coral' | 'blue';
  actionLabel?: string;
  onAction?: () => void;
}) {
  const bg = tone === 'green' ? Colors.light.success : tone === 'coral' ? Colors.light.danger : Colors.light.info;
  const border = tone === 'green' ? Colors.light.green : tone === 'coral' ? Colors.light.coral : Colors.light.blue;
  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={message}
      style={[styles.toast, { backgroundColor: `${bg}14`, borderColor: border }]}
    >
      <Text style={styles.toastText}>{message}</Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" style={styles.toastAction}>
          <Text style={[styles.toastActionText, { color: border }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/** Design §3 Timeline — vertical event rail with completed/current/future nodes. */
export function Timeline({
  items,
}: {
  items: { label: string; time?: string; state: 'done' | 'current' | 'future' }[];
}) {
  return (
    <View style={styles.timeline}>
      {items.map((it, i) => {
        const isLast = i === items.length - 1;
        const dotColor =
          it.state === 'done' ? Colors.light.primary : it.state === 'current' ? Colors.light.orange : Colors.light.line;
        const textColor = it.state === 'future' ? Colors.light.textMuted : Colors.light.text;
        return (
          <View key={it.label + i} style={styles.tlRow}>
            <View style={styles.tlRail}>
              <View style={[styles.tlDot, { backgroundColor: dotColor }]} />
              {!isLast ? <View style={styles.tlLine} /> : null}
            </View>
            <View style={styles.tlContent}>
              <Text style={[styles.tlLabel, { color: textColor }]}>{it.label}</Text>
              {it.time ? <Text style={styles.tlTime}>{it.time}</Text> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

/** Design §3 CountdownRing — ProgressRing centre carrying the time left. */
export function CountdownRing({
  remaining,
  percent,
  label,
  size = 72,
}: {
  remaining: string;
  percent: number;
  label?: string;
  size?: number;
}) {
  const color = percent < 25 ? Colors.light.coral : Colors.light.orange;
  return (
    <View style={styles.countWrap}>
      <ProgressRing percent={percent} size={size} stroke={7} color={color}>
        <Text style={[styles.countText, { fontSize: Math.round(size * 0.22) }]}>{remaining}</Text>
      </ProgressRing>
      {label ? <Text style={styles.countLabel}>{label}</Text> : null}
    </View>
  );
}

/** Design §3 EarningsChart — token bar chart (money-green, today in blue). */
export function EarningsChart({
  data,
  height = 132,
}: {
  data: { label: string; value: number; today?: boolean }[];
  height?: number;
}) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <View style={styles.chart} accessibilityLabel="Earnings chart">
      <View style={[styles.chartPlot, { height }]}>
        {data.map((d, i) => {
          const h = Math.max(6, Math.round((d.value / max) * (height - 22)));
          return (
            <View key={d.label + i} style={styles.chartCol}>
              <Text style={styles.chartValue}>{d.value >= 1000 ? `${Math.round(d.value / 100) / 10}k` : d.value}</Text>
              <View
                style={[
                  styles.chartBar,
                  {
                    height: h,
                    backgroundColor: d.today ? Colors.light.blue : Colors.light.green,
                  },
                ]}
              />
              <Text style={[styles.chartLabel, d.today && styles.chartLabelToday]}>{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/** Auto-dismiss helper for screens: returns [visible, show, hide]. */
export function useToastTimer(ms = 2600): {
  visible: boolean;
  show: () => void;
  hide: () => void;
} {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!visible) return undefined;
    const t = setTimeout(() => setVisible(false), ms);
    return () => clearTimeout(t);
  }, [visible, ms]);
  return { visible, show: () => setVisible(true), hide: () => setVisible(false) };
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.light.scrim,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.light.card,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.four,
    paddingTop: Spacing.one,
    gap: Spacing.two,
    ...Elevation.lift,
  },
  grab: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.light.border,
    marginBottom: Spacing.one,
  },
  sheetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sheetTitle: {
    ...TypeScale.titleSm,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  sheetBody: {
    gap: Spacing.two,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    ...Elevation.card,
  },
  toastText: {
    ...TypeScale.bodySm,
    flex: 1,
    color: Colors.light.text,
  },
  toastAction: {
    minHeight: 32,
    justifyContent: 'center',
  },
  toastActionText: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodyBold,
  },
  timeline: {
    gap: 0,
  },
  tlRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  tlRail: {
    alignItems: 'center',
    width: 16,
  },
  tlDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  tlLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.light.line,
    marginVertical: 2,
  },
  tlContent: {
    flex: 1,
    paddingBottom: Spacing.two,
    gap: 2,
  },
  tlLabel: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
  },
  tlTime: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },
  countWrap: {
    alignItems: 'center',
    gap: Spacing.half,
  },
  countText: {
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },
  countLabel: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },
  chart: {
    width: '100%',
  },
  chartPlot: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: Spacing.one,
    borderStyle: 'dashed',
    borderTopWidth: 1,
    borderColor: Colors.light.line,
    paddingTop: Spacing.one,
  },
  chartCol: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '72%',
    borderRadius: Radius.sm,
    minHeight: 6,
  },
  chartValue: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    fontSize: 10,
  },
  chartLabel: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
    fontSize: 11,
  },
  chartLabelToday: {
    color: Colors.light.blue,
    fontFamily: Fonts.bodyBold,
  },
});

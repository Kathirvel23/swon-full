import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { paymentsApi, type EarningRow } from '@/api/attendance';
import { Sheet } from '@/components/feedback';
import { Button, Screen } from '@/components/screen';
import { AttentionBanner, MoneyDisplay } from '@/components/marketplace';
import { Skeleton } from '@/components/motion';
import { Chip, StatusChip } from '@/components/ui';
import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
  Radius,
  Spacing,
  statusColors,
  TypeScale,
} from '@/constants/theme';
import { en } from '@/i18n/strings';

type Filter = 'ALL' | 'WAITING' | 'PAID';

/** V3 copy without an i18n key yet. */
const ADJUST_LABEL = 'Adjustment';
const PAID_ON = 'Paid';

/** Prototype §w-earnings English copy (no i18n keys yet — literals only). */
const MONTH_LABEL = 'THIS MONTH';
const EARNINGS_SUB = 'Paid + pending across all opportunities';
const HOW_LABEL = 'How it works';
const HOW_TITLE = 'How earnings work';
const HOW_SUB = 'SWON tracks the record — money moves your usual way (no gateway in V1)';
const HOW_DONE = 'Got it';
const HISTORY_LABEL = 'Payment history';
const PENDING_WORD = 'pending';
const RECEIVED_WORD = 'received';
const CHART_LABEL = 'Earnings by day';
const AWAITING = 'awaiting payout';
const WITHIN_24H = 'host records within 24h';

/** Payment rail copy — the prototype `.timeline` steps of §w-earnings. */
const TL_WORK = 'Work complete';
const TL_APPROVED = 'Host approves the day';
const TL_APPROVED_SUB = 'Amount locks in';
const TL_PENDING = 'Payment pending — host records within 24h';
const TL_RECORDED = 'Payment recorded';
const TL_RECORDED_SUB = 'Reference stored, TrustScore updated';

type RailState = 'done' | 'wait' | 'current';
type RailItem = { label: string; sub?: string; state: RailState };

/** Local calendar day (YYYY-MM-DD) of an ISO timestamp — pure, render-safe. */
function dayKey(value: string | number): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** "29 Sep, 6:04 PM" — the prototype's timeline stamp. */
function stamp(iso?: string | null): string | undefined {
  if (iso == null) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Weekday short label of a YYYY-MM-DD key (prototype chart: Mon…Sun). */
function weekday(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { weekday: 'short' });
}

/**
 * Prototype `.timeline` rendered locally (16px dots, done = green,
 * wait = amber, 2px connector) — the shared Timeline in feedback.tsx keeps
 * its own token colours for the screens that already use it.
 */
function PaymentRail({ items }: { items: RailItem[] }) {
  return (
    <View accessibilityLabel="Payment timeline" style={styles.rail}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <View key={`${it.label}-${i}`} style={styles.railRow}>
            <View style={styles.railGutter}>
              <View
                style={[
                  styles.railDot,
                  it.state === 'done' && styles.railDotDone,
                  it.state === 'wait' && styles.railDotWait,
                ]}
              />
              {!last ? <View style={styles.railLine} /> : null}
            </View>
            <View style={styles.railBody}>
              <Text style={styles.railLabel}>{it.label}</Text>
              {it.sub ? <Text style={styles.railSub}>{it.sub}</Text> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

/** Timeline built ONLY from what the server already told us about the row. */
function paymentRail(row: EarningRow): RailItem[] {
  const approved =
    row.approvedAt != null || ['APPROVED', 'PROCESSING', 'PAID'].includes(row.status);
  const paid = row.paidAt != null || row.status === 'PAID';
  return [
    {
      label: TL_WORK,
      sub: stamp(row.job.endsOn),
      state: approved ? 'done' : 'current',
    },
    {
      label: TL_APPROVED,
      sub: approved ? stamp(row.approvedAt) ?? TL_APPROVED_SUB : undefined,
      state: approved ? 'done' : 'current',
    },
    paid
      ? { label: TL_RECORDED, sub: stamp(row.paidAt) ?? TL_RECORDED_SUB, state: 'done' }
      : { label: TL_PENDING, state: 'wait' },
  ];
}

/** Prototype `.chart` — 118px, teal bars, money-green peak with a soft glow. */
function WeekChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const peak = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);
  return (
    <View accessibilityLabel={CHART_LABEL} style={styles.chart}>
      {data.map((d, i) => {
        const isPeak = i === peak && d.value > 0;
        const height = d.value <= 0 ? 6 : Math.max(8, Math.round((d.value / max) * 76));
        return (
          <View key={`${d.label}-${i}`} style={styles.chartCol}>
            <Text style={styles.chartValue}>{d.value.toLocaleString('en-IN')}</Text>
            <LinearGradient
              colors={[...(isPeak ? Gradients.money : Gradients.teal)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={[styles.chartBar, isPeak ? styles.chartBarPeak : null, { height }]}
            />
            <Text style={[styles.chartLabel, isPeak && styles.chartLabelPeak]}>{d.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

/**
 * W5 (H9 worker side): my earnings — amounts the system computed from
 * approved attendance. V3: the §w-earnings month summary (money hero,
 * delta pill, payment banner, day chart), then one card per earning with
 * its status chip, payment rail and adjustment line. Nothing here is
 * editable by the worker (P2/P4 are employer-side role-guarded).
 */
export default function EarningsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('ALL');
  const [infoOpen, setInfoOpen] = useState(false);

  const statusParam =
    filter === 'WAITING' ? 'PENDING,ELIGIBLE,APPROVED,PROCESSING' : filter === 'PAID' ? 'PAID' : undefined;

  const list = useQuery({
    queryKey: ['my-earnings', filter],
    queryFn: () => paymentsApi.myEarnings(statusParam),
    retry: 1,
  });

  const rows = list.data?.data ?? [];
  const rupees = (paise: number): string => `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;

  const totalWaiting = rows
    .filter((r) => r.status !== 'PAID' && r.status !== 'CANCELLED')
    .reduce((a, r) => a + r.amountPaise + r.adjustmentPaise, 0);
  const totalPaid = rows.filter((r) => r.status === 'PAID').reduce((a, r) => a + r.amountPaise, 0);

  /** Month totals from the rows' own dates (paid → approved → job start). */
  const basisOf = (r: EarningRow): string => r.paidAt ?? r.approvedAt ?? r.job.startsOn;
  const monthIndex = (value: string): number => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return -1;
    return d.getFullYear() * 12 + d.getMonth();
  };
  const today = new Date();
  const thisMonth = today.getFullYear() * 12 + today.getMonth();
  const monthTotal = (index: number): number =>
    rows
      .filter((r) => r.status !== 'CANCELLED' && monthIndex(basisOf(r)) === index)
      .reduce((a, r) => a + r.amountPaise + r.adjustmentPaise, 0);
  const monthAmount = monthTotal(thisMonth);
  const lastMonthAmount = monthTotal(thisMonth - 1);
  const deltaPercent =
    lastMonthAmount > 0 ? Math.round(((monthAmount - lastMonthAmount) / lastMonthAmount) * 100) : null;
  const deltaTone = statusColors('PAID');

  // Chart: group the real rows by their own day (paid → approved → job start).
  const byDay = new Map<string, number>();
  for (const r of rows) {
    const key = dayKey(basisOf(r));
    if (!key) continue;
    byDay.set(key, (byDay.get(key) ?? 0) + Math.round((r.amountPaise + r.adjustmentPaise) / 100));
  }
  const chartData = [...byDay.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-7)
    .map(([date, value]) => ({ label: weekday(date), value }));

  const bannerMessage =
    totalWaiting > 0
      ? `${rupees(totalWaiting)} ${AWAITING} · ${WITHIN_24H}`
      : `${rupees(totalPaid)} ${RECEIVED_WORD}`;

  return (
    <Screen
      title={en.payments.myEarnings}
      headerLeft={<View />}
      headerSub={<Text style={styles.headerSub}>{EARNINGS_SUB}</Text>}
      headerRight={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={HOW_LABEL}
          onPress={() => setInfoOpen(true)}
          style={({ pressed }) => [styles.tinyBtn, pressed && styles.tinyBtnPressed]}
        >
          <Text style={styles.tinyBtnText}>{HOW_LABEL}</Text>
        </Pressable>
      }
      tab="earnings"
    >
      {list.isError ? <Text style={styles.error}>{errorMessage(list.error)}</Text> : null}

      {/* month summary — money is the dominant figure on the screen */}
      <View style={styles.summary}>
        <View style={styles.summaryTop}>
          <Text style={styles.summaryKicker}>{MONTH_LABEL}</Text>
          {deltaPercent != null ? (
            <View style={[styles.delta, { backgroundColor: deltaTone.bg }]}>
              <Text style={[styles.deltaText, { color: deltaTone.fg }]}>
                {deltaPercent >= 0 ? '+' : ''}
                {deltaPercent}%
              </Text>
            </View>
          ) : null}
        </View>
        <MoneyDisplay amount={Math.round(monthAmount / 100)} size="lg" />
        <Text style={styles.summarySub}>{`${rupees(totalWaiting)} ${PENDING_WORD} · ${rupees(
          totalPaid,
        )} ${RECEIVED_WORD}`}</Text>
        {totalWaiting > 0 || totalPaid > 0 ? (
          <AttentionBanner tone="green" icon="cash-outline" message={bannerMessage} />
        ) : null}
        {chartData.length > 1 ? <WeekChart data={chartData} /> : null}
      </View>

      <View style={styles.chips}>
        <Chip label={en.payments.all} selected={filter === 'ALL'} onPress={() => setFilter('ALL')} />
        <Chip
          label={en.payments.status.ELIGIBLE}
          selected={filter === 'WAITING'}
          onPress={() => setFilter('WAITING')}
        />
        <Chip label={en.payments.status.PAID} selected={filter === 'PAID'} onPress={() => setFilter('PAID')} />
      </View>

      <Text style={styles.sectionHead}>{HISTORY_LABEL}</Text>

      {rows.length === 0 && !list.isLoading ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="wallet-outline" size={30} color={Colors.light.green} />
          </View>
          <Text style={styles.emptyText}>{en.payments.empty}</Text>
        </View>
      ) : null}

      {list.isLoading ? (
        <>
          {[0, 1, 2, 3].map((i) => (
            <View key={`earning-skel-${i}`} style={styles.row}>
              <Skeleton width="45%" height={22} radius={Radius.md} />
              <Skeleton width="85%" height={14} />
              <Skeleton width="60%" height={12} />
            </View>
          ))}
        </>
      ) : null}

      {rows.map((e) => (
        <View key={e.publicId} style={styles.row}>
          <View style={styles.rowHead}>
            <MoneyDisplay amount={Math.round((e.amountPaise + e.adjustmentPaise) / 100)} />
            <StatusChip status={e.status} />
          </View>
          <Text style={styles.rowTitle}>{e.job.title}</Text>
          <Text style={styles.rowMeta}>{`${e.job.startsOn} → ${e.job.endsOn}`}</Text>
          <Text style={styles.rowMeta}>{`${en.payments.minutes}: ${e.attendanceMinutes}`}</Text>

          {e.status !== 'PAID' && e.status !== 'CANCELLED' ? (
            <>
              <View style={styles.hairline} />
              <PaymentRail items={paymentRail(e)} />
            </>
          ) : null}

          {e.adjustmentPaise !== 0 ? (
            <View style={styles.adjust}>
              <Text style={styles.adjustLabel}>{ADJUST_LABEL}</Text>
              <Text style={styles.adjustValue}>
                {rupees(e.adjustmentPaise)}
                {e.adjustmentReason ? ` · ${e.adjustmentReason}` : ''}
              </Text>
            </View>
          ) : null}

          {e.paidAt ? (
            <Text style={styles.paid}>{`${PAID_ON} ${new Date(e.paidAt).toLocaleDateString('en-IN')}`}</Text>
          ) : null}

          {e.status === 'APPROVED' ? (
            <Button
              label={en.complaints.openCase}
              onPress={() => router.push(`/complaints?linkType=EARNING&linkPublicId=${e.publicId}`)}
            />
          ) : null}
        </View>
      ))}

      <Button label={en.common.retry} onPress={() => void list.refetch()} />
      <Button label={en.common.back} onPress={() => router.back()} />

      <Sheet visible={infoOpen} onClose={() => setInfoOpen(false)} title={HOW_TITLE}>
        <Text style={styles.sheetSub}>{HOW_SUB}</Text>
        <PaymentRail
          items={[
            { label: TL_WORK, sub: 'Worker checks out with hours', state: 'done' },
            { label: TL_APPROVED, sub: TL_APPROVED_SUB, state: 'done' },
            { label: TL_PENDING, sub: 'Host pays outside SWON', state: 'wait' },
            { label: TL_RECORDED, sub: TL_RECORDED_SUB, state: 'current' },
          ]}
        />
        <Button label={HOW_DONE} variant="primary" onPress={() => setInfoOpen(false)} />
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerSub: {
    ...TypeScale.caption,
    color: Colors.light.onPrimarySoft,
    fontFamily: Fonts.bodySemi,
  },
  tinyBtn: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: Spacing.mid,
    borderRadius: Radius.btn,
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1.5,
    borderColor: Colors.light.onBrandBorder,
  },
  tinyBtnPressed: { opacity: 0.82 },
  tinyBtnText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },

  summary: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  summaryTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  summaryKicker: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1.2,
    color: Colors.light.textMuted,
  },
  delta: {
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: Spacing.two,
  },
  deltaText: { ...TypeScale.caption, fontFamily: Fonts.bodyExtra, letterSpacing: 0.3 },
  summarySub: { ...TypeScale.caption, fontFamily: Fonts.bodyExtra, color: Colors.light.textMuted },

  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.two,
    height: 118,
    marginTop: Spacing.mid,
  },
  chartCol: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  chartValue: { fontSize: 10, lineHeight: 12, fontFamily: Fonts.bodyExtra, color: Colors.light.textMuted },
  chartBar: {
    width: '100%',
    maxWidth: 34,
    minHeight: 6,
    borderRadius: Radius.sm,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  chartBarPeak: Platform.select({
    web: { boxShadow: `0 4px 10px -4px ${Colors.light.green}` },
    default: {
      shadowColor: Colors.light.green,
      shadowOpacity: 0.5,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
  }) as object,
  chartLabel: { ...TypeScale.caption, fontSize: 11, fontFamily: Fonts.bodyBold, color: Colors.light.textMuted },
  chartLabelPeak: { color: Colors.light.primaryDeep },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  sectionHead: {
    ...TypeScale.titleSm,
    fontFamily: Fonts.display,
    color: Colors.light.text,
    marginTop: Spacing.half,
  },

  empty: {
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
    ...Elevation.card,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { ...TypeScale.body, color: Colors.light.textMuted, textAlign: 'center' },

  row: {
    gap: Spacing.half,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  rowHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.two },
  rowTitle: { ...TypeScale.body, fontFamily: Fonts.bodyExtra, color: Colors.light.text },
  rowMeta: { ...TypeScale.caption, color: Colors.light.textMuted },
  hairline: { height: 1, backgroundColor: Colors.light.line, marginTop: Spacing.one },

  rail: { marginTop: Spacing.one, marginBottom: Spacing.half },
  railRow: { flexDirection: 'row', gap: Spacing.two },
  railGutter: { width: 16, alignItems: 'center' },
  railDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: 2,
    backgroundColor: Colors.light.card,
    borderWidth: 3,
    borderColor: Colors.light.primary,
  },
  railDotDone: { backgroundColor: Colors.light.green, borderColor: Colors.light.green },
  railDotWait: { backgroundColor: Colors.light.amber, borderColor: Colors.light.amber },
  railLine: { flex: 1, width: 2, backgroundColor: Colors.light.line, marginVertical: 2 },
  railBody: { flex: 1, paddingBottom: Spacing.mid, gap: 1 },
  railLabel: { ...TypeScale.bodySm, fontFamily: Fonts.bodyExtra, color: Colors.light.text },
  railSub: { fontSize: 11.5, lineHeight: 15, fontFamily: Fonts.bodySemi, color: Colors.light.textMuted },

  adjust: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    backgroundColor: Colors.light.backgroundSelected,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    marginTop: Spacing.half,
  },
  adjustLabel: { ...TypeScale.caption, fontFamily: Fonts.bodyBold, color: Colors.light.textMuted },
  adjustValue: { ...TypeScale.caption, fontFamily: Fonts.bodySemi, color: Colors.light.text, flexShrink: 1, textAlign: 'right' },
  paid: { ...TypeScale.caption, fontFamily: Fonts.bodyBold, color: Colors.light.success, marginTop: Spacing.half },

  sheetSub: { ...TypeScale.bodySm, color: Colors.light.textMuted },

  error: { ...TypeScale.body, color: Colors.light.danger },
});

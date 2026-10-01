import { Ionicons } from '@expo/vector-icons';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { paymentsApi, type EarningRow } from '@/api/attendance';
import { jobsApi, type JobCard } from '@/api/jobs';
import { MoneyDisplay, SeatDots } from '@/components/marketplace';
import { Timeline } from '@/components/feedback';
import { Skeleton, SkeletonLines } from '@/components/motion';
import { Button, Screen } from '@/components/screen';
import { Avatar, StatusChip } from '@/components/ui';
import { Colors, Elevation, Fonts, Gradients, Radius, Spacing, TypeScale, statusColors } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/**
 * Host "Payments" tab (prototype #e-pay entry): the ready-to-approve money
 * hero (real ELIGIBLE rows summed over the host's staffed Opportunities),
 * worker rows with their approve CTA, the payment-to-record strip that
 * deep-links into the existing per-job payouts ledger, paid / hold state
 * chips, a Recent list and the payment-progress Timeline.
 *
 * V1 is RECORD-ONLY: approving and recording hit the same endpoints as
 * before (Idempotency-Key inside paymentsApi) — no gateway, no money moves.
 */

const rupees = (paise: number): string => `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;

type JobEarning = { job: JobCard; earning: EarningRow };

/** `.list-row` — 36px tinted tile + copy + status pill. */
function EarningRowLine({ item, onPress }: { item: JobEarning; onPress?: () => void }) {
  const { earning } = item;
  const name = earning.worker?.fullName ?? earning.job.title;
  const when = earning.paidAt
    ? `Paid ${new Date(earning.paidAt).toLocaleDateString('en-IN')}`
    : earning.approvedAt
      ? `Approved ${new Date(earning.approvedAt).toLocaleDateString('en-IN')}`
      : earning.job.title;
  const held = earning.status === 'ON_HOLD' || earning.status === 'FAILED';
  const body = (
    <>
      <View
        style={[
          s.lrIcon,
          {
            backgroundColor: held
              ? statusColors('ON_HOLD').bg
              : earning.paidAt
                ? statusColors('PAID').bg
                : Colors.light.tint,
          },
        ]}
      >
        <Ionicons
          name={held ? 'pause' : 'checkmark'}
          size={18}
          color={held ? statusColors('ON_HOLD').fg : Colors.light.success}
        />
      </View>
      <Avatar name={name} size={38} />
      <View style={s.lrMain}>
        <Text numberOfLines={1} style={s.lrTitle}>
          {`${rupees(earning.amountPaise + earning.adjustmentPaise)} · ${name}`}
        </Text>
        <Text numberOfLines={1} style={s.lrSub}>
          {`${when} · ${en.payments.minutes}: ${earning.attendanceMinutes}`}
        </Text>
      </View>
      <StatusChip status={earning.status} size="sm" />
    </>
  );
  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}. ${en.shell.paymentsCta}`}
        onPress={onPress}
        style={({ pressed }) => [s.listRow, pressed && s.pressed]}
      >
        {body}
      </Pressable>
    );
  }
  return <View style={s.listRow}>{body}</View>;
}

export default function HostPaymentsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mine = useQuery({ queryKey: ['jobs-mine'], queryFn: jobsApi.mine, retry: 1 });
  const jobs = useMemo(() => mine.data ?? [], [mine.data]);

  /** earnings only exist on staffed Opportunities — same cache keys the
   *  per-job ledger uses, so both screens stay in sync after a mutation. */
  const staffed = useMemo(() => jobs.filter((j) => j.hiredCount > 0), [jobs]);
  const earningLists = useQueries({
    queries: staffed.map((j) => ({
      queryKey: ['job-earnings', j.publicId],
      queryFn: () => paymentsApi.jobEarnings(j.publicId),
      retry: 1,
    })),
  });

  const all: JobEarning[] = [];
  earningLists.forEach((q, i) => {
    const job = staffed[i];
    if (!job) return;
    (q.data?.data ?? []).forEach((earning) => all.push({ job, earning }));
  });

  const eligible = all.filter((r) => r.earning.status === 'ELIGIBLE');
  const approved = all.filter((r) => r.earning.status === 'APPROVED');
  const paid = all.filter((r) => r.earning.status === 'PAID' || r.earning.paidAt != null);
  const held = all.filter((r) => r.earning.status === 'ON_HOLD' || r.earning.status === 'FAILED');
  const eligiblePaise = eligible.reduce((a, r) => a + r.earning.amountPaise + r.earning.adjustmentPaise, 0);
  const approvedPaise = approved.reduce((a, r) => a + r.earning.amountPaise + r.earning.adjustmentPaise, 0);
  const loading = mine.isPending || earningLists.some((q) => q.isPending);

  const recent = all
    .filter((r) => r.earning.paidAt != null || ['PAID', 'ON_HOLD', 'FAILED'].includes(r.earning.status))
    .sort((a, b) => (b.earning.paidAt ?? '').localeCompare(a.earning.paidAt ?? ''))
    .slice(0, 8);

  const invalidate = async () => {
    await queryClient.invalidateQueries({ queryKey: ['job-earnings'] });
  };

  const approveAll = () => {
    if (eligible.length === 0) {
      showAlert(en.payments.approveEarnings, en.payments.empty);
      return;
    }
    void paymentsApi
      .approve(eligible.map((r) => r.earning.publicId))
      .then((res) => {
        showAlert(en.payments.approveEarnings, en.payments.approved(res.approved));
        return invalidate();
      })
      .catch((e: unknown) => showAlert(en.payments.approveEarnings, errorMessage(e)));
  };

  const openLedger = (publicId: string) =>
    router.push(`/employer/earnings/${publicId}` as never);

  const firstApprovedJob = approved[0]?.job ?? null;
  const firstEligibleJob = eligible[0]?.job ?? null;
  const jobTitles = [...new Set(all.map((r) => r.job.title))].slice(0, 2).join(' · ');

  const settled = all.length > 0 && eligible.length === 0 && approved.length === 0;

  const timeline = [
    {
      label: 'Work complete',
      time: 'Worker checks out with hours',
      state: (all.length > 0 ? 'done' : 'current') as 'done' | 'current' | 'future',
    },
    {
      label: 'Host approves the day',
      time: 'Amount locks in',
      state: (eligible.length > 0
        ? 'current'
        : approved.length + paid.length > 0
          ? 'done'
          : 'future') as 'done' | 'current' | 'future',
    },
    {
      label: 'Payment pending',
      time: 'Host pays outside SWON — no gateway in V1',
      state: (approved.length > 0 ? 'current' : paid.length > 0 ? 'done' : 'future') as
        | 'done'
        | 'current'
        | 'future',
    },
    {
      label: 'Recorded → Paid ✓',
      time: 'Reference stored, TrustScore updated',
      state: (paid.length > 0 ? 'done' : 'future') as 'done' | 'current' | 'future',
    },
  ];

  return (
    <Screen title={en.shell.paymentsTitle} tab="payments">
      <Text style={s.pageSub}>{'Approved earnings are recorded here'}</Text>

      {loading ? (
        <>
          {[0, 1, 2].map((i) => (
            <View key={`payment-skel-${i}`} style={s.card}>
              <Skeleton width="70%" height={18} />
              <Skeleton width="45%" height={14} />
              <SkeletonLines lines={3} />
              <Skeleton width="100%" height={44} radius={Radius.md} />
            </View>
          ))}
        </>
      ) : null}
      {!mine.isPending && jobs.length === 0 ? <Text style={s.lede}>{en.shell.paymentsEmpty}</Text> : null}

      {/* ---- state A: ready to approve ---- */}
      {eligible.length > 0 && firstEligibleJob ? (
        <>
          <LinearGradient
            colors={[Colors.light.tint, statusColors('PAID').bg]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.readyCard}
          >
            <Text style={s.kickerGreen}>READY TO APPROVE</Text>
            <View style={s.heroRow}>
              <MoneyDisplay amount={rupees(eligiblePaise)} size="lg" />
              <View style={s.pillGreen}>
                <Text style={s.pillGreenText}>{`${eligible.length} earnings`}</Text>
              </View>
            </View>
            <Text style={s.heroNote}>
              {jobTitles || en.payments.empty}
            </Text>
          </LinearGradient>

          <View style={s.list}>
            {eligible.map((r) => (
              <EarningRowLine key={r.earning.publicId} item={r} />
            ))}
          </View>

          <View style={s.asideNote}>
            <Text style={s.asideText}>
              Approving confirms hours worked. SWON doesn&apos;t move money — you pay workers your usual
              way, then record it.
            </Text>
          </View>

          <Button
            label={`${en.payments.approveEarnings} · ${rupees(eligiblePaise)}`}
            variant="primary"
            onPress={approveAll}
          />
        </>
      ) : null}

      {/* ---- state B: payment to record (V1 — recorded, never moved) ---- */}
      {approved.length > 0 && firstApprovedJob ? (
        <>
          <LinearGradient
            colors={[...Gradients.deep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.recordCard}
          >
            <Text style={s.kickerDark}>PAYMENT TO RECORD</Text>
            <View style={s.heroRow}>
              <Text accessibilityLabel={rupees(approvedPaise)} style={s.amountYellow}>
                {rupees(approvedPaise)}
              </Text>
              <View style={s.pillUrgent}>
                <Text style={s.pillUrgentText}>{`${approved.length} earnings`}</Text>
              </View>
            </View>
            <Text style={s.recordNote}>
              Approved · awaiting your record (paid outside SWON)
            </Text>
            <Button
              label={en.payments.markPaid}
              variant="money"
              onPress={() => openLedger(firstApprovedJob.publicId)}
            />
          </LinearGradient>

          <View style={s.list}>
            {approved.slice(0, 4).map((r) => (
              <EarningRowLine
                key={r.earning.publicId}
                item={r}
                onPress={() => openLedger(r.job.publicId)}
              />
            ))}
          </View>
        </>
      ) : null}

      {/* ---- state C: all settled ---- */}
      {settled ? (
        <View style={s.stateBox}>
          <View style={s.stateArt}>
            <Ionicons name="checkmark" size={40} color={Colors.light.success} />
          </View>
          <Text style={s.stateTitle}>All settled ✓</Text>
          <Text style={s.stateDesc}>
            {`${paid.length} recorded · nothing waiting. Workers see "Paid" the moment you record.`}
          </Text>
          <Button label={en.common.retry} variant="secondary" onPress={() => void invalidate()} />
        </View>
      ) : null}

      {/* ---- hold state ---- */}
      {held.length > 0 ? (
        <View style={s.holdNote}>
          <Ionicons name="pause-circle" size={18} color={statusColors('ON_HOLD').fg} />
          <Text style={s.holdText}>
            {`${held.length} earning(s) on hold — an admin review is blocking the record step.`}
          </Text>
        </View>
      ) : null}

      {/* ---- recent / paid ---- */}
      {recent.length > 0 ? (
        <>
          <Text accessibilityRole="header" style={s.sectionTitle}>
            Recent
          </Text>
          <View style={s.list}>
            {recent.map((r) => (
              <EarningRowLine key={r.earning.publicId} item={r} />
            ))}
          </View>
        </>
      ) : null}

      {!loading && all.length === 0 && jobs.length > 0 ? (
        <Text style={s.lede}>{en.payments.empty}</Text>
      ) : null}

      {/* ---- opportunities → the per-job payouts ledger ---- */}
      <Text accessibilityRole="header" style={s.sectionTitle}>
        {en.jobs.myJobs}
      </Text>
      {mine.isError ? <Text style={s.error}>{errorMessage(mine.error)}</Text> : null}
      {jobs.map((j) => (
        <View key={j.publicId} style={s.card}>
          <View style={s.cardHead}>
            <StatusChip status={j.status} size="sm" />
            <Text numberOfLines={1} style={s.title}>
              {j.title}
            </Text>
          </View>
          <View style={s.cardRow}>
            <SeatDots taken={j.hiredCount} total={j.headcountRequired} />
            <MoneyDisplay amount={j.payLabel} size="sm" />
          </View>
          <Text style={s.meta}>{en.shell.seatsShort(j.hiredCount, j.headcountRequired)}</Text>
          <Button
            label={en.shell.paymentsCta}
            variant={j.hiredCount > 0 ? 'money' : 'secondary'}
            onPress={() => openLedger(j.publicId)}
          />
        </View>
      ))}

      {/* ---- payment progress (prototype .timeline) ---- */}
      <Text accessibilityRole="header" style={s.sectionTitle}>
        How payments work
      </Text>
      <View style={s.timelineCard}>
        <Timeline items={timeline} />
        <Text style={s.timelineNote}>
          SWON tracks the record — money moves your usual way (no gateway in V1).
        </Text>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
  lede: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  error: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  pageSub: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
    fontFamily: Fonts.bodySemi,
  },
  sectionTitle: {
    ...TypeScale.titleSm,
    fontSize: 17,
    lineHeight: 22,
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },

  // --- state A: ready to approve (green money card) ---
  readyCard: {
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: `${Colors.light.green}66`,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  kickerGreen: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1.2,
    color: Colors.light.success,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  pillGreen: {
    borderWidth: 1,
    borderColor: `${Colors.light.success}66`,
    backgroundColor: statusColors('PAID').bg,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: Spacing.two,
  },
  pillGreenText: {
    ...TypeScale.caption,
    fontSize: 11.5,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.success,
  },
  heroNote: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },

  // --- state B: payment to record (deep gradient) ---
  recordCard: {
    gap: Spacing.mid,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.lift,
  },
  kickerDark: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1.2,
    color: Colors.light.onPrimarySoft,
  },
  amountYellow: {
    ...TypeScale.heroAmount,
    fontFamily: Fonts.display,
    color: Colors.light.yellow,
  },
  pillUrgent: {
    backgroundColor: Colors.light.orange,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: Spacing.two,
  },
  pillUrgentText: {
    ...TypeScale.caption,
    fontSize: 11.5,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
  recordNote: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimarySoft,
  },

  // --- aside note (prototype .card.aside-note) ---
  asideNote: {
    gap: Spacing.half,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.light.border,
    borderRadius: Radius.lg,
    padding: Spacing.mid,
  },
  asideText: {
    ...TypeScale.bodySm,
    fontWeight: '600',
    lineHeight: 22,
    color: Colors.light.textMuted,
  },

  // --- state C: settled ---
  stateBox: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    ...Elevation.card,
  },
  stateArt: {
    width: 92,
    height: 92,
    borderRadius: Radius.xxl,
    backgroundColor: statusColors('PAID').bg,
    borderWidth: 1.5,
    borderColor: `${Colors.light.success}66`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateTitle: {
    ...TypeScale.titleSm,
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },
  stateDesc: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
    textAlign: 'center',
    maxWidth: 250,
    lineHeight: 21,
  },

  // --- hold state ---
  holdNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: statusColors('ON_HOLD').bg,
    borderWidth: 1,
    borderColor: `${statusColors('ON_HOLD').fg}66`,
    borderRadius: Radius.md,
    padding: Spacing.mid,
  },
  holdText: {
    ...TypeScale.bodySm,
    flex: 1,
    fontFamily: Fonts.bodySemi,
    color: statusColors('ON_HOLD').fg,
  },

  // --- list rows (.list-row) ---
  list: {
    gap: 9,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    padding: 13, // prototype .list-row padding
    ...Elevation.card,
  },
  lrIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lrMain: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  lrTitle: {
    fontSize: 14.5,
    lineHeight: 19,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  lrSub: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },

  // --- timeline ---
  timelineCard: {
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  timelineNote: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },

  // --- opportunity cards (existing ledger entry points) ---
  card: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    ...TypeScale.titleSm,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
    flex: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  meta: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },
});

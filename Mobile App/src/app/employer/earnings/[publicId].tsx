import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { paymentsApi, type EarningRow } from '@/api/attendance';
import { MoneyDisplay } from '@/components/marketplace';
import { Button, Screen } from '@/components/screen';
import { Avatar, StatusChip, TextField } from '@/components/ui';
import { Colors, Elevation, Fonts, Gradients, Radius, Spacing, TypeScale, statusColors } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/**
 * V3 host earnings / approval detail (prototype #e-pay): money hero with the
 * green delta pills, the approve state card, the external payment recording
 * form and the full row list carrying paid / hold state chips. Approve and
 * payout keep their exact payloads (client-echoed total, server
 * reconciliation, Idempotency-Key generated inside paymentsApi) — V1 stays
 * record-only: no gateway, no money movement.
 */

function EarningLine({ row }: { row: EarningRow }) {
  const amount = row.amountPaise + row.adjustmentPaise;
  const name = row.worker?.fullName ?? row.job.title;
  return (
    <View style={s.row}>
      <Avatar name={name} size={40} />
      <View style={s.rowMain}>
        <Text numberOfLines={1} style={s.rowName}>
          {name}
        </Text>
        <Text style={s.rowMeta}>{`${en.payments.minutes}: ${row.attendanceMinutes}`}</Text>
        {row.paidAt ? (
          <Text style={s.paidOn}>{`Paid ${new Date(row.paidAt).toLocaleDateString('en-IN')}`}</Text>
        ) : null}
      </View>
      <View style={s.rowRight}>
        <MoneyDisplay amount={amount} size="sm" />
        <StatusChip status={row.status} size="sm" />
      </View>
    </View>
  );
}

export default function EmployerEarningsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();
  const [reference, setReference] = useState('');

  const list = useQuery({
    queryKey: ['job-earnings', publicId],
    queryFn: () => paymentsApi.jobEarnings(publicId),
    retry: 1,
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['job-earnings', publicId] });
  };

  const rows = list.data?.data ?? [];
  const eligible = rows.filter((r) => r.status === 'ELIGIBLE');
  const approved = rows.filter((r) => r.status === 'APPROVED');
  const paid = rows.filter((r) => r.status === 'PAID');
  const held = rows.filter((r) => r.status === 'ON_HOLD' || r.status === 'FAILED');
  const totalPaise = approved.reduce((a, r) => a + r.amountPaise + r.adjustmentPaise, 0);
  const eligiblePaise = eligible.reduce((a, r) => a + r.amountPaise + r.adjustmentPaise, 0);
  const rupees = (paise: number): string => `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;

  const approveAll = () => {
    if (eligible.length === 0) {
      showAlert(en.payments.approveEarnings, en.payments.empty);
      return;
    }
    void paymentsApi
      .approve(eligible.map((r) => r.publicId))
      .then((res) => {
        showAlert(en.payments.approveEarnings, en.payments.approved(res.approved));
        return refresh();
      })
      .catch((e: unknown) => showAlert(en.payments.approveEarnings, errorMessage(e)));
  };

  const payNow = () => {
    if (approved.length === 0) {
      showAlert(en.payments.markPaid, en.payments.approveEarnings);
      return;
    }
    if (reference.trim().length < 6) {
      showAlert(en.payments.markPaid, en.payments.reference);
      return;
    }
    showAlert(
      en.payments.markPaid,
      `${en.payments.totalPaid}: ${rupees(totalPaise)}`,
      [
        { text: en.common.cancel, style: 'cancel' },
        {
          text: en.payments.markPaid,
          onPress: () => {
            void paymentsApi
              .markPaid({
                earningIds: approved.map((r) => r.publicId),
                reference: reference.trim(),
                totalPaise,
                currency: 'INR',
              })
              .then((tx) => {
                setReference('');
                showAlert(en.payments.markPaid, `${en.payments.paidOk}: ${tx.reference}`);
                return refresh();
              })
              .catch((e: unknown) => showAlert(en.payments.markPaid, errorMessage(e)));
          },
        },
      ],
    );
  };

  const settled = rows.length > 0 && eligible.length === 0 && approved.length === 0;

  return (
    <Screen title={en.payments.jobEarnings}>
      {list.isError ? <Text style={s.error}>{errorMessage(list.error)}</Text> : null}

      {/* money hero — real totals + prototype `.delta` pills */}
      <View style={s.hero}>
        <Text style={s.heroKicker}>{en.payments.totalPaid}</Text>
        <View style={s.heroRow}>
          <MoneyDisplay amount={rupees(totalPaise)} size="lg" />
          <View style={s.deltaRow}>
            {eligible.length > 0 ? (
              <View style={s.delta}>
                <Text style={s.deltaText}>{`${eligible.length} ready to approve`}</Text>
              </View>
            ) : null}
            {approved.length > 0 ? (
              <View style={s.deltaSoft}>
                <Text style={s.deltaSoftText}>{`${approved.length} approved`}</Text>
              </View>
            ) : null}
            {paid.length > 0 ? (
              <View style={s.deltaSoft}>
                <Text style={s.deltaSoftText}>{`${paid.length} paid`}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <Text style={s.heroNote}>
          {`${en.payments.minutes}: ${rows.reduce((a, r) => a + r.attendanceMinutes, 0)}`}
        </Text>
      </View>

      {/* state A — ready to approve */}
      {eligible.length > 0 ? (
        <>
          <LinearGradient
            colors={[Colors.light.tint, statusColors('PAID').bg]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.stateReady}
          >
            <Text style={s.stateKicker}>READY TO APPROVE</Text>
            <View style={s.stateRow}>
              <Text accessibilityLabel={rupees(eligiblePaise)} style={s.stateAmount}>
                {rupees(eligiblePaise)}
              </Text>
              <View style={s.pillGreen}>
                <Text style={s.pillGreenText}>{`${eligible.length} earnings`}</Text>
              </View>
            </View>
            <Text style={s.stateNote}>
              {`${en.payments.minutes}: ${eligible.reduce((a, r) => a + r.attendanceMinutes, 0)}`}
            </Text>
          </LinearGradient>
          <Button label={en.payments.approveEarnings} variant="primary" onPress={approveAll} />
        </>
      ) : null}

      {/* state B — payment to record (external, V1 record-only) */}
      {approved.length > 0 ? (
        <>
          <LinearGradient
            colors={[...Gradients.deep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.stateRecord}
          >
            <Text style={s.stateKickerDark}>PAYMENT TO RECORD</Text>
            <View style={s.stateRow}>
              <Text accessibilityLabel={rupees(totalPaise)} style={s.stateAmountDark}>
                {rupees(totalPaise)}
              </Text>
              <View style={s.pillUrgent}>
                <Text style={s.pillUrgentText}>{`${approved.length} earnings`}</Text>
              </View>
            </View>
            <Text style={s.stateNoteDark}>
              Approved · paid outside SWON — record the reference so the worker sees Paid
            </Text>
          </LinearGradient>

          {/* external payment recording form (V1 — record only, no gateway) */}
          <TextField
            label={en.payments.reference}
            value={reference}
            onChangeText={setReference}
            placeholder="UPI ref / cheque no. / note"
            autoCapitalize="characters"
          />
          <Button label={en.payments.markPaid} variant="money" onPress={payNow} />
          <Text style={s.stateFoot}>
            Recording updates TrustScore &amp; earnings history for the worker.
          </Text>
        </>
      ) : null}

      {/* hold state */}
      {held.length > 0 ? (
        <View style={s.holdNote}>
          <Text style={s.holdText}>
            {`${held.length} earning(s) on hold — an admin review is blocking the record step.`}
          </Text>
        </View>
      ) : null}

      {/* state C — all settled */}
      {settled ? (
        <View style={s.stateBox}>
          <View style={s.stateArt}>
            <Text style={s.stateArtText}>✓</Text>
          </View>
          <Text style={s.stateTitle}>All settled ✓</Text>
          <Text style={s.stateDesc}>{`${paid.length} recorded · nothing waiting.`}</Text>
        </View>
      ) : null}

      {rows.length === 0 && !list.isLoading ? <Text style={s.lede}>{en.payments.empty}</Text> : null}

      <View style={s.list}>
        {rows.map((e) => (
          <EarningLine key={e.publicId} row={e} />
        ))}
      </View>

      <View style={s.btnRow}>
        <View style={s.grow}>
          <Button label={en.common.retry} variant="secondary" onPress={() => void list.refetch()} />
        </View>
        <View style={s.grow}>
          <Button label={en.common.back} variant="ghost" onPress={() => router.back()} />
        </View>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  lede: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  error: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  btnRow: {
    flexDirection: 'row',
    gap: Spacing.mid,
  },
  grow: {
    flex: 1,
  },

  // --- money hero + `.delta` pills ---
  hero: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  heroKicker: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.light.textMuted,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  deltaRow: {
    flexDirection: 'row',
    gap: Spacing.half,
    flexWrap: 'wrap',
  },
  delta: {
    borderWidth: 1,
    borderColor: `${Colors.light.success}66`,
    backgroundColor: statusColors('PAID').bg,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: Spacing.two,
  },
  deltaText: {
    ...TypeScale.caption,
    fontSize: 11.5,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.success,
  },
  deltaSoft: {
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    backgroundColor: Colors.light.tint,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: Spacing.two,
  },
  deltaSoftText: {
    ...TypeScale.caption,
    fontSize: 11.5,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primaryDeep,
  },
  heroNote: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },

  // --- state A ---
  stateReady: {
    gap: Spacing.two,
    borderWidth: 1,
    borderColor: `${Colors.light.green}66`,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  stateKicker: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1.2,
    color: Colors.light.success,
  },
  stateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  stateAmount: {
    ...TypeScale.heroAmount,
    fontFamily: Fonts.display,
    color: Colors.light.success,
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
  stateNote: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },

  // --- state B ---
  stateRecord: {
    gap: Spacing.mid,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.lift,
  },
  stateKickerDark: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1.2,
    color: Colors.light.onPrimarySoft,
  },
  stateAmountDark: {
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
  stateNoteDark: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimarySoft,
  },
  stateFoot: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },

  // --- hold ---
  holdNote: {
    backgroundColor: statusColors('ON_HOLD').bg,
    borderWidth: 1,
    borderColor: `${statusColors('ON_HOLD').fg}66`,
    borderRadius: Radius.md,
    padding: Spacing.mid,
  },
  holdText: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: statusColors('ON_HOLD').fg,
  },

  // --- state C ---
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
  stateArtText: {
    fontSize: 40,
    lineHeight: 46,
    fontFamily: Fonts.display,
    color: Colors.light.success,
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
  },

  // --- rows ---
  list: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  rowMain: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  rowName: {
    ...TypeScale.body,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  rowMeta: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },
  paidOn: {
    ...TypeScale.caption,
    color: Colors.light.success,
    fontFamily: Fonts.bodyBold,
  },
  rowRight: {
    alignItems: 'flex-end',
    gap: Spacing.half,
  },
});

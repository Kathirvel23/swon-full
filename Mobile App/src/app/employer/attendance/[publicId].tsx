import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { attendanceApi, type RosterRow } from '@/api/attendance';
import { AttendanceQR } from '@/components/QR';
import { CountdownRing, Sheet } from '@/components/feedback';
import { Button, Screen } from '@/components/screen';
import { Avatar, Chip } from '@/components/ui';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale, statusColors } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/**
 * V3 host attendance (prototype #e-attendance): date chip row → TODAY
 * presence card with the REAL token TTL countdown ring → the white QR card
 * (real scannable QR from the signed payload, rotating-code fallback) →
 * `.w-card` roster rows with status tags and the untouched manual marks /
 * approve / complete flows, closing on the prototype's bottom footer bar.
 */

const PRESENT_STATUSES = new Set(['CHECKED_IN', 'CHECKED_OUT', 'APPROVED']);
/** how many days the prototype-style date chip row offers (today backwards) */
const DAY_CHIPS = 7;

const isoOf = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const dayLabel = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

/** Prototype `.status` pill: 11.5/800, .05em tracking, pastel of the tone. */
function ToneTag({ status, label }: { status: string; label: string }) {
  const tone = statusColors(status);
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Status ${label}`}
      style={[s.tag, { backgroundColor: tone.bg, borderColor: `${tone.fg}66` }]}
    >
      <Text style={[s.tagText, { color: tone.fg }]}>{label}</Text>
    </View>
  );
}

const clock = (total: number): string =>
  `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;

/** One `.w-card` roster row: avatar + name + state chip + manual actions. */
function RosterCard({
  row,
  onMarkIn,
  onMarkOut,
  onNoShow,
}: {
  row: RosterRow;
  onMarkIn: () => void;
  onMarkOut: () => void;
  onNoShow: () => void;
}) {
  const a = row.attendance;
  const status = a?.status ?? 'NONE';
  const needsMark = !a || status === 'NOT_STARTED';
  const waiting = needsMark && Boolean(a);

  const meta: string[] = [];
  if (a?.checkInAt) {
    meta.push(
      `${en.attendance.youAreIn}: ${new Date(a.checkInAt).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
    );
  }
  if (typeof a?.durationMinutes === 'number') {
    meta.push(`${en.attendance.duration}: ${a.durationMinutes}`);
  }
  if (meta.length === 0) {
    meta.push(needsMark ? 'Not checked in · QR sent' : '—');
  }

  const actions: ReactNode[] = [];
  if (needsMark) {
    actions.push(
      <View key="in" style={s.grow}>
        <Button label={en.attendance.manualIn} variant="primary" size="md" onPress={onMarkIn} />
      </View>,
    );
  }
  if (status === 'CHECKED_IN') {
    actions.push(
      <View key="out" style={s.grow}>
        <Button label={en.attendance.manualOut} variant="secondary" size="md" onPress={onMarkOut} />
      </View>,
    );
  }
  if (waiting) {
    actions.push(
      <View key="ns" style={s.grow}>
        <Button label={en.attendance.markNoShow} variant="danger" size="md" onPress={onNoShow} />
      </View>,
    );
  }

  return (
    <View style={[s.wcard, needsMark ? s.wcardAttention : null]}>
      <View style={s.wcTop}>
        <Avatar name={row.worker.fullName} size={48} />
        <View style={s.wcMain}>
          <Text numberOfLines={1} style={s.wcName}>
            {row.worker.fullName}
          </Text>
          <Text numberOfLines={1} style={s.wcSub}>
            {meta.join(' · ')}
          </Text>
        </View>
        <ToneTag status={status} label={en.attendance.status[status] ?? status} />
      </View>

      <View style={s.wcStat}>
        <Text style={s.wcStatText}>{en.payments.status[row.earningStatus] ?? row.earningStatus}</Text>
      </View>

      {actions.length > 0 ? <View style={s.wcActions}>{actions}</View> : null}
    </View>
  );
}

export default function EmployerAttendanceScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();

  /** date chip row — index 0 keeps today's request byte-identical to before */
  const dates = useMemo(
    () =>
      Array.from({ length: DAY_CHIPS }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return isoOf(d);
      }),
    [],
  );
  const [dayIndex, setDayIndex] = useState(0);
  const activeDate = dates[dayIndex] ?? dates[0];

  const roster = useQuery({
    /** today keeps the original ['roster', id] key so the host home cache is shared */
    queryKey: dayIndex === 0 ? ['roster', publicId] : ['roster', publicId, activeDate],
    queryFn: () => attendanceApi.roster(publicId, dayIndex === 0 ? undefined : activeDate),
    retry: 1,
  });
  const date = roster.data?.date;
  const token = useQuery({
    queryKey: ['attendance-token', publicId, date],
    queryFn: () => attendanceApi.issueToken(publicId, date),
    enabled: Boolean(date),
    retry: 1,
  });

  /** seconds left on the current rotating code — recomputed each tick,
   *  keyed by payload so a fresh code starts from its full TTL again. */
  const [countdown, setCountdown] = useState<{ key: string; value: number } | null>(null);
  const issuedAt = useRef<{ key: string; at: number } | null>(null);
  useEffect(() => {
    const data = token.data;
    if (!data) return undefined;
    const id = setInterval(() => {
      const now = Date.now();
      if (issuedAt.current?.key !== data.payload) {
        issuedAt.current = { key: data.payload, at: now };
        setCountdown({ key: data.payload, value: data.expiresSec });
        return;
      }
      const left = data.expiresSec - Math.floor((now - issuedAt.current.at) / 1000);
      setCountdown({ key: data.payload, value: Math.max(0, left) });
    }, 1000);
    return () => clearInterval(id);
  }, [token.data]);

  const [qrOpen, setQrOpen] = useState(false);

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['roster', publicId] });
    await queryClient.invalidateQueries({ queryKey: ['attendance-token', publicId] });
    await queryClient.invalidateQueries({ queryKey: ['job-earnings', publicId] });
  };

  const act = (fn: () => Promise<unknown>) => {
    void fn().then(refresh).catch((e: unknown) => showAlert(en.attendance.roster, errorMessage(e)));
  };

  const mark = (row: RosterRow, action: 'IN' | 'OUT') => {
    const payload = token.data?.payload;
    if (!payload) {
      showAlert(en.attendance.roster, en.attendance.tokenNote);
      return;
    }
    act(() =>
      attendanceApi.check({
        payload,
        action,
        workerPublicId: row.worker.publicId,
        workDate: date,
      }),
    );
  };

  const approveDay = () => {
    const ids = (roster.data?.rows ?? [])
      .map((r) => r.attendance)
      .filter((a): a is NonNullable<typeof a> => Boolean(a && a.status === 'CHECKED_OUT'))
      .map((a) => a.publicId);
    if (ids.length === 0) {
      showAlert(en.attendance.approveDay, en.attendance.approveAll);
      return;
    }
    act(async () => {
      const res = await attendanceApi.approve(ids);
      showAlert(en.attendance.approveDay, en.attendance.approved(res.approved));
    });
  };

  const complete = () => {
    showAlert(
      en.attendance.completeJob,
      `${en.attendance.completeJob}?`,
      [
        { text: en.common.cancel, style: 'cancel' },
        {
          text: en.attendance.completeJob,
          onPress: () => {
            void attendanceApi
              .completeJob(publicId)
              .then((res) => {
                showAlert(en.attendance.completeJob, en.attendance.completeDone(res.earnings.eligible, res.earnings.cancelled));
                return refresh();
              })
              .catch((e: unknown) => showAlert(en.attendance.completeJob, errorMessage(e)));
          },
        },
      ],
    );
  };

  const rows = roster.data?.rows ?? [];
  const present = rows.filter((r) => PRESENT_STATUSES.has(r.attendance?.status ?? '')).length;
  const secsLeft = token.data
    ? countdown && countdown.key === token.data.payload
      ? countdown.value
      : token.data.expiresSec
    : 0;
  const percent =
    token.data && token.data.expiresSec > 0
      ? Math.max(0, Math.min(100, (secsLeft / token.data.expiresSec) * 100))
      : 0;

  return (
    <Screen
      title={en.attendance.roster}
      /* keeps the title flush left while the LIVE pill sits right (.row-between) */
      headerLeft={<View />}
      headerRight={
        <View style={s.livePill}>
          <View style={s.liveDot} />
          <Text style={s.liveText}>LIVE</Text>
        </View>
      }
    >
      {roster.isError ? <Text style={s.error}>{errorMessage(roster.error)}</Text> : null}

      {/* date selector — prototype's day switch, driving the real roster query */}
      <View accessibilityRole="tablist" style={s.dateRow}>
        {dates.map((d, i) => (
          <Chip
            key={d}
            label={i === 0 ? 'Today' : dayLabel(d)}
            size="sm"
            selected={i === dayIndex}
            onPress={() => setDayIndex(i)}
          />
        ))}
      </View>

      {/* TODAY presence card + real token countdown */}
      <View style={s.feature}>
        <View style={s.featureRow}>
          <View style={s.featureMain}>
            <Text style={s.kicker}>{dayIndex === 0 ? 'TODAY' : dayLabel(activeDate).toUpperCase()}</Text>
            <Text accessibilityLabel={`${present} of ${rows.length} present`} style={s.count}>
              {present}
              <Text style={s.countSub}>{` / ${rows.length} present`}</Text>
            </Text>
            <Text style={s.featureDate}>{`${en.attendance.shiftAt}: ${roster.data?.date ?? activeDate}`}</Text>
          </View>
          {token.data ? (
            <CountdownRing remaining={clock(secsLeft)} percent={percent} label="Refreshes in" size={78} />
          ) : null}
        </View>
        <View style={s.btnRow}>
          {token.data ? (
            <View style={s.grow}>
              <Button label="SHOW QR" variant="primary" size="md" onPress={() => setQrOpen(true)} />
            </View>
          ) : null}
          <View style={s.grow}>
            <Button label="Refresh" variant="secondary" size="md" onPress={() => void refresh()} />
          </View>
        </View>
      </View>

      {/* QR area — white card, radius 18, real scannable QR centered */}
      {token.data ? (
        <View style={s.qrCard}>
          <AttendanceQR value={token.data.payload} size={184} caption="Workers scan this to check in" />
          <Text style={s.qrRefresh}>{`QR refreshes every ${token.data.rotateEverySec}s`}</Text>
          <Text style={s.qrNote}>{en.attendance.tokenNote}</Text>
        </View>
      ) : null}

      <Text accessibilityRole="header" style={s.sectionTitle}>
        Formation roster
      </Text>
      {rows.length === 0 && !roster.isLoading ? <Text style={s.lede}>{en.attendance.rosterEmpty}</Text> : null}

      {rows.map((row) => (
        <RosterCard
          key={row.worker.publicId}
          row={row}
          onMarkIn={() => mark(row, 'IN')}
          onMarkOut={() => mark(row, 'OUT')}
          onNoShow={() => {
            const a = row.attendance;
            if (!a) return;
            act(() =>
              attendanceApi.correct(a.publicId, {
                status: 'NO_SHOW',
                reason: en.attendance.noShowReason,
              }),
            );
          }}
        />
      ))}

      <Text style={s.footNote}>
        QR + location verify presence; manual marks leave an audit trail.
      </Text>

      <View style={s.btnRow}>
        <View style={s.grow}>
          <Button label={en.common.retry} variant="secondary" onPress={() => void roster.refetch()} />
        </View>
        <View style={s.grow}>
          <Button label={en.common.back} variant="ghost" onPress={() => router.back()} />
        </View>
      </View>

      {/* prototype .sticky-cta — approve-day footer bar */}
      <View style={s.footer}>
        <View style={s.btnRow}>
          <View style={s.growWide}>
            <Button label={en.attendance.approveDay} variant="primary" onPress={approveDay} />
          </View>
          <View style={s.grow}>
            <Button label={en.attendance.completeJob} variant="money" onPress={complete} />
          </View>
        </View>
      </View>

      {/* prototype sheet-qr — big QR + session code */}
      <Sheet visible={qrOpen} onClose={() => setQrOpen(false)} title="Scan to check in">
        {token.data ? (
          <>
            <AttendanceQR
              value={token.data.payload}
              size={170}
              caption={`Refreshes in ${clock(secsLeft)} · presence is verified with location`}
            />
            <View style={s.codeCard}>
              <Text style={s.codeLabel}>SESSION CODE</Text>
              <Text numberOfLines={2} style={s.codeValue}>
                {token.data.payload}
              </Text>
            </View>
            <Button label={en.common.cancel} variant="secondary" onPress={() => setQrOpen(false)} />
          </>
        ) : (
          <Text style={s.lede}>{en.common.loading}</Text>
        )}
      </Sheet>
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

  // --- header LIVE pill (prototype .status.st-live) ---
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    borderWidth: 1,
    borderColor: `${Colors.light.success}66`,
    backgroundColor: Colors.light.onBrandSurface,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.light.yellow,
  },
  liveText: {
    ...TypeScale.caption,
    fontSize: 11.5,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.6,
    color: Colors.light.onPrimary,
  },

  // --- date chip row ---
  dateRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },

  // --- feature card (.card.feature) ---
  feature: {
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
    ...Elevation.lift,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.mid,
  },
  featureMain: {
    flex: 1,
    gap: Spacing.half,
    minWidth: 0,
  },
  kicker: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1.2,
    color: Colors.light.textMuted,
  },
  count: {
    ...TypeScale.heroAmount,
    fontFamily: Fonts.display,
    color: Colors.light.primaryDark,
  },
  countSub: {
    fontFamily: Fonts.displaySemi,
    fontSize: 17,
    lineHeight: 24,
    color: Colors.light.textMuted,
  },
  featureDate: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },
  btnRow: {
    flexDirection: 'row',
    gap: Spacing.mid,
  },
  grow: {
    flex: 1,
  },
  growWide: {
    flex: 1.4,
  },

  // --- QR area (white card, radius 18) ---
  qrCard: {
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  qrRefresh: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.primaryDark,
  },
  qrNote: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },

  sectionTitle: {
    ...TypeScale.titleSm,
    fontSize: 17,
    lineHeight: 22,
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },
  footNote: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },

  // --- roster (.w-card) ---
  wcard: {
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: 14, // prototype .w-card padding
    ...Elevation.card,
  },
  wcardAttention: {
    backgroundColor: statusColors('NOT_STARTED').bg,
    borderColor: `${statusColors('NOT_STARTED').fg}66`,
  },
  wcTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
  },
  wcMain: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  wcName: {
    fontFamily: Fonts.display,
    fontSize: 16.5,
    lineHeight: 21,
    color: Colors.light.text,
  },
  wcSub: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.textMuted,
    fontFamily: Fonts.bodySemi,
  },
  wcStat: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.one + 2,
    paddingHorizontal: Spacing.two + 2,
  },
  wcStatText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
  },
  wcActions: {
    flexDirection: 'row',
    gap: 9,
  },

  tag: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 4, // prototype .status padding 4px 10px
    paddingHorizontal: 10,
  },
  tagText: {
    ...TypeScale.caption,
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.5,
  },

  // --- bottom footer bar (.sticky-cta) ---
  footer: {
    marginHorizontal: -Spacing.three,
    backgroundColor: Colors.light.barSurface,
    borderTopWidth: 1,
    borderTopColor: Colors.light.line,
    paddingHorizontal: Spacing.three,
    paddingTop: 13,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
    ...Elevation.barTop,
  },

  // --- sheet (prototype .sheet-qr) ---
  codeCard: {
    alignItems: 'center',
    gap: Spacing.half,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    padding: Spacing.mid,
  },
  codeLabel: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1,
    color: Colors.light.textMuted,
  },
  codeValue: {
    fontFamily: Fonts.display,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 1.2,
    color: Colors.light.text,
    textAlign: 'center',
  },
});

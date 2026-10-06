import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppError, errorMessage } from '@/api/client';
import { staffApi, type EventAttendanceRow, type UiStatus, type WritableStatus } from '@/api/staff';
import { Button, Screen } from '@/components/screen';
import { Avatar, Chip } from '@/components/ui';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale, statusColors } from '@/constants/theme';
import { showAlert } from '@/lib/alert';

/**
 * Event Attendance Manager (owner brief 2026-10-05, §16/§18/§21).
 *
 * Shown ONLY to a worker the host designated as attendance manager for THIS
 * event. The capability is event-scoped and re-checked server-side on every
 * call, so opening another event's id fails with 403 — the screen says so
 * plainly instead of showing an empty roster.
 *
 * The four statuses are the manager's vocabulary over the unchanged stored
 * state machine: LATE is DERIVED from the real check-in time (never set by
 * hand), and an APPROVED day is frozen — the host corrects those.
 *
 * The incentive is read-only here: it is computed on the server and the
 * manager can never set it (§24/§26).
 */

/** Manager vocabulary → the shared status palette (presentation only). */
const TONE: Record<UiStatus, string> = {
  PRESENT: 'CHECKED_IN',
  LATE: 'DRAFT',
  ABSENT: 'NO_SHOW',
  NOT_MARKED: 'NONE',
};

const LABEL: Record<UiStatus, string> = {
  PRESENT: 'Present',
  LATE: 'Late',
  ABSENT: 'Absent',
  NOT_MARKED: 'Not marked',
};

const DAY_CHIPS = 7;

const isoOf = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const dayLabel = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

const rupees = (paise: number): string => `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;

const clock = (iso: string | null): string =>
  iso === null ? '—' : new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

function WorkerRow({
  row,
  busy,
  onMark,
}: {
  row: EventAttendanceRow;
  busy: boolean;
  onMark: (status: WritableStatus) => void;
}) {
  const tone = statusColors(TONE[row.status]);
  return (
    <View style={[s.card, row.status === 'NOT_MARKED' && !row.approved ? s.cardAttention : null]}>
      <View style={s.top}>
        <Avatar name={row.worker.fullName} size={46} />
        <View style={s.main}>
          <Text numberOfLines={1} style={s.name}>
            {row.worker.fullName}
          </Text>
          <Text numberOfLines={1} style={s.sub}>
            {row.status === 'NOT_MARKED'
              ? 'Not marked yet'
              : `${row.status === 'ABSENT' ? 'Marked absent' : `In ${clock(row.checkInAt)}`}${row.checkOutAt ? ` · out ${clock(row.checkOutAt)}` : ''}`}
          </Text>
        </View>
        <View style={[s.tag, { backgroundColor: tone.bg, borderColor: `${tone.fg}66` }]}>
          <Text style={[s.tagText, { color: tone.fg }]}>{LABEL[row.status]}</Text>
        </View>
      </View>

      {row.approved ? (
        <Text style={s.locked}>Approved by the host — locked. Ask the host to correct it.</Text>
      ) : (
        <View style={s.actions}>
          <View style={s.grow}>
            <Button
              label="Present"
              variant={row.status === 'PRESENT' || row.status === 'LATE' ? 'secondary' : 'primary'}
              size="md"
              disabled={busy}
              onPress={() => onMark('PRESENT')}
            />
          </View>
          <View style={s.grow}>
            <Button
              label="Absent"
              variant="danger"
              size="md"
              disabled={busy}
              onPress={() => onMark('ABSENT')}
            />
          </View>
          {row.status !== 'NOT_MARKED' ? (
            <View style={s.grow}>
              <Button
                label="Clear"
                variant="ghost"
                size="md"
                disabled={busy}
                onPress={() => onMark('NOT_MARKED')}
              />
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}

export default function EventAttendanceScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();

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
  const [busyWorker, setBusyWorker] = useState<string | null>(null);

  const roster = useQuery({
    queryKey: ['event-attendance', publicId, activeDate],
    queryFn: () => staffApi.eventAttendance(publicId, activeDate),
    retry: 1,
  });
  const incentiveQ = useQuery({
    queryKey: ['event-incentive', publicId],
    queryFn: () => staffApi.incentive(publicId),
    retry: 1,
  });

  const forbidden = roster.error instanceof AppError && roster.error.kind === 'permission';
  const data = roster.data;
  const summary = data?.summary;

  const mark = (row: EventAttendanceRow, status: WritableStatus) => {
    setBusyWorker(row.worker.publicId);
    void staffApi
      .mark(publicId, { workerPublicId: row.worker.publicId, status, date: activeDate })
      .then(() => queryClient.invalidateQueries({ queryKey: ['event-attendance', publicId] }))
      .catch((e: unknown) => showAlert('Attendance', errorMessage(e)))
      .finally(() => setBusyWorker(null));
  };

  return (
    <Screen title="Event attendance" headerLeft={<View />}>
      {forbidden ? (
        <View style={s.card}>
          <Text style={s.name}>Not your event</Text>
          <Text style={s.sub}>
            You are not the attendance manager for this event. Only the host can assign you.
          </Text>
        </View>
      ) : null}

      {roster.isError && !forbidden ? <Text style={s.error}>{errorMessage(roster.error)}</Text> : null}

      {data ? (
        <>
          <View style={s.card}>
            <Text style={s.kicker}>{data.job.title.toUpperCase()}</Text>
            <Text style={s.place}>{`${data.job.areaName ? `${data.job.areaName}, ` : ''}${data.job.city}`}</Text>
          </View>

          {/* date switch — drives the real roster query */}
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

          {/* server-computed summary */}
          <View style={s.feature}>
            <Text style={s.kicker}>PRESENT</Text>
            <Text accessibilityLabel={`${summary?.present ?? 0} of ${summary?.total ?? 0} present`} style={s.count}>
              {summary?.present ?? 0}
              <Text style={s.countSub}>{` / ${summary?.total ?? 0}`}</Text>
            </Text>
            <View style={s.statRow}>
              <Text style={s.statLabel}>Late</Text>
              <Text style={s.statValue}>{summary?.late ?? 0}</Text>
            </View>
            <View style={s.statRow}>
              <Text style={s.statLabel}>Absent</Text>
              <Text style={s.statValue}>{summary?.absent ?? 0}</Text>
            </View>
            <View style={s.statRow}>
              <Text style={s.statLabel}>Not marked</Text>
              <Text style={s.statValue}>{summary?.notMarked ?? 0}</Text>
            </View>
          </View>

          {!data.hasWorkDay ? (
            <Text style={s.lede}>
              No work day is scheduled for {activeDate}. Marks can only be recorded on a work day.
            </Text>
          ) : null}

          <Text accessibilityRole="header" style={s.sectionTitle}>
            Crew
          </Text>
          {data.workers.length === 0 ? <Text style={s.lede}>No crew on this event yet.</Text> : null}

          {data.workers.map((row) => (
            <WorkerRow
              key={row.worker.publicId}
              row={row}
              busy={busyWorker === row.worker.publicId}
              onMark={(status) => mark(row, status)}
            />
          ))}

          <Text style={s.footNote}>
            {'Present marks check-in; the code and location checks still apply to the worker’s own check-in.'}
          </Text>
        </>
      ) : null}

      {/* read-only incentive — server-computed, never editable here */}
      {incentiveQ.data ? (
        <View style={s.card}>
          <Text style={s.kicker}>YOUR MANAGER INCENTIVE</Text>
          <Text style={s.amount}>{rupees(incentiveQ.data.incentivePaise)}</Text>
          <Text style={s.sub}>
            {`${incentiveQ.data.pct}% of ${rupees(incentiveQ.data.basePaise)} event pay · total ${rupees(incentiveQ.data.totalPaise)}`}
          </Text>
          <Text style={s.note}>
            {incentiveQ.data.appliedPaise > 0
              ? 'Added to your earnings for this event by the host.'
              : 'The host applies this to your earnings — you cannot change it.'}
          </Text>
        </View>
      ) : null}

      <View style={s.btnRow}>
        <View style={s.grow}>
          <Button label="Refresh" variant="secondary" onPress={() => void roster.refetch()} />
        </View>
        <View style={s.grow}>
          <Button label="Back" variant="ghost" onPress={() => router.back()} />
        </View>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  grow: { flex: 1 },
  btnRow: { flexDirection: 'row', gap: Spacing.mid },
  lede: { ...TypeScale.bodySm, color: Colors.light.textMuted },
  error: { ...TypeScale.bodySm, color: Colors.light.danger },
  dateRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },

  card: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: 14,
    ...Elevation.card,
  },
  cardAttention: {
    backgroundColor: statusColors('NOT_STARTED').bg,
    borderColor: `${statusColors('NOT_STARTED').fg}66`,
  },
  feature: {
    gap: Spacing.half,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
    ...Elevation.lift,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: Spacing.mid },
  main: { flex: 1, minWidth: 0, gap: 2 },
  name: { fontFamily: Fonts.display, fontSize: 16.5, lineHeight: 21, color: Colors.light.text },
  sub: { fontSize: 12, lineHeight: 16, color: Colors.light.textMuted, fontFamily: Fonts.bodySemi },
  note: { ...TypeScale.caption, color: Colors.light.textMuted },
  locked: { ...TypeScale.caption, fontFamily: Fonts.bodySemi, color: Colors.light.textMuted },
  kicker: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1.2,
    color: Colors.light.textMuted,
  },
  place: { ...TypeScale.bodySm, fontWeight: '700', color: Colors.light.text },
  count: { ...TypeScale.heroAmount, fontFamily: Fonts.display, color: Colors.light.primaryDark },
  countSub: {
    fontFamily: Fonts.displaySemi,
    fontSize: 17,
    lineHeight: 24,
    color: Colors.light.textMuted,
  },
  amount: { fontFamily: Fonts.display, fontSize: 30, lineHeight: 36, color: Colors.light.primaryDark },
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
  statRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 5 },
  statLabel: { ...TypeScale.bodySm, color: Colors.light.textMuted },
  statValue: { ...TypeScale.bodySm, fontFamily: Fonts.bodyBold, color: Colors.light.text },
  actions: { flexDirection: 'row', gap: 9 },
  tag: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  tagText: { ...TypeScale.caption, fontSize: 11.5, lineHeight: 15, fontFamily: Fonts.bodyExtra, letterSpacing: 0.5 },
});

import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { errorMessage } from '@/api/client';
import { attendanceApi } from '@/api/attendance';
import { staffApi } from '@/api/staff';
import { jobsApi } from '@/api/jobs';
import { AttendanceQR } from '@/components/QR';
import { CountdownRing } from '@/components/feedback';
import { useReducedMotion } from '@/components/motion';
import { Button, Screen } from '@/components/screen';
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
import { showAlert } from '@/lib/alert';

/**
 * W5 (H8 worker side) — V3 "My Work": when a shift exists today the top block
 * runs in the prototype's live-work language (deep gradient hero, blinking
 * live tag, mega elapsed timer, 150px shift-progress ring, white-glass info
 * rows), with the rotating check-in code (QR + countdown ring) and the status
 * record below on canvas. With no shift it falls back to the standard
 * canvas card/chip state. The server mints the signed rotating token (§19) —
 * the tap never forges anything; windows, replay and freshness guards all run
 * server-side. The ring only ever shows the token's real `expiresSec` window
 * from GET /attendance/today, and shift progress only appears when the
 * opportunity's real day window can be derived — never a fabricated timer.
 */

/** Attendance status → the shared status colour map (presentation only). */
const STATUS_TONE: Record<string, string> = {
  NOT_STARTED: 'DRAFT',
  CHECKED_IN: 'ACTIVE',
  CHECKED_OUT: 'COMPLETED',
  APPROVED: 'ELIGIBLE',
  NO_SHOW: 'NO_SHOW',
};

/** V3 copy for the rotating check-in code and hero rows (no i18n keys yet). */
const CODE_LABEL = 'Check-in code refreshes in';
const SITE_LABEL = 'Site';
const DATE_LABEL = 'Date';
const HOST_LABEL = 'Host';
const CHECKED_IN_LABEL = 'Checked in';
const TODAY_WORK_CAP = "TODAY'S WORK";
const ELAPSED_LABEL = 'ELAPSED';
const SHIFT_PROGRESS_CAP = 'SHIFT PROGRESS';
const SITE_NOTE = 'Check in from the site — location is verified at check-in.';
const APPROVAL_NOTE = 'Host approves the day → payment moves to “Ready to approve”.';

function formatClock(time: string): string {
  const [hRaw, mRaw] = time.split(':');
  const h = Number(hRaw);
  if (!Number.isFinite(h)) return time;
  const m = (mRaw ?? '00').slice(0, 2);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${suffix}`;
}

function mmss(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** 04:28:16 — the prototype work-timer reading. */
function hhmmss(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

/** "2026-09-30" + "09:00[:00]" → a real Date in the device timezone. */
function atDate(date: string, time: string): Date {
  return new Date(`${date}T${time.slice(0, 5)}:00`);
}

/** Prototype .work-ring — 150px conic shift progress on the dark hero. */
function ShiftRing({ percent, center }: { percent: number; center: ReactNode }) {
  const size = 150;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference * (1 - clamped / 100);
  return (
    <View style={styles.shiftRing} accessibilityLabel={`${Math.round(clamped)} percent of shift elapsed`}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={Colors.light.green}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.shiftRingCenter} pointerEvents="none">
        {center}
      </View>
    </View>
  );
}

/** Dark info card — prototype .work-info (white-glass rows). */
function InfoRow({ label, value, tone }: { label: string; value: string; tone?: 'yellow' | 'green' }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text
        style={[
          styles.infoValue,
          tone === 'yellow' ? { color: Colors.light.yellow } : null,
          tone === 'green' ? { color: Colors.dark.success } : null,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

export default function TodayScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const reduced = useReducedMotion();

  const today = useQuery({ queryKey: ['attendance-today'], queryFn: () => attendanceApi.today(), retry: 1 });

  // live clock for the code ring + elapsed timer — ticks from an effect
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // prototype .live-dot blink (parked under reduced motion)
  const blink = useSharedValue(1);
  useEffect(() => {
    if (reduced) {
      blink.value = 1;
      return undefined;
    }
    blink.value = withRepeat(withTiming(0.35, { duration: 700 }), -1, true);
    return undefined;
  }, [blink, reduced]);
  const blinkStyle = useAnimatedStyle(() => ({ opacity: blink.value }));

  const state = today.data;
  const jobPublicId = state?.job?.publicId ?? null;
  const shift = useQuery({
    queryKey: ['job-detail', jobPublicId],
    queryFn: () => jobsApi.detail(jobPublicId!),
    enabled: jobPublicId != null,
    retry: 1,
  });

  /** Event Attendance Manager (owner brief 2026-10-05 §16): the host can make
   *  THIS worker the attendance manager for one event. The entry card only
   *  appears when such an event-scoped assignment exists — a normal worker
   *  never sees it. */
  const managerQ = useQuery({
    queryKey: ['my-event-staff'],
    queryFn: () => staffApi.myEvents(),
    retry: 1,
  });
  const managerEvents = managerQ.data?.events ?? [];

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['attendance-today'] });
    await queryClient.invalidateQueries({ queryKey: ['my-apps'] });
  };

  const mark = (action: 'IN' | 'OUT') => {
    const s = today.data;
    if (!s?.token || !s.job) return;
    void attendanceApi
      .check({ payload: s.token.payload, action })
      .then(refresh)
      .catch((e: unknown) =>
        showAlert(action === 'IN' ? en.attendance.checkIn : en.attendance.checkOut, errorMessage(e)),
      );
  };

  const status = state?.record?.status;
  const detail = shift.data ?? null;
  const workDay = detail?.workDays.find((d) => d.date === state?.workDate);
  const windowLabel = workDay
    ? `${formatClock(workDay.startTime)} – ${formatClock(workDay.endTime)}`
    : detail
      ? `${formatClock(detail.dayStartTime)} – ${formatClock(detail.dayEndTime)}`
      : null;
  const windowValue = windowLabel ?? (shift.isLoading ? en.common.loading : '—');

  const token = state?.token ?? null;
  const remainingSec = token
    ? Math.max(
        0,
        Math.round((today.dataUpdatedAt + token.expiresSec * 1000 - (now ?? today.dataUpdatedAt)) / 1000),
      )
    : 0;
  const ringPercent = token && token.expiresSec > 0 ? Math.min(100, (remainingSec / token.expiresSec) * 100) : 0;

  const tone = statusColors(status ? (STATUS_TONE[status] ?? status) : 'DRAFT');
  const statusLabel = status ? (en.attendance.status[status] ?? status) : en.attendance.notStarted;
  const isLive = status === 'CHECKED_IN';

  const nowMs = now;
  const checkedInAt = state?.record?.checkInAt ? Date.parse(state.record.checkInAt) : NaN;
  const elapsedSec =
    nowMs == null || Number.isNaN(checkedInAt) ? 0 : Math.max(0, (nowMs - checkedInAt) / 1000);

  // real shift window → progress; null when it can't be derived (no ring then)
  const shiftStart =
    state && (workDay || detail)
      ? atDate(state.workDate, workDay ? workDay.startTime : detail!.dayStartTime)
      : null;
  const shiftEnd =
    state && (workDay || detail)
      ? atDate(state.workDate, workDay ? workDay.endTime : detail!.dayEndTime)
      : null;
  const shiftSpanMs =
    shiftStart && shiftEnd && !Number.isNaN(shiftStart.getTime()) && !Number.isNaN(shiftEnd.getTime())
      ? shiftEnd.getTime() - shiftStart.getTime()
      : 0;
  const shiftPercent =
    nowMs != null && shiftSpanMs > 0 && shiftStart && !Number.isNaN(checkedInAt)
      ? Math.max(0, Math.min(100, ((nowMs - Math.max(checkedInAt, shiftStart.getTime())) / shiftSpanMs) * 100))
      : null;

  const liveTagDot = isLive ? Colors.dark.success : Colors.light.amber;
  const hostName = detail?.employer.orgName ?? null;
  const payLabel = detail
    ? `₹${Math.round(detail.payAmountPaise / 100).toLocaleString('en-IN')} ${detail.payType === 'HOUR' ? '/ hour' : detail.payType === 'DAY' ? '/ day' : 'total'}`
    : null;

  return (
    <Screen title={en.nav.worker.work} tab="work">
      {today.isError ? <Text style={styles.error}>{errorMessage(today.error)}</Text> : null}

      {!state?.job ? (
        <View style={styles.stateBox}>
          <View style={styles.stateArt}>
            <Ionicons name="calendar-outline" size={38} color={Colors.light.primary} />
          </View>
          <Text style={styles.stateTitle}>{en.nav.worker.work}</Text>
          <Text style={styles.stateText}>
            {today.isLoading ? en.common.loading : en.attendance.notOnShift}
          </Text>
        </View>
      ) : (
        <>
          {/* ---- live-work hero (prototype w-work dark mode) ---- */}
          <LinearGradient
            colors={[...Gradients.deep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.liveTag}>
              <Animated.View style={[styles.liveDot, { backgroundColor: liveTagDot }, blinkStyle]} />
              <Text style={styles.liveTagText}>{statusLabel}</Text>
            </View>

            {isLive ? (
              <>
                <View style={styles.timerBlock}>
                  <Text style={styles.timer}>{hhmmss(elapsedSec)}</Text>
                  <Text style={styles.timerLabel}>{ELAPSED_LABEL}</Text>
                </View>

                {shiftPercent != null ? (
                  <>
                    <View style={styles.ringWrap}>
                      <ShiftRing
                        percent={shiftPercent}
                        center={
                          <>
                            <Text style={styles.ringValue}>{`${Math.round(shiftPercent)}%`}</Text>
                            <Text style={styles.ringLabel}>{ELAPSED_LABEL}</Text>
                          </>
                        }
                      />
                    </View>
                    <Text style={styles.ringCap}>{`${SHIFT_PROGRESS_CAP} · ${windowValue}`}</Text>
                  </>
                ) : null}

                <View style={styles.info}>
                  <InfoRow label="Job" value={state.job.title} />
                  {hostName ? <InfoRow label={HOST_LABEL} value={hostName} /> : null}
                  <InfoRow label={SITE_LABEL} value={`${state.job.areaName}, ${state.job.city}`} />
                  <InfoRow
                    label={CHECKED_IN_LABEL}
                    value={
                      state.record?.checkInAt
                        ? new Date(state.record.checkInAt).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '—'
                    }
                  />
                  {payLabel ? <InfoRow label="Today's pay" value={payLabel} tone="green" /> : null}
                </View>

                <View style={styles.heroBtn}>
                  <Button label={en.attendance.checkOut} variant="warm" size="lg" onPress={() => mark('OUT')} />
                </View>
                <Text style={styles.heroNote}>{APPROVAL_NOTE}</Text>
              </>
            ) : (
              <>
                <Text style={styles.heroCap}>{TODAY_WORK_CAP}</Text>
                <Text style={styles.heroTitle}>{state.job.title}</Text>
                <Text style={styles.heroSub}>
                  {hostName
                    ? `${hostName} · ${detail ? `${detail.headcountRequired} ${en.jobs.slots}` : state.job.areaName}`
                    : `${state.job.areaName}, ${state.job.city}`}
                </Text>

                <View style={styles.info}>
                  <InfoRow label={en.attendance.shiftAt} value={windowValue} />
                  <InfoRow label={SITE_LABEL} value={`${state.job.areaName}, ${state.job.city}`} />
                  <InfoRow
                    label="Exact address"
                    value={detail && detail.addressLine !== '' ? detail.addressLine : 'After check-in'}
                    tone="yellow"
                  />
                  <InfoRow label={DATE_LABEL} value={state.workDate} />
                  {payLabel ? <InfoRow label="Today's pay" value={payLabel} tone="green" /> : null}
                </View>

                <View style={styles.alertBox}>
                  <Ionicons name="alert-circle" size={18} color={Colors.light.yellow} />
                  <Text style={styles.alertText}>{SITE_NOTE}</Text>
                </View>

                <View style={styles.heroBtn}>
                  <Button label={en.attendance.checkIn} variant="money" size="lg" onPress={() => mark('IN')} />
                </View>
              </>
            )}
          </LinearGradient>

          {/* ---- rotating check-in code (QR + countdown) on canvas ---- */}
          {token ? (
            <View style={styles.codeCard}>
              <AttendanceQR value={token.payload} />
              <CountdownRing
                remaining={mmss(remainingSec)}
                percent={ringPercent}
                label={CODE_LABEL}
                size={80}
              />
            </View>
          ) : null}

          {/* ---- status record ---- */}
          <View style={styles.card}>
            <View style={styles.cardHead}>
              <View
                accessibilityRole="text"
                accessibilityLabel={`Status ${statusLabel}`}
                style={[styles.pill, { backgroundColor: tone.bg, borderColor: tone.fg }]}
              >
                <View style={[styles.pillDot, { backgroundColor: tone.fg }]} />
                <Text style={[styles.pillText, { color: tone.fg }]}>{statusLabel}</Text>
              </View>
            </View>

            <View style={styles.statRow}>
              <Text style={styles.statLabel}>{en.attendance.youAreIn}</Text>
              <Text style={styles.statValue}>
                {state.record?.checkInAt
                  ? new Date(state.record.checkInAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '—'}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>{en.attendance.duration}</Text>
              <Text style={styles.statValue}>
                {typeof state.record?.durationMinutes === 'number' ? state.record.durationMinutes : '—'}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>{DATE_LABEL}</Text>
              <Text style={styles.statValue}>{state.workDate}</Text>
            </View>
          </View>

          {status === 'CHECKED_OUT' || status === 'APPROVED' ? (
            <View style={styles.doneNote}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.light.success} />
              <Text style={styles.doneText}>{en.attendance.youAreOut}</Text>
            </View>
          ) : null}
        </>
      )}

      {/* ---- event attendance manager (only when designated for an event) ---- */}
      {managerEvents.length > 0 ? (
        <View style={styles.card}>
          <Text style={styles.statLabel}>Attendance manager</Text>
          <Text style={styles.statValue}>
            The host asked you to mark attendance for these events
          </Text>
          {managerEvents.map((e) => (
            <Button
              key={e.job.publicId}
              label={`Mark attendance · ${e.job.title}`}
              variant="primary"
              onPress={() =>
                router.push({
                  pathname: '/event-attendance/[publicId]',
                  params: { publicId: e.job.publicId },
                })
              }
            />
          ))}
        </View>
      ) : null}

      <Button label={en.common.retry} variant="secondary" onPress={() => void today.refetch()} />
      <Button label={en.common.back} variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: { ...TypeScale.body, color: Colors.light.danger },

  /* ---- empty / no-shift (prototype state-box on canvas) ---- */
  stateBox: {
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
    ...Elevation.card,
  },
  stateArt: {
    width: 92,
    height: 92,
    borderRadius: 30,
    backgroundColor: Colors.light.tint,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.light.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  stateTitle: {
    ...TypeScale.titleSm,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.text,
  },
  stateText: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 21,
  },

  /* ---- dark live-work hero (full-bleed under the header) ---- */
  hero: {
    marginHorizontal: -Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    gap: Spacing.two,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    overflow: 'hidden',
    ...Elevation.lift,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    alignSelf: 'flex-start',
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  liveTagText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: Colors.dark.success,
  },
  heroCap: {
    ...TypeScale.caption,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: Spacing.mid,
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 34,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.onPrimary,
    marginTop: Spacing.half,
  },
  heroSub: {
    ...TypeScale.bodySm,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  timerBlock: {
    alignItems: 'center',
    marginTop: Spacing.two,
    gap: 2,
  },
  timer: {
    fontSize: 44,
    lineHeight: 48,
    fontFamily: Fonts.display,
    fontWeight: '800',
    letterSpacing: 0.9,
    color: Colors.light.onPrimary,
    fontVariant: ['tabular-nums'],
  },
  timerLabel: {
    ...TypeScale.caption,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  ringWrap: {
    alignItems: 'center',
    marginTop: Spacing.mid,
  },
  shiftRing: {
    width: 150,
    height: 150,
  },
  shiftRingCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  ringValue: {
    fontSize: 30,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.onPrimary,
    fontVariant: ['tabular-nums'],
  },
  ringLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  ringCap: {
    ...TypeScale.caption,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },

  /* ---- white-glass info rows ---- */
  info: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.mid,
    marginTop: Spacing.mid,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingVertical: 7,
  },
  infoLabel: {
    ...TypeScale.bodySm,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  infoValue: {
    ...TypeScale.bodySm,
    fontWeight: '800',
    color: Colors.light.onPrimary,
    textAlign: 'right',
    flexShrink: 1,
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: Radius.md,
    padding: Spacing.mid,
    marginTop: Spacing.mid,
  },
  alertText: {
    ...TypeScale.bodySm,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
    flex: 1,
  },
  heroBtn: {
    marginTop: Spacing.mid,
  },
  heroNote: {
    ...TypeScale.caption,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.55)',
    textAlign: 'center',
    marginTop: Spacing.one,
  },

  /* ---- rotating code block ---- */
  codeCard: {
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },

  /* ---- status record card ---- */
  card: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingVertical: Spacing.half,
  },
  statLabel: { ...TypeScale.bodySm, color: Colors.light.textMuted },
  statValue: { ...TypeScale.bodySm, fontFamily: Fonts.bodyBold, color: Colors.light.text },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  pillDot: { width: 8, height: 8, borderRadius: 4 },
  pillText: { ...TypeScale.caption, fontFamily: Fonts.bodyBold, letterSpacing: 0.4 },

  doneNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.light.tint,
    borderRadius: Radius.md,
    paddingVertical: Spacing.mid,
  },
  doneText: { ...TypeScale.body, fontFamily: Fonts.bodySemi, color: Colors.light.success },
});

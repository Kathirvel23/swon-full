import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { AppError, errorMessage } from '@/api/client';
import { matchingApi, type QuickMatchOffer } from '@/api/matching';
import { useKycGate } from '@/components/kycGate';
import { Button } from '@/components/screen';
import { Colors, Fonts, Gradients, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/** V3 FlashMatch copy without i18n keys yet. */
const HELD_LABEL = 'Held for you — expires in';
const SUB_LINE_2 = 'near you right now';
const CONTEXT_NOTE =
  'FlashMatch is contextual — it appears on Home when work is urgent near you.';

/** Reason code → chip label. Shared vocabulary with the matching domain
 *  reasonCodes() — unknown codes fall back to the candidates-screen reading. */
function reasonLabel(code: string): string {
  return en.quickmatch.reasons[code] ?? code.replace(/_/g, ' ').toLowerCase();
}

function mmss(totalMs: number): string {
  const s = Math.max(0, Math.floor(totalMs / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Prototype .count-ring — 92px conic countdown (orange arc, faint track). */
function FlashRing({ percent, time }: { percent: number; time: string }) {
  const size = 92;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference * (1 - clamped / 100);
  return (
    <View style={styles.ringWrap} accessibilityLabel={`${time} left to respond`}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255, 255, 255, 0.14)"
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={Colors.light.orange}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.ringCenter} pointerEvents="none">
        <Text style={styles.ringTime}>{time}</Text>
      </View>
    </View>
  );
}

/** 64px thumb tile — the offer payload carries no photo, so the category
 *  glyph on the deep teal gradient stands in (never a wrong-industry photo). */
function thumbIcon(title: string): keyof typeof Ionicons.glyphMap {
  const n = title.toLowerCase();
  if (n.includes('deliver') || n.includes('rid')) return 'bicycle';
  if (n.includes('construct') || n.includes('site')) return 'construct';
  if (n.includes('ware') || n.includes('load') || n.includes('pack')) return 'cube';
  if (n.includes('clean')) return 'brush';
  if (n.includes('event') || n.includes('cater')) return 'sparkles';
  if (n.includes('kitchen') || n.includes('cook') || n.includes('food')) return 'restaurant';
  return 'briefcase';
}

/**
 * Worker Quick Match offers — V3 full-screen FlashMatch: deep gradient stage,
 * a countdown ring driven only by the offer's own `respondBy`/`windowStart`
 * timestamps, then big accept/decline actions. Accept = application created
 * instantly (source=QUICK_MATCH); the offer window is enforced server-side
 * (QUICKMATCH_EXPIRED). All of the original offer logic is untouched.
 */
export default function OffersScreen() {
  const router = useRouter();
  const qc = useQueryClient();
  /** KYC gate (M5): ACCEPT routes through apply, so it carries KYC_REQUIRED. */
  const { gate, gateSheet } = useKycGate();

  const offers = useQuery({ queryKey: ['my-offers'], queryFn: () => matchingApi.myOffers(), retry: 1 });

  // live clock for the FlashMatch ring — ticks from an effect, never during render
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const respond = useMutation({
    mutationFn: (v: { id: string; response: 'ACCEPT' | 'DECLINE'; fromGate?: boolean }) =>
      matchingApi.respond(v.id, v.response),
    onSuccess: (_data, v) => {
      showAlert(
        en.quickmatch.title,
        v.response === 'ACCEPT' ? en.quickmatch.accepted : en.quickmatch.declined,
      );
      void qc.invalidateQueries({ queryKey: ['my-offers'] });
      void qc.invalidateQueries({ queryKey: ['my-applications'] });
    },
    onError: (e, v) => {
      if (e instanceof AppError && e.code === 'KYC_REQUIRED' && v.response === 'ACCEPT') {
        if (v.fromGate) {
          // The gate-driven replay already ran — surface it, never loop on it.
          showAlert(en.quickmatch.title, errorMessage(e));
          return;
        }
        // gate() re-runs ACCEPT for this same offer once KYC reads VERIFIED;
        // until then it only opens the sheet (DECLINE keeps its old path).
        void gate(() => retryAccept(v.id, true));
        return;
      }
      showAlert(en.quickmatch.title, errorMessage(e));
    },
  });

  /** ACCEPT replayed after the gate — same offer id, one replay per tap. */
  const retryAccept = (id: string, fromGate: boolean) =>
    respond.mutate({ id, response: 'ACCEPT', fromGate });

  const rows = offers.data ?? [];
  const pendingRows = rows.filter((o: QuickMatchOffer) => o.status === 'PENDING');
  const doneRows = rows.filter((o: QuickMatchOffer) => o.status !== 'PENDING');
  const nowMs = now ?? offers.dataUpdatedAt;

  const minutesLeft = (o: QuickMatchOffer): number =>
    Math.max(0, Math.round((new Date(o.respondBy).getTime() - nowMs) / 60_000));

  const statusLine = (o: QuickMatchOffer): string => {
    if (o.status === 'PENDING') {
      return o.expiringSoon
        ? `${en.quickmatch.expiring} · ${en.quickmatch.expiresIn(minutesLeft(o))}`
        : en.quickmatch.statusPending;
    }
    if (o.status === 'ACCEPTED') return en.quickmatch.statusAccepted;
    if (o.status === 'DECLINED') return en.quickmatch.statusDeclined;
    if (o.status === 'EXPIRED') return en.quickmatch.statusExpired;
    return o.status;
  };

  // soonest pending offer drives the ring — respondBy/windowStart are real
  const soonest = pendingRows.reduce<QuickMatchOffer | null>((acc, o) => {
    const t = new Date(o.respondBy).getTime();
    if (Number.isNaN(t)) return acc;
    if (!acc) return o;
    return t < new Date(acc.respondBy).getTime() ? o : acc;
  }, null);
  const respondAt = soonest ? new Date(soonest.respondBy).getTime() : 0;
  const windowMs = soonest ? respondAt - new Date(soonest.windowStart).getTime() : 0;
  const remainingMs = Math.max(0, respondAt - nowMs);
  const ringPercent =
    windowMs > 0 ? Math.min(100, Math.max(0, (remainingMs / windowMs) * 100)) : remainingMs > 0 ? 100 : 0;

  const showRing = Boolean(soonest) && remainingMs > 0;
  const pendingCount = pendingRows.length;
  const subLine1 =
    pendingCount === 1 ? '1 urgent opportunity' : `${pendingCount} urgent opportunities`;

  const card = (o: QuickMatchOffer) => {
    const pending = o.status === 'PENDING';
    const urgent = pending && o.expiringSoon;
    const pay = Math.round(o.job.payAmountPaise / 100);
    return (
      <View key={o.publicId} style={styles.flashCard}>
        <View style={styles.fcTop}>
          <LinearGradient
            colors={[...Gradients.teal]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fcThumb}
          >
            <Ionicons name={thumbIcon(o.job.title)} size={28} color={Colors.light.yellow} />
          </LinearGradient>
          <View style={styles.fcText}>
            <Text style={styles.fcTitle}>{o.job.title}</Text>
            <Text style={styles.fcMeta}>
              {`${o.job.areaName ? `${o.job.areaName} · ` : ''}${o.job.city} · ${o.distanceBand}`}
            </Text>
            <Text style={styles.fcMeta}>{o.requirementSnapshot}</Text>
          </View>
        </View>

        <View style={styles.fcPay}>
          <Text accessibilityLabel={`₹${pay}`} style={styles.pay}>
            {`₹${pay.toLocaleString('en-IN')}`}
            <Text style={styles.payUnit}>{` / ${o.job.payType.toLowerCase()}`}</Text>
          </Text>
          <View style={[styles.statusPill, !urgent && styles.statusPillMuted]}>
            <Text style={[styles.statusPillText, urgent ? styles.statusPillTextOn : styles.statusPillTextMuted]}>
              {statusLine(o)}
            </Text>
          </View>
        </View>

        {/* why you matched — reason-code chips (absent payload ⇒ nothing) */}
        {o.reasonCodes && o.reasonCodes.length > 0 ? (
          <View style={styles.whyBox}>
            <Text style={styles.whyTitle}>{`${en.quickmatch.whyMatched}:`}</Text>
            <View style={styles.whyRow}>
              {o.reasonCodes.slice(0, 4).map((code) => (
                <View key={code} style={styles.whyChip}>
                  <Text style={styles.whyChipText}>{`✓ ${reasonLabel(code)}`}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {pending ? (
          <View style={styles.btnRow}>
            <View style={styles.btnGrow}>
              <Button
                label={en.quickmatch.accept}
                variant="warm"
                size="lg"
                onPress={() => respond.mutate({ id: o.publicId, response: 'ACCEPT' })}
                disabled={respond.isPending}
              />
            </View>
            <View style={styles.btnFixed}>
              <Button
                label="VIEW"
                variant="onDark"
                onPress={() =>
                  router.push({ pathname: '/job/[publicId]', params: { publicId: o.job.publicId } })
                }
              />
            </View>
          </View>
        ) : null}
        {pending ? (
          <Button
            label={en.quickmatch.decline}
            variant="onDark"
            onPress={() => respond.mutate({ id: o.publicId, response: 'DECLINE' })}
            disabled={respond.isPending}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[...Gradients.deep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.headRow}>
          <View style={styles.kicker}>
            <Ionicons name="flash" size={24} color={Colors.light.yellow} />
            <Text style={styles.kickerText}>{en.quickmatch.title}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={en.common.back}
            onPress={() => router.back()}
            style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
          >
            <Ionicons name="close" size={16} color={Colors.light.onPrimary} />
          </Pressable>
        </View>

        <ScrollView style={styles.scrollFlex} contentContainerStyle={styles.scroll}>
          <Text style={styles.sub}>
            {pendingCount > 0 ? (
              <>
                {subLine1}
                {'\n'}
                <Text style={styles.subEm}>{SUB_LINE_2}</Text>
              </>
            ) : (
              en.quickmatch.offersTitle
            )}
          </Text>

          {offers.isError ? <Text style={styles.error}>{errorMessage(offers.error)}</Text> : null}

          {showRing ? (
            <View style={styles.ringBlock}>
              <Text style={styles.ringCap}>{HELD_LABEL}</Text>
              <FlashRing percent={ringPercent} time={mmss(remainingMs)} />
              <Text style={styles.ringSub}>
                {en.quickmatch.expiresIn(minutesLeft(soonest as QuickMatchOffer))}
              </Text>
            </View>
          ) : null}

          {rows.length === 0 && !offers.isLoading ? (
            <View style={styles.empty}>
              <View style={styles.emptyArt}>
                <Ionicons name="flash" size={40} color={Colors.light.yellow} />
              </View>
              <Text style={styles.emptyTitle}>{en.quickmatch.offersTitle}</Text>
              <Text style={styles.emptyText}>{en.quickmatch.offersEmpty}</Text>
              <View style={styles.emptyBtn}>
                <Button label={en.common.back} variant="onDark" onPress={() => router.back()} />
              </View>
            </View>
          ) : null}

          {pendingRows.map((o: QuickMatchOffer) => card(o))}
          {doneRows.map((o: QuickMatchOffer) => card(o))}

          <View style={styles.actions}>
            <Button label={en.common.retry} variant="onDark" onPress={() => void offers.refetch()} />
            <Button label={en.common.back} variant="onDark" onPress={() => router.back()} />
          </View>

          <Text style={styles.contextNote}>{CONTEXT_NOTE}</Text>
        </ScrollView>
      </SafeAreaView>

      {/* KYC gate sheet — the parked ACCEPT only re-fires after the flow */}
      {gateSheet}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.primaryDeep,
  },
  safe: {
    flex: 1,
  },
  pressed: {
    opacity: 0.85,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
  },
  kicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  kickerText: {
    fontSize: 20,
    fontFamily: Fonts.display,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: Colors.light.yellow,
    textShadowColor: 'rgba(249, 115, 22, 0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.btn,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  scrollFlex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.two,
  },
  sub: {
    fontSize: 26,
    lineHeight: 30,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.onPrimary,
  },
  subEm: {
    color: Colors.light.orange,
  },
  error: {
    ...TypeScale.body,
    color: Colors.light.yellow,
    marginTop: Spacing.two,
  },

  ringBlock: {
    alignItems: 'center',
    gap: Spacing.half,
    marginTop: Spacing.mid,
  },
  ringCap: {
    ...TypeScale.caption,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  ringWrap: {
    width: 92,
    height: 92,
    marginTop: Spacing.one,
  },
  ringCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringTime: {
    fontSize: 25,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.onPrimary,
    fontVariant: ['tabular-nums'],
  },
  ringSub: {
    ...TypeScale.caption,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },

  /* ---- flash card (prototype .flash-card) ---- */
  flashCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: Radius.lg,
    padding: 14,
    marginTop: Spacing.mid,
    gap: Spacing.two,
  },
  fcTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
  },
  fcThumb: {
    width: 64,
    height: 64,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fcText: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  fcTitle: {
    fontSize: 17,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.onPrimary,
  },
  fcMeta: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  fcPay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginTop: Spacing.one,
    flexWrap: 'wrap',
  },
  pay: {
    fontSize: 24,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.yellow,
    fontVariant: ['tabular-nums'],
  },
  payUnit: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statusPill: {
    backgroundColor: Colors.light.orange,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: Spacing.two,
  },
  statusPillMuted: {
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  statusPillText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    textAlign: 'center',
  },
  statusPillTextOn: {
    color: Colors.light.onPrimary,
  },
  statusPillTextMuted: {
    color: 'rgba(255, 255, 255, 0.8)',
  },

  /* ---- why you matched (compact reason-code chips, max 4) ---- */
  whyBox: {
    gap: Spacing.one,
    marginTop: Spacing.one,
  },
  whyTitle: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  whyRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  whyChip: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: Radius.pill,
    paddingVertical: 2,
    paddingHorizontal: Spacing.two,
  },
  whyChipText: {
    ...TypeScale.caption,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.85)',
  },

  btnRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  btnGrow: {
    flex: 1,
  },
  btnFixed: {
    width: 96,
  },
  actions: {
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  contextNote: {
    ...TypeScale.caption,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: Spacing.mid,
  },

  /* ---- empty (prototype #flashEmpty state-box, on dark) ---- */
  empty: {
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
  emptyArt: {
    width: 92,
    height: 92,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.one,
  },
  emptyTitle: {
    ...TypeScale.titleSm,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.onPrimary,
    textAlign: 'center',
  },
  emptyText: {
    ...TypeScale.bodySm,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 21,
  },
  emptyBtn: {
    alignSelf: 'center',
    marginTop: Spacing.two,
    minWidth: 180,
  },
});

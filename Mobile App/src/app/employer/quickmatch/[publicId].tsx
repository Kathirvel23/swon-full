import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api, errorMessage } from '@/api/client';
import { matchingApi, type LaunchWave } from '@/api/matching';
import { ProgressRing } from '@/components/marketplace';
import { Button } from '@/components/screen';
import { Colors, Fonts, Gradients, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

type JobLite = {
  publicId: string;
  title: string;
  startsOn: string;
  endsOn: string;
  headcountRequired: number;
  hiredCount: number;
  status: string;
};

/** Owner-only availability payload (Backend matching.service.availability). */
type Availability = {
  jobPublicId: string;
  radiusKm: number;
  availableNearby: number;
  matchingSkills: number;
  currentlyWorking: number;
  potentialMatches: number;
  bands: { band: string; count: number }[];
};

/** Distance-band labels, verbatim from matching.domain distanceBand(). */
const BAND_ORDER = ['<2km', '<5km', '<10km', '<25km', '25km+', 'same-city', 'unknown'];
const bandRank = (band: string): number => {
  const i = BAND_ORDER.indexOf(band);
  return i < 0 ? BAND_ORDER.length : i;
};

/** Prototype FlashMatch copy (no i18n key yet — same rule as offers.tsx). */
const RING_CAPTION = 'Held for them — expires in';
const FOOTER_NOTE =
  'FlashMatch is contextual — nearby workers see this wave the moment it opens.';
/** Quick Hire §13/§16 copy — literal English (i18n parity owned elsewhere). */
const AVAIL_TITLE = 'Nearby Availability';
const LIVE_COUNTS = 'Live counts';
const AVAIL_EMPTY = 'Availability will appear when opportunities are open';
const AVAIL_LOADING = 'Checking nearby availability…';
const NO_WORKERS_TITLE = 'No workers available in this radius';
const NO_WORKERS_HINT = 'Raise the distance (up to 25 km) and start the wave again.';

function mmss(totalMs: number): string {
  const s = Math.max(0, Math.floor(totalMs / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Dark-stage field — white box (prototype input) + on-brand label. */
function Field({
  label,
  value,
  onChangeText,
  placeholder,
  testID,
  maxLength,
  keyboardType,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  testID?: string;
  maxLength?: number;
  keyboardType?: 'numeric';
  multiline?: boolean;
}) {
  return (
    <View style={s.field}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        testID={testID}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textMuted}
        maxLength={maxLength}
        keyboardType={keyboardType}
        multiline={multiline}
        autoCapitalize={multiline ? 'sentences' : 'none'}
        style={[s.fieldBox, multiline && s.fieldBoxMultiline]}
      />
    </View>
  );
}

/** One LIVE aggregate from the availability endpoint — label : value row. */
function CountRow({ label, value }: { label: string; value: number }) {
  return (
    <View style={s.availRow}>
      <Text style={s.availLabel}>{label}</Text>
      <Text accessibilityLabel={`${label}: ${value}`} style={s.availValue}>
        {value}
      </Text>
    </View>
  );
}

/**
 * Employer FlashMatch stage (prototype #w-offer, host side): the deep
 * g-deep gradient, yellow FLASHMATCH kicker, seats figure, countdown ring on
 * the wave's real `respondBy`, then the launch form.
 * Offer logic is untouched — same job query, same seat default, same
 * `POST /quick-match` mutation with its Idempotency-Key (§8), the same
 * launch/launchNone/error alerts, and the same back navigation. The server
 * still owns the offer window (QUICKMATCH_EXPIRED); accept/decline lives on
 * the worker side (GET /quick-match + /respond) and is not exposed here.
 */
export default function QuickMatchLaunchScreen() {
  const router = useRouter();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();

  const job = useQuery({
    queryKey: ['job', publicId],
    queryFn: () => api.get<JobLite>(`/jobs/${publicId}`),
    retry: 1,
  });

  const seats = Math.max(1, (job.data?.headcountRequired ?? 1) - (job.data?.hiredCount ?? 0));
  const [headcount, setHeadcount] = useState('');
  const [radius, setRadius] = useState('5');
  const [snapshot, setSnapshot] = useState('');
  const [wave, setWave] = useState<LaunchWave | null>(null);
  const [launchedAt, setLaunchedAt] = useState(0);

  // pre-launch availability preview — SAME owner-only endpoint + query key as
  // the Quick Hire hub; the form's radius drives it (server clamps identically)
  const radiusNum = Math.min(25, Math.max(1, Math.floor(Number(radius) || 5)));
  const avail = useQuery({
    queryKey: ['quick-hire-availability', publicId, radiusNum],
    queryFn: () =>
      api.get<Availability>(
        `/quick-match/availability?jobPublicId=${publicId}&radiusKm=${radiusNum}`,
      ),
    enabled: Boolean(publicId),
    retry: 1,
  });
  const bands = avail.data
    ? [...avail.data.bands].sort((a, b) => bandRank(a.band) - bandRank(b.band))
    : [];

  // live clock for the wave ring — ticks from an effect, never during render
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const launch = useMutation({
    mutationFn: () =>
      matchingApi.launch({
        jobPublicId: publicId!,
        headcount: Number(headcount || seats) || seats,
        windowStart: new Date(job.data!.startsOn).toISOString(),
        windowEnd: new Date(job.data!.endsOn).toISOString(),
        requirementSnapshot: snapshot.trim() || job.data!.title,
        radiusKm: Number(radius) || 5,
        waveSize: 10,
      }),
    onSuccess: (d) => {
      setWave(d);
      setLaunchedAt(Date.now());
      showAlert(en.quickmatch.title, en.quickmatch.launchDone(d.created, d.waveNo));
      if (d.created === 0) showAlert(en.quickmatch.title, en.quickmatch.launchNone);
    },
    onError: (e) => showAlert(en.quickmatch.title, errorMessage(e)),
  });

  const respondAt = wave && !Number.isNaN(new Date(wave.respondBy).getTime())
    ? new Date(wave.respondBy).getTime()
    : 0;
  const remainingMs = respondAt > 0 ? Math.max(0, respondAt - now) : 0;
  const windowMs = respondAt > 0 ? Math.max(1, respondAt - launchedAt) : 1;
  const ringPercent = Math.min(100, Math.max(0, (remainingMs / windowMs) * 100));
  const minutesLeft = Math.ceil(remainingMs / 60_000);
  const filled = job.data?.hiredCount ?? 0;
  const required = job.data?.headcountRequired ?? seats;

  return (
    <View style={s.root}>
      <LinearGradient
        colors={[...Gradients.deep]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView edges={['top']} style={s.head}>
        <View style={s.headRow}>
          <View style={s.kicker}>
            <Ionicons name="flash" size={18} color={Colors.light.yellow} />
            <Text style={s.kickerText}>{en.quickmatch.title.toUpperCase()}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={en.common.back}
            onPress={() => router.back()}
            style={({ pressed }) => [s.closeBtn, pressed && s.closePressed]}
          >
            <Ionicons name="close" size={18} color={Colors.light.onPrimary} />
          </Pressable>
        </View>
        <Text numberOfLines={2} style={s.stageTitle}>
          {job.data?.title ?? en.quickmatch.title}
        </Text>
        <Text style={s.stageSub}>{en.quickmatch.launchForm}</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={s.scroll}>
        {job.isError ? <Text style={s.error}>{errorMessage(job.error)}</Text> : null}

        <View style={s.flashCard}>
          <View style={s.seatsRow}>
            <View>
              <Text accessibilityLabel={`${seats} seats open`} style={s.seatsValue}>
                {seats}
              </Text>
              <Text style={s.seatsUnit}>seats open</Text>
            </View>
            <View style={s.seatsMetaBlock}>
              <Text style={s.cardMeta}>{en.apps.seats(filled, required)}</Text>
              {job.data ? (
                <Text style={s.cardMeta}>{`${job.data.startsOn} → ${job.data.endsOn}`}</Text>
              ) : null}
            </View>
          </View>
        </View>

        {wave && respondAt > 0 ? (
          <View style={s.ringBlock}>
            <Text style={s.waveLine}>
              {`Wave ${wave.waveNo} open · ${wave.created} invited`}
            </Text>
            <Text style={s.ringCap}>{RING_CAPTION}</Text>
            <View style={s.ring}>
              <ProgressRing percent={ringPercent} size={92} stroke={7} color={Colors.light.orange}>
                <Text style={s.ringTime}>{mmss(remainingMs)}</Text>
              </ProgressRing>
            </View>
            <Text style={s.ringLabel}>
              {remainingMs > 0
                ? en.quickmatch.expiresIn(minutesLeft)
                : en.quickmatch.statusExpired}
            </Text>
          </View>
        ) : null}

        {/* §16/§17 zero-created state — persistent inline hint (the launch
            alerts stay untouched; this survives the alert dismissing) */}
        {wave && wave.created === 0 ? (
          <View style={s.noneBox}>
            <View style={s.noneHead}>
              <Ionicons name="alert-circle" size={18} color={Colors.light.warning} />
              <Text style={s.noneTitle}>{NO_WORKERS_TITLE}</Text>
            </View>
            <Text style={s.noneHint}>{NO_WORKERS_HINT}</Text>
          </View>
        ) : null}

        <Field
          label={en.quickmatch.headcount}
          testID="headcount"
          value={headcount || String(seats)}
          onChangeText={setHeadcount}
          keyboardType="numeric"
        />
        <Field
          label={en.quickmatch.radius}
          testID="radius"
          value={radius}
          onChangeText={setRadius}
          keyboardType="numeric"
        />
        <Field
          label={en.quickmatch.snapshot}
          testID="snapshot"
          value={snapshot}
          onChangeText={setSnapshot}
          placeholder={en.quickmatch.snapshotPlaceholder}
          maxLength={255}
          multiline
        />

        {/* PRE-launch availability preview — real aggregates only, re-queried
            whenever the radius field changes (§13/§17, owner-only endpoint) */}
        <View style={s.availCard}>
          <View style={s.availHead}>
            <Text style={s.availTitle}>{AVAIL_TITLE}</Text>
            <View style={s.livePill}>
              <Text style={s.livePillText}>{LIVE_COUNTS}</Text>
            </View>
          </View>
          <Text style={s.availRadius}>{`Within ${radiusNum} km of this opportunity`}</Text>
          {avail.isLoading ? (
            <Text style={s.availEmpty}>{AVAIL_LOADING}</Text>
          ) : avail.data ? (
            <>
              <CountRow label="Available nearby" value={avail.data.availableNearby} />
              <CountRow label="Matching skills" value={avail.data.matchingSkills} />
              <CountRow label="Currently working" value={avail.data.currentlyWorking} />
              <CountRow label="Potential matches" value={avail.data.potentialMatches} />
              {bands.length > 0 ? (
                <>
                  <Text style={s.availBandHead}>By distance</Text>
                  <View style={s.bandRow}>
                    {bands.map((b) => (
                      <View key={b.band} style={s.bandChip}>
                        <Text style={s.bandChipText}>{`${b.band} · ${b.count}`}</Text>
                      </View>
                    ))}
                  </View>
                </>
              ) : null}
            </>
          ) : (
            <Text style={s.availEmpty}>{AVAIL_EMPTY}</Text>
          )}
        </View>

        <Button
          label={en.quickmatch.launch}
          variant="warm"
          size="lg"
          onPress={() => launch.mutate()}
          disabled={launch.isPending || !job.data}
        />
        <Button label={en.common.back} variant="onDark" onPress={() => router.back()} />

        <Text style={s.footer}>{FOOTER_NOTE}</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.light.primaryDeep },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1,
    borderColor: Colors.light.onBrandBorder,
  },
  closePressed: { opacity: 0.8 },
  head: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.mid,
    gap: Spacing.one,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  kicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  kickerText: {
    fontFamily: Fonts.display,
    fontSize: 20,
    letterSpacing: 1.2,
    color: Colors.light.yellow,
  },
  stageTitle: {
    fontFamily: Fonts.display,
    fontSize: 26,
    lineHeight: 30,
    color: Colors.light.onPrimary,
  },
  stageSub: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.orange,
  },
  scroll: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.mid,
  },
  error: {
    ...TypeScale.bodySm,
    color: Colors.light.yellow,
  },
  flashCard: {
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1.5,
    borderColor: Colors.light.onBrandBorder,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  seatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  seatsValue: {
    fontFamily: Fonts.display,
    fontSize: 34,
    lineHeight: 38,
    color: Colors.light.yellow,
  },
  seatsUnit: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: Colors.light.onPrimarySoft,
  },
  seatsMetaBlock: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 2,
  },
  cardMeta: {
    ...TypeScale.caption,
    color: Colors.light.onPrimarySoft,
    textAlign: 'right',
  },
  // --- pre-launch availability preview (§13/§17) ---
  availCard: {
    gap: Spacing.two,
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1.5,
    borderColor: Colors.light.onBrandBorder,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  availHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  availTitle: {
    fontFamily: Fonts.display,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.onPrimary,
  },
  livePill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1,
    borderColor: Colors.light.onBrandBorder,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  livePillText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    color: Colors.light.yellow,
  },
  availRadius: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimarySoft,
  },
  availRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingVertical: 3,
  },
  availLabel: {
    ...TypeScale.bodySm,
    color: Colors.light.onPrimarySoft,
  },
  availValue: {
    fontFamily: Fonts.display,
    fontSize: 17,
    lineHeight: 20,
    color: Colors.light.yellow,
    fontVariant: ['tabular-nums'],
  },
  availBandHead: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: Colors.light.onPrimarySoft,
    marginTop: Spacing.half,
  },
  bandRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  bandChip: {
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1,
    borderColor: Colors.light.onBrandBorder,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  bandChipText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
  availEmpty: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimarySoft,
  },

  // --- post-launch zero-created state (§17) ---
  noneBox: {
    gap: Spacing.half,
    backgroundColor: Colors.light.warningSoft,
    borderWidth: 1,
    borderColor: Colors.light.amber,
    borderRadius: Radius.md,
    padding: Spacing.mid,
  },
  noneHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  noneTitle: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.warning,
  },
  noneHint: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },

  ringBlock: {
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.half,
  },
  ringCap: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    textAlign: 'center',
    color: Colors.light.onPrimarySoft,
  },
  waveLine: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    letterSpacing: 0.4,
    textAlign: 'center',
    color: Colors.light.yellow,
  },
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringTime: {
    fontFamily: Fonts.display,
    fontSize: 25,
    lineHeight: 28,
    color: Colors.light.onPrimary,
    fontVariant: ['tabular-nums'],
  },
  ringLabel: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.onPrimarySoft,
  },
  field: {
    gap: Spacing.half,
  },
  fieldLabel: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimary,
  },
  fieldBox: {
    ...TypeScale.body,
    color: Colors.light.text,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    minHeight: 48,
  },
  fieldBoxMultiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  footer: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    textAlign: 'center',
    color: Colors.light.onPrimarySoft,
    marginTop: Spacing.one,
  },
});

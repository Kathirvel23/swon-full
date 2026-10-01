import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { api, errorMessage } from '@/api/client';
import { jobsApi, type JobCard } from '@/api/jobs';
import { Button, Card, Screen } from '@/components/screen';
import { Chip, StatusChip } from '@/components/ui';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * Quick Hire hub (owner brief §13/§17) — a deliberately thin screen that
 * REUSES the existing endpoints, nothing new:
 *  - `GET /jobs/mine` (same query key as the home/jobs screens, so the list
 *    is already cached) filtered client-side to OPEN/HIRING opportunities;
 *  - `GET /quick-match/availability?jobPublicId&radiusKm` (owner-only) for
 *    the REAL aggregate counts + distance-band distribution.
 * Every number on screen comes from the server — no invented figures, no
 * premium pricing (none is configured), no map (architecture has none):
 * the counts + bands panel is the smallest viable §17 solution.
 */

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

/** FlashMatch (and this preview) needs an OPEN or HIRING opportunity. */
const OPEN_STATUSES = new Set(['OPEN', 'HIRING']);
const RADII = [5, 10, 25] as const;
/** Distance-band labels, verbatim from matching.domain distanceBand(). */
const BAND_ORDER = ['<2km', '<5km', '<10km', '<25km', '25km+', 'same-city', 'unknown'];

/** Literal §13 copy (i18n parity is owned by another agent). */
const INTRO = 'Find available workers nearby and fill your requirement faster.';
const AVAIL_EMPTY = 'Availability will appear when opportunities are open';
const NO_OPEN_JOBS = 'No open opportunity yet';

const bandRank = (band: string): number => {
  const i = BAND_ORDER.indexOf(band);
  return i < 0 ? BAND_ORDER.length : i;
};

/** Prototype `.money` — display face for the base payout label. */
function Pay({ label }: { label: string }) {
  const cut = label.indexOf('/');
  const amount = cut > 0 ? label.slice(0, cut).trim() : label;
  const unit = cut > 0 ? label.slice(cut) : null;
  return (
    <View style={s.pay}>
      <Text accessibilityLabel={label} style={s.payAmount}>
        {amount}
      </Text>
      {unit ? <Text style={s.payUnit}>{unit}</Text> : null}
    </View>
  );
}

/** One LIVE aggregate from the availability endpoint — label : value row. */
function CountRow({ label, value }: { label: string; value: number }) {
  return (
    <View style={s.countRow}>
      <Text style={s.countLabel}>{label}</Text>
      <Text accessibilityLabel={`${label}: ${value}`} style={s.countValue}>
        {value}
      </Text>
    </View>
  );
}

/** Compact `.opp`-style row for an OPEN/HIRING opportunity → FlashMatch. */
function JobRow({ job, onPress }: { job: JobCard; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${job.title}, ${job.hiredCount} of ${job.headcountRequired} filled`}
      onPress={onPress}
      style={({ pressed }) => [s.jobRow, pressed && s.pressed]}
    >
      <View style={s.jobTop}>
        <Text numberOfLines={2} style={s.jobTitle}>
          {job.title}
        </Text>
        <Ionicons name="chevron-forward" size={18} color={Colors.light.textMuted} />
      </View>
      <Text numberOfLines={1} style={s.jobMeta}>{`${job.startsOn} · ${job.dayStartTime}`}</Text>
      <View style={s.jobBottom}>
        <StatusChip status={job.status} size="sm" />
        <Text style={s.jobSeats}>{`${job.hiredCount} of ${job.headcountRequired} filled`}</Text>
        <View style={s.grow} />
        <Pay label={job.payLabel} />
      </View>
    </Pressable>
  );
}

export default function QuickHireScreen() {
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(5);

  // same endpoint + query key as the home / opportunities screens (shared cache)
  const mine = useQuery({ queryKey: ['jobs-mine'], queryFn: jobsApi.mine, retry: 1 });

  const openJobs = (mine.data ?? []).filter((j) => OPEN_STATUSES.has(j.status));
  const selected = openJobs.find((j) => j.publicId === picked) ?? openJobs[0] ?? null;
  const jobPublicId = selected?.publicId ?? '';

  const avail = useQuery({
    queryKey: ['quick-hire-availability', jobPublicId, radius],
    queryFn: () =>
      api.get<Availability>(
        `/quick-match/availability?jobPublicId=${jobPublicId}&radiusKm=${radius}`,
      ),
    enabled: jobPublicId !== '',
    retry: 1,
  });

  const data = avail.data;
  const bands = data
    ? [...data.bands].sort((a, b) => bandRank(a.band) - bandRank(b.band))
    : [];

  const availBody = mine.isLoading || avail.isLoading ? (
    <View style={s.loadingRow}>
      <ActivityIndicator size="small" color={Colors.light.primary} />
      <Text style={s.lede}>Checking nearby availability…</Text>
    </View>
  ) : data ? (
    <>
      <CountRow label="Available nearby" value={data.availableNearby} />
      <CountRow label="Matching skills" value={data.matchingSkills} />
      <CountRow label="Currently working" value={data.currentlyWorking} />
      <CountRow label="Potential matches" value={data.potentialMatches} />
      {bands.length > 0 ? (
        <>
          <Text style={s.bandHead}>By distance</Text>
          <View style={s.bandRow}>
            {bands.map((b) => (
              <Chip key={b.band} label={`${b.band} · ${b.count}`} size="sm" />
            ))}
          </View>
        </>
      ) : null}
    </>
  ) : (
    // error / no open job yet — friendly, never fabricated numbers
    <Text style={s.lede}>{AVAIL_EMPTY}</Text>
  );

  return (
    <Screen title="Quick Hire" tab="opportunities">
      <Text style={s.intro}>{INTRO}</Text>

      <Card title="Nearby Availability">
        {openJobs.length > 1 ? (
          <View style={s.pickBlock}>
            <Text style={s.pickLabel}>Opportunity</Text>
            <View style={s.pickRow}>
              {openJobs.map((j) => {
                const on = j.publicId === jobPublicId;
                return (
                  <Pressable
                    key={j.publicId}
                    accessibilityRole="button"
                    accessibilityLabel={`Show availability for ${j.title}`}
                    accessibilityState={{ selected: on }}
                    onPress={() => setPicked(j.publicId)}
                    style={({ pressed }) => [s.pick, on && s.pickOn, pressed && s.pressed]}
                  >
                    <Text numberOfLines={1} style={[s.pickText, on && s.pickTextOn]}>
                      {j.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : selected ? (
          <Text numberOfLines={2} style={s.selectedJob}>
            {selected.title}
          </Text>
        ) : null}

        <View style={s.metaRow}>
          <View style={s.livePill}>
            <Text style={s.livePillText}>Live counts</Text>
          </View>
          <View style={s.radiusGroup}>
            <Text style={s.pickLabel}>Radius</Text>
            {RADII.map((r) => (
              <Chip
                key={r}
                label={`${r} km`}
                size="sm"
                selected={radius === r}
                onPress={() => setRadius(r)}
              />
            ))}
          </View>
        </View>

        {availBody}
      </Card>

      <Card title="Open opportunities">
        {mine.isError ? <Text style={s.error}>{errorMessage(mine.error)}</Text> : null}
        {openJobs.length === 0 && !mine.isLoading ? (
          <Text style={s.lede}>{NO_OPEN_JOBS}</Text>
        ) : null}
        {openJobs.map((job) => (
          <JobRow
            key={job.publicId}
            job={job}
            onPress={() =>
              router.push({
                pathname: '/employer/quickmatch/[publicId]',
                params: { publicId: job.publicId },
              })
            }
          />
        ))}
      </Card>

      <Button
        label="Create opportunity"
        variant="secondary"
        onPress={() => router.push('/employer/post')}
      />
      <Button label={en.common.back} variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}

const s = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
  intro: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  lede: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  error: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },

  // --- job picker (availability scope) ---
  pickBlock: {
    gap: Spacing.one,
  },
  pickLabel: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: Colors.light.textMuted,
  },
  pickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  pick: {
    maxWidth: 220,
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pickOn: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.primary,
  },
  pickText: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  pickTextOn: {
    fontFamily: Fonts.bodyBold,
    color: Colors.light.primaryDark,
  },
  selectedJob: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },

  // --- live counts header ---
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  livePill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.warningSoft,
    borderWidth: 1,
    borderColor: Colors.light.amber,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  livePillText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    color: Colors.light.warning,
  },
  radiusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },

  // --- counts + distance bands ---
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingVertical: 3,
  },
  countLabel: {
    ...TypeScale.bodySm,
    color: Colors.light.text,
  },
  countValue: {
    fontFamily: Fonts.display,
    fontSize: 17,
    lineHeight: 20,
    color: Colors.light.primaryDark,
    fontVariant: ['tabular-nums'],
  },
  bandHead: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: Colors.light.textMuted,
    marginTop: Spacing.half,
  },
  bandRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },

  // --- opportunity rows ---
  jobRow: {
    gap: 4,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    paddingVertical: 11,
    paddingHorizontal: 12,
    ...Elevation.card,
  },
  jobTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  jobTitle: {
    flex: 1,
    fontFamily: Fonts.display,
    fontSize: 16,
    lineHeight: 19,
    color: Colors.light.text,
  },
  jobMeta: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },
  jobBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: 2,
  },
  jobSeats: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primaryDark,
  },
  grow: {
    flexGrow: 1,
    flexShrink: 1,
  },

  // --- money (prototype .money / .unit) ---
  pay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  payAmount: {
    fontFamily: Fonts.display,
    fontSize: 16,
    lineHeight: 19,
    color: Colors.light.text,
  },
  payUnit: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
});

import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppError, errorMessage } from '@/api/client';
import { jobsApi, type JobCard } from '@/api/jobs';
import { Button, Screen } from '@/components/screen';
import { Chip, StatusChip } from '@/components/ui';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { photoSourceForCategory } from '@/constants/jobPhotos';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/**
 * V3 "My Opportunities" (prototype #e-jobs): topbar title + count sub + warm
 * "New" action, filter chip row and `.opp` opportunity cards (media with
 * status/applications/date pills, title, seats, pay, CTA + action rows);
 * drafts render as the prototype's compact `.opp` (no media, host line,
 * pay, Delete / Publish btn-row). Every lifecycle action (publish / delete
 * draft / cancel / queue / roster / earnings) and its KYC + crew-handling
 * guards are unchanged — this is presentation only.
 */

type FilterKey = 'all' | 'active' | 'drafts' | 'completed' | 'cancelled';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'drafts', label: 'Drafts' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

const FILTER_STATUSES: Record<Exclude<FilterKey, 'all'>, string[]> = {
  active: ['OPEN', 'HIRING', 'FILLED', 'IN_PROGRESS'],
  drafts: ['DRAFT'],
  completed: ['COMPLETED', 'CLOSED'],
  cancelled: ['CANCELLED', 'EXPIRED'],
};

/** Prototype `.seats` — 9px ring dots + "n of m filled" count. */
function SeatRow({ taken, total }: { taken: number; total: number }) {
  const dots = [];
  for (let i = 0; i < total; i += 1) {
    dots.push(<View key={i} style={[s.seatDot, i < taken ? s.seatDotOn : null]} />);
  }
  return (
    <View style={s.seats} accessibilityLabel={`${taken} of ${total} seats filled`}>
      <View style={s.seatDots}>{dots}</View>
      <Text style={s.seatCount}>{`${taken} of ${total} filled`}</Text>
    </View>
  );
}

/** Prototype `.money` — display face, ink; the `/unit` runs muted. */
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

/** Prototype `.opp` media — photo (category) over the teal fallback gradient. */
function OppMedia({ job }: { job: JobCard }) {
  const photo = photoSourceForCategory(job.category.code ?? job.category.name);
  return (
    <View style={s.oppMedia}>
      {photo != null ? (
        <Image source={photo} style={s.oppMediaImg} resizeMode="cover" />
      ) : (
        <LinearGradient
          colors={[Colors.light.primaryDark, Colors.light.primaryDeep]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      )}
      <LinearGradient
        colors={[Colors.light.scrim, 'transparent']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={s.oppScrim}
        pointerEvents="none"
      />
      <View style={s.oppBadges}>
        <StatusChip status={job.status} />
        <View style={s.pillDark}>
          <Text style={s.pillDarkText}>
            {job.applicationCount} application{job.applicationCount === 1 ? '' : 's'}
          </Text>
        </View>
      </View>
      <View style={s.oppDist}>
        <Ionicons name="calendar-outline" size={14} color={Colors.light.onPrimary} />
        <Text style={s.pillDarkText}>{`${job.startsOn} → ${job.endsOn}`}</Text>
      </View>
    </View>
  );
}

export default function EmployerJobsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<FilterKey>('all');

  const mine = useQuery({ queryKey: ['jobs-mine'], queryFn: jobsApi.mine, retry: 1 });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['jobs-mine'] });
    await queryClient.invalidateQueries({ queryKey: ['jobs-feed'] });
  };

  const publish = async (publicId: string) => {
    try {
      await jobsApi.publish(publicId);
      await refresh();
    } catch (e) {
      if (e instanceof AppError && e.code === 'KYC_REQUIRED') {
        showAlert(en.jobs.publish, errorMessage(e), [
          { text: en.common.cancel, style: 'cancel' },
          { text: en.kyc.title, onPress: () => router.push('/verify') },
        ]);
        return;
      }
      showAlert(en.jobs.publish, errorMessage(e));
    }
  };

  const removeDraft = (publicId: string) => {
    showAlert(en.jobs.deleteDraft, en.jobs.cancelNote, [
      { text: en.common.cancel, style: 'cancel' },
      {
        text: en.jobs.deleteDraft,
        style: 'destructive',
        onPress: () => {
          void jobsApi
            .remove(publicId)
            .then(refresh)
            .catch((e: unknown) => showAlert(en.jobs.deleteDraft, errorMessage(e)));
        },
      },
    ]);
  };

  const cancelJob = (publicId: string) => {
    showAlert(en.jobs.cancelJob, en.jobs.cancelNote, [
      { text: en.common.cancel, style: 'cancel' },
      {
        text: en.jobs.cancelJob,
        style: 'destructive',
        onPress: () => {
          void jobsApi
            .cancel(publicId, 'Cancelled from the employer app')
            .then(refresh)
            .catch((e: unknown) => showAlert(en.jobs.cancelJob, errorMessage(e)));
        },
      },
    ]);
  };

  const all = mine.data ?? [];
  const items =
    filter === 'all' ? all : all.filter((j) => FILTER_STATUSES[filter].includes(j.status));
  const published = all.filter((j) => j.status !== 'DRAFT').length;
  const drafts = all.filter((j) => j.status === 'DRAFT').length;

  const openQueue = (job: JobCard) =>
    router.push({ pathname: '/employer/queue/[publicId]', params: { publicId: job.publicId } });
  const openRoster = (job: JobCard) =>
    router.push({ pathname: '/employer/attendance/[publicId]', params: { publicId: job.publicId } });
  const openEarnings = (job: JobCard) =>
    router.push({ pathname: '/employer/earnings/[publicId]', params: { publicId: job.publicId } });

  return (
    <Screen
      title={en.jobs.myJobs}
      tab="opportunities"
      headerLeft={<View />}
      headerSub={
        <Text style={s.headSub}>{`${published} published · ${drafts} draft${drafts === 1 ? '' : 's'}`}</Text>
      }
      headerRight={
        <Button label="New" variant="warm" size="md" onPress={() => router.push('/employer/post')} />
      }
    >
      <View style={s.chipRow}>
        {FILTERS.map((f) => (
          <Chip
            key={f.key}
            label={f.label}
            selected={filter === f.key}
            onPress={() => setFilter(f.key)}
          />
        ))}
      </View>

      {mine.isError ? <Text style={s.error}>{errorMessage(mine.error)}</Text> : null}
      {items.length === 0 && !mine.isLoading ? <Text style={s.lede}>{en.jobs.mineEmpty}</Text> : null}

      {items.map((job) =>
        job.status === 'DRAFT' ? (
          <View key={job.publicId} style={s.opp}>
            <View style={s.draftBody}>
              <View style={s.draftTop}>
                <StatusChip status={job.status} />
              </View>
              <Text style={[s.oppTitle, s.draftTitle]}>{job.title}</Text>
              <Text numberOfLines={1} style={s.oppHost}>
                {job.employer?.orgName
                  ? `${job.employer.orgName} · not visible to workers yet`
                  : 'Not visible to workers yet'}
              </Text>
              <View style={s.draftPay}>
                <Pay label={job.payLabel} />
              </View>
              <View style={s.oppActions}>
                <View style={s.grow}>
                  <Button
                    label={en.jobs.deleteDraft}
                    variant="secondary"
                    size="md"
                    onPress={() => removeDraft(job.publicId)}
                  />
                </View>
                <View style={s.grow}>
                  <Button
                    label={en.jobs.publish}
                    variant="primary"
                    size="md"
                    onPress={() => void publish(job.publicId)}
                  />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <Pressable
            key={job.publicId}
            accessibilityRole="button"
            accessibilityLabel={`${job.title}, ${job.hiredCount} of ${job.headcountRequired} filled`}
            onPress={() => openQueue(job)}
            style={({ pressed }) => [s.opp, pressed && s.pressed]}
          >
            <OppMedia job={job} />
            <View style={s.oppBody}>
              <Text style={s.oppTitle}>{job.title}</Text>
              <View style={s.oppRow}>
                <SeatRow taken={job.hiredCount} total={job.headcountRequired} />
                <Pay label={job.payLabel} />
              </View>

              {job.status === 'CANCELLED' && job.cancelReason ? (
                <Text style={s.cancelReason}>{job.cancelReason}</Text>
              ) : null}

              <View style={s.oppCta}>
                <View style={s.grow}>
                  <Button
                    label="Manage applications"
                    variant="primary"
                    size="md"
                    onPress={() => openQueue(job)}
                  />
                </View>
              </View>

              <View style={s.oppActions}>
                <View style={s.grow}>
                  <Button
                    label={en.attendance.roster}
                    variant="secondary"
                    size="md"
                    onPress={() => openRoster(job)}
                  />
                </View>
                {job.hiredCount > 0 ? (
                  <View style={s.grow}>
                    <Button
                      label={en.payments.jobEarnings}
                      variant="secondary"
                      size="md"
                      onPress={() => openEarnings(job)}
                    />
                  </View>
                ) : null}
              </View>

              {['OPEN', 'HIRING', 'FILLED'].includes(job.status) ? (
                <View style={s.oppActions}>
                  <View style={s.grow}>
                    <Button
                      label={en.jobs.cancelJob}
                      variant="danger"
                      size="md"
                      onPress={() => cancelJob(job.publicId)}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          </Pressable>
        ),
      )}

      <Button label={en.jobs.postJob} variant="primary" onPress={() => router.push('/employer/post')} />
      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

const s = StyleSheet.create({
  headSub: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 3,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimarySoft,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  lede: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  error: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },

  // --- opportunity card (prototype .opp) ---
  opp: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Elevation.card,
  },
  oppMedia: {
    height: 120,
    backgroundColor: Colors.light.primaryDeep,
  },
  oppMediaImg: {
    width: '100%',
    height: '100%',
  },
  oppScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  oppBadges: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  oppDist: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pillDark: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.light.text,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  pillDarkText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
  oppBody: {
    paddingTop: 13,
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  oppTitle: {
    fontFamily: Fonts.display,
    fontSize: 17.5,
    lineHeight: 20,
    color: Colors.light.text,
  },
  oppRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
    marginTop: 9,
  },
  oppCta: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  oppActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  grow: {
    flex: 1,
  },
  cancelReason: {
    ...TypeScale.caption,
    marginTop: 8,
    color: Colors.light.danger,
  },

  // --- draft (prototype .opp.compact) ---
  draftBody: {
    paddingTop: 11,
    paddingHorizontal: 13,
    paddingBottom: 13,
  },
  draftTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  draftTitle: {
    marginTop: 8,
  },
  oppHost: {
    fontSize: 13,
    lineHeight: 17,
    marginTop: 3,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  draftPay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  // --- seats (prototype .seats) ---
  seats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seatDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
    backgroundColor: 'transparent',
  },
  seatDotOn: {
    backgroundColor: Colors.light.primary,
  },
  seatCount: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primaryDark,
  },

  // --- money (prototype .money / .unit) ---
  pay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  payAmount: {
    fontFamily: Fonts.display,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.17,
    color: Colors.light.text,
  },
  payUnit: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
});

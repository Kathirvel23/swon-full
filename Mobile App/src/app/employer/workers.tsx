import { useQueries, useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { applicationsApi, type CrewMember } from '@/api/applications';
import { jobsApi } from '@/api/jobs';
import { FormationAvatars } from '@/components/marketplace';
import { Enter, Skeleton, SkeletonLines } from '@/components/motion';
import { Card, Screen } from '@/components/screen';
import { StatusChip } from '@/components/ui';
import { Colors, Elevation, Fonts, Gradients, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * Host "Workers" tab (§4 V3): everyone you have hired, aggregated across
 * your recent jobs via the existing crew roster endpoint (backend untouched).
 * Cards now follow the prototype `.w-card` of #e-queue — teal-gradient
 * initials avatar, display-face name, inline KYC indicator, canvas stat grid
 * and tint skill pills — the data flow and every query are untouched.
 */

/** Initials disc on the prototype's teal gradient (.w-card .avatar). */
function GradientAvatar({ name }: { name: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase();
  return (
    <LinearGradient
      colors={[...Gradients.teal]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      accessibilityLabel={name}
      style={styles.avatar}
    >
      <Text style={styles.avatarText}>{initials}</Text>
    </LinearGradient>
  );
}

/** Prototype inline `.kyc` — green bold check when verified, amber pending. */
function KycIndicator({ verified }: { verified: boolean }) {
  return (
    <View
      accessibilityLabel={verified ? 'KYC verified' : 'KYC pending'}
      style={styles.kyc}
    >
      <Ionicons
        name={verified ? 'checkmark-circle' : 'time-outline'}
        size={13}
        color={verified ? Colors.light.success : Colors.light.amber}
      />
      <Text style={[styles.kycText, { color: verified ? Colors.light.success : Colors.light.amber }]}>
        {verified ? 'KYC' : 'KYC pending'}
      </Text>
    </View>
  );
}

/** Prototype `.wc-stat` — canvas box, bold value + muted label at 11.5. */
function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function HostWorkersScreen() {
  const mine = useQuery({ queryKey: ['jobs-mine'], queryFn: jobsApi.mine, retry: 1 });

  const jobsWithCrew = (mine.data ?? []).filter((j) => j.hiredCount > 0).slice(0, 6);
  const crews = useQueries({
    queries: jobsWithCrew.map((j) => ({
      queryKey: ['crew', j.publicId],
      queryFn: () => applicationsApi.roster(j.publicId),
      retry: 1,
    })),
  });

  const stillLoading = mine.isPending || crews.some((q) => q.isPending);
  const byWorker = new Map<string, CrewMember>();
  for (const q of crews) {
    for (const it of q.data?.items ?? []) byWorker.set(it.worker.publicId, it);
  }
  const members = [...byWorker.values()];

  return (
    <Screen title={en.shell.workersTitle} tab="workers">
      <View style={styles.pageHead}>
        <Text style={styles.pageTitle}>{en.shell.workersTitle}</Text>
        <Text style={styles.pageSub}>{`${members.length} bonded`}</Text>
      </View>

      {stillLoading && members.length === 0 ? (
        <>
          {[0, 1, 2].map((i) => (
            <View key={`worker-skel-${i}`} style={styles.card}>
              <View style={styles.row}>
                <Skeleton width={48} height={48} radius={Radius.pill} />
                <View style={styles.rowMain}>
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="45%" height={12} />
                  <SkeletonLines lines={2} />
                </View>
              </View>
            </View>
          ))}
        </>
      ) : null}
      {!stillLoading && members.length === 0 ? (
        <Text style={styles.lede}>{en.shell.workersEmpty}</Text>
      ) : null}

      {members.length === 0 ? null : (
        <Card title={`Flock · ${members.length}`}>
          <FormationAvatars names={members.map((m) => m.worker.fullName)} />
          <Text style={styles.hint}>Tap a worker’s skills and trust markers below.</Text>
        </Card>
      )}

      {members.map((m, index) => {
        const rating =
          m.worker.ratingsCount > 0 ? (m.worker.avgRatingMilli / 1000).toFixed(1) : null;
        return (
          <Enter key={m.publicId} delay={Math.min(index, 6) * 60}>
            <View style={styles.card}>
              <View style={styles.row}>
                <GradientAvatar name={m.worker.fullName} />
                <View style={styles.rowMain}>
                  <View style={styles.nameRow}>
                    <Text numberOfLines={1} style={styles.name}>
                      {m.worker.fullName}
                    </Text>
                    <KycIndicator verified={m.worker.kycBadge} />
                    <View style={styles.rating}>
                      <Ionicons name="star" size={12} color={Colors.light.amber} />
                      <Text style={styles.ratingText}>
                        {rating ?? (m.worker.ratingsCount > 0 ? '—' : 'New')}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.meta}>
                    {`${m.worker.ratingsCount} ratings · Hired ${m.hiredAt.slice(0, 10)}`}
                  </Text>

                  <View style={styles.statGrid}>
                    <StatBox value={rating ?? '—'} label="rating" />
                    <StatBox value={String(m.worker.ratingsCount)} label="ratings" />
                    <StatBox
                      value={m.worker.experienceYears != null ? `${m.worker.experienceYears} yrs` : '—'}
                      label="experience"
                    />
                    <StatBox value={m.hiredAt.slice(0, 10)} label="hired" />
                  </View>

                  <View style={styles.skills}>
                    {m.worker.skills.slice(0, 6).map((sk) => (
                      <View key={sk.skillId} style={styles.skillPill}>
                        <Text style={styles.skillPillText}>{sk.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <StatusChip status={m.status} size="sm" />
              </View>
            </View>
          </Enter>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  pageHead: {
    gap: 2,
  },
  pageTitle: {
    ...TypeScale.title,
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },
  pageSub: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },
  lede: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  hint: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
  },
  card: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: 14, // prototype .w-card padding
    ...Elevation.card,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.mid,
    alignItems: 'flex-start',
  },
  rowMain: {
    flex: 1,
    gap: Spacing.half,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Fonts.display,
    fontSize: 16,
    color: Colors.light.onPrimary,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  name: {
    fontFamily: Fonts.display,
    fontSize: 16.5,
    lineHeight: 21,
    color: Colors.light.text,
    flexShrink: 1,
  },
  kyc: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  kycText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    fontSize: 11.5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    fontSize: 11.5,
    color: Colors.light.text,
  },
  meta: {
    ...TypeScale.caption,
    fontSize: 12,
    color: Colors.light.textMuted,
    fontWeight: '600',
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.half,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    backgroundColor: Colors.light.background, // prototype --canvas
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.sm,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  statValue: {
    fontSize: 11.5,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 11.5,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  skills: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: Spacing.half,
  },
  skillPill: {
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  skillPillText: {
    fontSize: 11,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.primaryDark,
  },
});

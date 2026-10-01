import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppError, errorMessage } from '@/api/client';
import { applicationsApi, idemKey } from '@/api/applications';
import { jobsApi, type JobCard } from '@/api/jobs';
import { SeatDots, WhiteWingBadge } from '@/components/marketplace';
import { useKycGate } from '@/components/kycGate';
import { Button } from '@/components/screen';
import { Skeleton } from '@/components/motion';
import { photoSourceForCategory } from '@/constants/jobPhotos';
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
 * Wave 3 (H5) job detail — V3 w-detail parity: full-bleed 210px photo hero
 * with the bottom scrim + round white back button, status/seats pills, hero
 * money figure, then the prototype block rhythm (WHEN / WHAT YOU'LL DO /
 * REQUIREMENTS / WHAT YOU GET / LOCATION / EMPLOYER / YOUR MATCH) with the
 * same apply flow docked in an absolutely positioned sticky CTA bar.
 * Address visibility is still decided by the SERVER (§18) — nothing here
 * invents data: every figure comes from the JobCard / viewerBadges fields.
 */

type Tone = 'orange' | 'yellow' | 'blue' | 'lavender' | 'green' | 'coral' | 'amber';

function tileFor(
  name: string,
): { icon: keyof typeof Ionicons.glyphMap; tone: Tone } {
  const n = name.toLowerCase();
  if (n.includes('construc')) return { icon: 'construct', tone: 'orange' };
  if (n.includes('warehou') || n.includes('logistic') || n.includes('load')) {
    return { icon: 'cube', tone: 'yellow' };
  }
  if (n.includes('deliver')) return { icon: 'bicycle', tone: 'blue' };
  if (n.includes('event')) return { icon: 'sparkles', tone: 'lavender' };
  if (n.includes('clean') || n.includes('housekeep')) return { icon: 'brush', tone: 'green' };
  if (n.includes('kitchen') || n.includes('cater') || n.includes('food')) {
    return { icon: 'restaurant', tone: 'coral' };
  }
  return { icon: 'briefcase', tone: 'blue' };
}

const paySuffixFor = (payType: JobCard['payType']): string =>
  payType === 'HOUR' ? '/ hour' : payType === 'DAY' ? '/ day' : 'total';

/** "30 Sep" / "02 Oct" — prototype WHEN box date reading. */
function formatDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${d.toLocaleString('en-GB', { month: 'short' })}`;
}

/** "09:00" → "09:00 AM" (prototype HOURS box reading). */
function formatClock(time: string): string {
  const [hRaw, mRaw] = time.split(':');
  const h = Number(hRaw);
  if (!Number.isFinite(h)) return time;
  const m = (mRaw ?? '00').slice(0, 2);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${suffix}`;
}

/** Status pill from the shared status→color map, keeping the SWON label. */
function StatusPill({ status, label }: { status: string; label: string }) {
  const c = statusColors(status);
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Status ${label}`}
      style={[styles.pill, { backgroundColor: c.bg, borderColor: c.fg }]}
    >
      <Text style={[styles.pillText, { color: c.fg }]}>{label}</Text>
    </View>
  );
}

/** Prototype .block-title — display 15/800 + 26px tint icon tile. */
function BlockTitle({
  icon,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  children: string;
}) {
  return (
    <View style={styles.blockTitle}>
      <View style={styles.blockIcon}>
        <Ionicons name={icon} size={14} color={Colors.light.primary} />
      </View>
      <Text style={styles.blockText}>{children}</Text>
    </View>
  );
}

export default function JobDetailScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();
  const insets = useSafeAreaInsets();

  const query = useQuery({
    queryKey: ['job', publicId],
    queryFn: () => jobsApi.detail(String(publicId)),
    retry: 1,
  });
  const mine = useQuery({
    queryKey: ['my-apps'],
    queryFn: () => applicationsApi.mine(),
    retry: 0,
  });

  const job = query.data;
  const myApp = mine.data?.find((a) => a.job.publicId === publicId);
  const canApply =
    !!job && !myApp && (job.status === 'OPEN' || job.status === 'HIRING') && !job.viewerState?.isOwner;

  /** KYC gate (M5): parks the apply behind the verification sheet. */
  const { gate, gateSheet } = useKycGate();

  /** One apply attempt — same payload, a fresh Idempotency-Key per attempt (§8). */
  const submitApply = async () => {
    await applicationsApi.apply(String(publicId), idemKey('apply'));
    await queryClient.invalidateQueries({ queryKey: ['my-apps'] });
    await queryClient.invalidateQueries({ queryKey: ['job', publicId] });
    showAlert(en.apps.applied, en.apps.applied);
  };

  const onApplyError = async (e: unknown, fromGate: boolean): Promise<void> => {
    if (e instanceof AppError && e.code === 'KYC_REQUIRED') {
      if (fromGate) {
        // The gate-driven replay already ran — surface it, never loop on it.
        showAlert(en.apps.applyFailed, errorMessage(e));
        return;
      }
      // gate() runs this same apply unchanged once KYC reads VERIFIED; until
      // then it opens the sheet and parks the attempt (never auto-runs).
      void gate(() => apply(true));
      return;
    }
    if (e instanceof AppError && e.code === 'DUPLICATE_APPLICATION') {
      await queryClient.invalidateQueries({ queryKey: ['my-apps'] });
      showAlert(en.apps.applied, en.apps.applied);
      return;
    }
    showAlert(en.apps.applyFailed, errorMessage(e));
  };

  /** `fromGate` = the replay the verification sheet scheduled (one per tap). */
  const apply = async (fromGate = false) => {
    try {
      await submitApply();
    } catch (e) {
      await onApplyError(e, fromGate);
    }
  };

  const tile = job ? tileFor(job.category.name) : null;
  const photo = job ? photoSourceForCategory(job.category.name) : null;
  const badges = job?.viewerBadges;

  const openSeats = job ? Math.max(0, job.headcountRequired - job.hiredCount) : 0;
  const distanceText = job
    ? typeof job.distanceKm === 'number'
      ? job.distanceKm === 0
        ? en.jobs.sameArea
        : `${job.distanceKm} km · ${job.area.name}`
      : `${job.area.name} · ${job.city}`
    : null;
  const ratingLine = job
    ? en.apps.ratingLabel(job.employer.avgRatingMilli, job.employer.ratingsCount)
    : '';
  const welfareWithNotes = job?.welfare.filter((w) => w.note) ?? [];

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: canApply ? 200 + insets.bottom : Spacing.six },
          ]}
        >
          {query.isError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage(query.error)}</Text>
            </View>
          ) : null}

          {!job ? (
            <View style={styles.loadingBox}>
              <Skeleton width="100%" height={210} radius={0} />
              <Skeleton width="70%" height={26} />
              <Skeleton width="45%" height={30} />
              <Skeleton width="100%" height={120} radius={Radius.lg} />
              <Text style={styles.loadingText}>{en.common.loading}</Text>
            </View>
          ) : (
            <>
              {/* ---- full-bleed hero: photo + bottom scrim + round back ---- */}
              <View style={styles.hero} accessibilityLabel={`${job.category.name} opportunity`}>
                {photo != null ? (
                  <Image source={photo} style={styles.heroImg} resizeMode="cover" />
                ) : (
                  <LinearGradient
                    colors={[...Gradients.teal]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  >
                    {tile ? (
                      <View style={styles.heroPh} pointerEvents="none">
                        <Ionicons name={tile.icon} size={54} color="rgba(255, 255, 255, 0.35)" />
                      </View>
                    ) : null}
                  </LinearGradient>
                )}
                <LinearGradient
                  colors={['rgba(11, 21, 18, 0)', 'rgba(11, 21, 18, 0.8)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.heroScrim}
                  pointerEvents="none"
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={en.common.back}
                  onPress={() => router.back()}
                  style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
                >
                  <Ionicons name="chevron-back" size={22} color={Colors.light.text} />
                </Pressable>
                {job.employer.kycBadge ? (
                  <View style={styles.heroBadges}>
                    <WhiteWingBadge size="sm" />
                  </View>
                ) : null}
              </View>

              {/* ---- body ---- */}
              <View style={styles.body}>
                <View style={styles.statusRow}>
                  <StatusPill status={job.status} label={en.jobs.status[job.status] ?? job.status} />
                  <View style={styles.seatsPill}>
                    <Text style={styles.seatsPillText}>
                      {`${job.headcountRequired} seats · ${openSeats} open`}
                    </Text>
                  </View>
                </View>

                <Text style={styles.title}>{job.title}</Text>

                <View style={styles.payRow}>
                  <View style={styles.moneyRow}>
                    <Text
                      accessibilityLabel={`₹${Math.round(job.payAmountPaise / 100).toLocaleString('en-IN')}`}
                      style={styles.moneyHero}
                    >{`₹${Math.round(job.payAmountPaise / 100).toLocaleString('en-IN')}`}</Text>
                    <Text style={styles.moneyUnit}>{paySuffixFor(job.payType)}</Text>
                  </View>
                  <View style={styles.hostPill}>
                    <Text style={styles.hostPillText}>{`★ ${ratingLine}`}</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={14} color={Colors.light.textMuted} />
                    <Text style={styles.metaText}>{distanceText}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="people-outline" size={14} color={Colors.light.textMuted} />
                    <Text style={styles.metaText}>{`${job.headcountRequired} workers`}</Text>
                  </View>
                </View>

                {/* ---- WHEN ---- */}
                <BlockTitle icon="calendar-outline">WHEN</BlockTitle>
                <View style={styles.whenGrid}>
                  <View style={styles.whenBox}>
                    <Text style={styles.whenLabel}>DATES</Text>
                    <Text style={styles.whenValue}>
                      {job.startsOn === job.endsOn
                        ? formatDay(job.startsOn)
                        : `${formatDay(job.startsOn)} – ${formatDay(job.endsOn)}`}
                    </Text>
                  </View>
                  <View style={styles.whenBox}>
                    <Text style={styles.whenLabel}>HOURS</Text>
                    <Text style={styles.whenValue}>{`${formatClock(job.dayStartTime)} – ${formatClock(job.dayEndTime)}`}</Text>
                  </View>
                </View>

                {/* ---- WHAT YOU'LL DO ---- */}
                <BlockTitle icon="briefcase-outline">{"WHAT YOU'LL DO"}</BlockTitle>
                <View style={styles.flatCard}>
                  <Text style={styles.para}>{job.description}</Text>
                </View>

                {/* ---- REQUIREMENTS ---- */}
                <BlockTitle icon="checkmark-outline">REQUIREMENTS</BlockTitle>
                <View style={styles.tags}>
                  {typeof job.minExperienceYears === 'number' ? (
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{`${job.minExperienceYears}+ years`}</Text>
                    </View>
                  ) : null}
                  {job.skills.map((s) => (
                    <View key={s.skillId} style={styles.tag}>
                      <Text style={styles.tagText}>{s.name}</Text>
                    </View>
                  ))}
                </View>
                {job.requirementsNote ? (
                  <Text style={styles.noteText}>{job.requirementsNote}</Text>
                ) : null}

                {/* ---- WHAT YOU GET ---- */}
                <BlockTitle icon="gift-outline">WHAT YOU GET</BlockTitle>
                <View style={styles.getList}>
                  <View style={styles.getTile}>
                    <Text style={styles.getIcon}>{`₹${Math.round(job.payAmountPaise / 100).toLocaleString('en-IN')}`}</Text>
                    <Text style={styles.getText}>{` ${paySuffixFor(job.payType).replace('/', '').trim()} pay`}</Text>
                  </View>
                  {job.welfare.map((w) => (
                    <View key={w.code} style={styles.getTile}>
                      <Ionicons name="checkmark" size={14} color={Colors.light.primary} />
                      <Text style={styles.getText}>{w.label}</Text>
                    </View>
                  ))}
                </View>

                {/* ---- WELFARE (only when there are notes to carry) ---- */}
                {welfareWithNotes.length > 0 ? (
                  <>
                    <BlockTitle icon="heart-outline">WELFARE</BlockTitle>
                    <View style={styles.flatCard}>
                      {welfareWithNotes.map((w) => (
                        <Text key={w.code} style={styles.para}>{`${w.label} — ${w.note ?? ''}`}</Text>
                      ))}
                    </View>
                  </>
                ) : null}

                {/* ---- LOCATION ---- */}
                <BlockTitle icon="location-outline">LOCATION</BlockTitle>
                <View style={styles.flatCard}>
                  <View style={styles.locRow}>
                    <Ionicons name="pin-outline" size={16} color={Colors.light.primary} />
                    <Text style={styles.locText}>{`${job.area.name}, ${job.city}`}</Text>
                  </View>
                  <View style={styles.locRow}>
                    <Ionicons name="lock-closed-outline" size={16} color={Colors.light.primary} />
                    <Text style={styles.locText}>
                      {job.addressLine !== '' ? job.addressLine : en.jobs.addressHidden}
                    </Text>
                  </View>
                  <View style={styles.locRow}>
                    <Ionicons name="navigate-outline" size={16} color={Colors.light.primary} />
                    <Text style={styles.locText}>{distanceText}</Text>
                  </View>
                  <SeatDots taken={job.hiredCount} total={job.headcountRequired} />
                </View>

                {/* ---- EMPLOYER / HOST ---- */}
                <BlockTitle icon="shield-checkmark-outline">EMPLOYER</BlockTitle>
                <View style={styles.hostStrip}>
                  <LinearGradient
                    colors={[...Gradients.teal]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hostAvatar}
                  >
                    <Text style={styles.hostAvatarText}>
                      {job.employer.orgName
                        .trim()
                        .split(/\s+/)
                        .slice(0, 2)
                        .map((w) => w.charAt(0))
                        .join('')
                        .toUpperCase()}
                    </Text>
                  </LinearGradient>
                  <View style={styles.hostCol}>
                    <View style={styles.hostNameRow}>
                      <Text style={styles.hostName}>{job.employer.orgName}</Text>
                      {job.employer.kycBadge ? <WhiteWingBadge size="sm" /> : null}
                    </View>
                    <Text style={styles.hostCap}>{ratingLine}</Text>
                    {job.employer.kycBadge ? null : (
                      <Text style={styles.hostCap}>{en.jobs.employerPending}</Text>
                    )}
                  </View>
                </View>

                {/* ---- YOUR MATCH ---- */}
                {badges ? (
                  <>
                    <BlockTitle icon="trending-up-outline">YOUR MATCH</BlockTitle>
                    <View style={styles.flatCard}>
                      <MatchRow
                        ok={badges.matchesSkills}
                        text={badges.matchesSkills ? en.jobs.badgeSkills : en.jobs.badgeNoSkills}
                      />
                      <MatchRow
                        ok={badges.experienceOk}
                        text={badges.experienceOk ? en.jobs.badgeExp : en.jobs.badgeNoExp}
                      />
                      <MatchRow
                        ok={badges.kycOk}
                        text={badges.kycOk ? en.jobs.badgeKycOk : en.jobs.badgeNoKyc}
                      />
                      {typeof job.distanceKm === 'number' ? (
                        <MatchRow ok text={en.jobs.distanceKm(job.distanceKm)} />
                      ) : null}
                    </View>
                  </>
                ) : null}
              </View>
            </>
          )}

          {myApp ? (
            <View style={styles.appBox}>
              <Text style={styles.appTitle}>{en.apps.myApplications}</Text>
              <Text style={styles.appliedText}>
                {`${en.apps.applied} — ${en.apps.status[myApp.status] ?? myApp.status}`}
              </Text>
              <Button
                label={en.apps.myApplications}
                variant="secondary"
                onPress={() => router.push('/applications')}
              />
            </View>
          ) : null}

          <View style={styles.tailBtns}>
            <Button
              label={en.complaints.openCase}
              variant="secondary"
              onPress={() => router.push(`/complaints?linkType=JOB&linkPublicId=${String(publicId)}`)}
            />
            <Button label={en.common.back} variant="ghost" onPress={() => router.back()} />
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* sticky bottom CTA — same apply handler, absolutely docked over the scroll */}
      {canApply ? (
        <View
          style={[
            styles.ctaBar,
            { paddingBottom: Spacing.three + Math.max(insets.bottom, Spacing.half) },
          ]}
        >
          <Button label={en.apps.apply} variant="primary" size="lg" onPress={() => void apply()} />
          <Text style={styles.ctaNote}>{en.jobs.addressHidden}</Text>
        </View>
      ) : null}

      {/* KYC gate sheet — parked Apply re-runs only after the flow says so */}
      {gateSheet}
    </View>
  );
}

function MatchRow({ ok, text }: { ok: boolean; text: string }) {
  return (
    <View style={styles.matchRow}>
      <Ionicons
        name={ok ? 'checkmark-circle' : 'close-circle'}
        size={16}
        color={ok ? Colors.light.success : Colors.light.danger}
      />
      <Text style={styles.matchText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  safeTop: {
    flex: 1,
    // prototype statusbar strip above the full-bleed hero
    backgroundColor: Colors.light.primaryDeep,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    paddingTop: 0,
    paddingHorizontal: 0,
    gap: Spacing.mid,
    backgroundColor: Colors.light.background,
  },
  errorBox: {
    marginHorizontal: Spacing.three,
    marginTop: Spacing.three,
  },
  errorText: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  loadingBox: {
    gap: Spacing.mid,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
  },
  loadingText: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
    textAlign: 'center',
    fontFamily: Fonts.bodySemi,
  },

  /* ---- hero (prototype .detail-hero) ---- */
  hero: {
    height: 210,
    backgroundColor: Colors.light.primaryDeep,
  },
  heroImg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  heroPh: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 12,
    left: 14,
    zIndex: 3,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Elevation.card,
  },
  heroBadges: {
    position: 'absolute',
    right: 14,
    top: 12,
    zIndex: 3,
  },
  pressed: {
    opacity: 0.85,
  },

  /* ---- body ---- */
  body: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  pill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  pillText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    letterSpacing: 0.3,
  },
  seatsPill: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  seatsPillText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  title: {
    fontSize: 26,
    lineHeight: 29,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.text,
    marginTop: Spacing.half, // + body gap 8 = prototype's 10px
  },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  moneyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.half,
  },
  moneyHero: {
    fontFamily: Fonts.display,
    fontSize: 29,
    lineHeight: 31,
    color: Colors.light.green,
  },
  moneyUnit: {
    ...TypeScale.bodySm,
    fontWeight: '600',
    color: Colors.light.textMuted,
  },
  hostPill: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  hostPillText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    flexWrap: 'wrap',
    marginBottom: Spacing.half,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  metaText: {
    ...TypeScale.caption,
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.light.textMuted,
  },

  /* ---- block titles ---- */
  blockTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.mid,
    marginBottom: Spacing.half,
  },
  blockIcon: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockText: {
    fontSize: 15,
    fontFamily: Fonts.display,
    fontWeight: '800',
    letterSpacing: 0.3,
    color: Colors.light.text,
  },

  /* ---- when grid ---- */
  whenGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  whenBox: {
    flex: 1,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    padding: 11,
  },
  whenLabel: {
    fontSize: 10.5,
    fontWeight: '800',
    letterSpacing: 1,
    color: Colors.light.textMuted,
  },
  whenValue: {
    fontSize: 15.5,
    fontFamily: Fonts.display,
    fontWeight: '800',
    color: Colors.light.text,
    marginTop: 3,
  },

  /* ---- prose / generic flat card ---- */
  flatCard: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    gap: Spacing.two,
    ...Elevation.card,
  },
  para: {
    fontSize: 14.5,
    lineHeight: 23,
    fontWeight: '600',
    color: Colors.light.textMuted,
  },
  noteText: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
    marginTop: Spacing.half,
  },

  /* ---- requirement tags ---- */
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 11,
  },
  tagText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.light.text,
  },

  /* ---- what you get ---- */
  getList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  getTile: {
    flexGrow: 1,
    flexBasis: '46%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.md,
    padding: 10,
  },
  getIcon: {
    fontSize: 13,
    fontWeight: '900',
    color: Colors.light.primary,
    fontFamily: Fonts.display,
  },
  getText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.light.text,
    flexShrink: 1,
  },

  /* ---- location ---- */
  locRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  locText: {
    ...TypeScale.bodySm,
    flex: 1,
    color: Colors.light.text,
  },

  /* ---- host strip ---- */
  hostStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: 13,
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostAvatarText: {
    fontFamily: Fonts.display,
    fontWeight: '800',
    fontSize: 17,
    color: Colors.light.onPrimary,
  },
  hostCol: {
    flex: 1,
    gap: 3,
  },
  hostNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  hostName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.light.text,
  },
  hostCap: {
    ...TypeScale.caption,
    fontWeight: '700',
    color: Colors.light.textMuted,
  },

  /* ---- match rows ---- */
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.half,
  },
  matchText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.light.text,
    flex: 1,
  },

  /* ---- tail ---- */
  appBox: {
    marginHorizontal: Spacing.three,
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  appTitle: {
    ...TypeScale.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: Colors.light.textMuted,
  },
  appliedText: {
    ...TypeScale.body,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  tailBtns: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },

  /* ---- sticky cta (prototype .sticky-cta) ---- */
  ctaBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.97)',
    borderTopWidth: 1,
    borderTopColor: Colors.light.line,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.mid,
    gap: Spacing.one,
    // prototype .sticky-cta: hairline + shadow thrown ABOVE the bar
    ...Elevation.barTop,
    ...Elevation.sheet,
  },
  ctaNote: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
    textAlign: 'center',
    fontFamily: Fonts.bodySemi,
  },
});

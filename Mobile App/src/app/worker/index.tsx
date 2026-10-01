import { photoSourceForCategory } from '@/constants/jobPhotos';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { paymentsApi } from '@/api/attendance';
import { authApi } from '@/api/auth';
import { errorMessage } from '@/api/client';
import { jobsApi, type JobCard } from '@/api/jobs';
import { matchingApi } from '@/api/matching';
import { notificationsApi } from '@/api/kyc';
import {
  AttentionBanner,
  MoneyDisplay,
  OpportunityCard,
  TrustScore,
  WhiteWingBadge,
} from '@/components/marketplace';
import { Enter, Skeleton } from '@/components/motion';
import { Button, Card } from '@/components/screen';
import { TabBar } from '@/components/TabBar';
import { SearchBar, type AccentTone } from '@/components/ui';
import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
  MaxContentWidth,
  Radius,
  Spacing,
  Touch,
} from '@/constants/theme';
import { en } from '@/i18n/strings';
import { useSession } from '@/store/session';

/**
 * V3 worker home = the MARKETPLACE screen (UI_PROTOTYPE §w-home).
 *
 * Parity pass (2026-09-30): the screen now owns its shell so the prototype's
 * composition renders verbatim — full-bleed `--g-home` hero (teal gradient +
 * warm corner glow, 30dp bottom radius) carrying the identity (avatar,
 * greeting, glass bell with unread nub, glass location pill), the search pill
 * overlapping it by 34dp, 52dp gradient category tiles, the FlashMatch strip,
 * section heads, the `.h-rail` recommended rail, nearby compact cards, the
 * week earnings card with its 7-column chart, then the profile card and every
 * original shortcut. `Screen` is not used here because it always renders a
 * brand topbar and §w-home has none — the hero IS the header (reported as a
 * shared-layer gap). Same queries, same handlers, no invented numbers.
 */

/** Category tiles pick icon/tone by name; unknown categories fall back by index. */
function tileFor(
  name: string,
  index: number,
): { icon: keyof typeof Ionicons.glyphMap; tone: AccentTone } {
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
  if (n.includes('drive') || n.includes('transport')) return { icon: 'car-sport', tone: 'blue' };
  if (n.includes('sale') || n.includes('retail') || n.includes('shop')) {
    return { icon: 'cart', tone: 'amber' };
  }
  const fallback: { icon: keyof typeof Ionicons.glyphMap; tone: AccentTone }[] = [
    { icon: 'briefcase', tone: 'blue' },
    { icon: 'people', tone: 'lavender' },
    { icon: 'business', tone: 'amber' },
    { icon: 'shirt', tone: 'coral' },
    { icon: 'layers', tone: 'green' },
  ];
  return fallback[index % fallback.length];
}

/** Prototype `.c-ic` tile gradients — token pairs only (never a raw hex). */
function gradientForTone(tone: AccentTone): readonly [string, string] {
  switch (tone) {
    case 'coral':
      return [Colors.light.coral, Colors.light.orange];
    case 'orange':
      return [Colors.light.orange, Colors.light.amber];
    case 'amber':
      return Gradients.warm;
    case 'yellow':
      return Gradients.sun;
    case 'green':
      return Gradients.money;
    case 'blue':
      return [Colors.light.blue, Colors.light.info];
    default:
      return [Colors.light.lavender, Colors.light.blue];
  }
}

/** Token hex → rgba string, so the hero glow stays free of literal colours. */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Prototype hero greeting line (§w-home `.hh-hi`). */
function greetingFor(hour: number): string {
  if (hour < 12) return 'Good morning,';
  if (hour < 17) return 'Good afternoon,';
  return 'Good evening,';
}

const paySuffixFor = (payType: JobCard['payType']): string =>
  payType === 'HOUR' ? '/ hour' : payType === 'DAY' ? '/ day' : 'total';

/** Section heading + optional "See all" link (prototype `.section-head`). */
function SectionHead({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.head}>
      <Text style={styles.headTitle}>{title}</Text>
      {actionLabel != null && onAction != null ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onAction}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Text style={styles.headLink}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/** Glass bell — prototype `.hh-bell` (44dp, coral nub with deep-teal ring). */
function HeroBell({ badge, onPress }: { badge: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={en.inbox.title}
      onPress={onPress}
      style={({ pressed }) => [styles.bell, pressed && styles.pressed]}
    >
      <Ionicons name="notifications-outline" size={24} color={Colors.light.onPrimary} />
      {badge ? <View style={styles.bellNub} /> : null}
    </Pressable>
  );
}

/** One shortcut row — prototype `.list-row`; keeps every destination reachable. */
function LinkRow({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.listRow, pressed === true && styles.rowPressed]}
    >
      <View style={styles.rowTile}>
        <Ionicons
          name={icon}
          size={18}
          color={danger === true ? Colors.light.danger : Colors.light.primary}
        />
      </View>
      <Text numberOfLines={1} style={[styles.rowLabel, danger === true && styles.rowLabelDanger]}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.light.textMuted} />
    </Pressable>
  );
}

type WeekPoint = { label: string; value: number; peak: boolean };

/** Prototype week-card mini chart (`.chart`): 7 columns, peak column in money green. */
function WeekChart({ data }: { data: WeekPoint[] }) {
  const max = data.reduce((m, d) => (d.value > m ? d.value : m), 0);
  return (
    <View style={styles.chart} accessibilityLabel="Earnings by day this week">
      {data.map((d, i) => {
        const height = d.value > 0 ? Math.max(8, Math.round((d.value / Math.max(1, max)) * 44)) : 8;
        return (
          <View key={`${d.label}-${i}`} style={styles.chartCol}>
            <LinearGradient
              colors={
                d.peak ? [...Gradients.money] : [Colors.light.primaryDark, Colors.light.primary]
              }
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
              style={[styles.chartBar, { height }]}
            />
            <Text style={styles.chartLabel}>{d.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function WorkerHomeScreen() {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();
  const [homeQ, setHomeQ] = useState('');

  const me = useQuery({ queryKey: ['me'], queryFn: authApi.me, retry: 1 });
  // same key as the Explore feed → shared cache, no extra backend load
  const feed = useQuery({
    queryKey: ['jobs-feed', '', 'DATE_DESC'],
    queryFn: () => jobsApi.feed({ sort: 'DATE_DESC' }),
    retry: 1,
  });
  const offers = useQuery({
    queryKey: ['my-offers'],
    queryFn: () => matchingApi.myOffers(),
    retry: 0,
  });
  const earnings = useQuery({
    queryKey: ['my-earnings', 'ALL'],
    queryFn: () => paymentsApi.myEarnings(),
    retry: 0,
  });
  const unread = useQuery({
    queryKey: ['inbox-unread'],
    queryFn: () => notificationsApi.unreadCount(),
    retry: 1,
  });

  const logout = async () => {
    try {
      if (session.refreshToken) await authApi.logout(session.refreshToken);
    } catch {
      // server-side logout is best-effort; local clear always happens
    }
    await session.clearSession();
    queryClient.clear();
    router.replace('/login');
  };

  const name = me.data?.workerProfile?.fullName;
  const initial = name?.trim().charAt(0).toUpperCase() ?? '';
  const pct = me.data?.workerProfile?.profileCompletePct ?? 0;
  const city = me.data?.workerProfile?.city ?? undefined;
  const kycBadge = me.data?.workerProfile?.kycBadge === true;

  const jobs = feed.data ?? [];

  // real category counts from the loaded feed (never invented)
  const catCounts = new Map<string, { name: string; count: number }>();
  for (const job of jobs) {
    const key = job.category.publicId || job.category.code;
    const hit = catCounts.get(key);
    if (hit) hit.count += 1;
    else catCounts.set(key, { name: job.category.name, count: 1 });
  }
  const categories = Array.from(catCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const recommended = jobs.slice(0, 8);
  const nearby = jobs
    .filter((j) => typeof j.distanceKm === 'number')
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
    .slice(0, 6);

  const pendingOffers = (offers.data ?? []).filter((o) => o.status === 'PENDING').length;

  // week preview: earnings whose opportunity ends in the current calendar week
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);
  const endsThisWeek = (iso: string): boolean => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return false;
    return d.getTime() >= weekStart.getTime() && d.getTime() < weekEnd.getTime();
  };
  const weekRows = (earnings.data?.data ?? []).filter(
    (r) => endsThisWeek(r.job.endsOn) && r.status !== 'CANCELLED' && r.status !== 'FAILED',
  );
  const weekPaise = weekRows.reduce((sum, r) => sum + r.amountPaise + r.adjustmentPaise, 0);

  // prototype week chart: real ₹ totals per day of this week, peak highlighted
  const weekData: WeekPoint[] = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    const dow = day.getDay();
    const value = weekRows
      .filter((r) => {
        const end = new Date(r.job.endsOn);
        return !Number.isNaN(end.getTime()) && end.getDay() === dow;
      })
      .reduce((sum, r) => sum + r.amountPaise + r.adjustmentPaise, 0);
    return { label: DAY_LABELS[dow], value: Math.round(value / 100), peak: false };
  });
  const peakAt = weekData.reduce((best, p, i, arr) => (p.value > arr[best].value ? i : best), 0);
  if (weekData[peakAt].value > 0) weekData[peakAt] = { ...weekData[peakAt], peak: true };

  const rating = (job: JobCard): number | null =>
    job.employer.ratingsCount > 0 ? job.employer.avgRatingMilli / 1000 : null;

  return (
    <View style={styles.root}>
      {/* prototype status strip — the deep-teal band above the hero */}
      <SafeAreaView edges={['top']} style={styles.safeTop} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          {/* ---------- home hero (prototype .home-hero) ---------- */}
          <View style={styles.heroWrap}>
            <LinearGradient
              colors={[...Gradients.teal]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.55, y: 1 }}
              style={styles.hero}
            >
              {/* warm corner glow — prototype --g-home radial overlay */}
              <LinearGradient
                colors={[withAlpha(Colors.light.orange, 0.28), withAlpha(Colors.light.orange, 0)]}
                locations={[0, 0.45]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                pointerEvents="none"
                style={styles.heroGlow}
              />
              <View style={styles.hhRow}>
                <View style={styles.avatar}>
                  {initial ? (
                    <Text style={styles.avatarText}>{initial}</Text>
                  ) : (
                    <Ionicons name="person" size={20} color={Colors.light.onPrimary} />
                  )}
                </View>
                <Enter delay={60} style={styles.hhGreet}>
                  <Text style={styles.hhHi}>{greetingFor(new Date().getHours())}</Text>
                  <Text
                    numberOfLines={1}
                    accessibilityRole="header"
                    style={styles.hhName}
                  >
                    {name ? en.auth.homeHello(name) : en.auth.homeNoName}
                  </Text>
                  <Text numberOfLines={1} style={styles.hhTag}>
                    {en.common.signedInAs(en.common.roleWorker)}
                  </Text>
                </Enter>
                <HeroBell
                  badge={(unread.data?.unread ?? 0) > 0}
                  onPress={() => router.push('/inbox')}
                />
              </View>
              {city ? (
                <View style={styles.hhLoc}>
                  <Ionicons name="location" size={16} color={Colors.light.onPrimary} />
                  <Text numberOfLines={1} style={styles.hhLocText}>
                    {city}
                  </Text>
                </View>
              ) : null}
            </LinearGradient>
            {/* search overlaps the hero — prototype .searchbar { margin-top: -34 } */}
            <View style={styles.searchWrap}>
              <View style={styles.searchPill}>
                <SearchBar
                  placeholder="Search work, skills or location"
                  value={homeQ}
                  onChangeText={setHomeQ}
                  onSubmit={() =>
                    router.push({ pathname: '/jobs', params: { q: homeQ.trim() } })
                  }
                />
              </View>
            </View>
          </View>

          {/* ---------- category shortcuts (prototype .cats) ---------- */}
          {categories.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              accessibilityLabel="Categories"
              contentContainerStyle={styles.catRow}
            >
              {categories.map((c, i) => {
                const tile = tileFor(c.name, i);
                return (
                  <Pressable
                    key={`${c.name}-${i}`}
                    accessibilityRole="button"
                    accessibilityLabel={`${c.name}, ${c.count} open`}
                    onPress={() => router.push('/jobs')}
                    style={({ pressed }) => [styles.cat, pressed && styles.pressed]}
                  >
                    <LinearGradient
                      colors={gradientForTone(tile.tone)}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.catTile}
                    >
                      <Ionicons name={tile.icon} size={24} color={Colors.light.onPrimary} />
                    </LinearGradient>
                    <Text numberOfLines={1} style={styles.catLabel}>
                      {c.name}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : null}

          {feed.isError ? (
            <AttentionBanner
              tone="coral"
              icon="cloud-offline"
              message={errorMessage(feed.error)}
              actionLabel={en.common.retry}
              onAction={() => void feed.refetch()}
            />
          ) : null}

          {/* first load of the feed: branded skeletons shaped like the rails below */}
          {feed.isLoading ? (
            <>
              <View accessibilityLabel="Categories" style={styles.skelRail}>
                <Skeleton width={64} height={76} radius={Radius.lg} />
                <Skeleton width={64} height={76} radius={Radius.lg} />
                <Skeleton width={64} height={76} radius={Radius.lg} />
                <Skeleton width={64} height={76} radius={Radius.lg} />
              </View>
              <View accessibilityLabel="Recommended for you" style={styles.skelRail}>
                <Skeleton width={262} height={300} radius={Radius.lg} />
                <Skeleton width={262} height={300} radius={Radius.lg} />
              </View>
              <View accessibilityLabel="Nearby opportunities" style={styles.stack}>
                <Skeleton width="100%" height={140} radius={Radius.lg} />
                <Skeleton width="100%" height={140} radius={Radius.lg} />
              </View>
            </>
          ) : null}

          {offers.data != null ? (
            <AttentionBanner
              tone={pendingOffers > 0 ? 'orange' : 'blue'}
              icon={pendingOffers > 0 ? 'flash' : 'flash-outline'}
              message={
                pendingOffers > 0
                  ? `${pendingOffers} FlashMatch ${pendingOffers === 1 ? 'offer' : 'offers'} waiting for your answer`
                  : en.quickmatch.offersEmpty
              }
              actionLabel={en.quickmatch.offersTitle}
              onAction={() => router.push('/offers')}
            />
          ) : null}

          {/* ---------- Recommended (prototype .h-rail) ---------- */}
          {recommended.length > 0 ? (
            <>
              <SectionHead
                title="Recommended for you"
                actionLabel="See all"
                onAction={() => router.push('/jobs')}
              />
              <View style={styles.bleed}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.rail}
                >
                  {recommended.map((job) => {
                    const tile = tileFor(job.category.name, 0);
                    return (
                      <View key={job.publicId} style={styles.railItem}>
                        <OpportunityCard
                          variant="recommended"
                          title={job.title}
                          host={job.employer.orgName}
                          location={`${job.area.name}, ${job.city}`}
                          time={`${job.startsOn} · ${job.dayStartTime}–${job.dayEndTime}`}
                          payAmount={Math.round(job.payAmountPaise / 100)}
                          paySuffix={paySuffixFor(job.payType)}
                          seatsTaken={job.hiredCount}
                          seatsTotal={job.headcountRequired}
                          skills={job.skills.map((s) => s.name)}
                          categoryIcon={tile.icon}
                          categoryTone={tile.tone}
                          photoSource={photoSourceForCategory(job.category.name) ?? undefined}
                          distanceKm={job.distanceKm}
                          hostRating={rating(job)}
                          hostVerified={job.employer.kycBadge}
                          showCta={false}
                          onPress={() =>
                            router.push({
                              pathname: '/job/[publicId]',
                              params: { publicId: job.publicId },
                            })
                          }
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          ) : null}

          {/* ---------- Nearby (prototype compact cards) ---------- */}
          {nearby.length > 0 ? (
            <>
              <SectionHead
                title="Nearby opportunities"
                actionLabel="See all"
                onAction={() => router.push('/jobs')}
              />
              <View style={styles.stack}>
                {nearby.map((job) => (
                  <OpportunityCard
                    key={job.publicId}
                    variant="compact"
                    title={job.title}
                    host={job.employer.orgName}
                    location={`${job.area.name}, ${job.city}`}
                    time={`${job.startsOn} · ${job.dayStartTime}–${job.dayEndTime}`}
                    payAmount={Math.round(job.payAmountPaise / 100)}
                    paySuffix={paySuffixFor(job.payType)}
                    categoryIcon={tileFor(job.category.name, 0).icon}
                    categoryTone={tileFor(job.category.name, 0).tone}
                    photoSource={photoSourceForCategory(job.category.name) ?? undefined}
                    distanceKm={job.distanceKm}
                    hostRating={rating(job)}
                    hostVerified={job.employer.kycBadge}
                    onPress={() =>
                      router.push({
                        pathname: '/job/[publicId]',
                        params: { publicId: job.publicId },
                      })
                    }
                  />
                ))}
              </View>
            </>
          ) : null}

          {/* ---------- This week (prototype money + chart card) ---------- */}
          {earnings.isLoading ? (
            <View accessibilityLabel="This week" style={styles.weekCard}>
              <Skeleton width="55%" height={28} radius={Radius.md} />
              <Skeleton width="80%" height={12} />
              <Skeleton width="60%" height={12} />
            </View>
          ) : null}

          {earnings.data != null ? (
            <>
              <SectionHead
                title="This week"
                actionLabel={en.payments.myEarnings}
                onAction={() => router.push('/earnings')}
              />
              <View accessibilityLabel="This week" style={styles.weekCard}>
                <View style={styles.weekRow}>
                  <View style={styles.weekLeft}>
                    <MoneyDisplay amount={Math.round(weekPaise / 100)} size="hero" />
                    <Text style={styles.weekCap}>
                      From opportunities that end this week
                    </Text>
                    <Text style={styles.weekCap}>{`${weekRows.length} earning(s) · ${
                      weekRows.filter((r) => r.status !== 'PAID').length
                    } not paid yet`}</Text>
                  </View>
                  <WeekChart data={weekData} />
                </View>
              </View>
            </>
          ) : null}

          {/* ---------- profile completeness (live-only, kept for function) ---------- */}
          <Card title={en.auth.greetingWorker}>
            <View style={styles.profileRow}>
              <TrustScore score={pct} caption={en.common.profilePct(pct)} />
              <View style={styles.profileCol}>
                {kycBadge ? <WhiteWingBadge size="sm" /> : null}
                <View style={styles.profileBtns}>
                  <Button
                    label={en.auth.editProfile}
                    variant="primary"
                    onPress={() => router.push('/worker/profile')}
                  />
                  <Button
                    label={en.common.retry}
                    variant="secondary"
                    onPress={() => void me.refetch()}
                  />
                </View>
              </View>
            </View>
          </Card>

          {/* ---------- shortcuts (prototype .list-row) ---------- */}
          <View accessibilityLabel="Shortcuts" style={styles.listCol}>
            <LinkRow icon="search" label={en.jobs.title} onPress={() => router.push('/jobs')} />
            <LinkRow
              icon="paper-plane-outline"
              label={en.apps.myApplications}
              onPress={() => router.push('/applications')}
            />
            <LinkRow
              icon="time-outline"
              label={en.attendance.todayShift}
              onPress={() => router.push('/attendance')}
            />
            <LinkRow
              icon="cash-outline"
              label={en.payments.myEarnings}
              onPress={() => router.push('/earnings')}
            />
            <LinkRow icon="star-outline" label={en.ratings.title} onPress={() => router.push('/rate')} />
            <LinkRow
              icon="flash-outline"
              label={en.quickmatch.offersTitle}
              onPress={() => router.push('/offers')}
            />
            <LinkRow
              icon="help-buoy-outline"
              label={en.complaints.openList}
              onPress={() => router.push('/complaints')}
            />
            <LinkRow
              icon="shield-checkmark-outline"
              label={en.kyc.title}
              onPress={() => router.push('/verify')}
            />
            <LinkRow
              icon="notifications-outline"
              label={en.inbox.title}
              onPress={() => router.push('/inbox')}
            />
            <LinkRow icon="log-out-outline" label={en.common.logout} danger onPress={() => void logout()} />
          </View>
        </View>
      </ScrollView>
      <TabBar role="worker" active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  safeTop: {
    // prototype .statusbar — deep-teal band above the hero
    backgroundColor: Colors.light.primaryDeep,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: Spacing.three,
    gap: Spacing.mid,
    paddingBottom: 32,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.mid,
  },
  pressed: {
    opacity: 0.7,
  },

  /* ---------- hero (prototype .home-hero / --g-home) ---------- */
  heroWrap: {
    marginHorizontal: -Spacing.three,
    marginTop: -Spacing.three,
  },
  hero: {
    paddingHorizontal: Spacing.three,
    paddingTop: 18,
    paddingBottom: 58, // room for the overlapping search pill
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  hhRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    zIndex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.light.primary,
    borderWidth: 1.5,
    borderColor: Colors.light.onBrandBorder,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontFamily: Fonts.display,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.light.onPrimary,
  },
  hhGreet: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  hhHi: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimarySoft,
  },
  hhName: {
    fontFamily: Fonts.display,
    fontSize: 26,
    lineHeight: 30,
    color: Colors.light.onPrimary,
  },
  hhTag: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimarySoft,
  },
  hhLoc: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: Spacing.mid,
    minHeight: 38,
    paddingVertical: Spacing.two,
    paddingHorizontal: 14,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
    backgroundColor: Colors.light.onBrandSurface,
    borderColor: Colors.light.onBrandBorder,
    zIndex: 1,
  },
  hhLocText: {
    fontSize: 13.5,
    lineHeight: 18,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    backgroundColor: Colors.light.onBrandSurface,
    borderColor: Colors.light.onBrandBorder,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bellNub: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.light.coral,
    borderWidth: 2,
    borderColor: Colors.light.primaryDeep,
  },
  /* search overlaps the hero — prototype .searchbar { margin-top: -34px } */
  searchWrap: {
    marginTop: -34,
    paddingHorizontal: Spacing.three,
    zIndex: 2,
  },
  searchPill: {
    backgroundColor: Colors.light.card,
    borderRadius: Radius.pill,
    ...Platform.select({
      web: { boxShadow: '0 10px 24px -10px rgba(16,32,30,.35)' },
      default: {
        shadowColor: Colors.light.text,
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
      },
    }) as ViewStyle,
  },

  /* ---------- categories (prototype .cats / .c-ic) ---------- */
  catRow: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 2,
    paddingRight: Spacing.three,
  },
  cat: {
    width: 64,
    flexShrink: 0,
    alignItems: 'center',
    gap: 6,
  },
  catTile: {
    width: 52,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0 6px 14px -6px rgba(16,32,30,.40)' },
      default: { ...Elevation.card },
    }) as ViewStyle,
  },
  catLabel: {
    fontSize: 11,
    lineHeight: 13,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },

  /* ---------- section heads (prototype .section-head) ---------- */
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  headTitle: {
    fontFamily: Fonts.display,
    fontSize: 17,
    lineHeight: 21,
    color: Colors.light.text,
  },
  headLink: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primary,
  },

  skelRail: {
    flexDirection: 'row',
    gap: Spacing.mid,
    paddingRight: Spacing.three,
  },
  stack: {
    gap: Spacing.mid,
  },
  /* horizontal rail runs edge-to-edge — prototype .h-rail */
  bleed: {
    marginHorizontal: -Spacing.three,
  },
  rail: {
    flexDirection: 'row',
    gap: Spacing.mid,
    paddingHorizontal: Spacing.three,
    paddingVertical: 2,
  },
  railItem: {
    width: 262, // prototype .h-rail .opp
    flexShrink: 0,
  },

  /* ---------- this week (prototype money hero + .chart) ---------- */
  weekCard: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  weekLeft: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.half,
  },
  weekCap: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  chart: {
    width: 120,
    height: 64,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  chartCol: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
  },
  chartBar: {
    width: '100%',
    maxWidth: 34,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  chartLabel: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
  },

  /* ---------- profile card ---------- */
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  profileCol: {
    flex: 1,
    gap: Spacing.two,
  },
  profileBtns: {
    flexDirection: 'row',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },

  /* ---------- shortcuts (prototype .list-row) ---------- */
  listCol: {
    gap: 9,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    minHeight: Touch.min,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    paddingVertical: 13,
    paddingHorizontal: 14,
    ...Elevation.card,
  },
  rowTile: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 14.5,
    lineHeight: 19,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  rowLabelDanger: {
    color: Colors.light.danger,
  },
  rowPressed: {
    backgroundColor: Colors.light.backgroundSelected,
  },
});


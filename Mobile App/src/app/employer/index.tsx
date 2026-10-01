import { Ionicons } from '@expo/vector-icons';
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { attendanceApi, paymentsApi } from '@/api/attendance';
import { errorMessage } from '@/api/client';
import { authApi } from '@/api/auth';
import { jobsApi, type JobCard } from '@/api/jobs';
import { FormationAvatars } from '@/components/marketplace';
import { Button, Card, Screen } from '@/components/screen';
import { StatusChip } from '@/components/ui';
import { WingMotif } from '@/components/wingMotif';
import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
  Radius,
  Spacing,
  Touch,
  TypeScale,
} from '@/constants/theme';
import { photoSourceForCategory } from '@/constants/jobPhotos';
import { en } from '@/i18n/strings';
import { useSession } from '@/store/session';

/**
 * V3 host home (prototype #e-dash, "workforce-today hero"):
 * full-bleed `.wf-hero` (g-home gradient + wing motif + date pill + seat
 * bars), prototype `.section-head`s, `.banner` attention rows (4px tone bar),
 * `.opp` live opportunity cards (media + status + applications pill + seats +
 * pay + btn-row) and today's formation.
 * Seat dots come from the REAL hired/headcount of live Opportunities, the
 * banners are driven by real statuses (open seats, ready-to-approve
 * earnings, workers not checked in). All data is read through the existing
 * api/* functions — no new endpoints.
 */

const LIVE_STATUSES = new Set(['OPEN', 'HIRING', 'FILLED', 'IN_PROGRESS']);
const PRESENT_STATUSES = new Set(['CHECKED_IN', 'CHECKED_OUT', 'APPROVED']);
/** how many jobs we pull roster + earnings for on the home screen */
const CREW_LIMIT = 3;

const rupees = (paise: number): string => `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type Formation = {
  job: JobCard;
  names: string[];
  present: number;
  total: number;
  absent: string[];
};

/** Prototype `.banner` tones: `border-left` bar colour + `.bn-ic` tile gradient. */
type BannerTone = 'blue' | 'green' | 'amber' | 'coral';

const TONE_BAR: Record<BannerTone, string> = {
  blue: Colors.light.blue,
  green: Colors.light.green,
  amber: Colors.light.amber,
  coral: Colors.light.coral,
};

const TONE_TILE: Record<BannerTone, readonly [string, string]> = {
  blue: [Colors.light.blue, Colors.light.info],
  green: [...Gradients.money],
  amber: [...Gradients.warm],
  coral: [Colors.light.coral, Colors.light.orange],
};

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
    <View style={s.sectionHead}>
      <Text accessibilityRole="header" style={s.sectionTitle}>
        {title}
      </Text>
      {actionLabel && onAction ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          onPress={onAction}
          style={({ pressed }) => [s.sectionLink, pressed && s.pressed]}
        >
          <Text style={s.sectionLinkText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/** Prototype `.banner` — white row, 4px tone bar, tinted icon tile, sub-line. */
function AttentionRow({
  tone,
  icon,
  message,
  detail,
  action,
  onPress,
}: {
  tone: BannerTone;
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
  detail?: string;
  /** short action word — carried by the a11y label, the row itself navigates */
  action: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${message}${detail ? `. ${detail}` : ''}. ${action}`}
      onPress={onPress}
      style={({ pressed }) => [
        s.banner,
        { borderLeftColor: TONE_BAR[tone] },
        pressed && s.pressed,
      ]}
    >
      <View style={s.bannerIcon}>
        <LinearGradient
          colors={[...TONE_TILE[tone]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
        <Ionicons name={icon} size={18} color={Colors.light.onPrimary} />
      </View>
      <View style={s.bannerText}>
        <Text style={s.bannerMsg}>{message}</Text>
        {detail ? (
          <Text numberOfLines={1} style={s.bannerDetail}>
            {detail}
          </Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.light.textMuted} />
    </Pressable>
  );
}

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

/**
 * Hero: full-bleed `.wf-hero` — layered teal gradient + warm corner glow
 * (design §2 header rule), wing motif, kicker + date pill, the big
 * filled-count, the remain line, 34×10 seat bars and the warm quick-hire CTA.
 */
function WorkforceHero({
  filled,
  total,
  note,
  onFind,
}: {
  filled: number;
  total: number;
  note: string;
  onFind: () => void;
}) {
  const dots = [];
  for (let i = 0; i < total; i += 1) {
    dots.push(<View key={i} style={[s.heroBar, i < filled ? s.heroBarOn : null]} />);
  }
  const now = new Date();
  const today = `${WEEKDAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]}`;
  return (
    <View style={s.hero}>
      <LinearGradient
        colors={[...Gradients.teal]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[Colors.light.orange, 'transparent']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.1, y: 1 }}
        style={s.heroGlow}
        pointerEvents="none"
      />
      <View style={s.heroMotif} pointerEvents="none">
        <WingMotif width={230} height={150} />
      </View>
      <View style={s.heroTop}>
        <Text style={s.heroKicker}>WORKFORCE TODAY</Text>
        <View style={s.heroDate}>
          <Text style={s.heroDateText}>{today}</Text>
        </View>
      </View>
      <Text accessibilityLabel={`${filled} of ${total} seats filled`} style={s.heroNum}>
        {filled}
        <Text style={s.heroNumSub}>{` / ${total} filled`}</Text>
      </Text>
      <Text style={s.heroNote}>{note}</Text>
      <View accessibilityLabel={`${filled} of ${total} seats filled`} style={s.heroSeats}>
        {dots}
      </View>
      <View style={s.heroCta}>
        <Button label="FIND WORKERS" variant="warm" onPress={onFind} />
      </View>
    </View>
  );
}

/** One live Opportunity — prototype `.opp`: media + status/applications,
 *  date pill, title, seats + pay and the Attendance / Manage btn-row. */
function LiveOpportunity({
  job,
  onPress,
  onManage,
  onAttendance,
}: {
  job: JobCard;
  onPress: () => void;
  onManage: () => void;
  onAttendance: () => void;
}) {
  const photo = photoSourceForCategory(job.category.code ?? job.category.name);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${job.title}, ${job.hiredCount} of ${job.headcountRequired} filled`}
      onPress={onPress}
      style={({ pressed }) => [s.opp, pressed && s.pressed]}
    >
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
            <Ionicons name="people-outline" size={14} color={Colors.light.onPrimary} />
            <Text style={s.pillDarkText}>
              {job.applicationCount} {job.applicationCount === 1 ? 'application' : 'applications'}
            </Text>
          </View>
        </View>
        <View style={s.oppDist}>
          <Ionicons name="calendar-outline" size={14} color={Colors.light.onPrimary} />
          <Text style={s.pillDarkText}>{`${job.startsOn} · ${job.dayStartTime}`}</Text>
        </View>
      </View>
      <View style={s.oppBody}>
        <Text style={s.oppTitle}>{job.title}</Text>
        <View style={s.oppRow}>
          <SeatRow taken={job.hiredCount} total={job.headcountRequired} />
          <Pay label={job.payLabel} />
        </View>
        <View style={s.oppActions}>
          <View style={s.grow}>
            <Button label={en.attendance.roster} variant="secondary" size="md" onPress={onAttendance} />
          </View>
          <View style={s.grow}>
            <Button label="Manage" variant="primary" size="md" onPress={onManage} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function QuickTile({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [s.tile, pressed && s.pressed]}
    >
      <View style={s.tileIcon}>
        <Ionicons name={icon} size={20} color={Colors.light.primaryDark} />
      </View>
      <Text numberOfLines={2} style={s.tileLabel}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function EmployerHomeScreen() {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();

  const me = useQuery({ queryKey: ['me'], queryFn: authApi.me, retry: 1 });
  const mine = useQuery({ queryKey: ['jobs-mine'], queryFn: jobsApi.mine, retry: 1 });

  const jobs = mine.data ?? [];
  const crewJobs = jobs.filter((j) => j.hiredCount > 0).slice(0, CREW_LIMIT);
  const rosters = useQueries({
    queries: crewJobs.map((j) => ({
      queryKey: ['roster', j.publicId],
      queryFn: () => attendanceApi.roster(j.publicId),
      retry: 1,
    })),
  });
  const earningLists = useQueries({
    queries: crewJobs.map((j) => ({
      queryKey: ['job-earnings', j.publicId],
      queryFn: () => paymentsApi.jobEarnings(j.publicId),
      retry: 1,
    })),
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

  const orgName = me.data?.org?.orgName;
  const pct = me.data?.org?.completenessPct ?? 0;

  const live = jobs.filter((j) => LIVE_STATUSES.has(j.status));
  const filled = live.reduce((a, j) => a + j.hiredCount, 0);
  const total = live.reduce((a, j) => a + j.headcountRequired, 0);
  const seatsOpen = live.filter((j) => j.hiredCount < j.headcountRequired);
  const openSeatsCount = seatsOpen.reduce((a, j) => a + (j.headcountRequired - j.hiredCount), 0);
  const waitingApps = live.reduce((a, j) => a + j.applicationCount, 0);
  const queueJob = live.find((j) => j.applicationCount > 0) ?? seatsOpen[0] ?? null;

  // ready-to-approve earnings, summed over the jobs we loaded
  const pending = earningLists.reduce(
    (acc, q, i) => {
      const rows = (q.data?.data ?? []).filter((r) => r.status === 'ELIGIBLE');
      if (rows.length === 0) return acc;
      return {
        count: acc.count + rows.length,
        paise: acc.paise + rows.reduce((a, r) => a + r.amountPaise + r.adjustmentPaise, 0),
        job: acc.job ?? crewJobs[i],
      };
    },
    { count: 0, paise: 0, job: null as JobCard | null },
  );
  const pendingJob = pending.job;

  // today's formation — real attendance rows for the crew jobs
  let formation: Formation | null = null;
  for (let i = 0; i < rosters.length; i += 1) {
    const rows = rosters[i].data?.rows ?? [];
    if (rows.length === 0) continue;
    const absent = rows
      .filter((r) => !PRESENT_STATUSES.has(r.attendance?.status ?? ''))
      .map((r) => r.worker.fullName);
    formation = {
      job: crewJobs[i],
      names: rows.map((r) => r.worker.fullName),
      present: rows.length - absent.length,
      total: rows.length,
      absent,
    };
    break;
  }
  const today = formation;

  const heroNote =
    live.length === 0
      ? en.jobs.mineEmpty
      : `${openSeatsCount} positions remaining · ${live[0].title} starts ${live[0].dayStartTime}`;

  const goQueue = (id: string) =>
    router.push({ pathname: '/employer/queue/[publicId]', params: { publicId: id } });
  const goAttendance = (id: string) =>
    router.push({ pathname: '/employer/attendance/[publicId]', params: { publicId: id } });
  const goEarnings = (id: string) =>
    router.push({ pathname: '/employer/earnings/[publicId]', params: { publicId: id } });

  const banners: ReactNode[] = [];
  if (waitingApps > 0 && queueJob) {
    banners.push(
      <AttentionRow
        key="apps"
        tone="blue"
        icon="people"
        message={`${waitingApps} application${waitingApps === 1 ? '' : 's'} waiting`}
        detail={queueJob.title}
        action="Open queue"
        onPress={() => goQueue(queueJob.publicId)}
      />,
    );
  } else if (openSeatsCount > 0 && queueJob) {
    banners.push(
      <AttentionRow
        key="seats"
        tone="amber"
        icon="person-add"
        message={`${openSeatsCount} seat${openSeatsCount === 1 ? '' : 's'} still open`}
        detail={queueJob.title}
        action="Open queue"
        onPress={() => goQueue(queueJob.publicId)}
      />,
    );
  }
  if (pending.count > 0 && pendingJob) {
    banners.push(
      <AttentionRow
        key="money"
        tone="green"
        icon="cash"
        message={`${rupees(pending.paise)} ready to approve`}
        detail={`${pending.count} earning${pending.count === 1 ? '' : 's'} · ${pendingJob.title}`}
        action="Review"
        onPress={() => goEarnings(pendingJob.publicId)}
      />,
    );
  }
  if (today && today.absent.length > 0) {
    const n = today.absent.length;
    banners.push(
      <AttentionRow
        key="attendance"
        tone="amber"
        icon="qr-code-outline"
        message={`${n} attendance review${n === 1 ? '' : 's'}`}
        detail={
          n === 1
            ? `${today.absent[0]} hasn't checked in yet`
            : `${today.absent[0]} and ${n - 1} more not checked in`
        }
        action="Open roster"
        onPress={() => goAttendance(today.job.publicId)}
      />,
    );
  }

  return (
    <Screen title={en.employer.homeTitle} tab="home">
      <WorkforceHero
        filled={filled}
        total={total}
        note={heroNote}
        onFind={() => router.push('/employer/jobs')}
      />

      {/* §13 Quick Hire entry — one prominent card in the banner language
          (4px tone bar + display kicker), no new visual system. */}
      <View style={s.qh}>
        <Text style={s.qhKicker}>⚡ Quick Hire</Text>
        <Text style={s.bannerMsg}>Need workers urgently?</Text>
        <Text style={s.bannerDetail}>
          Find available workers nearby and fill your requirement faster.
        </Text>
        <View style={s.qhCta}>
          <Button
            label="Start Quick Hire"
            variant="warm"
            size="md"
            onPress={() => router.push('/employer/quickhire')}
          />
        </View>
      </View>

      {banners.length > 0 ? (
        <View style={s.attention}>
          <SectionHead title="Attention" />
          {banners}
        </View>
      ) : null}

      <SectionHead
        title="Live opportunities"
        actionLabel="See all"
        onAction={() => router.push('/employer/jobs')}
      />
      {mine.isError ? <Text style={s.error}>{errorMessage(mine.error)}</Text> : null}
      {live.length === 0 && !mine.isLoading ? <Text style={s.lede}>{en.jobs.mineEmpty}</Text> : null}
      {live.slice(0, 4).map((job) => (
        <LiveOpportunity
          key={job.publicId}
          job={job}
          onPress={() => router.push('/employer/jobs')}
          onManage={() => goQueue(job.publicId)}
          onAttendance={() => goAttendance(job.publicId)}
        />
      ))}

      {today && today.names.length > 0 ? (
        <>
          <SectionHead
            title="Today's formation"
            actionLabel="Roster"
            onAction={() => goAttendance(today.job.publicId)}
          />
          <View style={s.formationCard}>
            <FormationAvatars names={today.names} size={36} />
            <View style={s.formationMain}>
              <Text style={s.formationCount}>{`${today.present} of ${today.total} checked in`}</Text>
              <Text numberOfLines={1} style={s.formationSub}>
                {today.absent.length > 0
                  ? `${today.absent.join(', ')} not checked in yet`
                  : 'Everyone is checked in'}
              </Text>
            </View>
            <Button
              label="Open"
              variant="secondary"
              size="md"
              onPress={() => goAttendance(today.job.publicId)}
            />
          </View>
        </>
      ) : null}

      <Card title="Quick actions">
        <View style={s.tiles}>
          <QuickTile
            icon="person-outline"
            label={en.auth.editProfile}
            onPress={() => router.push('/employer/profile')}
          />
          <QuickTile
            icon="add-circle-outline"
            label={en.jobs.postJob}
            onPress={() => router.push('/employer/post')}
          />
          <QuickTile
            icon="document-text-outline"
            label={en.complaints.openList}
            onPress={() => router.push('/complaints')}
          />
          <QuickTile icon="shield-checkmark-outline" label={en.kyc.title} onPress={() => router.push('/verify')} />
          <QuickTile icon="notifications-outline" label={en.inbox.title} onPress={() => router.push('/inbox')} />
        </View>
      </Card>

      <Card title={en.auth.greetingEmployer}>
        <Text style={s.greeting}>{orgName ? en.auth.homeHello(orgName) : en.auth.homeNoName}</Text>
        <Text style={s.lede}>{en.common.signedInAs(en.common.roleEmployer)}</Text>
        <Text style={s.lede}>{en.common.profilePct(pct)}</Text>
        <Button label={en.common.retry} variant="secondary" onPress={() => void me.refetch()} />
        <Button label={en.common.logout} variant="danger" onPress={() => void logout()} />
      </Card>
    </Screen>
  );
}

const s = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
  error: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  lede: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  greeting: {
    ...TypeScale.titleSm,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },

  // --- hero (prototype .wf-hero) ---
  hero: {
    marginLeft: -Spacing.three,
    marginRight: -Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingTop: 20,
    paddingBottom: 18,
    gap: Spacing.one,
    backgroundColor: Colors.light.primaryDeep,
    borderBottomLeftRadius: Radius.xxl,
    borderBottomRightRadius: Radius.xxl,
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 320,
    height: 230,
    opacity: 0.4,
  },
  heroMotif: {
    position: 'absolute',
    right: -30,
    top: -40,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  heroKicker: {
    fontSize: 11.5,
    lineHeight: 16,
    letterSpacing: 1.6,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimarySoft,
  },
  heroDate: {
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1,
    borderColor: Colors.light.onBrandBorder,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: 10,
  },
  heroDateText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
  heroNum: {
    fontFamily: Fonts.display,
    fontSize: 34,
    lineHeight: 38,
    marginTop: Spacing.one,
    color: Colors.light.onPrimary,
  },
  heroNumSub: {
    fontFamily: Fonts.displaySemi,
    fontSize: 17,
    lineHeight: 22,
    color: Colors.light.onPrimarySoft,
  },
  heroNote: {
    fontSize: 13.5,
    lineHeight: 18,
    marginTop: Spacing.one,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.onPrimarySoft,
  },
  heroSeats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },
  heroBar: {
    width: 34,
    height: 10,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1.5,
    borderColor: Colors.light.onBrandBorder,
  },
  heroBarOn: {
    backgroundColor: Colors.light.yellow,
    borderColor: Colors.light.yellow,
  },
  heroCta: {
    marginTop: 14,
  },

  // --- section heads (prototype .section-head) ---
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginHorizontal: Spacing.half,
  },
  sectionTitle: {
    fontFamily: Fonts.display,
    fontSize: 17,
    lineHeight: 22,
    color: Colors.light.text,
  },
  sectionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: Touch.min / 2,
    paddingHorizontal: 6,
    paddingVertical: Spacing.one,
  },
  sectionLinkText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primary,
  },

  // --- attention (prototype .banner) ---
  attention: {
    gap: Spacing.two,
  },
  // --- §13 Quick Hire entry card (banner language, warm CTA) ---
  qh: {
    gap: Spacing.one,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.amber,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    ...Elevation.card,
  },
  qhKicker: {
    fontFamily: Fonts.display,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.2,
    color: Colors.light.text,
  },
  qhCta: {
    marginTop: Spacing.two,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderLeftWidth: 4,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    ...Elevation.card,
  },
  bannerIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bannerText: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  bannerMsg: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  bannerDetail: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
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
  oppActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  grow: {
    flex: 1,
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

  // --- formation ---
  formationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  formationMain: {
    flex: 1,
    gap: 2,
  },
  formationCount: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.text,
  },
  formationSub: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
  },

  // --- quick actions ---
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tile: {
    flexGrow: 1,
    flexBasis: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    minHeight: Touch.min * 1.6,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.one,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
  },
  tileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.tint,
  },
  tileLabel: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    textAlign: 'center',
    color: Colors.light.text,
  },
});

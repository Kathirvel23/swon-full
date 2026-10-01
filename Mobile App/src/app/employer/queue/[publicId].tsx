import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { AppError, errorMessage } from '@/api/client';
import { applicationsApi, idemKey, type DecisionAction, type QueueItem } from '@/api/applications';
import { SeatDots } from '@/components/marketplace';
import { Enter } from '@/components/motion';
import { Button, Screen } from '@/components/screen';
import { Chip, IconButton, SearchBar } from '@/components/ui';
import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
  Radius,
  Spacing,
  TypeScale,
  statusColors,
} from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/**
 * V3 application queue (prototype #e-queue) + crew tab — worker cards follow
 * the prototype `.w-card`: teal-gradient initials avatar, display-face name,
 * inline KYC indicator, muted sub line, canvas stat grid, tint skill pills,
 * soft-red conflict row (colours derived from the REJECTED status pair) and a
 * decision action row. Search + filter chips are client-side over the already
 * loaded queue (no request shape changed).
 * Every decision still carries a fresh Idempotency-Key (§8); KYC_REQUIRED,
 * CREW_DOUBLE_JOB, JOB_ALREADY_FILLED and HIRE_RACE_LOST surface unchanged.
 */

type Tone = { fg: string; bg: string };
type QueueFilter = 'all' | 'new' | 'shortlisted' | 'conflicts';

/** statuses the shared theme map does not carry yet (V3 tone pairs) */
function toneFor(status: string): Tone {
  return statusColors(status);
}

/** V3 status tag — single label + colour pair from the theme status map. */
function ToneTag({ status, label }: { status: string; label: string }) {
  const tone = toneFor(status);
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Status ${label}`}
      style={[s.tag, { backgroundColor: tone.bg, borderColor: tone.fg }]}
    >
      <Text style={[s.tagText, { color: tone.fg }]}>{label}</Text>
    </View>
  );
}

/**
 * Pastel frame for a colour pair — same 62% mix `StatusChip` uses, so the
 * conflict row's border is derived from a theme colour (no new hex).
 */
function pastelBorder(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length !== 6) return hex;
  const n = parseInt(h, 16);
  const mix = (c: number) => Math.round(c + (255 - c) * 0.62);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

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
      style={s.avatar}
    >
      <Text style={s.avatarText}>{initials}</Text>
    </LinearGradient>
  );
}

/** Prototype inline `.kyc` — green bold check when verified, amber pending. */
function KycIndicator({ verified }: { verified: boolean }) {
  return (
    <View
      accessibilityLabel={verified ? 'KYC verified' : 'KYC pending'}
      style={s.kyc}
    >
      <Ionicons
        name={verified ? 'checkmark-circle' : 'time-outline'}
        size={13}
        color={verified ? Colors.light.success : Colors.light.amber}
      />
      <Text style={[s.kycText, { color: verified ? Colors.light.success : Colors.light.amber }]}>
        {verified ? 'KYC' : 'KYC pending'}
      </Text>
    </View>
  );
}

/** Prototype `.wc-stat` — canvas box, bold value + muted label at 11.5. */
function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

/** Prototype `.conflict` — soft red row derived from statusColors('REJECTED'). */
function ConflictRow({ message }: { message: string }) {
  const tone = statusColors('REJECTED');
  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={message}
      style={[s.conflict, { backgroundColor: tone.bg, borderColor: pastelBorder(tone.fg) }]}
    >
      <Ionicons name="alert-circle" size={16} color={Colors.light.danger} />
      <Text style={s.conflictText}>{message}</Text>
    </View>
  );
}

export default function EmployerQueueScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();
  const [tab, setTab] = useState<'queue' | 'crew'>('queue');
  const [releaseFor, setReleaseFor] = useState<string | null>(null);
  const [releaseReason, setReleaseReason] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<QueueFilter>('all');

  const queue = useQuery({
    queryKey: ['queue', publicId],
    queryFn: () => applicationsApi.queue(String(publicId)),
    retry: 1,
    enabled: tab === 'queue',
  });
  const crew = useQuery({
    queryKey: ['crew', publicId],
    queryFn: () => applicationsApi.roster(String(publicId)),
    retry: 1,
    enabled: tab === 'crew',
  });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['queue', publicId] });
    await queryClient.invalidateQueries({ queryKey: ['crew', publicId] });
    await queryClient.invalidateQueries({ queryKey: ['jobs-mine'] });
    await queryClient.invalidateQueries({ queryKey: ['jobs-feed'] });
    await queryClient.invalidateQueries({ queryKey: ['my-apps'] });
    await queryClient.invalidateQueries({ queryKey: ['job', publicId] });
  };

  const decide = (applicationId: string, action: DecisionAction, extra?: { note?: string; reason?: string }) => {
    void applicationsApi
      .decide(applicationId, action, idemKey(`dec-${action}`), extra)
      .then(async () => {
        await refresh();
      })
      .catch((e: unknown) => {
        if (e instanceof AppError && e.code === 'KYC_REQUIRED') {
          showAlert(en.apps.hire, errorMessage(e), [
            { text: en.common.cancel, style: 'cancel' },
            { text: en.kyc.title, onPress: () => router.push('/verify') },
          ]);
          return;
        }
        showAlert(en.apps.decided, errorMessage(e));
      });
  };

  const confirmRelease = (applicationId: string) => {
    const reason = releaseReason.trim();
    if (!reason) {
      showAlert(en.apps.release, en.apps.releaseReasonRequired);
      return;
    }
    setReleaseFor(null);
    setReleaseReason('');
    decide(applicationId, 'release', { reason });
  };

  const actionButtons = (item: QueueItem) => {
    const { publicId: appId, status } = item.application;
    if (status === 'HIRED') {
      return (
        <View style={s.actionCol}>
          {releaseFor === appId ? (
            <>
              <TextInput
                value={releaseReason}
                onChangeText={setReleaseReason}
                placeholder={en.apps.releasePlaceholder}
                placeholderTextColor={Colors.light.textMuted}
                accessibilityLabel={en.apps.releasePlaceholder}
                style={s.reasonInput}
              />
              <View style={s.actions}>
                <View style={s.grow}>
                  <Button label={en.apps.release} variant="primary" onPress={() => confirmRelease(appId)} />
                </View>
                <View style={s.grow}>
                  <Button label={en.common.cancel} variant="secondary" onPress={() => setReleaseFor(null)} />
                </View>
              </View>
            </>
          ) : (
            <Button label={en.apps.release} variant="secondary" onPress={() => setReleaseFor(appId)} />
          )}
        </View>
      );
    }
    const buttons: { label: string; action: DecisionAction; variant: 'primary' | 'secondary' | 'danger' }[] = [];
    if (status === 'APPLIED') {
      buttons.push({ label: en.apps.shortlist, action: 'shortlist', variant: 'secondary' });
      buttons.push({ label: en.apps.waitlist, action: 'waitlist', variant: 'secondary' });
    }
    if (status === 'WAITLISTED') buttons.push({ label: en.apps.shortlist, action: 'shortlist', variant: 'secondary' });
    if (status === 'SHORTLISTED') buttons.push({ label: en.apps.waitlist, action: 'waitlist', variant: 'secondary' });
    if (['APPLIED', 'SHORTLISTED', 'WAITLISTED'].includes(status)) {
      buttons.push({ label: en.apps.hire, action: 'hire', variant: 'primary' });
      buttons.push({ label: en.apps.reject, action: 'reject', variant: 'danger' });
    }
    // prototype `.wc-actions`: modifiers first, then the wide BOND (primary)
    // beside the reject action.
    const modifiers = buttons.filter((b) => b.variant === 'secondary');
    const hire = buttons.find((b) => b.variant === 'primary');
    const reject = buttons.find((b) => b.variant === 'danger');
    const render = (b: (typeof buttons)[number], style: object) => (
      <View key={b.action} style={style}>
        <Button label={b.label} variant={b.variant} onPress={() => decide(appId, b.action)} />
      </View>
    );
    return (
      <View style={s.actionCol}>
        {modifiers.length > 0 ? (
          <View style={s.actions}>{modifiers.map((b) => render(b, s.grow))}</View>
        ) : null}
        {hire || reject ? (
          <View style={s.actions}>
            {hire ? render(hire, s.strong) : null}
            {reject ? render(reject, s.grow) : null}
          </View>
        ) : null}
      </View>
    );
  };

  const queueItems = queue.data ?? [];
  const roster = crew.data;

  const needle = query.trim().toLowerCase();
  const newCount = queueItems.filter((i) => i.application.status === 'APPLIED').length;
  const shortlistedCount = queueItems.filter((i) => i.application.status === 'SHORTLISTED').length;
  const conflictCount = queueItems.filter((i) => i.application.conflictWarning).length;
  const visibleItems = queueItems.filter((item) => {
    const w = item.application.worker;
    if (filter === 'new' && item.application.status !== 'APPLIED') return false;
    if (filter === 'shortlisted' && item.application.status !== 'SHORTLISTED') return false;
    if (filter === 'conflicts' && !item.application.conflictWarning) return false;
    if (!needle) return true;
    return (
      w.fullName.toLowerCase().includes(needle) ||
      w.skills.some((sk) => sk.name.toLowerCase().includes(needle))
    );
  });

  const queueFilters: { key: QueueFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'new', label: `New (${newCount})` },
    { key: 'shortlisted', label: `Shortlisted (${shortlistedCount})` },
    { key: 'conflicts', label: `Conflicts (${conflictCount})` },
  ];

  return (
    <Screen
      title={en.apps.queue}
      headerLeft={
        <IconButton
          name="chevron-back"
          accessibilityLabel={en.common.back}
          tone="onBrand"
          color={Colors.light.onPrimary}
          onPress={() => router.back()}
        />
      }
    >
      <View style={s.segment}>
        <View style={s.grow}>
          <Button
            label={en.apps.queueTab}
            variant={tab === 'queue' ? 'primary' : 'secondary'}
            size="md"
            onPress={() => setTab('queue')}
          />
        </View>
        <View style={s.grow}>
          <Button
            label={en.apps.crewTab}
            variant={tab === 'crew' ? 'primary' : 'secondary'}
            size="md"
            onPress={() => setTab('crew')}
          />
        </View>
      </View>

      <View style={s.actions}>
        <View style={s.grow}>
          <Button
            label={en.quickmatch.openLaunch}
            variant="warm"
            size="md"
            onPress={() =>
              router.push({ pathname: '/employer/quickmatch/[publicId]', params: { publicId: String(publicId) } })
            }
          />
        </View>
        <View style={s.grow}>
          <Button
            label={en.quickmatch.openCandidates}
            variant="secondary"
            size="md"
            onPress={() =>
              router.push({ pathname: '/employer/candidates/[publicId]', params: { publicId: String(publicId) } })
            }
          />
        </View>
      </View>

      {tab === 'queue' ? (
        <>
          <SearchBar
            placeholder="Search name or skill"
            value={query}
            onChangeText={setQuery}
          />
          <View style={s.chipRow}>
            {queueFilters.map((f) => (
              <Chip
                key={f.key}
                label={f.label}
                size="sm"
                selected={filter === f.key}
                onPress={() => setFilter(f.key)}
              />
            ))}
          </View>

          {queue.isError ? <Text style={s.error}>{errorMessage(queue.error)}</Text> : null}
          {queueItems.length === 0 && !queue.isLoading ? <Text style={s.lede}>{en.apps.queueEmpty}</Text> : null}
          {queueItems.length > 0 && visibleItems.length === 0 ? (
            <Text style={s.lede}>No worker matches this search or filter.</Text>
          ) : null}
          {visibleItems.map((item, index) => {
            const w = item.application.worker;
            const skills = w.skills.map((sk) => sk.name);
            const rating = w.ratingsCount > 0 ? (w.avgRatingMilli / 1000).toFixed(1) : null;
            return (
              <Enter key={item.application.publicId} delay={Math.min(index, 6) * 60}>
                <View style={s.card}>
                  <View style={s.cardTop}>
                    <GradientAvatar name={w.fullName} />
                    <View style={s.cardTopMain}>
                      <View style={s.nameRow}>
                        <Text numberOfLines={1} style={s.name}>
                          {w.fullName}
                        </Text>
                        <KycIndicator verified={w.kycBadge} />
                        <View style={s.rating}>
                          <Ionicons name="star" size={12} color={Colors.light.amber} />
                          <Text style={s.ratingText}>
                            {rating ?? (w.ratingsCount > 0 ? '—' : 'New')}
                          </Text>
                        </View>
                      </View>
                      <Text style={s.meta}>
                        {`${en.apps.jobsDone(w.jobsDoneCount)} · ${w.ratingsCount} ratings`}
                      </Text>
                    </View>
                    <ToneTag
                      status={item.application.status}
                      label={en.apps.status[item.application.status] ?? item.application.status}
                    />
                  </View>

                  <View style={s.statGrid}>
                    <StatBox value={rating ?? '—'} label="rating" />
                    <StatBox value={String(w.jobsDoneCount)} label="opportunities" />
                    <StatBox value={String(w.ratingsCount)} label="ratings" />
                    <StatBox value={item.application.appliedAt.slice(0, 10)} label="applied" />
                  </View>

                  {skills.length > 0 ? (
                    <View style={s.skills}>
                      {skills.slice(0, 6).map((name) => (
                        <View key={name} style={s.skillPill}>
                          <Text style={s.skillPillText}>{name}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}

                  {item.application.coverNote ? (
                    <Text style={s.note}>{item.application.coverNote}</Text>
                  ) : null}
                  {item.application.conflictWarning ? <ConflictRow message={en.apps.conflict} /> : null}
                  {actionButtons(item)}
                </View>
              </Enter>
            );
          })}
          <View style={s.asideNote}>
            <Text style={s.asideNoteText}>
              Match scores weigh skills, distance, availability and past performance. Conflicting
              bonds can&apos;t overlap — the queue tells you before you tap.
            </Text>
          </View>
        </>
      ) : (
        <>
          {crew.isError ? <Text style={s.error}>{errorMessage(crew.error)}</Text> : null}
          {roster ? (
            <View style={s.summary}>
              <View style={s.summaryMain}>
                <Text style={s.summaryTitle}>{en.apps.seats(roster.summary.seatsFilled, roster.summary.seatsRequired)}</Text>
                <Text style={s.meta}>{en.jobs.status[roster.summary.jobStatus] ?? roster.summary.jobStatus}</Text>
                {roster.summary.seatsReleased > 0 ? (
                  <Text style={s.meta}>{`${roster.summary.seatsReleased} released`}</Text>
                ) : null}
              </View>
              <SeatDots taken={roster.summary.seatsFilled} total={roster.summary.seatsRequired} />
            </View>
          ) : null}
          {(roster?.items.length ?? 0) === 0 && !crew.isLoading ? <Text style={s.lede}>{en.apps.crewEmpty}</Text> : null}
          {(roster?.items ?? []).map((member, index) => {
            const rating =
              member.worker.ratingsCount > 0 ? (member.worker.avgRatingMilli / 1000).toFixed(1) : null;
            return (
              <Enter key={member.publicId} delay={Math.min(index, 6) * 60}>
                <View style={s.card}>
                  <View style={s.cardTop}>
                    <GradientAvatar name={member.worker.fullName} />
                    <View style={s.cardTopMain}>
                      <View style={s.nameRow}>
                        <Text numberOfLines={1} style={s.name}>
                          {member.worker.fullName}
                        </Text>
                        <KycIndicator verified={member.worker.kycBadge} />
                        <View style={s.rating}>
                          <Ionicons name="star" size={12} color={Colors.light.amber} />
                          <Text style={s.ratingText}>
                            {rating ?? (member.worker.ratingsCount > 0 ? '—' : 'New')}
                          </Text>
                        </View>
                      </View>
                      <Text style={s.meta}>{`Hired ${member.hiredAt.slice(0, 10)}`}</Text>
                    </View>
                    <ToneTag status={member.status} label={member.status} />
                  </View>

                  <View style={s.statGrid}>
                    <StatBox value={rating ?? '—'} label="rating" />
                    <StatBox value={String(member.worker.ratingsCount)} label="ratings" />
                    <StatBox
                      value={member.worker.experienceYears != null ? `${member.worker.experienceYears} yrs` : '—'}
                      label="experience"
                    />
                    <StatBox value={member.hiredAt.slice(0, 10)} label="hired" />
                  </View>

                  {member.worker.skills.length > 0 ? (
                    <View style={s.skills}>
                      {member.worker.skills.slice(0, 6).map((sk) => (
                        <View key={sk.skillId} style={s.skillPill}>
                          <Text style={s.skillPillText}>{sk.name}</Text>
                        </View>
                      ))}
                    </View>
                  ) : null}
                  {member.releasedReason ? (
                    <Text style={s.release}>{`${en.apps.release}: ${member.releasedReason}`}</Text>
                  ) : null}
                </View>
              </Enter>
            );
          })}
        </>
      )}

      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

const s = StyleSheet.create({
  lede: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  error: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  segment: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actionCol: {
    gap: Spacing.two,
    marginTop: Spacing.half,
  },
  grow: {
    flex: 1,
  },
  strong: {
    flex: 1.3,
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
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.mid,
  },
  cardTopMain: {
    flex: 1,
    gap: 2,
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
    flexWrap: 'wrap',
    gap: 6,
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
  conflict: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    borderWidth: 1,
    borderRadius: Radius.sm,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: Spacing.half,
  },
  conflictText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 17,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.danger,
  },
  note: {
    ...TypeScale.bodySm,
    fontStyle: 'italic',
    color: Colors.light.textSecondary,
  },
  release: {
    ...TypeScale.caption,
    color: Colors.light.danger,
  },
  tag: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  tagText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    letterSpacing: 0.3,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  summaryMain: {
    flex: 1,
    gap: 2,
  },
  summaryTitle: {
    ...TypeScale.titleSm,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.primaryDeep,
  },
  asideNote: {
    backgroundColor: Colors.light.background, // prototype .aside-note cream
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.light.border,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  asideNoteText: {
    fontSize: 13.5,
    lineHeight: 22,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  reasonInput: {
    ...TypeScale.body,
    color: Colors.light.text,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.mid,
    paddingVertical: Spacing.two,
    minHeight: 48,
  },
});

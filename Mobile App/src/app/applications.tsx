import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { applicationsApi } from '@/api/applications';
import { authApi } from '@/api/auth';
import { errorMessage } from '@/api/client';
import { AttentionBanner } from '@/components/marketplace';
import { Skeleton, SkeletonLines } from '@/components/motion';
import { Button, Screen } from '@/components/screen';
import { Chip, StatusChip } from '@/components/ui';
import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
  Radius,
  Spacing,
  TypeScale,
} from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/**
 * Wave 4 (H6 worker side) — my applications as the V3 ACTIVITY screen
 * (UI_PROTOTYPE §w-activity): filter chips, then one white .w-card per
 * request — teal initial avatar, job name + inline KYC flag, StatusChip,
 * canvas stat boxes and an action row. Same queries, same withdraw/detail
 * handlers; the status history stays honest (only what the server told us).
 */

/** Prototype §w-activity English copy (no i18n keys yet). */
const ACTIVITY_SUB = "Everything you've sent — and what happened next";
const NEW_LABEL = 'New';
const SENT_PREFIX = 'Sent';
const ACCEPTED_IN = 'accepted in';
const FILTER_EMPTY = 'Nothing in this filter yet.';
const KYC_VERIFIED = 'KYC verified';
const KYC_PENDING = 'KYC pending';

type Filter = 'ALL' | 'SENT' | 'RESPONSES' | 'HIRED';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'ALL', label: 'All' },
  { key: 'SENT', label: 'Sent' },
  { key: 'RESPONSES', label: 'Responses' },
  { key: 'HIRED', label: 'Hired' },
];

const FILTER_STATUSES: Record<Exclude<Filter, 'ALL'>, string[]> = {
  SENT: ['APPLIED'],
  RESPONSES: ['SHORTLISTED', 'WAITLISTED', 'REJECTED', 'CANCELLED', 'EXPIRED'],
  HIRED: ['HIRED'],
};

const stamp = (iso?: string | null): string | undefined => {
  if (iso == null) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/** "1h 22m" between two ISO stamps — real elapsed time, never invented. */
function elapsed(from: string, to?: string | null): string | undefined {
  if (to == null) return undefined;
  const a = new Date(from).getTime();
  const b = new Date(to).getTime();
  if (Number.isNaN(a) || Number.isNaN(b) || b <= a) return undefined;
  const minutes = Math.round((b - a) / 60000);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const out = parts.map((w) => w.charAt(0)).join('');
  return out.toUpperCase() || '?';
}

/** Prototype `.kyc` — green check when verified, amber while pending. */
function KycFlag({ verified }: { verified?: boolean }) {
  if (verified == null) return null;
  const color = verified ? Colors.light.success : Colors.light.amber;
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Your identity verification ${verified ? 'verified' : 'pending'}`}
      style={styles.kyc}
    >
      <Ionicons
        name={verified ? 'checkmark-circle' : 'time-outline'}
        size={13}
        color={color}
      />
      <Text style={[styles.kycText, { color }]}>{verified ? KYC_VERIFIED : KYC_PENDING}</Text>
    </View>
  );
}

export default function ApplicationsScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<Filter>('ALL');

  const mine = useQuery({ queryKey: ['my-apps'], queryFn: () => applicationsApi.mine(), retry: 1 });
  const active = useQuery({
    queryKey: ['my-apps-active'],
    queryFn: () => applicationsApi.mine({ active: true }),
    retry: 1,
  });
  // shared ['me'] cache — carries the worker's own KYC flag (no invented data)
  const me = useQuery({ queryKey: ['me'], queryFn: authApi.me, retry: 1 });

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['my-apps'] });
    await queryClient.invalidateQueries({ queryKey: ['my-apps-active'] });
  };

  const withdraw = (applicationId: string, jobTitle: string) => {
    showAlert(`${en.apps.withdraw} — ${jobTitle}`, en.apps.withdrawConfirm, [
      { text: en.common.cancel, style: 'cancel' },
      {
        text: en.apps.withdraw,
        style: 'destructive',
        onPress: () => {
          void applicationsApi
            .withdraw(applicationId)
            .then(refresh)
            .catch((e: unknown) => showAlert(en.apps.withdraw, errorMessage(e)));
        },
      },
    ]);
  };

  const payUnit = (type: string): string => (type === 'DAY' ? '/ day' : type === 'HOUR' ? '/ hour' : 'total');

  const all = mine.data ?? [];
  const rows = filter === 'ALL' ? all : all.filter((a) => FILTER_STATUSES[filter].includes(a.status));
  const liveStatuses = ['APPLIED', 'SHORTLISTED', 'WAITLISTED', 'HIRED'];
  const kyc = me.data?.workerProfile?.kycBadge;

  return (
    <Screen
      title={en.apps.myApplications}
      headerLeft={<View />}
      headerSub={<Text style={styles.headerSub}>{ACTIVITY_SUB}</Text>}
      headerRight={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={NEW_LABEL}
          onPress={() => router.push('/jobs')}
          style={({ pressed }) => [styles.tinyBtn, pressed && styles.tinyBtnPressed]}
        >
          <Ionicons name="add" size={16} color={Colors.light.onPrimary} />
          <Text style={styles.tinyBtnText}>{NEW_LABEL}</Text>
        </Pressable>
      }
    >
      {mine.isError ? <Text style={styles.errorText}>{errorMessage(mine.error)}</Text> : null}
      {typeof active.data?.length === 'number' ? (
        <Text style={styles.summary}>{`${en.apps.openApps}: ${active.data.length}`}</Text>
      ) : null}

      <View style={styles.chipRow}>
        {FILTERS.map((f) => (
          <Chip
            key={f.key}
            label={f.label}
            selected={filter === f.key}
            onPress={() => setFilter(f.key)}
          />
        ))}
      </View>

      {rows.length === 0 && !mine.isLoading ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>{all.length === 0 ? en.apps.empty : FILTER_EMPTY}</Text>
        </View>
      ) : null}

      {mine.isLoading ? (
        <>
          {[0, 1].map((i) => (
            <View key={`app-skel-${i}`} style={styles.skelCard}>
              <Skeleton width="55%" height={16} />
              <SkeletonLines lines={4} />
              <Skeleton width="40%" height={14} />
            </View>
          ))}
        </>
      ) : null}

      {rows.map((app) => {
        const sent = stamp(app.appliedAt);
        const decided = stamp(app.decidedAt);
        const took = elapsed(app.appliedAt, app.decidedAt);
        const isLive = liveStatuses.includes(app.status);
        return (
          <View key={app.publicId} style={styles.wCard}>
            <View style={styles.wcTop}>
              <LinearGradient
                colors={[...Gradients.teal]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.wcAvatar}
              >
                <Text style={styles.wcAvatarText}>{initialsFor(app.job.employerName)}</Text>
              </LinearGradient>
              <View style={styles.wcId}>
                <View style={styles.wcNameRow}>
                  <Text numberOfLines={1} style={styles.wcName}>
                    {app.job.title}
                  </Text>
                  <KycFlag verified={kyc} />
                </View>
                <Text numberOfLines={1} style={styles.wcSub}>
                  {`${app.job.employerName} · ${app.job.areaName}, ${app.job.city}`}
                </Text>
              </View>
              <StatusChip status={app.status} size="sm" />
            </View>

            <Text style={styles.wcStamp}>
              {`${SENT_PREFIX} ${sent ?? '—'}${
                app.status === 'HIRED' && took
                  ? ` → ${ACCEPTED_IN} ${took}`
                  : decided
                    ? ` → ${decided}`
                    : ''
              }`}
            </Text>

            <View style={styles.wcGrid}>
              <Text style={styles.wcStat}>
                <Text style={styles.wcStatValue}>
                  {`₹${Math.round(app.job.payAmountPaise / 100).toLocaleString('en-IN')}`}
                </Text>
                {` ${payUnit(app.job.payType)}`}
              </Text>
              <Text style={styles.wcStat}>
                <Text style={styles.wcStatValue}>{`${app.job.startsOn} → ${app.job.endsOn}`}</Text>
              </Text>
              <Text style={styles.wcStat}>
                <Text style={styles.wcStatValue}>
                  {en.shell.seatsShort(app.job.hiredCount, app.job.headcountRequired)}
                </Text>
              </Text>
            </View>

            {app.crewSeat === 'ACTIVE' ? (
              <Text style={styles.seatActive}>{en.apps.seatActive}</Text>
            ) : null}
            {app.crewSeat === 'RELEASED' ? (
              <Text style={styles.wcSub}>{en.apps.seatReleased}</Text>
            ) : null}
            {app.decisionNote && ['CANCELLED', 'REJECTED'].includes(app.status) ? (
              <AttentionBanner tone="coral" icon="alert-circle" message={app.decisionNote} />
            ) : null}

            <View style={styles.wcActions}>
              {isLive ? (
                <View style={styles.wcAction}>
                  <Button
                    label={en.apps.withdraw}
                    variant="secondary"
                    onPress={() => withdraw(app.publicId, app.job.title)}
                  />
                </View>
              ) : null}
              <View style={styles.wcAction}>
                <Button
                  label={en.jobs.viewDetail}
                  variant="ghost"
                  onPress={() =>
                    router.push({ pathname: '/job/[publicId]', params: { publicId: app.job.publicId } })
                  }
                />
              </View>
            </View>
          </View>
        );
      })}

      <Button label={en.common.retry} variant="secondary" onPress={() => void mine.refetch()} />
      <Button label={en.common.back} variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerSub: {
    ...TypeScale.caption,
    color: Colors.light.onPrimarySoft,
    fontFamily: Fonts.bodySemi,
  },
  tinyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: Spacing.mid,
    borderRadius: Radius.btn,
    backgroundColor: Colors.light.onBrandSurface,
    borderWidth: 1.5,
    borderColor: Colors.light.onBrandBorder,
  },
  tinyBtnPressed: { opacity: 0.82 },
  tinyBtnText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },

  errorText: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  summary: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.four,
  },
  emptyText: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
    textAlign: 'center',
    fontFamily: Fonts.bodySemi,
  },
  skelCard: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },

  /* prototype .w-card */
  wCard: {
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  wcTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.mid },
  wcAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
  },
  wcAvatarText: { fontFamily: Fonts.display, fontSize: 16, color: Colors.light.onPrimary },
  wcId: { flex: 1, minWidth: 0, gap: 2 },
  wcNameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, flexWrap: 'wrap' },
  wcName: { fontFamily: Fonts.display, fontSize: 16.5, lineHeight: 21, color: Colors.light.text },
  wcSub: { fontSize: 12, lineHeight: 16, fontFamily: Fonts.bodySemi, color: Colors.light.textMuted },
  wcStamp: { ...TypeScale.caption, fontFamily: Fonts.bodySemi, color: Colors.light.textMuted },

  kyc: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  kycText: { ...TypeScale.caption, fontFamily: Fonts.bodyExtra },

  wcGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, marginTop: Spacing.half },
  wcStat: {
    fontSize: 11.5,
    lineHeight: 16,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.sm,
    paddingVertical: 6,
    paddingHorizontal: Spacing.two,
    overflow: 'hidden',
  },
  wcStatValue: { fontFamily: Fonts.bodyExtra, color: Colors.light.text },
  seatActive: { ...TypeScale.bodySm, fontFamily: Fonts.bodyBold, color: Colors.light.success },
  wcActions: { flexDirection: 'row', gap: 9, marginTop: Spacing.one },
  wcAction: { flex: 1 },
});

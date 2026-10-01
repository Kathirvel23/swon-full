import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { authApi, type AvailabilitySlotInput } from '@/api/auth';
import { Avatar, Chip } from '@/components/ui';
import { AttentionBanner, ProgressRing, WhiteWingBadge } from '@/components/marketplace';
import { Button, Card, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Gradients, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { useSession } from '@/store/session';

/**
 * H2 — worker profile management (W1 build list: profiles/skills/availability/
 * photo), re-skinned to V3 "Me" (UI_PROTOTYPE §w-me): mini-profile header,
 * trust ring + stat tiles + bars, then the edit sections and the ACCOUNT
 * list rows. Everything PUT/PATCH here is replace/patch-all against
 * self-scoped endpoints; every save invalidates ['me'] so homes and this
 * screen re-read.
 */

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

/** V3 stat-tile labels (no i18n keys yet). */
const STAT_RATING = 'Rating';
const STAT_DONE = 'Completed';
const STAT_REVIEWS = 'Reviews';

/** Prototype §w-me English copy (no i18n keys yet). */
const TRUST_LABEL = '★ TRUSTSCORE';
const BAR_PROFILE = 'Profile completion';
const BAR_RATING = 'Rating';
const ACCOUNT_TITLE = 'ACCOUNT';
const SESSIONS_TITLE = 'SESSIONS';
const PROFILE_PHOTOS = 'Profile & photos';
const LANGUAGE_TITLE = 'Language';
const LANGUAGE_SUB = 'English';
const SWITCH_ROLE = 'Switch role';
const ROLE_NOW = 'Currently';
const DOCS_TITLE = 'KYC & documents';
const DOCS_OK = 'WhiteWing verified';
const NOTIF_TITLE = 'Notifications';
const NOTIF_SUB = 'Push notifications · SMS messages';
const THIS_DEVICE = 'This device';
const OTHER_DEVICE = 'Another device';
const LAST_USED = 'Last used';
const NO_TIME = '—';
const KYC_VERIFIED = 'KYC verified';
const KYC_PENDING = 'KYC pending';
const MAX_SESSIONS = 5;

type SessionRow = {
  publicId: string;
  userAgent?: string | null;
  issuedAt?: string;
  lastUsedAt?: string | null;
  current?: boolean;
};

type SlotDraft = { date: string; fromTime: string; toTime: string; areaId?: string };

/** Short, human device label — the raw user-agent never fits a row. */
function deviceLabel(ua?: string | null): string {
  if (!ua) return OTHER_DEVICE;
  const hit = /(iPhone|iPad|Android|Windows|Mac|Linux|Expo)/i.exec(ua);
  return hit ? `${hit[1]} session` : 'Browser session';
}

function stamp(iso?: string | null): string | undefined {
  if (iso == null) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Prototype `.block-title` — display face + tinted icon tile. */
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
      <Text style={styles.blockTitleText}>{children}</Text>
    </View>
  );
}

/** Prototype `.list-row` — 36px tint tile, title 14.5, muted sub, chevron. */
function ListRow({
  icon,
  title,
  sub,
  onPress,
  trailing,
  chevron = true,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  sub?: string;
  onPress?: () => void;
  trailing?: ReactNode;
  chevron?: boolean;
}) {
  const body = (
    <>
      <View style={styles.lrIcon}>
        <Ionicons name={icon} size={18} color={Colors.light.primary} />
      </View>
      <View style={styles.lrText}>
        <Text numberOfLines={1} style={styles.lrTitle}>
          {title}
        </Text>
        {sub ? (
          <Text numberOfLines={1} style={styles.lrSub}>
            {sub}
          </Text>
        ) : null}
      </View>
      {trailing ??
        (chevron ? <Ionicons name="chevron-forward" size={18} color={Colors.light.textMuted} /> : null)}
    </>
  );
  if (!onPress) {
    return <View style={styles.listRow}>{body}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={sub ? `${title}. ${sub}` : title}
      onPress={onPress}
      style={({ pressed }) => [styles.listRow, pressed && styles.listRowPressed]}
    >
      {body}
    </Pressable>
  );
}

/** Prototype `.bars` — teal gradient fill on a hairline track. */
function BarRow({ label, percent, display }: { label: string; percent: number; display: string }) {
  const width = `${Math.max(0, Math.min(100, percent))}%` as `${number}%`;
  return (
    <View style={styles.barRow}>
      <Text numberOfLines={1} style={styles.barLabel}>
        {label}
      </Text>
      <View style={styles.barTrack}>
        <LinearGradient
          colors={[...Gradients.teal]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barFill, { width }]}
        />
      </View>
      <Text style={styles.barValue}>{display}</Text>
    </View>
  );
}

/** Prototype `.stat-tiles .tile` — canvas card, display value, muted label. */
function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

export default function WorkerProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const session = useSession();

  const me = useQuery({ queryKey: ['me'], queryFn: authApi.me, retry: 1 });
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: authApi.catalog, retry: 1 });
  const sessions = useQuery({ queryKey: ['auth-sessions'], queryFn: authApi.sessions, retry: 0 });

  const [seeded, setSeeded] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [openToWork, setOpenToWork] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [slots, setSlots] = useState<SlotDraft[]>([]);
  const [avDate, setAvDate] = useState('');
  const [avFrom, setAvFrom] = useState('');
  const [avTo, setAvTo] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const wp = me.data?.workerProfile;
    if (wp && !seeded) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time seed of form defaults when the profile payload first arrives
      setFullName(wp.fullName);
      setBio(wp.bio ?? '');
      setExperienceYears(wp.experienceYears != null ? String(wp.experienceYears) : '');
      setOpenToWork(wp.openToWork);
      setSelectedSkills(new Set(wp.skills.map((s) => s.skillId)));
      setSlots(wp.availability.map((s) => ({ date: s.date, fromTime: s.fromTime, toTime: s.toTime, areaId: s.areaId ?? undefined })));
      setSeeded(true);
    }
  }, [me.data, seeded]);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['me'] });
  const flash = (note: string) => {
    setSavedNote(note);
    setError(null);
    setTimeout(() => setSavedNote(null), 2500);
  };

  const saveAbout = async () => {
    setBusy(true);
    try {
      await authApi.patchWorker({
        fullName: fullName.trim(),
        bio: bio.trim(),
        experienceYears: Math.min(50, Math.max(0, Number(experienceYears) || 0)),
        openToWork,
      });
      await invalidate();
      flash(en.auth.saved);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const saveSkills = async () => {
    setBusy(true);
    try {
      await authApi.putSkills([...selectedSkills].map((skillId) => ({ skillId })));
      await invalidate();
      flash(en.auth.saved);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const addSlot = () => {
    setError(null);
    if (!DATE_RE.test(avDate) || !TIME_RE.test(avFrom) || !TIME_RE.test(avTo) || avFrom >= avTo) {
      setError(en.auth.avInvalid);
      return;
    }
    setSlots((prev) => [...prev, { date: avDate, fromTime: avFrom, toTime: avTo }]);
    setAvDate('');
    setAvFrom('');
    setAvTo('');
  };

  const saveAvailability = async () => {
    setBusy(true);
    try {
      await authApi.putAvailability(slots as AvailabilitySlotInput[]);
      await invalidate();
      flash(en.auth.saved);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const pickPhoto = async () => {
    setError(null);
    try {
      const ImagePicker = await import('expo-image-picker');
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        setError(en.auth.photoFailed);
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
      if (result.canceled || !result.assets[0]) return;
      const asset = result.assets[0];
      setBusy(true);
      await authApi.uploadPhoto({
        uri: asset.uri,
        name: asset.fileName ?? 'profile.jpg',
        type: asset.mimeType ?? 'image/jpeg',
      });
      await invalidate();
      flash(en.auth.saved);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  };

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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

  const wp = me.data?.workerProfile ?? null;
  const photoUrl = wp?.photoUrl ?? null;
  const avg = wp ? (wp.avgRatingMilli / 1000).toFixed(1) : '0.0';
  const pct = wp?.profileCompletePct ?? 0;
  const rated = (wp?.ratingsCount ?? 0) > 0;
  const initials = (wp?.fullName ?? '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase();
  /** ring fill: rating out of 5 (prototype --trust), falls back to completion */
  const ringPercent = rated ? Math.round(((wp?.avgRatingMilli ?? 0) / 5000) * 100) : pct;
  const sessionRows = ((sessions.data?.sessions ?? []) as SessionRow[]).slice(0, MAX_SESSIONS);

  return (
    <Screen title={en.auth.greetingWorker} tab="profile">
      {me.isError ? <Text style={styles.error}>{errorMessage(me.error)}</Text> : null}

      {wp ? (
        <>
          {/* prototype .mini-profile — 58px teal avatar, display name, KYC inline */}
          <View style={styles.miniProfile}>
            {photoUrl ? (
              <Image
                source={{ uri: photoUrl }}
                style={styles.mpAvatar}
                accessibilityLabel={en.auth.photoTitle}
              />
            ) : (
              <LinearGradient
                colors={[...Gradients.teal]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mpAvatar}
              >
                <Text style={styles.mpInitials}>{initials}</Text>
              </LinearGradient>
            )}
            <View style={styles.mpText}>
              <View style={styles.mpNameRow}>
                <Text numberOfLines={1} style={styles.mpName}>
                  {wp.fullName}
                </Text>
                {wp.kycBadge ? <WhiteWingBadge size="sm" /> : null}
              </View>
              <View style={styles.mpSubRow}>
                <Text numberOfLines={1} style={styles.mpSub}>{`${
                  en.common.roleWorker
                }${wp.city ? ` · ${wp.city}` : ''}`}</Text>
                <View
                  accessibilityRole="text"
                  accessibilityLabel={`${KYC_VERIFIED}: ${wp.kycBadge ? 'yes' : 'no'}`}
                  style={styles.kyc}
                >
                  <Ionicons
                    name={wp.kycBadge ? 'checkmark-circle' : 'time-outline'}
                    size={13}
                    color={wp.kycBadge ? Colors.light.success : Colors.light.amber}
                  />
                  <Text
                    style={[
                      styles.kycText,
                      { color: wp.kycBadge ? Colors.light.success : Colors.light.amber },
                    ]}
                  >
                    {wp.kycBadge ? KYC_VERIFIED : KYC_PENDING}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* trust hero — 104px ring, stat tiles, bars */}
          <View style={styles.trustCard}>
            <View style={styles.trustHero}>
              <ProgressRing percent={ringPercent} size={104} stroke={10}>
                <View style={styles.ringInner}>
                  <Text style={styles.ringValue}>{rated ? avg : NO_TIME}</Text>
                  <Text style={styles.ringLabel}>{TRUST_LABEL}</Text>
                </View>
              </ProgressRing>
              <View style={styles.trustSide}>
                <Text style={styles.trustCaption}>{en.common.profilePct(pct)}</Text>
                <Text style={styles.trustCaption}>
                  {en.apps.ratingLabel(wp.avgRatingMilli, wp.ratingsCount)}
                </Text>
                {wp.openToWork ? <WhiteWingBadge size="sm" /> : null}
              </View>
            </View>

            <View style={styles.tiles}>
              <StatTile value={rated ? `${avg} ★` : NO_TIME} label={STAT_RATING} />
              <StatTile value={String(wp.jobsDoneCount)} label={STAT_DONE} />
              <StatTile value={String(wp.ratingsCount)} label={STAT_REVIEWS} />
            </View>

            <View style={styles.bars}>
              <BarRow label={BAR_PROFILE} percent={pct} display={`${pct}`} />
              {rated ? (
                <BarRow
                  label={BAR_RATING}
                  percent={Math.round(((wp.avgRatingMilli / 1000) / 5) * 100)}
                  display={`${avg} ★`}
                />
              ) : null}
            </View>

            {!wp.kycBadge ? (
              <AttentionBanner tone="amber" icon="shield-outline" message={en.jobs.badgeNoKyc} />
            ) : null}
          </View>
        </>
      ) : me.isLoading ? (
        <Text style={styles.muted}>{en.common.loading}</Text>
      ) : null}

      <Card title={en.auth.photoTitle}>
        <View style={styles.photoRow}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.photo} accessibilityLabel={en.auth.photoTitle} />
          ) : (
            <Avatar name={wp?.fullName ?? en.auth.homeNoName} size={64} />
          )}
          <Ionicons name="camera-outline" size={22} color={Colors.light.textMuted} />
        </View>
        <Button
          label={busy ? en.auth.photoUploading : en.auth.photoUpload}
          disabled={busy}
          onPress={() => void pickPhoto()}
        />
      </Card>

      <Card title={en.auth.profileWorkerTitle}>
        <Text style={styles.label}>{en.auth.fullName}</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          accessibilityLabel={en.auth.fullName}
        />
        <Text style={styles.label}>{en.auth.bio}</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          multiline
          style={[styles.input, styles.multiline]}
          accessibilityLabel={en.auth.bio}
        />
        <Text style={styles.label}>{en.auth.experience}</Text>
        <TextInput
          value={experienceYears}
          onChangeText={(t) => setExperienceYears(t.replace(/\D/g, ''))}
          keyboardType="number-pad"
          maxLength={2}
          style={styles.input}
          accessibilityLabel={en.auth.experience}
        />
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: openToWork }}
          onPress={() => setOpenToWork((v) => !v)}
          style={styles.checkRow}
        >
          <View style={[styles.checkbox, openToWork && styles.checkboxOn]}>
            {openToWork ? <Ionicons name="checkmark" size={14} color={Colors.light.onPrimary} /> : null}
          </View>
          <Text style={styles.checkLabel}>{en.auth.openToWork}</Text>
        </Pressable>
        <Button primary label={busy ? en.auth.saving : en.auth.save} disabled={busy} onPress={() => void saveAbout()} />
      </Card>

      <Card title={en.auth.skillsTitle}>
        <Text style={styles.muted}>{en.auth.skillsNote}</Text>
        {/* prototype .o-tags — the skills currently saved, as teal pills */}
        <View style={styles.skillPills}>
          {(catalog.data?.skills ?? [])
            .filter((skill) => selectedSkills.has(skill.publicId))
            .map((skill) => (
              <Text key={`pill-${skill.publicId}`} style={styles.skillPill}>
                {skill.name}
              </Text>
            ))}
        </View>
        <View style={styles.chips}>
          {(catalog.data?.skills ?? []).map((skill) => (
            <Chip
              key={skill.publicId}
              label={skill.name}
              selected={selectedSkills.has(skill.publicId)}
              onPress={() => toggleSkill(skill.publicId)}
            />
          ))}
        </View>
        <Button primary label={busy ? en.auth.saving : en.auth.saveSkills} disabled={busy} onPress={() => void saveSkills()} />
      </Card>

      <Card title={en.auth.availabilityTitle}>
        {slots.length === 0 ? <Text style={styles.muted}>{en.auth.avEmpty}</Text> : null}
        {slots.map((slot, idx) => (
          <View key={`${slot.date}-${slot.fromTime}-${idx}`} style={styles.slotRow}>
            <Text style={styles.slotText}>
              {slot.date} · {slot.fromTime}–{slot.toTime}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={en.auth.avRemove}
              onPress={() => setSlots((p) => p.filter((_, i) => i !== idx))}
              style={styles.removeBtn}
            >
              <Ionicons name="close-circle-outline" size={16} color={Colors.light.danger} />
              <Text style={styles.remove}>{en.auth.avRemove}</Text>
            </Pressable>
          </View>
        ))}
        <TextInput
          value={avDate}
          onChangeText={setAvDate}
          placeholder={en.auth.avDate}
          placeholderTextColor={Colors.light.textMuted}
          style={styles.input}
          accessibilityLabel={en.auth.avDate}
        />
        <View style={styles.slotForm}>
          <TextInput
            value={avFrom}
            onChangeText={setAvFrom}
            placeholder={en.auth.avFrom}
            placeholderTextColor={Colors.light.textMuted}
            style={[styles.input, styles.half]}
            accessibilityLabel={en.auth.avFrom}
          />
          <TextInput
            value={avTo}
            onChangeText={setAvTo}
            placeholder={en.auth.avTo}
            placeholderTextColor={Colors.light.textMuted}
            style={[styles.input, styles.half]}
            accessibilityLabel={en.auth.avTo}
          />
        </View>
        <Button label={en.auth.avAdd} onPress={addSlot} />
        <Button primary label={busy ? en.auth.saving : en.auth.save} disabled={busy} onPress={() => void saveAvailability()} />
      </Card>

      {/* prototype §w-me ACCOUNT */}
      <BlockTitle icon="list-outline">{ACCOUNT_TITLE}</BlockTitle>
      <ListRow
        icon="person-outline"
        title={PROFILE_PHOTOS}
        sub={en.common.profilePct(pct)}
        onPress={() => void pickPhoto()}
      />
      <ListRow icon="language-outline" title={LANGUAGE_TITLE} sub={LANGUAGE_SUB} chevron={false} />
      <ListRow
        icon="refresh-outline"
        title={SWITCH_ROLE}
        sub={`${ROLE_NOW}: ${en.common.roleWorker}`}
        onPress={() => router.push('/role')}
      />
      <ListRow
        icon="shield-checkmark-outline"
        title={DOCS_TITLE}
        sub={wp?.kycBadge ? DOCS_OK : en.jobs.badgeNoKyc}
        onPress={() => router.push('/verify')}
      />
      <ListRow
        icon="notifications-outline"
        title={NOTIF_TITLE}
        sub={NOTIF_SUB}
        onPress={() => router.push('/prefs')}
      />

      {sessionRows.length > 0 ? (
        <>
          <BlockTitle icon="time-outline">{SESSIONS_TITLE}</BlockTitle>
          {sessionRows.map((s) => (
            <ListRow
              key={s.publicId}
              icon="phone-portrait-outline"
              title={s.current ? THIS_DEVICE : deviceLabel(s.userAgent)}
              sub={`${LAST_USED}: ${stamp(s.lastUsedAt ?? s.issuedAt) ?? NO_TIME}`}
              chevron={false}
              trailing={
                s.current ? (
                  <View style={styles.nowPill}>
                    <Text style={styles.nowPillText}>{THIS_DEVICE}</Text>
                  </View>
                ) : undefined
              }
            />
          ))}
        </>
      ) : null}

      <Button label={en.common.logout} variant="danger" onPress={() => void logout()} />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {savedNote ? <Text style={styles.saved}>{savedNote}</Text> : null}
      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  /* prototype .mini-profile */
  miniProfile: { flexDirection: 'row', alignItems: 'center', gap: 13 },
  mpAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.backgroundSelected,
  },
  mpInitials: { fontFamily: Fonts.display, fontSize: 20, color: Colors.light.onPrimary },
  mpText: { flex: 1, minWidth: 0, gap: 2 },
  mpNameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, flexWrap: 'wrap' },
  mpName: { fontFamily: Fonts.display, fontSize: 20, lineHeight: 26, color: Colors.light.text },
  mpSubRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one, flexWrap: 'wrap' },
  mpSub: { fontSize: 13, lineHeight: 18, fontFamily: Fonts.bodySemi, color: Colors.light.textMuted },
  kyc: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  kycText: { fontSize: 12, fontFamily: Fonts.bodyExtra },

  /* trust card */
  trustCard: {
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  trustHero: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, flexWrap: 'wrap' },
  ringInner: { alignItems: 'center', gap: 1 },
  ringValue: { fontFamily: Fonts.display, fontSize: 30, lineHeight: 32, color: Colors.light.text },
  ringLabel: { fontSize: 9.5, lineHeight: 12, fontFamily: Fonts.bodyExtra, color: Colors.light.textMuted, letterSpacing: 0.5 },
  trustSide: { flex: 1, minWidth: 132, gap: Spacing.one },
  trustCaption: { ...TypeScale.caption, fontFamily: Fonts.bodyBold, color: Colors.light.textMuted },

  tiles: { flexDirection: 'row', gap: Spacing.two },
  tile: {
    flex: 1,
    minWidth: 76,
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.one,
  },
  tileValue: { fontFamily: Fonts.display, fontSize: 21, lineHeight: 26, color: Colors.light.text },
  tileLabel: { fontSize: 10.5, lineHeight: 13, fontFamily: Fonts.bodyBold, color: Colors.light.textMuted },

  bars: { gap: Spacing.one },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, marginVertical: 3 },
  barLabel: { width: 104, fontSize: 12.5, fontFamily: Fonts.bodyBold, color: Colors.light.textMuted },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.line,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: Radius.pill },
  barValue: { fontSize: 12.5, fontFamily: Fonts.bodyBold, color: Colors.light.text },

  /* prototype .block-title / .list-row */
  blockTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.four,
    marginBottom: Spacing.two,
  },
  blockIcon: {
    width: 26,
    height: 26,
    borderRadius: 9,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockTitleText: { fontFamily: Fonts.display, fontSize: 15, letterSpacing: 0.3, color: Colors.light.text },

  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginBottom: 9,
    ...Elevation.card,
  },
  listRowPressed: { backgroundColor: Colors.light.backgroundSelected },
  lrIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
  },
  lrText: { flex: 1, minWidth: 0, gap: 1 },
  lrTitle: { fontSize: 14.5, lineHeight: 20, fontFamily: Fonts.bodyBold, color: Colors.light.text },
  lrSub: { fontSize: 12, lineHeight: 16, fontFamily: Fonts.bodySemi, color: Colors.light.textMuted },
  nowPill: {
    backgroundColor: Colors.light.tint,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: Spacing.two,
  },
  nowPillText: { ...TypeScale.caption, fontFamily: Fonts.bodyExtra, color: Colors.light.primaryDark },

  skillPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  skillPill: {
    fontSize: 12.5,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.primaryDark,
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 11,
  },

  photoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.mid },
  photo: { width: 64, height: 64, borderRadius: 32, backgroundColor: Colors.light.backgroundSelected },

  label: { ...TypeScale.bodySm, fontFamily: Fonts.bodySemi, color: Colors.light.text },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.mid,
    paddingVertical: Spacing.two,
    backgroundColor: Colors.light.card,
    color: Colors.light.text,
    ...TypeScale.body,
  },
  multiline: { minHeight: 72, textAlignVertical: 'top' },
  half: { flex: 1 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.half },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: Colors.light.primary },
  checkLabel: { ...TypeScale.body, color: Colors.light.text, flexShrink: 1 },

  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.one },

  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    backgroundColor: Colors.light.tint,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  slotText: { ...TypeScale.bodySm, fontFamily: Fonts.bodySemi, color: Colors.light.text, flexShrink: 1 },
  removeBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing.half, minHeight: 32 },
  remove: { ...TypeScale.caption, fontFamily: Fonts.bodyBold, color: Colors.light.danger },
  slotForm: { flexDirection: 'row', gap: Spacing.two },

  error: { ...TypeScale.bodySm, color: Colors.light.danger },
  saved: { ...TypeScale.bodySm, fontFamily: Fonts.bodyBold, color: Colors.light.success },
  muted: { ...TypeScale.bodySm, color: Colors.light.textMuted },
});

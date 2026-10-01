import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { authApi, type OrgPatch } from '@/api/auth';
import { ProgressRing, WhiteWingBadge } from '@/components/marketplace';
import { Button, Card, Screen } from '@/components/screen';
import { Chip, TextField } from '@/components/ui';
import { Colors, Elevation, Fonts, Gradients, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { useSession } from '@/store/session';

/**
 * V3 host "Me" (prototype #e-me): mini-profile header (58px teal avatar,
 * display name, KYC), the TrustScore ring card with stat tiles + bars, the
 * ACCOUNT list rows (36px tinted icon tile + chevron) over the untouched
 * org profile form, active sessions, and the danger sign-out.
 * PATCH /me/org is self-scoped; area changes come from the seeded catalog
 * like onboarding. Field values fall back to the loaded org until edited, so
 * an untouched form still submits exactly what the server gave us.
 */

const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const ORG_TYPES: NonNullable<OrgPatch['orgType']>[] = ['INDIVIDUAL', 'FIRM', 'COMPANY', 'GOVT', 'NGO'];

/** V3 list-row labels (no i18n keys yet — same stance as the host home). */
const ROW_PROFILE = 'Company profile';
const ROW_PROFILE_SUB = 'Photos, trade, service areas';
const ROW_PAYMENTS = 'Payment records';
const ROW_NOTIFICATIONS = 'Notifications';
const ROW_NOTIFICATIONS_SUB = 'Push, SMS & quiet hours';
const KYC_VERIFIED = 'Org KYC verified';
const TRUST_LABEL = '★ TRUSTSCORE';
const BAR_KYC = 'KYC';
const BAR_PROFILE = 'Profile';
const BAR_RATING = 'Rating';

type SessionRow = {
  publicId: string;
  userAgent?: string | null;
  issuedAt: string;
  lastUsedAt?: string | null;
  current: boolean;
};

const shortAgent = (ua?: string | null): string => {
  if (!ua) return 'Another device';
  const trimmed = ua.length > 40 ? `${ua.slice(0, 40)}…` : ua;
  return trimmed;
};

/** `.block-title` — 26px tinted tile + display label. */
function BlockTitle({ icon, children }: { icon: keyof typeof Ionicons.glyphMap; children: string }) {
  return (
    <View style={s.blockTitle}>
      <View style={s.btIcon}>
        <Ionicons name={icon} size={14} color={Colors.light.primary} />
      </View>
      <Text accessibilityRole="header" style={s.blockText}>
        {children}
      </Text>
    </View>
  );
}

/** `.list-row` — 36px tinted tile + title/sub + chevron. */
function SettingsRow({
  icon,
  title,
  sub,
  onPress,
  open,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  sub?: string;
  onPress: () => void;
  open?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={sub ? `${title}. ${sub}` : title}
      onPress={onPress}
      style={({ pressed }) => [s.listRow, pressed && s.pressed]}
    >
      <View style={s.lrIcon}>
        <Ionicons name={icon} size={18} color={Colors.light.primary} />
      </View>
      <View style={s.lrMain}>
        <Text numberOfLines={1} style={s.lrTitle}>
          {title}
        </Text>
        {sub ? (
          <Text numberOfLines={1} style={s.lrSub}>
            {sub}
          </Text>
        ) : null}
      </View>
      <Ionicons
        name={open === undefined ? 'chevron-forward' : open ? 'chevron-down' : 'chevron-forward'}
        size={18}
        color={Colors.light.textMuted}
      />
    </Pressable>
  );
}

/** `.bars` — label · track · value (teal gradient fill). */
function Bar({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <View accessibilityLabel={`${label} ${pct}`} style={s.barRow}>
      <Text style={s.barLabel}>{label}</Text>
      <View style={s.barTrack}>
        <LinearGradient
          colors={[...Gradients.teal]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[s.barFill, { width: `${pct}%` }]}
        />
      </View>
      <Text style={s.barValue}>{pct}</Text>
    </View>
  );
}

export default function EmployerProfileScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const session = useSession();

  const me = useQuery({ queryKey: ['me'], queryFn: authApi.me, retry: 1 });
  const catalog = useQuery({ queryKey: ['catalog'], queryFn: authApi.catalog, retry: 1 });
  const sessions = useQuery({ queryKey: ['sessions'], queryFn: authApi.sessions, retry: 1 });

  const [formOpen, setFormOpen] = useState(true);
  const [orgName, setOrgName] = useState<string | null>(null);
  const [orgType, setOrgType] = useState<NonNullable<OrgPatch['orgType']> | null>(null);
  const [contactName, setContactName] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [addressLine, setAddressLine] = useState<string | null>(null);
  const [panRef, setPanRef] = useState('');
  const [areaId, setAreaId] = useState<string | null>(null);
  const [areaSearch, setAreaSearch] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const org = me.data?.org;
  const orgNameValue = orgName ?? org?.orgName ?? '';
  const orgTypeValue = orgType ?? org?.orgType ?? 'FIRM';
  const contactValue = contactName ?? org?.contactName ?? '';
  const cityValue = city ?? org?.city ?? '';
  const addressValue = addressLine ?? org?.addressLine ?? '';
  const areaIdValue = areaId ?? org?.area.publicId ?? null;
  const verified = org?.verificationStatus === 'VERIFIED';
  const ratingMilli = org?.avgRatingMilli ?? 0;
  const ratingsCount = org?.ratingsCount ?? 0;
  const pct = org?.completenessPct ?? 0;
  const rating = ratingMilli / 1000;

  const save = async () => {
    setError(null);
    setSavedNote(null);
    if (panRef && !PAN_RE.test(panRef)) {
      setError(en.auth.panInvalid);
      return;
    }
    if (!areaIdValue) {
      setError(en.auth.areaRequired);
      return;
    }
    setBusy(true);
    try {
      await authApi.patchOrg({
        orgName: orgNameValue.trim(),
        orgType: orgTypeValue,
        contactName: contactValue.trim(),
        city: cityValue.trim(),
        addressLine: addressValue.trim(),
        areaId: areaIdValue,
        panRef: panRef ? panRef : null,
      });
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      setSavedNote(en.auth.saved);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
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

  const areas = (catalog.data?.areas ?? []).filter((area) => {
    const needle = areaSearch.trim().toLowerCase();
    if (!needle) return true;
    return `${area.city} ${area.name}`.toLowerCase().includes(needle);
  });

  const ratingLine = org
    ? en.ratings.summary(org.avgRatingMilli, org.ratingsCount)
    : '';

  const initials =
    orgNameValue
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w.charAt(0))
      .join('')
      .toUpperCase() || 'H';

  const sessionRows = (sessions.data?.sessions ?? []) as SessionRow[];

  return (
    <Screen title={en.nav.host.profile} tab="profile">
      {me.isError ? <Text style={s.error}>{errorMessage(me.error)}</Text> : null}

      {/* --- mini profile (prototype .mini-profile) --- */}
      <View style={s.mini}>
        <View style={s.mpAvatar}>
          <Text style={s.mpInitials}>{initials}</Text>
        </View>
        <View style={s.mpMain}>
          <View style={s.mpNameRow}>
            <Text numberOfLines={1} style={s.mpName}>
              {orgNameValue || en.auth.homeNoName}
            </Text>
            {verified ? <WhiteWingBadge size="sm" /> : null}
          </View>
          <Text numberOfLines={1} style={s.mpSub}>
            {`${orgTypeValue} host · ${cityValue || '—'}`}
          </Text>
          <View style={s.kycRow}>
            <Ionicons
              name={verified ? 'checkmark-circle' : 'time-outline'}
              size={14}
              color={verified ? Colors.light.success : Colors.light.warning}
            />
            <Text numberOfLines={1} style={[s.kycText, verified ? null : s.kycPending]}>
              {verified ? KYC_VERIFIED : `Org KYC ${org?.verificationStatus ?? '—'}`}
            </Text>
          </View>
        </View>
      </View>

      {/* --- TrustScore ring card (prototype .trust-hero + .bars) --- */}
      <View style={s.trustCard}>
        <View style={s.trustHero}>
          <ProgressRing percent={ratingsCount > 0 ? (rating / 5) * 100 : pct} size={104} stroke={9} color={Colors.light.primary}>
            <View style={s.trustInner}>
              <Text style={s.trustNum}>{ratingsCount > 0 ? rating.toFixed(1) : `${pct}%`}</Text>
              <Text style={s.trustLabel}>{ratingsCount > 0 ? TRUST_LABEL : BAR_PROFILE.toUpperCase()}</Text>
            </View>
          </ProgressRing>
          <View style={s.trustSide}>
            <View style={s.trustStats}>
              <View style={s.ts}>
                <Text style={s.tsValue}>{org?.jobsPostedCount ?? 0}</Text>
                <Text style={s.tsLabel}>POSTED</Text>
              </View>
              <View style={s.ts}>
                <Text style={s.tsValue}>{ratingsCount}</Text>
                <Text style={s.tsLabel}>RATINGS</Text>
              </View>
              <View style={s.ts}>
                <Text style={s.tsValue}>{`${pct}%`}</Text>
                <Text style={s.tsLabel}>PROFILE</Text>
              </View>
            </View>
            <Text style={s.trustNote}>{ratingLine}</Text>
          </View>
        </View>

        <View style={s.bars}>
          <Bar label={BAR_PROFILE} value={pct} />
          <Bar label={BAR_RATING} value={(rating / 5) * 100} />
          <Bar label={BAR_KYC} value={verified ? 100 : 0} />
        </View>
      </View>

      {/* --- account list rows --- */}
      <BlockTitle icon="list-outline">ACCOUNT</BlockTitle>
      <SettingsRow
        icon="business-outline"
        title={ROW_PROFILE}
        sub={formOpen ? `${orgTypeValue} · ${cityValue || ROW_PROFILE_SUB}` : ROW_PROFILE_SUB}
        open={formOpen}
        onPress={() => setFormOpen((v) => !v)}
      />
      <SettingsRow
        icon="cash-outline"
        title={ROW_PAYMENTS}
        sub={en.payments.jobEarnings}
        onPress={() => router.push('/employer/payments')}
      />
      <SettingsRow
        icon="notifications-outline"
        title={ROW_NOTIFICATIONS}
        sub={ROW_NOTIFICATIONS_SUB}
        onPress={() => router.push('/prefs')}
      />

      {formOpen ? (
        <Card title={en.auth.profileEmployerTitle}>
          <TextField
            label={en.auth.orgName}
            value={orgNameValue}
            onChangeText={setOrgName}
            autoCapitalize="sentences"
          />

          <Text style={s.label}>{en.auth.orgType}</Text>
          <View style={s.chips}>
            {ORG_TYPES.map((t) => (
              <Chip key={t} label={t} selected={orgTypeValue === t} onPress={() => setOrgType(t)} />
            ))}
          </View>

          <TextField
            label={en.auth.contactName}
            value={contactValue}
            onChangeText={setContactName}
            autoCapitalize="sentences"
          />

          <TextField label={en.auth.city} value={cityValue} onChangeText={setCity} autoCapitalize="sentences" />

          <TextField
            label={en.auth.address}
            value={addressValue}
            onChangeText={setAddressLine}
            autoCapitalize="sentences"
          />

          <TextField
            label={en.auth.panRef}
            value={panRef}
            onChangeText={(t) => setPanRef(t.toUpperCase())}
            maxLength={10}
            autoCapitalize="characters"
            placeholder="ABCDE1234F"
          />

          <TextField
            label={en.auth.areaPick}
            value={areaSearch}
            onChangeText={setAreaSearch}
            placeholder={en.auth.areaSearch}
          />
          <ScrollView style={s.areaScroll}>
            <View style={s.chips}>
              {areas.map((area) => (
                <Chip
                  key={area.publicId}
                  label={`${area.city} · ${area.name}`}
                  selected={areaIdValue === area.publicId}
                  onPress={() => setAreaId(area.publicId)}
                />
              ))}
            </View>
          </ScrollView>

          {error ? <Text style={s.error}>{error}</Text> : null}
          {savedNote ? <Text style={s.saved}>{savedNote}</Text> : null}
          <Button
            label={busy ? en.auth.saving : en.auth.save}
            variant="primary"
            disabled={busy}
            onPress={() => void save()}
          />
        </Card>
      ) : null}

      {/* --- sessions --- */}
      <BlockTitle icon="phone-portrait-outline">SESSIONS</BlockTitle>
      {sessions.isError ? <Text style={s.muted}>{errorMessage(sessions.error)}</Text> : null}
      {!sessions.isError && sessions.isPending ? <Text style={s.muted}>{en.common.loading}</Text> : null}
      {sessionRows.length === 0 && !sessions.isPending && !sessions.isError ? (
        <Text style={s.muted}>{en.common.signedInAs(en.common.roleEmployer)}</Text>
      ) : null}
      {sessionRows.map((row) => (
        <View key={row.publicId} style={s.listRow}>
          <View style={s.lrIcon}>
            <Ionicons name="phone-portrait-outline" size={18} color={Colors.light.primary} />
          </View>
          <View style={s.lrMain}>
            <Text numberOfLines={1} style={s.lrTitle}>
              {row.current ? 'This device' : shortAgent(row.userAgent)}
            </Text>
            <Text numberOfLines={1} style={s.lrSub}>
              {`Signed in ${new Date(row.issuedAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}`}
            </Text>
          </View>
          <Chip label="Current" size="sm" selected={row.current} />
        </View>
      ))}

      {/* --- danger sign-out --- */}
      <Button label={en.common.logout} variant="danger" onPress={() => void logout()} />

      {savedNote ? <Text style={s.saved}>{savedNote}</Text> : null}
      <Button label={en.common.back} onPress={() => router.back()} />
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
  saved: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.success,
  },
  muted: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },

  // --- mini profile ---
  mini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13, // prototype .mini-profile gap
  },
  mpAvatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primary,
  },
  mpInitials: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Colors.light.onPrimary,
  },
  mpMain: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  mpNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  mpName: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: Fonts.display,
    color: Colors.light.text,
    flexShrink: 1,
  },
  mpSub: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  kycRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kycText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.success,
  },
  kycPending: {
    color: Colors.light.warning,
  },

  // --- trust card ---
  trustCard: {
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  trustHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  trustInner: {
    alignItems: 'center',
    gap: 1,
  },
  trustNum: {
    fontFamily: Fonts.display,
    fontSize: 30,
    lineHeight: 32,
    color: Colors.light.primaryDeep,
  },
  trustLabel: {
    fontSize: 9.5,
    lineHeight: 12,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.5,
    color: Colors.light.textMuted,
  },
  trustSide: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.two,
  },
  trustStats: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  ts: {
    flex: 1,
    minWidth: 76,
    alignItems: 'center',
    gap: 1,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.mid - 4,
  },
  tsValue: {
    fontFamily: Fonts.display,
    fontSize: 17,
    lineHeight: 22,
    color: Colors.light.text,
  },
  tsLabel: {
    fontSize: 10.5,
    lineHeight: 14,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
  },
  trustNote: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },

  // --- bars ---
  bars: {
    gap: Spacing.one + 3,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
  },
  barLabel: {
    width: 104,
    fontSize: 12.5,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
  },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.line,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: Radius.pill,
  },
  barValue: {
    fontSize: 12.5,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
    minWidth: 30,
    textAlign: 'right',
  },

  // --- block titles + list rows ---
  blockTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  btIcon: {
    width: 26,
    height: 26,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.tint,
  },
  blockText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: Fonts.display,
    letterSpacing: 0.3,
    color: Colors.light.text,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.md,
    padding: 13, // prototype .list-row padding
    ...Elevation.card,
  },
  lrIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.tint,
  },
  lrMain: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  lrTitle: {
    fontSize: 14.5,
    lineHeight: 19,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  lrSub: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },

  // --- form ---
  label: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.half,
  },
  areaScroll: {
    maxHeight: 180,
  },
});

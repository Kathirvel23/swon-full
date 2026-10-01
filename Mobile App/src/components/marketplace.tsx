import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Avatar, type AccentTone } from '@/components/ui';
import { Colors, Elevation, Fonts, Gradients, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * Marketplace content set (UI_UX_DESIGN.md §3, batch U3b) — the V3
 * "marketplace, not ERP" surfaces: opportunity cards with photo/match/pay
 * hierarchy, match + trust rings, formation, seats, money, attention.
 * Every colour comes from `constants/theme`; `photoUri` is optional until
 * the licensed imagery batch (U7) lands.
 *
 * Parity pass (2026-09-30): AttentionBanner / OpportunityCard / MoneyDisplay
 * re-cut to `UI_PROTOTYPE.html` `.banner`, `.opp`, `.pill` and `.money`
 * specs — structure and sizes verbatim, colours token-derived only.
 */

export type OpportunityVariant = 'recommended' | 'featured' | 'urgent' | 'nearby' | 'compact';

/** Prototype tile/pill gradients (`.c-ic`, `.bn-ic`, `.pill.match`) as token pairs. */
function tileGradient(tone: AccentTone): readonly [string, string] {
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

/** Prototype card shadow = --shadow-card + the deeper `.opp` tail (web). */
const cardShadow: ViewStyle = Platform.select({
  web: {
    boxShadow: '0 1px 3px rgba(16,32,30,.10), 0 10px 22px -18px rgba(16,32,30,.50)',
  },
  default: {},
}) as ViewStyle;

/** Design §3 MoneyDisplay — prototype `.money` (17) / `.md` (21) / `.hero` (29) / `.mega` (34). */
export function MoneyDisplay({
  amount,
  suffix,
  size = 'md',
}: {
  amount: number | string;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}) {
  const text = typeof amount === 'number' ? `₹${amount.toLocaleString('en-IN')}` : amount;
  return (
    <View style={styles.moneyRow}>
      <Text
        accessibilityLabel={text}
        style={[
          styles.money,
          size === 'sm' && styles.moneySm,
          size === 'lg' && styles.moneyLg,
          size === 'hero' && styles.moneyHero,
        ]}
      >
        {text}
      </Text>
      {suffix ? <Text style={styles.moneySuffix}>{suffix}</Text> : null}
    </View>
  );
}

/** Design §3 SeatDots — filled/empty dots for remaining seats. */
export function SeatDots({ taken, total }: { taken: number; total: number }) {
  const dots = [];
  for (let i = 0; i < total; i += 1) {
    dots.push(
      <View
        key={i}
        style={[styles.seatDot, i < taken ? styles.seatDotTaken : styles.seatDotFree]}
      />,
    );
  }
  return (
    <View style={styles.seatRow} accessibilityLabel={`${taken} of ${total} seats filled`}>
      {dots}
      <Text style={styles.seatLabel}>
        {total - taken}/{total} left
      </Text>
    </View>
  );
}

/** Design §3 ProgressRing — reusable SVG arc; MatchRing/TrustScore build on it. */
export function ProgressRing({
  percent,
  size = 64,
  stroke = 6,
  color,
  children,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: ReactNode;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - clamped / 100);
  return (
    <View style={{ width: size, height: size }} accessibilityLabel={`${clamped} percent`}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={Colors.light.line}
          strokeWidth={stroke}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color ?? Colors.light.primary}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.ringCenter} pointerEvents="none">
        {children}
      </View>
    </View>
  );
}

/** Design §3 MatchRing — opportunity fit %. */
export function MatchRing({ percent, size = 56 }: { percent: number; size?: number }) {
  return (
    <ProgressRing percent={percent} size={size} stroke={5}>
      <Text style={[styles.ringPct, { fontSize: Math.round(size * 0.26) }]}>{percent}%</Text>
    </ProgressRing>
  );
}

/** Design §3 TrustScore — profile strength ring with caption. */
export function TrustScore({ score, caption }: { score: number; caption?: string }) {
  return (
    <View style={styles.trustWrap}>
      <ProgressRing percent={score} size={72} stroke={7} color={Colors.light.green}>
        <Text style={styles.trustPct}>{score}</Text>
      </ProgressRing>
      {caption ? <Text style={styles.trustCaption}>{caption}</Text> : null}
    </View>
  );
}

/** Design §3 WhiteWingBadge — trusted-worker verification pill. */
export function WhiteWingBadge({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <View
      accessibilityLabel="WhiteWing verified"
      style={[styles.wingBadge, size === 'sm' && styles.wingBadgeSm]}
    >
      <MaterialCommunityIcons
        name="feather"
        size={size === 'sm' ? 12 : 14}
        color={Colors.light.primaryDeep}
      />
      <Text style={[styles.wingText, size === 'sm' && styles.wingTextSm]}>
        WhiteWing verified
      </Text>
    </View>
  );
}

/** Design §3 FormationAvatars — overlapping crew heads + overflow count. */
export function FormationAvatars({
  names,
  max = 4,
  size = 36,
}: {
  names: string[];
  max?: number;
  size?: number;
}) {
  const shown = names.slice(0, max);
  const extra = names.length - shown.length;
  return (
    <View style={styles.formation} accessibilityLabel={`Flock: ${names.join(', ')}`}>
      {shown.map((n, i) => (
        <View key={n} style={[styles.formationItem, { marginLeft: i === 0 ? 0 : -10 }]}>
          <Avatar name={n} size={size} tone={i % 2 === 0 ? undefined : 'blue'} />
        </View>
      ))}
      {extra > 0 ? (
        <View style={[styles.formationExtra, { marginLeft: -10, width: size, height: size, borderRadius: size / 2 }]}>
          <Text style={styles.formationExtraText}>+{extra}</Text>
        </View>
      ) : null}
    </View>
  );
}

/**
 * Design §3 AttentionBanner — prototype `.banner`: card strip, 4px tone rail,
 * 34dp gradient icon tile, bold line + small line, chevron when actionable.
 * `sub` adds an explicit small line; without it `actionLabel` fills it.
 */
export function AttentionBanner({
  tone = 'amber',
  icon = 'alert-circle',
  message,
  sub,
  actionLabel,
  onAction,
}: {
  tone?: AccentTone;
  icon?: keyof typeof Ionicons.glyphMap;
  message: string;
  sub?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const c = Colors.light[tone];
  const hot = tone === 'coral' || tone === 'orange';
  const interactive = Boolean(actionLabel && onAction);
  const small = sub ?? actionLabel;
  const Row = interactive ? Pressable : View;
  const rowProps = interactive
    ? {
        onPress: onAction,
        accessibilityRole: 'button' as const,
        accessibilityLabel: `${message}. ${actionLabel}`,
      }
    : {};
  return (
    <Row
      style={[
        styles.banner,
        tone === 'orange' && styles.bannerWarm,
        { borderLeftColor: hot ? Colors.light.coral : c },
      ]}
      {...rowProps}
    >
      <LinearGradient
        colors={hot ? [Colors.light.coral, Colors.light.orange] : tileGradient(tone)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerIc}
      >
        <Ionicons name={icon} size={18} color={Colors.light.onPrimary} />
      </LinearGradient>
      <View style={styles.bannerTxt}>
        <Text style={styles.bannerText} numberOfLines={2}>
          {message}
        </Text>
        {small != null && small !== '' ? (
          <Text style={styles.bannerSub} numberOfLines={2}>
            {small}
          </Text>
        ) : null}
      </View>
      {interactive ? (
        <View style={styles.bannerAction}>
          <Ionicons name="chevron-forward" size={18} color={Colors.light.textMuted} />
        </View>
      ) : null}
    </Row>
  );
}

/**
 * Design §3 OpportunityCard — prototype `.opp`: 148dp media (photo or brand
 * gradient) with bottom scrim, badges row (urgent/match pill + favourite),
 * dark distance pill, then title → host (+rating / WhiteWing) → meta
 * (time, location) → PAY hero with seats pill → skill tags → tinted CTA.
 * `compact` keeps a 96dp media and drops tags/CTA; `showCta={false}` lets a
 * horizontal rail opt out (prototype `.h-rail .opp` has no CTA).
 */
export function OpportunityCard({
  variant = 'recommended',
  title,
  host,
  location,
  time,
  payAmount,
  paySuffix = '/ day',
  matchPercent,
  urgent,
  seatsTaken,
  seatsTotal,
  skills,
  favorited,
  photoUri,
  photoSource,
  categoryIcon = 'briefcase',
  categoryTone = 'blue',
  distanceKm,
  hostRating,
  hostVerified,
  showCta,
  onPress,
  onFavorite,
}: {
  variant?: OpportunityVariant;
  title: string;
  host: string;
  location: string;
  time: string;
  payAmount: number | string;
  paySuffix?: string;
  matchPercent?: number;
  urgent?: boolean;
  seatsTaken?: number;
  seatsTotal?: number;
  skills?: string[];
  favorited?: boolean;
  photoUri?: string;
  /** Bundled asset id from constants/jobPhotos (require(...)). */
  photoSource?: number;
  categoryIcon?: keyof typeof Ionicons.glyphMap;
  categoryTone?: AccentTone;
  /** discovery distance — renders the prototype's dark media pill */
  distanceKm?: number | null;
  /** host rating (avgRatingMilli/1000) — the amber star in `.o-host` */
  hostRating?: number | null;
  /** host KYC — the WhiteWing tag in `.o-host` */
  hostVerified?: boolean;
  /** defaults to true except for `compact` (prototype: only full cards carry a CTA) */
  showCta?: boolean;
  onPress?: () => void;
  onFavorite?: () => void;
}) {
  const isCompact = variant === 'compact';
  const isUrgent = variant === 'urgent' || urgent === true;
  const withCta = showCta ?? !isCompact;
  const tone = Colors.light[categoryTone];

  const distance =
    typeof distanceKm === 'number'
      ? distanceKm === 0
        ? en.jobs.sameArea
        : en.jobs.distanceKm(distanceKm)
      : null;
  const seatsText =
    seatsTotal != null && seatsTaken != null
      ? `${seatsTotal} ${en.jobs.slots} · ${seatsTaken} ${en.jobs.hired}`
      : null;

  const heart = onFavorite ? (
    <Pressable
      onPress={onFavorite}
      accessibilityRole={Platform.OS === 'web' ? undefined : 'button'}
      accessibilityLabel={favorited ? 'Remove from saved' : 'Save opportunity'}
      style={styles.heart}
    >
      <Ionicons
        name={favorited ? 'heart' : 'heart-outline'}
        size={18}
        color={favorited ? Colors.light.coral : Colors.light.textMuted}
      />
    </Pressable>
  ) : null;

  /** prototype `.o-badges` left slot: urgent → match → featured */
  let badge: ReactNode = null;
  if (isUrgent) {
    badge = (
      <LinearGradient
        colors={[...Gradients.warm]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.pill, styles.pillShadow]}
      >
        <Ionicons name="flash" size={12} color={Colors.light.onPrimary} />
        <Text style={styles.pillText}>URGENT</Text>
      </LinearGradient>
    );
  } else if (matchPercent != null) {
    badge = (
      <LinearGradient
        colors={[...Gradients.money]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.pill, styles.pillShadow]}
      >
        <Ionicons name="checkmark" size={12} color={Colors.light.onPrimary} />
        <Text style={styles.pillText}>{matchPercent}% match</Text>
      </LinearGradient>
    );
  } else if (variant === 'featured') {
    badge = (
      <View style={[styles.pill, styles.pillFeatured]}>
        <Text style={styles.pillTextDark}>FEATURED</Text>
      </View>
    );
  }

  const media = (
    <LinearGradient
      colors={[...(isUrgent ? Gradients.warm : Gradients.teal)]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.media, isCompact && styles.mediaCompact]}
    >
      {photoSource != null ? (
        <Image source={photoSource} style={styles.mediaImg} resizeMode="cover" />
      ) : photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.mediaImg} resizeMode="cover" />
      ) : (
        <View style={[styles.mediaPh, { backgroundColor: `${tone}33` }]}>
          <Ionicons name={categoryIcon} size={34} color={Colors.light.onPrimary} />
        </View>
      )}
      {/* prototype `.o-media::after` — bottom scrim for pill legibility */}
      <LinearGradient
        colors={['rgba(11,21,18,0)', 'rgba(11,21,18,0.72)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="none"
        style={styles.mediaScrim}
      />
      <View style={styles.oBadges}>
        <View style={styles.badgeSlot}>{badge}</View>
        {heart}
      </View>
      {distance != null ? (
        <View style={styles.distPill}>
          <Ionicons name="location" size={12} color={Colors.light.onPrimary} />
          <Text style={styles.distText}>{distance}</Text>
        </View>
      ) : null}
    </LinearGradient>
  );

  const body = (
    <>
      {media}
      <View style={[styles.cardBody, isCompact && styles.cardBodyCompact]}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.hostRow}>
          <Text style={styles.hostText} numberOfLines={1}>
            {host}
          </Text>
          {typeof hostRating === 'number' && hostRating > 0 ? (
            <Text style={styles.hostStar}>{`★ ${hostRating.toFixed(1)}`}</Text>
          ) : null}
          {hostVerified === true ? (
            <View style={styles.hostWing}>
              <Ionicons name="shield-checkmark" size={13} color={Colors.light.success} />
              <Text style={styles.hostWingText}>WhiteWing</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={Colors.light.textMuted} />
            <Text style={styles.metaText} numberOfLines={1}>
              {time}
            </Text>
          </View>
          {distance == null ? (
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color={Colors.light.textMuted} />
              <Text style={styles.metaText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.payRow}>
          <MoneyDisplay amount={payAmount} suffix={paySuffix} size="md" />
          {seatsText != null ? (
            <View style={styles.seatsPill}>
              <Text style={styles.seatsPillText}>{seatsText}</Text>
            </View>
          ) : null}
        </View>
        {!isCompact && skills && skills.length > 0 ? (
          <View style={styles.tagsRow}>
            {skills.slice(0, 3).map((s) => (
              <View key={s} style={styles.tag}>
                <Text style={styles.tagText}>{s}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {withCta ? (
          <View style={styles.cta}>
            <Text style={styles.ctaText}>View opportunity</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.light.primaryDark} />
          </View>
        ) : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole={Platform.OS === 'web' ? undefined : 'button'}
        accessibilityLabel={`${title}, ${location}, pay ${payAmount}`}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      >
        {body}
      </Pressable>
    );
  }
  return <View style={styles.card}>{body}</View>;
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
  moneyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.half,
  },
  money: {
    fontFamily: Fonts.display,
    fontSize: 21, // prototype .money.md — the card pay figure
    lineHeight: 26,
    color: Colors.light.green,
    fontVariant: ['tabular-nums'],
  },
  moneySm: {
    fontSize: 17, // prototype .money
    lineHeight: 21,
  },
  moneyLg: {
    fontSize: 34, // prototype .money.mega
    lineHeight: 40,
  },
  moneyHero: {
    fontSize: 29, // prototype .money.hero
    lineHeight: 32,
  },
  moneySuffix: {
    // prototype .money .unit — muted, 14/600, baseline-aligned
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  seatDotTaken: {
    backgroundColor: Colors.light.primary,
  },
  seatDotFree: {
    backgroundColor: Colors.light.line,
  },
  seatLabel: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
    marginLeft: Spacing.half,
  },
  ringCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringPct: {
    fontFamily: Fonts.display,
    color: Colors.light.primaryDeep,
  },
  trustWrap: {
    alignItems: 'center',
    gap: Spacing.half,
  },
  trustPct: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Colors.light.green,
  },
  trustCaption: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },
  wingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.tint,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  wingBadgeSm: {
    paddingVertical: 2,
    paddingHorizontal: Spacing.one,
  },
  wingText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.primaryDeep,
  },
  wingTextSm: {
    fontSize: 11,
  },
  formation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formationItem: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: Colors.light.card,
  },
  formationExtra: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primaryLight,
    borderWidth: 2,
    borderColor: Colors.light.card,
  },
  formationExtraText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.primaryDeep,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderLeftWidth: 4, // prototype .banner { border-left: 4px tone }
    borderRadius: Radius.md,
    paddingVertical: Spacing.mid,
    paddingHorizontal: 14,
    ...Elevation.card,
  },
  bannerWarm: {
    // prototype home FlashMatch strip wash (its #FFF7ED→#FFEDD5 gradient)
    backgroundColor: `${Colors.light.orange}14`,
  },
  bannerIc: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTxt: {
    flex: 1,
    minWidth: 0,
    gap: 1,
  },
  bannerText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  bannerSub: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  bannerAction: {
    minHeight: 32,
    justifyContent: 'center',
    paddingLeft: Spacing.half,
  },
  card: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Elevation.card,
    ...cardShadow,
  },
  media: {
    height: 148, // prototype .opp .o-media
  },
  mediaCompact: {
    height: 96, // prototype .opp.compact .o-media
  },
  mediaImg: {
    width: '100%',
    height: '100%',
  },
  mediaPh: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  oBadges: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badgeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  pillShadow: {
    ...Elevation.card,
  },
  pillFeatured: {
    backgroundColor: Colors.light.yellow,
  },
  pillText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    color: Colors.light.onPrimary,
  },
  pillTextDark: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    color: Colors.light.text,
  },
  distPill: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(16,32,30,0.78)', // prototype .pill.dark
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  distText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
  heart: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.92)', // prototype .o-fav
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    paddingTop: 13,
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: Spacing.half,
  },
  cardBodyCompact: {
    paddingTop: 11,
    paddingHorizontal: 13,
  },
  cardTitle: {
    fontFamily: Fonts.display, // prototype .o-title 17.5/800
    fontSize: 17.5,
    lineHeight: 20,
    color: Colors.light.text,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
    flexWrap: 'wrap',
  },
  hostText: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
    flexShrink: 1,
  },
  hostStar: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.amber,
  },
  hostWing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  hostWingText: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 9,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: '100%',
  },
  metaText: {
    fontSize: 12.5,
    lineHeight: 16,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    flexShrink: 1,
  },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  seatsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: Radius.pill,
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    // prototype .pill.today (lavender→blue wash, info text)
    backgroundColor: `${Colors.light.blue}14`,
    borderColor: `${Colors.light.blue}40`,
  },
  seatsPillText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.info,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    backgroundColor: Colors.light.background, // prototype .o-tags = canvas bg
    borderWidth: 1,
    borderColor: Colors.light.line,
    borderRadius: Radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 9,
  },
  tagText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
  },
  cta: {
    marginTop: 12,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.tint, // prototype .o-cta
  },
  ctaText: {
    fontSize: 14.5,
    lineHeight: 19,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primaryDark,
  },
});

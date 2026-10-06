import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';

import { Colors, Fonts, Radius, Spacing, Touch, statusColors, TypeScale } from '@/constants/theme';

/**
 * Design-system components (UI_UX_DESIGN.md §3), added batch by batch:
 *  - U3a actions & inputs: SearchBar, Chip, CategoryShortcut, IconButton,
 *    TextField, Avatar  ✅ (buttons live in components/screen.tsx)
 *  - U3b content: OpportunityCard, MatchRing, WhiteWingBadge, TrustScore,
 *    FormationAvatars, SeatDots, MoneyDisplay, AttentionBanner …
 *  - U3c feedback & overlays: Sheet, Toast, Timeline, CountdownRing,
 *    ProgressRing, EarningsChart, Skeleton, EmptyState …
 * Everything here reads tokens from `constants/theme` — never a hardcoded hex.
 */

/**
 * Design §3 StatusChip — every status uses the one shared color map.
 * `STATUS_LABELS` is presentation-only branding (SWON vocabulary): the API
 * status values never change, only how they read on screen.
 */
const STATUS_LABELS: Record<string, string> = { HIRING: 'BOND' };

/** Prototype `.status` pills frame themselves with a pastel of the text
 *  colour (#15803D→#86EFAC style) — derive it, never hardcode per status. */
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

export function StatusChip({
  status,
  size = 'md',
}: {
  status: string;
  size?: 'sm' | 'md';
}) {
  const { fg, bg } = statusColors(status);
  const label = STATUS_LABELS[status] ?? status;
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Status ${label}`}
      style={[
        styles.chip,
        size === 'sm' && styles.chipSm,
        { backgroundColor: bg, borderColor: pastelBorder(fg) },
      ]}
    >
      <Text style={[styles.chipText, size === 'sm' && styles.chipTextSm, { color: fg }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  chipSm: {
    paddingVertical: 1,
    paddingHorizontal: Spacing.one,
  },
  chipText: {
    ...TypeScale.bodySm,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  chipTextSm: {
    ...TypeScale.caption,
  },

  pressed: {
    opacity: 0.85,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.three,
    minHeight: Touch.min,
  },
  searchFocus: {
    borderColor: Colors.light.primary,
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    ...TypeScale.body,
    fontFamily: Fonts.body ?? undefined,
    color: Colors.light.text,
    paddingVertical: Spacing.two,
  },
  filterChip: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    minHeight: 36,
    justifyContent: 'center',
  },
  filterChipSm: {
    minHeight: 30,
    paddingVertical: 2,
    paddingHorizontal: Spacing.one,
  },
  filterChipSel: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterChipLabel: {
    ...TypeScale.bodySm,
    color: Colors.light.text,
    fontFamily: Fonts.bodySemi,
  },
  filterChipLabelSm: {
    ...TypeScale.caption,
  },
  filterChipLabelSel: {
    color: Colors.light.onPrimary,
  },
  cat: {
    width: 74,
    alignItems: 'center',
    gap: Spacing.half,
  },
  catTile: {
    width: 64,
    height: 64,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  catBadgeText: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  catLabel: {
    ...TypeScale.caption,
    color: Colors.light.text,
    textAlign: 'center',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnOnBrand: {
    backgroundColor: Colors.light.onBrandSurface,
    borderColor: Colors.light.onBrandBorder,
  },
  iconBadgeDot: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.orange,
    borderWidth: 1.5,
    borderColor: Colors.light.card,
  },
  field: {
    gap: Spacing.half,
  },
  fieldLabel: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  fieldBox: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.two,
    minHeight: Touch.min,
    justifyContent: 'center',
  },
  fieldBoxFocus: {
    // Recolor only — elevation/shadows/borderWidth in the focused style move
    // the native TextInput on New Architecture and drop focus (see profile).
    borderColor: Colors.light.primary,
  },
  fieldBoxError: {
    borderColor: Colors.light.danger,
  },
  fieldInput: {
    ...TypeScale.body,
    color: Colors.light.text,
    paddingVertical: Spacing.two,
  },
  fieldError: {
    ...TypeScale.caption,
    color: Colors.light.danger,
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Fonts.bodyBold,
  },
});


/** Accent tones shared by CategoryShortcut / Avatar / U3b badges. */
export type AccentTone = 'orange' | 'amber' | 'yellow' | 'coral' | 'green' | 'blue' | 'lavender';

/** Design §3 SearchBar — pill input, focus ring in primary. */
export function SearchBar({
  placeholder = 'Search work near you',
  value,
  onChangeText,
  onSubmit,
}: {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View collapsable={false} style={[styles.search, focused && styles.searchFocus]}>
      <Ionicons
        name="search"
        size={20}
        color={Colors.light.primary} // prototype .searchbar .s-ic = --primary (teal, always)
      />
      <TextInput
        accessibilityLabel="Search"
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textMuted}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        style={styles.searchInput}
      />
    </View>
  );
}

/** Design §3 Chip — pill filter; selected = teal fill (prototype v3). */
export function Chip({
  label,
  selected,
  onPress,
  size = 'md',
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md';
}) {
  const box = [styles.filterChip, size === 'sm' && styles.filterChipSm, selected && styles.filterChipSel];
  const text = [styles.filterChipLabel, size === 'sm' && styles.filterChipLabelSm, selected && styles.filterChipLabelSel];
  if (!onPress) {
    return (
      <View style={box} accessibilityRole="text">
        <Text style={text}>{label}</Text>
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: selected === true }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [box, pressed && styles.pressed]}
    >
      <Text style={text}>{label}</Text>
    </Pressable>
  );
}

/** Design §3 CategoryShortcut — tinted icon tile + count badge + label. */
export function CategoryShortcut({
  icon,
  label,
  count,
  tone,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  count?: number;
  tone: AccentTone;
  onPress?: () => void;
}) {
  const c = Colors.light[tone];
  const body = (
    <>
      <View style={[styles.catTile, { backgroundColor: `${c}24` }]}>
        <Ionicons name={icon} size={26} color={c} />
        {count != null ? (
          <View style={styles.catBadge}>
            <Text style={styles.catBadgeText}>{count}</Text>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={1} style={styles.catLabel}>
        {label}
      </Text>
    </>
  );
  if (!onPress) {
    return <View style={styles.cat}>{body}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}${count != null ? `, ${count} open` : ''}`}
      onPress={onPress}
      style={({ pressed }) => [styles.cat, pressed && styles.pressed]}
    >
      {body}
    </Pressable>
  );
}

/** Design §3 IconButton — 44dp circle surface, optional unread badge dot. */
export function IconButton({
  name,
  accessibilityLabel,
  onPress,
  badge,
  color,
  size = 22,
  tone = 'default',
}: {
  name: keyof typeof Ionicons.glyphMap;
  accessibilityLabel: string;
  onPress?: () => void;
  badge?: boolean;
  color?: string;
  size?: number;
  /** 'onBrand' = glass button for the teal header (worker home identity bar) */
  tone?: 'default' | 'onBrand';
}) {
  const dot = <View style={styles.iconBadgeDot} />;
  const body = (
    <>
      <Ionicons name={name} size={size} color={color ?? Colors.light.text} />
      {badge ? dot : null}
    </>
  );
  if (!onPress) {
    return (
      <View
        accessibilityLabel={accessibilityLabel}
        style={[styles.iconBtn, tone === 'onBrand' && styles.iconBtnOnBrand]}
      >
        {body}
      </View>
    );
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconBtn,
        tone === 'onBrand' && styles.iconBtnOnBrand,
        pressed && styles.pressed,
      ]}
    >
      {body}
    </Pressable>
  );
}

/** Design §3 TextField — label above, 48dp box, focus ring, inline error. */
export function TextField({
  label,
  error,
  ...input
}: { label?: string; error?: string } & TextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View collapsable={false} style={styles.field}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <View
        collapsable={false}
        style={[
          styles.fieldBox,
          focused && styles.fieldBoxFocus,
          error != null && styles.fieldBoxError,
        ]}
      >
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={Colors.light.textMuted}
          autoCapitalize="none"
          {...input}
          onFocus={(e) => {
            setFocused(true);
            input.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            input.onBlur?.(e);
          }}
          style={styles.fieldInput}
        />
      </View>
      {error != null ? <Text style={styles.fieldError}>{error}</Text> : null}
    </View>
  );
}

/** Design §3 Avatar — initials disc, optional accent tone. */
export function Avatar({
  name,
  size = 40,
  tone,
}: {
  name: string;
  size?: number;
  tone?: AccentTone;
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase();
  const bg = tone ? `${Colors.light[tone]}24` : Colors.light.tint;
  const fg = tone ? Colors.light[tone] : Colors.light.primaryDark;
  return (
    <View
      accessibilityLabel={name}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}
    >
      <Text style={[styles.avatarText, { color: fg, fontSize: Math.round(size * 0.38) }]}>
        {initials}
      </Text>
    </View>
  );
}


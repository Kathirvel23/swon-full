import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CountdownRing, EarningsChart, Sheet, Timeline, Toast } from '@/components/feedback';
import { TabBar } from '@/components/TabBar';

import { Button, Card, Screen } from '@/components/screen';
import {
  AttentionBanner,
  FormationAvatars,
  MatchRing,
  MoneyDisplay,
  OpportunityCard,
  SeatDots,
  TrustScore,
  WhiteWingBadge,
} from '@/components/marketplace';
import {
  Avatar,
  CategoryShortcut,
  Chip,
  IconButton,
  SearchBar,
  StatusChip,
  TextField,
} from '@/components/ui';
import { Colors, Fonts, Gradients, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * `/design-kit` — the plan's U2 gallery: every token and component rendered
 * live so the owner reviews design by clicking, not by reading code. It grows
 * as each component batch (U3a/b/c) lands. Dev/review only: production builds
 * show a closed message instead of the gallery.
 */

const BRAND: [string, string][] = [
  ['primary', Colors.light.primary],
  ['primaryDark', Colors.light.primaryDark],
  ['primaryDeep', Colors.light.primaryDeep],
  ['primaryLight', Colors.light.primaryLight],
  ['tint', Colors.light.tint],
];
const ACCENTS: [string, string][] = [
  ['orange · FlashMatch', Colors.light.orange],
  ['amber · warning', Colors.light.amber],
  ['yellow · highlight', Colors.light.yellow],
  ['coral · urgent', Colors.light.coral],
  ['green · money', Colors.light.green],
  ['blue · today', Colors.light.blue],
  ['lavender · part-time', Colors.light.lavender],
];
const GRADIENT_KEYS = ['teal', 'warm', 'money', 'deep', 'sun'] as const;
const SEMANTIC: [string, string][] = [
  ['success', Colors.light.success],
  ['warning', Colors.light.warning],
  ['danger', Colors.light.danger],
  ['info', Colors.light.info],
];
const SURFACES: [string, string][] = [
  ['background (warm canvas)', Colors.light.background],
  ['card', Colors.light.card],
  ['line (hairline)', Colors.light.line],
  ['border (inputs)', Colors.light.border],
  ['text (ink)', Colors.light.text],
  ['textMuted', Colors.light.textMuted],
];
const SURFACES_DARK: [string, string][] = [
  ['background', Colors.dark.background],
  ['card', Colors.dark.card],
  ['border', Colors.dark.border],
  ['text', Colors.dark.text],
  ['textMuted', Colors.dark.textMuted],
];
const STATUS_KEYS = Object.keys(Colors.light.status);
const TYPE_ENTRIES: [string, (typeof TypeScale)[keyof typeof TypeScale]][] = [
  ['caption', TypeScale.caption],
  ['bodySm', TypeScale.bodySm],
  ['body', TypeScale.body],
  ['titleSm', TypeScale.titleSm],
  ['title', TypeScale.title],
  ['display', TypeScale.display],
  ['heroAmount', TypeScale.heroAmount],
  ['mega', TypeScale.mega],
];

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <View style={styles.swatchRow}>
      <View style={[styles.swatch, { backgroundColor: hex }]} />
      <Text style={styles.swatchLabel}>
        {name} — {hex}
      </Text>
    </View>
  );
}

export default function DesignKitScreen() {
  const [sheetOpen, setSheetOpen] = useState(false);
  if (!__DEV__) {
    return (
      <Screen title={en.designKit.title}>
        <Text style={styles.para}>{en.designKit.devOnly}</Text>
      </Screen>
    );
  }

  return (
    <Screen title={en.designKit.title}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{en.designKit.mockBadge}</Text>
      </View>
      <Text style={styles.para}>{en.designKit.devOnly}</Text>

      <Card title={en.designKit.colors}>
        <Text style={styles.sub}>Brand</Text>
        {BRAND.map(([n, h]) => (
          <Swatch key={n} name={n} hex={h} />
        ))}
        <Text style={styles.sub}>Semantic</Text>
        {SEMANTIC.map(([n, h]) => (
          <Swatch key={n} name={n} hex={h} />
        ))}
        <Text style={styles.sub}>Surfaces (light)</Text>
        {SURFACES.map(([n, h]) => (
          <Swatch key={n} name={n} hex={h} />
        ))}
        <Text style={styles.sub}>Surfaces (dark)</Text>
        {SURFACES_DARK.map(([n, h]) => (
          <Swatch key={n} name={`dark.${n}`} hex={h} />
        ))}
      </Card>

      <Card title={en.designKit.accents}>
        {ACCENTS.map(([n, h]) => (
          <Swatch key={n} name={n} hex={h} />
        ))}
      </Card>

      <Card title={en.designKit.gradients}>
        {GRADIENT_KEYS.map((g) => (
          <View key={g} style={styles.gradRow}>
            <LinearGradient
              colors={[...Gradients[g]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradBar}
            />
            <Text style={styles.swatchLabel}>
              {g} — {Gradients[g][0]} → {Gradients[g][1]}
            </Text>
          </View>
        ))}
      </Card>

      <Card title={en.designKit.typography}>
        <Text style={styles.fontDisplay}>Good morning, Murugan 👋</Text>
        <Text style={styles.fontBody}>
          Find your next opportunity. Body copy runs in Manrope 16 — readable outdoors, one hand.
        </Text>
        <Text style={styles.fontMoney}>₹8,450</Text>
        <View style={styles.wrap}>
          {[Fonts.display, Fonts.displaySemi, Fonts.body, Fonts.bodySemi, Fonts.bodyBold, Fonts.bodyExtra].map((f) => (
            <View key={f} style={styles.fontChip}>
              <Text style={styles.fontChipText}>{f}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card title={en.designKit.componentsA}>
        <SearchBar placeholder="Search work near you" />
        <View style={styles.wrap}>
          <Chip label="All" />
          <Chip label="Within 5 km" />
          <Chip label="Today" selected />
          <Chip label="Urgent" size="sm" />
        </View>
        <View style={styles.wrap}>
          <CategoryShortcut icon="hammer" label="Construction" count={12} tone="orange" />
          <CategoryShortcut icon="cube" label="Warehouse" count={5} tone="yellow" />
          <CategoryShortcut icon="sparkles" label="Events" count={3} tone="lavender" />
          <CategoryShortcut icon="bicycle" label="Delivery" count={7} tone="blue" />
        </View>
        <TextField label="Mobile number" placeholder="+91 98765 43210" keyboardType="phone-pad" />
        <TextField label="Enter OTP" placeholder="6-digit code" error="Enter the 6-digit code sent to your phone" />
        <View style={styles.wrap}>
          <IconButton name="notifications-outline" accessibilityLabel="Notifications" badge />
          <IconButton name="heart-outline" accessibilityLabel="Saved" />
          <IconButton name="share-social-outline" accessibilityLabel="Share" />
          <Avatar name="Murugan Selvaraj" size={44} />
          <Avatar name="Priya Raman" size={44} tone="lavender" />
          <Avatar name="Karthik S" size={44} tone="blue" />
        </View>
      </Card>

      <Card title={en.designKit.componentsB}>
        <OpportunityCard
          variant="recommended"
          title="Loading helper — 2-day event at Codissia Trade Fair"
          host="Anbu Events"
          location="Race Course, Coimbatore"
          time="Tue–Wed · 9:00 AM"
          payAmount={850}
          matchPercent={92}
          seatsTaken={2}
          seatsTotal={4}
          skills={['Lifting', 'Tamil', 'Weekend']}
          categoryIcon="cube"
          categoryTone="lavender"
          favorited={false}
          onPress={() => {}}
          onFavorite={() => {}}
        />
        <OpportunityCard
          variant="compact"
          title="Inventory count — night shift, Kundrathur"
          host="SVK Logistics"
          location="Poonamallee"
          time="Tonight · 10 PM"
          payAmount={1200}
          onPress={() => {}}
        />
        <View style={styles.wrap}>
          <MatchRing percent={92} />
          <TrustScore score={75} caption={'Profile\nstrength'} />
          <View style={{ gap: Spacing.one }}>
            <WhiteWingBadge />
            <FormationAvatars names={['Murugan S', 'Priya R', 'Karthik S', 'Devi M', 'Raj K']} />
            <SeatDots taken={3} total={6} />
          </View>
        </View>
        <MoneyDisplay amount={8450} suffix="this week" size="lg" />
        <AttentionBanner tone="amber" icon="time" message="Your shift starts in 45 minutes" actionLabel="Check in" onAction={() => {}} />
        <AttentionBanner tone="coral" icon="alert-circle" message="3 seats still open — the host closes in 2 hours" />
      </Card>

      <Card title={en.designKit.componentsC}>
        <EarningsChart
          data={[
            { label: 'M', value: 750 },
            { label: 'T', value: 1200 },
            { label: 'W', value: 0 },
            { label: 'T', value: 850 },
            { label: 'F', value: 1500 },
            { label: 'S', value: 2100, today: true },
            { label: 'S', value: 0 },
          ]}
        />
        <View style={styles.wrap}>
          <CountdownRing remaining="45m" percent={70} label="Shift starts in" />
          <CountdownRing remaining="2h" percent={18} label="Host closes in" />
          <Toast message="Application sent — the host will confirm soon" />
        </View>
        <Timeline
          items={[
            { label: 'Applied', time: 'Mon · 4:12 PM', state: 'done' },
            { label: 'Accepted by host', time: 'Tue · 9:03 AM', state: 'done' },
            { label: 'Check-in opens', time: 'Tue · 8:45 AM', state: 'current' },
            { label: 'Shift completes', time: 'Wed · 6:00 PM', state: 'future' },
          ]}
        />
        <Button
          label="Open sample sheet"
          variant="secondary"
          onPress={() => setSheetOpen(true)}
        />
        <Sheet visible={sheetOpen} onClose={() => setSheetOpen(false)} title="Check-in">
          <Text style={styles.para}>Scan the host QR code or confirm you arrived — the attendance record posts to the backend unchanged.</Text>
          <Button label="Confirm arrival" variant="primary" onPress={() => setSheetOpen(false)} />
        </Sheet>
      </Card>

      <Card title={en.designKit.navCard}>
        <Text style={styles.sub}>Worker — Home active</Text>
        <TabBar role="worker" active="home" preview />
        <Text style={styles.sub}>Host — Opportunities active</Text>
        <TabBar role="host" active="opportunities" preview />
      </Card>

      <Card title={en.designKit.statusChips}>
        <View style={styles.wrap}>
          {STATUS_KEYS.map((s) => (
            <StatusChip key={s} status={s} />
          ))}
        </View>
      </Card>

      <Card title={en.designKit.typeScale}>
        {TYPE_ENTRIES.map(([name, step]) => (
          <View key={name} style={styles.typeRow}>
            <Text style={styles.swatchLabel}>{name}</Text>
            <Text style={[step, styles.typeSample]}>₹750 / day — ₹1,500</Text>
          </View>
        ))}
      </Card>

      <Card title={en.designKit.spacing}>
        <View style={styles.wrap}>
          {[Spacing.one, Spacing.two, Spacing.mid, Spacing.three, Spacing.four, Spacing.five].map(
            (s) => (
              <View key={s} style={styles.spaceRow}>
                <View style={[styles.spaceBar, { width: s * 3, height: s }]} />
                <Text style={styles.swatchLabel}>{s}dp</Text>
              </View>
            ),
          )}
        </View>
        <View style={styles.wrap}>
          {(['sm', 'md', 'lg', 'xl', 'xxl', 'pill'] as const).map((r) => (
            <View key={r} style={[styles.radiusBox, { borderRadius: Radius[r] }]}>
              <Text style={styles.swatchLabel}>{r}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Card title={en.designKit.buttons}>
        {(
          [
            ['primary', en.designKit.variantPrimary],
            ['secondary', en.designKit.variantSecondary],
            ['ghost', en.designKit.variantGhost],
            ['danger', en.designKit.variantDanger],
            ['warm', en.designKit.variantWarm],
            ['money', en.designKit.variantMoney],
            ['onDark', en.designKit.variantOnDark],
          ] as const
        ).map(([v, label]) => (
          <View key={v} style={styles.group}>
            <Button variant={v} size="md" label={`${label} · md`} onPress={() => {}} />
            <Button variant={v} size="lg" label={`${label} · lg`} onPress={() => {}} />
            <Button variant={v} label={`${label} · disabled`} disabled onPress={() => {}} />
            <Button variant={v} label={`${label} · loading`} loading onPress={() => {}} />
          </View>
        ))}
        <Text style={styles.sub}>{en.designKit.buttonStates}</Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.primaryLight,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  badgeText: {
    ...TypeScale.caption,
    fontWeight: '800',
    letterSpacing: 1,
    color: Colors.light.primaryDark,
  },
  para: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  sub: {
    ...TypeScale.bodySm,
    fontWeight: '700',
    color: Colors.light.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: Spacing.one,
  },
  swatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  swatchLabel: {
    ...TypeScale.bodySm,
    color: Colors.light.textSecondary,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  typeRow: {
    gap: Spacing.half,
  },
  typeSample: {
    color: Colors.light.text,
  },
  spaceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minWidth: 90,
  },
  spaceBar: {
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
  },
  radiusBox: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  group: {
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  gradRow: {
    gap: Spacing.half,
    marginBottom: Spacing.two,
  },
  gradBar: {
    height: 44,
    borderRadius: Radius.md,
  },
  fontDisplay: {
    fontFamily: Fonts.display,
    fontSize: 26,
    color: Colors.light.text,
    marginBottom: Spacing.two,
  },
  fontBody: {
    fontFamily: Fonts.body,
    ...TypeScale.body,
    color: Colors.light.textMuted,
    marginBottom: Spacing.two,
  },
  fontMoney: {
    fontFamily: Fonts.display,
    ...TypeScale.heroAmount,
    color: Colors.light.green,
    marginBottom: Spacing.two,
  },
  fontChip: {
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  fontChipText: {
    ...TypeScale.caption,
    color: Colors.light.primaryDark,
  },
});

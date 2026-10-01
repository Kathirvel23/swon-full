import { photoSourceForCategory } from '@/constants/jobPhotos';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { jobsApi, type JobCard } from '@/api/jobs';
import { Sheet } from '@/components/feedback';
import { OpportunityCard } from '@/components/marketplace';
import { Skeleton } from '@/components/motion';
import { Button, Screen } from '@/components/screen';
import { Chip, SearchBar, type AccentTone } from '@/components/ui';
import { Colors, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * Wave 3 (H5) worker discovery feed = UI_PROTOTYPE §w-feed: topbar with the
 * live open-role count + a glass Filters button, SearchBar pill, chip row
 * (sort + real category quick-filters), then `.opp` cards — first two full
 * (CTA), the rest compact — each followed by one eligibility/welfare strip.
 * Same queries, same filters, same handlers; only the presentation moved.
 */

/** Category icon/tone for the card placeholder (photos come from jobPhotos). */
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
  const fallback: { icon: keyof typeof Ionicons.glyphMap; tone: AccentTone }[] = [
    { icon: 'briefcase', tone: 'blue' },
    { icon: 'people', tone: 'lavender' },
    { icon: 'business', tone: 'amber' },
    { icon: 'shirt', tone: 'coral' },
    { icon: 'layers', tone: 'green' },
  ];
  return fallback[index % fallback.length];
}

const paySuffixFor = (payType: JobCard['payType']): string =>
  payType === 'HOUR' ? '/ hour' : payType === 'DAY' ? '/ day' : 'total';

type FactTone = 'muted' | 'success' | 'warning' | 'danger';

const FACT_COLORS: Record<FactTone, string> = {
  muted: Colors.light.textMuted,
  success: Colors.light.success,
  warning: Colors.light.warning,
  danger: Colors.light.danger,
};

/**
 * Distance, seats and pay live on the card now (prototype `.opp`), so this
 * strip carries only what the card cannot: eligibility badges + welfare.
 */
function JobFacts({ job }: { job: JobCard }) {
  const badges = job.viewerBadges;
  const facts: { icon: keyof typeof Ionicons.glyphMap; text: string; tone: FactTone }[] = [];
  if (badges) {
    facts.push({
      icon: 'shield-checkmark-outline',
      text: badges.kycOk ? en.jobs.badgeKycOk : en.jobs.badgeNoKyc,
      tone: badges.kycOk ? 'success' : 'warning',
    });
    facts.push({
      icon: 'ribbon-outline',
      text: badges.matchesSkills ? en.jobs.badgeSkills : en.jobs.badgeNoSkills,
      tone: badges.matchesSkills ? 'success' : 'danger',
    });
  }
  if (job.welfare.length > 0) {
    facts.push({
      icon: 'gift-outline',
      text: job.welfare.map((w) => w.label).join(' · '),
      tone: 'muted',
    });
  }
  if (facts.length === 0) return null;
  return (
    <View style={styles.facts} accessibilityLabel="Eligibility and welfare">
      {facts.map((f) => (
        <View key={f.text} style={styles.fact}>
          <Ionicons name={f.icon} size={13} color={FACT_COLORS[f.tone]} />
          <Text
            style={[styles.factText, f.tone !== 'muted' && { color: FACT_COLORS[f.tone] }]}
            numberOfLines={2}
          >
            {f.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

/** Prototype `.btn.sm.on-dark` — topbar action (the shared Button has no sm size). */
function FiltersButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Filters"
      onPress={onPress}
      style={({ pressed }) => [styles.filtersBtn, pressed && styles.pressed]}
    >
      <Ionicons name="options-outline" size={16} color={Colors.light.onPrimary} />
      <Text style={styles.filtersBtnText}>Filters</Text>
    </Pressable>
  );
}

export default function JobsFeedScreen() {
  const router = useRouter();
  const { q: qParam } = useLocalSearchParams<{ q?: string }>();
  const [q, setQ] = useState(typeof qParam === 'string' ? qParam : '');
  const [sort, setSort] = useState<'DATE_DESC' | 'PAY_DESC'>('DATE_DESC');
  const [category, setCategory] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const feed = useQuery({
    queryKey: ['jobs-feed', q, sort],
    queryFn: () => jobsApi.feed({ q: q || undefined, sort }),
    retry: 1,
  });
  // unfiltered page — same cache key Home uses, so the chips cost no extra call
  const catalog = useQuery({
    queryKey: ['jobs-feed', '', 'DATE_DESC'],
    queryFn: () => jobsApi.feed({ sort: 'DATE_DESC' }),
    retry: 1,
  });

  const counts = new Map<string, number>();
  for (const job of catalog.data ?? []) {
    counts.set(job.category.name, (counts.get(job.category.name) ?? 0) + 1);
  }
  const chipCategories = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);

  const loaded = feed.data ?? [];
  const items = category == null ? loaded : loaded.filter((j) => j.category.name === category);
  const city = loaded[0]?.city;
  const sub =
    city != null && loaded.length > 0 ? `${loaded.length} open roles around ${city}` : null;

  const pickCategory = (name: string | null) => {
    setCategory(name);
    setFiltersOpen(false);
  };

  return (
    <Screen
      title={en.jobs.title}
      tab="explore"
      /* §w-feed topbar: title left, action right — a zero-width left slot
         keeps Screen from reserving its 44dp avatar placeholder here */
      headerLeft={<View />}
      headerSub={sub != null ? <Text style={styles.topSub}>{sub}</Text> : undefined}
      headerRight={<FiltersButton onPress={() => setFiltersOpen(true)} />}
    >
      <SearchBar value={q} onChangeText={setQ} placeholder={en.jobs.searchHint} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityLabel="Sort"
        contentContainerStyle={styles.chipRow}
      >
        <Chip
          label={en.jobs.sortDate}
          selected={sort === 'DATE_DESC'}
          onPress={() => setSort('DATE_DESC')}
        />
        <Chip
          label={en.jobs.sortPay}
          selected={sort === 'PAY_DESC'}
          onPress={() => setSort('PAY_DESC')}
        />
        <Chip label="All" selected={category == null} onPress={() => pickCategory(null)} />
        {chipCategories.map((name) => (
          <Chip
            key={name}
            label={name}
            selected={category === name}
            onPress={() => pickCategory(category === name ? null : name)}
          />
        ))}
      </ScrollView>

      {feed.isError ? (
        <View style={styles.errorRow}>
          <Text style={styles.errorText}>{errorMessage(feed.error)}</Text>
          <Button label={en.common.retry} variant="secondary" onPress={() => void feed.refetch()} />
        </View>
      ) : null}
      {items.length === 0 && !feed.isLoading ? (
        <View style={styles.emptyBox}>
          <Ionicons name="search-outline" size={28} color={Colors.light.textMuted} />
          <Text style={styles.emptyText}>{en.jobs.empty}</Text>
        </View>
      ) : null}

      <View style={styles.list}>
        {feed.isLoading ? (
          <>
            <Skeleton width="100%" height={320} radius={Radius.lg} />
            <Skeleton width="100%" height={320} radius={Radius.lg} />
            <Skeleton width="100%" height={240} radius={Radius.lg} />
          </>
        ) : null}
        {items.map((job, index) => {
          const tile = tileFor(job.category.name, index);
          return (
            <View key={job.publicId} style={styles.item}>
              <OpportunityCard
                variant={index < 2 ? 'nearby' : 'compact'}
                title={job.title}
                host={job.employer.orgName}
                location={`${job.area.name}, ${job.city}`}
                time={`${job.startsOn} · ${job.dayStartTime}–${job.dayEndTime}`}
                payAmount={Math.round(job.payAmountPaise / 100)}
                paySuffix={paySuffixFor(job.payType)}
                seatsTaken={index < 2 ? job.hiredCount : undefined}
                seatsTotal={index < 2 ? job.headcountRequired : undefined}
                skills={job.skills.map((s) => s.name)}
                categoryIcon={tile.icon}
                categoryTone={tile.tone}
                photoSource={photoSourceForCategory(job.category.name) ?? undefined}
                distanceKm={job.distanceKm}
                hostRating={
                  job.employer.ratingsCount > 0 ? job.employer.avgRatingMilli / 1000 : null
                }
                hostVerified={job.employer.kycBadge}
                onPress={() =>
                  router.push({ pathname: '/job/[publicId]', params: { publicId: job.publicId } })
                }
              />
              <JobFacts job={job} />
            </View>
          );
        })}
      </View>

      <Button label={en.common.back} variant="secondary" onPress={() => router.back()} />

      <Sheet visible={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        <Text style={styles.sheetLabel}>Sort</Text>
        <View style={styles.sheetRow}>
          <Chip
            label={en.jobs.sortDate}
            selected={sort === 'DATE_DESC'}
            onPress={() => {
              setSort('DATE_DESC');
              setFiltersOpen(false);
            }}
          />
          <Chip
            label={en.jobs.sortPay}
            selected={sort === 'PAY_DESC'}
            onPress={() => {
              setSort('PAY_DESC');
              setFiltersOpen(false);
            }}
          />
        </View>
        <Text style={styles.sheetLabel}>Category</Text>
        <View style={styles.sheetRow}>
          <Chip label="All" selected={category == null} onPress={() => pickCategory(null)} />
          {chipCategories.map((name) => (
            <Chip
              key={name}
              label={name}
              selected={category === name}
              onPress={() => pickCategory(category === name ? null : name)}
            />
          ))}
        </View>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topSub: {
    ...TypeScale.caption,
    color: Colors.light.onPrimarySoft,
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingRight: Spacing.three,
  },
  filtersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 40,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: Radius.btn,
    borderWidth: 1.5,
    backgroundColor: Colors.light.onBrandSurface,
    borderColor: Colors.light.onBrandBorder,
  },
  filtersBtnText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
  pressed: {
    opacity: 0.7,
  },
  list: {
    gap: 14, // prototype .opp margin-bottom
  },
  item: {
    gap: Spacing.two,
  },
  facts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingHorizontal: Spacing.one,
  },
  fact: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    flexShrink: 1,
  },
  factText: {
    ...TypeScale.caption,
    flex: 1,
  },
  sheetLabel: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: Spacing.one,
  },
  sheetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  errorRow: {
    gap: Spacing.two,
  },
  errorText: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  emptyBox: {
    alignItems: 'center',
    gap: Spacing.two,
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
});

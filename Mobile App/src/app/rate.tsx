'use no memo'; // React Compiler is incompatible with react-hook-form v7 Controller (drops keystrokes in controlled inputs) — opt this file out.
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { errorMessage } from '@/api/client';
import { RATING_TAGS, ratingsApi, type PendingRating, type RatingTag } from '@/api/ratings';
import { AttentionBanner } from '@/components/marketplace';
import { Button, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/**
 * Rate a completed job (double-blind): pick the pending counterpart, stars +
 * optional tags/comment. Blind note up front — comments reveal only when both
 * sides submit or 48 h pass (server-enforced). V3: soft cards, warm star
 * input, pill tags, one hero summary for what you have received.
 */

/** Local tag pill — keeps each tag's testID on the pressable itself. */
function TagChip({
  label,
  selected,
  onPress,
  testID,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  testID: string;
}) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.tag, selected && styles.tagOn, pressed && styles.pressed]}
    >
      <Text style={[styles.tagText, selected && styles.tagTextOn]}>{label}</Text>
    </Pressable>
  );
}

export default function RateScreen() {
  const router = useRouter();
  const qc = useQueryClient();
  const [active, setActive] = useState<PendingRating | null>(null);
  const [tags, setTags] = useState<RatingTag[]>([]);

  const pending = useQuery({ queryKey: ['ratings-pending'], queryFn: () => ratingsApi.pending(), retry: 1 });
  const summary = useQuery({ queryKey: ['rating-summary'], queryFn: () => ratingsApi.summary(), retry: 1 });

  const { control, handleSubmit, reset, formState } = useForm<{ score: number; comment: string }>({
    defaultValues: { score: 0, comment: '' },
  });

  const create = useMutation({
    mutationFn: (v: { score: number; comment: string }) =>
      ratingsApi.create({
        jobPublicId: active!.jobPublicId,
        rateeAccountPublicId: active!.ratee.publicId,
        score: v.score,
        tags,
        comment: v.comment.trim() ? v.comment.trim() : undefined,
      }),
    onSuccess: () => {
      showAlert(en.ratings.title, en.ratings.submitted);
      setActive(null);
      setTags([]);
      reset();
      void qc.invalidateQueries({ queryKey: ['ratings-pending'] });
      void qc.invalidateQueries({ queryKey: ['rating-summary'] });
    },
    onError: (e) => showAlert(en.ratings.title, errorMessage(e)),
  });

  const rows = pending.data ?? [];

  const toggleTag = (t: RatingTag) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  if (active) {
    return (
      <Screen title={en.ratings.ratePerson(active.ratee.displayName)}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{active.jobTitle}</Text>
          <AttentionBanner tone="blue" icon="eye-off" message={en.ratings.blindNote} />

          <Controller
            control={control}
            name="score"
            rules={{ validate: (v) => v >= 1 || en.ratings.submit }}
            render={({ field: { value, onChange } }) => (
              <View style={styles.starsRow}>
                <View testID="stars" style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Pressable
                      key={n}
                      testID={`star-${n}`}
                      accessibilityRole="button"
                      accessibilityLabel={`${n} of 5`}
                      accessibilityState={{ selected: value >= n }}
                      onPress={() => onChange(n)}
                      hitSlop={4}
                    >
                      <Text style={[styles.star, value >= n && styles.starOn]}>★</Text>
                    </Pressable>
                  ))}
                </View>
                {/* display-face readout of the chosen score */}
                <Text style={styles.scoreValue}>{value > 0 ? `${value}.0` : NO_RATING}</Text>
              </View>
            )}
          />

          <Text style={styles.label}>{en.ratings.tagsLabel}</Text>
          <View style={styles.tags}>
            {RATING_TAGS.map((t) => (
              <TagChip
                key={t}
                testID={`tag-${t}`}
                label={t.replace(/_/g, ' ').toLowerCase()}
                selected={tags.includes(t)}
                onPress={() => toggleTag(t)}
              />
            ))}
          </View>

          <Controller
            control={control}
            name="comment"
            render={({ field: { value, onChange } }) => (
              <TextInput
                testID="rating-comment"
                value={value}
                onChangeText={onChange}
                placeholder={en.ratings.commentPlaceholder}
                placeholderTextColor={Colors.light.textMuted}
                maxLength={300}
                multiline
                accessibilityLabel={en.ratings.commentPlaceholder}
                style={styles.textarea}
              />
            )}
          />

          {formState.errors.score ? <Text style={styles.error}>{en.ratings.submit}</Text> : null}

          <Button
            label={en.ratings.submit}
            variant="primary"
            size="lg"
            onPress={handleSubmit((v) => create.mutate(v))}
            disabled={create.isPending}
          />
          <Button
            label={en.common.cancel}
            variant="secondary"
            onPress={() => {
              setActive(null);
              reset();
            }}
          />
        </View>
      </Screen>
    );
  }

  const avg = summary.data ? summary.data.avgRatingMilli / 1000 : 0;

  return (
    <Screen title={en.ratings.title}>
      {pending.isError ? <Text style={styles.error}>{errorMessage(pending.error)}</Text> : null}

      {summary.data ? (
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name="star" size={26} color={Colors.light.amber} />
          </View>
          <View style={styles.heroText}>
            <View style={styles.heroValueRow}>
              <Text style={styles.heroValue}>
                {summary.data.ratingsCount > 0 ? avg.toFixed(1) : NO_RATING}
              </Text>
              {summary.data.ratingsCount > 0 ? <Text style={styles.heroStar}>★</Text> : null}
            </View>
            <Text style={styles.heroCaption}>
              {en.ratings.summary(summary.data.avgRatingMilli, summary.data.ratingsCount)}
            </Text>
          </View>
        </View>
      ) : null}

      {rows.length === 0 && !pending.isLoading ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="star-outline" size={30} color={Colors.light.amber} />
          </View>
          <Text style={styles.emptyText}>{en.ratings.pendingEmpty}</Text>
        </View>
      ) : null}

      {rows.map((p) => (
        <View key={`${p.jobPublicId}-${p.ratee.publicId}`} style={styles.card}>
          <Text style={styles.cardTitle}>{p.jobTitle}</Text>
          <Text style={styles.cardMeta}>{en.ratings.ratePerson(p.ratee.displayName)}</Text>
          <Button label={en.ratings.open} variant="primary" onPress={() => setActive(p)} />
        </View>
      ))}

      <Button label={en.common.retry} onPress={() => void pending.refetch()} />
      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

/** V3 copy for the "no ratings yet" hero value (no i18n key). */
const NO_RATING = '—';

const styles = StyleSheet.create({
  pressed: { opacity: 0.85 },
  card: {
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  cardTitle: { ...TypeScale.titleSm, fontFamily: Fonts.bodyBold, color: Colors.light.text },
  cardMeta: { ...TypeScale.bodySm, color: Colors.light.textMuted },

  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.primaryLight,
    borderWidth: 1,
    borderRadius: Radius.xl,
    padding: Spacing.three,
    ...Elevation.card,
  },
  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: { flex: 1, minWidth: 0, gap: Spacing.half },
  heroValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: Spacing.half },
  heroValue: { ...TypeScale.display, fontFamily: Fonts.display, color: Colors.light.text },
  heroStar: { fontSize: 22, color: Colors.light.amber, fontFamily: Fonts.bodyExtra },
  heroCaption: { ...TypeScale.caption, color: Colors.light.textMuted },

  label: { ...TypeScale.bodySm, fontFamily: Fonts.bodySemi, color: Colors.light.text },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  stars: { flexDirection: 'row', gap: Spacing.two, alignItems: 'center' },
  star: { fontSize: 40, lineHeight: 46, color: Colors.light.amber, opacity: 0.32 },
  starOn: { opacity: 1 },
  scoreValue: { ...TypeScale.display, fontFamily: Fonts.display, color: Colors.light.amber },

  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.one },
  tag: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.mid,
    minHeight: 36,
    justifyContent: 'center',
    backgroundColor: Colors.light.card,
  },
  tagOn: { backgroundColor: Colors.light.primary, borderColor: Colors.light.primary },
  tagText: { ...TypeScale.caption, fontFamily: Fonts.bodySemi, color: Colors.light.text },
  tagTextOn: { color: Colors.light.onPrimary },

  textarea: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    padding: Spacing.mid,
    minHeight: 88,
    marginTop: Spacing.half,
    textAlignVertical: 'top',
    ...TypeScale.body,
    color: Colors.light.text,
    backgroundColor: Colors.light.card,
  },

  empty: {
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
    ...Elevation.card,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { ...TypeScale.body, color: Colors.light.textMuted, textAlign: 'center' },

  error: { ...TypeScale.bodySm, color: Colors.light.danger },
});

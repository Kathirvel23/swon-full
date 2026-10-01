import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { matchingApi } from '@/api/matching';
import { ProgressRing } from '@/components/marketplace';
import { Enter } from '@/components/motion';
import { Button, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * Employer candidates view (§16, V3 #e-queue cards): server-scored workers
 * with the prototype's match ring (green arc + MATCH label), display-face
 * score, canvas stat grid for the score signals and tint reason pills —
 * every request is still logged in match_log with its weights version.
 */

/** Prototype `.match-ring` — conic green arc, display number, MATCH caption. */
function MatchPlate({ percent, size = 52 }: { percent: number; size?: number }) {
  return (
    <View style={{ width: size, height: size }}>
      <ProgressRing percent={percent} size={size} stroke={5} color={Colors.light.green}>
        <Text style={[styles.ringValue, { fontSize: Math.round(size * 0.26) }]}>{percent}</Text>
        <Text style={styles.ringLabel}>MATCH</Text>
      </ProgressRing>
    </View>
  );
}

export default function CandidatesScreen() {
  const router = useRouter();
  const { publicId } = useLocalSearchParams<{ publicId: string }>();

  const match = useQuery({
    queryKey: ['candidates', publicId],
    queryFn: () => matchingApi.candidates(publicId!),
    retry: 1,
  });

  const data = match.data;
  const rows = data?.candidates ?? [];

  return (
    <Screen title={en.quickmatch.candidates}>
      {match.isError ? <Text style={styles.error}>{errorMessage(match.error)}</Text> : null}

      {data ? (
        <View style={styles.summary}>
          <Text style={styles.summaryKicker}>{en.quickmatch.candidates.toUpperCase()}</Text>
          <Text style={styles.summaryScore}>
            {en.quickmatch.score(data.weightsVersion > 0 ? rows[0]?.score ?? 0 : 0)}
          </Text>
          <Text style={styles.summaryMeta}>
            {`${en.quickmatch.ignored(data.ignoredCount)} · ${data.takenMs}ms`}
          </Text>
          <Text style={styles.summaryMeta}>{`v${data.weightsVersion} · ${data.logId.slice(0, 10)}…`}</Text>
        </View>
      ) : null}

      {rows.length === 0 && !match.isLoading ? (
        <Text style={styles.lede}>{en.quickmatch.candidatesEmpty}</Text>
      ) : null}

      {rows.map((c, i) => {
        const percent = Math.round(c.score / 10);
        const s = c.signals;
        return (
          <Enter key={c.workerPublicId} delay={Math.min(i, 6) * 60}>
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <MatchPlate percent={percent} size={52} />
                <View style={styles.cardMain}>
                  <View style={styles.rankRow}>
                    <Text style={styles.rank}>{`#${i + 1}`}</Text>
                    <Text style={styles.score}>{en.quickmatch.score(c.score)}</Text>
                  </View>
                  <Text style={styles.meta}>{c.distanceBand}</Text>
                </View>
              </View>

              <View style={styles.statGrid}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{`${Math.round(s.skillMatchMilli / 10)}%`}</Text>
                  <Text style={styles.statLabel}>skills</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{`${Math.round(s.ratingMilli / 10)}%`}</Text>
                  <Text style={styles.statLabel}>rating</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{`${Math.round(s.proximityMilli / 10)}%`}</Text>
                  <Text style={styles.statLabel}>nearby</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{`${Math.round(s.reliabilityMilli / 10)}%`}</Text>
                  <Text style={styles.statLabel}>reliability</Text>
                </View>
              </View>

              {c.reasonCodes.length > 0 ? (
                <View style={styles.pills}>
                  {c.reasonCodes.slice(0, 6).map((code) => (
                    <View key={code} style={styles.pill}>
                      <Text style={styles.pillText}>{code.replace(/_/g, ' ').toLowerCase()}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          </Enter>
        );
      })}

      <Button label={en.common.retry} onPress={() => void match.refetch()} />
      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  lede: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  error: {
    ...TypeScale.bodySm,
    color: Colors.light.danger,
  },
  summary: {
    gap: Spacing.half,
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.lg,
    padding: Spacing.three,
  },
  summaryKicker: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    fontSize: 11.5,
    letterSpacing: 1.4,
    color: Colors.light.orange,
  },
  summaryScore: {
    fontFamily: Fonts.display,
    fontSize: 30,
    lineHeight: 36,
    color: Colors.light.primaryDark,
  },
  summaryMeta: {
    ...TypeScale.caption,
    color: Colors.light.textMuted,
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
    alignItems: 'center',
    gap: Spacing.mid,
  },
  cardMain: {
    flex: 1,
    gap: 2,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  rank: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 1,
    color: Colors.light.orange,
  },
  score: {
    fontFamily: Fonts.display,
    fontSize: 16.5,
    lineHeight: 21,
    color: Colors.light.text,
  },
  meta: {
    ...TypeScale.caption,
    fontSize: 12,
    color: Colors.light.textMuted,
    fontWeight: '600',
  },
  ringValue: {
    fontFamily: Fonts.display,
    color: Colors.light.success,
    lineHeight: 18,
  },
  ringLabel: {
    fontSize: 7,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.4,
    color: Colors.light.textMuted,
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
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: Spacing.half,
  },
  pill: {
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.pill,
    paddingVertical: 3,
    paddingHorizontal: 9,
  },
  pillText: {
    fontSize: 11,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.primaryDark,
  },
});

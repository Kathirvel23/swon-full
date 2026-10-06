'use no memo'; // React Compiler is incompatible with react-hook-form v7 Controller (drops keystrokes in controlled inputs) — opt this file out.
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';

import { errorMessage } from '@/api/client';
import {
  COMPLAINT_TYPES,
  complaintsApi,
  type Complaint,
  type ComplaintType,
} from '@/api/complaints';
import { Timeline } from '@/components/feedback';
import { AttentionBanner } from '@/components/marketplace';
import { Button, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Radius, Spacing, statusColors, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

/**
 * Party-facing complaints: list my cases with their timelines, file a new
 * one (optionally linked to a job passed via route params), and reply when
 * the case is WAITING_ON_PARTY (L3). Admin decisions live in the admin app.
 * V3: soft case cards, the shared status colour map, and the Timeline
 * component for the event rail.
 */

/** Status pill built from the shared theme colour map + the i18n labels. */
function StatusPill({ status, label }: { status: string; label: string }) {
  const { fg, bg } = statusColors(status);
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Status ${label}`}
      style={[styles.pill, { backgroundColor: bg, borderColor: fg }]}
    >
      <Text style={[styles.pillText, { color: fg }]}>{label}</Text>
    </View>
  );
}

/** Local type pill — keeps each type's testID on the pressable itself. */
function TypeChip({
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

export default function ComplaintsScreen() {
  const router = useRouter();
  const qc = useQueryClient();
  const params = useLocalSearchParams<{ linkType?: string; linkPublicId?: string }>();
  const [composing, setComposing] = useState(false);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [type, setType] = useState<ComplaintType>('PAYMENT');

  const list = useQuery({ queryKey: ['my-complaints'], queryFn: () => complaintsApi.mine(), retry: 1 });

  const { control, handleSubmit, reset, formState } = useForm<{ narrative: string }>({
    defaultValues: { narrative: '' },
  });

  const submit = useMutation({
    mutationFn: (v: { narrative: string }) =>
      complaintsApi.submit({
        type,
        severity: 'MEDIUM',
        linkType: (params.linkType as 'JOB' | undefined) || undefined,
        linkPublicId: (params.linkPublicId as string) || undefined,
        narrative: v.narrative.trim(),
      }),
    onSuccess: () => {
      showAlert(en.complaints.title, en.complaints.sent);
      setComposing(false);
      reset();
      void qc.invalidateQueries({ queryKey: ['my-complaints'] });
    },
    onError: (e) => showAlert(en.complaints.title, errorMessage(e)),
  });

  const reply = useMutation({
    mutationFn: (v: { id: string; body: string }) => complaintsApi.reply(v.id, v.body),
    onSuccess: () => {
      showAlert(en.complaints.title, en.complaints.replied);
      setReplyTo(null);
      setReplyText('');
      void qc.invalidateQueries({ queryKey: ['my-complaints'] });
    },
    onError: (e) => showAlert(en.complaints.title, errorMessage(e)),
  });

  const rows = list.data ?? [];

  const timeline = (c: Complaint) => {
    const events = c.events.slice(-4);
    if (events.length === 0) return null;
    const waiting = c.status === 'WAITING_ON_PARTY';
    return (
      <Timeline
        items={events.map((e, i) => ({
          label: `${e.actor.displayName}: ${e.body ?? e.kind}`,
          time: new Date(e.createdAt).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          }),
          state: waiting && i === events.length - 1 ? ('current' as const) : ('done' as const),
        }))}
      />
    );
  };

  if (composing) {
    return (
      <Screen title={en.complaints.newTitle}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{en.complaints.new}</Text>

          <View style={styles.tags}>
            {COMPLAINT_TYPES.map((t) => (
              <TypeChip
                key={t}
                testID={`type-${t}`}
                label={en.complaints.typeLabels[t] ?? t}
                selected={type === t}
                onPress={() => setType(t)}
              />
            ))}
          </View>

          <Controller
            control={control}
            name="narrative"
            rules={{
              validate: (v) => v.trim().length >= 20 || en.complaints.narrativeShort,
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                testID="narrative"
                value={value}
                onChangeText={onChange}
                placeholder={en.complaints.narrative}
                placeholderTextColor={Colors.light.textMuted}
                multiline
                maxLength={4000}
                accessibilityLabel={en.complaints.narrative}
                style={styles.textarea}
              />
            )}
          />
          {formState.errors.narrative ? (
            <Text style={styles.error}>{en.complaints.narrativeShort}</Text>
          ) : null}
          <Text style={styles.hint}>{en.complaints.ackNote}</Text>

          <Button
            label={en.complaints.submit}
            variant="primary"
            size="lg"
            onPress={handleSubmit((v) => submit.mutate(v))}
            disabled={submit.isPending}
          />
          <Button label={en.common.cancel} variant="secondary" onPress={() => setComposing(false)} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title={en.complaints.title}>
      {list.isError ? <Text style={styles.error}>{errorMessage(list.error)}</Text> : null}

      <Button label={en.complaints.new} variant="primary" size="lg" onPress={() => setComposing(true)} />

      {rows.length === 0 && !list.isLoading ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="help-buoy-outline" size={30} color={Colors.light.primary} />
          </View>
          <Text style={styles.emptyText}>{en.complaints.listEmpty}</Text>
        </View>
      ) : null}

      {rows.map((c: Complaint) => (
        <View key={c.publicId} style={styles.card}>
          <View style={styles.caseHead}>
            <Text style={styles.cardTitle}>{en.complaints.typeLabels[c.type] ?? c.type}</Text>
            <StatusPill status={c.status} label={en.complaints.statusLabels[c.status] ?? c.status} />
          </View>
          <Text style={styles.hint}>
            {new Date(c.createdAt).toLocaleDateString('en-IN')}
          </Text>
          <Text style={styles.caseBody}>{c.narrative.slice(0, 160)}</Text>

          {timeline(c)}

          {c.resolutionNote ? <Text style={styles.resolution}>{c.resolutionNote}</Text> : null}

          {c.status === 'WAITING_ON_PARTY' ? (
            replyTo === c.publicId ? (
              <>
                <TextInput
                  testID={`reply-${c.publicId}`}
                  value={replyText}
                  onChangeText={setReplyText}
                  placeholder={en.complaints.replyPlaceholder}
                  placeholderTextColor={Colors.light.textMuted}
                  multiline
                  accessibilityLabel={en.complaints.replyPlaceholder}
                  style={styles.reply}
                />
                <Button
                  label={en.complaints.replySend}
                  variant="primary"
                  onPress={() =>
                    reply.mutate({ id: c.publicId, body: replyText.trim() }, { onSuccess: () => undefined })
                  }
                  disabled={replyText.trim().length < 2 || reply.isPending}
                />
                <Button label={en.common.cancel} variant="secondary" onPress={() => setReplyTo(null)} />
              </>
            ) : (
              <>
                <AttentionBanner tone="amber" icon="alert-circle" message={en.complaints.waitingBanner} />
                <Button label={en.complaints.replySend} onPress={() => setReplyTo(c.publicId)} />
              </>
            )
          ) : null}
        </View>
      ))}

      <Button label={en.common.retry} onPress={() => void list.refetch()} />
      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

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
  caseHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.two },
  cardTitle: { ...TypeScale.titleSm, fontFamily: Fonts.bodyBold, color: Colors.light.text, flexShrink: 1 },
  caseBody: { ...TypeScale.body, color: Colors.light.text },
  hint: { ...TypeScale.caption, color: Colors.light.textMuted },
  resolution: { ...TypeScale.bodySm, fontFamily: Fonts.bodyBold, color: Colors.light.success },

  pill: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
  pillText: { ...TypeScale.caption, fontFamily: Fonts.bodyBold, letterSpacing: 0.4 },

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
    minHeight: 120,
    textAlignVertical: 'top',
    ...TypeScale.body,
    color: Colors.light.text,
    backgroundColor: Colors.light.card,
  },
  reply: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    padding: Spacing.mid,
    minHeight: 72,
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
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { ...TypeScale.body, color: Colors.light.textMuted, textAlign: 'center' },

  error: { ...TypeScale.bodySm, color: Colors.light.danger },
});

import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { api, errorMessage } from '@/api/client';
import { AttentionBanner } from '@/components/marketplace';
import { Button, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { showAlert } from '@/lib/alert';

type Prefs = { pushEnabled: boolean; smsEnabled: boolean; quietHours: string | null };

/**
 * §22 preferences: per-account push/SMS mute + quiet hours. OTP texts are
 * exempt (always delivered) — noted on screen so the mute never misleads.
 * V3: two soft cards, 48dp switch rows, and the attention banner carries the
 * OTP exemption.
 */
export default function PrefsScreen() {
  const router = useRouter();
  const qc = useQueryClient();
  const [quiet, setQuiet] = useState<string | null>(null);

  const prefs = useQuery({
    queryKey: ['notification-prefs'],
    queryFn: () => api.get<Prefs>('/me/notification-prefs'),
    retry: 1,
  });
  // quiet is local until saved; null = "not edited yet, show the server value"
  const quietValue = quiet ?? prefs.data?.quietHours ?? '';

  const save = useMutation({
    mutationFn: (patch: Partial<Prefs>) => api.put<Prefs>('/me/notification-prefs', patch),
    onSuccess: (d) => {
      showAlert(en.prefs.title, en.prefs.saved);
      setQuiet(d.quietHours ?? '');
      void qc.invalidateQueries({ queryKey: ['notification-prefs'] });
    },
    onError: (e) => showAlert(en.prefs.title, errorMessage(e)),
  });

  const row = (label: string, value: boolean, key: 'pushEnabled' | 'smsEnabled', icon: 'notifications' | 'chatbubble') => (
    <View key={key} style={styles.row}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={18} color={Colors.light.primary} />
      </View>
      <Text style={styles.rowLabel} numberOfLines={2}>
        {label}
      </Text>
      <Switch
        testID={key}
        accessibilityLabel={label}
        value={value}
        onValueChange={(v) => save.mutate({ [key]: v })}
        disabled={save.isPending}
        trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
      />
    </View>
  );

  return (
    <Screen title={en.prefs.title}>
      {prefs.isError ? <Text style={styles.error}>{errorMessage(prefs.error)}</Text> : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{en.prefs.title}</Text>
        {prefs.data ? row(en.prefs.push, prefs.data.pushEnabled, 'pushEnabled', 'notifications') : null}
        {prefs.data ? row(en.prefs.sms, prefs.data.smsEnabled, 'smsEnabled', 'chatbubble') : null}
        <AttentionBanner tone="blue" icon="lock-closed" message={en.prefs.otpNote} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{en.prefs.quiet}</Text>
        <TextInput
          testID="quiet-hours"
          value={quietValue}
          onChangeText={setQuiet}
          placeholder={en.prefs.quietHint}
          placeholderTextColor={Colors.light.textMuted}
          autoCapitalize="none"
          accessibilityLabel={en.prefs.quiet}
          style={styles.input}
        />
        <Text style={styles.hint}>{en.prefs.quietHint}</Text>
        <Button
          label={en.prefs.saved}
          variant="primary"
          size="lg"
          onPress={() => save.mutate({ quietHours: quietValue.trim() ? quietValue.trim() : null })}
          disabled={save.isPending}
        />
      </View>

      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  cardTitle: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: Colors.light.textMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.mid,
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.line,
    paddingVertical: Spacing.half,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { ...TypeScale.body, flex: 1, color: Colors.light.text },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.mid,
    paddingVertical: Spacing.two,
    minHeight: 48,
    backgroundColor: Colors.light.card,
    ...TypeScale.body,
    color: Colors.light.text,
  },
  hint: { ...TypeScale.caption, color: Colors.light.textMuted },
  error: { ...TypeScale.bodySm, color: Colors.light.danger },
});

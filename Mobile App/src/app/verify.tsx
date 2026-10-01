import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { kycApi, type KycDocType, type KycIdType, type KycSubmission } from '@/api/kyc';
import { AttentionBanner, WhiteWingBadge } from '@/components/marketplace';
import { Button, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * Wave 2 (M5): identity verification — start form (consent + ID), document
 * upload via presigned ticket, status timeline, reject/retry (K5), verified
 * badge. Server enforces every state transition; this screen only renders it.
 * V3: status banner by state, WhiteWing badge once verified, soft cards.
 */

const CONSENT_VERSION = '2026-09-v1'; // must match backend KYC_CONSENT_VERSION
const ID_TYPES: KycIdType[] = ['PAN', 'VOTER', 'DRIVING', 'PASSPORT'];
const DOC_ORDER: KycDocType[] = ['ID_FRONT', 'ID_BACK', 'SELFIE'];

/** V3 status banner tone per KYC state (presentation only). */
const STATUS_TONE: Record<string, { tone: 'blue' | 'amber' | 'green' | 'coral'; icon: keyof typeof Ionicons.glyphMap }> = {
  DRAFT: { tone: 'blue', icon: 'document-text-outline' },
  SUBMITTED: { tone: 'blue', icon: 'hourglass-outline' },
  UNDER_REVIEW: { tone: 'amber', icon: 'time-outline' },
  VERIFIED: { tone: 'green', icon: 'checkmark-circle-outline' },
  REJECTED: { tone: 'coral', icon: 'close-circle-outline' },
};

type FormValues = { idNumber: string; consent: boolean };

export default function VerifyScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const kyc = useQuery({ queryKey: ['kyc'], queryFn: kycApi.active, retry: 1 });

  const [idType, setIdType] = useState<KycIdType>('PAN');
  const [busyDoc, setBusyDoc] = useState<KycDocType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [starting, setStarting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const submission: KycSubmission | null = kyc.data?.submission ?? null;
  const showForm = !submission || submission.status === 'DRAFT' || submission.status === 'REJECTED';

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: { idNumber: '', consent: false },
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['kyc'] });

  const onStart = handleSubmit(async (values) => {
    setStarting(true);
    setServerError(null);
    try {
      await kycApi.create({
        idType,
        idNumber: values.idNumber.trim(),
        consentAccepted: true,
        consentVersion: CONSENT_VERSION,
      });
      await refresh();
    } catch (e) {
      setServerError(errorMessage(e));
    } finally {
      setStarting(false);
    }
  });

  const onUpload = async (docType: KycDocType) => {
    setServerError(null);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
      if (result.canceled || !result.assets?.[0]) return;
      const asset = result.assets[0];
      setBusyDoc(docType);
      const ticket = await kycApi.ticket(docType);
      await kycApi.upload(
        ticket.uploadUrl,
        asset.uri,
        asset.fileName ?? `${docType.toLowerCase()}.jpg`,
        asset.mimeType ?? 'image/jpeg',
      );
      await refresh();
    } catch (e) {
      setServerError(errorMessage(e));
    } finally {
      setBusyDoc(null);
    }
  };

  const onSubmitDocs = async () => {
    setSubmitting(true);
    setServerError(null);
    try {
      await kycApi.submit();
      await refresh();
    } catch (e) {
      setServerError(errorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  const docLabel = (docType: KycDocType) =>
    (en.kyc.docLabels as Record<string, string>)[docType] ?? docType;

  const tone = STATUS_TONE[submission?.status ?? ''] ?? STATUS_TONE.DRAFT;
  const statusText = submission
    ? (en.kyc.status as Record<string, string>)[submission.status] ?? submission.status
    : '';

  return (
    <Screen title={en.kyc.title}>
      <Text style={styles.intro}>{en.kyc.intro}</Text>

      {serverError ? (
        <AttentionBanner tone="coral" icon="alert-circle" message={serverError} />
      ) : null}

      {submission ? (
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <Ionicons name={tone.icon} size={22} color={Colors.light[tone.tone]} />
            <Text style={styles.cardTitle}>{statusText}</Text>
          </View>
          {submission.status === 'VERIFIED' ? <WhiteWingBadge /> : null}

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{en.kyc.infoSubmitted}</Text>
            <Text style={styles.infoValue}>{submission.idNumberMasked}</Text>
          </View>
          <Text style={styles.hint}>
            {`${en.kyc.attempts(submission.attempts, submission.maxAttempts)} — ${en.kyc.maskedHint}`}
          </Text>
          {submission.status === 'REJECTED' && submission.rejectionReason ? (
            <AttentionBanner
              tone="coral"
              icon="close-circle"
              message={en.kyc.rejectReason(submission.rejectionReason)}
            />
          ) : null}
        </View>
      ) : null}

      {showForm ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {submission?.status === 'REJECTED' ? en.kyc.tryAgain : en.kyc.start}
          </Text>

          <Text style={styles.label}>{en.kyc.idType}</Text>
          <View style={styles.tags}>
            {ID_TYPES.map((type) => (
              <Pressable
                key={type}
                accessibilityRole="button"
                accessibilityState={{ selected: idType === type }}
                accessibilityLabel={(en.kyc.idTypes as Record<string, string>)[type]}
                onPress={() => setIdType(type)}
                style={({ pressed }) => [
                  styles.tag,
                  idType === type && styles.tagOn,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={[styles.tagText, idType === type && styles.tagTextOn]}>
                  {(en.kyc.idTypes as Record<string, string>)[type]}
                </Text>
              </Pressable>
            ))}
          </View>

          <Controller
            control={control}
            name="idNumber"
            rules={{
              required: en.kyc.idInvalid,
              minLength: { value: 4, message: en.kyc.idInvalid },
              maxLength: { value: 20, message: en.kyc.idInvalid },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={en.kyc.idNumberPlaceholder}
                placeholderTextColor={Colors.light.textMuted}
                autoCapitalize="characters"
                accessibilityLabel={en.kyc.idNumber}
                style={styles.input}
              />
            )}
          />
          {errors.idNumber ? <Text style={styles.error}>{errors.idNumber.message}</Text> : null}

          <Text style={styles.consentText}>{en.kyc.consentTerms}</Text>
          <Controller
            control={control}
            name="consent"
            rules={{ required: en.kyc.consentRequired }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.checkRow}>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  accessibilityLabel={en.kyc.consentLabel}
                  trackColor={{ false: Colors.light.border, true: Colors.light.primary }}
                />
                <Text style={styles.checkLabel}>{en.kyc.consentLabel}</Text>
              </View>
            )}
          />
          {errors.consent ? <Text style={styles.error}>{en.kyc.consentRequired}</Text> : null}

          <Button
            label={starting ? en.kyc.starting : en.kyc.start}
            variant="primary"
            size="lg"
            onPress={() => void onStart()}
            disabled={starting}
          />
        </View>
      ) : null}

      {submission && submission.status === 'DRAFT' ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{en.kyc.uploadTitle}</Text>
          <Text style={styles.hint}>{en.kyc.uploadHint}</Text>
          <View style={styles.docList}>
            {DOC_ORDER.map((docType) => {
              const uploaded = submission.documents.some((d) => d.docType === docType);
              return (
                <Button
                  key={docType}
                  label={
                    busyDoc === docType
                      ? en.kyc.uploadingDoc
                      : uploaded
                        ? en.kyc.docAdded(docLabel(docType))
                        : en.kyc.addDoc(docLabel(docType))
                  }
                  variant={uploaded ? 'primary' : 'secondary'}
                  onPress={() => void onUpload(docType)}
                  disabled={busyDoc !== null}
                />
              );
            })}
          </View>
          <Button
            label={submitting ? en.kyc.submitting : en.kyc.submitReview}
            variant="primary"
            size="lg"
            onPress={() => void onSubmitDocs()}
            disabled={submitting}
          />
        </View>
      ) : null}

      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.85 },
  intro: { ...TypeScale.body, color: Colors.light.textMuted },
  card: {
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  cardTitle: { ...TypeScale.titleSm, fontFamily: Fonts.bodyBold, color: Colors.light.text, flexShrink: 1 },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    backgroundColor: Colors.light.tint,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  infoLabel: { ...TypeScale.caption, color: Colors.light.textMuted },
  infoValue: { ...TypeScale.bodySm, fontFamily: Fonts.bodyBold, color: Colors.light.text },
  hint: { ...TypeScale.caption, color: Colors.light.textMuted },
  label: { ...TypeScale.bodySm, fontFamily: Fonts.bodySemi, color: Colors.light.text },

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
  consentText: { ...TypeScale.caption, lineHeight: 18, color: Colors.light.textMuted },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two, minHeight: 48 },
  checkLabel: { ...TypeScale.bodySm, color: Colors.light.text, flexShrink: 1 },
  docList: { gap: Spacing.two },
  error: { ...TypeScale.bodySm, color: Colors.light.danger },
});

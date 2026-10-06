'use no memo'; // React Compiler is incompatible with react-hook-form v7 Controller (drops keystrokes in controlled inputs) — opt this file out.
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ImageSourcePropType, TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { errorMessage } from '@/api/client';
import { authApi } from '@/api/auth';
import { Enter } from '@/components/motion';
import { Button } from '@/components/screen';
import {
  Colors,
  Elevation,
  Fonts,
  MaxContentWidth,
  Radius,
  Spacing,
  Touch,
  TypeScale,
} from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * H1 — real sign-in (§15): phone → POST /auth/otp/request → OTP screen.
 * Phone regex = Indian mobile (6-9 start, 10 digits). The challengeId (not the
 * phone) travels to the next screen; devCode rides along only in DEV builds
 * where the backend simulates SMS.
 *
 * RN convention: RHF <Controller> + onChangeText (register() breaks on RN).
 *
 * V4 login reskin — warm, human, work-first (owner reference, 2026-10-05):
 * the screen moves off the full-bleed teal shell onto the V3 warm canvas with a
 * soft mint wash up top. The top ~38% is a HERO: brand wordmark, the
 * "WORKER · OPPORTUNITY · HOST" eyebrow, the "Work Today. A Better Tomorrow."
 * headline, the "Find work. Build trust. Get paid." line, and a single real
 * work photo (bundled assets/jobs/*) with two small circular work photos —
 * communicating worker + opportunity + host without a stock-recruitment look.
 * Below sits the white login card (r-xxl, --shadow-pop) carrying the unchanged
 * form: canvas pill field (+91 prefix), full-width primary CTA, hint and legal.
 * The stats strip + KYC pill close the screen on the warm canvas.
 *
 * PRESENTATION ONLY. Schema, RHF controller, OTPhand-off, session and routing
 * are byte-for-byte the same as before. The card is a plain View on purpose
 * (the field keeps focus on Android / New Architecture); only non-input blocks
 * carry the FadeInDown entrance (components/motion Enter).
 */

const phoneSchema = z.string().regex(/^[6-9][0-9]{9}$/, en.auth.invalidPhone);

type LoginFormValues = { phone: string };

/** Two real, bundled work photos (assets/jobs — CC-licensed, see CREDITS.md). */
const HERO_PHOTO = require('../../../assets/jobs/construction.jpg') as ImageSourcePropType;
const CIRCLE_A = require('../../../assets/jobs/delivery.jpg') as ImageSourcePropType;
const CIRCLE_B = require('../../../assets/jobs/cleaning.jpg') as ImageSourcePropType;
const WORDMARK = require('../../../assets/brand/swon-wordmark.png') as ImageSourcePropType;
const WORD_ASPECT = 323 / 1119;

/** Hero copy (owner reference, 2026-10-05). */
const HEADLINE = 'Work Today.\nA Better Tomorrow.';
const SUBLINE = 'Find work. Build trust. Get paid.';
const CAPS = 'WORKER · OPPORTUNITY · HOST';

/** Simplified trust strip (existing copy, quieted to feel like real metrics). */
const STATS = [
  { value: '12,400+', label: 'WORKERS IN THE FLOCK', tone: Colors.light.primary },
  { value: '3,200', label: 'OPPORTUNITIES THIS WEEK', tone: Colors.light.orange },
  { value: '4.8★', label: 'AVG TRUSTSCORE', tone: Colors.light.green },
] as const;

/** Prototype `.field` — canvas box (r14, 1.5px border), label above, teal focus ring. */
function PillField({
  label,
  error,
  prefix,
  ...input
}: { label: string; error?: string; prefix?: string } & TextInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <View collapsable={false} style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View
        collapsable={false}
        style={[
          styles.fieldBox,
          focused && styles.fieldBoxFocus,
          error != null && styles.fieldBoxError,
        ]}
      >
        {prefix ? <Text style={styles.prefix}>{prefix}</Text> : null}
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={Colors.light.textMuted}
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
      {error != null ? (
        <View style={[styles.msgRow, styles.msgInField]}>
          <Ionicons name="alert-circle" size={16} color={Colors.light.danger} />
          <Text style={styles.msgText}>{error}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ defaultValues: { phone: '' } });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    setSending(true);
    try {
      const otp = await authApi.requestOtp(`+91${values.phone}`);
      router.push({
        pathname: '/otp',
        params: {
          phone: values.phone,
          challengeId: otp.challengeId,
          cooldownSec: String(otp.cooldownSec),
          ...(otp.devCode ? { devCode: otp.devCode } : {}),
        },
      });
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.root}>
      {/* soft mint wash across the hero, settling onto the warm canvas */}
      <LinearGradient
        colors={[Colors.light.tint, Colors.light.background]}
        locations={[0, 0.55]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.3, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView edges={['top']} style={styles.flex}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="always"
          >
            <View style={styles.inner}>
              {/* ---- HERO: brand + story + real work photography ---- */}
              <Enter style={styles.hero}>
                <Image
                  source={WORDMARK}
                  resizeMode="contain"
                  style={styles.wordmark}
                  accessibilityRole="image"
                  accessibilityLabel="SWON"
                />
                <Text style={styles.eyebrow}>{CAPS}</Text>
                <Text style={styles.headline} accessibilityRole="header">
                  {HEADLINE}
                </Text>
                <Text style={styles.subline}>{SUBLINE}</Text>

                <View style={styles.photoStage}>
                  <View style={styles.photoWrap}>
                    <Image source={HERO_PHOTO} resizeMode="cover" style={styles.photo} />
                    {/* gentle deep-teal scrim so the photo reads as brand, not stock */}
                    <LinearGradient
                      colors={['rgba(11, 69, 64, 0)', 'rgba(11, 69, 64, 0.42)']}
                      start={{ x: 0.5, y: 0.35 }}
                      end={{ x: 0.5, y: 1 }}
                      style={StyleSheet.absoluteFill}
                    />
                  </View>
                  {/* supporting work visuals float OVER the photo edge (siblings of the
                      clipped photo, so they never get cropped by its rounded corner) */}
                  <View style={[styles.bubble, styles.bubbleTopRight]} pointerEvents="none">
                    <Image source={CIRCLE_A} resizeMode="cover" style={styles.bubbleImg} />
                  </View>
                  <View style={[styles.bubble, styles.bubbleBottomLeft]} pointerEvents="none">
                    <Image source={CIRCLE_B} resizeMode="cover" style={styles.bubbleImg} />
                  </View>
                </View>
              </Enter>

              {/* ---- LOGIN CARD: unchanged form, new surface ---- */}
              {/* Plain View on purpose: wrapping the TextInput in an animated
                  container made the field lose focus on Android (New Architecture
                  re-creates/moves the native view). */}
              <View style={styles.card}>
                <View style={styles.cardHead}>
                  <Text style={styles.cardTitle} accessibilityRole="header">
                    {en.auth.loginTitle}
                  </Text>
                  <Text style={styles.lead}>{en.auth.loginSubtitle}</Text>
                </View>

                <Controller
                  control={control}
                  name="phone"
                  rules={{
                    validate: (value) => {
                      const parsed = phoneSchema.safeParse(value);
                      return parsed.success
                        ? true
                        : (parsed.error.issues[0]?.message ?? en.auth.invalidPhone);
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <PillField
                      label={en.auth.phoneLabel}
                      prefix={en.auth.phonePrefix}
                      error={errors.phone?.message}
                      keyboardType="phone-pad"
                      maxLength={10}
                      placeholder={en.auth.phonePlaceholder}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                {formError ? (
                  <View style={styles.msgRow}>
                    <Ionicons name="alert-circle" size={16} color={Colors.light.danger} />
                    <Text style={styles.msgText}>{formError}</Text>
                  </View>
                ) : null}

                <Button
                  variant="primary"
                  size="lg"
                  label={sending ? en.auth.sending : en.auth.sendCode}
                  disabled={sending}
                  onPress={handleSubmit(onSubmit)}
                />

                <View style={styles.cardFoot}>
                  <Text style={styles.hint}>{en.auth.loginHint}</Text>
                  <Text style={styles.legal}>{en.auth.legal}</Text>
                </View>
              </View>

              {/* ---- trust strip (simplified) ---- */}
              <Enter delay={220} style={styles.stats}>
                {STATS.map((stat) => (
                  <View key={stat.label} style={styles.statBox}>
                    <Text style={[styles.statValue, { color: stat.tone }]}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </Enter>

              {/* ---- KYC pill ---- */}
              <Enter delay={280} style={styles.kycWrap}>
                <View style={styles.kyc}>
                  <Ionicons name="shield-checkmark" size={14} color={Colors.light.primaryDark} />
                  <Text style={styles.kycText}>KYC-protected marketplace</Text>
                </View>
              </Enter>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.three,
    paddingTop: Spacing.two,
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexGrow: 1,
  },
  // ---- hero ----
  hero: {
    gap: 0,
  },
  wordmark: {
    width: 112,
    height: Math.round(112 * WORD_ASPECT),
    marginBottom: 16,
  },
  eyebrow: {
    fontSize: 11.5,
    lineHeight: 16,
    letterSpacing: 1.75,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.primary,
    marginBottom: 6,
  },
  headline: {
    fontFamily: Fonts.display,
    fontSize: 27,
    lineHeight: 32,
    color: Colors.light.primaryDeep,
    marginBottom: 6,
  },
  subline: {
    fontFamily: Fonts.bodySemi,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.textMuted,
    marginBottom: 16,
  },
  photoStage: {
    height: 148,
  },
  photoWrap: {
    flex: 1,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.light.primaryDeep,
    ...Elevation.card,
  },
  photo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  bubble: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 3,
    borderColor: Colors.light.card,
    overflow: 'hidden',
    backgroundColor: Colors.light.card,
    ...Elevation.card,
  },
  bubbleTopRight: {
    right: -4,
    top: -4,
  },
  bubbleBottomLeft: {
    left: -4,
    bottom: -4,
  },
  bubbleImg: {
    width: '100%',
    height: '100%',
  },
  // ---- card ----
  card: {
    gap: Spacing.three,
    backgroundColor: Colors.light.card,
    borderRadius: Radius.xxl, // 30 — soft, native "sheet" feel
    padding: 22,
    marginTop: 18,
    ...Elevation.pop,
  },
  cardHead: {
    gap: Spacing.one,
  },
  cardTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: Fonts.display,
    color: Colors.light.text,
  },
  lead: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodyExtra,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: Colors.light.textMuted,
  },
  fieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: Touch.min,
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    borderRadius: Radius.btn,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.light.background,
  },
  fieldBoxFocus: {
    // Only recolor on focus. Adding elevation/shadow here changes native view
    // properties mid-focus, which on the New Architecture can move the
    // TextInput in the native hierarchy and drop focus.
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.card,
  },
  fieldBoxError: {
    borderColor: Colors.light.danger,
    backgroundColor: Colors.light.dangerSoft,
  },
  prefix: {
    ...TypeScale.body,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.textMuted,
  },
  fieldInput: {
    flex: 1,
    ...TypeScale.body,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.text,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -6,
  },
  msgInField: {
    marginTop: 10,
  },
  msgText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.danger,
  },
  cardFoot: {
    gap: Spacing.one,
  },
  hint: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    lineHeight: 18,
    textAlign: 'center',
    color: Colors.light.textMuted,
  },
  legal: {
    fontSize: 11.5,
    lineHeight: 17,
    textAlign: 'center',
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
    marginTop: Spacing.one,
  },
  // ---- stats ----
  stats: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: 14,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Elevation.card,
  },
  statValue: {
    fontFamily: Fonts.display,
    fontSize: 19,
    lineHeight: 23,
  },
  statLabel: {
    fontSize: 10,
    lineHeight: 13,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },
  // ---- KYC pill ----
  kycWrap: {
    marginTop: 'auto',
    paddingTop: 12,
    alignItems: 'center',
  },
  kyc: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: Radius.pill,
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
  },
  kycText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primaryDark,
  },
});

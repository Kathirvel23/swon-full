import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { errorMessage } from '@/api/client';
import { authApi } from '@/api/auth';
import { BrandLogo } from '@/components/brandLogo';
import { Enter } from '@/components/motion';
import { Button } from '@/components/screen';
import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
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
 * V3 auth reskin (prototype s-login): the screen no longer sits under the
 * shared teal topbar — auth screens are full-bleed `--g-home` (teal gradient
 * + warm top-right radial glow), so this file owns its own shell: gradient
 * root → SafeAreaView → ScrollView → centred column. Above the white auth
 * card sits the centred auth-top (brand lockup, tag line, tiny caps line);
 * the card itself is r-xl (24) with 24px top padding, `--shadow-pop`, the
 * canvas pill field (+91 prefix), full-width primary CTA and the legal line.
 * The login stats row + KYC pill from the prototype close the screen.
 * Presentation only — schema, controller and request are untouched.
 *
 * Brand entrance ("soft arrival" v2 — owner smoothness pass, 2026-09-30): the
 * auth-top renders the animated BrandLogo lockup (icon ease → wordmark rise →
 * complete halo pulse; timing-based, no spring, no rotating arc) and the card
 * follows at 560ms with a soft 420ms fade-up via Enter. Form logic untouched.
 */

const phoneSchema = z.string().regex(/^[6-9][0-9]{9}$/, en.auth.invalidPhone);

type LoginFormValues = { phone: string };

/** Prototype `.auth-top .ta` — the tiny tracked caps line under the tag. */
const CAPS = 'WORKER · OPPORTUNITY · HOST';

/** Prototype login stats strip (decorative, verbatim copy). */
const STATS = [
  { value: '12,400+', label: 'WORKERS IN THE FLOCK', tone: Colors.light.onPrimary },
  { value: '3,200', label: 'OPPORTUNITIES THIS WEEK', tone: Colors.light.yellow },
  { value: '4.8★', label: 'AVG TRUSTSCORE', tone: Colors.light.primaryLight },
] as const;

/** Alpha-composited theme token (prototype --g-home warm corner glow). */
function glow(hex: string, alpha: number): string {
  const rgb = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(rgb >> 16) & 255}, ${(rgb >> 8) & 255}, ${rgb & 255}, ${alpha})`;
}

/** --g-home's radial: warm 0.30 at the top-right corner, feathered to 0. */
const WARM_GLOW = [
  glow(Colors.light.orange, 0.3),
  glow(Colors.light.orange, 0.14),
  glow(Colors.light.orange, 0),
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
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View
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
      {/* prototype --g-home: linear-gradient(160deg, #0F766E 0%, #0B4540 78%) */}
      <LinearGradient
        colors={[...Gradients.teal]}
        locations={[0, 0.78]}
        start={{ x: 0.35, y: 0 }}
        end={{ x: 0.65, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* ...plus the warm radial glow in the top-right corner */}
      <LinearGradient
        colors={WARM_GLOW}
        locations={[0, 0.34, 0.72]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.1, y: 0.95 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inner}>
            {/* prototype .auth-top — centred brand lockup, tag line, caps line */}
            <View style={styles.authTop}>
              <BrandLogo />
              <Text style={styles.tag}>Find work. Build trust. Get paid.</Text>
              <Text style={styles.caps}>{CAPS}</Text>
            </View>

            {/* brand entrance first (icon → wordmark → halo), then the card follows
                softly — tightened in the 2026-09-30 smoothness pass (was 780ms/240) */}
            <Enter delay={560} duration={420}>
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
            </Enter>

            {/* prototype login stats strip */}
            <View style={styles.stats}>
              {STATS.map((stat) => (
                <View key={stat.label} style={styles.statBox}>
                  <Text style={[styles.statValue, { color: stat.tone }]}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* prototype KYC pill — pinned to the bottom of the column */}
            <View style={styles.kycWrap}>
              <View style={styles.kyc}>
                <Ionicons name="shield-checkmark" size={14} color={Colors.light.onPrimary} />
                <Text style={styles.kycText}>KYC-protected marketplace</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.primaryDeep,
  },
  safe: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.three,
    paddingTop: 46, // prototype .auth-screen .screen-body { padding-top: 46px }
    flexGrow: 1,
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexGrow: 1,
  },
  authTop: {
    alignItems: 'center',
    marginBottom: 22, // prototype .auth-top { margin-bottom: 22px }
  },
  tag: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.onPrimarySoft,
    textAlign: 'center',
  },
  caps: {
    marginTop: 3,
    fontSize: 12.5,
    lineHeight: 17,
    letterSpacing: 1.75, // prototype .auth-top .ta { letter-spacing: .14em }
    fontFamily: Fonts.bodySemi,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
  card: {
    gap: Spacing.three,
    backgroundColor: Colors.light.card,
    borderRadius: Radius.xl, // prototype .auth-card radius 24
    paddingTop: Spacing.four, // 24 top
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    ...Elevation.pop, // prototype --shadow-pop
  },
  cardHead: {
    gap: Spacing.one,
  },
  cardTitle: {
    fontSize: 19,
    lineHeight: 24,
    fontFamily: Fonts.display, // prototype .auth-card h (display 19/800)
    color: Colors.light.text,
  },
  lead: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
  },
  field: {
    gap: 6, // prototype .field-label { margin: 14px 0 6px }
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
    borderRadius: Radius.btn, // prototype .field { border-radius: 14px }
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: Colors.light.background, // prototype var(--canvas)
  },
  fieldBoxFocus: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.card,
    shadowColor: Colors.light.primary,
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  fieldBoxError: {
    borderColor: Colors.light.danger,
    backgroundColor: Colors.light.dangerSoft,
  },
  prefix: {
    ...TypeScale.body,
    fontFamily: Fonts.bodyExtra, // prototype .field .pfx { font-weight: 800 }
    color: Colors.light.textMuted,
  },
  fieldInput: {
    flex: 1,
    ...TypeScale.body,
    fontFamily: Fonts.bodyBold, // prototype .field input { 16.5 / 700 }
    color: Colors.light.text,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -6, // grid gap 16 → prototype .form-msg { margin-top: 10px }
  },
  msgInField: {
    marginTop: 10, // field gap 6 + 4 → prototype .form-msg { margin-top: 10px }
  },
  msgText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold, // prototype .form-msg
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
    fontFamily: Fonts.bodySemi, // prototype .legal
    color: Colors.light.textMuted,
    marginTop: Spacing.one,
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: 22, // prototype stats strip { margin-top: 22px }
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: 11,
    paddingHorizontal: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  statValue: {
    fontFamily: Fonts.display,
    fontSize: 20,
    lineHeight: 24,
  },
  statLabel: {
    fontSize: 10.5,
    lineHeight: 13,
    fontFamily: Fonts.bodyBold,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
  },
  kycWrap: {
    marginTop: 'auto', // prototype KYC pill sits at the bottom of the column
    paddingTop: 18,
    alignItems: 'center',
  },
  kyc: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  kycText: {
    fontSize: 11.5,
    lineHeight: 15,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.onPrimary,
  },
});

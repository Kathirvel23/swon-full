'use no memo'; // React Compiler is incompatible with react-hook-form v7 Controller (drops keystrokes in controlled inputs) — opt this file out.
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch, type Control } from 'react-hook-form';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { errorMessage } from '@/api/client';
import { authApi } from '@/api/auth';
import { Enter } from '@/components/motion';
import { Button } from '@/components/screen';
import { WingMotif } from '@/components/wingMotif';
import {
  Colors,
  Elevation,
  Fonts,
  Gradients,
  MaxContentWidth,
  Radius,
  Spacing,
} from '@/constants/theme';
import { en } from '@/i18n/strings';
import { useSession } from '@/store/session';

/**
 * H1 — OTP verification (§15): exact 6 digits; wrong code keeps you here with
 * server-side attempt tracking (5 attempts → lockout); cooldown gates resend.
 * Success stores the token pair, mirrors the account summary, and routes:
 *   new account  → /role (one role per account, §11.1)
 *   role worker  → /worker
 *   role employer → /employer
 *
 * DEV builds show the sim code (backend OTP_SIM) — production gets the code
 * over SMS only.
 *
 * V4 auth reskin (owner reference, 2026-10-05) — the OTP screen is the focused
 * utility sibling of the redesigned login. Deep-teal brand field + the SWON
 * wing motif, a small LIGHT wordmark as the brand mark (the dark asset is
 * invisible on teal), the "Verify your phone number" display heading, and the
 * "Enter the 6-digit code sent to +91 …" line — then a single white card
 * (r-xxl, --shadow-pop) holding the dev banner, the six code boxes, resend,
 * the primary CTA and the "Change number" text action.
 *
 * UNCHANGED UNDERNEATH: the six boxes are presentation only, driven by the ONE
 * hidden code input (Controller value + focus state) that covers the row, so a
 * tap anywhere focuses it — this keeps the proven Android/New-Architecture
 * focus behaviour. Validation, verify/resend requests, the countdown, token
 * storage and role routing above are untouched. Only the brand mark, copy,
 * spacing and surfaces changed.
 */

const codeSchema = /^\d{6}$/;

type OtpFormValues = { code: string };

type RouteParams = {
  phone?: string;
  challengeId?: string;
  cooldownSec?: string;
  devCode?: string;
};

/** Number of code boxes rendered. */
const BOXES = 6;

/** Light wordmark (white letters + mint "o") — the dark asset is invisible on teal. */
const WORDMARK_LIGHT = require('../../../assets/brand/swon-wordmark-light.png') as ImageSourcePropType;
const WORD_ASPECT = 323 / 1119;

/** Alpha-composited theme token (warm corner glow). */
function glow(hex: string, alpha: number): string {
  const rgb = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(rgb >> 16) & 255}, ${(rgb >> 8) & 255}, ${rgb & 255}, ${alpha})`;
}

/** Warm 0.28 at the top-right corner, feathered to 0. */
const WARM_GLOW = [
  glow(Colors.light.orange, 0.28),
  glow(Colors.light.orange, 0.12),
  glow(Colors.light.orange, 0),
] as const;

/** Keeps the real input invisible over the box row (caret + glyphs). */
const INPUT_HIDDEN = { color: 'transparent', caretColor: 'transparent' } as const;

/**
 * The CTA watches ONLY the code field, so a keystroke re-renders just this
 * button — never the OTP box row / hidden input (input stability first).
 */
function VerifyButton({
  control,
  verifying,
  onPress,
}: {
  control: Control<OtpFormValues>;
  verifying: boolean;
  onPress: () => void;
}) {
  const code = useWatch({ control, name: 'code' }) ?? '';
  const complete = code.length === BOXES;
  return (
    <Button
      variant="primary"
      size="lg"
      label={verifying ? en.auth.otpVerifying : en.auth.otpVerify}
      loading={verifying}
      disabled={verifying || !complete}
      onPress={onPress}
    />
  );
}

export default function OtpScreen() {
  const router = useRouter();
  const session = useSession();
  const params = useLocalSearchParams<RouteParams>();
  const phone = params.phone ?? '';
  const [challengeId, setChallengeId] = useState(params.challengeId ?? '');
  const [devCode, setDevCode] = useState(params.devCode);
  const initialCooldown = Number(params.cooldownSec ?? '60') || 60;

  const [cooldown, setCooldown] = useState(initialCooldown);
  const [formError, setFormError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({ defaultValues: { code: '' } });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const onVerify = async (values: OtpFormValues) => {
    setFormError(null);
    setVerifying(true);
    try {
      const result = await authApi.verifyOtp(challengeId, values.code);
      await session.setTokens(result.accessToken, result.refreshToken);
      session.setAccount({
        publicId: result.account.publicId,
        role: result.account.role,
        status: result.account.status,
        isNewAccount: result.account.isNewAccount,
      });
      if (result.account.isNewAccount || !result.account.role) {
        router.replace('/role');
      } else if (result.account.role === 'employer') {
        router.replace('/employer');
      } else {
        router.replace('/worker');
      }
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setVerifying(false);
    }
  };

  const onResend = async () => {
    setFormError(null);
    setResending(true);
    try {
      const otp = await authApi.requestOtp(`+91${phone}`);
      setChallengeId(otp.challengeId);
      setDevCode(otp.devCode);
      setCooldown(otp.cooldownSec);
    } catch (error) {
      setFormError(errorMessage(error));
    } finally {
      setResending(false);
    }
  };

  const hasError = errors.code != null || formError != null;

  return (
    <View style={styles.root}>
      {/* deep-teal brand field; lighter teal at the very top, settling to #0B4540 */}
      <LinearGradient
        colors={[...Gradients.teal]}
        locations={[0, 0.45]}
        start={{ x: 0.35, y: 0 }}
        end={{ x: 0.65, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* warm corner glow — brand continuity with the rest of the app */}
      <LinearGradient
        colors={WARM_GLOW}
        locations={[0, 0.34, 0.72]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.1, y: 0.95 }}
        style={StyleSheet.absoluteFill}
      />
      {/* subtle wing motif (existing brand graphic) — extremely low weight */}
      <View style={styles.motif} pointerEvents="none">
        <WingMotif width={230} height={140} opacity={0.8} />
      </View>

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
              {/* ---- brand + heading ---- */}
              <Enter style={styles.authTop}>
                <Image
                  source={WORDMARK_LIGHT}
                  resizeMode="contain"
                  style={styles.wordmark}
                  accessibilityRole="image"
                  accessibilityLabel="SWON"
                />
                <Text style={styles.heading} accessibilityRole="header">
                  {en.auth.otpTitle}
                </Text>
                <Text style={styles.tag}>{en.auth.otpSentTo(phone)}</Text>
              </Enter>

              {/* ---- verification card ---- */}
              {/* Plain View on purpose: the hidden code input lives here, and an
                  animated wrapper risks the Android focus drop. */}
              <View style={styles.card}>
                {devCode ? (
                  <View style={styles.devBanner}>
                    <Text style={styles.devMode}>{en.auth.otpDevMode}</Text>
                    <Text style={styles.devCode}>{en.auth.otpDevCode(devCode)}</Text>
                  </View>
                ) : null}

                <Controller
                  control={control}
                  name="code"
                  rules={{
                    validate: (value) => codeSchema.test(value) || en.auth.otpCodeRequired,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.otpRow}>
                      {Array.from({ length: BOXES }, (_, index) => {
                        const digit = value[index];
                        const filled = digit != null && digit !== '';
                        return (
                          <View
                            key={index}
                            style={[
                              styles.otpBox,
                              hasError && styles.otpBoxError,
                              !hasError && filled && styles.otpBoxFilled,
                              !hasError && !filled && codeFocused && index === value.length
                                ? styles.otpBoxFocused
                                : null,
                            ]}
                          >
                            <Text style={styles.otpDigit}>{digit ?? ''}</Text>
                          </View>
                        );
                      })}
                      {/* the single real input — invisible, covering the row */}
                      <TextInput
                        accessibilityLabel={en.auth.otpCodeLabel}
                        keyboardType="number-pad"
                        maxLength={BOXES}
                        value={value}
                        onChangeText={(text: string) => onChange(text.replace(/\D/g, ''))}
                        onFocus={() => setCodeFocused(true)}
                        onBlur={() => {
                          setCodeFocused(false);
                          onBlur();
                        }}
                        style={[styles.otpInput, INPUT_HIDDEN]}
                      />
                    </View>
                  )}
                />

                {errors.code ? (
                  <View style={styles.msgRow}>
                    <Ionicons name="alert-circle" size={16} color={Colors.light.danger} />
                    <Text style={styles.msgText}>{errors.code.message}</Text>
                  </View>
                ) : null}
                {formError ? (
                  <View style={styles.msgRow}>
                    <Ionicons name="alert-circle" size={16} color={Colors.light.danger} />
                    <Text style={styles.msgText}>{formError}</Text>
                  </View>
                ) : null}

                <View style={styles.resendRow}>
                  {cooldown > 0 ? (
                    <Text style={styles.resendText}>{en.auth.otpResendIn(cooldown)}</Text>
                  ) : (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={en.auth.otpResend}
                      accessibilityState={{ disabled: resending, busy: resending }}
                      disabled={resending}
                      hitSlop={10}
                      onPress={() => void onResend()}
                      style={styles.resendBtn}
                    >
                      <Text
                        style={[styles.resendAction, resending && styles.resendActionBusy]}
                      >
                        {en.auth.otpResend}
                      </Text>
                    </Pressable>
                  )}
                </View>

                <VerifyButton
                  control={control}
                  verifying={verifying}
                  onPress={handleSubmit(onVerify)}
                />

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={en.auth.otpChangeNumber}
                  hitSlop={10}
                  onPress={() => router.back()}
                  style={styles.changeBtn}
                >
                  {({ pressed }) => (
                    <Text style={[styles.changeText, pressed && styles.changeTextPressed]}>
                      {'\u2190 '}
                      {en.auth.otpChangeNumber}
                    </Text>
                  )}
                </Pressable>
              </View>
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
    backgroundColor: Colors.light.primaryDeep,
  },
  flex: {
    flex: 1,
  },
  motif: {
    position: 'absolute',
    right: -50,
    top: -30,
  },
  scrollContent: {
    padding: Spacing.three,
    paddingTop: Spacing.four,
    flexGrow: 1,
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.four,
  },
  // ---- brand + heading ----
  authTop: {
    alignItems: 'center',
  },
  wordmark: {
    width: 104,
    height: Math.round(104 * WORD_ASPECT),
    marginBottom: 14,
  },
  heading: {
    fontSize: 26,
    lineHeight: 32,
    fontFamily: Fonts.display,
    color: Colors.light.onPrimary,
    textAlign: 'center',
  },
  tag: {
    marginTop: 7,
    fontSize: 13.5,
    lineHeight: 19,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.onPrimarySoft,
    textAlign: 'center',
  },
  // ---- card ----
  card: {
    gap: Spacing.three,
    backgroundColor: Colors.light.card,
    borderRadius: Radius.xxl, // 30
    padding: 22,
    ...Elevation.pop,
  },
  devBanner: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.light.warning,
    borderRadius: Radius.md,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: Colors.light.background,
    gap: 1,
  },
  devMode: {
    fontSize: 9.5,
    lineHeight: 12,
    letterSpacing: 1.4,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.textMuted,
  },
  devCode: {
    fontSize: 13,
    lineHeight: 17,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.warning,
  },
  // ---- OTP boxes ----
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 9,
    marginVertical: Spacing.two,
  },
  otpBox: {
    flex: 1,
    maxWidth: 54,
    height: 54,
    borderRadius: Radius.btn, // 14
    borderWidth: 1.5,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.background, // #F6F3EC
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFocused: {
    borderColor: Colors.light.primary, // #0F766E
    backgroundColor: Colors.light.card,
  },
  otpBoxFilled: {
    borderColor: Colors.light.primary,
    backgroundColor: Colors.light.tint,
  },
  otpBoxError: {
    borderColor: Colors.light.danger,
    backgroundColor: Colors.light.dangerSoft,
  },
  otpDigit: {
    fontFamily: Fonts.bodyExtra, // strong Manrope
    fontSize: 24,
    lineHeight: 28,
    color: Colors.light.text,
  },
  otpInput: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    color: 'transparent',
    backgroundColor: 'transparent',
    fontFamily: Fonts.body,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  // ---- messages ----
  msgRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -Spacing.two,
  },
  msgText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.danger,
  },
  // ---- resend ----
  resendRow: {
    alignItems: 'center',
    marginTop: -2,
  },
  resendText: {
    fontSize: 13.5,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },
  resendBtn: {
    minHeight: 44,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendAction: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.bodyExtra,
    color: Colors.light.primary, // teal when tappable
    textAlign: 'center',
  },
  resendActionBusy: {
    opacity: 0.5,
  },
  // ---- change number ----
  changeBtn: {
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  changeText: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },
  changeTextPressed: {
    color: Colors.light.primary,
  },
});

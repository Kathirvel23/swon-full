import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { errorMessage } from '@/api/client';
import { authApi } from '@/api/auth';
import { Button } from '@/components/screen';
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
 * V3 auth reskin (prototype s-otp): full-bleed `--g-home` shell (teal gradient
 * + warm corner glow) with a centred auth-top (glass brandmark, display
 * heading, phone tag line) over the white auth card (r-xl, --shadow-pop)
 * holding the amber-dashed dev hint, SIX separate 54×58 code boxes, the
 * error row, the centred resend row, the primary CTA and the ghost back.
 *
 * The six boxes are presentation only: they are driven by the ONE hidden
 * code input (Controller value + focus state) that covers the row, so tap
 * anywhere focuses it. Validation, verify/resend requests and routing above
 * are untouched.
 */

const codeSchema = /^\d{6}$/;

type OtpFormValues = { code: string };

type RouteParams = {
  phone?: string;
  challengeId?: string;
  cooldownSec?: string;
  devCode?: string;
};

/** Number of code boxes rendered (prototype `.otp-boxes .ob` × 6). */
const BOXES = 6;

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


/** Keeps the real input invisible over the box row (caret + glyphs). */
const INPUT_HIDDEN = { color: 'transparent', caretColor: 'transparent' } as const;

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
            {/* prototype .auth-top — glass brandmark, display heading, phone tag */}
            <View style={styles.authTop}>
              <View style={styles.brandmark}>
                <Ionicons
                  name="notifications-outline"
                  size={28}
                  color={Colors.light.onPrimary}
                />
              </View>
              <Text style={styles.heading} accessibilityRole="header">
                {en.auth.otpTitle}
              </Text>
              <Text style={styles.tag}>{en.auth.otpSentTo(phone)}</Text>
            </View>

            <View style={styles.card}>
              {devCode ? (
                <View style={styles.devHint}>
                  <Text style={styles.devHintText}>{en.auth.otpDevHint(devCode)}</Text>
                </View>
              ) : null}

              <Controller
                control={control}
                name="code"
                rules={{
                  validate: (value) => codeSchema.test(value) || 'Enter the 6-digit code',
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
                      accessibilityLabel={en.auth.otpTitle}
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
                  <Button
                    variant="ghost"
                    label={en.auth.otpResend}
                    disabled={resending}
                    onPress={() => void onResend()}
                  />
                )}
              </View>

              <Button
                variant="primary"
                size="lg"
                label={verifying ? en.auth.otpVerifying : en.auth.otpVerify}
                disabled={verifying}
                onPress={handleSubmit(onVerify)}
              />

              <View style={styles.tight}>
                <Button variant="ghost" label={en.common.back} onPress={() => router.back()} />
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
    gap: Spacing.three,
  },
  authTop: {
    alignItems: 'center',
    marginBottom: 0,
  },
  brandmark: {
    width: 54,
    height: 54,
    borderRadius: 18, // prototype s-otp brandmark (54×54 / r18)
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 10,
  },
  heading: {
    fontSize: 26,
    lineHeight: 32,
    fontFamily: Fonts.display, // prototype s-otp heading (display 26/800)
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
  card: {
    gap: Spacing.three,
    backgroundColor: Colors.light.card,
    borderRadius: Radius.xl, // prototype .auth-card radius 24
    paddingTop: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    ...Elevation.pop, // prototype --shadow-pop
  },
  devHint: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: Colors.light.warning,
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.background,
    marginBottom: 2, // prototype .devhint { margin-bottom: 14px } + card gap 16
  },
  devHintText: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold,
    color: Colors.light.warning,
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 9, // prototype .otp-boxes { gap: 9px }
    marginVertical: Spacing.two,
  },
  otpBox: {
    flex: 1,
    maxWidth: 54, // prototype .otp-boxes .ob { max-width:54 height:58 r14 }
    height: 58,
    borderRadius: Radius.btn,
    borderWidth: 2,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxFocused: {
    borderColor: Colors.light.primary,
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
    fontFamily: Fonts.display, // display face, 24/800
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
    fontFamily: Fonts.bodyBold, // prototype .form-msg
    color: Colors.light.danger,
  },
  tight: {
    marginTop: -12, // grid gap 16 → prototype ghost { margin-top: 4px }
  },
  resendRow: {
    alignItems: 'center',
    marginTop: -2, // grid gap 16 → prototype .resend-row { margin-top: 14px }
  },
  resendText: {
    fontSize: 13.5,
    lineHeight: 18,
    fontFamily: Fonts.bodyBold, // prototype .resend-row
    color: Colors.light.textMuted,
    textAlign: 'center',
  },
});

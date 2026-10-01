import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef, useState, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { kycApi, type KycSubmission } from '@/api/kyc';
import { Sheet } from '@/components/feedback';
import { Button } from '@/components/screen';
import { StatusChip } from '@/components/ui';
import { Colors, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * KYC action gate (M5): apply / FlashMatch-accept live behind the backend's
 * `KYC_REQUIRED` (403). `gate()` re-reads the submission first — VERIFIED runs
 * the action immediately (the worker who already verified and taps the button
 * again), any other state parks the action and opens the verification sheet.
 * The sheet never runs a parked action itself: the server stays authoritative,
 * so a not-verified worker only ever retries by going through /verify.
 * Presentation reuses the design §3 Sheet + Button — a verification step, not
 * an error dialog.
 */

export type KycGateVariant = 'required' | 'pending' | 'rejected';

export type KycGateHandle = {
  /** Run an action now if KYC is VERIFIED, otherwise open the gate sheet. */
  gate: (action: () => void | Promise<void>) => Promise<void>;
  /** Render once inside the screen's root view — stays mounted for the slide-in. */
  gateSheet: ReactNode;
};

export function useKycGate(): KycGateHandle {
  const router = useRouter();
  /** The action parked by gate() — the sheet may only run it after /verify. */
  const pendingAction = useRef<(() => void | Promise<void>) | null>(null);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<KycGateVariant>('required');
  const [rejectReason, setRejectReason] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  /** Drop the parked action and close (Maybe Later / Done / backdrop). */
  const dismiss = () => {
    pendingAction.current = null;
    setVisible(false);
  };

  /** Close, drop the parked action, continue into the verification flow. */
  const startVerify = () => {
    dismiss();
    router.push('/verify');
  };

  const gate = async (action: () => void | Promise<void>): Promise<void> => {
    if (checking) return;
    setChecking(true);
    let submission: KycSubmission | null = null;
    try {
      submission = (await kycApi.active()).submission;
    } catch {
      // Status read failed while the server just answered KYC_REQUIRED: keep
      // the gate closed and never guess — the sheet falls back to the start step.
      submission = null;
    } finally {
      setChecking(false);
    }

    if (submission?.status === 'VERIFIED') {
      pendingAction.current = null;
      try {
        await action();
      } catch {
        // The action owns its own error surface (both callers show alerts).
      }
      return;
    }

    const status = submission?.status ?? null;
    setVariant(
      status === 'SUBMITTED' || status === 'UNDER_REVIEW'
        ? 'pending'
        : status === 'REJECTED'
          ? 'rejected'
          : 'required',
    );
    setRejectReason(status === 'REJECTED' ? (submission?.rejectionReason ?? null) : null);
    pendingAction.current = action;
    setVisible(true);
  };

  const gateSheet = (
    <KycGateSheet
      visible={visible}
      variant={variant}
      rejectReason={rejectReason}
      onDismiss={dismiss}
      onStartVerify={startVerify}
    />
  );

  return { gate, gateSheet };
}

/** Design §3 Sheet carrying the three KYC gate states. */
export function KycGateSheet({
  visible,
  variant,
  rejectReason,
  onDismiss,
  onStartVerify,
}: {
  visible: boolean;
  variant: KycGateVariant;
  rejectReason?: string | null;
  onDismiss: () => void;
  onStartVerify: () => void;
}) {
  const copy = en.kycGate;
  const title =
    variant === 'pending'
      ? copy.pendingTitle
      : variant === 'rejected'
        ? copy.rejectedTitle
        : copy.requiredTitle;

  return (
    <Sheet visible={visible} onClose={onDismiss} title={title}>
      <View style={styles.body}>
        <View style={styles.leadRow}>
          <View style={styles.leadTile}>
            <Ionicons name="shield-checkmark-outline" size={20} color={Colors.light.primary} />
          </View>
          {variant === 'pending' ? <StatusChip status={copy.pendingChip} /> : null}
        </View>

        {variant === 'required' ? (
          <>
            <Text style={styles.para}>{copy.requiredBody}</Text>
            <View style={styles.checkList}>
              {[copy.checkSecure, copy.checkOnce, copy.checkUnlocks].map((line) => (
                <Text key={line} style={styles.checkItem}>
                  {line}
                </Text>
              ))}
            </View>
            <Button label={copy.complete} variant="primary" size="lg" onPress={onStartVerify} />
            <Button label={copy.later} variant="secondary" onPress={onDismiss} />
          </>
        ) : null}

        {variant === 'pending' ? (
          <>
            <Text style={styles.para}>{copy.pendingBody}</Text>
            <Text style={styles.muted}>{copy.pendingNotify}</Text>
            <View style={styles.noteBox}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.light.primary} />
              <Text style={styles.noteText}>{copy.pendingNote}</Text>
            </View>
            <Button label={copy.done} variant="primary" size="lg" onPress={onDismiss} />
          </>
        ) : null}

        {variant === 'rejected' ? (
          <>
            <View style={styles.noteBox}>
              <Ionicons name="document-text-outline" size={16} color={Colors.light.primary} />
              <Text style={styles.noteText}>
                {rejectReason ? en.kyc.rejectReason(rejectReason) : en.kyc.status.REJECTED}
              </Text>
            </View>
            <Button label={copy.resubmit} variant="primary" size="lg" onPress={onStartVerify} />
            <Button label={copy.later} variant="secondary" onPress={onDismiss} />
          </>
        ) : null}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  body: {
    gap: Spacing.two,
    paddingBottom: Spacing.one,
  },
  leadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  leadTile: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  para: {
    ...TypeScale.body,
    color: Colors.light.text,
  },
  muted: {
    ...TypeScale.bodySm,
    color: Colors.light.textMuted,
  },
  checkList: {
    gap: Spacing.one,
    backgroundColor: Colors.light.tint,
    borderRadius: Radius.md,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.mid,
  },
  checkItem: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
    backgroundColor: Colors.light.tint,
    borderRadius: Radius.md,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.mid,
  },
  noteText: {
    ...TypeScale.bodySm,
    flex: 1,
    color: Colors.light.text,
  },
});

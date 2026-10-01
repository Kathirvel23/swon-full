import { Alert, Platform } from 'react-native';

export interface AlertButton {
  text: string;
  style?: 'cancel' | 'destructive' | 'default';
  onPress?: () => void;
}

/**
 * Alert.alert is a NO-OP on react-native-web — confirmations and error
 * dialogs silently vanish in the browser dev preview (the W4 click-through
 * proved it: "Cancel this job" showed nothing). Native (Expo Go / store
 * builds) keeps the real dialog; on web we map to window.alert/confirm so
 * the same call sites behave visibly everywhere.
 *
 * Web mapping: 0–1 buttons → window.alert + onPress; 2+ buttons →
 * window.confirm where OK = the non-cancel button (usually the destructive
 * one last, RN convention) and Cancel = the style:'cancel' button.
 */
export function showAlert(title: string, message?: string, buttons?: AlertButton[]): void {
  if (Platform.OS !== 'web') {
    Alert.alert(title, message, buttons);
    return;
  }
  const text = `${title}${message ? `\n\n${message}` : ''}`;
  if (!buttons || buttons.length <= 1) {
    window.alert(text);
    buttons?.[0]?.onPress?.();
    return;
  }
  const cancel = buttons.find((b) => b.style === 'cancel') ?? buttons[0];
  const ok =
    [...buttons].reverse().find((b) => b.style !== 'cancel' && b.style !== undefined) ??
    [...buttons].reverse().find((b) => b.style !== 'cancel') ??
    buttons[buttons.length - 1];
  if (window.confirm(text)) ok.onPress?.();
  else if (ok !== cancel) cancel.onPress?.();
}

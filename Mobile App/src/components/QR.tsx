import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Colors, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';

/**
 * Design §3 QR (plan U7): a real, scannable attendance QR rendered from the
 * signed token payload the server mints — the payload itself never changes,
 * only how it is presented. `value` must be the exact string the check-in
 * flow already scans (no re-encoding here).
 */
export function AttendanceQR({
  value,
  size = 200,
  caption,
}: {
  value: string;
  size?: number;
  caption?: string;
}) {
  return (
    <View style={styles.wrap} accessibilityLabel={caption ?? 'Attendance QR code'}>
      <View style={styles.frame}>
        <QRCode
          value={value}
          size={size}
          color={Colors.light.text}
          backgroundColor={Colors.light.card}
        />
      </View>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: Spacing.two,
    alignSelf: 'center',
  },
  frame: {
    padding: Spacing.two,
    backgroundColor: Colors.light.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.light.line,
  },
  caption: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.textMuted,
    textAlign: 'center',
  },
});

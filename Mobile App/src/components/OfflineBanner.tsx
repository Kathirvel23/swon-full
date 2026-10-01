import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, Spacing, TypeScale } from '@/constants/theme';

const OFFLINE_MSG = 'Offline — saved data only; changes retry when you reconnect';

/**
 * Global offline banner (plan U8): sits above the navigator in the root
 * layout, appears only while the device has no usable connection. Server
 * stays the authority — the banner never claims queued writes were saved.
 */
export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const online =
        state.isConnected !== false && state.isInternetReachable !== false;
      setOffline(!online);
    });
    return unsubscribe;
  }, []);

  if (!offline) return null;

  return (
    <View
      accessibilityRole="alert"
      accessibilityLabel={OFFLINE_MSG}
      style={styles.bar}
      testID="offline-banner"
    >
      <Ionicons name="cloud-offline-outline" size={16} color={Colors.light.onPrimary} />
      <Text style={styles.text}>{OFFLINE_MSG}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    backgroundColor: Colors.light.text,
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
  },
  text: {
    ...TypeScale.caption,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.onPrimary,
  },
});

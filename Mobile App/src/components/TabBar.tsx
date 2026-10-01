import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Elevation, Fonts, Radius, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * V3 tab bar (UI_UX_DESIGN §4): five equal columns, active = teal icon +
 * bold label, inactive muted; translucent-white surface with a hairline top
 * border and safe-area bottom padding. Rendered by `Screen` when a screen
 * passes `tab`; stacks (detail screens) don't render it.
 * Routes preserved (§10): the tab row only navigates, layouts stay Stacks.
 */

export type WorkerTabKey = 'home' | 'explore' | 'work' | 'earnings' | 'profile';
export type HostTabKey = 'home' | 'opportunities' | 'workers' | 'payments' | 'profile';
export type TabKey = WorkerTabKey | HostTabKey;
export type TabRole = 'worker' | 'host';

type TabDef = {
  key: TabKey;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
  href: string;
  label: string;
};

const WORKER_TABS: TabDef[] = [
  { key: 'home', icon: 'home-outline', iconActive: 'home', href: '/worker', label: en.nav.worker.home },
  { key: 'explore', icon: 'compass-outline', iconActive: 'compass', href: '/jobs', label: en.nav.worker.explore },
  { key: 'work', icon: 'briefcase-outline', iconActive: 'briefcase', href: '/attendance', label: en.nav.worker.work },
  { key: 'earnings', icon: 'wallet-outline', iconActive: 'wallet', href: '/earnings', label: en.nav.worker.earnings },
  { key: 'profile', icon: 'person-outline', iconActive: 'person', href: '/worker/profile', label: en.nav.worker.profile },
];

const HOST_TABS: TabDef[] = [
  { key: 'home', icon: 'home-outline', iconActive: 'home', href: '/employer', label: en.nav.host.home },
  { key: 'opportunities', icon: 'list-outline', iconActive: 'list', href: '/employer/jobs', label: en.nav.host.opportunities },
  { key: 'workers', icon: 'people-outline', iconActive: 'people', href: '/employer/workers', label: en.nav.host.workers },
  { key: 'payments', icon: 'card-outline', iconActive: 'card', href: '/employer/payments', label: en.nav.host.payments },
  { key: 'profile', icon: 'person-outline', iconActive: 'person', href: '/employer/profile', label: en.nav.host.profile },
];

export function tabBarConfig(role: TabRole): TabDef[] {
  return role === 'host' ? HOST_TABS : WORKER_TABS;
}

export function TabBar({
  role,
  active,
  preview = false,
}: {
  role: TabRole;
  active: TabKey;
  /** gallery/demo mode: renders the bar without navigating */
  preview?: boolean;
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabs = tabBarConfig(role);
  return (
    <View
      style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 10) }]}
      accessibilityRole="tablist"
    >
      {tabs.map((t) => {
        const isActive = t.key === active;
        const onPress = () => {
          if (preview || isActive) return;
          router.push(t.href as never);
        };
        return (
          <Pressable
            key={t.key}
            onPress={onPress}
            disabled={preview}
            accessibilityRole="tab"
            accessibilityLabel={t.label}
            accessibilityState={{ selected: isActive, disabled: preview }}
            style={styles.item}
            testID={`tab-${t.key}`}
          >
            <View style={[styles.glyph, isActive && styles.glyphActive]}>
              <Ionicons
                name={isActive ? t.iconActive : t.icon}
                size={22}
                color={isActive ? Colors.light.primaryDark : Colors.light.textMuted}
              />
            </View>
            <Text
              numberOfLines={1}
              style={[styles.label, isActive && styles.labelActive]}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** Prototype .tabbar: white surface, hairline top border, shadow above,
 *  56x28 active pill in --primary-light, active label primary-dark 800. */
const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: Colors.light.card,
    borderTopWidth: 1,
    borderTopColor: Colors.light.line,
    paddingTop: 7,
    paddingHorizontal: 4,
    paddingBottom: 10,
    ...Elevation.barTop,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minHeight: 48,
    paddingVertical: 3,
  },
  glyph: {
    width: 56,
    height: 28,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphActive: {
    backgroundColor: Colors.light.primaryLight,
    transform: [{ translateY: -1 }],
  },
  label: {
    ...TypeScale.caption,
    fontSize: 10.5,
    lineHeight: 13,
    fontWeight: '700',
    color: Colors.light.textMuted,
  },
  labelActive: {
    color: Colors.light.primaryDark,
    fontFamily: Fonts.bodyExtra,
  },
});

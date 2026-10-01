import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { errorMessage } from '@/api/client';
import { notificationsApi } from '@/api/kyc';
import { Button, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';

/**
 * Wave 2 (M3-core): in-app notification inbox — unread-first page from
 * GET /notifications, mark-all-read, event labels rendered from i18n keys
 * (ADR-023: server sends keys, never pre-rendered text).
 * V3: unread pill + mark-all, icon empty state, one soft row per notification
 * with an orange unread dot.
 */
export default function InboxScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const inbox = useQuery({ queryKey: ['inbox'], queryFn: () => notificationsApi.list({ limit: 30 }), retry: 1 });
  const unread = useQuery({ queryKey: ['inbox-unread'], queryFn: notificationsApi.unreadCount, retry: 1 });

  const markAll = async () => {
    try {
      await notificationsApi.markAllRead();
      await queryClient.invalidateQueries({ queryKey: ['inbox'] });
      await queryClient.invalidateQueries({ queryKey: ['inbox-unread'] });
    } catch (e) {
      // surfaced inline below via refetch states — keep the flow simple
      console.warn(errorMessage(e));
    }
  };

  const items = inbox.data ?? [];

  const label = (eventKey: string, titleKey: string): string =>
    (en.inbox.events as Record<string, string>)[eventKey] ?? titleKey;

  return (
    <Screen title={en.inbox.title}>
      <View style={styles.toolbar}>
        <View style={styles.pill}>
          <Ionicons name="mail-unread-outline" size={14} color={Colors.light.primaryDeep} />
          <Text style={styles.pillText}>
            {unread.data ? `${unread.data.unread} ${en.inbox.unread}` : en.common.loading}
          </Text>
        </View>
        {items.length > 0 ? (
          <Button label={en.inbox.markAll} onPress={() => void markAll()} />
        ) : null}
      </View>

      {inbox.isError ? <Text style={styles.error}>{errorMessage(inbox.error)}</Text> : null}

      {items.length === 0 && !inbox.isLoading ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="notifications-outline" size={30} color={Colors.light.primary} />
          </View>
          <Text style={styles.emptyText}>{en.inbox.empty}</Text>
        </View>
      ) : null}

      {items.map((item) => {
        const isUnread = !item.readAt;
        return (
          <View key={item.publicId} style={[styles.row, isUnread && styles.rowUnread]}>
            <View style={[styles.dot, isUnread && styles.dotOn]} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{label(item.eventKey, item.titleKey)}</Text>
              <Text style={styles.rowMeta}>
                {`${item.createdAt.slice(0, 10)} ${item.createdAt.slice(11, 16)}${isUnread ? ` — ${en.inbox.unread}` : ''}`}
              </Text>
              {item.bodyParams && typeof item.bodyParams.status === 'string' ? (
                <Text style={styles.rowStatus}>{String(item.bodyParams.status)}</Text>
              ) : null}
            </View>
          </View>
        );
      })}

      <Button label={en.prefs.open} onPress={() => router.push('/prefs')} />
      <Button label={en.common.back} onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  toolbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.two },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: Colors.light.tint,
    borderWidth: 1,
    borderColor: Colors.light.primaryLight,
    borderRadius: Radius.pill,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.mid,
  },
  pillText: { ...TypeScale.caption, fontFamily: Fonts.bodyBold, color: Colors.light.primaryDeep },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    ...Elevation.card,
  },
  rowUnread: { backgroundColor: Colors.light.tint, borderColor: Colors.light.primaryLight },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: Spacing.one,
    backgroundColor: Colors.light.line,
  },
  dotOn: { backgroundColor: Colors.light.orange },
  rowText: { flex: 1, minWidth: 0, gap: Spacing.half },
  rowTitle: { ...TypeScale.body, fontFamily: Fonts.bodyBold, color: Colors.light.text },
  rowMeta: { ...TypeScale.caption, color: Colors.light.textMuted },
  rowStatus: { ...TypeScale.caption, fontFamily: Fonts.bodySemi, color: Colors.light.primary },

  empty: {
    alignItems: 'center',
    gap: Spacing.mid,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.line,
    borderWidth: 1,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.three,
    ...Elevation.card,
  },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.light.tint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { ...TypeScale.body, color: Colors.light.textMuted, textAlign: 'center' },
  error: { ...TypeScale.bodySm, color: Colors.light.danger },
});

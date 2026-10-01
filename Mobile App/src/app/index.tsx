import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { AppError, errorMessage } from '@/api/client';
import { authApi, type MeDto } from '@/api/auth';
import { Button, Screen } from '@/components/screen';
import { Colors, Elevation, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { useSession } from '@/store/session';

/**
 * Entry router (§10): hydrate tokens →
 *   no token          → /login
 *   token + /me ok     → role null ? /role : /worker | /employer
 *   /me rejected(401)  → refresh already failed → clean login
 * While hydrating/loading: plain status text (no fake UI).
 *
 * V3 reskin: the redirect logic above is byte-identical — only the loading
 * and error panels below changed (centred status card on the warm canvas,
 * teal spinner, primary retry + ghost sign-in).
 */

/** Local, presentation-only status card (prototype .state-box). */
function StatusPanel({ children }: { children: ReactNode }) {
  return <View style={styles.panel}>{children}</View>;
}

function LoadingStatus() {
  return (
    <StatusPanel>
      <ActivityIndicator size="large" color={Colors.light.primary} />
      <Text style={styles.status}>{en.common.loading}</Text>
    </StatusPanel>
  );
}

export default function Index() {
  const router = useRouter();
  const session = useSession();

  const me = useQuery({
    queryKey: ['me'],
    queryFn: (): Promise<MeDto> => authApi.me(),
    enabled: session.hydrated && session.accessToken !== null,
    retry: 0,
  });

  useEffect(() => {
    if (!session.hydrated) return;
    if (!session.accessToken) {
      router.replace('/login');
      return;
    }
    if (me.isSuccess) {
      const account = me.data.account;
      session.setAccount({
        publicId: account.publicId,
        role: account.role,
        status: account.status,
      });
      if (!account.role) router.replace('/role');
      else if (account.role === 'worker') router.replace('/worker');
      else if (account.role === 'employer') router.replace('/employer');
      else router.replace('/dev'); // admin console lives in the Admin app
    } else if (me.isError) {
      const status = me.error instanceof AppError ? me.error.status : undefined;
      if (status === 401) {
        void session.clearSession().then(() => router.replace('/login'));
      }
      // transient/network failures fall through to the retry UI below
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.hydrated, session.accessToken, me.isSuccess, me.isError]);

  if (!session.hydrated || (session.accessToken && me.isPending)) {
    return (
      <Screen title={en.common.appName}>
        <LoadingStatus />
      </Screen>
    );
  }

  if (session.accessToken && me.isError) {
    const status = me.error instanceof AppError ? me.error.status : undefined;
    if (status === 401) {
      return (
        <Screen title={en.common.appName}>
          <LoadingStatus />
        </Screen>
      );
    }
    return (
      <Screen title={en.common.appName}>
        <StatusPanel>
          <View style={styles.iconTile}>
            <Ionicons name="cloud-offline-outline" size={26} color={Colors.light.warning} />
          </View>
          <Text style={styles.status}>{errorMessage(me.error)}</Text>
          <Button
            variant="primary"
            size="lg"
            label={en.common.retry}
            onPress={() => void me.refetch()}
          />
          <Button variant="ghost" label={en.auth.loginTitle} onPress={() => router.replace('/login')} />
        </StatusPanel>
      </Screen>
    );
  }

  return (
    <Screen title={en.common.appName}>
      <LoadingStatus />
    </Screen>
  );
}

const styles = StyleSheet.create({
  panel: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 360,
    minHeight: 240,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    backgroundColor: Colors.light.card,
    borderRadius: Radius.xl,
    padding: Spacing.four,
    ...Elevation.card,
  },
  iconTile: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.backgroundSelected,
  },
  status: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    textAlign: 'center',
    color: Colors.light.text,
  },
});

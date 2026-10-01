import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppError, api } from '@/api/client';
import { Button, Card, Screen } from '@/components/screen';
import { API_BASE_URL, APP_ENV } from '@/config/env';
import { Colors, Fonts, Radius, Spacing, TypeScale } from '@/constants/theme';
import { en } from '@/i18n/strings';
import { useSession } from '@/store/session';

/**
 * TEMPORARY development hub — proves the foundation, not a production screen.
 * Light V3 touch only: token-typed status lines and the dashed aside notice
 * (prototype .aside-note); queries, session plumbing and routes unchanged.
 */

const DEV_TEST_TOKEN = 'dev-foundation-test-token';

type HealthPayload = {
  data: { status: string; service: string; timestamp: string };
};

export default function DevHubScreen() {
  const router = useRouter();
  const session = useSession();

  const health = useQuery({
    queryKey: ['health', API_BASE_URL],
    queryFn: () => api.get<HealthPayload>('/health'),
    retry: 1,
  });

  const healthText = health.isPending
    ? en.dev.healthChecking
    : health.isSuccess
      ? en.dev.healthOk(health.data.data.status)
      : en.dev.healthFailed(
          health.error instanceof AppError
            ? `${health.error.kind}: ${health.error.message}`
            : String(health.error),
        );

  return (
    <Screen title={`${en.common.appName} — ${en.dev.hubTitle}`}>
      <View style={styles.aside}>
        <Text style={styles.asideText}>{en.dev.temporaryNotice}</Text>
      </View>

      <Card title={en.dev.environment}>
        <Text style={styles.line}>{en.dev.appLine(en.common.appName, APP_ENV)}</Text>
        <Text style={styles.line}>{en.dev.apiLine(API_BASE_URL)}</Text>
      </Card>

      <Card title={en.dev.healthTitle}>
        <Text style={styles.line}>{healthText}</Text>
        <Button label={en.common.retry} onPress={() => void health.refetch()} />
      </Card>

      <Card title={en.dev.sessionTitle}>
        <Text style={styles.line}>{en.dev.hydrated(session.hydrated)}</Text>
        <Text style={styles.line}>{en.dev.tokenPresent(session.accessToken !== null)}</Text>
        <Button
          label={en.dev.storeDevToken}
          onPress={() => void session.setTokens(DEV_TEST_TOKEN, DEV_TEST_TOKEN)}
        />
        <Button label={en.dev.clearToken} onPress={() => void session.clearSession()} />
      </Card>

      <Card title={en.dev.navigationTitle}>
        <Button label={en.dev.openLogin} onPress={() => router.push('/login')} />
        <Button label={en.dev.openWorker} onPress={() => router.push('/worker')} />
        <Button label={en.dev.openEmployer} onPress={() => router.push('/employer')} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  aside: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: Radius.lg,
    padding: Spacing.three,
    backgroundColor: Colors.light.background,
  },
  asideText: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    lineHeight: 20,
    color: Colors.light.text,
  },
  line: {
    ...TypeScale.bodySm,
    fontFamily: Fonts.bodySemi,
    color: Colors.light.text,
  },
});

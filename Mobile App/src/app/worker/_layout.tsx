import { Stack } from 'expo-router';

/** Worker role group — role-gated stack (architecture §10). */
export default function WorkerLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

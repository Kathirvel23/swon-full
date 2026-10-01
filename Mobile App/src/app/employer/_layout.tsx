import { Stack } from 'expo-router';

/** Employer role group — role-gated stack (architecture §10). */
export default function EmployerLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

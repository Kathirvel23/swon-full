import { Stack } from 'expo-router';

/** Authenticated-session routes (welcome / login / OTP) live behind this group. */
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

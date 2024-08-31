import { Stack } from "expo-router";

export default function AuthRoutes() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="/(auth)/tab/"
    >
      <Stack.Screen name="tab" />
      <Stack.Screen name="scanner" />
    </Stack>
  );
}

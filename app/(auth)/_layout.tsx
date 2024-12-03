import AuthProvider from "@/context/auth/authProvider";
import { Stack } from "expo-router";

export default function AuthRoutes() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="/(auth)/tab/"
      >
        <Stack.Screen name="tab" />
        <Stack.Screen name="scanner" />
      </Stack>
    </AuthProvider>
  );
}

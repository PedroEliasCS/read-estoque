import { Stack } from "expo-router";

export default function EntradasRoutes() {
  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="/(auth)/tab/entradas"
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="criarPedido" />
    </Stack>
  );
}

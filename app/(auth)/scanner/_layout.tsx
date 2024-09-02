import Header from "@/components/Header";
import { Stack } from "expo-router";

export default function ScannerStack() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: (i) => <Header {...i} />,
      }}
    >
      <Stack.Screen name="[tipo]/[pedido_id]" />
    </Stack>
  );
}

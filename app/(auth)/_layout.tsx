import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="entradas"
        options={{
          title: "Entradas",
        }}
      />
      <Tabs.Screen
        name="saida"
        options={{
          title: "Saida",
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Scanner",
        }}
      />
    </Tabs>
  );
}

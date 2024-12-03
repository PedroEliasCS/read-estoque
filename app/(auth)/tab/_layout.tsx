import TabBarElement from "@/components/tabBar/tabBar";
import TextTheme from "@/components/Text";
import { Tabs } from "expo-router";
import { View } from "react-native";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: ({ options }) => (
          <View
            style={{
              backgroundColor: "transparent",
              top: 40,
              height: 25,
              width: "100%",
              alignItems: "center",
              borderBottomWidth: 0.5,
              borderBottomColor: "gray",
            }}
            children={<TextTheme font="PoppinsBold">{options.title}</TextTheme>}
          />
        ),
      }}
      tabBar={(i) => <TabBarElement {...i} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tela inicial",
        }}
      />
      <Tabs.Screen
        name="entradas"
        options={{
          title: "Compras",
        }}
      />
      <Tabs.Screen
        name="saida"
        options={{
          title: "Vendas",
        }}
      />
      <Tabs.Screen
        name="opcoes"
        options={{
          title: "Mais Opções",
        }}
      />
    </Tabs>
  );
}

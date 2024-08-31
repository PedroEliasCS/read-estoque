import { useThemeColor } from "@/hooks/useThemeColor";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import ItemTabBar from "./ItemTabBar";

type TabBarProps = BottomTabBarProps & {};

export default function TabBarElement({ state, navigation }: TabBarProps) {
  const colorBackGroundTabBar = useThemeColor({}, "tabBarBackground");

  const pageInFocus = state.routes[state.index].name;

  return (
    <View
      style={[styles.container, { backgroundColor: colorBackGroundTabBar }]}
    >
      <ItemTabBar
        icone="Historico"
        onPress={() => {
          navigation.navigate({
            name: "index",
            params: {},
          });
        }}
        text="Histórico"
        select={pageInFocus === "index"}
      />
      <ItemTabBar
        icone="Entrada"
        onPress={() => {
          navigation.navigate({
            name: "entradas",
            params: {},
          });
        }}
        text="Entradas"
        select={pageInFocus === "entradas"}
      />
      <ItemTabBar
        icone="Saida"
        onPress={() => {
          navigation.navigate({
            name: "saida",
            params: {},
          });
        }}
        text="Saidas"
        select={pageInFocus === "saida"}
      />
      <ItemTabBar
        icone="Mais"
        onPress={() => {
          navigation.navigate({
            name: "opcoes",
            params: {},
          });
        }}
        text="Mais"
        select={pageInFocus === "opcoes"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 55,

    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

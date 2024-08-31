import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import TextTheme from "./Text";

export default function EntradaComFundo() {
  const entradaFundo = useThemeColor({}, "entradaFundo");
  const entradaTexto = useThemeColor({}, "entradaTexto");

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: entradaFundo,
        },
      ]}
    >
      <TextTheme colorThemeDark={entradaTexto} colorThemeLight={entradaTexto}>
        Entrada
      </TextTheme>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 25,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

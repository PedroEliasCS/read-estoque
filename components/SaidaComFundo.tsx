import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import TextTheme from "./Text";

export default function SaidaComFundo() {
  const saidaFundo = useThemeColor({}, "saidaFundo");
  const saidaTexto = useThemeColor({}, "saidaTexto");

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: saidaFundo,
        },
      ]}
    >
      <TextTheme colorThemeDark={saidaTexto} colorThemeLight={saidaTexto}>
        Saida
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

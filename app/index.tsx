import Button from "@/components/button";
import InputText from "@/components/InputText";
import LogoStars from "@/components/LogoStars";
import TextTheme from "@/components/Text";
import { ThemedView } from "@/components/ThemedView";
import keyboardOpen from "@/hooks/keyboardOpen";
import { StyleSheet, View } from "react-native";
import { Link, router } from "expo-router";

export default function FirstScreen() {
  return (
    <ThemedView>
      <View style={style.container}>
        <LogoStars />
        <InputText titulo="Login" />
        <InputText titulo="Senha" />
        <Button
          titulo="Confirmar"
          onPress={() => {
            router.navigate("/entradas");
          }}
        />
      </View>
      {!keyboardOpen() && (
        <View style={style.footer}>
          <Link href={"https://encodingstars.com/"}>
            <TextTheme>By </TextTheme>
            <TextTheme
              style={{
                textDecorationLine: "underline",
              }}
              font={"PoppinsBold"}
            >
              Stars Encoding
            </TextTheme>
          </Link>
        </View>
      )}
    </ThemedView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",

    height: "80%",
    width: "95%",
  },
  titulo: {
    fontSize: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

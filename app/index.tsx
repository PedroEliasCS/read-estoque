import Button from "@/components/button";
import InputSecret from "@/components/InputSecret";
import InputText from "@/components/InputText";
import LogoStars from "@/components/LogoStars";
import TextTheme from "@/components/Text";
import { ThemedView } from "@/components/ThemedView";
import { EnumDefaultApi, GlobalContext } from "@/context/global/Global";
import { ModalContext } from "@/context/modal/Modal";
import keyboardOpen from "@/hooks/keyboardOpen";
import useVar from "@/hooks/useVar";
import { Link, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const FormLogin = () => {
  const router = useRouter();
  const { open } = useContext(ModalContext);
  const { login } = useContext(GlobalContext);

  const [userName, valUserName, setUserName] = useVar({
    initial: "",
    validate: (value) => value.length > 5,
  });

  const [password, valPassword, setPassword] = useVar({
    initial: "",
    validate: (value) => value.length > 5,
  });

  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitLogin = async () => {
    setShowError(true);

    if (!valUserName || !valPassword) return;

    setLoading(true);

    const result = await login(userName, password);

    if (result == EnumDefaultApi.success) {
      router.replace("/(auth)/tab");
      return;
    }

    open({
      texto: result,
      iconName: "Scanner",
    });

    setLoading(false);
  };

  return (
    <View style={style.container}>
      <LogoStars />
      <InputText
        titulo="Login"
        onChangeText={(text) => setUserName(text)}
        error={showError && !valUserName}
        value={userName}
        placeholder="Digite seu Usuário passado pelo master"
      />
      <InputSecret
        titulo="Senha"
        textInputProps={{
          onChangeText: (text) => setPassword(text),
          value: password,
          placeholder: "Digite sua senha",
          onSubmitEditing: submitLogin,
        }}
        error={showError && !valPassword}
      />
      <Button
        titulo="Confirmar"
        onPress={() => submitLogin()}
        loading={loading}
      />
    </View>
  );
};

export default function FirstScreen() {
  const { auth } = useContext(GlobalContext);

  useEffect(() => {
    if (auth) {
      useRouter().replace("/(auth)/tab");
    }
  }, []);

  return (
    <ThemedView>
      <FormLogin />
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

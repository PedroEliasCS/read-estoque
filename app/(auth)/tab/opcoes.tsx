import Button from "@/components/button";
import TextTheme from "@/components/Text";
import { ThemedView } from "@/components/ThemedView";
import { GlobalContext } from "@/context/global/Global";
import { useContext } from "react";

export default function OpcoesPage() {
  const { logout } = useContext(GlobalContext);
  return (
    <ThemedView>
      <TextTheme>Opcoes</TextTheme>
      <Button
        titulo="Sair"
        onPress={() => {
          logout(); // Volta para a tela de login
        }}
      />
    </ThemedView>
  );
}

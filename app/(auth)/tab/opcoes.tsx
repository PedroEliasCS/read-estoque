import Button from "@/components/button";
import TextTheme from "@/components/Text";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

export default function OpcoesPage() {
  return (
    <ThemedView>
      <TextTheme>Opcoes</TextTheme>
      <Button
        titulo="Sair"
        onPress={() => {
          router.replace("/"); // Volta para a tela de login
        }}
      />
    </ThemedView>
  );
}

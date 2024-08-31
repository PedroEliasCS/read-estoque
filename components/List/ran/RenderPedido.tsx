import { IPedido } from "@/clients/types/api.types";
import EntradaComFundo from "@/components/EntradaComFundo";
import SaidaComFundo from "@/components/SaidaComFundo";
import TextTheme from "@/components/Text";
import converter from "@/util/converter";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function RenderPedidoItem({ item }: { item: IPedido }) {
  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.navigate({
          pathname: "/(auth)/scanner/[tipo]/[pedido_id]",
          params: {
            tipo: item.tipo,
            pedido_id: item.id,
          },
        })
      }
    >
      <View style={styles.containerPrimeiraLinha}>
        {item.tipo == "C" ? <EntradaComFundo /> : <SaidaComFundo />}
        <TextTheme>NumPedido: {item.numeroPedido}</TextTheme>
      </View>
      <View style={styles.containerSegundaLinha}>
        <TextTheme>Data: {converter.dataParaExibicao(item.data)}</TextTheme>
        <TextTheme>Total itens: {item.totalProdutos}</TextTheme>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },

  containerPrimeiraLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },

  containerSegundaLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    height: "50%",
  },
});
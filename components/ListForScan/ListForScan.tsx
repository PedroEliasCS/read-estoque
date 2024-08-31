import api from "@/clients/api";
import { IProdutoPedido } from "@/clients/types/api.types";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import TextTheme from "../Text";
import { ThemedView } from "../ThemedView";
import Loading from "../loading";

function renderItem({ item }: { item: IProdutoPedido }) {
  return <TextTheme>{item.descricao}</TextTheme>;
}

export default function ListForScan({
  tipo,
  pedido_id,
}: {
  tipo: string;
  pedido_id: string;
}) {
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<IProdutoPedido[]>([]);

  useEffect(() => {
    api
      .getProdutosPedido(pedido_id)
      .then((produtos) => {
        setProdutos(produtos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.containerTitle}>
        <TextTheme font="PoppinsBold">
          Produtos de {tipo == "C" ? "entrada" : "saída"} de estoque
        </TextTheme>
      </ThemedView>

      <ThemedView style={styles.containerList}>
        <FlatList
          data={produtos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <>{loading && <Loading />}</>}
          ListEmptyComponent={() => (
            <>{loading ? <></> : <TextTheme>Vazio.</TextTheme>}</>
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    paddingTop: 100,

    justifyContent: "flex-start",
  },

  containerTitle: {
    width: "100%",
    height: 50,
    padding: 10,
    paddingLeft: 30,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  containerList: {
    width: "100%",
    height: "auto",
    minHeight: "50%",
    maxHeight: "95%",
    padding: 10,
  },
});

import { TipoPedido } from "@/clients/types/api.types";
import { GlobalContext } from "@/context/global/Global";
import { ModalContext } from "@/context/modal/Modal";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, View, ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Quadrado60x60 from "../Quadrado60x60";
import TextTheme from "../Text";
import { ThemedView } from "../ThemedView";
import Button from "../button";
import Loading from "../loading";
import ScannerModal from "../scans/modalScanner";
import { RenderItemListScanner } from "./ItemListElement";
import { ProdutoParaScanner } from "./ran/RenderItemListScaner";

export type IParamsListForScan = {
  tipo: TipoPedido;
  pedido_id: string;
};

/**
 * Lista de produtos com a finalidade de serem escaneados
 */
export default function ListForScan({ tipo, pedido_id }: IParamsListForScan) {
  const {
    apis: { principal },
  } = useContext(GlobalContext);
  const { open } = useContext(ModalContext);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<ProdutoParaScanner[]>([]);
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const colorText = useThemeColor({}, "text");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (tipo == TipoPedido.compra) {
      principal
        .getProdutosPedidoCompra(pedido_id)
        .then((produtos) => {
          setProdutos(produtos.map((p) => ({ ...p, scaneado: false })));
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    } else if (tipo == TipoPedido.venda) {
      principal
        .getProdutosPedidoVenda(pedido_id)
        .then((produtos) => {
          setProdutos(produtos.map((p) => ({ ...p, scaneado: false })));
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }
  }, []);

  const Footer = () => (
    <View style={styles.containerFooter}>
      <Button
        titulo="Finalizar"
        onPress={() => {
          if (produtos.filter((p) => !p.scaneado).length > 0) return;

          setLoading(true);

          if (tipo == TipoPedido.venda) {
            principal
              .finalizaPedidoVenda(pedido_id)
              .then(() => {
                open({
                  texto: "Pedido finalizado com sucesso",
                  iconName: "Entrada",
                  afterClose: () => router.dismissAll(),
                });
              })
              .catch(() => {
                open({
                  texto: "Pedido NÃO finalizado",
                  iconName: "Entrada",
                  afterClose: () => router.dismissAll(),
                });
              });
          } else {
            principal
              .finalizaPedidoCompra(pedido_id)
              .then(() => {
                open({
                  texto: "Pedido finalizado com sucesso",
                  iconName: "Saida",
                  afterClose: () => router.dismissAll(),
                });
              })
              .catch(() => {
                open({
                  texto: "Pedido NÃO finalizado",
                  iconName: "Saida",
                  afterClose: () => router.dismissAll(),
                });
              });
          }
        }}
        disabled={produtos.filter((p) => !p.scaneado).length > 0}
      />
    </View>
  );

  useEffect(() => {
    console.log("scaneado ", produtos[0]?.scaneado);
  }, [produtos]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.containerTitle}>
        <TextTheme font="PoppinsBold">Produtos de {tipo} de estoque</TextTheme>
      </ThemedView>

      <ThemedView style={styles.containerList}>
        <FlatList
          data={produtos}
          renderItem={({ item }) => (
            <RenderItemListScanner item={item} viewableItems={viewableItems} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <>{loading ? <Loading /> : <Footer />}</>}
          ListEmptyComponent={() => (
            <>{loading ? <></> : <TextTheme>Vazio.</TextTheme>}</>
          )}
          onViewableItemsChanged={({ viewableItems: vItem }) => {
            viewableItems.value = vItem;
          }}
        />
      </ThemedView>

      <View style={styles.containerBotaoScanner}>
        <Quadrado60x60
          style={{
            width: 200,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
          children={
            <Ionicons
              name="scan"
              size={35}
              color={colorText}
              onPress={() => setModalVisible(true)}
            />
          }
        />
        <TextTheme>
          {produtos.filter((p) => !p.scaneado).length} produtos restantes
        </TextTheme>
      </View>

      <Modal
        visible={modalVisible}
        children={
          <ScannerModal
            setProdutos={setProdutos}
            produtos={produtos}
            close={() => setModalVisible(false)}
          />
        }
        onRequestClose={() => setModalVisible(false)}
      />
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

  // containerBotaoScanner: {}
  containerBotaoScanner: {
    width: "100%",
    height: 110,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 100,
    position: "absolute",
    bottom: 0,
  },

  // containerFooter
  containerFooter: {
    width: "100%",
    height: 160,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

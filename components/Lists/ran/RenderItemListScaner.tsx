import {
  IProdutosPedidoCompra,
  IProdutosPedidoVenda,
} from "@/clients/types/api.types";
import ImageByWeb from "@/components/ImageByWeb";
import Quadrado60x60 from "@/components/Quadrado60x60";
import TextTheme from "@/components/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

export type ProdutoParaScanner = { scaneado: boolean } & (
  | IProdutosPedidoCompra
  | IProdutosPedidoVenda
);

const RenderScanItem: React.FC<{ item: ProdutoParaScanner }> = React.memo(
  ({ item }) => {
    const checkedColor = useThemeColor({}, "entradaTexto");

    console.log("item: ", item.produto_id.sku);

    return (
      <View style={styles.container}>
        <View style={styles.containerQuadrado}>
          <ImageByWeb url={item.produto_id.urls[0]} />
        </View>

        <View style={styles.containerTexts}>
          <TextTheme
            style={{
              fontSize: 12,
            }}
          >
            {item.produto_id.desc}
          </TextTheme>
          <TextTheme
            style={[styles.containerSKU, { fontSize: 10, color: "gray" }]}
          >
            {item.produto_id.sku}
          </TextTheme>
        </View>

        <Quadrado60x60
          style={{
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "gray",
            height: 50,
            width: 50,
          }}
          accessibilityLabel={`Quadrado de 60x60 para marcar se o item ${item.produto_id.desc} foi escaneado`}
        >
          {item.scaneado && (
            <Ionicons
              color={checkedColor}
              name="checkmark-circle"
              size={40}
              accessibilityLabel="Escaneado"
            />
          )}
        </Quadrado60x60>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },

  containerQuadrado: {
    width: 70,
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },

  containerTexts: {
    width: "60%",
    height: "auto",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 5,
  },

  containerSKU: {
    width: "auto",
    height: "auto",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 5,
  },
});

export default RenderScanItem;

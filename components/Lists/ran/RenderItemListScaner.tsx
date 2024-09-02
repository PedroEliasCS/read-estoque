import { IProdutoPedido } from "@/clients/types/api.types";
import ImageByWeb from "@/components/ImageByWeb";
import Quadrado60x60 from "@/components/Quadrado60x60";
import TextTheme from "@/components/Text";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";

const RenderScanItem: React.FC<{ item: IProdutoPedido }> = React.memo(
  ({ item }) => {
    const checkedColor = useThemeColor({}, "entradaTexto");

    return (
      <View style={styles.container}>
        <View style={styles.containerQuadrado}>
          <ImageByWeb url={item.url} />
        </View>

        <View style={styles.containerTexts}>
          <TextTheme
            style={{
              fontSize: 12,
            }}
          >
            {item.descricao}
          </TextTheme>
          <TextTheme
            style={[styles.containerSKU, { fontSize: 10, color: "gray" }]}
          >
            {item.sku}
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
        >
          {item.scaneado && (
            <Ionicons color={checkedColor} name="checkmark-circle" size={40} />
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

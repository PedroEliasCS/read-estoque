import { IPedido, IProdutoPedido } from "@/clients/types/api.types";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, ViewToken } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { IItemListElement } from "./ListElement";
import RenderScanItem from "./ran/RenderItemListScaner";
import RenderPedidoItem from "./ran/RenderPedido";

type PropRenderItemListElement<T> = {
  item: IItemListElement<T>;
  viewableItems: SharedValue<ViewToken<IItemListElement<T>>[]>;
};

export type IDataRender<T> = React.FC<PropRenderItemListElement<T>>;

/**
 * Faz a renderização de um item da lista de Pedidos
 */
export const RenderItemHome: IDataRender<IPedido> = React.memo(
  ({ item, viewableItems }) => {
    const coloBackGround = useThemeColor({}, "backGroundItemList");

    const animatedStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          styles.containerItem,
          {
            backgroundColor: coloBackGround,
          },
          animatedStyle,
        ]}
      >
        <RenderPedidoItem item={item} />
      </Animated.View>
    );
  }
);

/**
 * Faz a renderização de um item da lista de Pedidos
 */
export const RenderItemListScanner: IDataRender<IProdutoPedido> = React.memo(
  ({ item, viewableItems }) => {
    const coloBackGround = useThemeColor({}, "backGroundItemList");

    const animatedStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter((item) => item.isViewable)
          .find((viewableItem) => viewableItem.item.id === item.id)
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.6),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          styles.containerItem,
          {
            backgroundColor: coloBackGround,
          },
          animatedStyle,
        ]}
      >
        <RenderScanItem item={item} />
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  containerItem: {
    width: "98%",
    height: 100,
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

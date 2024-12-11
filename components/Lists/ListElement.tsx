import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, StyleSheet, View, ViewToken } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";
import Loading from "../loading";
import TextTheme from "../Text";
import { ThemedView } from "../ThemedView";
import { IDataRender } from "./ItemListElement";

export type IItemListElement<T> = {
  id: string;
} & T;

type IReload<T> = (
  setInfo: React.Dispatch<React.SetStateAction<T[]>>
) => Promise<void>;

type IMore<T> = (
  setInfo: React.Dispatch<React.SetStateAction<T[]>>,
  page: number
) => Promise<void>;

type PropsListElement<T> = {
  title: string | React.ReactNode;
  /**
   * Função que recarrega a lista
   */
  reload: IReload<T>;
  /**
   * Função que renderiza o item
   */
  DataRender: IDataRender<T>;
  /**
   * Função que carrega mais itens na lista
   */
  more?: IMore<T>;
};

/**
 * Lista de item com recarregamento e carregamento de mais itens
 * Com o objetivo de ser mostrado e recarregado
 */
export default function ListElement<T>({
  title,
  reload,
  more,
  DataRender,
}: PropsListElement<IItemListElement<T>>) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [{ page, solictNextPage }, setPage] = useState({
    page: 0,
    solictNextPage: false,
  });
  const [info, setInfo] = useState<IItemListElement<T>[]>([]);
  const [noMoreData, setNoMoreData] = useState(false);
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const reloadInternal = () => {
    setInfo([]);
    setPage({
      page: 1,
      solictNextPage: false,
    });
    setLoading(true);
    reload(setInfo)
      .finally(() => {
        setLoading(false);
      })
      .catch(() => alert("Erro ao carregar"));
  };

  useEffect(() => {
    navigation.addListener("focus", reloadInternal);

    return () => {
      navigation.removeListener("focus", reloadInternal);
    };
  }, []);

  useEffect(() => {
    console.log(
      "Solicitando mais",
      page,
      !!more,
      page > 1,
      info.length > 0,
      solictNextPage
    );

    if (
      !noMoreData &&
      !!more &&
      page > 1 &&
      info.length > 0 &&
      solictNextPage
    ) {
      setLoading(true);
      const antes = info.length;
      more(setInfo, page)
        .catch(() => alert("Erro ao carregar"))
        .finally(() => {
          setLoading(false);
          setPage((prev) => {
            return {
              page: prev.page,
              solictNextPage: false,
            };
          });

          if (info.length === antes) {
            setNoMoreData(true);
          }
        });
    }
  }, [solictNextPage]);

  useEffect(() => {}, [loading]);

  // Converte o array 'info' em um objeto onde as chaves são os 'id' dos itens
  const reducedInfo = info.reduce((acc, item) => {
    // Adiciona cada item ao objeto acumulador 'acc' usando o 'id' do item como chave
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, IItemListElement<T>>);

  // Converte o objeto resultante de volta para um array contendo apenas os valores dos itens
  const result = Object.values(reducedInfo);

  return (
    <ThemedView style={styles.container}>
      {typeof title === "string" ? (
        <View style={styles.containerTitle}>
          <TextTheme>{title}</TextTheme>
        </View>
      ) : (
        title
      )}
      <View style={styles.containerList}>
        <Animated.FlatList
          data={result}
          renderItem={({ item }) => (
            <DataRender item={item} viewableItems={viewableItems} />
          )}
          keyExtractor={(item) => item.id}
          onEndReached={() =>
            !solictNextPage &&
            !noMoreData &&
            info.length > 0 &&
            setPage((prev) => ({
              page: prev.page + 1,
              solictNextPage: true,
            }))
          }
          onEndReachedThreshold={0.1}
          initialNumToRender={10}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={reloadInternal} />
          }
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems: vItem }) => {
            viewableItems.value = vItem;
          }}
          ListFooterComponent={() => (
            <>
              {loading && <Loading />}
              <View style={{ height: 5 }} />
            </>
          )}
          ListEmptyComponent={() => (
            <>{loading ? null : <TextTheme>Vazio.</TextTheme>}</>
          )}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          windowSize={21}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    paddingTop: 59,

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

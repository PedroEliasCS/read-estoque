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
  title: string;
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
  const [loading, setLoading] = useState(true);
  const [{ page, solictNextPage }, setPage] = useState({
    page: 0,
    solictNextPage: false,
  });
  const [info, setInfo] = useState<IItemListElement<T>[]>([]);
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const reloadInternal = () => {
    console.log("Recarregando");
    setInfo([]);
    setPage({
      page: 1,
      solictNextPage: false,
    });
    setLoading(true);
    reload(setInfo)
      .finally(() => {
        console.log(`Recarregado ${info.length}`);
        setLoading(false);
      })
      .catch(() => alert("Erro ao carregar"));
  };

  useEffect(() => {
    reloadInternal();
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

    if (!!more && page > 1 && info.length > 0 && solictNextPage) {
      console.log("Carregando mais", page, !!more);
      setLoading(true);
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
        });
    }
  }, [solictNextPage]);

  useEffect(() => {
    console.log({ loading });
  }, [loading]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.containerTitle}>
        <TextTheme font="PoppinsBold">{title}</TextTheme>
      </View>
      <View style={styles.containerList}>
        <Animated.FlatList
          data={info}
          renderItem={({ item }) => (
            <DataRender item={item} viewableItems={viewableItems} />
          )}
          keyExtractor={(item) => {
            return item.id;
          }}
          onEndReached={() =>
            !solictNextPage &&
            info.length > 0 &&
            setPage((prev) => {
              return {
                page: prev.page + 1,
                solictNextPage: true,
              };
            })
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
          ListFooterComponent={() => <>{loading && <Loading />}</>}
          ListEmptyComponent={() => (
            <>{loading ? <></> : <TextTheme>Vazio.</TextTheme>}</>
          )}
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

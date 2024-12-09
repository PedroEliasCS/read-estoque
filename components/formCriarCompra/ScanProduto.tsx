import { GlobalContext } from "@/context/global/Global";
import { useThemeColor } from "@/hooks/useThemeColor";
import { InternalError } from "@/util/internal-error";
import React, { useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import Button from "../button";
import InputText from "../InputText";
import ScanQrCode from "../scans/ScanQrCode";
import TextTheme from "../Text";
import { ThemedView } from "../ThemedView";

export interface ProdutoScan {
  sku: string;
  id?: string;
  desc?: string;
  quantidade?: number;
}

const ElementModalScan = ({
  close,
  updateList,
}: {
  close: () => void;
  updateList: React.Dispatch<React.SetStateAction<ProdutoScan[]>>;
}) => {
  const [sku, setSku] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  if (sku)
    return (
      <ThemedView>
        <TextTheme>Sku: {sku}</TextTheme>
        <InputText
          value={quantidade.toString()}
          onChangeText={(t) => {
            if (t == "") return setQuantidade(0);

            setQuantidade(parseInt(t));
          }}
          titulo="Quantidade"
          keyboardType="number-pad"
        />
        <Button
          titulo="Salvar"
          onPress={() => {
            updateList((old) => {
              const exist = old.find((p) => p.sku === sku);

              if (exist) {
                exist.quantidade = quantidade;
                return old
                  .filter((p) => p.sku !== sku)
                  .concat({
                    sku,
                    quantidade,
                    id: exist.id,
                    desc: exist.desc,
                  });
              }

              return old.concat({ sku, quantidade });
            });
            close();
          }}
        />
      </ThemedView>
    );

  return <ScanQrCode onScan={setSku} close={close} />;
};

const ElementList = React.memo(({ produto }: { produto: ProdutoScan }) => {
  const {
    apis: { principal },
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const backGroundItemList = useThemeColor({}, "backGroundItemList");

  useEffect(() => {
    principal
      .getProdutoBySku(produto.sku)
      .then((produtoApi) => {
        produto.desc = produtoApi.desc;
        produto.id = produtoApi.id;
      })
      .catch((e) => {
        if (e instanceof InternalError) {
          if (e.code === 404) setError("Produto não encontrado");
          else setError(e.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={[
          style.containerItem,
          {
            backgroundColor: backGroundItemList,
          },
        ]}
      >
        <TextTheme>SKU: {produto.sku}</TextTheme>
        <TextTheme>Quantidade: {produto.quantidade}</TextTheme>
        {loading && <TextTheme>Buscando Produto</TextTheme>}
        {!loading && !error && (
          <>
            <TextTheme>{produto.desc}</TextTheme>
            <TextTheme>{produto.quantidade}</TextTheme>
          </>
        )}

        {error && <TextTheme>{error}</TextTheme>}
      </View>
    </View>
  );
});

export default function ScanProduto({
  produtos,
  setProdutos,
}: {
  produtos: ProdutoScan[];
  setProdutos: React.Dispatch<React.SetStateAction<ProdutoScan[]>>;
}) {
  const [scanVisible, setScanVisible] = useState(false);

  return (
    <View style={style.container}>
      <View style={[style.containerBotoesScanner]}>
        <Button
          style={{
            width: "48%",
          }}
          onPress={() => setScanVisible(true)}
          titulo="Escanear"
        />
        {produtos.length > 0 && (
          <Button
            style={{
              width: "48%",
            }}
            titulo="Limpar"
            onPress={() => setProdutos([])}
          />
        )}
      </View>

      {produtos.map((produto) => {
        return <ElementList produto={produto} />;
      })}

      <Modal
        visible={scanVisible}
        children={
          <ElementModalScan
            close={() => setScanVisible(false)}
            updateList={setProdutos}
          />
        }
        onRequestClose={() => setScanVisible(false)}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    minHeight: 100,

    padding: 10,

    justifyContent: "center",
    alignItems: "center",
  },

  containerItem: {
    width: "98%",
    height: 100,
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  containerBotoesScanner: {
    width: "100%",
    height: 110,
    paddingHorizontal: 50,
    gap: 10,

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    zIndex: 100,
  },
});

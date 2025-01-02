import { IContato } from "@/clients/types/api.types";
import { GlobalContext } from "@/context/global/Global";
import { ModalContext } from "@/context/modal/Modal";
import useVar from "@/hooks/useVar";
import { InternalError } from "@/util/internal-error";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Button from "../button";
import ScanProduto, { ProdutoScan } from "./ScanProduto";
import SelectContatoCompra from "./SelectContatoCompra";

export default function CriarCompra() {
  const {
    apis: { principal },
  } = useContext(GlobalContext);
  const { open } = useContext(ModalContext);

  const route = useRouter();

  const [contato, , setContato] = useVar<IContato>({
    initial: null!,
  });

  const [produtos, setProdutos] = useState<ProdutoScan[]>([]);

  const [loading, setLoading] = useState(false);

  const criar = async () => {
    if (
      produtos.filter((p) => {
        return !(p.id && p.quantidade);
      }).length != 0
    ) {
      open({
        texto: "Há produtos que não foram encontrados",
      });
      return;
    }

    setLoading(true);

    const response = await principal
      .postCriarPedidoCompra(
        contato.id,
        produtos.map((p) => ({
          produto_id: p.id!,
          quantidade: p.quantidade!,
        }))
      )
      .catch((e) => {
        if (e instanceof InternalError) {
          if (
            e.code === 482 &&
            e.message.includes("Não foi possível lançar as contas")
          )
            open({
              texto:
                "Entrada criada, mas não foi possível lançar as contas a pagar",
              afterClose: () => route.navigate("/(auth)/tab/entradas/"),
            });

          return 1;
        }

        open({
          texto: e.message,
          afterClose: () => route.navigate("/(auth)/tab/entradas/"),
        });

        return 1;
      });

    setLoading(false);

    if (response === 1) return;

    open({
      texto: "Compra criada com sucesso",
      iconName: "Entrada",
      afterClose: () => route.navigate("/(auth)/tab/entradas/"),
    });
  };

  return (
    <ScrollView style={style.container}>
      {!loading && (
        <>
          <SelectContatoCompra value={contato} setValue={setContato} />
          {contato && (
            <ScanProduto produtos={produtos} setProdutos={setProdutos} />
          )}
        </>
      )}
      {contato && produtos.length > 0 && (
        <Button
          style={{
            alignSelf: "center",
          }}
          titulo="Finalizar"
          onPress={criar}
          loading={loading}
        />
      )}

      <View
        style={{
          height: 500,
        }}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "95%",
    marginTop: 50,
  },
});

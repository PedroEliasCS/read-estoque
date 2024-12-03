import { IPedido, TipoPedido } from "@/clients/types/api.types";
import { RenderItemHome } from "@/components/Lists/ItemListElement";
import ListElement from "@/components/Lists/ListElement";
import { ThemedView } from "@/components/ThemedView";
import { GlobalContext } from "@/context/global/Global";
import { useContext } from "react";

export default function Entradas() {
  const {
    apis: { principal: Api },
  } = useContext(GlobalContext);

  return (
    <ThemedView>
      <ListElement<IPedido>
        DataRender={RenderItemHome}
        title="Pedidos de entrada"
        reload={async (setInfo) => {
          await Api.getPedidoCompra().then((data) =>
            setInfo(data.map((item) => ({ ...item, tipo: TipoPedido.compra })))
          );
        }}
        more={async (setInfo, page) => {
          await Api.getPedidoEmAberto(page).then((data) =>
            setInfo((prev) => [
              ...prev,
              ...data.map((item) => ({ ...item, tipo: TipoPedido.compra })),
            ])
          );
        }}
      />
    </ThemedView>
  );
}

import Api from "@/clients/api";
import { IPedido } from "@/clients/types/api.types";
import { RenderItemHome } from "@/components/Lists/ItemListElement";
import ListElement from "@/components/Lists/ListElement";
import { ThemedView } from "@/components/ThemedView";

export default function Saida() {
  return (
    <ThemedView>
      <ListElement<IPedido>
        DataRender={RenderItemHome}
        title="Pedidos de entrada"
        reload={async (setInfo) => {
          await Api.getPedidoEmAberto().then((data) =>
            setInfo(data.filter((e) => e.tipo == "V"))
          );
        }}
        more={async (setInfo, page) => {
          await Api.getPedidoEmAberto(page).then((data) =>
            setInfo((prev) => [...prev, ...data.filter((e) => e.tipo == "V")])
          );
        }}
      />
    </ThemedView>
  );
}

import { IPedido } from "@/clients/types/api.types";
import { RenderItemHome } from "@/components/Lists/ItemListElement";
import ListElement from "@/components/Lists/ListElement";
import { ThemedView } from "@/components/ThemedView";
import { GlobalContext } from "@/context/global/Global";
import React, { useContext } from "react";

export default function Home() {
  const {
    apis: { principal },
  } = useContext(GlobalContext);

  return (
    <ThemedView>
      <ListElement<IPedido>
        DataRender={RenderItemHome}
        title="Pedidos"
        reload={async (setInfo) => {
          await principal.getPedidoEmAberto().then((data) => setInfo(data));
        }}
        more={async (setInfo, page) => {
          await principal
            .getPedidoEmAberto(page)
            .then((data) => setInfo((prev) => [...prev, ...data]));
        }}
      />
    </ThemedView>
  );
}

import Api from "@/clients/api";
import { IPedido } from "@/clients/types/api.types";
import { RenderItemHome } from "@/components/List/ItemListElement";
import ListElement from "@/components/List/ListElement";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

export default function Home() {
  return (
    <ThemedView>
      <ListElement<IPedido>
        DataRender={RenderItemHome}
        title="Pedidos"
        reload={async (setInfo) => {
          await Api.getPedidoEmAberto().then((data) => setInfo(data));
        }}
        more={async (setInfo, page) => {
          await Api.getPedidoEmAberto(page).then((data) =>
            setInfo((prev) => [...prev, ...data])
          );
        }}
      />
    </ThemedView>
  );
}

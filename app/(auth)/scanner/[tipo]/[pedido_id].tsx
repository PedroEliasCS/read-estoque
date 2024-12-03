import ListForScan, {
  IParamsListForScan,
} from "@/components/Lists/ListForScan";
import { ThemedView } from "@/components/ThemedView";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

function alertAndGoBack() {
  alert("Pedido não encontrado");
  router.back();
}

export default function PedidoPage() {
  const params = useLocalSearchParams<IParamsListForScan>();

  useEffect(() => {
    if (typeof params === "undefined") alertAndGoBack();
    if (typeof params.tipo === "undefined") alertAndGoBack();
    if (typeof params.pedido_id === "undefined") alertAndGoBack();
  }, []);

  return (
    <ThemedView>
      <ListForScan {...params} />
    </ThemedView>
  );
}

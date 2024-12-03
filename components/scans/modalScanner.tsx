import { TipoPedido } from "@/clients/types/api.types";
import Loading from "@/components/loading";
import ModalAlert from "@/components/modals/ModalAlert";
import ScanQrCode from "@/components/scans/ScanQrCode";
import { ThemedView } from "@/components/ThemedView";

import { useEffect, useState } from "react";
import { ProdutoParaScanner } from "../Lists/ran/RenderItemListScaner";

interface logScreen {
  text: string;
  close: () => void;
}

export type IParams = {
  tipo: TipoPedido;
  id: string;
};

type PropsScannerModal = {
  setProdutos: React.Dispatch<React.SetStateAction<ProdutoParaScanner[]>>;
  produtos: ProdutoParaScanner[];
  close: () => void;
};

/**
 * Faz a leitura do QR code
 * @returns
 */
export default function ScannerModal({
  setProdutos,
  produtos,
  close,
}: PropsScannerModal) {
  const [code, setCode] = useState<string | null>(null);
  const [logScreen, setLogScreen] = useState<logScreen>();

  const [loading, setLoading] = useState(true);

  const reset = () => {
    setCode(null);
    setLogScreen(undefined);
    setLoading(false);
  };

  const complete = async (code: string) => {
    setLoading(true);

    const index = produtos.findIndex((p) => p.produto_id.sku === code);

    if (index !== -1) {
      console.log("dentro do if");
      if (produtos[index].scaneado) {
        setLogScreen({
          text: "Produto já escaneado",
          close: () => {
            reset();
          },
        });
        return;
      }

      setProdutos((previus) => {
        const newProdutos = [...previus];
        const find = { ...newProdutos[index], scaneado: true };
        newProdutos[index] = find;
        return newProdutos;
      });
      close();
      return;
    }

    setLogScreen({
      text: "Produto não encontrado nessa lista encontrado",
      close: () => {
        close();
      },
    });

    setLoading(false);
  };

  useEffect(() => {
    if (code) complete(code);
  }, [code]);

  useEffect(() => {
    reset();
  }, []);

  if (loading)
    return (
      <ThemedView>
        <Loading />
      </ThemedView>
    );

  if (logScreen) return <ModalAlert {...logScreen} />;

  return <ScanQrCode onScan={setCode} close={close} />;
}

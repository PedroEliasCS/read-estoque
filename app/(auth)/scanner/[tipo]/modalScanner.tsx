import Loading from "@/components/loading";
import ModalAlert from "@/components/modals/ModalAlert";
import ScanQrCode from "@/components/ScanQrCode";
import { ThemedView } from "@/components/ThemedView";
import delay from "@/util/delay";
import random from "@/util/random";

import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";

interface logScreen {
  text: string;
  close: () => void;
}

export type IParams = {
  tipo: string;
  id: string;
};

/**
 * Faz a leitura do QR code
 * @returns
 */
export default function ScannerPage() {
  const params = useLocalSearchParams<IParams>();
  const navigation = useNavigation();

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

    console.log(code);
    await delay(2);

    setLogScreen(
      random({
        choises: [
          {
            text: "Produto não encontrado",
            close: () => {
              reset();
            },
          },
          {
            text: "Produto encontrado",
            close: () => {
              reset();
            },
          },
        ],
      })
    );

    setLoading(false);
  };

  useEffect(() => {
    if (code) complete(code);
  }, [code]);

  useEffect(() => {
    /**
     * Caso não tenha parametros, redireciona para a tela inicial
     */
    const focus = navigation.addListener("focus", () => {
      console.log("focus", params);
      if (typeof params == "undefined") {
        router.navigate({
          pathname: "/(auth)/tab",
        });
      } else if (
        typeof params.tipo == "undefined" ||
        typeof params.id == "undefined"
      ) {
        alert("Parametros inválidos");
        router.back();
      }
    });

    reset();

    return () => {
      focus();
    };
  }, []);

  if (loading)
    return (
      <ThemedView>
        <Loading />
      </ThemedView>
    );

  if (logScreen) return <ModalAlert {...logScreen} />;

  return <ScanQrCode onScan={setCode} />;
}

import { ModalLocal } from "@/components/modal/ModalLocal";
import { NavigationContainerProps } from "@react-navigation/native";
import { useState } from "react";
import { ModalContext, ModalProps } from "./Modal";

export function ModalProvider({ children }: NavigationContainerProps) {
  const [aberto, setAberto] = useState<ModalProps | null>(null);
  let numberAbertos = 0;

  const open = (obj: ModalProps) => {
    if (aberto) return;

    setAberto(obj);
  };

  const close = () => {
    numberAbertos = 0;
    setAberto(null);
  };

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
        aberto,
        numberAbertos: {
          num: numberAbertos,
        },
      }}
    >
      {children}
      <ModalLocal />
    </ModalContext.Provider>
  );
}

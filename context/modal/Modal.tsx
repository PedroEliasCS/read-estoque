import { IconNames } from "@/components/icons/Icon";
import { createContext } from "react";

export interface ModalProps {
  texto: string;
  iconName?: IconNames;
  textoCopiar?: {
    texto: string;
    textoCopiado: string;
  };
  afterClose?: () => void;
}

export interface ModalContext {
  /**
   * Função que abre o modal
   */
  open(obj: ModalProps): void;
  /**
   * Função que fecha o modal
   */
  close(): void;
  /**
   * Variavel que armazena o estado do modal
   */
  aberto: ModalProps | null;

  numberAbertos: {
    num: number;
  };
}

export const ModalContext = createContext<ModalContext>(null!);

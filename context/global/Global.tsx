import Api from "@/clients/api";
import { createContext } from "react";

export enum EnumDefaultApi {
  success = "success",
  error = "error",
  passwordWrong = "passwordWrong",
  emailWrong = "emailWrong",
  internetError = "internetError",
  fieldMissing = "fieldMissing",
  emailDuplicated = "emailDuplicated",
}

export interface GlobalCon {
  /**
   * Informações do usuario
   */
  auth: boolean;
  /**
   * Função que faz o login do usuario
   * @param email
   * @param password
   */
  login(email: string, password: string): Promise<EnumDefaultApi>;
  /**
   * Função que faz o logout do usuario
   */
  logout(): Promise<void>;

  /**
   * Variavel que armazena as APIs
   */
  apis: {
    /**
     * Class principal
     */
    principal: Api;
  };

  loading: boolean;
}

/**
 * Cria o contexto antes de ser preenchido com informação
 */
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const GlobalContext = createContext<GlobalCon>(null!);

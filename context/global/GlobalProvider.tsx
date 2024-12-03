import Api from "@/clients/api";

import delay from "@/util/delay";
import { NavigationContainerProps } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useReducer, useState } from "react";
import { InternalError } from "../../util/internal-error";
import memoria from "../../util/memoria";
import { EnumDefaultApi, GlobalContext } from "./Global";

/**
 * Faz a autenticação do usuario e teste se o usuario esta logado
 * @param children O componente que será renderizado depois da validação
 * @returns O provider Auth q é responsavel por checar a autenticação do usuario
 */
export const GlobalProvider = ({ children }: NavigationContainerProps) => {
  const navigation = useRouter();

  /**
   * Faz o logout do usuario
   */
  const logout = async () => {
    await Promise.all([memoria.deleteAll()]);
    dispatchApiPrincipal(undefined);
    setAuth(false);

    navigation.replace("/");
  };

  // ---- deixar logout acima

  const [loading, setLoading] = useState(true);

  // Seta a api da cecilia nas informações da página
  const [apiPrincipal, dispatchApiPrincipal] = useReducer(
    (state: Api, action: string | undefined) => {
      state.token = action;
      return state;
    },
    new Api(logout)
  );

  const [auth, setAuth] = useState<boolean>(false);

  /**
   * Faz o login do usuario
   * @param email
   * @param password
   * @returns O elemento do enum EnumDefaultApi que indica o resultado da operação
   */
  const login = async (
    email: string,
    password: string
  ): Promise<EnumDefaultApi> => {
    try {
      const token = await apiPrincipal.login(email, password);

      {
        // Salva o token e o user no local storage
        await memoria.set("token", token, 365 * 60 * 60 * 24);

        dispatchApiPrincipal(token);

        setAuth(true);
        setLoading(false);

        return EnumDefaultApi.success;
      }
    } catch (error) {
      if (error instanceof InternalError) {
        console.log({ error: error.code });

        if (error.code === 401) return EnumDefaultApi.passwordWrong;
        if (error.code === 404) return EnumDefaultApi.emailWrong;
        if (error.code === 499) return EnumDefaultApi.internetError;
      }

      console.log({ error });

      return EnumDefaultApi.error;
    }
  };

  useEffect(() => {
    /**
     * Função que faz a inicialização da página como contexto
     */
    const initPage = async () => {
      const [token] = await Promise.all([memoria.get<string>("token")]);

      if (token) dispatchApiPrincipal(token);

      setAuth(!!token);
      setLoading(false);

      await delay(0.1);
    };

    initPage();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        login,
        logout,
        apis: {
          principal: apiPrincipal,
        },

        // Variavel que armazena o usuario logado
        auth,

        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

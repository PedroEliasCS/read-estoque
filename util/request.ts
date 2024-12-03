/// <reference lib="DOM" />
/*eslint-disable */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface RequestConfig extends AxiosRequestConfig {}
// extende e mascara o axiosRequestConfig
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Response<T = any> extends AxiosResponse<T> {}
// extende e marcara o axiosRespose<T>
// T sendo generico

// QUAL A NECESSIDADE DISSO
// isso é um jeito de modular o codigo, se vc desejar trocar o axios que é uma ferramenta de consumo de api
// por qualquer outra a seu desejo, é só trocar nesse arquivo
// sem nenhuma necessidade de alterar os /clients
//----------------------------------
// acima ---------------------------
//-----------acima------------------

/**
 * é oque vai fazer a modulagem daquilo que vai fazer a requisição externa.
 * @Utilizado Axios
 */
export default class Request {
  /**
   * @param request recebe o request mas tem como padrão axios
   */
  constructor(private request = axios) {}
  // sendo que esse obj é invocado
  // instancia o axios
  // mas poderia ser qualquer um

  /**
   * Fazer a requisição do tipo Get
   * @param url  É o link da API
   * @param config os headers da API
   * @returns O retorno é uma promise generica
   */

  public get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    // essa função publica de nome Get
    // sendo ela generico
    // recebe url e config
    // e retornando o tipo promisse que deve conter a promessa de resposta de tipo generico
    return this.request.get<T, Response<T>>(url, config);
    // retorna chamando o get axios e esperando o retorno de um generico e de uma resposta que pode ser generica
    // passando o parametro url e config para a chamada
  }

  /**
   * Fazer a requisição do tipo Post
   * @param url  É o link da API
   * @param data A informação que vai passar via body
   * @param config  Headers da API
   * @returns O retorno é uma promise generica
   */
  public post<T>(
    url: string,
    data: Object,
    config: RequestConfig = {}
  ): Promise<Response<T>> {
    //essa função é publica de nome Post
    // sendo q ela retornar generico
    // recebe a url da conexão
    // data são as informações dentro do {}
    // config são os headers são requisição

    return this.request.post<T, Response<T>>(url, data, config);
    // essa função chama a request.post e passa as informações
  }

  /**
   * Fazer a requisição do tipo Patch
   * @param url É o link da API
   * @param data A informação que vai passar via body
   * @param config Headers da API
   * @returns O retorno é uma promise generica
   */
  public patch<T>(
    url: string,
    data: Object,
    config: RequestConfig = {}
  ): Promise<Response<T>> {
    // essa public mascarar o axios.patch
    // ela retorna qualquer resposta possivel com generico
    return this.request.patch(url, data, config);
  }

  /**
   *
   * @param url é o link da API
   * @param data A informação que vai passar via body
   * @param config Headers da API
   * @returns O retorno é uma promise generica
   */
  public put<T>(
    url: string,
    data: Object,
    config: RequestConfig = {}
  ): Promise<Response<T>> {
    // essa public mascarar o axios.put
    // ela retorna qualquer resposta possivel com generico
    return this.request.put(url, data, config);
  }

  /**
   *
   * @param url é o link da API
   * @param config Headers da API
   * @returns O retorno é uma promise generica
   */
  public delete<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<Response<T>> {
    // essa public mascarar o axios.delete
    // ela retorna qualquer resposta possivel com generico
    return this.request.delete(url, config);
  }

  /**
   * Checa se o Erro é pertecente ao erro de requisição
   * @param error Dados do erro
   * @returns Retorno um boolean
   */
  public isRequestError(error: unknown): boolean {
    // usado para validar se o erro veio de requisição
    return !!(
      // !! força o retorno boolean
      ((error as AxiosError).response && (error as AxiosError).response?.status)
      // error é atribuido a AxiosErros
      // pois o unico lugar aonde o axios é encontrato é nesse OBJ
    );
  }

  /**
   * Extrai a informação do erro com base da request, caso não seja um erro de request
   * volta um throw de não pertencente a essa categoria de erro
   * @param error Vai passar os dados do erro
   * @returns Retornando o status e a data do erro
   */

  public extractErrorData(
    // faz a estração do erro
    error: unknown
  ): Pick<AxiosResponse, "data" | "status"> {
    // pick é usado para (T, união de K)
    // aonde T é o AxiosResponse
    // o K é a união de 'data' e 'status'
    const axiosError = error as AxiosError;
    // aponta um tipo para error
    if (axiosError.response && axiosError.response.status) {
      // caso exista response e o status
      // é um erro de request
      return {
        // retorna os status dele
        data: axiosError.response.data,
        status: axiosError.response.status,
      };
    }
    // caso não
    // retorna um novo erro
    throw Error(`The error ${error} is not a Request Error`);
  }
}
/*eslint-enable */

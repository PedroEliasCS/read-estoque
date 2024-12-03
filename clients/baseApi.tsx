import { InternalError } from "../util/internal-error";
import Memoria from "../util/memoria";
import Request, { Response } from "../util/request";

interface ParamsApi {
  [key: string]: unknown;
}

/**
 * Classe base para as API's
 */
class BaseApi {
  private api: Request;
  protected headers: ParamsApi = {};
  constructor(
    protected link: string,
    private afterError401: () => void,
    protected memoria = Memoria
  ) {
    this.api = new Request();
  }

  protected async get<T>(path: string) {
    try {
      const memoria = await this.memoria.get<Response<T>>(`cache-${path}`);

      if (memoria) return memoria;

      console.log("path", `${this.link}${path}`);
      const response = await this.api.get<T>(
        `${this.link}${path}`,
        this.headers
      );

      await this.memoria.set(`cache-${path}`, response, 5);

      return response;
    } catch (error) {
      this.handlerError(error);
    }
  }

  protected async post<T>(path: string, data: ParamsApi) {
    try {
      console.log("path", `${this.link}${path}`);
      return await this.api.post<T>(`${this.link}${path}`, data, this.headers);
    } catch (error) {
      this.handlerError(error);
    }
  }

  protected async patch<T>(path: string, data: ParamsApi = {}) {
    try {
      return await this.api.patch<T>(`${this.link}${path}`, data, this.headers);
    } catch (error) {
      this.handlerError(error);
    }
  }

  protected async put<T>(path: string, data: ParamsApi = {}) {
    try {
      return await this.api.put<T>(`${this.link}${path}`, data, this.headers);
    } catch (error) {
      this.handlerError(error);
    }
  }

  protected async delete<T>(path: string, data: ParamsApi = {}) {
    try {
      return await this.api.delete<T>(`${this.link}${path}`, {
        ...this.headers,
        data,
      });
    } catch (error) {
      this.handlerError(error);
    }
  }

  set token(token: string | undefined) {
    this.headers = {
      headers: {
        "x-access-token": token || "",
      },
    };
  }

  /**
   * Faz a normalização dos erros da API
   * @param error
   */
  private handlerError(error: unknown): never {
    console.log({ error });
    if (this.api.isRequestError(error)) {
      const erra = this.api.extractErrorData(error);

      if (erra.data.code === 401) this.afterError401();

      throw new InternalError(
        erra.data.message,
        erra.data.code,
        erra.data.error.classError
      );
    }

    if ((error as Error).message.includes("Network Error"))
      throw new InternalError(
        (error as Error).message,
        499,
        (error as Error).name
      );

    throw new InternalError(
      (error as Error).message,
      500,
      (error as Error).name
    );
  }
}

export default BaseApi;

import {
  IContato,
  IPedido,
  IProduto,
  IProdutosPedidoCompra,
  IProdutosPedidoVenda,
  IUser,
} from "./types/api.types";

import BaseApi from "./baseApi";

class Api extends BaseApi {
  constructor(functionError401: () => void) {
    super(
      "https://stars-estoque-prd-539155982921.southamerica-east1.run.app",
      functionError401
    );
  }

  public async login(userName: string, password: string): Promise<string> {
    const request = await this.post<{
      data: {
        token: string;
      };
    }>("/colaborador/login", {
      userName,
      password,
    });

    return request.data.data.token;
  }

  public async my(): Promise<IUser> {
    const response = await this.get<{
      data: {
        colaborador: IUser;
      };
    }>(`/colaborador/me`);

    return response.data.data.colaborador;
  }

  public async getPedidoEmAberto(page: number = 1): Promise<IPedido[]> {
    const response = await this.get<{
      data: {
        pedidos: IPedido[];
      };
    }>(`/pedido/colaborador/geral?feito=false&sincronizar=true&page=${page}`);

    return response.data.data.pedidos;
  }

  public async getPedidoCompra(page: number = 1): Promise<IPedido[]> {
    const response = await this.get<{
      data: {
        pedidos: IPedido[];
      };
    }>(`/pedido/colaborador/compra?feito=false&page=${page}`);

    return response.data.data.pedidos;
  }

  public async getPedidoVenda(page: number = 1): Promise<IPedido[]> {
    const response = await this.get<{
      data: {
        pedidos: IPedido[];
      };
    }>(`/pedido/colaborador/venda?page=${page}`);

    return response.data.data.pedidos;
  }

  public async getHistoricoPedido(page: number = 1): Promise<IPedido[]> {
    const response = await this.get<{
      data: {
        pedidos: IPedido[];
      };
    }>(`/pedido/colaborador/geral?feito=false&page=${page}&feito=true`);

    return response.data.data.pedidos;
  }

  public async getProdutosPedidoCompra(
    pedido_id: string
  ): Promise<IProdutosPedidoCompra[]> {
    const response = await this.get<{
      data: {
        compra: IPedido;
        itens: IProdutosPedidoCompra[];
      };
    }>(`/pedido/colaborador/unico/compra?pedido_id=${pedido_id}`);

    return response.data.data.itens;
  }

  public async getProdutosPedidoVenda(
    pedido_id: string
  ): Promise<IProdutosPedidoVenda[]> {
    const response = await this.get<{
      data: {
        venda: IPedido;
        itens: IProdutosPedidoVenda[];
      };
    }>(`/pedido/colaborador/unico/venda?pedido_id=${pedido_id}`);

    return response.data.data.itens;
  }

  public async finalizaPedidoCompra(pedido_id: string): Promise<void> {
    await this.patch(
      `/pedido/colaborador/marcarFeito/compra?pedido_id=${pedido_id}`
    );
  }

  public async finalizaPedidoVenda(pedido_id: string): Promise<void> {
    await this.patch(
      `/pedido/colaborador/marcarFeito/venda?pedido_id=${pedido_id}`
    );
  }

  public async getContatos(page: number = 1, filter = ""): Promise<IContato[]> {
    const response = await this.get<{
      data: {
        contatos: IContato[];
      };
    }>(`/colaboradorRotas/contato?page=${page}&filter=${filter}`);

    return response.data.data.contatos;
  }

  public async getProdutoBySku(sku: string): Promise<IProduto> {
    const response = await this.get<{
      data: {
        produto: IProduto;
      };
    }>(`/colaboradorRotas/produtoPorSku?sku=${sku}`);

    return response.data.data.produto;
  }

  public async postCriarPedidoCompra(
    contato_id: string,
    produtos: { produto_id: string; quantidade: number }[]
  ): Promise<void> {
    await this.post("/pedido/colaborador/criar?tipo=compra", {
      contato_id,
      produtos,
    });
  }
}

export default Api;

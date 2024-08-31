import { IPedido, IProdutoPedido } from "./types/api.types";

import delay from "@/util/delay";
import mockPedidos from "./mock/pedidos.json";
import mockProdutos from "./mock/ProdutosDePedido.json";

export class Api {
  constructor() {}

  public async getPedidoEmAberto(page: number = 1): Promise<IPedido[]> {
    await delay(2);
    return mockPedidos.map((item) => ({
      ...item,
      numeroPedido: `${item.numeroPedido}-${page}`,
      id: `${item.id}-${page}`,
    }));
  }

  public async getPedidoEntrada(page: number = 1): Promise<IPedido[]> {
    await delay(2);

    return mockPedidos
      .filter((e) => e.tipo == "C")
      .map((item) => ({
        ...item,
        numeroPedido: `${item.numeroPedido}-${page}`,
        id: `${item.id}-${page}`,
      }));
  }

  public async getPedidoSaida(page: number = 1): Promise<IPedido[]> {
    await delay(2);

    return mockPedidos
      .filter((e) => e.tipo == "V")
      .map((item) => ({
        ...item,
        numeroPedido: `${item.numeroPedido}-${page}`,
        id: `${item.id}-${page}`,
      }));
  }

  public async getHistoricoPedido(page: number = 1): Promise<IPedido[]> {
    await delay(2);

    return mockPedidos.map((item) => ({
      ...item,
      numeroPedido: `${item.numeroPedido}-${page}`,
      id: `${item.id}-${page}`,
      feito: true,
    }));
  }

  public async getProdutosPedido(pedido_id: string): Promise<IProdutoPedido[]> {
    await delay(2);

    return mockProdutos.map((produto) => ({
      ...produto,
      scaneado: false,
      pedido_id,
    }));
  }
}

const api = new Api();

export default api;

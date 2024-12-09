export interface IUser {
  userName: string;
  conta_id: string;
  id: string;
}

export enum TipoPedido {
  venda = "venda",
  compra = "compra",
}

export interface IPedido {
  bling_id: number;
  data: string;
  numeroPedido: number;
  feito: boolean;
  totalProduto: number;
  valorTotal: number;
  id: string;
  tipo?: TipoPedido;
}

interface IProdutoPedido {
  produto_id: {
    bling_id: number;
    desc: string;
    sku: string;
    urls: string[];
    id: string;
  };
  price: number;
  quantidade: number;
  id: string;
}

export interface IProdutosPedidoCompra extends IProdutoPedido {
  compra_id: string;
}

export interface IProdutosPedidoVenda extends IProdutoPedido {
  venda_id: string;
}

export interface IContato {
  bling_id: number;
  nome: string;
  cecular: string;
  id: string;
}

export interface IProduto {
  bling_id: number;
  desc: string;
  sku: string;
  price: number;
  urls: string[];
  id: string;
}

export interface IPedido {
  tipo: string;
  data: string;
  totalProdutos: number;
  numeroPedido: string;
  id: string;
  feito: boolean;
}

export interface IProdutoPedido {
  id: string;
  pedido_id: string;
  produto_id: string;
  descricao: string;
  sku: string;
  scaneado: boolean;
}


import jsPDF from 'jspdf';

interface PedidoData {
  numero: string;
  data: string;
  cliente?: string;
  itens: Array<{
    nome: string;
    quantidade: number;
    preco: number;
    total: number;
  }>;
  subtotal: number;
  desconto: number;
  total: number;
  formaPagamento: string;
  vendedor: string;
}

export const gerarPedidoPDF = (pedido: PedidoData) => {
  const doc = new jsPDF();
  
  // Cabeçalho
  doc.setFontSize(20);
  doc.text('LojixApp', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Pedido de Venda', 105, 30, { align: 'center' });
  
  // Informações do pedido
  let yPos = 50;
  doc.text(`Número: ${pedido.numero}`, 20, yPos);
  doc.text(`Data: ${pedido.data}`, 20, yPos + 8);
  doc.text(`Cliente: ${pedido.cliente || 'Não informado'}`, 20, yPos + 16);
  doc.text(`Vendedor: ${pedido.vendedor}`, 20, yPos + 24);
  doc.text(`Pagamento: ${pedido.formaPagamento}`, 20, yPos + 32);
  
  // Cabeçalho da tabela
  yPos = 100;
  doc.text('Produto', 20, yPos);
  doc.text('Qtd', 120, yPos);
  doc.text('Preço', 140, yPos);
  doc.text('Total', 170, yPos);
  
  // Linha separadora
  doc.line(20, yPos + 3, 190, yPos + 3);
  
  // Itens
  yPos += 10;
  pedido.itens.forEach((item) => {
    doc.text(item.nome.substring(0, 30), 20, yPos);
    doc.text(item.quantidade.toString(), 120, yPos);
    doc.text(`R$ ${item.preco.toFixed(2)}`, 140, yPos);
    doc.text(`R$ ${item.total.toFixed(2)}`, 170, yPos);
    yPos += 8;
  });
  
  // Totais
  yPos += 10;
  doc.line(20, yPos, 190, yPos);
  yPos += 8;
  doc.text(`Subtotal: R$ ${pedido.subtotal.toFixed(2)}`, 140, yPos);
  doc.text(`Desconto: R$ ${pedido.desconto.toFixed(2)}`, 140, yPos + 8);
  doc.setFontSize(14);
  doc.text(`TOTAL: R$ ${pedido.total.toFixed(2)}`, 140, yPos + 20);
  
  // Salvar arquivo
  doc.save(`pedido-${pedido.numero}.pdf`);
};

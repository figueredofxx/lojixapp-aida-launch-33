
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Eye, Printer, Download, Building2, MapPin, Phone, Mail } from "lucide-react";

interface PedidoVisualizacaoProps {
  children: React.ReactNode;
  pedido?: {
    numero: string;
    data: string;
    cliente: string;
    items: Array<{
      produto: string;
      quantidade: number;
      preco: number;
      total: number;
    }>;
    subtotal: number;
    desconto: number;
    total: number;
    formaPagamento: string;
    garantia: string;
  };
}

const PedidoVisualizacao = ({ children, pedido }: PedidoVisualizacaoProps) => {
  const dadosEmpresa = {
    razaoSocial: "LojixApp Tecnologia LTDA",
    nomeFantasia: "LojixApp",
    cnpj: "12.345.678/0001-90",
    endereco: "Av. Paulista, 1234 - Bela Vista",
    cidade: "São Paulo - SP",
    cep: "01310-100",
    telefone: "(11) 3456-7890",
    email: "contato@lojixapp.com"
  };

  const pedidoExemplo = pedido || {
    numero: "PDV-001234",
    data: new Date().toLocaleDateString('pt-BR'),
    cliente: "João Silva",
    items: [
      { produto: "iPhone 15 Pro", quantidade: 1, preco: 6999.00, total: 6999.00 },
      { produto: "Capinha Transparente", quantidade: 2, preco: 29.90, total: 59.80 }
    ],
    subtotal: 7058.80,
    desconto: 0,
    total: 7058.80,
    formaPagamento: "Cartão de Crédito",
    garantia: "12 meses contra defeitos de fabricação"
  };

  const imprimirPedido = () => {
    window.print();
  };

  const downloadPDF = () => {
    // Implementar geração de PDF
    console.log("Download PDF");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-cantarell text-xl font-semibold flex items-center justify-between">
            <div className="flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Visualizar Pedido
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={downloadPDF} className="font-inter">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={imprimirPedido} className="font-inter">
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="print:p-0 print:m-0">
          <Card className="print:shadow-none print:border-none">
            <CardContent className="p-6 print:p-4">
              {/* Cabeçalho da Empresa */}
              <div className="text-center mb-6 print:mb-4">
                <div className="flex items-center justify-center mb-2">
                  <Building2 className="h-8 w-8 text-primary mr-2" />
                  <h1 className="font-cantarell text-2xl font-bold text-primary">
                    {dadosEmpresa.nomeFantasia}
                  </h1>
                </div>
                <h2 className="font-inter text-lg font-semibold text-foreground">
                  {dadosEmpresa.razaoSocial}
                </h2>
                <p className="font-inter text-sm text-muted-foreground">
                  CNPJ: {dadosEmpresa.cnpj}
                </p>
                <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground font-inter">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {dadosEmpresa.endereco}, {dadosEmpresa.cidade}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-1 text-sm text-muted-foreground font-inter">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {dadosEmpresa.telefone}
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {dadosEmpresa.email}
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Informações do Pedido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-cantarell text-lg font-semibold mb-3">PEDIDO DE VENDA</h3>
                  <div className="space-y-2 font-inter text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Número:</span>
                      <Badge variant="outline" className="font-inter">
                        {pedidoExemplo.numero}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Data:</span>
                      <span>{pedidoExemplo.data}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Cliente:</span>
                      <span>{pedidoExemplo.cliente}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Pagamento:</span>
                      <span>{pedidoExemplo.formaPagamento}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-cantarell text-lg font-semibold mb-3">VENDEDOR</h3>
                  <div className="space-y-2 font-inter text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Nome:</span>
                      <span>Admin Sistema</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">CPF:</span>
                      <span>000.000.000-00</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Itens do Pedido */}
              <div className="mb-6">
                <h3 className="font-cantarell text-lg font-semibold mb-4">PRODUTOS/SERVIÇOS</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full font-inter text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-3 font-medium">Produto/Serviço</th>
                        <th className="text-center p-3 font-medium">Qtd</th>
                        <th className="text-right p-3 font-medium">Valor Unit.</th>
                        <th className="text-right p-3 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedidoExemplo.items.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 font-medium">{item.produto}</td>
                          <td className="p-3 text-center">{item.quantidade}</td>
                          <td className="p-3 text-right">
                            R$ {item.preco.toFixed(2).replace('.', ',')}
                          </td>
                          <td className="p-3 text-right font-medium">
                            R$ {item.total.toFixed(2).replace('.', ',')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totais */}
              <div className="flex justify-end mb-6">
                <div className="w-full md:w-80">
                  <div className="space-y-2 font-inter">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>R$ {pedidoExemplo.subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Desconto:</span>
                      <span>R$ {pedidoExemplo.desconto.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>TOTAL:</span>
                      <span className="text-primary">
                        R$ {pedidoExemplo.total.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Garantia */}
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <h4 className="font-cantarell font-semibold mb-2 text-sm">GARANTIA</h4>
                <p className="font-inter text-sm text-muted-foreground">
                  {pedidoExemplo.garantia}
                </p>
              </div>

              {/* Rodapé */}
              <div className="text-center text-xs text-muted-foreground font-inter border-t pt-4">
                <p>Este documento não possui valor fiscal</p>
                <p className="mt-1">
                  Emitido em {new Date().toLocaleString('pt-BR')} via LojixApp
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PedidoVisualizacao;

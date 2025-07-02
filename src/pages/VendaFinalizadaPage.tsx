
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Printer, 
  Share2, 
  ArrowLeft, 
  Receipt, 
  CreditCard,
  Calendar,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const VendaFinalizadaPage = () => {
  const venda = {
    numero: "VND-2024-001234",
    data: "02/12/2024",
    hora: "14:35",
    cliente: {
      nome: "João Silva Santos",
      telefone: "(11) 98765-4321",
      email: "joao.silva@email.com"
    },
    vendedor: "Maria Oliveira",
    items: [
      {
        produto: "iPhone 15 Pro Max 256GB",
        imei: "123456789012345",
        quantidade: 1,
        preco: 7299.00,
        total: 7299.00
      },
      {
        produto: "Capinha Premium iPhone 15 Pro Max",
        quantidade: 1,
        preco: 89.90,
        total: 89.90
      },
      {
        produto: "Película de Vidro Temperado",
        quantidade: 1,
        preco: 29.90,
        total: 29.90
      }
    ],
    pagamento: {
      subtotal: 7418.80,
      desconto: 118.80,
      total: 7300.00,
      metodo: "Cartão de Crédito",
      parcelas: "12x de R$ 608,33"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link to="/dashboard/pdv">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao PDV
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-cantarell font-bold text-sm">L</span>
              </div>
              <span className="font-cantarell font-bold text-lg text-foreground">LojixApp</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-cantarell text-3xl font-bold text-foreground mb-2">
            Venda Finalizada com Sucesso!
          </h1>
          <p className="font-inter text-lg text-muted-foreground">
            Sua venda foi processada e o comprovante está pronto
          </p>
        </div>

        {/* Sale Summary */}
        <Card className="mb-6">
          <CardHeader className="bg-primary/5">
            <CardTitle className="font-cantarell text-xl flex items-center justify-between">
              <span className="flex items-center">
                <Receipt className="h-5 w-5 text-primary mr-2" />
                Comprovante de Venda
              </span>
              <Badge variant="secondary" className="font-inter">
                {venda.numero}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Sale Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Data/Hora</p>
                  <p className="font-cantarell font-semibold">{venda.data} às {venda.hora}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Vendedor</p>
                  <p className="font-cantarell font-semibold">{venda.vendedor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-inter text-sm text-muted-foreground">Pagamento</p>
                  <p className="font-cantarell font-semibold">{venda.pagamento.metodo}</p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-secondary/30 p-4 rounded-lg mb-6">
              <h3 className="font-cantarell font-semibold mb-3">Dados do Cliente</h3>
              <div className="space-y-2">
                <p className="font-inter"><strong>Nome:</strong> {venda.cliente.nome}</p>
                <p className="font-inter"><strong>Telefone:</strong> {venda.cliente.telefone}</p>
                <p className="font-inter"><strong>Email:</strong> {venda.cliente.email}</p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4 mb-6">
              <h3 className="font-cantarell font-semibold">Itens Vendidos</h3>
              {venda.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start p-4 bg-secondary/20 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-inter font-medium">{item.produto}</h4>
                    {item.imei && (
                      <p className="font-inter text-sm text-muted-foreground">
                        IMEI: {item.imei}
                      </p>
                    )}
                    <p className="font-inter text-sm text-muted-foreground">
                      Qtd: {item.quantidade} x R$ {item.preco.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-cantarell font-semibold text-lg">
                      R$ {item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Payment Summary */}
            <div className="space-y-3">
              <div className="flex justify-between font-inter">
                <span>Subtotal:</span>
                <span>R$ {venda.pagamento.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-inter text-green-600">
                <span>Desconto:</span>
                <span>- R$ {venda.pagamento.desconto.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-cantarell text-xl font-bold text-primary">
                <span>Total:</span>
                <span>R$ {venda.pagamento.total.toFixed(2)}</span>
              </div>
              <div className="text-center font-inter text-sm text-muted-foreground mt-2">
                {venda.pagamento.parcelas}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-primary hover:bg-primary-hover font-inter" size="lg">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir Comprovante
          </Button>
          <Button variant="outline" className="font-inter" size="lg">
            <Share2 className="mr-2 h-4 w-4" />
            Compartilhar
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="/dashboard/pdv" className="font-inter">
              Nova Venda
            </Link>
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="font-inter text-sm text-muted-foreground">
            Obrigado pela sua compra! Para suporte, entre em contato conosco.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendaFinalizadaPage;

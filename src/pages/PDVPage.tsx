import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  DollarSign, 
  Calculator, 
  Receipt, 
  User, 
  ScanLine,
  Percent,
  CheckCircle,
  UserPlus,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { ClientRegistrationForm } from "@/components/ClientRegistrationForm";
import CaixaDialog from "@/components/CaixaDialog";
import PedidoVisualizacao from "@/components/PedidoVisualizacao";

interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
}

const PDVPage = () => {
  // Hook personalizado para carrinho
  const { cartItems, addToCart, updateQuantity, removeItem, clearCart, subtotal } = useCart();

  // Estados de busca e interface
  const [searchTerm, setSearchTerm] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  // Estados do cliente
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);

  // Estados de desconto e pagamento
  const [descontoGeral, setDescontoGeral] = useState(0);
  const [tipoDesconto, setTipoDesconto] = useState<"percentual" | "valor">("percentual");
  const [vendedor] = useState("João Silva");
  const [observacoes, setObservacoes] = useState("");

  // Estados de pagamento
  const [formaPagamento, setFormaPagamento] = useState("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  // Dados mock - produtos
  const produtos = [
    { id: 1, nome: "Samsung Galaxy S24", codigo: "SAMS24", preco: 4299.00, estoque: 15, categoria: "Smartphones", codigoBarras: "7891234567890" },
    { id: 2, nome: "AirPods Pro 2ª Gen", codigo: "AIRPODS2", preco: 2899.00, estoque: 8, categoria: "Acessórios", codigoBarras: "7891234567891" },
    { id: 3, nome: "Xiaomi Redmi Note 13", codigo: "XRED13", preco: 1899.00, estoque: 25, categoria: "Smartphones", codigoBarras: "7891234567892" },
    { id: 4, nome: "Carregador iPhone", codigo: "CHARGER", preco: 149.90, estoque: 50, categoria: "Acessórios", codigoBarras: "7891234567893" },
    { id: 5, nome: "Fone Bluetooth Sony", codigo: "SONY001", preco: 299.90, estoque: 12, categoria: "Acessórios", codigoBarras: "7891234567894" },
  ];

  // Dados mock - clientes existentes
  const clientesExistentes: Cliente[] = [
    { id: 1, nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com", cpf: "123.456.789-00" },
    { id: 2, nome: "Maria Santos", telefone: "(11) 88888-8888", email: "maria@email.com", cpf: "987.654.321-00" },
    { id: 3, nome: "Pedro Costa", telefone: "(11) 77777-7777", email: "pedro@email.com", cpf: "456.789.123-00" },
  ];

  // Busca de produtos com debounce
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const timer = setTimeout(() => {
        const filtered = produtos.filter(produto =>
          produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          produto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5); // Limitando a 5 resultados
        setSearchResults(filtered);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Cálculos da venda
  const descontoCalculado = tipoDesconto === "percentual" 
    ? (subtotal * descontoGeral / 100)
    : descontoGeral;
  const total = subtotal - descontoCalculado;

  const addByBarcode = () => {
    if (!codigoBarras.trim()) return;
    
    const produto = produtos.find(p => p.codigoBarras === codigoBarras);
    if (produto) {
      addToCart(produto);
      setCodigoBarras("");
    } else {
      alert("Produto não encontrado!");
    }
  };

  const finalizarVenda = () => {
    if (cartItems.length === 0) return;
    if (!formaPagamento) {
      setPaymentDialogOpen(true);
      return;
    }
    
    console.log("Finalizando venda:", {
      itens: cartItems,
      subtotal,
      desconto: descontoCalculado,
      total,
      cliente: selectedClient,
      vendedor,
      formaPagamento,
      observacoes
    });

    alert("Venda finalizada com sucesso!");
    clearCart();
    setDescontoGeral(0);
    setSelectedClient(null);
    setObservacoes("");
    setFormaPagamento("");
    setPaymentDialogOpen(false);
  };

  const handleClientSelect = (client: Cliente) => {
    setSelectedClient(client);
  };

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            PDV - Ponto de Venda
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Sistema otimizado para vendas - Operador: {vendedor}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CaixaDialog>
            <Button variant="outline" className="font-inter">
              <Calculator className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Gerenciar</span> Caixa
            </Button>
          </CaixaDialog>
          <Button variant="outline" className="font-inter">
            <Receipt className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Últimas</span> Vendas
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Busca e Adição de Produtos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Código de Barras */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <ScanLine className="h-5 w-5 mr-2 text-primary" />
                Código de Barras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite ou escaneie o código de barras..."
                  className="font-inter flex-1"
                  value={codigoBarras}
                  onChange={(e) => setCodigoBarras(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addByBarcode()}
                />
                <Button 
                  onClick={addByBarcode} 
                  className="font-inter bg-primary hover:bg-primary-hover"
                  disabled={!codigoBarras.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Busca de Produtos */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <Search className="h-5 w-5 mr-2 text-primary" />
                Buscar Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Digite o nome do produto ou código..."
                    className="pl-9 font-inter"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {/* Resultados da busca */}
                {searchResults.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {searchResults.map((produto) => (
                      <div
                        key={produto.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => {
                          addToCart(produto);
                          setSearchTerm("");
                          setSearchResults([]);
                        }}
                      >
                        <div className="flex-1">
                          <h4 className="font-inter font-medium">{produto.nome}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="font-inter text-xs">
                              {produto.categoria}
                            </Badge>
                            <span className="font-inter text-xs text-muted-foreground">
                              Cód: {produto.codigo}
                            </span>
                            <span className="font-inter text-xs text-muted-foreground">
                              Est: {produto.estoque}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-inter font-bold text-lg text-primary">
                            R$ {produto.preco.toFixed(2).replace('.', ',')}
                          </p>
                          <Button size="sm" className="mt-1 font-inter">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {searchTerm.length >= 2 && searchResults.length === 0 && (
                  <div className="text-center py-8">
                    <p className="font-inter text-muted-foreground">
                      Nenhum produto encontrado
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Carrinho e Finalização */}
        <div className="space-y-6">
          {/* Cliente Selecionado */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <User className="h-5 w-5 mr-2 text-primary" />
                Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedClient ? (
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="font-inter font-medium">{selectedClient.nome}</p>
                    <p className="font-inter text-sm text-muted-foreground">CPF: {selectedClient.cpf}</p>
                    {selectedClient.telefone && (
                      <p className="font-inter text-sm text-muted-foreground">Tel: {selectedClient.telefone}</p>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full font-inter"
                    onClick={() => setClientDialogOpen(true)}
                  >
                    Alterar Cliente
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <p className="font-inter text-muted-foreground text-sm">
                    Nenhum cliente selecionado
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full font-inter"
                    onClick={() => setClientDialogOpen(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Adicionar Cliente
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Carrinho de Compras */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
                Carrinho ({cartItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h5 className="font-inter font-medium text-sm truncate">{item.nome}</h5>
                      <p className="font-inter text-xs text-muted-foreground">
                        R$ {item.preco.toFixed(2).replace('.', ',')} cada
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-inter font-medium w-8 text-center text-sm">
                        {item.quantidade}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 ml-1"
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                    <div className="w-16 text-right">
                      <p className="font-inter font-bold text-sm">
                        R$ {item.total.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>
                ))}
                
                {cartItems.length === 0 && (
                  <div className="text-center py-8">
                    <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                    <p className="font-inter text-muted-foreground">
                      Carrinho vazio
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Desconto */}
          {cartItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell text-lg font-semibold flex items-center">
                  <Percent className="h-4 w-4 mr-2 text-primary" />
                  Desconto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={tipoDesconto === "percentual" ? "default" : "outline"}
                    onClick={() => setTipoDesconto("percentual")}
                    className="font-inter"
                  >
                    %
                  </Button>
                  <Button
                    size="sm"
                    variant={tipoDesconto === "valor" ? "default" : "outline"}
                    onClick={() => setTipoDesconto("valor")}
                    className="font-inter"
                  >
                    R$
                  </Button>
                </div>
                <Input
                  type="number"
                  placeholder={tipoDesconto === "percentual" ? "0" : "0,00"}
                  value={descontoGeral}
                  onChange={(e) => setDescontoGeral(Number(e.target.value))}
                  className="font-inter"
                />
              </CardContent>
            </Card>
          )}

          {/* Resumo e Finalização */}
          {cartItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-primary" />
                  Resumo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between font-inter">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {descontoCalculado > 0 && (
                    <div className="flex justify-between font-inter">
                      <span>Desconto:</span>
                      <span className="text-green-600">-R$ {descontoCalculado.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-inter font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <PedidoVisualizacao>
                    <Button 
                      variant="outline"
                      className="w-full font-inter"
                    >
                      Visualizar Pedido
                    </Button>
                  </PedidoVisualizacao>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary-hover font-inter"
                    onClick={() => setPaymentDialogOpen(true)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Finalizar Venda
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modal de Cliente */}
      <ClientRegistrationForm
        isOpen={clientDialogOpen}
        onClose={() => setClientDialogOpen(false)}
        onClientSelect={handleClientSelect}
        existingClients={clientesExistentes}
      />

      {/* Dialog de Pagamento */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-cantarell">Forma de Pagamento</DialogTitle>
            <DialogDescription className="font-inter">
              Selecione a forma de pagamento para finalizar a venda.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={formaPagamento === "dinheiro" ? "default" : "outline"}
                onClick={() => setFormaPagamento("dinheiro")}
                className="font-inter"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Dinheiro
              </Button>
              <Button
                variant={formaPagamento === "cartao" ? "default" : "outline"}
                onClick={() => setFormaPagamento("cartao")}
                className="font-inter"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Cartão
              </Button>
              <Button
                variant={formaPagamento === "pix" ? "default" : "outline"}
                onClick={() => setFormaPagamento("pix")}
                className="font-inter col-span-2"
              >
                PIX
              </Button>
            </div>
            
            <div>
              <Label htmlFor="observacoes" className="font-inter">Observações (opcional)</Label>
              <Input
                id="observacoes"
                placeholder="Adicione observações sobre a venda..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="font-inter"
              />
            </div>

            <div className="bg-muted p-3 rounded">
              <div className="flex justify-between font-inter font-bold">
                <span>Total a pagar:</span>
                <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDialogOpen(false)} className="font-inter">
              Cancelar
            </Button>
            <Button 
              onClick={finalizarVenda}
              disabled={!formaPagamento}
              className="font-inter bg-primary hover:bg-primary-hover"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmar Venda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PDVPage;

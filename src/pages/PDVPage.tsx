
import { useState } from "react";
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
  CashRegister, 
  Eye,
  ScanLine,
  Percent,
  X,
  CheckCircle,
  AlertTriangle,
  Clock,
  UserCheck
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CaixaDialog from "@/components/CaixaDialog";
import PedidoVisualizacao from "@/components/PedidoVisualizacao";

const PDVPage = () => {
  // Estados do carrinho e venda
  const [cartItems, setCartItems] = useState([
    { id: 1, nome: "iPhone 15 Pro", codigo: "IPH15PRO", preco: 6999.00, quantidade: 1, desconto: 0, total: 6999.00 },
    { id: 2, nome: "Capinha Transparente", codigo: "CAP001", preco: 29.90, quantidade: 2, desconto: 0, total: 59.80 },
  ]);

  // Estados de busca e interface
  const [searchTerm, setSearchTerm] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  
  // Estados do cliente
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);

  // Estados de desconto e pagamento
  const [descontoGeral, setDescontoGeral] = useState(0);
  const [tipoDesconto, setTipoDesconto] = useState("percentual"); // "percentual" ou "valor"
  const [vendedor, setVendedor] = useState("João Silva");
  const [observacoes, setObservacoes] = useState("");

  // Estados de pagamento
  const [formaPagamento, setFormaPagamento] = useState("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  
  // Estados de operações
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [itemToCancel, setItemToCancel] = useState(null);

  // Dados mock
  const produtos = [
    { id: 1, nome: "Samsung Galaxy S24", codigo: "SAMS24", preco: 4299.00, estoque: 15, categoria: "Smartphones", codigoBarras: "7891234567890" },
    { id: 2, nome: "AirPods Pro 2ª Gen", codigo: "AIRPODS2", preco: 2899.00, estoque: 8, categoria: "Acessórios", codigoBarras: "7891234567891" },
    { id: 3, nome: "Xiaomi Redmi Note 13", codigo: "XRED13", preco: 1899.00, estoque: 25, categoria: "Smartphones", codigoBarras: "7891234567892" },
    { id: 4, nome: "Carregador iPhone", codigo: "CHARGER", preco: 149.90, estoque: 50, categoria: "Acessórios", codigoBarras: "7891234567893" },
    { id: 5, nome: "Fone Bluetooth Sony", codigo: "SONY001", preco: 299.90, estoque: 12, categoria: "Acessórios", codigoBarras: "7891234567894" },
  ];

  const clientes = [
    { id: 1, nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com", cpf: "123.456.789-00" },
    { id: 2, nome: "Maria Santos", telefone: "(11) 88888-8888", email: "maria@email.com", cpf: "987.654.321-00" },
    { id: 3, nome: "Pedro Costa", telefone: "(11) 77777-7777", email: "pedro@email.com", cpf: "456.789.123-00" },
  ];

  // Cálculos da venda
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const descontoCalculado = tipoDesconto === "percentual" 
    ? (subtotal * descontoGeral / 100)
    : descontoGeral;
  const total = subtotal - descontoCalculado;

  // Funções do carrinho
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id 
          ? { ...item, quantidade: newQuantity, total: (item.preco * newQuantity) - item.desconto }
          : item
      ));
    }
  };

  const addToCart = (produto) => {
    const existingItem = cartItems.find(item => item.id === produto.id);
    if (existingItem) {
      updateQuantity(produto.id, existingItem.quantidade + 1);
    } else {
      setCartItems([...cartItems, {
        id: produto.id,
        nome: produto.nome,
        codigo: produto.codigo,
        preco: produto.preco,
        quantidade: 1,
        desconto: 0,
        total: produto.preco
      }]);
    }
  };

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

  const applyItemDiscount = (itemId, desconto) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId 
        ? { ...item, desconto, total: (item.preco * item.quantidade) - desconto }
        : item
    ));
  };

  const cancelItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    setCancelDialogOpen(false);
    setItemToCancel(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setDescontoGeral(0);
    setSelectedClient(null);
    setObservacoes("");
    setFormaPagamento("");
  };

  const finalizarVenda = () => {
    if (cartItems.length === 0) return;
    if (!formaPagamento) {
      setPaymentDialogOpen(true);
      return;
    }
    
    // Aqui seria a integração com o backend
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
    setPaymentDialogOpen(false);
  };

  const filteredProducts = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            PDV - Ponto de Venda
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Sistema completo para vendas no balcão - Operador: {vendedor}
          </p>
        </div>
        <div className="flex gap-2">
          <CaixaDialog>
            <Button variant="outline" className="font-inter">
              <CashRegister className="mr-2 h-4 w-4" />
              Gerenciar Caixa
            </Button>
          </CaixaDialog>
          <Button variant="outline" className="font-inter">
            <Receipt className="mr-2 h-4 w-4" />
            Últimas Vendas
          </Button>
          <Button variant="outline" className="font-inter">
            <UserCheck className="mr-2 h-4 w-4" />
            Trocar Operador
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Products Search and Quick Access */}
        <div className="lg:col-span-2 space-y-6">
          {/* Busca por Código de Barras */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <ScanLine className="h-5 w-5 mr-2" />
                Código de Barras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite ou escaneie o código de barras..."
                  className="font-inter"
                  value={codigoBarras}
                  onChange={(e) => setCodigoBarras(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addByBarcode()}
                />
                <Button onClick={addByBarcode} className="font-inter">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Products */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold">
                Buscar Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite o nome do produto ou código interno..."
                  className="pl-9 font-inter"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {filteredProducts.map((produto) => (
                  <div
                    key={produto.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => addToCart(produto)}
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
                          Estoque: {produto.estoque}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-inter font-bold text-lg">
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </p>
                      <Button size="sm" className="mt-1 font-inter">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Access Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold">
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="font-inter">Smartphones</Button>
                <Button variant="outline" className="font-inter">Acessórios</Button>
                <Button variant="outline" className="font-inter" onClick={() => setCancelDialogOpen(true)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar Venda
                </Button>
                <Button variant="outline" className="font-inter">
                  <Receipt className="mr-2 h-4 w-4" />
                  Devoluções
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Cart and Checkout */}
        <div className="space-y-6">
          {/* Shopping Cart */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Carrinho ({cartItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1">
                      <h5 className="font-inter font-medium text-sm">{item.nome}</h5>
                      <p className="font-inter text-xs text-muted-foreground">
                        Cód: {item.codigo} | R$ {item.preco.toFixed(2).replace('.', ',')} cada
                      </p>
                      {item.desconto > 0 && (
                        <p className="font-inter text-xs text-green-600">
                          Desconto: R$ {item.desconto.toFixed(2).replace('.', ',')}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantidade - 1)}
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
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setItemToCancel(item.id);
                          setCancelDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                    <div className="w-20 text-right">
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

          {/* Discount Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <Percent className="h-5 w-5 mr-2" />
                Desconto Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                {descontoCalculado > 0 && (
                  <p className="font-inter text-sm text-green-600">
                    Desconto aplicado: R$ {descontoCalculado.toFixed(2).replace('.', ',')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Resumo do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between font-inter">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between font-inter">
                  <span>Desconto:</span>
                  <span className="text-green-600">-R$ {descontoCalculado.toFixed(2).replace('.', ',')}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-inter font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <PedidoVisualizacao>
                  <Button 
                    variant="outline"
                    className="w-full font-inter"
                    disabled={cartItems.length === 0}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar Pedido
                  </Button>
                </PedidoVisualizacao>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary-hover font-inter"
                  disabled={cartItems.length === 0}
                  onClick={() => setPaymentDialogOpen(true)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Finalizar Venda
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Selected Client */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <User className="h-5 w-5 mr-2" />
                Cliente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedClient ? (
                <div className="space-y-2">
                  <p className="font-inter font-medium">{selectedClient.nome}</p>
                  <p className="font-inter text-sm text-muted-foreground">{selectedClient.telefone}</p>
                  <p className="font-inter text-sm text-muted-foreground">CPF: {selectedClient.cpf}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="font-inter"
                    onClick={() => setClientDialogOpen(true)}
                  >
                    Alterar Cliente
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-inter text-muted-foreground text-sm mb-2">
                    Nenhum cliente selecionado
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="font-inter"
                    onClick={() => setClientDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Selecionar Cliente
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialog para seleção de cliente */}
      <Dialog open={clientDialogOpen} onOpenChange={setClientDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-cantarell">Selecionar Cliente</DialogTitle>
            <DialogDescription className="font-inter">
              Escolha um cliente da lista ou deixe em branco para venda sem cliente.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            <Button 
              variant="outline" 
              className="w-full justify-start font-inter"
              onClick={() => {
                setSelectedClient(null);
                setClientDialogOpen(false);
              }}
            >
              Sem cliente (Venda balcão)
            </Button>
            {clientes.map((cliente) => (
              <Button
                key={cliente.id}
                variant="outline"
                className="w-full justify-start font-inter"
                onClick={() => {
                  setSelectedClient(cliente);
                  setClientDialogOpen(false);
                }}
              >
                <div className="text-left">
                  <div className="font-medium">{cliente.nome}</div>
                  <div className="text-sm text-muted-foreground">{cliente.telefone}</div>
                </div>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para pagamento */}
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
              className="font-inter"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmar Venda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para cancelamento */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-cantarell flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Confirmar Cancelamento
            </DialogTitle>
            <DialogDescription className="font-inter">
              {itemToCancel 
                ? "Tem certeza que deseja remover este item do carrinho?"
                : "Tem certeza que deseja cancelar toda a venda? Todos os itens serão removidos."
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)} className="font-inter">
              Não, manter
            </Button>
            <Button 
              variant="destructive"
              onClick={() => itemToCancel ? cancelItem(itemToCancel) : clearCart()}
              className="font-inter"
            >
              Sim, cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PDVPage;

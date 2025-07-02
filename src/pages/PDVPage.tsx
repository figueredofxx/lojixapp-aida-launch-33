import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Search, Plus, Minus, Trash2, CreditCard, DollarSign, Calculator, Receipt, User, CashRegister, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CaixaDialog from "@/components/CaixaDialog";
import PedidoVisualizacao from "@/components/PedidoVisualizacao";

const PDVPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, nome: "iPhone 15 Pro", preco: 6999.00, quantidade: 1, total: 6999.00 },
    { id: 2, nome: "Capinha Transparente", preco: 29.90, quantidade: 2, total: 59.80 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  const produtos = [
    { id: 1, nome: "Samsung Galaxy S24", preco: 4299.00, estoque: 15, categoria: "Smartphones" },
    { id: 2, nome: "AirPods Pro 2ª Gen", preco: 2899.00, estoque: 8, categoria: "Acessórios" },
    { id: 3, nome: "Xiaomi Redmi Note 13", preco: 1899.00, estoque: 25, categoria: "Smartphones" },
    { id: 4, nome: "Carregador iPhone", preco: 149.90, estoque: 50, categoria: "Acessórios" },
  ];

  const clientes = [
    { id: 1, nome: "João Silva", telefone: "(11) 99999-9999", email: "joao@email.com" },
    { id: 2, nome: "Maria Santos", telefone: "(11) 88888-8888", email: "maria@email.com" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const desconto = 0;
  const total = subtotal - desconto;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id 
          ? { ...item, quantidade: newQuantity, total: item.preco * newQuantity }
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
        preco: produto.preco,
        quantidade: 1,
        total: produto.preco
      }]);
    }
  };

  const filteredProducts = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
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
            Sistema completo para vendas no balcão
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
          <Button className="bg-primary hover:bg-primary-hover font-inter">
            <User className="mr-2 h-4 w-4" />
            Cliente
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Products and Search */}
        <div className="lg:col-span-2 space-y-6">
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
                  placeholder="Digite o nome do produto, código ou código de barras..."
                  className="pl-9 font-inter"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid gap-3">
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
                Categorias Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-4">
                <Button variant="outline" className="font-inter">Smartphones</Button>
                <Button variant="outline" className="font-inter">Acessórios</Button>
                <Button variant="outline" className="font-inter">Laptops</Button>
                <Button variant="outline" className="font-inter">Tablets</Button>
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
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1">
                      <h5 className="font-inter font-medium text-sm">{item.nome}</h5>
                      <p className="font-inter text-xs text-muted-foreground">
                        R$ {item.preco.toFixed(2).replace('.', ',')} cada
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-inter font-medium w-8 text-center">
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
                        onClick={() => updateQuantity(item.id, 0)}
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
                  <span>R$ {desconto.toFixed(2).replace('.', ',')}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-inter font-bold text-lg">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
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
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Finalizar Venda
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="font-inter">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Dinheiro
                  </Button>
                  <Button variant="outline" className="font-inter">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Cartão
                  </Button>
                </div>
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
                  <Button variant="outline" size="sm" className="font-inter">
                    Alterar Cliente
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-inter text-muted-foreground text-sm mb-2">
                    Nenhum cliente selecionado
                  </p>
                  <Button variant="outline" size="sm" className="font-inter">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Cliente
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PDVPage;

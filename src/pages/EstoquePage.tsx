
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Package, BarChart3, AlertTriangle, TrendingUp, Search, Filter, Eye, Boxes, Tag } from "lucide-react";
import { ProductRegistrationForm } from "@/components/ProductRegistrationForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EstoquePage = () => {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const lowStockProducts = [
    { nome: "iPhone 15 Pro Max", categoria: "Smartphones", estoque: 3, minimo: 10, valor: "R$ 8.999,00" },
    { nome: "AirPods Pro 2ª Gen", categoria: "Acessórios", estoque: 1, minimo: 5, valor: "R$ 2.899,00" },
    { nome: "MacBook Air M2", categoria: "Laptops", estoque: 2, minimo: 3, valor: "R$ 12.999,00" },
  ];

  const topProducts = [
    { nome: "Samsung Galaxy A54", categoria: "Smartphones", vendas: 45, receita: "R$ 13.455,00" },
    { nome: "Xiaomi Redmi Note 13", categoria: "Smartphones", vendas: 38, receita: "R$ 7.182,00" },
    { nome: "Capinha Transparente", categoria: "Acessórios", vendas: 92, receita: "R$ 2.760,00" },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Estoque
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Controle completo do seu inventário e produtos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-inter">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button 
            onClick={() => setShowRegistrationForm(true)}
            className="bg-primary hover:bg-primary-hover font-inter"
          >
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar Produto
          </Button>
        </div>
      </div>

      {/* Stats Cards - sem cores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Total de Produtos
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">1,847</div>
            <div className="flex items-center text-xs text-green-600 font-inter mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +47 novos este mês
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Produtos em Falta
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-red-600">8</div>
            <p className="font-inter text-xs text-muted-foreground mt-1">
              Necessita reposição urgente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Valor do Estoque
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">R$ 127.890,00</div>
            <p className="font-inter text-xs text-muted-foreground mt-1">
              Total investido
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Categorias Ativas
            </CardTitle>
            <Tag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">12</div>
            <p className="font-inter text-xs text-muted-foreground mt-1">
              Diferentes categorias
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Estoque Baixo
              </CardTitle>
              <Button variant="outline" size="sm" className="font-inter">
                <Eye className="mr-2 h-4 w-4" />
                Ver Todos
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-inter font-medium">{product.nome}</h4>
                    <p className="font-inter text-sm text-muted-foreground">{product.categoria}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-inter text-sm font-semibold text-red-600">
                      {product.estoque} / {product.minimo}
                    </p>
                    <p className="font-inter text-xs text-muted-foreground">{product.valor}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                Mais Vendidos
              </CardTitle>
              <Button variant="outline" size="sm" className="font-inter">
                <Eye className="mr-2 h-4 w-4" />
                Ver Relatório
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                  <div className="flex-1">
                    <h4 className="font-inter font-medium">{product.nome}</h4>
                    <p className="font-inter text-sm text-muted-foreground">{product.categoria}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-inter text-sm font-semibold text-green-600">
                      {product.vendas} vendas
                    </p>
                    <p className="font-inter text-xs text-muted-foreground">{product.receita}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Products */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="font-cantarell text-xl font-semibold">
              Buscar Produtos
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, categoria, IMEI..."
                  className="pl-9 font-inter"
                />
              </div>
              <Button variant="outline" size="sm" className="font-inter">
                <Eye className="mr-2 h-4 w-4" />
                Listar Todos
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="font-inter text-muted-foreground text-lg mb-2">
              Digite algo na busca para encontrar produtos
            </p>
            <p className="font-inter text-sm text-muted-foreground">
              Você pode buscar por nome, categoria, código ou IMEI
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowRegistrationForm(true)}>
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Novo Produto</h3>
              <p className="font-inter text-sm text-muted-foreground">Cadastrar item</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Boxes className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Entrada</h3>
              <p className="font-inter text-sm text-muted-foreground">Registrar compra</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Relatórios</h3>
              <p className="font-inter text-sm text-muted-foreground">Análise completa</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Categorias</h3>
              <p className="font-inter text-sm text-muted-foreground">Organizar produtos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {showRegistrationForm && (
        <ProductRegistrationForm 
          onClose={() => setShowRegistrationForm(false)}
          onSave={(product) => {
            console.log('Produto cadastrado:', product);
            setShowRegistrationForm(false);
          }}
        />
      )}
    </div>
  );
};

export default EstoquePage;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Tag,
  Smartphone,
  Settings
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductRegistrationForm } from "@/components/ProductRegistrationForm";

const ProdutosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCadastroForm, setShowCadastroForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const produtos = [
    {
      id: 1,
      nome: "iPhone 15 Pro Max 256GB",
      categoria: "Smartphones",
      marca: "Apple",
      garantia: "12 meses",
      tipoControle: "IMEI",
      precoVenda: 7299.00,
      estado: "Novo",
      descricao: "Smartphone Apple iPhone 15 Pro Max com 256GB de armazenamento"
    },
    {
      id: 2,
      nome: "Samsung Galaxy S24 Ultra",
      categoria: "Smartphones", 
      marca: "Samsung",
      garantia: "12 meses",
      tipoControle: "IMEI",
      precoVenda: 6899.00,
      estado: "Novo",
      descricao: "Smartphone Samsung Galaxy S24 Ultra"
    },
    {
      id: 3,
      nome: "Capinha Premium iPhone 15",
      categoria: "Acessórios",
      marca: "OtterBox",
      garantia: "6 meses",
      tipoControle: "Quantidade",
      precoVenda: 89.90,
      estado: "Novo",
      descricao: "Capinha resistente para iPhone 15"
    }
  ];

  const categorias = ["Todas", "Smartphones", "Acessórios", "Eletrônicos"];
  const marcas = ["Apple", "Samsung", "Xiaomi", "OtterBox"];

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.marca.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "Todas" || produto.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Produtos
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Cadastre e gerencie os produtos da sua loja
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-inter">
            <Tag className="mr-2 h-4 w-4" />
            Categorias
          </Button>
          <Button variant="outline" className="font-inter">
            <Settings className="mr-2 h-4 w-4" />
            Marcas
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

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Total de Produtos
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {produtos.length}
            </div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              Produtos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Smartphones
            </CardTitle>
            <Smartphone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {produtos.filter(p => p.categoria === 'Smartphones').length}
            </div>
            <p className="text-xs text-blue-600 font-inter mt-1">
              Categoria principal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Controle por IMEI
            </CardTitle>
            <Tag className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {produtos.filter(p => p.tipoControle === 'IMEI').length}
            </div>
            <p className="text-xs text-green-600 font-inter mt-1">
              Rastreamento único
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Valor Médio
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-purple-500"></div>
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              R$ {(produtos.reduce((acc, p) => acc + p.precoVenda, 0) / produtos.length).toFixed(0)}
            </div>
            <p className="text-xs text-purple-600 font-inter mt-1">
              Preço médio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-inter"
              />
            </div>
            
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as marcas" />
                </SelectTrigger>
                <SelectContent>
                  {marcas.map(marca => (
                    <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button variant="outline" className="w-full font-inter">
                <Filter className="mr-2 h-4 w-4" />
                Mais Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Produtos Cadastrados ({filteredProdutos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Nome do Produto</TableHead>
                <TableHead className="font-inter">Categoria/Marca</TableHead>
                <TableHead className="font-inter">Tipo de Controle</TableHead>
                <TableHead className="font-inter">Garantia</TableHead>
                <TableHead className="font-inter">Preço de Venda</TableHead>
                <TableHead className="font-inter">Estado</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProdutos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>
                    <div>
                      <div className="font-inter font-medium">{produto.nome}</div>
                      <div className="font-inter text-sm text-muted-foreground truncate max-w-xs">
                        {produto.descricao}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant="secondary" className="font-inter mb-1">
                        {produto.categoria}
                      </Badge>
                      <div className="font-inter text-sm text-muted-foreground">
                        {produto.marca}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`font-inter ${produto.tipoControle === 'IMEI' ? 'border-green-500 text-green-700' : 'border-blue-500 text-blue-700'}`}
                    >
                      {produto.tipoControle}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-inter">
                    {produto.garantia}
                  </TableCell>
                  <TableCell className="font-inter font-semibold">
                    R$ {produto.precoVenda.toFixed(2).replace('.', ',')}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`font-inter ${produto.estado === 'Novo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {produto.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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

export default ProdutosPage;

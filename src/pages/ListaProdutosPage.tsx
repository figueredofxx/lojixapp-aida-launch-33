import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Package, 
  Smartphone,
  ArrowRightLeft,
  Eye,
  Edit,
  AlertTriangle
} from "lucide-react";

const ListaProdutosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStore, setSelectedStore] = useState("");

  const produtos = [
    {
      id: 1,
      nome: "iPhone 15 Pro Max 256GB",
      codigo: "IP15PM256",
      categoria: "Smartphone",
      marca: "Apple",
      imei: "123456789012345",
      preco: 7299.00,
      custo: 6200.00,
      estoque: 5,
      estoqueMinimo: 2,
      loja: "Loja Centro",
      status: "Disponível"
    },
    {
      id: 2,
      nome: "Samsung Galaxy S24 Ultra 512GB",
      codigo: "SGS24U512",
      categoria: "Smartphone", 
      marca: "Samsung",
      imei: "987654321098765",
      preco: 6899.00,
      custo: 5800.00,
      estoque: 1,
      estoqueMinimo: 3,
      loja: "Loja Shopping",
      status: "Estoque Baixo"
    },
    {
      id: 3,
      nome: "Capinha Premium iPhone 15 Pro Max",
      codigo: "CAP15PM",
      categoria: "Acessório",
      marca: "OtterBox",
      preco: 89.90,
      custo: 45.00,
      estoque: 25,
      estoqueMinimo: 10,
      loja: "Loja Centro",
      status: "Disponível"
    },
    {
      id: 4,
      nome: "Carregador Wireless 15W",
      codigo: "CW15W",
      categoria: "Acessório",
      marca: "Anker",
      preco: 159.90,
      custo: 85.00,
      estoque: 0,
      estoqueMinimo: 5,
      loja: "Loja Shopping",
      status: "Em Falta"
    },
    {
      id: 5,
      nome: "Xiaomi Redmi Note 13 Pro 256GB",
      codigo: "XRN13P256",
      categoria: "Smartphone",
      marca: "Xiaomi",
      imei: "456789123456789",
      preco: 1899.00,
      custo: 1550.00,
      estoque: 8,
      estoqueMinimo: 3,
      loja: "Loja Centro",
      status: "Disponível"
    }
  ];

  const lojas = ["Todas as Lojas", "Loja Centro", "Loja Shopping"];
  const categorias = ["Todas", "Smartphone", "Acessório"];

  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (produto.imei && produto.imei.includes(searchTerm));
    
    const matchesCategory = !selectedCategory || selectedCategory === "Todas" || produto.categoria === selectedCategory;
    const matchesStore = !selectedStore || selectedStore === "Todas as Lojas" || produto.loja === selectedStore;
    
    return matchesSearch && matchesCategory && matchesStore;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponível": return "bg-green-100 text-green-800";
      case "Estoque Baixo": return "bg-yellow-100 text-yellow-800";
      case "Em Falta": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Lista de Produtos
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Consulte e gerencie todos os produtos do seu estoque
          </p>
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
            <div className="font-cantarell text-2xl font-bold text-foreground">{produtos.length}</div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              Em todas as lojas
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
              {produtos.filter(p => p.categoria === 'Smartphone').length}
            </div>
            <p className="text-xs text-blue-600 font-inter mt-1">
              Categoria principal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Estoque Baixo
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {produtos.filter(p => p.estoque <= p.estoqueMinimo).length}
            </div>
            <p className="text-xs text-yellow-600 font-inter mt-1">
              Produtos para repor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Valor Total Estoque
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              R$ {produtos.reduce((acc, p) => acc + (p.preco * p.estoque), 0).toLocaleString()}
            </div>
            <p className="text-xs text-green-600 font-inter mt-1">
              Valor de venda
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="search" className="font-inter text-sm font-medium">
                Buscar Produtos
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome, código, marca ou IMEI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-inter"
                />
              </div>
            </div>
            
            <div>
              <Label className="font-inter text-sm font-medium">Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="mt-1">
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
              <Label className="font-inter text-sm font-medium">Loja</Label>
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Todas as lojas" />
                </SelectTrigger>
                <SelectContent>
                  {lojas.map(loja => (
                    <SelectItem key={loja} value={loja}>{loja}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="font-inter">
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
          <div className="flex items-center justify-between">
            <CardTitle className="font-cantarell text-xl font-semibold">
              Produtos ({filteredProdutos.length})
            </CardTitle>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Ordenar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Produto</TableHead>
                <TableHead className="font-inter">Categoria</TableHead>
                <TableHead className="font-inter">IMEI/Serial</TableHead>
                <TableHead className="font-inter">Preço</TableHead>
                <TableHead className="font-inter">Estoque</TableHead>
                <TableHead className="font-inter">Loja</TableHead>
                <TableHead className="font-inter">Status</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProdutos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>
                    <div>
                      <div className="font-inter font-medium">{produto.nome}</div>
                      <div className="font-inter text-sm text-muted-foreground">
                        {produto.codigo} • {produto.marca}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-inter">
                      {produto.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-inter text-sm font-mono">
                    {produto.imei || "N/A"}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-inter font-semibold">
                        R$ {produto.preco.toFixed(2)}
                      </div>
                      <div className="font-inter text-xs text-muted-foreground">
                        Custo: R$ {produto.custo.toFixed(2)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-inter font-semibold">
                        {produto.estoque} un.
                      </div>
                      <div className="font-inter text-xs text-muted-foreground">
                        Mín: {produto.estoqueMinimo}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-inter text-sm">
                    {produto.loja}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`font-inter ${getStatusColor(produto.status)}`}>
                      {produto.status}
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
                        <ArrowRightLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListaProdutosPage;

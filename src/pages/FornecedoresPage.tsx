
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Edit, 
  Trash2,
  Building2,
  Filter,
  Download
} from "lucide-react";

const FornecedoresPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const fornecedores = [
    {
      id: 1,
      nome: "Tech Distribuidora Ltda",
      cnpj: "12.345.678/0001-90",
      telefone: "(11) 98765-4321",
      email: "contato@techdist.com.br",
      endereco: "São Paulo, SP",
      categoria: "Eletrônicos",
      status: "Ativo",
      ultimaCompra: "28/11/2024",
      totalCompras: "R$ 145.350,00"
    },
    {
      id: 2,
      nome: "Mobile Parts Brasil",
      cnpj: "98.765.432/0001-10",
      telefone: "(21) 91234-5678",
      email: "vendas@mobileparts.com.br",
      endereco: "Rio de Janeiro, RJ",
      categoria: "Peças e Acessórios",
      status: "Ativo",
      ultimaCompra: "25/11/2024",
      totalCompras: "R$ 89.200,00"
    },
    {
      id: 3,
      nome: "GlobalTech Importação",
      cnpj: "55.444.333/0001-22",
      telefone: "(11) 95555-1111",
      email: "importacao@globaltech.com",
      endereco: "São Paulo, SP",
      categoria: "Importação",
      status: "Inativo",
      ultimaCompra: "15/10/2024",
      totalCompras: "R$ 230.800,00"
    },
    {
      id: 4,
      nome: "SmartPhone Supply Co.",
      cnpj: "77.888.999/0001-33",
      telefone: "(85) 94444-7777",
      email: "suprimentos@smartsupply.com.br",
      endereco: "Fortaleza, CE",
      categoria: "Smartphones",
      status: "Ativo",
      ultimaCompra: "30/11/2024",
      totalCompras: "R$ 312.450,00"
    }
  ];

  const filteredFornecedores = fornecedores.filter(fornecedor =>
    fornecedor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fornecedor.cnpj.includes(searchTerm) ||
    fornecedor.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Fornecedores
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Gerencie seus fornecedores e mantenha suas informações atualizadas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-inter">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="font-inter">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button className="bg-primary hover:bg-primary-hover font-inter">
            <Plus className="mr-2 h-4 w-4" />
            Novo Fornecedor
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Total de Fornecedores
            </CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">{fornecedores.length}</div>
            <p className="text-xs text-green-600 font-inter mt-1">
              +2 este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Fornecedores Ativos
            </CardTitle>
            <Badge variant="secondary" className="font-inter text-xs">Ativo</Badge>
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {fornecedores.filter(f => f.status === 'Ativo').length}
            </div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              {Math.round((fornecedores.filter(f => f.status === 'Ativo').length / fornecedores.length) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Compras este Mês
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">R$ 777.800</div>
            <p className="text-xs text-green-600 font-inter mt-1">
              +15% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Média por Fornecedor
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">R$ 194.450</div>
            <p className="text-xs text-blue-600 font-inter mt-1">
              Valor médio de compras
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="font-inter text-sm font-medium">
                Buscar Fornecedores
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nome, CNPJ ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 font-inter"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Lista de Fornecedores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Fornecedor</TableHead>
                <TableHead className="font-inter">Contato</TableHead>
                <TableHead className="font-inter">Categoria</TableHead>
                <TableHead className="font-inter">Status</TableHead>
                <TableHead className="font-inter">Última Compra</TableHead>
                <TableHead className="font-inter">Total Compras</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFornecedores.map((fornecedor) => (
                <TableRow key={fornecedor.id}>
                  <TableCell>
                    <div>
                      <div className="font-inter font-medium">{fornecedor.nome}</div>
                      <div className="font-inter text-sm text-muted-foreground">
                        CNPJ: {fornecedor.cnpj}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-inter text-sm">
                        <Phone className="h-3 w-3" />
                        {fornecedor.telefone}
                      </div>
                      <div className="flex items-center gap-2 font-inter text-sm">
                        <Mail className="h-3 w-3" />
                        {fornecedor.email}
                      </div>
                      <div className="flex items-center gap-2 font-inter text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {fornecedor.endereco}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-inter">
                      {fornecedor.categoria}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={fornecedor.status === 'Ativo' ? 'default' : 'secondary'} 
                      className="font-inter"
                    >
                      {fornecedor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-inter text-sm">
                    {fornecedor.ultimaCompra}
                  </TableCell>
                  <TableCell className="font-inter font-semibold">
                    {fornecedor.totalCompras}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
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
    </div>
  );
};

export default FornecedoresPage;

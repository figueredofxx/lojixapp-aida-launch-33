
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, Edit, Trash2, Users, UserPlus, Phone, Mail, MapPin, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ClientesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const clientes = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@email.com",
      telefone: "(11) 99999-9999",
      endereco: "Rua das Flores, 123 - São Paulo/SP",
      totalCompras: "R$ 15.480,00",
      ultimaCompra: "15/12/2024",
      status: "Ativo",
      categoria: "VIP"
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@email.com",
      telefone: "(11) 88888-8888",
      endereco: "Av. Paulista, 456 - São Paulo/SP",
      totalCompras: "R$ 8.920,00",
      ultimaCompra: "12/12/2024",
      status: "Ativo",
      categoria: "Regular"
    },
    {
      id: 3,
      nome: "Pedro Costa",
      email: "pedro.costa@email.com",
      telefone: "(11) 77777-7777",
      endereco: "Rua Augusta, 789 - São Paulo/SP",
      totalCompras: "R$ 3.250,00",
      ultimaCompra: "10/12/2024",
      status: "Ativo",
      categoria: "Regular"
    },
    {
      id: 4,
      nome: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      telefone: "(11) 66666-6666",
      endereco: "Rua Oscar Freire, 321 - São Paulo/SP",
      totalCompras: "R$ 22.150,00",
      ultimaCompra: "08/12/2024",
      status: "Inativo",
      categoria: "VIP"
    },
  ];

  const filteredClients = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefone.includes(searchTerm)
  );

  const totalClientes = clientes.length;
  const clientesAtivos = clientes.filter(c => c.status === "Ativo").length;
  const clientesVIP = clientes.filter(c => c.categoria === "VIP").length;
  const totalFaturamento = clientes.reduce((sum, cliente) => {
    const valor = parseFloat(cliente.totalCompras.replace('R$ ', '').replace('.', '').replace(',', '.'));
    return sum + valor;
  }, 0);

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Clientes
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Gerencie todos os seus clientes e relacionamentos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-inter">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button className="bg-primary hover:bg-primary-hover font-inter">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Total de Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">{totalClientes}</div>
            <p className="text-xs text-green-600 font-inter mt-1">
              +12 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </CardTitle>
            <UserPlus className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">{clientesAtivos}</div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              {Math.round((clientesAtivos / totalClientes) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Clientes VIP
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">{clientesVIP}</div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              Alto valor de compra
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Faturamento Total
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              R$ {totalFaturamento.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-green-600 font-inter mt-1">
              +8% este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="font-cantarell text-xl font-semibold">
              Lista de Clientes
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou telefone..."
                  className="pl-9 font-inter"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="font-inter">
                <Eye className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Cliente</TableHead>
                <TableHead className="font-inter">Contato</TableHead>
                <TableHead className="font-inter">Total de Compras</TableHead>
                <TableHead className="font-inter">Última Compra</TableHead>
                <TableHead className="font-inter">Status</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>
                    <div>
                      <div className="font-inter font-medium flex items-center gap-2">
                        {cliente.nome}
                        {cliente.categoria === 'VIP' && (
                          <Badge variant="secondary" className="font-inter text-xs">
                            VIP
                          </Badge>
                        )}
                      </div>
                      <div className="font-inter text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {cliente.endereco.split(' - ')[1]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-inter text-sm flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {cliente.email}
                      </div>
                      <div className="font-inter text-sm flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {cliente.telefone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-inter font-semibold">
                    {cliente.totalCompras}
                  </TableCell>
                  <TableCell>
                    <div className="font-inter text-sm flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {cliente.ultimaCompra}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={cliente.status === 'Ativo' ? 'default' : 'secondary'}
                      className="font-inter text-xs"
                    >
                      {cliente.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Novo Cliente</h3>
              <p className="font-inter text-sm text-muted-foreground">Cadastrar cliente</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Buscar Cliente</h3>
              <p className="font-inter text-sm text-muted-foreground">Localizar cliente</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Clientes VIP</h3>
              <p className="font-inter text-sm text-muted-foreground">Gerenciar VIPs</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Relatórios</h3>
              <p className="font-inter text-sm text-muted-foreground">Análise de clientes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientesPage;

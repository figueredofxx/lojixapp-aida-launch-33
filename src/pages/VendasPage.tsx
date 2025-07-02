
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Target, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VendasPage = () => {
  const recentSales = [
    { id: "#1234", cliente: "João Silva", produto: "iPhone 15 Pro", valor: "R$ 6.999,00", status: "Concluída", data: "Hoje, 14:30" },
    { id: "#1233", cliente: "Maria Santos", produto: "Samsung Galaxy S24", valor: "R$ 4.299,00", status: "Pendente", data: "Hoje, 13:15" },
    { id: "#1232", cliente: "Pedro Costa", produto: "Xiaomi Redmi Note 13", valor: "R$ 1.899,00", status: "Concluída", data: "Hoje, 11:45" },
    { id: "#1231", cliente: "Ana Oliveira", produto: "Motorola Edge 40", valor: "R$ 2.599,00", status: "Cancelada", data: "Ontem, 16:20" },
  ];

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Vendas
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Gerencie suas vendas e acompanhe o desempenho do seu negócio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-inter">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button className="bg-primary hover:bg-primary-hover font-inter">
            <Plus className="mr-2 h-4 w-4" />
            Nova Venda
          </Button>
        </div>
      </div>

      {/* Stats Cards - sem cores */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Vendas Hoje
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">R$ 13.647,00</div>
            <div className="flex items-center text-xs text-green-600 font-inter mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% em relação a ontem
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Pedidos Hoje
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">28</div>
            <div className="flex items-center text-xs text-green-600 font-inter mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +7 novos pedidos
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Ticket Médio
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">R$ 487,39</div>
            <div className="flex items-center text-xs text-red-600 font-inter mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3% este mês
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Meta Mensal
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">84%</div>
            <div className="text-xs text-muted-foreground font-inter mt-1">
              R$ 42.150,00 de R$ 50.000,00
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="font-cantarell text-xl font-semibold">
              Vendas Recentes
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por cliente, produto..."
                  className="pl-9 font-inter"
                />
              </div>
              <Button variant="outline" size="sm" className="font-inter">
                <Eye className="mr-2 h-4 w-4" />
                Ver Todas
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Pedido</TableHead>
                <TableHead className="font-inter">Cliente</TableHead>
                <TableHead className="font-inter">Produto</TableHead>
                <TableHead className="font-inter">Valor</TableHead>
                <TableHead className="font-inter">Status</TableHead>
                <TableHead className="font-inter">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-inter font-medium">{sale.id}</TableCell>
                  <TableCell className="font-inter">{sale.cliente}</TableCell>
                  <TableCell className="font-inter">{sale.produto}</TableCell>
                  <TableCell className="font-inter font-semibold">{sale.valor}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-inter font-medium ${
                      sale.status === 'Concluída' ? 'bg-green-100 text-green-800' :
                      sale.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {sale.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-inter text-muted-foreground">{sale.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Nova Venda</h3>
              <p className="font-inter text-sm text-muted-foreground">Criar uma nova venda</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Buscar Produto</h3>
              <p className="font-inter text-sm text-muted-foreground">Consultar estoque</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-cantarell font-semibold">Clientes</h3>
              <p className="font-inter text-sm text-muted-foreground">Gerenciar clientes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendasPage;

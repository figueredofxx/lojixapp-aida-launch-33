
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, TrendingUp, Calendar, Download, Filter, Search, Eye, DollarSign, ShoppingCart, Users, Package, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RelatoriosPage = () => {
  const salesData = [
    { periodo: "Janeiro 2025", vendas: "R$ 125.480,00", pedidos: 340, ticketMedio: "R$ 369,00", crescimento: "+12%" },
    { periodo: "Fevereiro 2025", vendas: "R$ 138.920,00", pedidos: 385, ticketMedio: "R$ 361,00", crescimento: "+15%" },
    { periodo: "Março 2025", vendas: "R$ 142.350,00", pedidos: 398, ticketMedio: "R$ 358,00", crescimento: "+18%" },
  ];

  const topProducts = [
    { produto: "iPhone 15 Pro", categoria: "Smartphones", vendas: 89, receita: "R$ 623.110,00", margem: "28%" },
    { produto: "Samsung Galaxy S24", categoria: "Smartphones", vendas: 76, receita: "R$ 326.740,00", margem: "24%" },
    { produto: "AirPods Pro 2ª Gen", categoria: "Acessórios", vendas: 124, receita: "R$ 359.476,00", margem: "35%" },
  ];

  const handleDownloadReport = (reportType: string) => {
    console.log(`Gerando relatório: ${reportType}`);
    // Aqui seria implementada a lógica real de geração do relatório
    alert(`Relatório de ${reportType} será gerado em breve!`);
  };

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Relatórios
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Análise completa do desempenho do seu negócio com relatórios detalhados
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-inter">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button className="bg-primary hover:bg-primary-hover font-inter">
            <Download className="mr-2 h-4 w-4" />
            Exportar Tudo
          </Button>
        </div>
      </div>

      {/* Stats Cards with Report Generation */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">R$ 842.750,00</div>
            <p className="text-xs text-green-600 font-inter mt-1 mb-3">
              +15% em relação ao período anterior
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full font-inter"
              onClick={() => handleDownloadReport("Receita Detalhada")}
            >
              <FileText className="mr-2 h-3 w-3" />
              Relatório Detalhado
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Total de Vendas
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">1,123</div>
            <p className="text-xs text-green-600 font-inter mt-1 mb-3">
              +8% este mês
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full font-inter"
              onClick={() => handleDownloadReport("Vendas Detalhadas")}
            >
              <FileText className="mr-2 h-3 w-3" />
              Relatório Detalhado
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">287</div>
            <p className="text-xs text-green-600 font-inter mt-1 mb-3">
              +22% este mês
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full font-inter"
              onClick={() => handleDownloadReport("Clientes Detalhados")}
            >
              <FileText className="mr-2 h-3 w-3" />
              Relatório Detalhado
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Estoque Atual
            </CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">2,847</div>
            <p className="text-xs text-green-600 font-inter mt-1 mb-3">
              +12% este mês
            </p>
            <Button
              size="sm"
              variant="outline"
              className="w-full font-inter"
              onClick={() => handleDownloadReport("Estoque Detalhado")}
            >
              <FileText className="mr-2 h-3 w-3" />
              Relatório Detalhado
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Filtros de Relatório
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="font-inter text-sm font-medium">Período</label>
              <Select>
                <SelectTrigger className="font-inter">
                  <SelectValue placeholder="Selecionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="3m">Últimos 3 meses</SelectItem>
                  <SelectItem value="1y">Último ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="font-inter text-sm font-medium">Categoria</label>
              <Select>
                <SelectTrigger className="font-inter">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="smartphones">Smartphones</SelectItem>
                  <SelectItem value="acessorios">Acessórios</SelectItem>
                  <SelectItem value="laptops">Laptops</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="font-inter text-sm font-medium">Vendedor</label>
              <Select>
                <SelectTrigger className="font-inter">
                  <SelectValue placeholder="Todos os vendedores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="font-inter text-sm font-medium">Status</label>
              <Select>
                <SelectTrigger className="font-inter">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="bg-primary hover:bg-primary-hover font-inter">
              <Search className="mr-2 h-4 w-4" />
              Aplicar Filtros
            </Button>
            <Button variant="outline" className="font-inter">
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Performance */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <BarChart3 className="h-5 w-5 text-primary mr-2" />
                Performance de Vendas
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="font-inter">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Gráfico
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-inter"
                  onClick={() => handleDownloadReport("Performance de Vendas")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-inter">Período</TableHead>
                  <TableHead className="font-inter">Vendas</TableHead>
                  <TableHead className="font-inter">Pedidos</TableHead>
                  <TableHead className="font-inter">Crescimento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-inter font-medium">{item.periodo}</TableCell>
                    <TableCell className="font-inter font-semibold">{item.vendas}</TableCell>
                    <TableCell className="font-inter">{item.pedidos}</TableCell>
                    <TableCell className="font-inter text-green-600">{item.crescimento}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                Produtos Mais Vendidos
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="font-inter">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Todos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-inter"
                  onClick={() => handleDownloadReport("Produtos Mais Vendidos")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-inter">Produto</TableHead>
                  <TableHead className="font-inter">Vendas</TableHead>
                  <TableHead className="font-inter">Receita</TableHead>
                  <TableHead className="font-inter">Margem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-inter font-medium">{item.produto}</div>
                        <div className="font-inter text-sm text-muted-foreground">{item.categoria}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-inter">{item.vendas}</TableCell>
                    <TableCell className="font-inter font-semibold">{item.receita}</TableCell>
                    <TableCell className="font-inter text-green-600">{item.margem}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RelatoriosPage;

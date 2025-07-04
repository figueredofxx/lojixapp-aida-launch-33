
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  Users,
  Building2,
  Package
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SuperAdminRelatorios = () => {
  const faturamentoMensal = [
    { mes: 'Jan', valor: 285000, empresas: 180 },
    { mes: 'Fev', valor: 310000, empresas: 195 },
    { mes: 'Mar', valor: 325000, empresas: 210 },
    { mes: 'Abr', valor: 340000, empresas: 225 },
    { mes: 'Mai', valor: 355000, empresas: 235 },
    { mes: 'Jun', valor: 342650, empresas: 247 }
  ];

  const modulosPopulares = [
    { name: 'PDV', value: 247, color: '#4141E1' },
    { name: 'Estoque', value: 245, color: '#10B981' },
    { name: 'Clientes', value: 230, color: '#3B82F6' },
    { name: 'Financeiro', value: 198, color: '#F59E0B' },
    { name: 'Relatórios', value: 180, color: '#8B5CF6' },
    { name: 'Multi-Lojas', value: 89, color: '#EF4444' }
  ];

  const distribuicaoPlanos = [
    { plano: 'Básico', empresas: 124, porcentagem: 50.2 },
    { plano: 'Profissional', empresas: 89, porcentagem: 36.0 },
    { plano: 'Enterprise', empresas: 34, porcentagem: 13.8 }
  ];

  const metricsCards = [
    {
      title: "Faturamento Total",
      value: "R$ 2.057.650",
      change: "+18% vs ano anterior",
      changeType: "positive",
      icon: DollarSign,
      color: "text-primary"
    },
    {
      title: "Taxa de Crescimento",
      value: "12.5%",
      change: "Mensal",
      changeType: "positive",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Empresas Ativas",
      value: "247",
      change: "+23 este mês",
      changeType: "positive",
      icon: Building2,
      color: "text-blue-500"
    },
    {
      title: "Total de Usuários",
      value: "1.847",
      change: "+156 este mês",
      changeType: "positive",
      icon: Users,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="p-4 pt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Relatórios Gerenciais
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Análises e métricas da plataforma LojixApp
          </p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" className="font-inter">
            <Calendar className="mr-2 h-4 w-4" />
            Período
          </Button>
          <Button className="bg-primary hover:bg-primary-hover font-inter">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metricsCards.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
                <div className="ml-4">
                  <p className="font-inter text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="font-cantarell text-2xl font-bold">{metric.value}</p>
                  <p className="font-inter text-xs text-green-600 mt-1">
                    {metric.change}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Faturamento Mensal */}
        <Card>
          <CardHeader>
            <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-primary" />
              Faturamento Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={faturamentoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Faturamento']}
                />
                <Bar dataKey="valor" fill="#4141E1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crescimento de Empresas */}
        <Card>
          <CardHeader>
            <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Crescimento de Empresas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={faturamentoMensal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} empresas`, 'Total']}
                />
                <Line 
                  type="monotone" 
                  dataKey="empresas" 
                  stroke="#10B981" 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Módulos e Planos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Módulos Mais Populares */}
        <Card>
          <CardHeader>
            <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
              <Package className="mr-2 h-5 w-5 text-blue-500" />
              Módulos Mais Utilizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={modulosPopulares}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {modulosPopulares.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição de Planos */}
        <Card>
          <CardHeader>
            <CardTitle className="font-cantarell text-xl font-semibold">
              Distribuição por Planos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {distribuicaoPlanos.map((plano, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-sm font-medium">{plano.plano}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-inter text-sm">{plano.empresas} empresas</span>
                      <Badge variant="outline">{plano.porcentagem}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${plano.porcentagem}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Relatórios Disponíveis para Download
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { nome: "Faturamento Detalhado", descricao: "Receitas por empresa e período", formato: "PDF/Excel" },
              { nome: "Uso da Plataforma", descricao: "Métricas de engajamento e módulos", formato: "PDF/Excel" },
              { nome: "Empresas Cadastradas", descricao: "Lista completa com dados", formato: "Excel/CSV" },
              { nome: "Performance de Suporte", descricao: "Métricas de atendimento", formato: "PDF" },
              { nome: "Análise de Churn", descricao: "Taxa de cancelamento e motivos", formato: "PDF/Excel" },
              { nome: "Projeções Financeiras", descricao: "Estimativas de crescimento", formato: "PDF" }
            ].map((relatorio, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-cantarell font-semibold mb-2">{relatorio.nome}</h4>
                <p className="font-inter text-sm text-muted-foreground mb-3">
                  {relatorio.descricao}
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{relatorio.formato}</Badge>
                  <Button size="sm" variant="outline" className="font-inter">
                    <Download className="mr-2 h-3 w-3" />
                    Baixar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminRelatorios;

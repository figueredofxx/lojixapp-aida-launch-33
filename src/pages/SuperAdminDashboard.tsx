
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  DollarSign, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Target
} from "lucide-react";

const SuperAdminDashboard = () => {
  const stats = [
    {
      title: "Empresas Ativas",
      value: "247",
      change: "+12% este mês",
      changeType: "positive",
      icon: Building2,
      color: "border-l-blue-500",
      iconColor: "text-blue-500"
    },
    {
      title: "Usuários Totais",
      value: "1.847",
      change: "+8% este mês",
      changeType: "positive",
      icon: Users,
      color: "border-l-green-500",
      iconColor: "text-green-500"
    },
    {
      title: "Faturamento Mensal",
      value: "R$ 342.650",
      change: "+15% vs mês anterior",
      changeType: "positive",
      icon: DollarSign,
      color: "border-l-primary",
      iconColor: "text-primary"
    },
    {
      title: "Módulos Ativos",
      value: "1.523",
      change: "7 módulos desativados",
      changeType: "negative",
      icon: Package,
      color: "border-l-orange-500",
      iconColor: "text-orange-500"
    }
  ];

  const alerts = [
    {
      type: "warning",
      title: "15 licenças expirando em 7 dias",
      description: "Empresas necessitam renovação urgente"
    },
    {
      type: "error",
      title: "3 empresas com pagamento em atraso",
      description: "Valor total: R$ 4.580,00"
    },
    {
      type: "info",
      title: "Nova versão disponível",
      description: "v2.1.3 com correções de segurança"
    }
  ];

  const recentActivities = [
    { action: "Nova empresa cadastrada", company: "Tech Solutions Ltda", time: "2 min atrás" },
    { action: "Plano atualizado", company: "Varejo Plus ME", time: "15 min atrás" },
    { action: "Licença renovada", company: "Comercial ABC", time: "1h atrás" },
    { action: "Suporte atendido", company: "Loja Virtual XYZ", time: "2h atrás" },
    { action: "Módulo ativado", company: "Distribuidora Norte", time: "3h atrás" }
  ];

  return (
    <div className="p-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
          Super Admin Dashboard
        </h1>
        <p className="font-inter text-sm text-muted-foreground">
          Visão geral e gerenciamento da plataforma LojixApp
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className={`border-l-4 ${stat.color}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-inter text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="font-cantarell text-2xl font-bold">{stat.value}</div>
              <p className={`flex items-center text-xs font-inter mt-1 ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="mr-1 h-3 w-3" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts and Activities */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
              Alertas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  alert.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <h4 className="font-inter font-medium text-sm">{alert.title}</h4>
                  <p className="font-inter text-xs text-muted-foreground">{alert.description}</p>
                </div>
                <Badge variant={
                  alert.type === 'warning' ? 'destructive' :
                  alert.type === 'error' ? 'destructive' : 'secondary'
                }>
                  {alert.type === 'warning' ? 'Atenção' :
                   alert.type === 'error' ? 'Crítico' : 'Info'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-500" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded">
                <div>
                  <p className="font-inter text-sm font-medium">{activity.action}</p>
                  <p className="font-inter text-xs text-muted-foreground">{activity.company}</p>
                </div>
                <span className="font-inter text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="hover:shadow-md transition-shadow cursor-pointer border rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-cantarell font-semibold">Empresas</h3>
                  <p className="font-inter text-sm text-muted-foreground">Gerenciar tenants</p>
                </div>
              </div>
            </div>
            
            <div className="hover:shadow-md transition-shadow cursor-pointer border rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-cantarell font-semibold">Funcionários</h3>
                  <p className="font-inter text-sm text-muted-foreground">Gestão de equipe</p>
                </div>
              </div>
            </div>

            <div className="hover:shadow-md transition-shadow cursor-pointer border rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-cantarell font-semibold">Módulos</h3>
                  <p className="font-inter text-sm text-muted-foreground">Config. sistema</p>
                </div>
              </div>
            </div>

            <div className="hover:shadow-md transition-shadow cursor-pointer border rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-cantarell font-semibold">Relatórios</h3>
                  <p className="font-inter text-sm text-muted-foreground">Análises gerenciais</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;

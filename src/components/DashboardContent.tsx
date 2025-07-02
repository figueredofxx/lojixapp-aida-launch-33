import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Archive, TrendingUp, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const MetricCard = ({ title, value, change, icon: Icon, trend }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down';
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-inter font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-cantarell font-bold text-foreground">{value}</div>
      <p className={`text-xs font-inter ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </CardContent>
  </Card>
);

const QuickAction = ({ title, description, icon: Icon }: {
  title: string;
  description: string;
  icon: any;
}) => (
  <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
    <CardContent className="p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-cantarell font-semibold text-foreground">{title}</h3>
          <p className="text-sm font-inter text-muted-foreground">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const RecentActivity = () => (
  <Card>
    <CardHeader>
      <CardTitle className="font-cantarell text-foreground">Atividades Recentes</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[
          { action: "Nova venda registrada", time: "há 5 minutos", value: "R$ 1.250,00" },
          { action: "Produto adicionado ao estoque", time: "há 15 minutos", value: "iPhone 15 Pro" },
          { action: "Cliente cadastrado", time: "há 1 hora", value: "Maria Silva" },
          { action: "Pagamento recebido", time: "há 2 horas", value: "R$ 850,00" },
        ].map((activity, index) => (
          <div key={index} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
            <div className="flex-1">
              <p className="text-sm font-inter font-medium text-foreground">{activity.action}</p>
              <p className="text-xs font-inter text-muted-foreground">{activity.time}</p>
            </div>
            <span className="text-sm font-inter font-semibold text-primary">{activity.value}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export function DashboardContent() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-secondary/30">
      <div className="mt-4">
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="font-cantarell text-2xl font-bold text-foreground">
            Bem-vindo ao LojixApp
          </h2>
          <p className="font-inter text-muted-foreground">
            Aqui está um resumo da sua loja hoje
          </p>
        </div>

        {/* Métricas principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <MetricCard
            title="Vendas Hoje"
            value="R$ 12.350"
            change="+8.2% em relação a ontem"
            icon={DollarSign}
            trend="up"
          />
          <MetricCard
            title="Novos Clientes"
            value="24"
            change="+12.5% em relação a ontem"
            icon={Users}
            trend="up"
          />
          <MetricCard
            title="Produtos em Estoque"
            value="1.247"
            change="-2.1% em relação a ontem"
            icon={Archive}
            trend="down"
          />
          <MetricCard
            title="Crescimento Mensal"
            value="23.5%"
            change="+4.3% em relação ao mês passado"
            icon={TrendingUp}
            trend="up"
          />
        </div>

        {/* Ações rápidas */}
        <div className="mb-6">
          <h3 className="font-cantarell text-lg font-semibold text-foreground mb-4">
            Ações Rápidas
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <QuickAction
              title="Nova Venda"
              description="Registrar uma nova venda no sistema"
              icon={DollarSign}
            />
            <QuickAction
              title="Adicionar Produto"
              description="Cadastrar novo produto no estoque"
              icon={Archive}
            />
            <QuickAction
              title="Novo Cliente"
              description="Cadastrar um novo cliente"
              icon={Users}
            />
          </div>
        </div>

        {/* Layout responsivo para desktop e mobile */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell text-foreground">Próximos Compromissos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-inter font-medium text-foreground">
                        Reunião com fornecedor
                      </p>
                      <p className="text-xs font-inter text-muted-foreground">Hoje às 14:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-inter font-medium text-foreground">
                        Fechamento do caixa
                      </p>
                      <p className="text-xs font-inter text-muted-foreground">Hoje às 18:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell text-foreground">Suporte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-inter text-muted-foreground mb-4">
                  Precisa de ajuda? Nossa equipe está aqui para você.
                </p>
                <Button className="w-full font-inter">
                  Falar com Suporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
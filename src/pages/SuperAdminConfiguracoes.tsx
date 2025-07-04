
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  DollarSign, 
  Bell, 
  Shield, 
  Database,
  Key,
  Mail,
  Server,
  Download,
  Upload
} from "lucide-react";

const SuperAdminConfiguracoes = () => {
  const [configuracoes, setConfiguracoes] = useState({
    notificacoes: {
      emailAlerts: true,
      systemAlerts: true,
      licenseExpiry: true,
      paymentFailures: true
    },
    seguranca: {
      twoFactorRequired: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    sistema: {
      maintenanceMode: false,
      debugMode: false,
      logLevel: 'info'
    }
  });

  const planos = [
    {
      id: 'basico',
      nome: 'Básico',
      preco: 99.90,
      usuarios: 5,
      modulos: ['PDV', 'Estoque', 'Clientes'],
      ativo: true
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      preco: 199.90,
      usuarios: 15,
      modulos: ['PDV', 'Estoque', 'Clientes', 'Financeiro', 'Relatórios'],
      ativo: true
    },
    {
      id: 'enterprise',
      nome: 'Enterprise',
      preco: 499.90,
      usuarios: 50,
      modulos: ['Todos os módulos', 'Multi-lojas', 'API Avançada'],
      ativo: true
    }
  ];

  const integracoes = [
    { nome: 'ERP Financeiro', status: 'conectado', ultimaSync: '2 min atrás' },
    { nome: 'Gateway de Pagamento', status: 'conectado', ultimaSync: '1h atrás' },
    { nome: 'Serviço de Email', status: 'conectado', ultimaSync: '30 min atrás' },
    { nome: 'Backup Automático', status: 'desconectado', ultimaSync: 'Nunca' },
    { nome: 'Monitoramento', status: 'conectado', ultimaSync: '5 min atrás' }
  ];

  return (
    <div className="p-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
          Configurações do Sistema
        </h1>
        <p className="font-inter text-sm text-muted-foreground">
          Configurações gerais da plataforma LojixApp
        </p>
      </div>

      {/* Planos de Assinatura */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-primary" />
            Planos de Assinatura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {planos.map((plano) => (
              <div key={plano.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-cantarell font-semibold text-lg">{plano.nome}</h3>
                  <Badge variant={plano.ativo ? "default" : "secondary"}>
                    {plano.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="font-cantarell text-2xl font-bold text-primary">
                    R$ {plano.preco.toFixed(2)}<span className="text-sm font-normal">/mês</span>
                  </p>
                  <p className="font-inter text-sm text-muted-foreground">
                    Até {plano.usuarios} usuários
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="font-inter text-sm font-medium">Módulos inclusos:</p>
                  <div className="flex flex-wrap gap-1">
                    {plano.modulos.slice(0, 3).map((modulo, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {modulo}
                      </Badge>
                    ))}
                    {plano.modulos.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{plano.modulos.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full font-inter">
                  Editar Plano
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
            <Bell className="mr-2 h-5 w-5 text-orange-500" />
            Notificações e Alertas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-inter font-semibold">Alertas por Email</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Alertas do sistema</span>
                  <Switch checked={configuracoes.notificacoes.emailAlerts} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Expiração de licenças</span>
                  <Switch checked={configuracoes.notificacoes.licenseExpiry} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Falhas de pagamento</span>
                  <Switch checked={configuracoes.notificacoes.paymentFailures} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-inter font-semibold">Configurações de Email</h4>
              <div className="space-y-3">
                <div>
                  <Label className="font-inter text-sm">Email do remetente</Label>
                  <Input 
                    type="email" 
                    defaultValue="noreply@lojixapp.com" 
                    className="font-inter"
                  />
                </div>
                <div>
                  <Label className="font-inter text-sm">Nome do remetente</Label>
                  <Input 
                    defaultValue="LojixApp Notificações" 
                    className="font-inter"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
            <Shield className="mr-2 h-5 w-5 text-red-500" />
            Configurações de Segurança
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-inter font-semibold">Autenticação</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Exigir 2FA para admins</span>
                  <Switch checked={configuracoes.seguranca.twoFactorRequired} />
                </div>
                <div>
                  <Label className="font-inter text-sm">Timeout de sessão (min)</Label>
                  <Input 
                    type="number" 
                    defaultValue={configuracoes.seguranca.sessionTimeout}
                    className="font-inter"
                  />
                </div>
                <div>
                  <Label className="font-inter text-sm">Expiração de senha (dias)</Label>
                  <Input 
                    type="number" 
                    defaultValue={configuracoes.seguranca.passwordExpiry}
                    className="font-inter"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-inter font-semibold">Logs e Auditoria</h4>
              <div className="space-y-3">
                <div>
                  <Label className="font-inter text-sm">Nível de log</Label>
                  <select className="w-full p-2 border rounded-md font-inter text-sm">
                    <option value="error">Error</option>
                    <option value="warn">Warning</option>
                    <option value="info" selected>Info</option>
                    <option value="debug">Debug</option>
                  </select>
                </div>
                <Button variant="outline" className="w-full font-inter">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Logs de Auditoria
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integrações */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
            <Key className="mr-2 h-5 w-5 text-blue-500" />
            Integrações e APIs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integracoes.map((integracao, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    integracao.status === 'conectado' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-inter font-medium">{integracao.nome}</p>
                    <p className="font-inter text-xs text-muted-foreground">
                      Última sincronização: {integracao.ultimaSync}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={integracao.status === 'conectado' ? 'default' : 'destructive'}>
                    {integracao.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="font-inter">
                    Configurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup e Manutenção */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
            <Database className="mr-2 h-5 w-5 text-green-500" />
            Backup e Manutenção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-inter font-semibold">Backup Automático</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Backup diário</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Retenção (dias)</span>
                  <Input type="number" defaultValue="30" className="w-20 font-inter" />
                </div>
                <Button variant="outline" className="w-full font-inter">
                  <Download className="mr-2 h-4 w-4" />
                  Fazer Backup Manual
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-inter font-semibold">Modo Manutenção</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Ativar modo manutenção</span>
                  <Switch checked={configuracoes.sistema.maintenanceMode} />
                </div>
                <div>
                  <Label className="font-inter text-sm">Mensagem para usuários</Label>
                  <Input 
                    placeholder="Sistema em manutenção..."
                    className="font-inter"
                  />
                </div>
                <Button variant="outline" className="w-full font-inter">
                  <Server className="mr-2 h-4 w-4" />
                  Status do Sistema
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações de Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Ações de Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary hover:bg-primary-hover font-inter">
              Salvar Configurações
            </Button>
            <Button variant="outline" className="font-inter">
              <Upload className="mr-2 h-4 w-4" />
              Importar Configurações
            </Button>
            <Button variant="outline" className="font-inter">
              <Download className="mr-2 h-4 w-4" />
              Exportar Configurações
            </Button>
            <Button variant="outline" className="font-inter">
              Restaurar Padrões
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminConfiguracoes;

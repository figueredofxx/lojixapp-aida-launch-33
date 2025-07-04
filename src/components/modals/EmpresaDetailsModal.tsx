
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  CreditCard, 
  Activity,
  LogIn,
  Settings,
  Calendar,
  DollarSign
} from "lucide-react";

interface EmpresaDetailsModalProps {
  empresa: any;
  isOpen: boolean;
  onClose: () => void;
}

export function EmpresaDetailsModal({ empresa, isOpen, onClose }: EmpresaDetailsModalProps) {
  const [isImpersonating, setIsImpersonating] = useState(false);

  const handleImpersonate = () => {
    setIsImpersonating(true);
    // Aqui implementaria a lógica de impersonation
    console.log(`Impersonating ${empresa.nome}`);
    // Redirecionar para /dashboard com contexto da empresa
    setTimeout(() => {
      window.open('/dashboard', '_blank');
      setIsImpersonating(false);
    }, 1000);
  };

  if (!empresa) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-cantarell text-2xl flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            {empresa.nome}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="atividade">Atividade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-cantarell text-lg">Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="font-inter text-sm font-medium text-muted-foreground">CNPJ</label>
                    <p className="font-inter">{empresa.cnpj}</p>
                  </div>
                  <div>
                    <label className="font-inter text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge className={empresa.status === 'ativa' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {empresa.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="font-inter text-sm font-medium text-muted-foreground">Plano</label>
                    <div className="mt-1">
                      <Badge variant="outline">{empresa.plano}</Badge>
                    </div>
                  </div>
                  <div>
                    <label className="font-inter text-sm font-medium text-muted-foreground">Data de Criação</label>
                    <p className="font-inter">{empresa.dataCriacao}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-cantarell text-lg">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={handleImpersonate}
                    disabled={isImpersonating}
                    className="w-full justify-start"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    {isImpersonating ? 'Acessando...' : 'Acessar como Empresa'}
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Configurações
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="mr-2 h-4 w-4" />
                    Resetar Senha Admin
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usuarios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Usuários da Empresa ({empresa.usuarios})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((user) => (
                    <div key={user} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-inter font-medium">Usuário {user}</p>
                        <p className="font-inter text-sm text-muted-foreground">usuario{user}@{empresa.nome.toLowerCase().replace(/\s+/g, '')}.com</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Admin</Badge>
                        <Button variant="ghost" size="sm">Editar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financeiro" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="font-cantarell text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Informações Financeiras
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="font-inter text-sm font-medium text-muted-foreground">Valor Mensal</label>
                    <p className="font-inter text-lg font-semibold">R$ {empresa.valorMensal?.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="font-inter text-sm font-medium text-muted-foreground">Próximo Vencimento</label>
                    <p className="font-inter">{empresa.dataExpiracao}</p>
                  </div>
                  <div>
                    <label className="font-inter text-sm font-medium text-muted-foreground">Status Pagamento</label>
                    <Badge className="bg-green-100 text-green-800">Em Dia</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-cantarell text-lg">Histórico de Pagamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3].map((payment) => (
                      <div key={payment} className="flex justify-between items-center p-2 border-b">
                        <div>
                          <p className="font-inter text-sm">Dez/2024</p>
                          <p className="font-inter text-xs text-muted-foreground">Plano {empresa.plano}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-inter text-sm font-medium">R$ {empresa.valorMensal?.toFixed(2)}</p>
                          <p className="font-inter text-xs text-green-600">Pago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="atividade" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Atividade Recente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { acao: 'Login realizado', usuario: 'admin@empresa.com', tempo: '2h atrás' },
                    { acao: 'Produto cadastrado', usuario: 'usuario@empresa.com', tempo: '4h atrás' },
                    { acao: 'Venda finalizada', usuario: 'vendedor@empresa.com', tempo: '6h atrás' },
                  ].map((atividade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-inter font-medium">{atividade.acao}</p>
                        <p className="font-inter text-sm text-muted-foreground">{atividade.usuario}</p>
                      </div>
                      <p className="font-inter text-sm text-muted-foreground">{atividade.tempo}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

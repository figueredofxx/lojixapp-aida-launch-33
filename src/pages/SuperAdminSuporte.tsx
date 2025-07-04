
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search,
  Phone,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Building2,
  Settings,
  Database,
  RefreshCw,
  FileText,
  Mail,
  Plus
} from "lucide-react";
import { TicketDetailsModal } from "@/components/modals/TicketDetailsModal";

const SuperAdminSuporte = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isTicketDetailsOpen, setIsTicketDetailsOpen] = useState(false);

  const tickets = [
    {
      id: "#2024-001",
      empresa: "Tech Solutions Ltda",
      usuario: "João Silva",
      problema: "Erro no PDV - não consegue finalizar vendas",
      prioridade: "alta",
      status: "aberto",
      tempo: "2h atrás",
      categoria: "PDV"
    },
    {
      id: "#2024-002", 
      empresa: "Varejo Plus ME",
      usuario: "Maria Santos",
      problema: "Relatórios não carregam",
      prioridade: "media",
      status: "em-andamento",
      tempo: "4h atrás",
      categoria: "Relatórios"
    },
    {
      id: "#2024-003",
      empresa: "Comercial ABC",
      usuario: "Pedro Costa",
      problema: "Integração com ERP falhando",
      prioridade: "alta",
      status: "aberto",
      tempo: "1h atrás",
      categoria: "Integração"
    }
  ];

  const ferramentasRapidas = [
    {
      nome: "Resetar Senha",
      descricao: "Redefinir senha de usuário",
      icon: RefreshCw,
      acao: () => console.log("Reset password")
    },
    {
      nome: "Limpar Cache",
      descricao: "Limpar cache do sistema",
      icon: Database,
      acao: () => console.log("Clear cache")
    },
    {
      nome: "Verificar Status",
      descricao: "Status dos serviços",
      icon: Settings,
      acao: () => console.log("Check status")
    },
    {
      nome: "Logs do Sistema",
      descricao: "Visualizar logs de erro",
      icon: FileText,
      acao: () => console.log("View logs")
    }
  ];

  const solucoesComuns = [
    {
      problema: "PDV não finaliza vendas",
      solucao: "1. Verificar conexão com banco\n2. Limpar cache do navegador\n3. Reiniciar sessão do usuário",
      categoria: "PDV"
    },
    {
      problema: "Relatórios não carregam",
      solucao: "1. Verificar permissões do usuário\n2. Checar filtros de data\n3. Verificar memória do servidor",
      categoria: "Relatórios"
    },
    {
      problema: "Erro de sincronização",
      solucao: "1. Verificar API do ERP\n2. Conferir tokens de acesso\n3. Verificar rate limits",
      categoria: "Integração"
    }
  ];

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aberto': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'em-andamento': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolvido': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleTicketClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsTicketDetailsOpen(true);
  };

  const handleBuscarEmpresa = () => {
    console.log("Buscando empresa:", searchTerm);
    // Implementar busca de empresa
  };

  return (
    <div className="p-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
          Central de Suporte
        </h1>
        <p className="font-inter text-sm text-muted-foreground">
          Ferramentas para atendimento ao cliente e solução de problemas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="font-inter text-sm font-medium text-muted-foreground">
                  Tickets Abertos
                </p>
                <p className="font-cantarell text-2xl font-bold">
                  {tickets.filter(t => t.status === 'aberto').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="font-inter text-sm font-medium text-muted-foreground">
                  Em Andamento
                </p>
                <p className="font-cantarell text-2xl font-bold">
                  {tickets.filter(t => t.status === 'em-andamento').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="font-inter text-sm font-medium text-muted-foreground">
                  Resolvidos Hoje
                </p>
                <p className="font-cantarell text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="font-inter text-sm font-medium text-muted-foreground">
                  Tempo Médio
                </p>
                <p className="font-cantarell text-2xl font-bold">2h 15m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Busca Rápida */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">Busca Rápida de Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label className="font-inter text-sm">Empresa ou CNPJ</Label>
              <Input 
                placeholder="Digite o nome da empresa ou CNPJ"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="font-inter"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleBuscarEmpresa} className="font-inter">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Tickets de Suporte */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-cantarell text-xl font-semibold">Tickets de Suporte</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="font-inter">
                <Plus className="mr-2 h-4 w-4" />
                Novo Ticket
              </Button>
              <Button variant="outline" size="sm" className="font-inter">
                <RefreshCw className="mr-2 h-4 w-4" />
                Atualizar
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {tickets.map((ticket) => (
              <Card 
                key={ticket.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTicketClick(ticket)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(ticket.status)}
                        <span className="font-cantarell font-semibold text-lg">{ticket.id}</span>
                        <Badge className={getPrioridadeColor(ticket.prioridade)}>
                          {ticket.prioridade}
                        </Badge>
                        <Badge variant="outline">{ticket.categoria}</Badge>
                      </div>
                      
                      <h3 className="font-inter font-medium text-gray-900 mb-1">
                        {ticket.problema}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span className="font-inter">{ticket.empresa}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span className="font-inter">{ticket.usuario}</span>
                        </div>
                        <span className="font-inter">{ticket.tempo}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="font-inter">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="font-inter">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ferramentas Laterais */}
        <div className="space-y-6">
          
          {/* Ferramentas Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-lg font-semibold">Ferramentas Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {ferramentasRapidas.map((ferramenta, index) => (
                  <button
                    key={index}
                    onClick={ferramenta.acao}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <ferramenta.icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-inter font-medium text-sm">{ferramenta.nome}</p>
                      <p className="font-inter text-xs text-gray-500">{ferramenta.descricao}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Soluções Comuns */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-lg font-semibold">Soluções Comuns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {solucoesComuns.map((solucao, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-inter font-medium text-sm text-gray-900 mb-1">
                      {solucao.problema}
                    </h4>
                    <Badge variant="outline" className="mb-2 text-xs">
                      {solucao.categoria}
                    </Badge>
                    <p className="font-inter text-xs text-gray-600 whitespace-pre-line">
                      {solucao.solucao}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status do Sistema */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-lg font-semibold">Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-inter text-sm">API Principal</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-inter text-xs text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-inter text-sm">Banco de Dados</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-inter text-xs text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-inter text-sm">Cache Redis</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-inter text-xs text-yellow-600">Lento</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Base de Conhecimento */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">Base de Conhecimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-cantarell font-semibold mb-2">Problemas de PDV</h3>
              <p className="font-inter text-sm text-gray-600">
                Soluções para erros comuns no ponto de venda
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-cantarell font-semibold mb-2">Integrações</h3>
              <p className="font-inter text-sm text-gray-600">
                Guias para configurar e solucionar APIs
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-cantarell font-semibold mb-2">Relatórios</h3>
              <p className="font-inter text-sm text-gray-600">
                Como resolver problemas de geração de relatórios
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <TicketDetailsModal
        ticket={selectedTicket}
        isOpen={isTicketDetailsOpen}
        onClose={() => setIsTicketDetailsOpen(false)}
      />
    </div>
  );
};

export default SuperAdminSuporte;

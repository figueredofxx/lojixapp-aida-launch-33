
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Mail
} from "lucide-react";

const SuperAdminSuporte = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

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

      {/* Busca Rápida */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="font-cantarell text-xl font-semibold mb-4">Busca Rápida de Cliente</h2>
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
            <Button className="font-inter">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
        </div>
      </div>

      {/* Layout Principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Tickets de Suporte */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-cantarell text-xl font-semibold">Tickets de Suporte</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="font-inter">
                <MessageCircle className="mr-2 h-4 w-4" />
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
              <div 
                key={ticket.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedTicket(ticket.id)}
              >
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
              </div>
            ))}
          </div>
        </div>

        {/* Ferramentas Laterais */}
        <div className="space-y-6">
          
          {/* Ferramentas Rápidas */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-cantarell text-lg font-semibold mb-4">Ferramentas Rápidas</h3>
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
          </div>

          {/* Soluções Comuns */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-cantarell text-lg font-semibold mb-4">Soluções Comuns</h3>
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
          </div>

          {/* Status do Sistema */}
          <div className="bg-white border rounded-lg p-4">
            <h3 className="font-cantarell text-lg font-semibold mb-4">Status do Sistema</h3>
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
          </div>
        </div>
      </div>

      {/* Base de Conhecimento */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="font-cantarell text-xl font-semibold mb-4">Base de Conhecimento</h2>
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
      </div>
    </div>
  );
};

export default SuperAdminSuporte;

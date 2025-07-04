import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Users,
  Shield,
  Activity,
  UserCheck
} from "lucide-react";
import { NovoFuncionarioModal } from "@/components/modals/NovoFuncionarioModal";

interface Funcionario {
  id: number;
  nome: string;
  email: string;
  role: 'super_admin' | 'suporte' | 'vendas' | 'financeiro' | 'desenvolvimento';
  status: 'ativo' | 'inativo';
  ultimoAcesso: string;
  dataCriacao: string;
}

const SuperAdminFuncionarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("todos");
  const [isNovoFuncionarioOpen, setIsNovoFuncionarioOpen] = useState(false);

  const funcionarios: Funcionario[] = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@lojixapp.com",
      role: "super_admin",
      status: "ativo",
      ultimoAcesso: "Há 2 min",
      dataCriacao: "15/01/2024"
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@lojixapp.com",
      role: "suporte",
      status: "ativo",
      ultimoAcesso: "Há 1h",
      dataCriacao: "20/02/2024"
    },
    {
      id: 3,
      nome: "Pedro Costa",
      email: "pedro.costa@lojixapp.com",
      role: "vendas",
      status: "ativo",
      ultimoAcesso: "Há 3h",
      dataCriacao: "10/03/2024"
    },
    {
      id: 4,
      nome: "Ana Oliveira",
      email: "ana.oliveira@lojixapp.com",
      role: "financeiro",
      status: "ativo",
      ultimoAcesso: "Ontem",
      dataCriacao: "05/04/2024"
    },
    {
      id: 5,
      nome: "Carlos Mendes",
      email: "carlos.mendes@lojixapp.com",
      role: "desenvolvimento",
      status: "inativo",
      ultimoAcesso: "Há 1 semana",
      dataCriacao: "12/05/2024"
    }
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_admin':
        return <Badge className="bg-red-100 text-red-800">Super Admin</Badge>;
      case 'suporte':
        return <Badge className="bg-blue-100 text-blue-800">Suporte</Badge>;
      case 'vendas':
        return <Badge className="bg-green-100 text-green-800">Vendas</Badge>;
      case 'financeiro':
        return <Badge className="bg-yellow-100 text-yellow-800">Financeiro</Badge>;
      case 'desenvolvimento':
        return <Badge className="bg-purple-100 text-purple-800">Desenvolvimento</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'inativo':
        return <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredFuncionarios = funcionarios.filter(funcionario => {
    const matchesSearch = funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         funcionario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "todos" || funcionario.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const stats = [
    {
      title: "Total de Funcionários",
      value: funcionarios.length.toString(),
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Funcionários Ativos",
      value: funcionarios.filter(f => f.status === 'ativo').length.toString(),
      icon: UserCheck,
      color: "text-green-500"
    },
    {
      title: "Super Admins",
      value: funcionarios.filter(f => f.role === 'super_admin').length.toString(),
      icon: Shield,
      color: "text-red-500"
    },
    {
      title: "Último Acesso",
      value: "Agora",
      icon: Activity,
      color: "text-purple-500"
    }
  ];

  const rolePermissions = {
    super_admin: ["Acesso total", "Gerenciar empresas", "Gerenciar funcionários", "Configurações", "Relatórios"],
    suporte: ["Visualizar empresas", "Suporte técnico", "Logs do sistema"],
    vendas: ["Dashboard vendas", "Relatórios comerciais", "Gestão de leads"],
    financeiro: ["Relatórios financeiros", "Faturamento", "Pagamentos"],
    desenvolvimento: ["Logs técnicos", "Configurações de sistema", "Deploy"]
  };

  const handleNovoFuncionario = (data: any) => {
    console.log("Novo funcionário:", data);
    // Aqui implementaria a lógica para criar novo funcionário
  };

  return (
    <div className="p-4 pt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Gestão de Funcionários
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Gerenciar funcionários da LojixApp e suas permissões
          </p>
        </div>
        <Button 
          onClick={() => setIsNovoFuncionarioOpen(true)}
          className="bg-primary hover:bg-primary-hover font-inter mt-4 sm:mt-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Funcionário
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="font-inter text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="font-cantarell text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Roles and Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Roles e Permissões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <div key={role} className="border rounded-lg p-4">
                <div className="mb-3">
                  {getRoleBadge(role)}
                </div>
                <ul className="space-y-1">
                  {permissions.map((permission, index) => (
                    <li key={index} className="font-inter text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employee List */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Lista de Funcionários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 font-inter"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterRole === "todos" ? "default" : "outline"}
                onClick={() => setFilterRole("todos")}
                className="font-inter"
              >
                Todos
              </Button>
              <Button
                variant={filterRole === "super_admin" ? "default" : "outline"}
                onClick={() => setFilterRole("super_admin")}
                className="font-inter"
              >
                Admins
              </Button>
              <Button
                variant={filterRole === "suporte" ? "default" : "outline"}
                onClick={() => setFilterRole("suporte")}
                className="font-inter"
              >
                Suporte
              </Button>
              <Button
                variant={filterRole === "vendas" ? "default" : "outline"}
                onClick={() => setFilterRole("vendas")}
                className="font-inter"
              >
                Vendas
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Nome</TableHead>
                <TableHead className="font-inter">Email</TableHead>
                <TableHead className="font-inter">Role</TableHead>
                <TableHead className="font-inter">Status</TableHead>
                <TableHead className="font-inter">Último Acesso</TableHead>
                <TableHead className="font-inter">Data Criação</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFuncionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-inter font-medium">
                    {funcionario.nome}
                  </TableCell>
                  <TableCell className="font-inter">{funcionario.email}</TableCell>
                  <TableCell>{getRoleBadge(funcionario.role)}</TableCell>
                  <TableCell>{getStatusBadge(funcionario.status)}</TableCell>
                  <TableCell className="font-inter">{funcionario.ultimoAcesso}</TableCell>
                  <TableCell className="font-inter">{funcionario.dataCriacao}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal */}
      <NovoFuncionarioModal
        isOpen={isNovoFuncionarioOpen}
        onClose={() => setIsNovoFuncionarioOpen(false)}
        onSave={handleNovoFuncionario}
      />
    </div>
  );
};

export default SuperAdminFuncionarios;

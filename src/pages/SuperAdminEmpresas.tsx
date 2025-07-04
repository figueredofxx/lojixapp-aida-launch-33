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
  Pause, 
  Play,
  Building2,
  Users,
  DollarSign,
  LogIn
} from "lucide-react";
import { EmpresaDetailsModal } from "@/components/modals/EmpresaDetailsModal";
import { NovaEmpresaModal } from "@/components/modals/NovaEmpresaModal";

interface Empresa {
  id: number;
  nome: string;
  cnpj: string;
  status: 'ativa' | 'inativa' | 'suspensa';
  plano: 'básico' | 'profissional' | 'enterprise';
  usuarios: number;
  dataCriacao: string;
  dataExpiracao: string;
  valorMensal: number;
}

const SuperAdminEmpresas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("todas");
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNovaEmpresaOpen, setIsNovaEmpresaOpen] = useState(false);

  const empresas: Empresa[] = [
    {
      id: 1,
      nome: "Tech Solutions Ltda",
      cnpj: "12.345.678/0001-90",
      status: "ativa",
      plano: "profissional",
      usuarios: 15,
      dataCriacao: "15/01/2024",
      dataExpiracao: "15/01/2025",
      valorMensal: 199.90
    },
    {
      id: 2,
      nome: "Varejo Plus ME",
      cnpj: "98.765.432/0001-10",
      status: "ativa",
      plano: "básico",
      usuarios: 3,
      dataCriacao: "22/03/2024",
      dataExpiracao: "22/03/2025",
      valorMensal: 99.90
    },
    {
      id: 3,
      nome: "Comercial ABC S/A",
      cnpj: "11.222.333/0001-44",
      status: "suspensa",
      plano: "enterprise",
      usuarios: 45,
      dataCriacao: "08/12/2023",
      dataExpiracao: "08/12/2024",
      valorMensal: 499.90
    },
    {
      id: 4,
      nome: "Distribuidora Norte Ltda",
      cnpj: "55.666.777/0001-88",
      status: "ativa",
      plano: "profissional",
      usuarios: 22,
      dataCriacao: "30/05/2024",
      dataExpiracao: "30/05/2025",
      valorMensal: 199.90
    },
    {
      id: 5,
      nome: "Loja Virtual XYZ",
      cnpj: "33.444.555/0001-66",
      status: "inativa",
      plano: "básico",
      usuarios: 1,
      dataCriacao: "12/02/2024",
      dataExpiracao: "12/02/2025",
      valorMensal: 99.90
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativa':
        return <Badge className="bg-green-100 text-green-800">Ativa</Badge>;
      case 'inativa':
        return <Badge className="bg-gray-100 text-gray-800">Inativa</Badge>;
      case 'suspensa':
        return <Badge className="bg-red-100 text-red-800">Suspensa</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanoBadge = (plano: string) => {
    switch (plano) {
      case 'básico':
        return <Badge variant="outline">Básico</Badge>;
      case 'profissional':
        return <Badge className="bg-blue-100 text-blue-800">Profissional</Badge>;
      case 'enterprise':
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
      default:
        return <Badge variant="secondary">{plano}</Badge>;
    }
  };

  const filteredEmpresas = empresas.filter(empresa => {
    const matchesSearch = empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         empresa.cnpj.includes(searchTerm);
    const matchesStatus = filterStatus === "todas" || empresa.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Total de Empresas",
      value: empresas.length.toString(),
      icon: Building2,
      color: "text-blue-500"
    },
    {
      title: "Empresas Ativas",
      value: empresas.filter(e => e.status === 'ativa').length.toString(),
      icon: Play,
      color: "text-green-500"
    },
    {
      title: "Total de Usuários",
      value: empresas.reduce((acc, e) => acc + e.usuarios, 0).toString(),
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Faturamento Mensal",
      value: `R$ ${empresas.filter(e => e.status === 'ativa').reduce((acc, e) => acc + e.valorMensal, 0).toFixed(2)}`,
      icon: DollarSign,
      color: "text-primary"
    }
  ];

  const handleViewDetails = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setIsDetailsOpen(true);
  };

  const handleImpersonate = (empresa: Empresa) => {
    console.log(`Impersonating ${empresa.nome}`);
    window.open('/dashboard', '_blank');
  };

  const handleNovaEmpresa = (data: any) => {
    console.log("Nova empresa:", data);
    // Aqui implementaria a lógica para criar nova empresa
  };

  return (
    <div className="p-4 pt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Gestão de Empresas
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Gerenciar todas as empresas (tenants) da plataforma
          </p>
        </div>
        <Button 
          onClick={() => setIsNovaEmpresaOpen(true)}
          className="bg-primary hover:bg-primary-hover font-inter mt-4 sm:mt-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Empresa
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

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Lista de Empresas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 font-inter"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "todas" ? "default" : "outline"}
                onClick={() => setFilterStatus("todas")}
                className="font-inter"
              >
                Todas
              </Button>
              <Button
                variant={filterStatus === "ativa" ? "default" : "outline"}
                onClick={() => setFilterStatus("ativa")}
                className="font-inter"
              >
                Ativas
              </Button>
              <Button
                variant={filterStatus === "inativa" ? "default" : "outline"}
                onClick={() => setFilterStatus("inativa")}
                className="font-inter"
              >
                Inativas
              </Button>
              <Button
                variant={filterStatus === "suspensa" ? "default" : "outline"}
                onClick={() => setFilterStatus("suspensa")}
                className="font-inter"
              >
                Suspensas
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Empresa</TableHead>
                <TableHead className="font-inter">CNPJ</TableHead>
                <TableHead className="font-inter">Status</TableHead>
                <TableHead className="font-inter">Plano</TableHead>
                <TableHead className="font-inter">Usuários</TableHead>
                <TableHead className="font-inter">Criação</TableHead>
                <TableHead className="font-inter">Expiração</TableHead>
                <TableHead className="font-inter">Valor</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmpresas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell className="font-inter font-medium">
                    {empresa.nome}
                  </TableCell>
                  <TableCell className="font-inter">{empresa.cnpj}</TableCell>
                  <TableCell>{getStatusBadge(empresa.status)}</TableCell>
                  <TableCell>{getPlanoBadge(empresa.plano)}</TableCell>
                  <TableCell className="font-inter">{empresa.usuarios}</TableCell>
                  <TableCell className="font-inter">{empresa.dataCriacao}</TableCell>
                  <TableCell className="font-inter">{empresa.dataExpiracao}</TableCell>
                  <TableCell className="font-inter">R$ {empresa.valorMensal.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(empresa)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleImpersonate(empresa)}
                        title="Acessar como empresa"
                      >
                        <LogIn className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        {empresa.status === 'ativa' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <EmpresaDetailsModal
        empresa={selectedEmpresa}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      <NovaEmpresaModal
        isOpen={isNovaEmpresaOpen}
        onClose={() => setIsNovaEmpresaOpen(false)}
        onSave={handleNovaEmpresa}
      />
    </div>
  );
};

export default SuperAdminEmpresas;

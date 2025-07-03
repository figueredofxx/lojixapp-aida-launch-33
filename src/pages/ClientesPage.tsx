
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, Edit, Trash2, Users, UserPlus, Phone, Mail, MapPin, Calendar, Building } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UnifiedClientForm, ClienteCompleto } from "@/components/UnifiedClientForm";

const ClientesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [clientes, setClientes] = useState<ClienteCompleto[]>([
    {
      id: 1,
      tipo: "PF",
      nome: "João Silva",
      cpf: "123.456.789-00",
      email: "joao.silva@email.com",
      telefone: "(11) 99999-9999",
      cep: "01310-100",
      logradouro: "Av. Paulista",
      numero: "1000",
      bairro: "Bela Vista",
      cidade: "São Paulo",
      estado: "SP"
    },
    {
      id: 2,
      tipo: "PF",
      nome: "Maria Santos",
      cpf: "987.654.321-00",
      email: "maria.santos@email.com",
      telefone: "(11) 88888-8888",
      cep: "04038-001",
      logradouro: "Rua Augusta",
      numero: "500",
      bairro: "Consolação",
      cidade: "São Paulo",
      estado: "SP"
    },
    {
      id: 3,
      tipo: "PJ",
      razaoSocial: "Tech Solutions Ltda",
      nomeFantasia: "TechSol",
      cnpj: "12.345.678/0001-90",
      email: "contato@techsol.com.br",
      telefone: "(11) 77777-7777",
      cep: "04567-890",
      logradouro: "Rua Oscar Freire",
      numero: "321",
      bairro: "Jardins",
      cidade: "São Paulo",
      estado: "SP"
    },
    {
      id: 4,
      tipo: "PJ",
      razaoSocial: "Comercial ABC S.A.",
      nomeFantasia: "ABC Comercial",
      cnpj: "98.765.432/0001-10",
      email: "vendas@abccomercial.com",
      telefone: "(11) 66666-6666",
      cep: "01234-567",
      logradouro: "Rua da Consolação",
      numero: "789",
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP"
    },
  ]);

  const filteredClients = clientes.filter(cliente => {
    const searchLower = searchTerm.toLowerCase();
    const displayName = cliente.tipo === "PF" ? cliente.nome : cliente.razaoSocial;
    const document = cliente.tipo === "PF" ? cliente.cpf : cliente.cnpj;
    
    return (
      displayName?.toLowerCase().includes(searchLower) ||
      cliente.email?.toLowerCase().includes(searchLower) ||
      cliente.telefone?.includes(searchTerm) ||
      document?.includes(searchTerm)
    );
  });

  const totalClientes = clientes.length;
  const clientesAtivos = clientes.length; // Assumindo que todos estão ativos
  const clientesPF = clientes.filter(c => c.tipo === "PF").length;
  const clientesPJ = clientes.filter(c => c.tipo === "PJ").length;

  const handleClientSave = (newClient: ClienteCompleto) => {
    setClientes(prev => [...prev, newClient]);
  };

  const getClientDisplayName = (client: ClienteCompleto) => {
    return client.tipo === "PF" ? client.nome : client.razaoSocial;
  };

  const getClientDocument = (client: ClienteCompleto) => {
    return client.tipo === "PF" ? client.cpf : client.cnpj;
  };

  const getClientSecondaryName = (client: ClienteCompleto) => {
    return client.tipo === "PJ" ? client.nomeFantasia : undefined;
  };

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Clientes
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Gerencie todos os seus clientes (PF e PJ) e relacionamentos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-inter">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button 
            className="bg-primary hover:bg-primary-hover font-inter"
            onClick={() => setClientFormOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Total de Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">{totalClientes}</div>
            <p className="text-xs text-green-600 font-inter mt-1">
              Todos os cadastros
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Pessoas Físicas
            </CardTitle>
            <UserPlus className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">{clientesPF}</div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              {Math.round((clientesPF / totalClientes) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Pessoas Jurídicas
            </CardTitle>
            <Building className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">{clientesPJ}</div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              {Math.round((clientesPJ / totalClientes) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Clientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">{clientesAtivos}</div>
            <p className="text-xs text-green-600 font-inter mt-1">
              100% ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Clientes */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="font-cantarell text-xl font-semibold">
              Lista de Clientes
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, documento, email ou telefone..."
                  className="pl-9 font-inter text-base h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="font-inter">
                <Eye className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Cliente</TableHead>
                <TableHead className="font-inter">Documento</TableHead>
                <TableHead className="font-inter">Contato</TableHead>
                <TableHead className="font-inter">Endereço</TableHead>
                <TableHead className="font-inter">Tipo</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>
                    <div>
                      <div className="font-inter font-medium flex items-center gap-2">
                        {getClientDisplayName(cliente)}
                        {cliente.tipo === 'PJ' && (
                          <Badge variant="outline" className="font-inter text-xs">
                            <Building className="h-3 w-3 mr-1" />
                            PJ
                          </Badge>
                        )}
                      </div>
                      {getClientSecondaryName(cliente) && (
                        <div className="font-inter text-sm text-muted-foreground">
                          {getClientSecondaryName(cliente)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-inter text-sm">
                      {cliente.tipo}: {getClientDocument(cliente)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {cliente.email && (
                        <div className="font-inter text-sm flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          {cliente.email}
                        </div>
                      )}
                      {cliente.telefone && (
                        <div className="font-inter text-sm flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {cliente.telefone}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-inter text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {cliente.cidade}/{cliente.estado}
                    </div>
                    <div className="font-inter text-xs text-muted-foreground">
                      {cliente.bairro}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={cliente.tipo === 'PF' ? 'default' : 'secondary'}
                      className="font-inter text-xs"
                    >
                      {cliente.tipo === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
              <p className="font-inter text-muted-foreground">
                {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Cliente */}
      <UnifiedClientForm
        isOpen={clientFormOpen}
        onClose={() => setClientFormOpen(false)}
        onClientSave={handleClientSave}
        existingClients={clientes}
      />
    </div>
  );
};

export default ClientesPage;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Settings, Users, ArrowRightLeft, Eye, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MultiLojasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const lojas = [
    {
      id: 1,
      nome: "Loja Centro",
      endereco: "Rua XV de Novembro, 123 - Centro",
      telefone: "(11) 3333-4444",
      status: "Ativa",
      usuarios: 3,
      ultimaVenda: "2024-01-06"
    },
    {
      id: 2,
      nome: "Loja Shopping",
      endereco: "Shopping Center - Loja 45",
      telefone: "(11) 5555-6666",
      status: "Ativa",
      usuarios: 2,
      ultimaVenda: "2024-01-05"
    }
  ];

  const filteredLojas = lojas.filter(loja =>
    loja.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loja.endereco.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Multi-Lojas
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Gerencie múltiplas lojas em um só lugar
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-primary hover:bg-primary-hover font-inter">
            <Plus className="mr-2 h-4 w-4" />
            Nova Loja
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Total de Lojas
            </CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {lojas.length}
            </div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              Lojas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Usuários Totais
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {lojas.reduce((acc, loja) => acc + loja.usuarios, 0)}
            </div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              Em todas as lojas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Transferências
            </CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">24</div>
            <p className="text-xs text-green-600 font-inter mt-1">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Sincronização
            </CardTitle>
            <Settings className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-green-600">OK</div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              Última: há 5 min
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Input
              placeholder="Buscar lojas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="font-inter"
            />
            <Button variant="outline" className="font-inter">
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lojas Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Lojas ({filteredLojas.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Nome da Loja</TableHead>
                <TableHead className="font-inter">Endereço</TableHead>
                <TableHead className="font-inter">Telefone</TableHead>
                <TableHead className="font-inter">Usuários</TableHead>
                <TableHead className="font-inter">Status</TableHead>
                <TableHead className="font-inter">Última Venda</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLojas.map((loja) => (
                <TableRow key={loja.id}>
                  <TableCell className="font-inter font-medium">
                    {loja.nome}
                  </TableCell>
                  <TableCell className="font-inter text-sm">
                    {loja.endereco}
                  </TableCell>
                  <TableCell className="font-inter text-sm">
                    {loja.telefone}
                  </TableCell>
                  <TableCell className="font-inter">
                    {loja.usuarios} usuários
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 font-inter">
                      {loja.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-inter text-sm">
                    {new Date(loja.ultimaVenda).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <ArrowRightLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiLojasPage;

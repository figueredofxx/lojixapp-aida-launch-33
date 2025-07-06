
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, Edit, Trash2, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const CategoriasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const [categorias, setCategorias] = useState([
    {
      id: 1,
      nome: "Smartphones",
      description: "Telefones celulares e acessórios",
      produtosCount: 15,
      ativo: true,
      dataCriacao: "2024-01-15"
    },
    {
      id: 2,
      nome: "Acessórios",
      description: "Capinhas, carregadores e outros acessórios",
      produtosCount: 32,
      ativo: true,
      dataCriacao: "2024-01-20"
    },
    {
      id: 3,
      nome: "Eletrônicos",
      description: "Equipamentos eletrônicos diversos",
      produtosCount: 8,
      ativo: true,
      dataCriacao: "2024-02-01"
    }
  ]);

  const filteredCategorias = categorias.filter(categoria =>
    categoria.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    categoria.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = () => {
    // Lógica para criar categoria
    setShowCreateDialog(false);
  };

  const handleEditCategory = (categoria: any) => {
    setEditingCategory(categoria);
    setShowCreateDialog(true);
  };

  const handleDeleteCategory = (id: number) => {
    setCategorias(categorias.filter(c => c.id !== id));
  };

  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Categorias
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Organize seus produtos em categorias para melhor gestão
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary-hover font-inter">
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-cantarell">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome" className="font-inter">Nome da Categoria *</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Smartphones"
                  defaultValue={editingCategory?.nome || ""}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description" className="font-inter">Descrição</Label>
                <Input
                  id="description"
                  placeholder="Descreva a categoria (opcional)"
                  defaultValue={editingCategory?.description || ""}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreateDialog(false);
                    setEditingCategory(null);
                  }}
                  className="font-inter"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleCreateCategory}
                  className="bg-primary hover:bg-primary-hover font-inter"
                >
                  {editingCategory ? 'Salvar' : 'Criar Categoria'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Total de Categorias
            </CardTitle>
            <Tag className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {categorias.length}
            </div>
            <p className="text-xs text-muted-foreground font-inter mt-1">
              Categorias ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Produtos Categorizados
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {categorias.reduce((acc, cat) => acc + cat.produtosCount, 0)}
            </div>
            <p className="text-xs text-green-600 font-inter mt-1">
              Total de produtos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Categoria Principal
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-blue-500"></div>
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {categorias.reduce((prev, current) => 
                prev.produtosCount > current.produtosCount ? prev : current
              ).nome}
            </div>
            <p className="text-xs text-blue-600 font-inter mt-1">
              Mais produtos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-inter text-sm font-medium text-muted-foreground">
              Média por Categoria
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-purple-500"></div>
          </CardHeader>
          <CardContent>
            <div className="font-cantarell text-2xl font-bold text-foreground">
              {Math.round(categorias.reduce((acc, cat) => acc + cat.produtosCount, 0) / categorias.length)}
            </div>
            <p className="text-xs text-purple-600 font-inter mt-1">
              Produtos por categoria
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-inter"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold">
            Categorias ({filteredCategorias.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-inter">Nome</TableHead>
                <TableHead className="font-inter">Descrição</TableHead>
                <TableHead className="font-inter">Produtos</TableHead>
                <TableHead className="font-inter">Status</TableHead>
                <TableHead className="font-inter">Data de Criação</TableHead>
                <TableHead className="font-inter">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategorias.map((categoria) => (
                <TableRow key={categoria.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="font-inter font-medium">{categoria.nome}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-inter text-muted-foreground">
                    {categoria.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-inter">
                      {categoria.produtosCount} produtos
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`font-inter ${categoria.ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {categoria.ativo ? 'Ativa' : 'Inativa'}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-inter text-sm">
                    {new Date(categoria.dataCriacao).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditCategory(categoria)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteCategory(categoria.id)}
                      >
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
    </div>
  );
};

export default CategoriasPage;

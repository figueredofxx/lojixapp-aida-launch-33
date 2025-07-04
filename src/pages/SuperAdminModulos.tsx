
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  BarChart3, 
  Settings,
  Building2,
  Target,
  FileText
} from "lucide-react";

interface Modulo {
  id: string;
  nome: string;
  descricao: string;
  icone: any;
  status: 'ativo' | 'inativo';
  empresasUsando: number;
  totalEmpresas: number;
  categoria: 'vendas' | 'gestao' | 'financeiro' | 'relatorios';
}

const SuperAdminModulos = () => {
  const [modulos, setModulos] = useState<Modulo[]>([
    {
      id: 'pdv',
      nome: 'PDV (Ponto de Venda)',
      descricao: 'Sistema completo de vendas com controle de estoque em tempo real',
      icone: ShoppingCart,
      status: 'ativo',
      empresasUsando: 247,
      totalEmpresas: 247,
      categoria: 'vendas'
    },
    {
      id: 'estoque',
      nome: 'Controle de Estoque',
      descricao: 'Gestão completa de produtos, entrada e saída de mercadorias',
      icone: Package,
      status: 'ativo',
      empresasUsando: 245,
      totalEmpresas: 247,
      categoria: 'gestao'
    },
    {
      id: 'clientes',
      nome: 'Gestão de Clientes',
      descricao: 'Cadastro e gerenciamento de clientes PF e PJ',
      icone: Users,
      status: 'ativo',
      empresasUsando: 230,
      totalEmpresas: 247,
      categoria: 'gestao'
    },
    {
      id: 'financeiro',
      nome: 'Módulo Financeiro',
      descricao: 'Controle de receitas, despesas e fluxo de caixa',
      icone: DollarSign,
      status: 'ativo',
      empresasUsando: 198,
      totalEmpresas: 247,
      categoria: 'financeiro'
    },
    {
      id: 'relatorios',
      nome: 'Relatórios Gerenciais',
      descricao: 'Relatórios detalhados de vendas, estoque e financeiro',
      icone: BarChart3,
      status: 'ativo',
      empresasUsando: 180,
      totalEmpresas: 247,
      categoria: 'relatorios'
    },
    {
      id: 'multi-lojas',
      nome: 'Multi Lojas',
      descricao: 'Gestão de múltiplas unidades e transferências',
      icone: Building2,
      status: 'ativo',
      empresasUsando: 89,
      totalEmpresas: 247,
      categoria: 'gestao'
    },
    {
      id: 'fornecedores',
      nome: 'Gestão de Fornecedores',
      descricao: 'Cadastro e controle de fornecedores e compras',
      icone: Target,
      status: 'ativo',
      empresasUsando: 156,
      totalEmpresas: 247,
      categoria: 'gestao'
    },
    {
      id: 'notas-fiscais',
      nome: 'Notas Fiscais',
      descricao: 'Emissão e controle de notas fiscais eletrônicas',
      icone: FileText,
      status: 'inativo',
      empresasUsando: 0,
      totalEmpresas: 247,
      categoria: 'financeiro'
    }
  ]);

  const toggleModulo = (id: string) => {
    setModulos(modulos.map(modulo => 
      modulo.id === id 
        ? { ...modulo, status: modulo.status === 'ativo' ? 'inativo' : 'ativo' }
        : modulo
    ));
  };

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case 'vendas':
        return <Badge className="bg-green-100 text-green-800">Vendas</Badge>;
      case 'gestao':
        return <Badge className="bg-blue-100 text-blue-800">Gestão</Badge>;
      case 'financeiro':
        return <Badge className="bg-yellow-100 text-yellow-800">Financeiro</Badge>;
      case 'relatorios':
        return <Badge className="bg-purple-100 text-purple-800">Relatórios</Badge>;
      default:
        return <Badge variant="secondary">{categoria}</Badge>;
    }
  };

  const getUsagePercentage = (usando: number, total: number) => {
    return Math.round((usando / total) * 100);
  };

  const categoriasStats = {
    vendas: modulos.filter(m => m.categoria === 'vendas'),
    gestao: modulos.filter(m => m.categoria === 'gestao'),
    financeiro: modulos.filter(m => m.categoria === 'financeiro'),
    relatorios: modulos.filter(m => m.categoria === 'relatorios')
  };

  return (
    <div className="p-4 pt-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
          Gestão de Módulos
        </h1>
        <p className="font-inter text-sm text-muted-foreground">
          Configurar módulos e funcionalidades disponíveis para as empresas
        </p>
      </div>

      {/* Stats por Categoria */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(categoriasStats).map(([categoria, modulosCategoria]) => (
          <Card key={categoria}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-inter text-sm font-medium text-muted-foreground capitalize">
                    {categoria}
                  </p>
                  <p className="font-cantarell text-2xl font-bold">
                    {modulosCategoria.length}
                  </p>
                  <p className="font-inter text-xs text-muted-foreground">
                    {modulosCategoria.filter(m => m.status === 'ativo').length} ativos
                  </p>
                </div>
                {getCategoriaBadge(categoria)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lista de Módulos */}
      <div className="grid gap-6 lg:grid-cols-2">
        {modulos.map((modulo) => (
          <Card key={modulo.id} className={`transition-all ${
            modulo.status === 'inativo' ? 'opacity-60' : ''
          }`}>
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    modulo.status === 'ativo' ? 'bg-primary/10' : 'bg-gray-100'
                  }`}>
                    <modulo.icone className={`h-5 w-5 ${
                      modulo.status === 'ativo' ? 'text-primary' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <CardTitle className="font-cantarell text-lg font-semibold">
                      {modulo.nome}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {getCategoriaBadge(modulo.categoria)}
                      <Badge variant={modulo.status === 'ativo' ? 'default' : 'secondary'}>
                        {modulo.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Switch
                  checked={modulo.status === 'ativo'}
                  onCheckedChange={() => toggleModulo(modulo.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-inter text-sm text-muted-foreground mb-4">
                {modulo.descricao}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Empresas usando:</span>
                  <span className="font-inter text-sm font-medium">
                    {modulo.empresasUsando} / {modulo.totalEmpresas}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${getUsagePercentage(modulo.empresasUsando, modulo.totalEmpresas)}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Adoção: {getUsagePercentage(modulo.empresasUsando, modulo.totalEmpresas)}%</span>
                  <span>{modulo.totalEmpresas - modulo.empresasUsando} não utilizam</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 font-inter">
                  Configurar
                </Button>
                <Button variant="outline" size="sm" className="flex-1 font-inter">
                  Empresas
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configurações Globais */}
      <Card>
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Configurações Globais de Módulos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-inter font-semibold">Configurações Padrão</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Auto-ativar novos módulos</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Notificar empresas sobre novos módulos</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm">Período de teste gratuito (dias)</span>
                  <span className="font-inter text-sm font-medium">30</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-inter font-semibold">Ações em Massa</h4>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="font-inter">
                  Ativar todos os módulos para empresa
                </Button>
                <Button variant="outline" className="font-inter">
                  Exportar configurações de módulos
                </Button>
                <Button variant="outline" className="font-inter">
                  Importar configurações
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminModulos;

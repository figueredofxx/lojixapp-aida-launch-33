
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Construction, Rocket, Calendar } from "lucide-react";

const MultiLojasPage = () => {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
              Multi-Lojas
            </h1>
            <Badge variant="secondary" className="font-inter">
              Beta
            </Badge>
          </div>
          <p className="font-inter text-sm text-muted-foreground">
            Funcionalidade em desenvolvimento - Gerencie múltiplas lojas em uma única plataforma
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Building2 className="h-16 w-16 text-muted-foreground/50" />
                <div className="absolute -top-2 -right-2">
                  <Construction className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>
            
            <h2 className="font-cantarell text-2xl font-bold text-foreground mb-4">
              Funcionalidade em Desenvolvimento
            </h2>
            
            <p className="font-inter text-muted-foreground mb-8 max-w-2xl mx-auto">
              Estamos trabalhando para trazer a funcionalidade de Multi-Lojas para você. 
              Em breve você poderá gerenciar múltiplas filiais, controlar estoque entre lojas, 
              transferir produtos e ter relatórios consolidados.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-secondary/30 rounded-lg">
                <Building2 className="h-8 w-8 text-primary mb-3 mx-auto" />
                <h3 className="font-cantarell font-semibold mb-2">Múltiplas Filiais</h3>
                <p className="font-inter text-sm text-muted-foreground">
                  Gerencie quantas lojas precisar em uma única plataforma
                </p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <Rocket className="h-8 w-8 text-primary mb-3 mx-auto" />
                <h3 className="font-cantarell font-semibold mb-2">Controle Centralizado</h3>
                <p className="font-inter text-sm text-muted-foreground">
                  Veja o desempenho de todas as lojas em tempo real
                </p>
              </div>
              
              <div className="p-6 bg-secondary/30 rounded-lg">
                <Calendar className="h-8 w-8 text-primary mb-3 mx-auto" />
                <h3 className="font-cantarell font-semibold mb-2">Em Breve</h3>
                <p className="font-inter text-sm text-muted-foreground">
                  Previsão de lançamento para o primeiro trimestre de 2025
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button variant="outline" size="lg" className="font-inter">
                Ser Notificado do Lançamento
              </Button>
              <p className="font-inter text-xs text-muted-foreground">
                Você receberá um email quando a funcionalidade estiver disponível
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiLojasPage;

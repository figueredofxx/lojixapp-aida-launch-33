
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CashRegister, DollarSign, ArrowUp, ArrowDown, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CaixaDialogProps {
  children: React.ReactNode;
}

const CaixaDialog = ({ children }: CaixaDialogProps) => {
  const [caixaAberto, setCaixaAberto] = useState(false);
  const [trocoInicial, setTrocoInicial] = useState("100.00");
  const [valorOperacao, setValorOperacao] = useState("");
  const [motivoOperacao, setMotivoOperacao] = useState("");
  const [saldoAtual, setSaldoAtual] = useState(100.00);

  const abrirCaixa = () => {
    setCaixaAberto(true);
    setSaldoAtual(parseFloat(trocoInicial));
  };

  const fecharCaixa = () => {
    setCaixaAberto(false);
    setSaldoAtual(0);
  };

  const realizarSangria = () => {
    const valor = parseFloat(valorOperacao);
    if (valor > 0) {
      setSaldoAtual(prev => prev - valor);
      setValorOperacao("");
      setMotivoOperacao("");
    }
  };

  const realizarSuprimento = () => {
    const valor = parseFloat(valorOperacao);
    if (valor > 0) {
      setSaldoAtual(prev => prev + valor);
      setValorOperacao("");
      setMotivoOperacao("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-cantarell text-xl font-semibold flex items-center">
            <CashRegister className="h-5 w-5 mr-2" />
            Gerenciar Caixa
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Status do Caixa */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-cantarell text-lg flex items-center justify-between">
                Status do Caixa
                <Badge variant={caixaAberto ? "default" : "secondary"} className="font-inter">
                  {caixaAberto ? "Aberto" : "Fechado"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="font-inter text-sm text-muted-foreground">Saldo Atual</p>
                <p className="font-cantarell text-2xl font-bold text-primary">
                  R$ {saldoAtual.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </CardContent>
          </Card>

          {!caixaAberto ? (
            /* Abertura do Caixa */
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="troco" className="font-inter">Valor para Troco Inicial</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="troco"
                    placeholder="100,00"
                    className="pl-9 font-inter"
                    value={trocoInicial}
                    onChange={(e) => setTrocoInicial(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={abrirCaixa} className="w-full font-inter">
                <CashRegister className="mr-2 h-4 w-4" />
                Abrir Caixa
              </Button>
            </div>
          ) : (
            /* Operações do Caixa */
            <div className="space-y-4">
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-cantarell font-semibold">Operações de Caixa</h4>
                
                <div className="grid gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="valor" className="font-inter">Valor da Operação</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="valor"
                        placeholder="0,00"
                        className="pl-9 font-inter"
                        value={valorOperacao}
                        onChange={(e) => setValorOperacao(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="motivo" className="font-inter">Motivo</Label>
                    <Input
                      id="motivo"
                      placeholder="Descreva o motivo..."
                      className="font-inter"
                      value={motivoOperacao}
                      onChange={(e) => setMotivoOperacao(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={realizarSangria}
                    disabled={!valorOperacao || parseFloat(valorOperacao) <= 0}
                    className="font-inter"
                  >
                    <ArrowDown className="mr-2 h-4 w-4 text-red-500" />
                    Sangria
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={realizarSuprimento}
                    disabled={!valorOperacao || parseFloat(valorOperacao) <= 0}
                    className="font-inter"
                  >
                    <ArrowUp className="mr-2 h-4 w-4 text-green-500" />
                    Suprimento
                  </Button>
                </div>
              </div>

              <Separator />
              
              <Button 
                variant="outline" 
                onClick={fecharCaixa}
                className="w-full font-inter"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Fechar Caixa
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaixaDialog;

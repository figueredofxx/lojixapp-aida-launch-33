
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OnboardingData } from "@/hooks/useOnboarding";
import { Check, Mail, Building2, CreditCard } from "lucide-react";

interface ConfirmationStepProps {
  data: OnboardingData;
  onFinish: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

const ConfirmationStep = ({ data, onFinish, onPrev, isLoading }: ConfirmationStepProps) => {
  const getPlanDetails = (planId: string) => {
    const plans = {
      basico: { name: "Básico", price: "R$ 49/mês" },
      profissional: { name: "Profissional", price: "R$ 99/mês" },
      empresarial: { name: "Empresarial", price: "R$ 199/mês" },
    };
    return plans[planId as keyof typeof plans] || { name: "N/A", price: "N/A" };
  };

  const planDetails = getPlanDetails(data.plano);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="font-cantarell text-3xl font-bold text-foreground mb-2">
          Quase pronto!
        </h2>
        <p className="font-inter text-sm text-muted-foreground">
          Confirme seus dados e comece seu teste grátis
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="font-cantarell text-xl font-semibold text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Resumo do Cadastro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-inter text-sm font-medium text-muted-foreground mb-1">
                Dados Pessoais
              </h4>
              <p className="font-inter text-sm text-foreground">{data.nome}</p>
              <p className="font-inter text-sm text-muted-foreground">{data.email}</p>
            </div>
            
            <div>
              <h4 className="font-inter text-sm font-medium text-muted-foreground mb-1">
                Empresa
              </h4>
              <p className="font-inter text-sm text-foreground">{data.nomeEmpresa}</p>
              <p className="font-inter text-sm text-muted-foreground">
                {data.setor} • {data.tamanhoEmpresa}
              </p>
              <p className="font-inter text-sm text-muted-foreground">
                {data.cidade}, {data.estado}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-inter text-sm font-medium text-foreground">
                  Plano {planDetails.name}
                </h4>
                <p className="font-inter text-sm text-muted-foreground">
                  {planDetails.price}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="font-inter bg-green-100 text-green-800">
              7 dias grátis
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-inter text-sm font-medium text-blue-900 mb-1">
                Confirmação por Email
              </h4>
              <p className="font-inter text-sm text-blue-700">
                Enviaremos um email de confirmação para <strong>{data.email}</strong> com 
                as instruções para acessar sua conta.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mb-6">
        <p className="font-inter text-xs text-muted-foreground">
          Ao finalizar, você concorda com nossos{" "}
          <a href="#" className="text-primary hover:underline">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </p>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="font-inter font-medium"
          disabled={isLoading}
        >
          Voltar
        </Button>
        <Button
          onClick={onFinish}
          className="flex-1 font-inter font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Finalizando..." : "Finalizar Cadastro"}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;

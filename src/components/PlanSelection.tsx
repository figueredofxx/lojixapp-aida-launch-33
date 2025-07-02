
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OnboardingData } from "@/hooks/useOnboarding";
import { Check } from "lucide-react";

interface PlanSelectionProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

const PlanSelection = ({ data, onUpdate, onNext, onPrev, isLoading }: PlanSelectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState(data.plano);

  const plans = [
    {
      id: "basico",
      name: "Básico",
      price: "R$ 49",
      period: "/mês",
      description: "Ideal para pequenos negócios",
      features: [
        "Até 100 produtos",
        "1 usuário",
        "Vendas básicas",
        "Controle de estoque",
        "Relatórios básicos",
        "Suporte por email"
      ],
      popular: false,
    },
    {
      id: "profissional",
      name: "Profissional",
      price: "R$ 99",
      period: "/mês",
      description: "Para empresas em crescimento",
      features: [
        "Produtos ilimitados",
        "Até 5 usuários",
        "PDV completo",
        "Gestão financeira",
        "Relatórios avançados",
        "Multi-lojas",
        "Integração com marketplace",
        "Suporte prioritário"
      ],
      popular: true,
    },
    {
      id: "empresarial",
      name: "Empresarial",
      price: "R$ 199",
      period: "/mês",
      description: "Para grandes operações",
      features: [
        "Tudo do Profissional",
        "Usuários ilimitados",
        "API personalizada",
        "Automações avançadas",
        "Dashboard executivo",
        "Gestor de cliente dedicado",
        "Suporte telefônico 24/7",
        "Treinamentos inclusos"
      ],
      popular: false,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    onUpdate({ plano: planId });
  };

  const handleSubmit = () => {
    if (selectedPlan) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-cantarell text-3xl font-bold text-foreground mb-2">
          Escolha seu plano
        </h2>
        <p className="font-inter text-sm text-muted-foreground">
          Comece com 7 dias grátis. Cancele quando quiser.
        </p>
        <div className="mt-4">
          <Badge variant="secondary" className="font-inter bg-green-100 text-green-800">
            🎉 7 dias grátis em qualquer plano
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? "ring-2 ring-primary shadow-lg"
                : "hover:shadow-md"
            } ${plan.popular ? "border-primary" : ""}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="font-inter bg-primary text-white">
                  Mais Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="font-cantarell text-xl font-bold text-foreground">
                {plan.name}
              </CardTitle>
              <div className="mt-2">
                <span className="font-cantarell text-3xl font-bold text-primary">
                  {plan.price}
                </span>
                <span className="font-inter text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>
              <p className="font-inter text-sm text-muted-foreground mt-2">
                {plan.description}
              </p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="font-inter text-sm text-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full mt-6 font-inter font-medium ${
                  selectedPlan === plan.id
                    ? "bg-primary hover:bg-primary-hover"
                    : "variant-outline"
                }`}
                variant={selectedPlan === plan.id ? "default" : "outline"}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {selectedPlan === plan.id ? "Plano Selecionado" : "Selecionar Plano"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
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
          onClick={handleSubmit}
          className="font-inter font-medium"
          disabled={isLoading || !selectedPlan}
        >
          {isLoading ? "Processando..." : "Iniciar Teste Grátis"}
        </Button>
      </div>
    </div>
  );
};

export default PlanSelection;

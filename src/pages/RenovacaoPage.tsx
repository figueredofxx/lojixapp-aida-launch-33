
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ArrowRight, Clock, CreditCard, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const RenovacaoPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("profissional");

  const currentPlan = {
    name: "Profissional",
    expiresIn: 5,
    nextBilling: "15/12/2024"
  };

  const plans = [
    {
      id: "essencial",
      name: "Essencial",
      price: "97",
      originalPrice: null,
      discount: null,
      features: ["Até 1.000 produtos", "1 usuário", "Controle básico"]
    },
    {
      id: "profissional", 
      name: "Profissional",
      price: "197",
      originalPrice: "240",
      discount: "18%",
      features: ["Produtos ilimitados", "3 usuários", "Gestão de IMEI"]
    },
    {
      id: "enterprise",
      name: "Enterprise", 
      price: "397",
      originalPrice: "480",
      discount: "17%",
      features: ["Tudo do Profissional", "Usuários ilimitados", "API personalizada"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-cantarell font-bold text-sm">L</span>
              </div>
              <span className="font-cantarell font-bold text-lg text-foreground">LojixApp</span>
            </Link>
            <Badge variant="outline" className="font-inter">
              <Clock className="h-3 w-3 mr-1" />
              Expira em {currentPlan.expiresIn} dias
            </Badge>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-16">
        {/* Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-cantarell font-semibold text-amber-900 mb-1">
                Seu plano vence em breve!
              </h3>
              <p className="font-inter text-sm text-amber-800">
                Seu plano <strong>{currentPlan.name}</strong> expira em <strong>{currentPlan.expiresIn} dias</strong> (dia {currentPlan.nextBilling}). 
                Renove agora para não perder o acesso às suas funcionalidades.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-cantarell text-3xl md:text-4xl font-bold text-foreground mb-4">
            Renovar <span className="text-primary">Assinatura</span>
          </h1>
          <p className="font-inter text-lg text-muted-foreground">
            Continue aproveitando todas as funcionalidades do LojixApp
          </p>
        </div>

        {/* Current Plan Summary */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="font-cantarell text-lg flex items-center">
              <Star className="h-5 w-5 text-primary mr-2" />
              Plano Atual: {currentPlan.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="font-inter text-sm text-muted-foreground">Status</p>
                <p className="font-cantarell font-semibold text-amber-600">Expira em {currentPlan.expiresIn} dias</p>
              </div>
              <div>
                <p className="font-inter text-sm text-muted-foreground">Próximo vencimento</p>
                <p className="font-cantarell font-semibold text-foreground">{currentPlan.nextBilling}</p>
              </div>
              <div>
                <p className="font-inter text-sm text-muted-foreground">Valor mensal</p>
                <p className="font-cantarell font-semibold text-foreground">R$ 197,00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan Selection */}
        <div className="space-y-4 mb-8">
          <h2 className="font-cantarell text-xl font-semibold text-foreground mb-6">
            Escolha seu plano de renovação
          </h2>
          
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id 
                  ? 'border-primary shadow-md bg-primary/5' 
                  : 'border-border hover:shadow-sm'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedPlan === plan.id 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground'
                    }`}>
                      {selectedPlan === plan.id && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-cantarell font-semibold text-foreground">
                        {plan.name}
                      </h3>
                      <p className="font-inter text-sm text-muted-foreground">
                        {plan.features.join(" • ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {plan.originalPrice && (
                        <span className="font-inter text-sm text-muted-foreground line-through">
                          R$ {plan.originalPrice}
                        </span>
                      )}
                      <span className="font-cantarell text-xl font-bold text-foreground">
                        R$ {plan.price}
                      </span>
                      <span className="font-inter text-sm text-muted-foreground">/mês</span>
                    </div>
                    {plan.discount && (
                      <Badge variant="secondary" className="mt-1 font-inter text-xs">
                        {plan.discount} OFF
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-cantarell text-lg">Resumo do Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between font-inter">
                <span>Plano selecionado:</span>
                <span className="font-semibold">
                  {plans.find(p => p.id === selectedPlan)?.name}
                </span>
              </div>
              <div className="flex justify-between font-inter">
                <span>Valor mensal:</span>
                <span className="font-semibold">
                  R$ {plans.find(p => p.id === selectedPlan)?.price},00
                </span>
              </div>
              <div className="flex justify-between font-inter">
                <span>Próximo vencimento:</span>
                <span className="font-semibold">15/01/2025</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-cantarell text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  R$ {plans.find(p => p.id === selectedPlan)?.price},00/mês
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 bg-primary hover:bg-primary-hover font-inter h-12">
            <CreditCard className="mr-2 h-4 w-4" />
            Renovar Assinatura
          </Button>
          <Button variant="outline" className="font-inter" asChild>
            <Link to="/dashboard">Voltar ao Dashboard</Link>
          </Button>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="font-inter text-sm text-muted-foreground">
            Pagamento seguro • Cancele quando quiser • Suporte 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default RenovacaoPage;

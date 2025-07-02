import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Star, ArrowRight } from "lucide-react";

const PlanosPage = () => {
  const plans = [
    {
      name: "Essencial",
      description: "Para pequenas lojas iniciantes",
      price: "97",
      period: "/mês",
      badge: null,
      features: [
        "Até 1.000 produtos",
        "1 usuário",
        "Controle básico de estoque",
        "Vendas e PDV",
        "Relatórios básicos",
        "Suporte por email",
        "Backup automático"
      ],
      cta: "Começar Grátis",
      popular: false
    },
    {
      name: "Profissional",
      description: "Para lojistas de smartphones",
      price: "197",
      period: "/mês",
      badge: "MAIS POPULAR",
      features: [
        "Produtos ilimitados",
        "3 usuários",
        "Controle avançado de estoque", 
        "Gestão de IMEI/Serial",
        "Controle de garantias",
        "Relatórios avançados",
        "Integração com marketplaces",
        "Suporte prioritário",
        "Treinamento incluído"
      ],
      cta: "Começar Grátis",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Para importadores e grandes lojas",
      price: "397",
      period: "/mês",
      badge: null,
      features: [
        "Tudo do Profissional",
        "Usuários ilimitados",
        "Gestão de importação",
        "Cálculo de custos internacionais",
        "Multi-lojas",
        "API personalizada",
        "Relatórios personalizados",
        "Suporte dedicado 24/7",
        "Implementação personalizada"
      ],
      cta: "Falar com Vendas",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-cantarell font-bold text-sm">L</span>
              </div>
              <span className="font-cantarell font-bold text-lg text-foreground">LojixApp</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-cantarell text-4xl md:text-5xl font-bold text-foreground mb-6">
            Escolha o plano <span className="text-primary">perfeito</span> para seu negócio
          </h1>
          <p className="font-inter text-lg text-muted-foreground mb-8">
            Comece grátis por 15 dias e experimente todas as funcionalidades. Cancele quando quiser.
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-secondary rounded-lg">
            <span className="font-inter text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground">
              Mensal
            </span>
            <span className="font-inter text-sm px-4 py-2 text-muted-foreground">
              Anual (2 meses grátis)
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative border-border hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full font-inter text-sm font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <h3 className="font-cantarell text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="font-inter text-muted-foreground mb-6">
                  {plan.description}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-cantarell text-4xl font-bold text-foreground">
                    R$ {plan.price}
                  </span>
                  <span className="font-inter text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-sm text-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full font-inter font-semibold h-12 ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary-hover text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground border border-border'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                {/* Trial Info */}
                <p className="text-center font-inter text-xs text-muted-foreground mt-4">
                  15 dias grátis • Cancele quando quiser
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-secondary/30 rounded-2xl p-8">
          <h3 className="font-cantarell text-2xl font-bold text-foreground text-center mb-8">
            Compare todos os recursos
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-inter font-semibold text-foreground py-4">Recursos</th>
                  <th className="text-center font-inter font-semibold text-foreground py-4">Essencial</th>
                  <th className="text-center font-inter font-semibold text-foreground py-4">Profissional</th>
                  <th className="text-center font-inter font-semibold text-foreground py-4">Enterprise</th>
                </tr>
              </thead>
              <tbody className="font-inter text-sm">
                <tr className="border-b border-border">
                  <td className="py-4 text-foreground">Produtos cadastrados</td>
                  <td className="py-4 text-center text-muted-foreground">1.000</td>
                  <td className="py-4 text-center text-foreground">Ilimitados</td>
                  <td className="py-4 text-center text-foreground">Ilimitados</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 text-foreground">Usuários simultâneos</td>
                  <td className="py-4 text-center text-muted-foreground">1</td>
                  <td className="py-4 text-center text-foreground">3</td>
                  <td className="py-4 text-center text-foreground">Ilimitados</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 text-foreground">Gestão de IMEI/Serial</td>
                  <td className="py-4 text-center text-muted-foreground">❌</td>
                  <td className="py-4 text-center text-primary">✓</td>
                  <td className="py-4 text-center text-primary">✓</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 text-foreground">Suporte</td>
                  <td className="py-4 text-center text-muted-foreground">Email</td>
                  <td className="py-4 text-center text-foreground">Prioritário</td>
                  <td className="py-4 text-center text-foreground">24/7 Dedicado</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="font-cantarell text-2xl font-bold text-foreground text-center mb-8">
            Dúvidas Frequentes
          </h3>
          <div className="grid gap-6">
            <div className="p-6 rounded-lg bg-secondary/50">
              <h4 className="font-cantarell font-semibold text-foreground mb-2">
                Posso trocar de plano a qualquer momento?
              </h4>
              <p className="font-inter text-sm text-muted-foreground">
                Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                As mudanças são aplicadas imediatamente e o valor é calculado proporcionalmente.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-secondary/50">
              <h4 className="font-cantarell font-semibold text-foreground mb-2">
                Como funciona o período gratuito?
              </h4>
              <p className="font-inter text-sm text-muted-foreground">
                Durante os 15 dias grátis você tem acesso completo a todas as funcionalidades do plano escolhido, 
                sem qualquer limitação. Não cobramos cartão de crédito antecipadamente.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-secondary/50">
              <h4 className="font-cantarell font-semibold text-foreground mb-2">
                Posso cancelar a qualquer momento?
              </h4>
              <p className="font-inter text-sm text-muted-foreground">
                Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas de cancelamento. 
                Seus dados ficam seguros por 30 dias após o cancelamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanosPage;

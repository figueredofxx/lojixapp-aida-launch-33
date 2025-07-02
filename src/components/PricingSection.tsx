import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Star, ArrowRight } from "lucide-react";

const PricingSection = () => {
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
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-cantarell text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Planos que <span className="text-primary">cabem no seu bolso</span> e crescem com você
          </h2>
          <p className="font-inter text-lg text-muted-foreground mb-8">
            Sem surpresas, sem taxas escondidas. Comece grátis e pague apenas quando vender mais.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="font-cantarell text-2xl font-bold text-foreground text-center mb-8">
            Perguntas Frequentes sobre Preços
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
                Existe desconto para pagamento anual?
              </h4>
              <p className="font-inter text-sm text-muted-foreground">
                Sim! Pagando anualmente você economiza o equivalente a 2 meses grátis em todos os planos.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-secondary/50">
              <h4 className="font-cantarell font-semibold text-foreground mb-2">
                O período gratuito tem alguma limitação?
              </h4>
              <p className="font-inter text-sm text-muted-foreground">
                Durante os 15 dias grátis você tem acesso completo a todas as funcionalidades do plano escolhido, 
                sem qualquer limitação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
import { Card, CardContent } from "@/components/ui/card";
import { 
  Package, 
  Smartphone, 
  Plane, 
  BarChart3, 
  Shield, 
  Clock,
  DollarSign,
  Users,
  CheckCircle
} from "lucide-react";

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: Package,
      title: "Controle de Estoque Inteligente",
      description: "Gerencie seu inventário em tempo real, receba alertas de estoque baixo e nunca mais perca vendas por falta de produto.",
      benefits: ["Alertas automáticos", "Rastreamento em tempo real", "Integração com vendas"]
    },
    {
      icon: Smartphone,
      title: "Gestão Especializada para Smartphones",
      description: "Controle de IMEI, números de série, garantias e histórico completo de cada aparelho vendido.",
      benefits: ["Registro de IMEI/Serial", "Controle de garantia", "Histórico completo"]
    },
    {
      icon: Plane,
      title: "Importação Simplificada",
      description: "Calcule custos reais de importação, acompanhe pedidos internacionais e gerencie fornecedores estrangeiros.",
      benefits: ["Cálculo de custos", "Tracking de pedidos", "Gestão de fornecedores"]
    }
  ];

  const additionalFeatures = [
    {
      icon: BarChart3,
      title: "Relatórios Inteligentes",
      description: "Dashboards claros que mostram o que realmente importa para seu negócio."
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Seus dados protegidos com criptografia e backup automático na nuvem."
    },
    {
      icon: Clock,
      title: "Acesso 24/7",
      description: "Sistema sempre disponível, acesse de qualquer lugar, a qualquer hora."
    },
    {
      icon: DollarSign,
      title: "ROI Garantido",
      description: "Economia média de 20% nos custos operacionais no primeiro ano."
    },
    {
      icon: Users,
      title: "Suporte Especializado",
      description: "Time brasileiro especializado em varejo e importação."
    },
    {
      icon: CheckCircle,
      title: "Fácil de Usar",
      description: "Interface intuitiva que sua equipe aprende em poucos minutos."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-cantarell text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Tudo que você precisa para{" "}
            <span className="text-primary">fazer sua loja crescer</span>
          </h2>
          <p className="font-inter text-lg text-muted-foreground">
            Desenvolvido especificamente para as necessidades reais de lojistas brasileiros, 
            com funcionalidades que outros sistemas não têm.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-cantarell text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="font-inter text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-cantarell text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="font-inter text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
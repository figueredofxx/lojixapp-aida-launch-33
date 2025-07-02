import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, X, CheckCircle, CreditCard, Globe, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-background to-secondary/50 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm font-inter text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            Mais de 1.000 lojistas já usam o LojixApp
          </div>

          {/* Main Headline */}
          <h1 className="font-cantarell text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            O ERP que{" "}
            <span className="text-primary">simplifica</span>{" "}
            sua loja
          </h1>

          {/* Subheadline */}
          <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Pare de perder vendas por falta de controle. O LojixApp é o sistema completo para 
            <strong className="text-foreground"> pequenos lojistas, lojistas de smartphones e importadores</strong> que 
            querem crescer sem complicação.
          </p>

          {/* Pain Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl text-sm font-inter">
            <div className="flex items-center justify-center p-3 rounded-lg bg-destructive/10 text-destructive">
              <X className="h-4 w-4 mr-2 flex-shrink-0" />
              Estoque descontrolado
            </div>
            <div className="flex items-center justify-center p-3 rounded-lg bg-destructive/10 text-destructive">
              <X className="h-4 w-4 mr-2 flex-shrink-0" />
              Perda de garantias
            </div>
            <div className="flex items-center justify-center p-3 rounded-lg bg-destructive/10 text-destructive">
              <X className="h-4 w-4 mr-2 flex-shrink-0" />
              Custos de importação confusos
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="font-inter font-semibold bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 h-auto"
            >
              Experimente Grátis por 15 Dias
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-inter font-semibold border-border hover:bg-secondary px-8 py-4 h-auto"
            >
              <Play className="mr-2 h-5 w-5" />
              Ver Demonstração
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-inter text-muted-foreground">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Sem cartão de crédito
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              Suporte em português
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Setup em 24h
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
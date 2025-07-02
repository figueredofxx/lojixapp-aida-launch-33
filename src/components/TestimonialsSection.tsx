import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Sparkles } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      role: "Proprietário - Loja TechMobile",
      location: "São Paulo, SP",
      avatar: "CM",
      rating: 5,
      testimonial: "O LojixApp revolucionou minha loja de celulares. Agora tenho controle total dos IMEIs, garantias e nunca mais perdi um cliente por não saber se tinha o produto em estoque.",
      highlight: "Aumento de 35% nas vendas em 6 meses"
    },
    {
      name: "Ana Paula Silva",
      role: "Importadora - Silva Import",
      location: "Rio de Janeiro, RJ",
      avatar: "AS",
      rating: 5,
      testimonial: "Como importadora, sempre tive dificuldade para calcular custos reais. O LojixApp me ajuda a precificar corretamente e acompanhar todos os pedidos internacionais.",
      highlight: "Redução de 40% nos erros de precificação"
    },
    {
      name: "Roberto Oliveira",
      role: "Lojista - Oliveira Eletrônicos", 
      location: "Belo Horizonte, MG",
      avatar: "RO",
      rating: 5,
      testimonial: "Sistema simples e completo. Minha equipe aprendeu rapidamente e agora conseguimos atender mais clientes com muito mais organização.",
      highlight: "ROI de 280% no primeiro ano"
    }
  ];

  const stats = [
    { number: "1.000+", label: "Lojistas ativos" },
    { number: "R$ 50M+", label: "Vendas processadas" },
    { number: "99.9%", label: "Uptime garantido" },
    { number: "4.9/5", label: "Avaliação média" }
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-cantarell text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mais de <span className="text-primary">1.000 lojistas</span> já cresceram com o LojixApp
          </h2>
          <p className="font-inter text-lg text-muted-foreground">
            Veja como outros empresários como você transformaram seus negócios
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-cantarell text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="font-inter text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border relative">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="font-inter text-foreground mb-6 leading-relaxed">
                  "{testimonial.testimonial}"
                </p>

                {/* Highlight */}
                <div className="bg-primary/10 rounded-lg p-3 mb-6">
                  <p className="font-inter text-sm font-semibold text-primary flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    {testimonial.highlight}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-cantarell font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-cantarell font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="font-inter text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="font-inter text-xs text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Proof */}
        <div className="text-center mt-16">
          <p className="font-inter text-muted-foreground mb-4">
            Junte-se a centenas de lojistas que já escolheram o LojixApp
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="font-cantarell font-semibold text-lg">TechMobile</div>
            <div className="font-cantarell font-semibold text-lg">Silva Import</div>
            <div className="font-cantarell font-semibold text-lg">Oliveira Eletrônicos</div>
            <div className="font-cantarell font-semibold text-lg">+ 997 outros</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
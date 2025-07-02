import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MessageCircle, 
  Download,
  Calendar,
  Users,
  Zap,
  CheckCircle,
  Clock,
  Shield,
  CreditCard,
  Globe
} from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Ligue Agora",
      description: "Fale direto com nosso time de vendas",
      action: "(11) 99999-9999",
      cta: "Ligar",
      highlight: "Resposta imediata"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Business",
      description: "Tire suas dúvidas pelo WhatsApp",
      action: "Iniciar conversa",
      cta: "Conversar",
      highlight: "Online agora"
    },
    {
      icon: Calendar,
      title: "Demonstração Personalizada",
      description: "Veja o LojixApp funcionando na sua loja",
      action: "Agendar demo",
      cta: "Agendar",
      highlight: "30 minutos"
    }
  ];

  const resources = [
    {
      icon: Download,
      title: "Guia Completo do ERP",
      description: "E-book gratuito: Como escolher o ERP ideal para sua loja"
    },
    {
      icon: Users,
      title: "Webinar Gratuito",
      description: "Aula ao vivo: Gestão de Estoque para Lojistas"
    },
    {
      icon: Zap,
      title: "Checklist de Vendas",
      description: "10 dicas para aumentar suas vendas em 30 dias"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-cantarell text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pronto para <span className="text-primary">transformar sua loja</span>?
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
              Fale com nossa equipe especializada e descubra como o LojixApp pode 
              revolucionar seu negócio. Setup completo em menos de 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="font-cantarell text-2xl font-bold text-foreground mb-2">
                    Solicite uma Demonstração Gratuita
                  </h3>
                  <p className="font-inter text-muted-foreground">
                    Preencha o formulário e nossa equipe entrará em contato em até 2 horas
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="font-inter text-sm font-medium text-foreground">
                        Nome *
                      </Label>
                      <Input 
                        id="firstName"
                        placeholder="Seu nome"
                        className="mt-1 font-inter"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="font-inter text-sm font-medium text-foreground">
                        Sobrenome *
                      </Label>
                      <Input 
                        id="lastName"
                        placeholder="Seu sobrenome"
                        className="mt-1 font-inter"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-inter text-sm font-medium text-foreground">
                      E-mail *
                    </Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="mt-1 font-inter"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-inter text-sm font-medium text-foreground">
                      Telefone/WhatsApp *
                    </Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="mt-1 font-inter"
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessType" className="font-inter text-sm font-medium text-foreground">
                      Tipo de Negócio
                    </Label>
                    <select 
                      id="businessType"
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-inter ring-offset-background focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Selecione...</option>
                      <option value="loja-geral">Loja em Geral</option>
                      <option value="smartphones">Loja de Smartphones</option>
                      <option value="importador">Importador</option>
                      <option value="multiplas-lojas">Múltiplas Lojas</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="font-inter text-sm font-medium text-foreground">
                      Mensagem (Opcional)
                    </Label>
                    <Textarea 
                      id="message"
                      placeholder="Conte-nos mais sobre sua loja e necessidades..."
                      className="mt-1 font-inter min-h-[100px]"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-inter font-semibold h-12"
                  >
                    Solicitar Demonstração Gratuita
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <p className="text-center font-inter text-xs text-muted-foreground">
                    Ao enviar, você concorda em receber comunicações da LojixApp. 
                    Seus dados estão seguros conosco.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Contact Methods & Resources */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div>
                <h3 className="font-cantarell text-xl font-bold text-foreground mb-6">
                  Prefere falar agora?
                </h3>
                <div className="grid gap-4">
                  {contactMethods.map((method, index) => (
                    <Card key={index} className="border-border hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                            <method.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-cantarell font-semibold text-foreground">
                                {method.title}
                              </h4>
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-inter">
                                {method.highlight}
                              </span>
                            </div>
                            <p className="font-inter text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="font-inter">
                            {method.cta}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Free Resources */}
              <div>
                <h3 className="font-cantarell text-xl font-bold text-foreground mb-6">
                  Recursos Gratuitos
                </h3>
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                        <resource.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-cantarell font-semibold text-foreground mb-1">
                          {resource.title}
                        </h4>
                        <p className="font-inter text-sm text-muted-foreground">
                          {resource.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="font-inter text-primary hover:text-primary-hover">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <Card className="border-border bg-primary/5">
                <CardContent className="p-6 text-center">
                  <h4 className="font-cantarell font-bold text-foreground mb-4">
                    Por que escolher a LojixApp?
                  </h4>
                  <div className="grid grid-cols-1 gap-3 text-sm font-inter">
                    <div className="flex items-center justify-center gap-3">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Setup em 24h ou menos</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Globe className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Suporte 100% em português</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Dados seguros na nuvem</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <CreditCard className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>15 dias grátis, sem compromisso</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
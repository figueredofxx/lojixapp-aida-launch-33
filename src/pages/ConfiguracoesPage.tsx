
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Settings, Building2, MapPin, Phone, Mail, FileText, Save, Upload, Edit, Shield } from "lucide-react";

const ConfiguracoesPage = () => {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-cantarell text-3xl font-bold tracking-tight text-foreground">
            Configurações
          </h1>
          <p className="font-inter text-sm text-muted-foreground">
            Gerencie as informações da sua empresa e sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-inter">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button className="bg-primary hover:bg-primary-hover font-inter">
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Company Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Informações da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="razao-social" className="font-inter">Razão Social</Label>
                  <Input 
                    id="razao-social" 
                    defaultValue="LojixApp Tecnologia LTDA" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome-fantasia" className="font-inter">Nome Fantasia</Label>
                  <Input 
                    id="nome-fantasia" 
                    defaultValue="LojixApp" 
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cnpj" className="font-inter">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    defaultValue="12.345.678/0001-90" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ie" className="font-inter">Inscrição Estadual</Label>
                  <Input 
                    id="ie" 
                    defaultValue="123.456.789.012" 
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao" className="font-inter">Descrição da Empresa</Label>
                <Textarea 
                  id="descricao" 
                  defaultValue="Empresa especializada em tecnologia e soluções para varejo, oferecendo produtos eletrônicos de alta qualidade e atendimento diferenciado."
                  className="font-inter"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Informações de Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="font-inter">Telefone Principal</Label>
                  <Input 
                    id="telefone" 
                    defaultValue="(11) 3456-7890" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="font-inter">WhatsApp</Label>
                  <Input 
                    id="whatsapp" 
                    defaultValue="(11) 99999-9999" 
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-inter">E-mail Principal</Label>
                  <Input 
                    id="email" 
                    type="email"
                    defaultValue="contato@lojixapp.com" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-vendas" className="font-inter">E-mail Vendas</Label>
                  <Input 
                    id="email-vendas" 
                    type="email"
                    defaultValue="vendas@lojixapp.com" 
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="font-inter">Website</Label>
                <Input 
                  id="website" 
                  defaultValue="www.lojixapp.com" 
                  className="font-inter"
                />
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="cep" className="font-inter">CEP</Label>
                  <Input 
                    id="cep" 
                    defaultValue="01310-100" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="endereco" className="font-inter">Endereço</Label>
                  <Input 
                    id="endereco" 
                    defaultValue="Av. Paulista, 1234" 
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="numero" className="font-inter">Número</Label>
                  <Input 
                    id="numero" 
                    defaultValue="1234" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complemento" className="font-inter">Complemento</Label>
                  <Input 
                    id="complemento" 
                    defaultValue="Sala 501" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bairro" className="font-inter">Bairro</Label>
                  <Input 
                    id="bairro" 
                    defaultValue="Bela Vista" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade" className="font-inter">Cidade</Label>
                  <Input 
                    id="cidade" 
                    defaultValue="São Paulo" 
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="estado" className="font-inter">Estado</Label>
                  <Input 
                    id="estado" 
                    defaultValue="São Paulo" 
                    className="font-inter"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pais" className="font-inter">País</Label>
                  <Input 
                    id="pais" 
                    defaultValue="Brasil" 
                    className="font-inter"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Logo and Quick Settings */}
        <div className="space-y-6">
          {/* Company Logo */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold">
                Logo da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <Building2 className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="font-inter text-sm text-muted-foreground">Logo Atual</p>
                  </div>
                </div>
                <Button className="w-full font-inter" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Alterar Logo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="moeda" className="font-inter">Moeda</Label>
                <Input 
                  id="moeda" 
                  defaultValue="Real (R$)" 
                  className="font-inter"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuso" className="font-inter">Fuso Horário</Label>
                <Input 
                  id="fuso" 
                  defaultValue="América/São_Paulo" 
                  className="font-inter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="formato-data" className="font-inter">Formato de Data</Label>
                <Input 
                  id="formato-data" 
                  defaultValue="DD/MM/AAAA" 
                  className="font-inter"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="font-inter">Versão do Sistema</Label>
                <p className="font-inter text-sm text-muted-foreground">
                  LojixApp v2.1.0
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Warranty Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Termo de Garantia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="garantia-padrao" className="font-inter">Garantia Padrão</Label>
                <Textarea 
                  id="garantia-padrao" 
                  defaultValue="12 meses contra defeitos de fabricação. A garantia não cobre danos causados por mau uso, acidentes ou desgaste natural. Para acionamento da garantia, apresentar este documento e nota fiscal."
                  className="font-inter"
                  rows={4}
                  placeholder="Digite o texto padrão da garantia que aparecerá nos pedidos de venda..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prazo-garantia" className="font-inter">Prazo Padrão (meses)</Label>
                <Input 
                  id="prazo-garantia" 
                  type="number"
                  defaultValue="12" 
                  className="font-inter"
                />
              </div>

              <div className="text-sm text-muted-foreground font-inter bg-muted/50 p-3 rounded-lg">
                <p>Este texto aparecerá automaticamente em todos os pedidos de venda impressos.</p>
              </div>
            </CardContent>
          </Card>

          {/* Tax Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-xl font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Informações Fiscais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="regime-tributario" className="font-inter">Regime Tributário</Label>
                <Input 
                  id="regime-tributario" 
                  defaultValue="Simples Nacional" 
                  className="font-inter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aliquota" className="font-inter">Alíquota Padrão (%)</Label>
                <Input 
                  id="aliquota" 
                  defaultValue="6.0" 
                  type="number"
                  className="font-inter"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contador" className="font-inter">Contador Responsável</Label>
                <Input 
                  id="contador" 
                  defaultValue="João Contador - CRC 123456" 
                  className="font-inter"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracoesPage;

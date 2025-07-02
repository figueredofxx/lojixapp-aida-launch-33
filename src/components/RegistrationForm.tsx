
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateEmail, validatePassword, validateRequired } from "@/utils/validation";
import { OnboardingData } from "@/hooks/useOnboarding";

interface RegistrationFormProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  isLoading: boolean;
}

const RegistrationForm = ({ data, onUpdate, onNext, isLoading }: RegistrationFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    const nomeError = validateRequired(data.nome, 'Nome');
    const emailError = validateEmail(data.email);
    const senhaError = validatePassword(data.senha);
    
    if (nomeError) newErrors.nome = nomeError;
    if (emailError) newErrors.email = emailError;
    if (senhaError) newErrors.senha = senhaError;
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const handleChange = (field: keyof OnboardingData, value: string) => {
    onUpdate({ [field]: value });
    
    // Remove erro do campo ao digitar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="font-cantarell text-2xl font-bold text-foreground">
          Comece seu teste grátis
        </CardTitle>
        <p className="font-inter text-sm text-muted-foreground">
          Crie sua conta e teste grátis por 7 dias
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome" className="font-inter text-sm font-medium">
              Nome completo
            </Label>
            <Input
              id="nome"
              type="text"
              value={data.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Seu nome completo"
              className="mt-1"
            />
            {errors.nome && (
              <p className="font-inter text-xs text-red-500 mt-1">{errors.nome}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="font-inter text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              className="mt-1"
            />
            {errors.email && (
              <p className="font-inter text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="senha" className="font-inter text-sm font-medium">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              value={data.senha}
              onChange={(e) => handleChange('senha', e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="mt-1"
            />
            {errors.senha && (
              <p className="font-inter text-xs text-red-500 mt-1">{errors.senha}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full font-inter font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Criando conta..." : "Começar teste grátis"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-inter text-xs text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="text-primary hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-primary hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;

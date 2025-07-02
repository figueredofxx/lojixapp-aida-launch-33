
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { validateRequired, validateCNPJ, validatePhone, formatCNPJ, formatPhone } from "@/utils/validation";
import { OnboardingData } from "@/hooks/useOnboarding";

interface CompanyDataFormProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

const CompanyDataForm = ({ data, onUpdate, onNext, onPrev, isLoading }: CompanyDataFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setores = [
    "Comércio Varejista",
    "Serviços",
    "Alimentação",
    "Tecnologia",
    "Saúde",
    "Educação",
    "Indústria",
    "Agronegócio",
    "Construção",
    "Outros"
  ];

  const tamanhos = [
    "1-10 funcionários",
    "11-50 funcionários", 
    "51-200 funcionários",
    "200+ funcionários"
  ];

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
    "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
    "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    const nomeEmpresaError = validateRequired(data.nomeEmpresa, 'Nome da empresa');
    const setorError = validateRequired(data.setor, 'Setor');
    const tamanhoError = validateRequired(data.tamanhoEmpresa, 'Tamanho da empresa');
    const cidadeError = validateRequired(data.cidade, 'Cidade');
    const estadoError = validateRequired(data.estado, 'Estado');
    const cnpjError = validateCNPJ(data.cnpj || '');
    const telefoneError = validatePhone(data.telefone);
    
    if (nomeEmpresaError) newErrors.nomeEmpresa = nomeEmpresaError;
    if (setorError) newErrors.setor = setorError;
    if (tamanhoError) newErrors.tamanhoEmpresa = tamanhoError;
    if (cidadeError) newErrors.cidade = cidadeError;
    if (estadoError) newErrors.estado = estadoError;
    if (cnpjError) newErrors.cnpj = cnpjError;
    if (telefoneError) newErrors.telefone = telefoneError;
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const handleChange = (field: keyof OnboardingData, value: string) => {
    let formattedValue = value;
    
    if (field === 'cnpj') {
      formattedValue = formatCNPJ(value);
    } else if (field === 'telefone') {
      formattedValue = formatPhone(value);
    }
    
    onUpdate({ [field]: formattedValue });
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="font-cantarell text-2xl font-bold text-foreground">
          Dados da sua empresa
        </CardTitle>
        <p className="font-inter text-sm text-muted-foreground">
          Nos conte um pouco sobre seu negócio
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="nomeEmpresa" className="font-inter text-sm font-medium">
                Nome da empresa
              </Label>
              <Input
                id="nomeEmpresa"
                type="text"
                value={data.nomeEmpresa}
                onChange={(e) => handleChange('nomeEmpresa', e.target.value)}
                placeholder="Nome da sua empresa"
                className="mt-1"
              />
              {errors.nomeEmpresa && (
                <p className="font-inter text-xs text-red-500 mt-1">{errors.nomeEmpresa}</p>
              )}
            </div>

            <div>
              <Label htmlFor="setor" className="font-inter text-sm font-medium">
                Setor de atividade
              </Label>
              <Select value={data.setor} onValueChange={(value) => handleChange('setor', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {setores.map(setor => (
                    <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.setor && (
                <p className="font-inter text-xs text-red-500 mt-1">{errors.setor}</p>
              )}
            </div>

            <div>
              <Label htmlFor="tamanhoEmpresa" className="font-inter text-sm font-medium">
                Tamanho da empresa
              </Label>
              <Select value={data.tamanhoEmpresa} onValueChange={(value) => handleChange('tamanhoEmpresa', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  {tamanhos.map(tamanho => (
                    <SelectItem key={tamanho} value={tamanho}>{tamanho}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tamanhoEmpresa && (
                <p className="font-inter text-xs text-red-500 mt-1">{errors.tamanhoEmpresa}</p>
              )}
            </div>

            <div>
              <Label htmlFor="telefone" className="font-inter text-sm font-medium">
                Telefone
              </Label>
              <Input
                id="telefone"
                type="tel"
                value={data.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                placeholder="(11) 99999-9999"
                className="mt-1"
                maxLength={15}
              />
              {errors.telefone && (
                <p className="font-inter text-xs text-red-500 mt-1">{errors.telefone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cidade" className="font-inter text-sm font-medium">
                Cidade
              </Label>
              <Input
                id="cidade"
                type="text"
                value={data.cidade}
                onChange={(e) => handleChange('cidade', e.target.value)}
                placeholder="Sua cidade"
                className="mt-1"
              />
              {errors.cidade && (
                <p className="font-inter text-xs text-red-500 mt-1">{errors.cidade}</p>
              )}
            </div>

            <div>
              <Label htmlFor="estado" className="font-inter text-sm font-medium">
                Estado
              </Label>
              <Select value={data.estado} onValueChange={(value) => handleChange('estado', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map(estado => (
                    <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.estado && (
                <p className="font-inter text-xs text-red-500 mt-1">{errors.estado}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="cnpj" className="font-inter text-sm font-medium">
              CNPJ (opcional)
            </Label>
            <Input
              id="cnpj"
              type="text"
              value={data.cnpj}
              onChange={(e) => handleChange('cnpj', e.target.value)}
              placeholder="00.000.000/0000-00"
              className="mt-1"
              maxLength={18}
            />
            {errors.cnpj && (
              <p className="font-inter text-xs text-red-500 mt-1">{errors.cnpj}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
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
              type="submit"
              className="flex-1 font-inter font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Continuar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyDataForm;

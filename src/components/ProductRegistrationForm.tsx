
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Calculator } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductRegistrationFormProps {
  onClose: () => void;
  onSave: (product: any) => void;
}

type ControlType = "quantidade" | "identificador";
type IdentifierType = "IMEI" | "SN" | "CODIGO_BARRAS" | "OUTRO";

export function ProductRegistrationForm({ onClose, onSave }: ProductRegistrationFormProps) {
  const [controlType, setControlType] = useState<ControlType>("quantidade");
  const [identifierType, setIdentifierType] = useState<IdentifierType>("IMEI");
  
  const [formData, setFormData] = useState({
    nome: "",
    precoVenda: "",
    categoria: "",
    marca: "",
    descricao: "",
    estoqueMinimo: "",
    garantiaDias: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: string) => {
    const number = parseFloat(value.replace(/[^\d]/g, '')) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(number);
  };

  const handlePriceChange = (field: string, value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue) {
      handleInputChange(field, formatCurrency(numericValue));
    } else {
      handleInputChange(field, '');
    }
  };

  const handleSave = () => {
    if (!formData.nome || !formData.precoVenda || !formData.categoria || !formData.marca) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const product = {
      ...formData,
      controlType
    };
    
    onSave(product);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-cantarell text-2xl font-bold">
            Cadastro de Produto
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Tipo de Controle */}
          <div className="space-y-2">
            <Label className="font-inter text-sm font-medium">Tipo de Controle</Label>
            <Select value={controlType} onValueChange={(value: ControlType) => setControlType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quantidade">Por Quantidade</SelectItem>
                <SelectItem value="identificador">Por Identificador (IMEI/SN)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campos Básicos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-inter text-sm font-medium">
                Nome do Produto *
              </Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Ex: iPhone 15 Pro Max"
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="precoVenda" className="font-inter text-sm font-medium">
                Preço de Venda *
              </Label>
              <Input
                id="precoVenda"
                value={formData.precoVenda}
                onChange={(e) => handlePriceChange("precoVenda", e.target.value)}
                placeholder="R$ 0,00"
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria" className="font-inter text-sm font-medium">
                Categoria *
              </Label>
              <Input
                id="categoria"
                value={formData.categoria}
                onChange={(e) => handleInputChange("categoria", e.target.value)}
                placeholder="Ex: Smartphones"
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marca" className="font-inter text-sm font-medium">
                Marca *
              </Label>
              <Input
                id="marca"
                value={formData.marca}
                onChange={(e) => handleInputChange("marca", e.target.value)}
                placeholder="Ex: Apple"
                className="font-inter"
              />
            </div>
          </div>

          {/* Campos Opcionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estoqueMinimo" className="font-inter text-sm font-medium">
                Estoque Mínimo
              </Label>
              <Input
                id="estoqueMinimo"
                type="number"
                value={formData.estoqueMinimo}
                onChange={(e) => handleInputChange("estoqueMinimo", e.target.value)}
                placeholder="0"
                className="font-inter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="garantiaDias" className="font-inter text-sm font-medium">
                Garantia (dias)
              </Label>
              <Input
                id="garantiaDias"
                type="number"
                value={formData.garantiaDias}
                onChange={(e) => handleInputChange("garantiaDias", e.target.value)}
                placeholder="365"
                className="font-inter"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao" className="font-inter text-sm font-medium">
              Descrição
            </Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              placeholder="Descrição detalhada do produto..."
              className="font-inter"
              rows={3}
            />
          </div>

          {/* Informação sobre entrada de estoque */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Calculator className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-cantarell font-semibold text-blue-900 mb-1">
                    Entrada de Estoque
                  </h4>
                  <p className="font-inter text-sm text-blue-800">
                    {controlType === "identificador" 
                      ? "Para produtos com controle por identificador, a entrada será feita no módulo de estoque onde você poderá inserir os códigos IMEI/SN e o valor do lote para calcular o preço unitário automaticamente."
                      : "Para produtos com controle por quantidade, a entrada será feita no módulo de estoque onde você definirá a quantidade e o preço de custo."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="font-inter"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary hover:bg-primary-hover font-inter"
            >
              Salvar Produto
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

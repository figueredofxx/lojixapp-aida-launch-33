
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Camera, Calculator } from "lucide-react";
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
  const [identifiersList, setIdentifiersList] = useState("");
  const [batchValue, setBatchValue] = useState("");
  
  const [formData, setFormData] = useState({
    nome: "",
    precoVenda: "",
    categoria: "",
    marca: "",
    descricao: "",
    estoqueMinimo: "",
    garantiaDias: "",
    quantidade: "1"
  });

  const identifierCount = identifiersList.trim() ? identifiersList.trim().split('\n').filter(line => line.trim()).length : 0;
  const unitCost = batchValue && identifierCount > 0 ? (parseFloat(batchValue) / identifierCount).toFixed(2) : "0.00";

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

  const validateIMEI = (imei: string) => {
    return /^\d{15}$/.test(imei.replace(/\s/g, ''));
  };

  const validateIdentifiers = () => {
    if (controlType !== "identificador") return true;
    
    const identifiers = identifiersList.trim().split('\n').filter(line => line.trim());
    
    if (identifierType === "IMEI") {
      return identifiers.every(imei => validateIMEI(imei.trim()));
    }
    
    return identifiers.length > 0;
  };

  const handleSave = () => {
    if (!formData.nome || !formData.precoVenda || !formData.categoria || !formData.marca) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (controlType === "identificador") {
      if (!validateIdentifiers()) {
        alert(`Por favor, insira ${identifierType}s válidos.`);
        return;
      }
      if (!batchValue || parseFloat(batchValue) <= 0) {
        alert('Por favor, insira um valor válido para o lote.');
        return;
      }
    }

    const product = {
      ...formData,
      controlType,
      ...(controlType === "identificador" && {
        identifierType,
        identifiers: identifiersList.trim().split('\n').filter(line => line.trim()),
        batchValue: parseFloat(batchValue),
        unitCost: parseFloat(unitCost),
        quantity: identifierCount
      })
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {controlType === "quantidade" && (
              <div className="space-y-2">
                <Label htmlFor="quantidade" className="font-inter text-sm font-medium">
                  Quantidade Inicial
                </Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => handleInputChange("quantidade", e.target.value)}
                  placeholder="1"
                  className="font-inter"
                />
              </div>
            )}
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

          {/* Controle por Identificador */}
          {controlType === "identificador" && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="font-cantarell text-lg text-primary">
                  Controle por Identificador Individual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium">
                    Tipo de Identificador
                  </Label>
                  <Select value={identifierType} onValueChange={(value: IdentifierType) => setIdentifierType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IMEI">IMEI</SelectItem>
                      <SelectItem value="SN">Número de Série (SN)</SelectItem>
                      <SelectItem value="CODIGO_BARRAS">Código de Barras</SelectItem>
                      <SelectItem value="OUTRO">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium">
                    Adicionar {identifierType}s em Lote
                  </Label>
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="font-inter"
                      onClick={() => {
                        // Placeholder para funcionalidade de código de barras
                        alert('Funcionalidade de leitura de código de barras será implementada em breve!');
                      }}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      Ler Código de Barras
                    </Button>
                  </div>
                  <Textarea
                    value={identifiersList}
                    onChange={(e) => setIdentifiersList(e.target.value)}
                    placeholder={`Cole ou digite os ${identifierType}s aqui, um por linha...`}
                    className="font-inter"
                    rows={6}
                  />
                  <p className="font-inter text-xs text-muted-foreground">
                    {identifierCount} {identifierType}(s) adicionados
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batchValue" className="font-inter text-sm font-medium">
                      Valor Total do Lote (R$)
                    </Label>
                    <Input
                      id="batchValue"
                      type="number"
                      step="0.01"
                      value={batchValue}
                      onChange={(e) => setBatchValue(e.target.value)}
                      placeholder="0.00"
                      className="font-inter"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-inter text-sm font-medium">
                      Custo por Unidade
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={`R$ ${unitCost}`}
                        readOnly
                        className="font-inter bg-muted"
                      />
                      <Calculator className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

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

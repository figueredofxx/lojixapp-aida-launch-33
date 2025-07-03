
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Calculator, Barcode, Package, Calendar, FileText, Building2 } from "lucide-react";
import { useProducts, Product } from "@/hooks/useProducts";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";

interface StockLaunchFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function StockLaunchForm({ open, onClose, onSave }: StockLaunchFormProps) {
  const { searchProducts, getProductById } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const [formData, setFormData] = useState({
    quantidade: "",
    precoUnitario: "",
    identificadores: "",
    dataCompra: new Date().toISOString().split('T')[0],
    numeroNota: "",
    fornecedor: "",
    observacoes: ""
  });

  const [valorTotal, setValorTotal] = useState(0);

  // Busca de produtos
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery, searchProducts]);

  // Cálculo do valor total
  useEffect(() => {
    if (selectedProduct) {
      if (selectedProduct.controlType === 'quantidade') {
        const quantidade = parseFloat(formData.quantidade) || 0;
        const precoUnitario = parseFloat(formData.precoUnitario.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        setValorTotal(quantidade * precoUnitario);
      } else {
        const identificadores = formData.identificadores.split('\n').filter(id => id.trim()).length;
        const precoUnitario = parseFloat(formData.precoUnitario.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
        setValorTotal(identificadores * precoUnitario);
      }
    }
  }, [selectedProduct, formData.quantidade, formData.precoUnitario, formData.identificadores]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSearchQuery(product.nome);
    setShowSearchResults(false);
    
    // Reset form when changing product
    setFormData(prev => ({
      ...prev,
      quantidade: "",
      precoUnitario: "",
      identificadores: ""
    }));
  };

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

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue) {
      handleInputChange("precoUnitario", formatCurrency(numericValue));
    } else {
      handleInputChange("precoUnitario", '');
    }
  };

  const handleSave = () => {
    if (!selectedProduct) {
      alert('Por favor, selecione um produto.');
      return;
    }

    if (selectedProduct.controlType === 'quantidade' && (!formData.quantidade || !formData.precoUnitario)) {
      alert('Por favor, preencha a quantidade e o preço unitário.');
      return;
    }

    if (selectedProduct.controlType === 'identificador' && (!formData.identificadores.trim() || !formData.precoUnitario)) {
      alert('Por favor, insira os identificadores e o preço unitário.');
      return;
    }

    const stockData = {
      produto: selectedProduct,
      ...formData,
      valorTotal,
      tipoLancamento: selectedProduct.controlType
    };
    
    onSave(stockData);
    handleClose();
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
    setFormData({
      quantidade: "",
      precoUnitario: "",
      identificadores: "",
      dataCompra: new Date().toISOString().split('T')[0],
      numeroNota: "",
      fornecedor: "",
      observacoes: ""
    });
    setValorTotal(0);
    onClose();
  };

  const getIdentifierCount = () => {
    return formData.identificadores.split('\n').filter(id => id.trim()).length;
  };

  return (
    <Modal open={open} onOpenChange={(open) => !open && handleClose()}>
      <ModalContent className="max-w-5xl">
        <ModalHeader>
          <ModalTitle className="font-cantarell text-2xl font-bold flex items-center">
            <Package className="h-6 w-6 mr-2 text-primary" />
            Lançar Estoque
          </ModalTitle>
          <ModalDescription className="font-inter">
            Registre a entrada de produtos no estoque com controle por quantidade ou identificadores únicos
          </ModalDescription>
        </ModalHeader>

        <ModalBody className="space-y-6">
          {/* Busca de Produto */}
          <div className="space-y-2 relative">
            <Label className="font-inter text-sm font-medium">Produto *</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produto por nome, categoria ou marca..."
                className="pl-10 font-inter"
              />
            </div>
            
            {showSearchResults && (
              <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
                <CardContent className="p-2">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-muted cursor-pointer rounded-md border-b last:border-b-0"
                      onClick={() => handleProductSelect(product)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-inter font-medium">{product.nome}</h4>
                          <p className="font-inter text-sm text-muted-foreground">
                            {product.categoria} • {product.marca}
                          </p>
                        </div>
                        <Badge variant={product.controlType === 'quantidade' ? 'secondary' : 'outline'}>
                          {product.controlType === 'quantidade' ? 'Quantidade' : 'Identificador'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Produto Selecionado */}
          {selectedProduct && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-cantarell font-semibold text-lg">{selectedProduct.nome}</h3>
                    <p className="font-inter text-sm text-muted-foreground">
                      {selectedProduct.categoria} • {selectedProduct.marca} • {selectedProduct.precoVenda}
                    </p>
                  </div>
                  <Badge variant={selectedProduct.controlType === 'quantidade' ? 'secondary' : 'outline'}>
                    Controle por {selectedProduct.controlType === 'quantidade' ? 'Quantidade' : 'Identificador'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Campos de Lançamento */}
          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna Esquerda - Dados do Lançamento */}
              <div className="space-y-4">
                <h3 className="font-cantarell font-semibold text-lg border-b pb-2">
                  Dados do Lançamento
                </h3>

                {selectedProduct.controlType === 'quantidade' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">Quantidade *</Label>
                      <Input
                        type="number"
                        value={formData.quantidade}
                        onChange={(e) => handleInputChange("quantidade", e.target.value)}
                        placeholder="0"
                        className="font-inter"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">Preço Unitário *</Label>
                      <Input
                        value={formData.precoUnitario}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        placeholder="R$ 0,00"
                        className="font-inter"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium flex items-center">
                        <Barcode className="h-4 w-4 mr-2" />
                        Identificadores (IMEI, SN, Código de Barras) *
                      </Label>
                      <Textarea
                        value={formData.identificadores}
                        onChange={(e) => handleInputChange("identificadores", e.target.value)}
                        placeholder="Insira um identificador por linha:&#10;123456789012345&#10;123456789012346&#10;123456789012347"
                        className="font-inter min-h-32 font-mono text-sm"
                        rows={6}
                      />
                      <p className="font-inter text-xs text-muted-foreground">
                        {getIdentifierCount()} identificador(es) inserido(s)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">Preço Unitário do Lote *</Label>
                      <Input
                        value={formData.precoUnitario}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        placeholder="R$ 0,00"
                        className="font-inter"
                      />
                    </div>
                  </div>
                )}

                {/* Valor Total */}
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Calculator className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-cantarell font-semibold text-green-900">
                          Valor Total do Lançamento
                        </h4>
                        <p className="font-inter text-2xl font-bold text-green-800">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(valorTotal)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna Direita - Informações Adicionais */}
              <div className="space-y-4">
                <h3 className="font-cantarell font-semibold text-lg border-b pb-2">
                  Informações Adicionais
                </h3>

                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Data da Compra
                  </Label>
                  <Input
                    type="date"
                    value={formData.dataCompra}
                    onChange={(e) => handleInputChange("dataCompra", e.target.value)}
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Número da Nota Fiscal
                  </Label>
                  <Input
                    value={formData.numeroNota}
                    onChange={(e) => handleInputChange("numeroNota", e.target.value)}
                    placeholder="Ex: 123456"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Fornecedor
                  </Label>
                  <Input
                    value={formData.fornecedor}
                    onChange={(e) => handleInputChange("fornecedor", e.target.value)}
                    placeholder="Nome do fornecedor"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium">Observações</Label>
                  <Textarea
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange("observacoes", e.target.value)}
                    placeholder="Observações adicionais sobre esta entrada..."
                    className="font-inter"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            className="font-inter"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedProduct}
            className="bg-primary hover:bg-primary-hover font-inter"
          >
            <Package className="mr-2 h-4 w-4" />
            Lançar Estoque
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

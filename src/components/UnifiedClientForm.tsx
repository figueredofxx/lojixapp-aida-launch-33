
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Building, MapPin, Check, X } from "lucide-react";
import { formatCPF, formatCNPJ, formatPhone, formatCEP, validateCPF, validateCNPJ, validateEmail } from "@/utils/formatters";
import { fetchAddressByCep } from "@/services/viaCepService";

export interface ClienteCompleto {
  id?: number;
  tipo: "PF" | "PJ";
  // Dados PF
  nome?: string;
  cpf?: string;
  dataNascimento?: string;
  // Dados PJ
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  inscricaoEstadual?: string;
  nomeContato?: string;
  // Dados comuns
  telefone?: string;
  email?: string;
  // Endereço
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface UnifiedClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onClientSave: (client: ClienteCompleto) => void;
  existingClients?: ClienteCompleto[];
  initialData?: Partial<ClienteCompleto>;
}

export function UnifiedClientForm({ 
  isOpen, 
  onClose, 
  onClientSave, 
  existingClients = [],
  initialData = {} 
}: UnifiedClientFormProps) {
  const [clientType, setClientType] = useState<"PF" | "PJ">("PF");
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [formData, setFormData] = useState<Partial<ClienteCompleto>>({
    tipo: "PF",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    ...initialData
  });

  useEffect(() => {
    if (initialData.tipo) {
      setClientType(initialData.tipo);
    }
  }, [initialData]);

  const handleInputChange = (field: keyof ClienteCompleto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepChange = async (cep: string) => {
    const formatted = formatCEP(cep);
    handleInputChange("cep", formatted);

    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsSearchingCep(true);
      const addressData = await fetchAddressByCep(cleanCep);
      
      if (addressData) {
        setFormData(prev => ({
          ...prev,
          logradouro: addressData.logradouro,
          bairro: addressData.bairro,
          cidade: addressData.localidade,
          estado: addressData.uf
        }));
      }
      setIsSearchingCep(false);
    }
  };

  const validateForm = (): string | null => {
    if (clientType === "PF") {
      if (!formData.nome) return "Nome é obrigatório";
      if (!formData.cpf) return "CPF é obrigatório";
      if (!validateCPF(formData.cpf)) return "CPF inválido";
    } else {
      if (!formData.razaoSocial) return "Razão Social é obrigatória";
      if (!formData.cnpj) return "CNPJ é obrigatório";
      if (!validateCNPJ(formData.cnpj)) return "CNPJ inválido";
    }

    if (!formData.cep) return "CEP é obrigatório";
    if (!formData.logradouro) return "Logradouro é obrigatório";
    if (!formData.numero) return "Número é obrigatório";
    if (!formData.bairro) return "Bairro é obrigatório";
    if (!formData.cidade) return "Cidade é obrigatória";
    if (!formData.estado) return "Estado é obrigatório";

    if (formData.email && !validateEmail(formData.email)) {
      return "Email inválido";
    }

    return null;
  };

  const handleSave = () => {
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    const newClient: ClienteCompleto = {
      id: Date.now(),
      tipo: clientType,
      ...formData,
      cep: formData.cep || "",
      logradouro: formData.logradouro || "",
      numero: formData.numero || "",
      bairro: formData.bairro || "",
      cidade: formData.cidade || "",
      estado: formData.estado || ""
    };

    onClientSave(newClient);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      tipo: "PF",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: ""
    });
    setClientType("PF");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-cantarell text-xl flex items-center">
            <User className="mr-2 h-5 w-5 text-primary" />
            Cadastro de Cliente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tipo de Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-lg">Tipo de Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={clientType}
                onValueChange={(value: "PF" | "PJ") => {
                  setClientType(value);
                  setFormData(prev => ({ ...prev, tipo: value }));
                }}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PF" id="pf" />
                  <Label htmlFor="pf" className="font-inter flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Pessoa Física (PF)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PJ" id="pj" />
                  <Label htmlFor="pj" className="font-inter flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Pessoa Jurídica (PJ)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Dados do Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-lg">
                Dados {clientType === "PF" ? "Pessoais" : "da Empresa"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {clientType === "PF" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="font-inter text-sm font-medium">
                      Nome Completo *
                    </Label>
                    <Input
                      id="nome"
                      value={formData.nome || ""}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      placeholder="Digite o nome completo"
                      className="font-inter"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="font-inter text-sm font-medium">
                        CPF *
                      </Label>
                      <Input
                        id="cpf"
                        value={formData.cpf || ""}
                        onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className="font-inter"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataNascimento" className="font-inter text-sm font-medium">
                        Data de Nascimento
                      </Label>
                      <Input
                        id="dataNascimento"
                        type="date"
                        value={formData.dataNascimento || ""}
                        onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
                        className="font-inter"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="razaoSocial" className="font-inter text-sm font-medium">
                      Razão Social *
                    </Label>
                    <Input
                      id="razaoSocial"
                      value={formData.razaoSocial || ""}
                      onChange={(e) => handleInputChange("razaoSocial", e.target.value)}
                      placeholder="Digite a razão social"
                      className="font-inter"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeFantasia" className="font-inter text-sm font-medium">
                        Nome Fantasia
                      </Label>
                      <Input
                        id="nomeFantasia"
                        value={formData.nomeFantasia || ""}
                        onChange={(e) => handleInputChange("nomeFantasia", e.target.value)}
                        placeholder="Nome fantasia"
                        className="font-inter"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nomeContato" className="font-inter text-sm font-medium">
                        Nome do Contato
                      </Label>
                      <Input
                        id="nomeContato"
                        value={formData.nomeContato || ""}
                        onChange={(e) => handleInputChange("nomeContato", e.target.value)}
                        placeholder="Nome do responsável"
                        className="font-inter"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cnpj" className="font-inter text-sm font-medium">
                        CNPJ *
                      </Label>
                      <Input
                        id="cnpj"
                        value={formData.cnpj || ""}
                        onChange={(e) => handleInputChange("cnpj", formatCNPJ(e.target.value))}
                        placeholder="00.000.000/0000-00"
                        maxLength={18}
                        className="font-inter"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inscricaoEstadual" className="font-inter text-sm font-medium">
                        Inscrição Estadual
                      </Label>
                      <Input
                        id="inscricaoEstadual"
                        value={formData.inscricaoEstadual || ""}
                        onChange={(e) => handleInputChange("inscricaoEstadual", e.target.value)}
                        placeholder="Inscrição estadual"
                        className="font-inter"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="font-inter text-sm font-medium">
                    Telefone {clientType === "PJ" ? "Comercial" : ""}
                  </Label>
                  <Input
                    id="telefone"
                    value={formData.telefone || ""}
                    onChange={(e) => handleInputChange("telefone", formatPhone(e.target.value))}
                    placeholder="(11) 99999-9999"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-inter text-sm font-medium">
                    Email {clientType === "PJ" ? "Comercial" : ""}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="cliente@email.com"
                    className="font-inter"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader>
              <CardTitle className="font-cantarell text-lg flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep" className="font-inter text-sm font-medium">
                    CEP *
                  </Label>
                  <Input
                    id="cep"
                    value={formData.cep || ""}
                    onChange={(e) => handleCepChange(e.target.value)}
                    placeholder="00000-000"
                    maxLength={9}
                    className="font-inter"
                    disabled={isSearchingCep}
                  />
                  {isSearchingCep && (
                    <p className="font-inter text-xs text-muted-foreground">
                      Buscando endereço...
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logradouro" className="font-inter text-sm font-medium">
                    Logradouro *
                  </Label>
                  <Input
                    id="logradouro"
                    value={formData.logradouro || ""}
                    onChange={(e) => handleInputChange("logradouro", e.target.value)}
                    placeholder="Rua, Avenida, etc."
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numero" className="font-inter text-sm font-medium">
                    Número *
                  </Label>
                  <Input
                    id="numero"
                    value={formData.numero || ""}
                    onChange={(e) => handleInputChange("numero", e.target.value)}
                    placeholder="123"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="complemento" className="font-inter text-sm font-medium">
                    Complemento
                  </Label>
                  <Input
                    id="complemento"
                    value={formData.complemento || ""}
                    onChange={(e) => handleInputChange("complemento", e.target.value)}
                    placeholder="Apartamento, Bloco, etc."
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bairro" className="font-inter text-sm font-medium">
                    Bairro *
                  </Label>
                  <Input
                    id="bairro"
                    value={formData.bairro || ""}
                    onChange={(e) => handleInputChange("bairro", e.target.value)}
                    placeholder="Bairro"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade" className="font-inter text-sm font-medium">
                    Cidade *
                  </Label>
                  <Input
                    id="cidade"
                    value={formData.cidade || ""}
                    onChange={(e) => handleInputChange("cidade", e.target.value)}
                    placeholder="Cidade"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado" className="font-inter text-sm font-medium">
                    Estado (UF) *
                  </Label>
                  <Input
                    id="estado"
                    value={formData.estado || ""}
                    onChange={(e) => handleInputChange("estado", e.target.value.toUpperCase())}
                    placeholder="SP"
                    maxLength={2}
                    className="font-inter"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1 font-inter"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="flex-1 font-inter bg-primary hover:bg-primary-hover"
            >
              <Check className="mr-2 h-4 w-4" />
              Salvar Cliente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

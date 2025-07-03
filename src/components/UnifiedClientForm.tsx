
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Building2, MapPin } from "lucide-react";
import { fetchAddressByCep } from "@/services/viaCepService";
import { formatCPF, formatCNPJ, formatPhone, formatCEP, validateCPF, validateCNPJ, validateEmail } from "@/utils/formatters";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";

export interface ClienteCompleto {
  id: number;
  tipo: 'PF' | 'PJ';
  nome?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  cpf?: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

interface Cliente {
  id?: string;
  tipo: 'PF' | 'PJ';
  nome: string;
  cpfCnpj: string;
  telefone: string;
  email: string;
  dataNascimento?: string;
  nomeFantasia?: string;
  inscricaoEstadual?: string;
  nomeContato?: string;
  endereco: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}

interface UnifiedClientFormProps {
  open: boolean;
  onClose: () => void;
  onSave?: (client: Cliente) => void;
  onClientSave?: (client: ClienteCompleto) => void;
  editingClient?: Cliente | null;
  existingClients?: ClienteCompleto[];
}

export function UnifiedClientForm({ open, onClose, onSave, onClientSave, editingClient, existingClients }: UnifiedClientFormProps) {
  const [clientType, setClientType] = useState<'PF' | 'PJ'>('PF');
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  
  const [formData, setFormData] = useState<Cliente>({
    tipo: 'PF',
    nome: '',
    cpfCnpj: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    nomeFantasia: '',
    inscricaoEstadual: '',
    nomeContato: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: ''
    }
  });

  useEffect(() => {
    if (editingClient) {
      setClientType(editingClient.tipo);
      setFormData(editingClient);
    } else {
      // Reset form when opening for a new client
      setClientType('PF');
      setFormData({
        tipo: 'PF',
        nome: '',
        cpfCnpj: '',
        telefone: '',
        email: '',
        dataNascimento: '',
        nomeFantasia: '',
        inscricaoEstadual: '',
        nomeContato: '',
        endereco: {
          cep: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: ''
        }
      });
    }
  }, [editingClient]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      // Split the field string into parts to handle nested objects
      const parts = field.split('.');
      if (parts.length === 1) {
        // Simple field
        return { ...prev, [field]: value };
      } else {
        // Nested field (e.g., 'endereco.cep')
        const [parent, child] = parts;
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        };
      }
    });
  };

  const handleCepChange = async (cep: string) => {
    const formattedCep = formatCEP(cep);
    handleInputChange('endereco.cep', formattedCep);

    if (formattedCep.replace(/\D/g, '').length === 8) {
      setIsLoadingCep(true);
      try {
        const addressData = await fetchAddressByCep(formattedCep);
        if (addressData) {
          setFormData(prev => ({
            ...prev,
            endereco: {
              ...prev.endereco,
              cep: formattedCep,
              logradouro: addressData.logradouro,
              bairro: addressData.bairro,
              cidade: addressData.localidade,
              estado: addressData.uf
            }
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  const handleSave = () => {
    // Validações básicas
    if (!formData.nome.trim()) {
      alert('Nome é obrigatório');
      return;
    }

    if (!formData.cpfCnpj.trim()) {
      alert(clientType === 'PF' ? 'CPF é obrigatório' : 'CNPJ é obrigatório');
      return;
    }

    if (clientType === 'PF' && !validateCPF(formData.cpfCnpj)) {
      alert('CPF inválido');
      return;
    }

    if (clientType === 'PJ' && !validateCNPJ(formData.cpfCnpj)) {
      alert('CNPJ inválido');
      return;
    }

    if (formData.email && !validateEmail(formData.email)) {
      alert('E-mail inválido');
      return;
    }

    if (!formData.endereco.cep.trim()) {
      alert('CEP é obrigatório');
      return;
    }

    const clientData = {
      ...formData,
      tipo: clientType,
      id: editingClient?.id || Date.now().toString()
    };

    // Convert to ClienteCompleto format if onClientSave is provided
    if (onClientSave) {
      const clienteCompleto: ClienteCompleto = {
        id: Date.now(),
        tipo: clientType,
        ...(clientType === 'PF' ? { nome: formData.nome, cpf: formData.cpfCnpj } : { razaoSocial: formData.nome, nomeFantasia: formData.nomeFantasia, cnpj: formData.cpfCnpj }),
        email: formData.email,
        telefone: formData.telefone,
        cep: formData.endereco.cep,
        logradouro: formData.endereco.logradouro,
        numero: formData.endereco.numero,
        bairro: formData.endereco.bairro,
        cidade: formData.endereco.cidade,
        estado: formData.endereco.estado
      };
      onClientSave(clienteCompleto);
    } else if (onSave) {
      onSave(clientData);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal open={open} onOpenChange={(open) => !open && handleClose()}>
      <ModalContent className="max-w-5xl max-h-[95vh]">
        <ModalHeader>
          <ModalTitle className="font-cantarell text-2xl font-bold flex items-center">
            <User className="h-6 w-6 mr-2 text-primary" />
            {editingClient ? 'Editar Cliente' : 'Cadastrar Cliente'}
          </ModalTitle>
          <ModalDescription className="font-inter">
            Cadastre clientes pessoa física ou jurídica com endereço completo
          </ModalDescription>
        </ModalHeader>

        <ModalBody className="space-y-6">
          {/* Tipo de Cliente */}
          <div className="space-y-3">
            <Label className="font-inter text-sm font-medium">Tipo de Cliente</Label>
            <RadioGroup 
              value={clientType} 
              onValueChange={(value: 'PF' | 'PJ') => {
                setClientType(value);
                setFormData(prev => ({ ...prev, tipo: value, cpfCnpj: '' }));
              }}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PF" id="pf" />
                <Label htmlFor="pf" className="font-inter flex items-center cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Pessoa Física (PF)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PJ" id="pj" />
                <Label htmlFor="pj" className="font-inter flex items-center cursor-pointer">
                  <Building2 className="h-4 w-4 mr-2" />
                  Pessoa Jurídica (PJ)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Coluna Esquerda - Dados do Cliente */}
            <div className="space-y-4">
              <h3 className="font-cantarell font-semibold text-lg border-b pb-2 flex items-center">
                {clientType === 'PF' ? <User className="h-5 w-5 mr-2" /> : <Building2 className="h-5 w-5 mr-2" />}
                Dados {clientType === 'PF' ? 'Pessoais' : 'da Empresa'}
              </h3>

              {/* Campos PF */}
              {clientType === 'PF' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="font-inter text-sm font-medium">Nome Completo *</Label>
                    <Input
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Nome completo"
                      className="font-inter"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">CPF *</Label>
                      <Input
                        value={formData.cpfCnpj}
                        onChange={(e) => handleInputChange('cpfCnpj', formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        className="font-inter"
                        maxLength={14}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">Data de Nascimento</Label>
                      <Input
                        type="date"
                        value={formData.dataNascimento}
                        onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                        className="font-inter"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">Telefone</Label>
                      <Input
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
                        placeholder="(00) 00000-0000"
                        className="font-inter"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">E-mail</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="email@exemplo.com"
                        className="font-inter"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Campos PJ */}
              {clientType === 'PJ' && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label className="font-inter text-sm font-medium">Razão Social *</Label>
                    <Input
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Razão social da empresa"
                      className="font-inter"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">CNPJ *</Label>
                      <Input
                        value={formData.cpfCnpj}
                        onChange={(e) => handleInputChange('cpfCnpj', formatCNPJ(e.target.value))}
                        placeholder="00.000.000/0000-00"
                        className="font-inter"
                        maxLength={18}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">Nome Fantasia</Label>
                      <Input
                        value={formData.nomeFantasia}
                        onChange={(e) => handleInputChange('nomeFantasia', e.target.value)}
                        placeholder="Nome fantasia"
                        className="font-inter"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-inter text-sm font-medium">Inscrição Estadual</Label>
                    <Input
                      value={formData.inscricaoEstadual}
                      onChange={(e) => handleInputChange('inscricaoEstadual', e.target.value)}
                      placeholder="Inscrição estadual"
                      className="font-inter"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">Telefone Comercial</Label>
                      <Input
                        value={formData.telefone}
                        onChange={(e) => handleInputChange('telefone', formatPhone(e.target.value))}
                        placeholder="(00) 00000-0000"
                        className="font-inter"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-inter text-sm font-medium">E-mail Comercial</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="email@empresa.com"
                        className="font-inter"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-inter text-sm font-medium">Nome do Contato</Label>
                    <Input
                      value={formData.nomeContato}
                      onChange={(e) => handleInputChange('nomeContato', e.target.value)}
                      placeholder="Nome da pessoa de contato"
                      className="font-inter"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Coluna Direita - Endereço */}
            <div className="space-y-4">
              <h3 className="font-cantarell font-semibold text-lg border-b pb-2 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Endereço
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium">CEP *</Label>
                  <Input
                    value={formData.endereco.cep}
                    onChange={(e) => handleCepChange(e.target.value)}
                    placeholder="00000-000"
                    className="font-inter"
                    maxLength={9}
                    disabled={isLoadingCep}
                  />
                  {isLoadingCep && (
                    <p className="font-inter text-xs text-muted-foreground">Buscando endereço...</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium">Número *</Label>
                  <Input
                    value={formData.endereco.numero}
                    onChange={(e) => handleInputChange('endereco.numero', e.target.value)}
                    placeholder="123"
                    className="font-inter"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-inter text-sm font-medium">Logradouro *</Label>
                <Input
                  value={formData.endereco.logradouro}
                  onChange={(e) => handleInputChange('endereco.logradouro', e.target.value)}
                  placeholder="Rua, Avenida, etc."
                  className="font-inter"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-inter text-sm font-medium">Complemento</Label>
                <Input
                  value={formData.endereco.complemento}
                  onChange={(e) => handleInputChange('endereco.complemento', e.target.value)}
                  placeholder="Apartamento, Casa, etc."
                  className="font-inter"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-inter text-sm font-medium">Bairro *</Label>
                <Input
                  value={formData.endereco.bairro}
                  onChange={(e) => handleInputChange('endereco.bairro', e.target.value)}
                  placeholder="Bairro"
                  className="font-inter"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium">Cidade *</Label>
                  <Input
                    value={formData.endereco.cidade}
                    onChange={(e) => handleInputChange('endereco.cidade', e.target.value)}
                    placeholder="Cidade"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium">Estado (UF) *</Label>
                  <Input
                    value={formData.endereco.estado}
                    onChange={(e) => handleInputChange('endereco.estado', e.target.value.toUpperCase())}
                    placeholder="SP"
                    className="font-inter"
                    maxLength={2}
                  />
                </div>
              </div>
            </div>
          </div>
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
            className="bg-primary hover:bg-primary-hover font-inter"
          >
            {editingClient ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

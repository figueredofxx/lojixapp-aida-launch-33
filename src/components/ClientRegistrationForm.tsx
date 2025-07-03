import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, X, Check } from "lucide-react";

interface Cliente {
  id?: number;
  nome: string;
  cpf: string;
  telefone?: string;
  email?: string;
}

interface ClientRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onClientSelect: (client: Cliente) => void;
  existingClients?: Cliente[];
}

export function ClientRegistrationForm({ 
  isOpen, 
  onClose, 
  onClientSelect, 
  existingClients = [] 
}: ClientRegistrationFormProps) {
  const [isNewClient, setIsNewClient] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    handleInputChange("cpf", formatted);
  };

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const handleSaveClient = () => {
    if (!formData.nome || !formData.cpf) {
      alert('Nome e CPF são obrigatórios.');
      return;
    }

    if (!validateCPF(formData.cpf)) {
      alert('CPF inválido. Digite um CPF com 11 dígitos.');
      return;
    }

    const newClient: Cliente = {
      id: Date.now(), // Temporário - será gerado pelo backend
      ...formData
    };

    onClientSelect(newClient);
    setFormData({ nome: "", cpf: "", telefone: "", email: "" });
    onClose();
  };

  const filteredClients = existingClients.filter(client =>
    client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.cpf.includes(searchTerm)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-cantarell text-xl flex items-center">
            <User className="mr-2 h-5 w-5 text-primary" />
            Cliente para Venda
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Toggle entre novo cliente e buscar existente */}
          <div className="flex gap-2">
            <Button
              variant={isNewClient ? "default" : "outline"}
              onClick={() => setIsNewClient(true)}
              className="flex-1 font-inter"
            >
              Novo Cliente
            </Button>
            <Button
              variant={!isNewClient ? "default" : "outline"}
              onClick={() => setIsNewClient(false)}
              className="flex-1 font-inter"
            >
              Cliente Existente
            </Button>
          </div>

          {isNewClient ? (
            /* Formulário de novo cliente */
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell text-lg">Cadastrar Novo Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="font-inter text-sm font-medium">
                    Nome Completo *
                  </Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Digite o nome completo"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf" className="font-inter text-sm font-medium">
                    CPF *
                  </Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => handleCPFChange(e.target.value)}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="font-inter"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="font-inter text-sm font-medium">
                      Telefone
                    </Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange("telefone", e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="font-inter"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-inter text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="cliente@email.com"
                      className="font-inter"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={onClose}
                    className="flex-1 font-inter"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={handleSaveClient}
                    className="flex-1 font-inter bg-primary hover:bg-primary-hover"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Salvar Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Busca de cliente existente */
            <Card>
              <CardHeader>
                <CardTitle className="font-cantarell text-lg">Selecionar Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-inter text-sm font-medium">
                    Buscar por nome ou CPF
                  </Label>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Digite o nome ou CPF do cliente"
                    className="font-inter"
                  />
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <div
                        key={client.id}
                        className="p-3 border rounded-lg hover:bg-muted cursor-pointer"
                        onClick={() => {
                          onClientSelect(client);
                          onClose();
                        }}
                      >
                        <div className="font-inter font-medium">{client.nome}</div>
                        <div className="font-inter text-sm text-muted-foreground">
                          CPF: {client.cpf}
                        </div>
                        {client.telefone && (
                          <div className="font-inter text-sm text-muted-foreground">
                            Tel: {client.telefone}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="font-inter text-muted-foreground">
                        {searchTerm ? 'Nenhum cliente encontrado' : 'Digite para buscar clientes'}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Building2,
  MessageCircle,
  Send
} from "lucide-react";

interface TicketDetailsModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

export function TicketDetailsModal({ ticket, isOpen, onClose }: TicketDetailsModalProps) {
  const [novaResposta, setNovaResposta] = useState("");
  const [novoStatus, setNovoStatus] = useState(ticket?.status || "");

  const handleSendResponse = () => {
    if (novaResposta.trim()) {
      console.log("Enviando resposta:", novaResposta);
      setNovaResposta("");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'aberto': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'em-andamento': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolvido': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-cantarell text-xl flex items-center gap-2">
            {getStatusIcon(ticket.status)}
            Ticket {ticket.id}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-cantarell font-semibold mb-2">Problema Relatado</h3>
              <p className="font-inter text-sm">{ticket.problema}</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-cantarell font-semibold">Histórico de Conversas</h3>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-inter text-sm font-medium">{ticket.usuario}</span>
                      <span className="font-inter text-xs text-muted-foreground">{ticket.tempo}</span>
                    </div>
                    <p className="font-inter text-sm">{ticket.problema}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 bg-white border p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-inter text-sm font-medium">Suporte LojixApp</span>
                      <span className="font-inter text-xs text-muted-foreground">Há 30 min</span>
                    </div>
                    <p className="font-inter text-sm">Olá! Estou analisando seu problema. Pode me informar qual versão do sistema está usando?</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-cantarell font-semibold">Nova Resposta</h3>
              <Textarea
                placeholder="Digite sua resposta..."
                value={novaResposta}
                onChange={(e) => setNovaResposta(e.target.value)}
                className="min-h-20"
              />
              <div className="flex justify-end">
                <Button onClick={handleSendResponse} disabled={!novaResposta.trim()}>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Resposta
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-cantarell font-semibold mb-3">Informações do Ticket</h3>
              <div className="space-y-3">
                <div>
                  <label className="font-inter text-sm font-medium text-muted-foreground">Status</label>
                  <Select value={novoStatus} onValueChange={setNovoStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aberto">Aberto</SelectItem>
                      <SelectItem value="em-andamento">Em Andamento</SelectItem>
                      <SelectItem value="resolvido">Resolvido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-inter text-sm font-medium text-muted-foreground">Prioridade</label>
                  <div className="mt-1">
                    <Badge className={
                      ticket.prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                      ticket.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {ticket.prioridade}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="font-inter text-sm font-medium text-muted-foreground">Categoria</label>
                  <div className="mt-1">
                    <Badge variant="outline">{ticket.categoria}</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-cantarell font-semibold mb-3">Informações do Cliente</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-inter text-sm">{ticket.empresa}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-inter text-sm">{ticket.usuario}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                onClick={() => setNovoStatus(novoStatus)} 
                className="w-full"
              >
                Salvar Alterações
              </Button>
              <Button variant="outline" className="w-full">
                Escalar para Técnico
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

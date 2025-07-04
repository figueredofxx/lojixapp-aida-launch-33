
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

interface NovoFuncionarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (funcionario: any) => void;
}

export function NovoFuncionarioModal({ isOpen, onClose, onSave }: NovoFuncionarioModalProps) {
  const form = useForm({
    defaultValues: {
      nome: '',
      email: '',
      role: '',
      senha: '',
      confirmarSenha: '',
      ativo: true,
    }
  });

  const handleSubmit = (data: any) => {
    onSave(data);
    form.reset();
    onClose();
  };

  const rolePermissions = {
    super_admin: ["Acesso total", "Gerenciar empresas", "Gerenciar funcionários", "Configurações", "Relatórios"],
    suporte: ["Visualizar empresas", "Suporte técnico", "Logs do sistema"],
    vendas: ["Dashboard vendas", "Relatórios comerciais", "Gestão de leads"],
    financeiro: ["Relatórios financeiros", "Faturamento", "Pagamentos"],
    desenvolvimento: ["Logs técnicos", "Configurações de sistema", "Deploy"]
  };

  const selectedRole = form.watch('role');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-cantarell text-xl">Novo Funcionário</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="joao@lojixapp.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Função</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a função" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="suporte">Suporte</SelectItem>
                        <SelectItem value="vendas">Vendas</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="desenvolvimento">Desenvolvimento</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Mínimo 8 caracteres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmarSenha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-inter">Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirme a senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedRole && (
              <div className="border rounded-lg p-4">
                <h4 className="font-cantarell font-semibold mb-3">Permissões da Função: {selectedRole}</h4>
                <ul className="space-y-1">
                  {rolePermissions[selectedRole as keyof typeof rolePermissions]?.map((permission, index) => (
                    <li key={index} className="font-inter text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <FormField
              control={form.control}
              name="ativo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-inter">
                      Funcionário ativo
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Criar Funcionário
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-cantarell font-bold text-2xl">L</span>
          </div>
          <h1 className="font-cantarell text-3xl font-bold text-foreground">LojixApp</h1>
          <p className="font-inter text-muted-foreground mt-2">
            Sua plataforma completa de gestão
          </p>
        </div>

        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="font-inter">Entrar</TabsTrigger>
                <TabsTrigger value="register" className="font-inter">Criar Conta</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Login Tab */}
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-inter">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10 font-inter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="font-inter">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      className="pl-10 pr-10 font-inter"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="font-inter text-sm text-muted-foreground">Lembrar-me</span>
                  </label>
                  <Link to="/esqueci-senha" className="font-inter text-sm text-primary hover:underline">
                    Esqueci minha senha
                  </Link>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-hover font-inter font-semibold">
                  Entrar
                </Button>

                <div className="text-center">
                  <span className="font-inter text-sm text-muted-foreground">
                    Não tem uma conta?{" "}
                    <button 
                      onClick={() => setActiveTab("register")}
                      className="text-primary hover:underline font-semibold"
                    >
                      Criar conta grátis
                    </button>
                  </span>
                </div>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-inter">Nome</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        placeholder="João"
                        className="pl-10 font-inter"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-inter">Sobrenome</Label>
                    <Input
                      id="lastName"
                      placeholder="Silva"
                      className="font-inter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registerEmail" className="font-inter">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10 font-inter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-inter">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      className="pl-10 font-inter"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registerPassword" className="font-inter">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="registerPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
                      className="pl-10 pr-10 font-inter"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="rounded mt-1" />
                  <span className="font-inter text-sm text-muted-foreground">
                    Aceito os{" "}
                    <Link to="/termos" className="text-primary hover:underline">
                      Termos de Uso
                    </Link>{" "}
                    e{" "}
                    <Link to="/privacidade" className="text-primary hover:underline">
                      Política de Privacidade
                    </Link>
                  </span>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-hover font-inter font-semibold">
                  Criar Conta Grátis
                </Button>

                <div className="text-center">
                  <span className="font-inter text-sm text-muted-foreground">
                    Já tem uma conta?{" "}
                    <button 
                      onClick={() => setActiveTab("login")}
                      className="text-primary hover:underline font-semibold"
                    >
                      Fazer login
                    </button>
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="font-inter text-xs text-muted-foreground">
            © 2024 LojixApp. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

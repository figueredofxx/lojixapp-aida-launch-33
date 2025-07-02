
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import PlanosPage from "./pages/PlanosPage";
import RenovacaoPage from "./pages/RenovacaoPage";
import VendaFinalizadaPage from "./pages/VendaFinalizadaPage";
import OnboardingPage from "./pages/OnboardingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/planos" element={<PlanosPage />} />
          <Route path="/renovacao" element={<RenovacaoPage />} />
          <Route path="/venda-finalizada" element={<VendaFinalizadaPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/vendas" element={<Navigate to="/dashboard/vendas" replace />} />
          <Route path="/estoque" element={<Navigate to="/dashboard/estoque" replace />} />
          <Route path="/relatorios" element={<Navigate to="/dashboard/relatorios" replace />} />
          <Route path="/pdv" element={<Navigate to="/dashboard/pdv" replace />} />
          <Route path="/clientes" element={<Navigate to="/dashboard/clientes" replace />} />
          <Route path="/financeiro" element={<Navigate to="/dashboard/financeiro" replace />} />
          <Route path="/configuracoes" element={<Navigate to="/dashboard/configuracoes" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardContent } from "@/components/DashboardContent";
import VendasPage from "@/pages/VendasPage";
import EstoquePage from "@/pages/EstoquePage";
import RelatoriosPage from "@/pages/RelatoriosPage";
import PDVPage from "@/pages/PDVPage";
import ClientesPage from "@/pages/ClientesPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage";
import FinanceiroPage from "@/pages/FinanceiroPage";
import FornecedoresPage from "@/pages/FornecedoresPage";
import ListaProdutosPage from "@/pages/ListaProdutosPage";
import MultiLojasPage from "@/pages/MultiLojasPage";
import ProdutosPage from "@/pages/ProdutosPage";
import CategoriasPage from "@/pages/CategoriasPage";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <DashboardHeader />
          <Routes>
            <Route index element={<DashboardContent />} />
            <Route path="pdv" element={<PDVPage />} />
            <Route path="produtos" element={<ProdutosPage />} />
            <Route path="lista-produtos" element={<ListaProdutosPage />} />
            <Route path="categorias" element={<CategoriasPage />} />
            <Route path="estoque" element={<EstoquePage />} />
            <Route path="financeiro" element={<FinanceiroPage />} />
            <Route path="relatorios" element={<RelatoriosPage />} />
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="configuracoes" element={<ConfiguracoesPage />} />
            <Route path="multi-lojas" element={<MultiLojasPage />} />
            <Route path="vendas" element={<VendasPage />} />
            <Route path="fornecedores" element={<FornecedoresPage />} />
          </Routes>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;

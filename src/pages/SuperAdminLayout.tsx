
import { Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SuperAdminSidebar } from "@/components/SuperAdminSidebar";
import SuperAdminDashboard from "./SuperAdminDashboard";
import SuperAdminEmpresas from "./SuperAdminEmpresas";
import SuperAdminFuncionarios from "./SuperAdminFuncionarios";
import SuperAdminModulos from "./SuperAdminModulos";
import SuperAdminRelatorios from "./SuperAdminRelatorios";
import SuperAdminConfiguracoes from "./SuperAdminConfiguracoes";

const SuperAdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SuperAdminSidebar />
        <SidebarInset className="flex-1">
          <Routes>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="empresas" element={<SuperAdminEmpresas />} />
            <Route path="funcionarios" element={<SuperAdminFuncionarios />} />
            <Route path="modulos" element={<SuperAdminModulos />} />
            <Route path="relatorios" element={<SuperAdminRelatorios />} />
            <Route path="configuracoes" element={<SuperAdminConfiguracoes />} />
          </Routes>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminLayout;

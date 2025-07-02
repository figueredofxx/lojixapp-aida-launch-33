
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  DollarSign, 
  BarChart, 
  Settings,
  Archive,
  FileText,
  ShoppingCart,
  Package,
  Building2
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "PDV", url: "/dashboard/pdv", icon: ShoppingCart },
  { title: "Vendas", url: "/dashboard/vendas", icon: DollarSign },
  { title: "Estoque", url: "/dashboard/estoque", icon: Archive },
  { title: "Lista Produtos", url: "/dashboard/lista-produtos", icon: Package },
  { title: "Clientes", url: "/dashboard/clientes", icon: Users },
  { title: "Fornecedores", url: "/dashboard/fornecedores", icon: Briefcase },
  { title: "Relatórios", url: "/dashboard/relatorios", icon: BarChart },
  { title: "Financeiro", url: "/dashboard/financeiro", icon: FileText },
  { 
    title: "Multi-Lojas", 
    url: "/dashboard/multi-lojas", 
    icon: Building2, 
    beta: true 
  },
  { title: "Configurações", url: "/dashboard/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"}>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-2 py-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-cantarell font-bold text-sm">L</span>
          </div>
          {!isCollapsed && (
            <span className="font-cantarell font-bold text-lg text-foreground">LojixApp</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-inter text-muted-foreground">
            {!isCollapsed && "Menu Principal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = currentPath === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <NavLink 
                        to={item.url} 
                        className="flex items-center gap-2 font-inter"
                      >
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && (
                          <div className="flex items-center gap-2 flex-1">
                            <span>{item.title}</span>
                            {item.beta && (
                              <Badge variant="secondary" className="text-xs">
                                Beta
                              </Badge>
                            )}
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

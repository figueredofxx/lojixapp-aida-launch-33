
import { useState } from "react";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard,
  Building2,
  Users,
  Package,
  BarChart3,
  Settings,
  Shield,
  MessageCircle
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/super-admin",
    icon: LayoutDashboard,
    end: true
  },
  {
    title: "Empresas",
    url: "/super-admin/empresas",
    icon: Building2
  },
  {
    title: "Funcionários",
    url: "/super-admin/funcionarios",
    icon: Users
  },
  {
    title: "Suporte",
    url: "/super-admin/suporte",
    icon: MessageCircle
  },
  {
    title: "Módulos",
    url: "/super-admin/modulos",
    icon: Package
  },
  {
    title: "Relatórios",
    url: "/super-admin/relatorios",
    icon: BarChart3
  },
  {
    title: "Configurações",
    url: "/super-admin/configuracoes",
    icon: Settings
  }
];

export function SuperAdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string, end?: boolean) => {
    if (end) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (isActiveItem: boolean) =>
    isActiveItem ? "bg-muted text-primary font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-cantarell font-bold text-lg">Super Admin</h2>
                <p className="font-inter text-xs text-muted-foreground">LojixApp</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.end}
                      className={({ isActive: navIsActive }) => 
                        getNavClass(navIsActive || isActive(item.url, item.end))
                      }
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

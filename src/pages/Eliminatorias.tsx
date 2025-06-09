
import { useState } from 'react';
import { toast } from "sonner";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Navigation from '@/components/Navigation';
import EliminatoriasSulAmericanas from '@/components/EliminatoriasSulAmericanas';
import AdminPanel from '@/components/AdminPanel';
import AdminLogin from '@/components/AdminLogin';
import { AuthService } from '@/services/authService';

const Eliminatorias = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRefresh = async () => {
    try {
      // Aqui você pode adicionar lógica para atualizar dados das eliminatórias
      toast.success("Dados atualizados com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar dados");
    }
  };

  const handleAdminLogin = async (password: string) => {
    try {
      const authService = AuthService.getInstance();
      const success = authService.login('horariodojogo', password);
      if (success) {
        setIsAuthenticated(true);
        toast.success("Login realizado com sucesso!");
      } else {
        toast.error("Senha incorreta");
      }
    } catch (error) {
      toast.error("Erro no login");
    }
  };

  const handleLogout = () => {
    AuthService.getInstance().logout();
    setIsAuthenticated(false);
    setShowAdminPanel(false);
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Navigation 
            onRefresh={handleRefresh}
            onShowAdmin={() => setShowAdminPanel(true)}
            isLoading={false}
          />
          
          <EliminatoriasSulAmericanas />

          {showAdminPanel && (
            <>
              {!isAuthenticated ? (
                <AdminLogin 
                  onLogin={handleAdminLogin}
                  onClose={() => setShowAdminPanel(false)}
                />
              ) : (
                <AdminPanel 
                  onDataUpdate={handleRefresh}
                  isLoading={false}
                />
              )}
            </>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Eliminatorias;

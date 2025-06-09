
import Navigation from '@/components/Navigation';
import EliminatoriasSulAmericanas from '@/components/EliminatoriasSulAmericanas';
import { useState } from 'react';
import { toast } from "sonner";
import AdminPanel from '@/components/AdminPanel';
import AdminLogin from '@/components/AdminLogin';
import { authService } from '@/services/authService';

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
      const success = await authService.login(password);
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
    authService.logout();
    setIsAuthenticated(false);
    setShowAdminPanel(false);
    toast.success("Logout realizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              onClose={() => setShowAdminPanel(false)}
              onLogout={handleLogout}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Eliminatorias;

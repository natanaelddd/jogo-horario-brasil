
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import Navigation from '@/components/Navigation';
import AppHeader from '@/components/AppHeader';
import AdminPanel from '@/components/AdminPanel';
import AdminLogin from '@/components/AdminLogin';
import ViewSelector from '@/components/ViewSelector';
import GamesView from '@/components/GamesView';
import StandingsView from '@/components/StandingsView';
import CampeonatosView from '@/components/CampeonatosView';
import CampeonatoFilter from '@/components/CampeonatoFilter';
import { GameDataService } from '@/services/gameDataService';
import { AuthService } from '@/services/authService';
import { CampeonatoType } from '@/types/game';

const Index = () => {
  const [currentView, setCurrentView] = useState<'games' | 'standings' | 'campeonatos'>('games');
  const [selectedCampeonato, setSelectedCampeonato] = useState<CampeonatoType | 'todos'>('todos');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: games = [], isLoading, refetch } = useQuery({
    queryKey: ['games'],
    queryFn: () => GameDataService.getInstance().fetchAllGames(),
    refetchInterval: 30000, // Atualiza a cada 30 segundos
  });

  const handleRefresh = async () => {
    try {
      await refetch();
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

  const handleViewChange = (view: 'jogos' | 'classificacao' | 'campeonato') => {
    const viewMap = {
      'jogos': 'games',
      'classificacao': 'standings',
      'campeonato': 'campeonatos'
    } as const;
    setCurrentView(viewMap[view]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        onRefresh={handleRefresh}
        onShowAdmin={() => setShowAdminPanel(true)}
        isLoading={isLoading}
      />
      
      <AppHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ViewSelector activeView={currentView === 'games' ? 'jogos' : currentView === 'standings' ? 'classificacao' : 'campeonato'} onViewChange={handleViewChange} />
        
        {currentView === 'games' && (
          <>
            <CampeonatoFilter 
              selectedCampeonato={selectedCampeonato}
              onCampeonatoChange={setSelectedCampeonato}
            />
            <GamesView 
              games={games} 
              isLoading={isLoading}
              selectedCampeonato={selectedCampeonato}
            />
          </>
        )}
        {currentView === 'standings' && <StandingsView selectedCampeonato="todos" />}
        {currentView === 'campeonatos' && (
          <CampeonatosView 
            onCampeonatoSelect={() => {}}
            onViewChange={() => {}}
          />
        )}
      </div>

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
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Index;

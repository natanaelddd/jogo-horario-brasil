import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Navigation from '@/components/Navigation';
import AppHeader from '@/components/AppHeader';
import AdminPanel from '@/components/AdminPanel';
import AdminLogin from '@/components/AdminLogin';
import ViewSelector from '@/components/ViewSelector';
import StandingsView from '@/components/StandingsView';
import CampeonatosView from '@/components/CampeonatosView';
import GamesSection from '@/components/GamesSection';
import { GameDataService } from '@/services/gameDataService';
import { AuthService } from '@/services/authService';
import { CampeonatoType } from '@/types/game';
import MundialClubeDestaque from '@/components/MundialClubeDestaque';
import { useGamesRealtime } from "@/hooks/useGamesRealtime";

const Index = () => {
  const [currentView, setCurrentView] = useState<'games' | 'standings' | 'campeonatos'>('games');
  const [selectedCampeonato, setSelectedCampeonato] = useState<CampeonatoType | 'todos'>('todos');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data: games = [], isLoading, refetch } = useQuery({
    queryKey: ['games'],
    queryFn: () => GameDataService.getInstance().fetchAllGames(),
    refetchInterval: 30000,
  });

  // Atualização automática em tempo real dos jogos
  useGamesRealtime(() => {
    refetch();
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

  const handleViewChange = (view: 'jogos' | 'classificacao' | 'campeonato') => {
    const viewMap = {
      'jogos': 'games',
      'classificacao': 'standings',
      'campeonato': 'campeonatos'
    } as const;
    setCurrentView(viewMap[view]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Navigation 
            onRefresh={handleRefresh}
            onShowAdmin={() => setShowAdminPanel(true)}
            isLoading={isLoading}
          />
          <AppHeader />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* DESTAQUE DO MUNDIAL DE CLUBES */}
            <MundialClubeDestaque />
            {/* selector de views, jogos, campeonatos etc */}
            <ViewSelector 
              activeView={currentView === 'games' ? 'jogos' : currentView === 'standings' ? 'classificacao' : 'campeonato'} 
              onViewChange={handleViewChange} 
            />
            {currentView === 'games' && (
              <GamesSection
                games={games}
                isLoading={isLoading}
                selectedCampeonato={selectedCampeonato}
                onCampeonatoChange={setSelectedCampeonato}
              />
            )}
            {currentView === 'standings' && (
              <StandingsView selectedCampeonato={selectedCampeonato} />
            )}
            {currentView === 'campeonatos' && (
              <CampeonatosView 
                onCampeonatoSelect={(campeonato) => {
                  setSelectedCampeonato(campeonato);
                  setCurrentView('games');
                }}
                onViewChange={handleViewChange}
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;

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
import HeroGameSection from '@/components/HeroGameSection';
import GameCard from '@/components/GameCard';
import { GameDataService } from '@/services/gameDataService';
import { AuthService } from '@/services/authService';
import { CampeonatoType, Game } from '@/types/game';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Trophy } from 'lucide-react';

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

  // Filtrar jogos por campeonato
  const filteredGames = selectedCampeonato === 'todos' 
    ? games 
    : games.filter(game => game.campeonato === selectedCampeonato);

  // Encontrar o próximo jogo mais relevante para o Hero Section
  const getHeroGame = (games: Game[]): Game | null => {
    if (games.length === 0) return null;
    
    // Priorizar jogos ao vivo
    const liveGames = games.filter(game => game.status === 'ao_vivo');
    if (liveGames.length > 0) return liveGames[0];
    
    // Depois jogos agendados da seleção brasileira
    const brasilGames = games.filter(game => 
      game.status === 'agendado' && 
      (game.time_casa.toLowerCase().includes('brasil') || game.time_fora.toLowerCase().includes('brasil'))
    );
    if (brasilGames.length > 0) return brasilGames[0];
    
    // Por último, qualquer jogo agendado
    const scheduledGames = games.filter(game => game.status === 'agendado');
    return scheduledGames.length > 0 ? scheduledGames[0] : games[0];
  };

  const heroGame = getHeroGame(filteredGames);
  const remainingGames = filteredGames.filter(game => game.id !== heroGame?.id);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation 
        onRefresh={handleRefresh}
        onShowAdmin={() => setShowAdminPanel(true)}
        isLoading={isLoading}
      />
      
      <AppHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <ViewSelector activeView={currentView === 'games' ? 'jogos' : currentView === 'standings' ? 'classificacao' : 'campeonato'} onViewChange={handleViewChange} />
        
        {currentView === 'games' && (
          <div className="space-y-6">
            {/* Hero Game Section */}
            <HeroGameSection game={heroGame} />
            
            {/* Filtros por Campeonato */}
            <CampeonatoFilter 
              selectedCampeonato={selectedCampeonato}
              onCampeonatoChange={setSelectedCampeonato}
            />

            {/* Lista de Jogos */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-400" />
                  <p className="text-lg text-white">Carregando jogos...</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Conectando com o banco de dados...
                  </p>
                </div>
              ) : remainingGames.length === 0 ? (
                <Card className="bg-gray-800 border-gray-700 text-center py-8">
                  <CardContent>
                    <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-lg font-semibold mb-2 text-white">Nenhum jogo encontrado</h3>
                    <p className="text-gray-400">
                      {selectedCampeonato === 'todos' 
                        ? 'Não há jogos agendados no momento.' 
                        : `Não há jogos agendados para este campeonato.`
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {remainingGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </div>

            {/* Estatísticas */}
            {filteredGames.length > 0 && (
              <Card className="bg-gray-800 border-gray-700 mt-8">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-purple-400">
                        {filteredGames.length}
                      </p>
                      <p className="text-sm text-gray-400">Total de Jogos</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">
                        {filteredGames.filter(g => g.status === 'agendado').length}
                      </p>
                      <p className="text-sm text-gray-400">Agendados</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-400">
                        {filteredGames.filter(g => g.status === 'ao_vivo').length}
                      </p>
                      <p className="text-sm text-gray-400">Ao Vivo</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-400">
                        {filteredGames.filter(g => g.status === 'finalizado').length}
                      </p>
                      <p className="text-sm text-gray-400">Finalizados</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
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


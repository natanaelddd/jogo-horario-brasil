
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GameDataService } from '@/services/gameDataService';
import { CampeonatoType } from '@/types/game';
import { useToast } from '@/hooks/use-toast';
import AdminPanel from '@/components/AdminPanel';
import AppHeader from '@/components/AppHeader';
import ViewSelector from '@/components/ViewSelector';
import CampeonatoFilter from '@/components/CampeonatoFilter';
import GamesView from '@/components/GamesView';
import StandingsView from '@/components/StandingsView';
import CampeonatosView from '@/components/CampeonatosView';
import StatsCard from '@/components/StatsCard';

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedCampeonato, setSelectedCampeonato] = useState<CampeonatoType | 'todos'>('todos');
  const [activeView, setActiveView] = useState<'jogos' | 'classificacao' | 'campeonato'>('jogos');
  const { toast } = useToast();

  const { data: games = [], isLoading, error, refetch } = useQuery({
    queryKey: ['games', selectedCampeonato],
    queryFn: async () => {
      const gameService = GameDataService.getInstance();
      if (selectedCampeonato === 'todos') {
        return await gameService.fetchAllGames();
      } else {
        return await gameService.fetchGamesByCampeonato(selectedCampeonato);
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar jogos",
        description: "Não foi possível carregar os dados dos jogos. Tente novamente.",
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const handleManualRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Dados atualizados",
        description: "Os jogos foram atualizados com sucesso!"
      });
    } catch {
      toast({
        title: "Erro na atualização",
        description: "Falha ao atualizar os dados",
        variant: "destructive"
      });
    }
  };

  const filteredGames = selectedCampeonato === 'todos' 
    ? games 
    : games.filter(game => game.campeonato === selectedCampeonato);

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold gradient-brasil bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setShowAdmin(false)}
            >
              Voltar ao Site
            </button>
          </div>
          <AdminPanel onDataUpdate={handleManualRefresh} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <AppHeader 
          onRefresh={handleManualRefresh}
          onShowAdmin={() => setShowAdmin(true)}
          isLoading={isLoading}
        />

        <ViewSelector 
          activeView={activeView}
          onViewChange={setActiveView}
        />

        {activeView !== 'campeonato' && (
          <CampeonatoFilter 
            selectedCampeonato={selectedCampeonato}
            onCampeonatoChange={setSelectedCampeonato}
          />
        )}

        {activeView === 'jogos' && (
          <>
            <GamesView 
              games={games}
              isLoading={isLoading}
              selectedCampeonato={selectedCampeonato}
            />
            <StatsCard games={filteredGames} />
          </>
        )}

        {activeView === 'classificacao' && (
          <StandingsView selectedCampeonato={selectedCampeonato} />
        )}

        {activeView === 'campeonato' && (
          <CampeonatosView 
            onCampeonatoSelect={setSelectedCampeonato}
            onViewChange={setActiveView}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

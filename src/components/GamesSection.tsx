
import { Game, CampeonatoType } from '@/types/game';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Trophy } from 'lucide-react';
import HeroGameSection from './HeroGameSection';
import CampeonatoFilter from './CampeonatoFilter';
import DebugInfo from './DebugInfo';
import GameCard from './GameCard';
import GameStats from './GameStats';
import { useGameFilters } from './GameFilters';

interface GamesSectionProps {
  games: Game[];
  isLoading: boolean;
  selectedCampeonato: CampeonatoType | 'todos';
  onCampeonatoChange: (campeonato: CampeonatoType | 'todos') => void;
}

const GamesSection = ({ 
  games, 
  isLoading, 
  selectedCampeonato, 
  onCampeonatoChange 
}: GamesSectionProps) => {
  const { filteredGames, heroGame, remainingGames, filterMayGames } = useGameFilters({
    games,
    selectedCampeonato,
    currentView: 'games'
  });

  return (
    <div className="space-y-6">
      {/* Hero Game Section */}
      <HeroGameSection game={heroGame} />

      {/* Filtros por Campeonato */}
      <CampeonatoFilter 
        selectedCampeonato={selectedCampeonato}
        onCampeonatoChange={onCampeonatoChange}
      />

      {/* Debug Info */}
      <DebugInfo
        totalGames={games.length}
        mayGamesCount={filterMayGames(games).length}
        selectedCampeonato={selectedCampeonato}
        filteredGamesCount={filteredGames.length}
        currentView="games"
        filterMayGames={filterMayGames}
        allGames={games}
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
              <h3 className="text-lg font-semibold mb-2 text-white">Nenhum jogo de maio encontrado</h3>
              <p className="text-gray-400">
                {selectedCampeonato === 'todos' 
                  ? 'Não há jogos de maio agendados no momento.' 
                  : `Não há jogos de maio agendados para este campeonato.`
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
      <GameStats games={filteredGames} />
    </div>
  );
};

export default GamesSection;

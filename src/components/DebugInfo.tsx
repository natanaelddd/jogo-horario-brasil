
import { Card, CardContent } from '@/components/ui/card';
import { Game, CampeonatoType } from '@/types/game';

interface DebugInfoProps {
  totalGames: number;
  mayGamesCount: number;
  selectedCampeonato: CampeonatoType | 'todos';
  filteredGamesCount: number;
  currentView: string;
  filterMayGames: (games: Game[]) => Game[];
  allGames: Game[];
}

const DebugInfo = ({ 
  totalGames, 
  mayGamesCount, 
  selectedCampeonato, 
  filteredGamesCount, 
  currentView,
  filterMayGames,
  allGames 
}: DebugInfoProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700 p-4">
      <CardContent>
        <p className="text-white text-sm">
          Debug: Total de jogos carregados: {totalGames} | 
          Jogos de maio filtrados: {currentView === 'games' ? mayGamesCount : 'N/A'} | 
          Filtro atual: {selectedCampeonato} | 
          Jogos exibidos: {filteredGamesCount}
        </p>
      </CardContent>
    </Card>
  );
};

export default DebugInfo;


import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Trophy } from 'lucide-react';
import { Game, CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';
import GameCard from './GameCard';

interface GamesViewProps {
  games: Game[];
  isLoading: boolean;
  selectedCampeonato: CampeonatoType | 'todos';
}

const GamesView = ({ games, isLoading, selectedCampeonato }: GamesViewProps) => {
  const filteredGames = selectedCampeonato === 'todos' 
    ? games 
    : games.filter(game => game.campeonato === selectedCampeonato);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
        <p className="text-lg">Carregando jogos...</p>
      </div>
    );
  }

  if (filteredGames.length === 0) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Nenhum jogo encontrado</h3>
          <p className="text-muted-foreground">
            {selectedCampeonato === 'todos' 
              ? 'Não há jogos agendados no momento.' 
              : `Não há jogos agendados para ${CAMPEONATOS[selectedCampeonato as CampeonatoType]?.nome}.`
            }
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GamesView;

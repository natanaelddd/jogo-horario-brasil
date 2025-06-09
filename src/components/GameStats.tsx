
import { Card, CardContent } from '@/components/ui/card';
import { Game } from '@/types/game';

interface GameStatsProps {
  games: Game[];
}

const GameStats = ({ games }: GameStatsProps) => {
  if (games.length === 0) return null;

  return (
    <Card className="bg-gray-800 border-gray-700 mt-8">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-400">
              {games.length}
            </p>
            <p className="text-sm text-gray-400">Jogos de Maio</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">
              {games.filter(g => g.status === 'agendado').length}
            </p>
            <p className="text-sm text-gray-400">Agendados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-400">
              {games.filter(g => g.status === 'ao_vivo').length}
            </p>
            <p className="text-sm text-gray-400">Ao Vivo</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-400">
              {games.filter(g => g.status === 'finalizado').length}
            </p>
            <p className="text-sm text-gray-400">Finalizados</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameStats;

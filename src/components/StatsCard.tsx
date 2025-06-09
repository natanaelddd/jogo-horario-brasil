
import { Card, CardContent } from '@/components/ui/card';
import { Game } from '@/types/game';

interface StatsCardProps {
  games: Game[];
}

const StatsCard = ({ games }: StatsCardProps) => {
  if (games.length === 0) return null;

  return (
    <Card className="mt-8">
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold gradient-brasil bg-clip-text text-transparent">
              {games.length}
            </p>
            <p className="text-sm text-muted-foreground">Total de Jogos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {games.filter(g => g.status === 'agendado').length}
            </p>
            <p className="text-sm text-muted-foreground">Agendados</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">
              {games.filter(g => g.status === 'ao_vivo').length}
            </p>
            <p className="text-sm text-muted-foreground">Ao Vivo</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {games.filter(g => g.status === 'finalizado').length}
            </p>
            <p className="text-sm text-muted-foreground">Finalizados</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

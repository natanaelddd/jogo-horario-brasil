
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { GameDataService } from '@/services/gameDataService';
import { Game, CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';

interface GameHistoryProps {
  campeonato: CampeonatoType;
  limit?: number;
}

const GameHistory = ({ campeonato, limit = 10 }: GameHistoryProps) => {
  const { data: games = [], isLoading } = useQuery({
    queryKey: ['game-history', campeonato],
    queryFn: async () => {
      const gameService = GameDataService.getInstance();
      const allGames = await gameService.fetchGamesByCampeonato(campeonato);
      
      // Filtrar jogos finalizados e ordenar por data mais recente
      const finishedGames = allGames
        .filter(game => game.status === 'finalizado')
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
        .slice(0, limit);
      
      return finishedGames;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      year: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center">Carregando histórico...</p>
        </CardContent>
      </Card>
    );
  }

  if (games.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Nenhum jogo finalizado encontrado
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Últimos Resultados - {CAMPEONATOS[campeonato]?.nome}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {games.map((game) => (
            <div key={game.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {game.rodada ? `${game.rodada}ª Rodada` : game.fase}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(game.data)}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Finalizado
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="text-right flex-1">
                    <p className="font-semibold text-sm">{game.time_casa}</p>
                  </div>
                  
                  <div className="px-3 py-1 bg-muted rounded-lg">
                    <span className="font-bold text-lg">
                      {game.placar_casa ?? 0} - {game.placar_fora ?? 0}
                    </span>
                  </div>
                  
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm">{game.time_fora}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{game.estadio}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameHistory;

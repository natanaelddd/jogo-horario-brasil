
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import { CampeonatoType, Game } from '@/types/game';
import { GameDataService } from '@/services/gameDataService';
import { CAMPEONATOS } from '@/config/campeonatos';

interface GameHistoryProps {
  campeonato: CampeonatoType;
  limit?: number;
}

const GameHistory = ({ campeonato, limit = 10 }: GameHistoryProps) => {
  const { data: games = [], isLoading } = useQuery({
    queryKey: ['game-history', campeonato, limit],
    queryFn: async () => {
      const gameService = GameDataService.getInstance();
      const allGames = await gameService.fetchGamesByCampeonato(campeonato);
      
      // Filtrar apenas jogos finalizados e ordenar por data (mais recentes primeiro)
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
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  const getResultColor = (placarCasa: number | null, placarFora: number | null) => {
    if (placarCasa === null || placarFora === null) return 'bg-gray-500';
    if (placarCasa > placarFora) return 'bg-green-600';
    if (placarCasa < placarFora) return 'bg-red-600';
    return 'bg-yellow-600';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Últimos Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (games.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Últimos Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Nenhum resultado disponível para {CAMPEONATOS[campeonato]?.nome}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Últimos Resultados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(game.data)}
                  <Clock className="w-4 h-4 ml-2" />
                  {game.hora}
                </div>
                {game.fase && (
                  <Badge variant="outline" className="text-xs">
                    {game.fase}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{game.time_casa}</span>
                    <Badge className={`${getResultColor(game.placar_casa, game.placar_fora)} text-white px-3 py-1`}>
                      {game.placar_casa !== null && game.placar_fora !== null 
                        ? `${game.placar_casa} - ${game.placar_fora}`
                        : 'N/A'
                      }
                    </Badge>
                    <span className="font-medium">{game.time_fora}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <MapPin className="w-3 h-3" />
                <span>{game.estadio}</span>
                {game.transmissao && game.transmissao.length > 0 && (
                  <>
                    <span>•</span>
                    <span>{game.transmissao.join(', ')}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameHistory;

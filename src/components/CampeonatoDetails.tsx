
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Calendar, BarChart3, History } from 'lucide-react';
import { CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';
import StandingsTable from './StandingsTable';
import GameHistory from './GameHistory';
import GameCard from './GameCard';
import { useQuery } from '@tanstack/react-query';
import { GameDataService } from '@/services/gameDataService';

interface CampeonatoDetailsProps {
  campeonato: CampeonatoType;
}

const CampeonatoDetails = ({ campeonato }: CampeonatoDetailsProps) => {
  const campeonatoInfo = CAMPEONATOS[campeonato];

  const { data: nextGames = [] } = useQuery({
    queryKey: ['next-games', campeonato],
    queryFn: async () => {
      const gameService = GameDataService.getInstance();
      const allGames = await gameService.fetchGamesByCampeonato(campeonato);
      
      // Filtrar próximos jogos
      const upcomingGames = allGames
        .filter(game => game.status === 'agendado')
        .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
        .slice(0, 6);
      
      return upcomingGames;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  if (!campeonatoInfo || !campeonatoInfo.ativo) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Campeonato não encontrado ou inativo
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header do Campeonato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className={`w-10 h-10 ${campeonatoInfo.cor} rounded-full flex items-center justify-center`}>
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{campeonatoInfo.nome}</h2>
              <p className="text-sm text-muted-foreground capitalize">{campeonatoInfo.categoria}</p>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Tabs com conteúdo */}
      <Tabs defaultValue="classificacao" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="classificacao">
            <BarChart3 className="w-4 h-4 mr-2" />
            Classificação
          </TabsTrigger>
          <TabsTrigger value="proximos">
            <Calendar className="w-4 h-4 mr-2" />
            Próximos Jogos
          </TabsTrigger>
          <TabsTrigger value="resultados">
            <History className="w-4 h-4 mr-2" />
            Resultados
          </TabsTrigger>
          <TabsTrigger value="estatisticas">
            <BarChart3 className="w-4 h-4 mr-2" />
            Estatísticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="classificacao" className="mt-6">
          <StandingsTable campeonato={campeonato} />
        </TabsContent>

        <TabsContent value="proximos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Jogos</CardTitle>
            </CardHeader>
            <CardContent>
              {nextGames.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum jogo agendado
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {nextGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resultados" className="mt-6">
          <GameHistory campeonato={campeonato} limit={15} />
        </TabsContent>

        <TabsContent value="estatisticas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Detalhadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Estatísticas detalhadas em breve...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CampeonatoDetails;

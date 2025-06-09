
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import TeamFlag from '@/components/TeamFlag';
import { Search, Users, Trophy } from 'lucide-react';
import { GameDataService } from '@/services/gameDataService';

const Times = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: games = [], isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: () => GameDataService.getInstance().fetchAllGames(),
  });

  // Extrair times únicos dos jogos
  const allTeams = Array.from(new Set([
    ...games.map(game => game.time_casa),
    ...games.map(game => game.time_fora)
  ])).sort();

  const filteredTeams = allTeams.filter(team =>
    team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTeamStats = (teamName: string) => {
    const teamGames = games.filter(game =>
      game.time_casa === teamName || game.time_fora === teamName
    );

    const stats = {
      jogos: teamGames.length,
      vitorias: 0,
      empates: 0,
      derrotas: 0,
      ultimoJogo: teamGames.find(game => game.status === 'finalizado'),
      proximoJogo: teamGames.find(game => game.status === 'agendado')
    };

    teamGames.forEach(game => {
      if (game.status === 'finalizado' && game.placar_casa !== null && game.placar_fora !== null) {
        const isHome = game.time_casa === teamName;
        const teamScore = isHome ? game.placar_casa : game.placar_fora;
        const opponentScore = isHome ? game.placar_fora : game.placar_casa;

        if (teamScore > opponentScore) stats.vitorias++;
        else if (teamScore === opponentScore) stats.empates++;
        else stats.derrotas++;
      }
    });

    return stats;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Navigation 
            onRefresh={() => {}}
            onShowAdmin={() => {}}
            isLoading={isLoading}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-400" />
                Times
              </h1>

              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar time..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeams.map((team) => {
                const stats = getTeamStats(team);
                return (
                  <Card key={team} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <TeamFlag teamName={team} size={40} />
                        <div>
                          <h3 className="text-white text-lg">{team}</h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {stats.jogos} jogos
                            </Badge>
                            <Badge variant="outline" className="text-xs text-green-400 border-green-400">
                              {stats.vitorias}V
                            </Badge>
                            <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                              {stats.empates}E
                            </Badge>
                            <Badge variant="outline" className="text-xs text-red-400 border-red-400">
                              {stats.derrotas}D
                            </Badge>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {stats.proximoJogo && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-400 mb-1">Próximo jogo:</p>
                          <p className="text-sm text-white">
                            {stats.proximoJogo.time_casa} vs {stats.proximoJogo.time_fora}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(stats.proximoJogo.data).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}
                      
                      {stats.ultimoJogo && (
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Último jogo:</p>
                          <p className="text-sm text-white">
                            {stats.ultimoJogo.time_casa} {stats.ultimoJogo.placar_casa} x {stats.ultimoJogo.placar_fora} {stats.ultimoJogo.time_fora}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredTeams.length === 0 && (
              <Card className="bg-gray-800 border-gray-700 text-center py-8">
                <CardContent>
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                  <h3 className="text-lg font-semibold mb-2 text-white">Nenhum time encontrado</h3>
                  <p className="text-gray-400">
                    Tente ajustar sua busca ou explore outros campeonatos.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Times;

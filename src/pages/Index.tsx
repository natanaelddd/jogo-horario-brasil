
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Settings, Trophy, Globe, Flag, Crown, Award, Star, Zap } from 'lucide-react';
import { GameDataService } from '@/services/gameDataService';
import { Game, CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';
import GameCard from '@/components/GameCard';
import AdminPanel from '@/components/AdminPanel';
import BannerDisplay from '@/components/BannerDisplay';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedCampeonato, setSelectedCampeonato] = useState<CampeonatoType | 'todos'>('todos');
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

  const getIconComponent = (iconName: string) => {
    const icons = { Trophy, Globe, Flag, Crown, Award, Star, Zap };
    return icons[iconName as keyof typeof icons] || Trophy;
  };

  const filteredGames = selectedCampeonato === 'todos' 
    ? games 
    : games.filter(game => game.campeonato === selectedCampeonato);

  const activeCampeonatos = Object.entries(CAMPEONATOS).filter(([_, camp]) => camp.ativo);

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold gradient-brasil bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <Button variant="outline" onClick={() => setShowAdmin(false)}>
              Voltar ao Site
            </Button>
          </div>
          <AdminPanel onDataUpdate={handleManualRefresh} isLoading={isLoading} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-brasil bg-clip-text text-transparent">
            Horário do Jogo
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Acompanhe todos os jogos dos principais campeonatos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Button 
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="gradient-brasil text-white font-semibold"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar Dados
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setShowAdmin(true)}
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>

        <BannerDisplay type="top" />

        {/* Filtros por Campeonato */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Selecione o Campeonato</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedCampeonato} onValueChange={(value) => setSelectedCampeonato(value as CampeonatoType | 'todos')}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 h-auto p-2">
                <TabsTrigger value="todos" className="flex items-center gap-2 p-3">
                  <Trophy className="w-4 h-4" />
                  Todos
                </TabsTrigger>
                {activeCampeonatos.map(([id, campeonato]) => {
                  const IconComponent = getIconComponent(campeonato.icone);
                  return (
                    <TabsTrigger 
                      key={id} 
                      value={id}
                      className="flex items-center gap-2 p-3 text-xs"
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="hidden sm:inline">{campeonato.nome}</span>
                      <span className="sm:hidden">{campeonato.nome.split(' ')[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Lista de Jogos */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
              <p className="text-lg">Carregando jogos...</p>
            </div>
          ) : filteredGames.length === 0 ? (
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
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>

        {/* Estatísticas */}
        {filteredGames.length > 0 && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold gradient-brasil bg-clip-text text-transparent">
                    {filteredGames.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total de Jogos</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredGames.filter(g => g.status === 'agendado').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Agendados</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredGames.filter(g => g.status === 'ao_vivo').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Ao Vivo</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-600">
                    {filteredGames.filter(g => g.status === 'finalizado').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Finalizados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;

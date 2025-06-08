import { useState, useEffect } from 'react';
import { Search, Calendar, Trophy, Settings, Globe, Flag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import GameCard from '@/components/GameCard';
import AdminPanel from '@/components/AdminPanel';
import BannerDisplay from '@/components/BannerDisplay';
import { GameDataService } from '@/services/gameDataService';
import { Game, CampeonatoType } from '@/types/game';
import { CAMPEONATOS, getCampeonatosByCategoria } from '@/config/campeonatos';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampeonato, setSelectedCampeonato] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const gameService = GameDataService.getInstance();

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    filterGames();
  }, [games, searchTerm, selectedCampeonato, selectedDate, selectedCategory]);

  const loadGames = async () => {
    setIsLoading(true);
    try {
      const { games: fetchedGames } = await gameService.fetchWithFallback();
      setGames(fetchedGames);
      toast({
        title: "Dados carregados",
        description: `${fetchedGames.length} jogos encontrados`
      });
    } catch (error) {
      toast({
        title: "Erro ao carregar dados",
        description: "Usando dados em cache",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterGames = () => {
    let filtered = [...games];

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.time_casa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.time_fora.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.estadio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        CAMPEONATOS[game.campeonato].nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por campeonato
    if (selectedCampeonato !== 'all') {
      filtered = filtered.filter(game => game.campeonato === selectedCampeonato);
    }

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(game => CAMPEONATOS[game.campeonato].categoria === selectedCategory);
    }

    // Filtro por data
    if (selectedDate !== 'all') {
      filtered = filtered.filter(game => game.data === selectedDate);
    }

    setFilteredGames(filtered);
  };

  const getUniqueDate = () => {
    const dates = Array.from(new Set(games.map(game => game.data))).sort();
    return dates;
  };

  const getGamesByCategory = (categoria: 'nacional' | 'internacional' | 'selecao') => {
    return filteredGames.filter(game => CAMPEONATOS[game.campeonato].categoria === categoria);
  };

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long' 
    });
  };

  const campeonatosNacionais = getCampeonatosByCategoria('nacional');
  const campeonatosInternacionais = getCampeonatosByCategoria('internacional');
  const campeonatosSelecao = getCampeonatosByCategoria('selecao');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="gradient-brasil text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Horário do Jogo</h1>
                <p className="text-white/90 text-sm">
                  Todos os campeonatos do futebol brasileiro
                </p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Painel de Administração</DialogTitle>
                </DialogHeader>
                <AdminPanel onDataUpdate={loadGames} isLoading={isLoading} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Banner do Topo */}
      <BannerDisplay type="top" className="container mx-auto px-4 pt-4" />

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Filtros */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por time, estádio ou campeonato..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                    <SelectItem value="selecao">Seleção</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCampeonato} onValueChange={setSelectedCampeonato}>
                  <SelectTrigger>
                    <SelectValue placeholder="Campeonato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os campeonatos</SelectItem>
                    {Object.values(CAMPEONATOS).filter(c => c.ativo).map(campeonato => (
                      <SelectItem key={campeonato.id} value={campeonato.id}>
                        {campeonato.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as datas</SelectItem>
                    {getUniqueDate().map(date => (
                      <SelectItem key={date} value={date}>
                        {formatDateDisplay(date)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Abas por categoria */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Todos ({filteredGames.length})
                </TabsTrigger>
                <TabsTrigger value="nacional" className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Nacional ({getGamesByCategory('nacional').length})
                </TabsTrigger>
                <TabsTrigger value="internacional" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Internacional ({getGamesByCategory('internacional').length})
                </TabsTrigger>
                <TabsTrigger value="selecao" className="flex items-center gap-2">
                  <Flag className="w-4 h-4" />
                  Seleção ({getGamesByCategory('selecao').length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Carregando jogos...</p>
                  </div>
                ) : filteredGames.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum jogo encontrado com os filtros selecionados</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGames.map(game => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                )}
              </TabsContent>

              {(['nacional', 'internacional', 'selecao'] as const).map(categoria => (
                <TabsContent key={categoria} value={categoria}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getGamesByCategory(categoria).map(game => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Banner Lateral */}
          <div className="w-80 hidden lg:block">
            <BannerDisplay type="sidebar" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Campeonatos Nacionais</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {campeonatosNacionais.map(camp => (
                  <li key={camp.id}>{camp.nome}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Campeonatos Internacionais</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {campeonatosInternacionais.map(camp => (
                  <li key={camp.id}>{camp.nome}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Seleção Brasileira</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {campeonatosSelecao.map(camp => (
                  <li key={camp.id}>{camp.nome}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-4 text-center">
            <p className="text-slate-400">
              © 2025 Horário do Jogo - Dados atualizados automaticamente via múltiplas fontes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import { useState, useEffect } from 'react';
import { Search, Calendar, Trophy, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import GameCard from '@/components/GameCard';
import AdminPanel from '@/components/AdminPanel';
import { GameDataService } from '@/services/gameDataService';
import { Game } from '@/types/game';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSerie, setSelectedSerie] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const gameService = GameDataService.getInstance();

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    filterGames();
  }, [games, searchTerm, selectedSerie, selectedDate]);

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
        game.estadio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por série
    if (selectedSerie !== 'all') {
      filtered = filtered.filter(game => game.serie === selectedSerie);
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

  const getGamesBySerie = (serie: 'A' | 'B' | 'C') => {
    return filteredGames.filter(game => game.serie === serie);
  };

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: '2-digit', 
      month: 'long' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="gradient-brasil text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Horário do Jogo</h1>
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
          <p className="text-white/90 mt-2">
            Acompanhe todos os jogos do Campeonato Brasileiro
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por time ou estádio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSerie} onValueChange={setSelectedSerie}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar série" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as séries</SelectItem>
                <SelectItem value="A">Série A</SelectItem>
                <SelectItem value="B">Série B</SelectItem>
                <SelectItem value="C">Série C</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar data" />
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

        {/* Abas por série */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">Todos os Jogos ({filteredGames.length})</TabsTrigger>
            <TabsTrigger value="A">Série A ({getGamesBySerie('A').length})</TabsTrigger>
            <TabsTrigger value="B">Série B ({getGamesBySerie('B').length})</TabsTrigger>
            <TabsTrigger value="C">Série C ({getGamesBySerie('C').length})</TabsTrigger>
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

          {(['A', 'B', 'C'] as const).map(serie => (
            <TabsContent key={serie} value={serie}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getGamesBySerie(serie).map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2025 Horário do Jogo - Dados atualizados automaticamente via integração CBF
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

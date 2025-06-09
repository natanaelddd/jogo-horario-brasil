
import { Game, CampeonatoType } from '@/types/game';

export interface GameFiltersProps {
  games: Game[];
  selectedCampeonato: CampeonatoType | 'todos';
  currentView: 'games' | 'standings' | 'campeonatos';
}

export const useGameFilters = ({ games, selectedCampeonato, currentView }: GameFiltersProps) => {
  // Filtrar jogos apenas do mês de maio (2025-05) para a home
  const filterMayGames = (games: Game[]): Game[] => {
    console.log('Todos os jogos recebidos:', games.length);
    
    const mayGames = games.filter(game => {
      // Tratamento mais robusto da data
      const gameDate = new Date(game.data);
      console.log('Data do jogo:', game.data, 'Parsed:', gameDate);
      
      // Verificar se a data é válida
      if (isNaN(gameDate.getTime())) {
        console.log('Data inválida para jogo:', game);
        return false;
      }
      
      const gameYear = gameDate.getFullYear();
      const gameMonth = gameDate.getMonth() + 1; // getMonth() retorna 0-11
      
      console.log(`Jogo: ${game.time_casa} vs ${game.time_fora}, Data: ${game.data}, Ano: ${gameYear}, Mês: ${gameMonth}, Campeonato: ${game.campeonato}`);
      
      // Filtrar por maio de 2025
      const isMay2025 = gameYear === 2025 && gameMonth === 5;
      
      if (isMay2025) {
        console.log('✅ Jogo de maio encontrado:', game.time_casa, 'vs', game.time_fora);
      }
      
      return isMay2025;
    });
    
    console.log('Jogos de maio filtrados:', mayGames.length);
    mayGames.forEach(game => {
      console.log(`- ${game.time_casa} vs ${game.time_fora} (${game.campeonato}) - ${game.data}`);
    });
    
    return mayGames;
  };

  // Para a view de games (home), filtrar apenas jogos de maio
  let filteredGames = currentView === 'games' ? filterMayGames(games) : games;
  
  // Aplicar filtro de campeonato apenas se não for 'todos'
  if (selectedCampeonato !== 'todos') {
    console.log('Aplicando filtro de campeonato:', selectedCampeonato);
    filteredGames = filteredGames.filter(game => {
      console.log(`Verificando jogo ${game.time_casa} vs ${game.time_fora}: campeonato=${game.campeonato}, selecionado=${selectedCampeonato}`);
      return game.campeonato === selectedCampeonato;
    });
    console.log('Jogos após filtro de campeonato:', filteredGames.length);
  }

  // Encontrar o próximo jogo mais relevante para o Hero Section
  const getHeroGame = (games: Game[]): Game | null => {
    if (games.length === 0) return null;
    
    // Priorizar jogos ao vivo
    const liveGames = games.filter(game => game.status === 'ao_vivo');
    if (liveGames.length > 0) return liveGames[0];
    
    // Depois jogos agendados da seleção brasileira
    const brasilGames = games.filter(game => 
      game.status === 'agendado' && 
      (game.time_casa.toLowerCase().includes('brasil') || game.time_fora.toLowerCase().includes('brasil'))
    );
    if (brasilGames.length > 0) return brasilGames[0];
    
    // Por último, qualquer jogo agendado
    const scheduledGames = games.filter(game => game.status === 'agendado');
    return scheduledGames.length > 0 ? scheduledGames[0] : games[0];
  };

  const heroGame = getHeroGame(filteredGames);
  const remainingGames = filteredGames.filter(game => game.id !== heroGame?.id);

  return {
    filteredGames,
    heroGame,
    remainingGames,
    filterMayGames
  };
};


import { Game, FetchLog, DataSource, CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';
import { SupabaseGameService } from './supabaseGameService';
import { EXAMPLE_GAMES, getExampleGamesByCampeonato, getAllExampleGames } from '@/data/exampleGames';

export class GameDataService {
  private static instance: GameDataService;
  private supabaseService: SupabaseGameService;
  
  static getInstance(): GameDataService {
    if (!GameDataService.instance) {
      GameDataService.instance = new GameDataService();
    }
    return GameDataService.instance;
  }

  constructor() {
    this.supabaseService = SupabaseGameService.getInstance();
  }

  async fetchGamesByCampeonato(campeonato: CampeonatoType): Promise<Game[]> {
    console.log(`Buscando jogos do campeonato: ${CAMPEONATOS[campeonato].nome}`);
    
    try {
      const games = await this.supabaseService.fetchGamesByCampeonato(campeonato);
      
      // Se não encontrou jogos no Supabase, usa dados de exemplo
      if (games.length === 0) {
        console.log('Nenhum jogo encontrado no Supabase, usando dados de exemplo');
        const exampleGames = getExampleGamesByCampeonato(campeonato);
        
        // Log do fallback
        await this.supabaseService.logFetch({
          timestamp: new Date().toISOString(),
          status: 'partial',
          source: 'Example Data (Fallback)',
          campeonato,
          gamesFound: exampleGames.length,
          message: `Usando dados de exemplo para ${CAMPEONATOS[campeonato].nome} - Supabase retornou 0 jogos`
        });
        
        return exampleGames;
      }
      
      // Log da busca bem-sucedida
      await this.supabaseService.logFetch({
        timestamp: new Date().toISOString(),
        status: 'success',
        source: 'Supabase Database',
        campeonato,
        gamesFound: games.length,
        message: `Dados obtidos com sucesso do Supabase para ${CAMPEONATOS[campeonato].nome}`
      });
      
      return games;
    } catch (error) {
      console.error('Erro ao buscar dados do Supabase:', error);
      
      // Em caso de erro, usa dados de exemplo
      console.log('Erro na conexão com Supabase, usando dados de exemplo');
      const exampleGames = getExampleGamesByCampeonato(campeonato);
      
      // Log do erro e fallback
      await this.supabaseService.logFetch({
        timestamp: new Date().toISOString(),
        status: 'error',
        source: 'Example Data (Error Fallback)',
        campeonato,
        gamesFound: exampleGames.length,
        message: `Erro ao buscar dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}. Usando dados de exemplo.`
      });
      
      return exampleGames;
    }
  }

  async fetchAllGames(): Promise<Game[]> {
    console.log('Iniciando busca de dados de todos os campeonatos...');
    
    try {
      const games = await this.supabaseService.fetchAllGames();
      
      // Se não encontrou jogos no Supabase, usa dados de exemplo
      if (games.length === 0) {
        console.log('Nenhum jogo encontrado no Supabase, usando dados de exemplo');
        const exampleGames = getAllExampleGames();
        
        // Log do fallback
        await this.supabaseService.logFetch({
          timestamp: new Date().toISOString(),
          status: 'partial',
          source: 'Example Data (Fallback)',
          campeonato: 'brasileiro-a', // campeonato padrão para logs gerais
          gamesFound: exampleGames.length,
          message: `Usando dados de exemplo - Supabase retornou 0 jogos`
        });
        
        return exampleGames;
      }
      
      // Log da busca bem-sucedida
      await this.supabaseService.logFetch({
        timestamp: new Date().toISOString(),
        status: 'success',
        source: 'Supabase Database',
        campeonato: 'brasileiro-a', // campeonato padrão para logs gerais
        gamesFound: games.length,
        message: `Todos os jogos obtidos com sucesso do Supabase`
      });
      
      return games;
    } catch (error) {
      console.error('Erro ao buscar todos os jogos:', error);
      
      // Em caso de erro, usa dados de exemplo
      console.log('Erro na conexão com Supabase, usando dados de exemplo');
      const exampleGames = getAllExampleGames();
      
      // Log do erro e fallback
      await this.supabaseService.logFetch({
        timestamp: new Date().toISOString(),
        status: 'error',
        source: 'Example Data (Error Fallback)',
        campeonato: 'brasileiro-a',
        gamesFound: exampleGames.length,
        message: `Erro ao buscar todos os jogos: ${error instanceof Error ? error.message : 'Erro desconhecido'}. Usando dados de exemplo.`
      });
      
      return exampleGames;
    }
  }

  async getFetchLogs(): Promise<FetchLog[]> {
    try {
      return await this.supabaseService.getFetchLogs();
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      return [];
    }
  }

  async getDataSources(): Promise<DataSource[]> {
    try {
      return await this.supabaseService.getDataSources();
    } catch (error) {
      console.error('Erro ao buscar fontes de dados:', error);
      // Retorna fontes padrão em caso de erro
      return [
        { 
          name: 'Supabase Database', 
          url: 'https://supabase.com/', 
          active: true, 
          priority: 1,
          campeonatos: Object.keys(CAMPEONATOS) as CampeonatoType[]
        }
      ];
    }
  }

  getCampeonatos() {
    return CAMPEONATOS;
  }
}

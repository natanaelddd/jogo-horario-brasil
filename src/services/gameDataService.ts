
import { Game, FetchLog, DataSource, CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';
import { SupabaseGameService } from './supabaseGameService';

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
      
      // Log do erro
      await this.supabaseService.logFetch({
        timestamp: new Date().toISOString(),
        status: 'error',
        source: 'Supabase Database',
        campeonato,
        gamesFound: 0,
        message: `Erro ao buscar dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      });
      
      throw error;
    }
  }

  async fetchAllGames(): Promise<Game[]> {
    console.log('Iniciando busca de dados de todos os campeonatos...');
    
    try {
      const games = await this.supabaseService.fetchAllGames();
      
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
      
      // Log do erro
      await this.supabaseService.logFetch({
        timestamp: new Date().toISOString(),
        status: 'error',
        source: 'Supabase Database',
        campeonato: 'brasileiro-a',
        gamesFound: 0,
        message: `Erro ao buscar todos os jogos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`
      });
      
      throw error;
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

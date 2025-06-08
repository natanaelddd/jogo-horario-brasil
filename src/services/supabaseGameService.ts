
import { supabase } from '@/integrations/supabase/client';
import { Game, FetchLog, DataSource, CampeonatoType } from '@/types/game';

export class SupabaseGameService {
  private static instance: SupabaseGameService;
  
  static getInstance(): SupabaseGameService {
    if (!SupabaseGameService.instance) {
      SupabaseGameService.instance = new SupabaseGameService();
    }
    return SupabaseGameService.instance;
  }

  async fetchGamesByCampeonato(campeonato: CampeonatoType): Promise<Game[]> {
    console.log(`Buscando jogos do campeonato: ${campeonato} no Supabase`);
    
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('campeonato', campeonato)
      .order('data', { ascending: true });

    if (error) {
      console.error('Erro ao buscar jogos:', error);
      throw new Error(`Erro ao buscar jogos: ${error.message}`);
    }

    return this.transformSupabaseData(data || []);
  }

  async fetchAllGames(): Promise<Game[]> {
    console.log('Buscando todos os jogos do Supabase...');
    
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('data', { ascending: true });

    if (error) {
      console.error('Erro ao buscar jogos:', error);
      throw new Error(`Erro ao buscar jogos: ${error.message}`);
    }

    return this.transformSupabaseData(data || []);
  }

  async getFetchLogs(): Promise<FetchLog[]> {
    const { data, error } = await supabase
      .from('fetch_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Erro ao buscar logs:', error);
      return [];
    }

    return data.map(log => ({
      id: log.id,
      timestamp: log.timestamp,
      status: log.status as 'success' | 'error' | 'partial',
      source: log.source,
      campeonato: log.campeonato as CampeonatoType,
      gamesFound: log.games_found || 0,
      message: log.message || ''
    }));
  }

  async getDataSources(): Promise<DataSource[]> {
    const { data, error } = await supabase
      .from('data_sources')
      .select('*')
      .order('priority', { ascending: true });

    if (error) {
      console.error('Erro ao buscar fontes de dados:', error);
      return [];
    }

    return data.map(source => ({
      name: source.name,
      url: source.url,
      active: source.active,
      priority: source.priority,
      campeonatos: source.campeonatos as CampeonatoType[]
    }));
  }

  async logFetch(log: Omit<FetchLog, 'id'>): Promise<void> {
    const { error } = await supabase
      .from('fetch_logs')
      .insert({
        timestamp: log.timestamp,
        status: log.status,
        source: log.source,
        campeonato: log.campeonato,
        games_found: log.gamesFound,
        message: log.message
      });

    if (error) {
      console.error('Erro ao salvar log:', error);
    }
  }

  private transformSupabaseData(data: any[]): Game[] {
    return data.map(item => ({
      id: item.id,
      campeonato: item.campeonato,
      serie: item.serie,
      fase: item.fase,
      data: item.data,
      hora: item.hora,
      time_casa: item.time_casa,
      time_fora: item.time_fora,
      estadio: item.estadio,
      transmissao: item.transmissao || [],
      rodada: item.rodada,
      status: item.status || 'agendado',
      placar_casa: item.placar_casa,
      placar_fora: item.placar_fora
    }));
  }
}

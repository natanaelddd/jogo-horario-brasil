
import { supabase } from '@/integrations/supabase/client';

export interface Standing {
  id: string;
  campeonato: string;
  temporada: string;
  posicao: number;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gols_pro: number;
  gols_contra: number;
  saldo_gols: number;
  aproveitamento: number;
  ultimos_jogos: string[];
  team: {
    nome: string;
    nome_completo: string;
    sigla: string;
    escudo_url: string;
  };
}

export class StandingsService {
  private static instance: StandingsService;
  
  static getInstance(): StandingsService {
    if (!StandingsService.instance) {
      StandingsService.instance = new StandingsService();
    }
    return StandingsService.instance;
  }

  async getStandingsByCampeonato(campeonato: string): Promise<Standing[]> {
    console.log(`Buscando classificação do campeonato: ${campeonato}`);
    
    try {
      const { data, error } = await supabase
        .from('standings')
        .select(`
          *,
          team:teams(nome, nome_completo, sigla, escudo_url)
        `)
        .eq('campeonato', campeonato)
        .order('posicao', { ascending: true });

      if (error) {
        console.error('Erro ao buscar classificação:', error);
        throw new Error(`Erro ao buscar classificação: ${error.message}`);
      }

      return data.map(item => ({
        id: item.id,
        campeonato: item.campeonato,
        temporada: item.temporada,
        posicao: item.posicao,
        pontos: item.pontos,
        jogos: item.jogos,
        vitorias: item.vitorias,
        empates: item.empates,
        derrotas: item.derrotas,
        gols_pro: item.gols_pro,
        gols_contra: item.gols_contra,
        saldo_gols: item.saldo_gols,
        aproveitamento: item.aproveitamento,
        ultimos_jogos: item.ultimos_jogos || [],
        team: item.team
      }));
    } catch (error) {
      console.error('Erro na busca de classificação:', error);
      throw error;
    }
  }
}

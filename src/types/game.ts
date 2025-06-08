
export interface Game {
  id: string;
  campeonato: CampeonatoType;
  serie?: 'A' | 'B' | 'C' | 'D'; // Para campeonatos brasileiros
  fase?: string; // Para fases de mata-mata
  data: string;
  hora: string;
  time_casa: string;
  time_fora: string;
  estadio: string;
  transmissao: string[];
  rodada?: number;
  status?: 'agendado' | 'ao_vivo' | 'finalizado';
  placar_casa?: number;
  placar_fora?: number;
}

export type CampeonatoType = 
  | 'brasileiro-a'
  | 'brasileiro-b' 
  | 'brasileiro-c'
  | 'brasileiro-d'
  | 'copa-do-brasil'
  | 'libertadores'
  | 'sul-americana'
  | 'mundial-clubes'
  | 'copa-america'
  | 'eliminatorias-copa'
  | 'amistosos-selecao'
  | 'estaduais'
  | 'recopa-sul-americana'
  | 'supercopa-brasil';

export interface Campeonato {
  id: CampeonatoType;
  nome: string;
  categoria: 'nacional' | 'internacional' | 'selecao';
  cor: string;
  icone: string;
  ativo: boolean;
  temporada: string;
}

export interface FetchLog {
  id: string;
  timestamp: string;
  status: 'success' | 'error' | 'partial';
  source: string;
  campeonato: CampeonatoType;
  gamesFound: number;
  message: string;
}

export interface DataSource {
  name: string;
  url: string;
  active: boolean;
  priority: number;
  campeonatos: CampeonatoType[];
}

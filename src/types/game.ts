
export interface Game {
  id: string;
  serie: 'A' | 'B' | 'C';
  data: string;
  hora: string;
  time_casa: string;
  time_fora: string;
  estadio: string;
  transmissao: string[];
  rodada?: number;
  status?: 'agendado' | 'ao_vivo' | 'finalizado';
}

export interface FetchLog {
  id: string;
  timestamp: string;
  status: 'success' | 'error' | 'partial';
  source: string;
  gamesFound: number;
  message: string;
}

export interface DataSource {
  name: string;
  url: string;
  active: boolean;
  priority: number;
}

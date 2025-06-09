import { Game, CampeonatoType } from '@/types/game';

// Dados de exemplo para fallback quando a conexão com Supabase falhar
export const EXAMPLE_GAMES: Game[] = [
  {
    id: 'example-1',
    campeonato: 'eliminatorias-copa',
    serie: null,
    fase: 'Eliminatórias',
    data: '2025-03-27',
    hora: '21:45',
    time_casa: 'Brasil',
    time_fora: 'Uruguai',
    estadio: 'Arena Fonte Nova, Salvador',
    transmissao: ['Globo', 'SporTV'],
    rodada: null,
    status: 'agendado',
    placar_casa: null,
    placar_fora: null
  },
  {
    id: 'example-2',
    campeonato: 'eliminatorias-copa',
    serie: null,
    fase: 'Eliminatórias',
    data: '2025-04-01',
    hora: '20:30',
    time_casa: 'Argentina',
    time_fora: 'Brasil',
    estadio: 'Estádio Monumental, Buenos Aires',
    transmissao: ['Globo', 'SporTV'],
    rodada: null,
    status: 'agendado',
    placar_casa: null,
    placar_fora: null
  },
  {
    id: 'example-3',
    campeonato: 'amistosos-selecao',
    serie: null,
    fase: 'Amistoso',
    data: '2025-06-05',
    hora: '16:00',
    time_casa: 'Estados Unidos',
    time_fora: 'Brasil',
    estadio: 'MetLife Stadium, Nova Jersey',
    transmissao: ['SporTV'],
    rodada: null,
    status: 'agendado',
    placar_casa: null,
    placar_fora: null
  },
  {
    id: 'example-4',
    campeonato: 'amistosos-selecao',
    serie: null,
    fase: 'Amistoso',
    data: '2025-06-10',
    hora: '21:00',
    time_casa: 'Brasil',
    time_fora: 'México',
    estadio: 'Estádio Nacional, Brasília',
    transmissao: ['Globo', 'SporTV'],
    rodada: null,
    status: 'agendado',
    placar_casa: null,
    placar_fora: null
  },
  {
    id: 'example-5',
    campeonato: 'brasileiro-a',
    serie: 'A',
    fase: '1ª Rodada',
    data: '2025-04-15',
    hora: '16:00',
    time_casa: 'Flamengo',
    time_fora: 'Palmeiras',
    estadio: 'Maracanã, Rio de Janeiro',
    transmissao: ['Globo', 'Premiere'],
    rodada: 1,
    status: 'agendado',
    placar_casa: null,
    placar_fora: null
  },
  {
    id: 'example-6',
    campeonato: 'brasileiro-a',
    serie: 'A',
    fase: '1ª Rodada',
    data: '2025-04-15',
    hora: '18:30',
    time_casa: 'São Paulo',
    time_fora: 'Corinthians',
    estadio: 'Morumbi, São Paulo',
    transmissao: ['SporTV', 'Premiere'],
    rodada: 1,
    status: 'agendado',
    placar_casa: null,
    placar_fora: null
  },
  {
    id: 'example-7',
    campeonato: 'copa-do-brasil',
    serie: null,
    fase: '1ª Fase',
    data: '2025-03-20',
    hora: '19:30',
    time_casa: 'Grêmio',
    time_fora: 'Internacional',
    estadio: 'Arena do Grêmio, Porto Alegre',
    transmissao: ['SporTV', 'Amazon Prime'],
    rodada: null,
    status: 'agendado',
    placar_casa: null,
    placar_fora: null
  },
  {
    id: 'example-8',
    campeonato: 'libertadores',
    serie: null,
    fase: 'Fase de Grupos',
    data: '2025-04-08',
    hora: '21:30',
    time_casa: 'Fluminense',
    time_fora: 'River Plate',
    estadio: 'Maracanã, Rio de Janeiro',
    transmissao: ['SBT', 'Paramount+'],
    rodada: null,
    status: 'agendado',
    placar_casa: null,
    placar_fora: null
  }
];

export const getExampleGamesByCampeonato = (campeonato: CampeonatoType): Game[] => {
  return EXAMPLE_GAMES.filter(game => game.campeonato === campeonato);
};

export const getAllExampleGames = (): Game[] => {
  return EXAMPLE_GAMES;
};


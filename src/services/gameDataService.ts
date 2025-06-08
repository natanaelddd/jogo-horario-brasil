
import { Game, FetchLog, DataSource, CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';

// Fontes de dados expandidas para todos os campeonatos
const dataSources: DataSource[] = [
  { 
    name: 'CBF Official', 
    url: 'https://www.cbf.com.br/', 
    active: true, 
    priority: 1,
    campeonatos: ['brasileiro-a', 'brasileiro-b', 'brasileiro-c', 'brasileiro-d', 'copa-do-brasil']
  },
  { 
    name: 'CONMEBOL', 
    url: 'https://www.conmebol.com/', 
    active: true, 
    priority: 1,
    campeonatos: ['libertadores', 'sul-americana', 'recopa-sul-americana']
  },
  { 
    name: 'FIFA', 
    url: 'https://www.fifa.com/', 
    active: true, 
    priority: 1,
    campeonatos: ['mundial-clubes', 'copa-america', 'eliminatorias-copa']
  },
  { 
    name: 'Globo Esporte', 
    url: 'https://ge.globo.com/', 
    active: true, 
    priority: 2,
    campeonatos: Object.keys(CAMPEONATOS) as CampeonatoType[]
  },
  { 
    name: '365Scores', 
    url: 'https://365scores.com/', 
    active: true, 
    priority: 3,
    campeonatos: Object.keys(CAMPEONATOS) as CampeonatoType[]
  },
];

// Dados mockados expandidos para demonstração
const mockGames: Game[] = [
  // Brasileiro Série A
  {
    id: '1',
    campeonato: 'brasileiro-a',
    serie: 'A',
    data: '2025-06-08',
    hora: '16:00',
    time_casa: 'Flamengo',
    time_fora: 'Palmeiras',
    estadio: 'Maracanã',
    transmissao: ['Globo', 'Premiere'],
    rodada: 15,
    status: 'agendado'
  },
  // Copa Libertadores
  {
    id: '7',
    campeonato: 'libertadores',
    fase: 'Oitavas de Final',
    data: '2025-06-10',
    hora: '21:30',
    time_casa: 'Palmeiras',
    time_fora: 'River Plate (ARG)',
    estadio: 'Allianz Parque',
    transmissao: ['Paramount+', 'SBT'],
    status: 'agendado'
  },
  // Copa do Brasil
  {
    id: '8',
    campeonato: 'copa-do-brasil',
    fase: 'Quartas de Final',
    data: '2025-06-09',
    hora: '19:00',
    time_casa: 'Fluminense',
    time_fora: 'Grêmio',
    estadio: 'Maracanã',
    transmissao: ['Globo', 'Amazon Prime'],
    status: 'agendado'
  },
  // Sul-Americana
  {
    id: '9',
    campeonato: 'sul-americana',
    fase: 'Fase de Grupos',
    data: '2025-06-11',
    hora: '19:15',
    time_casa: 'Santos',
    time_fora: 'Independiente (ARG)',
    estadio: 'Vila Belmiro',
    transmissao: ['Paramount+'],
    rodada: 4,
    status: 'agendado'
  },
  // Eliminatórias
  {
    id: '10',
    campeonato: 'eliminatorias-copa',
    data: '2025-06-12',
    hora: '21:45',
    time_casa: 'Brasil',
    time_fora: 'Argentina',
    estadio: 'Arena Corinthians',
    transmissao: ['Globo', 'SporTV'],
    status: 'agendado'
  },
  // Estaduais
  {
    id: '11',
    campeonato: 'estaduais',
    data: '2025-06-08',
    hora: '15:30',
    time_casa: 'Corinthians',
    time_fora: 'São Paulo',
    estadio: 'Arena Corinthians',
    transmissao: ['Record', 'Paulistão Play'],
    rodada: 8,
    status: 'agendado'
  }
];

const fetchLogs: FetchLog[] = [];

export class GameDataService {
  private static instance: GameDataService;
  
  static getInstance(): GameDataService {
    if (!GameDataService.instance) {
      GameDataService.instance = new GameDataService();
    }
    return GameDataService.instance;
  }

  async fetchGamesByCampeonato(campeonato: CampeonatoType): Promise<Game[]> {
    console.log(`Buscando jogos do campeonato: ${CAMPEONATOS[campeonato].nome}`);
    
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filtra jogos mockados pelo campeonato
    return mockGames.filter(game => game.campeonato === campeonato);
  }

  async fetchAllGames(): Promise<Game[]> {
    console.log('Iniciando busca de dados de todos os campeonatos...');
    
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return mockGames;
  }

  async fetchWithFallback(campeonato?: CampeonatoType): Promise<{ games: Game[], log: FetchLog }> {
    let lastError: Error | null = null;
    
    const relevantSources = campeonato 
      ? dataSources.filter(s => s.active && s.campeonatos.includes(campeonato))
      : dataSources.filter(s => s.active);
    
    for (const source of relevantSources.sort((a, b) => a.priority - b.priority)) {
      try {
        console.log(`Tentando buscar dados de: ${source.name} ${campeonato ? `para ${CAMPEONATOS[campeonato].nome}` : ''}`);
        
        const games = campeonato 
          ? await this.fetchGamesByCampeonato(campeonato)
          : await this.fetchAllGames();
        
        const log: FetchLog = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          status: 'success',
          source: source.name,
          campeonato: campeonato || 'brasileiro-a',
          gamesFound: games.length,
          message: `Dados obtidos com sucesso de ${source.name}${campeonato ? ` para ${CAMPEONATOS[campeonato].nome}` : ''}`
        };
        
        fetchLogs.unshift(log);
        if (fetchLogs.length > 50) fetchLogs.pop();
        
        return { games, log };
      } catch (error) {
        lastError = error as Error;
        console.error(`Erro ao buscar de ${source.name}:`, error);
        continue;
      }
    }
    
    const errorLog: FetchLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'error',
      source: 'All sources failed',
      campeonato: campeonato || 'brasileiro-a',
      gamesFound: 0,
      message: `Falha em todas as fontes. Último erro: ${lastError?.message}`
    };
    
    fetchLogs.unshift(errorLog);
    if (fetchLogs.length > 50) fetchLogs.pop();
    
    throw new Error('Todas as fontes de dados falharam');
  }

  getFetchLogs(): FetchLog[] {
    return [...fetchLogs];
  }

  getDataSources(): DataSource[] {
    return [...dataSources];
  }

  getCampeonatos() {
    return CAMPEONATOS;
  }
}

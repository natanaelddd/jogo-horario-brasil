
import { Game, FetchLog, DataSource } from '@/types/game';

// Simulação de fontes de dados (em produção, essas seriam APIs reais)
const dataSources: DataSource[] = [
  { name: 'CBF Official', url: 'https://www.cbf.com.br/', active: true, priority: 1 },
  { name: 'Globo Esporte', url: 'https://ge.globo.com/', active: true, priority: 2 },
  { name: '365Scores', url: 'https://365scores.com/', active: true, priority: 3 },
];

// Dados mockados para demonstração
const mockGames: Game[] = [
  {
    id: '1',
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
  {
    id: '2',
    serie: 'A',
    data: '2025-06-08',
    hora: '18:30',
    time_casa: 'São Paulo',
    time_fora: 'Corinthians',
    estadio: 'Morumbi',
    transmissao: ['SporTV', 'Premiere'],
    rodada: 15,
    status: 'agendado'
  },
  {
    id: '3',
    serie: 'A',
    data: '2025-06-09',
    hora: '11:00',
    time_casa: 'Santos',
    time_fora: 'Grêmio',
    estadio: 'Vila Belmiro',
    transmissao: ['Globo'],
    rodada: 15,
    status: 'agendado'
  },
  {
    id: '4',
    serie: 'B',
    data: '2025-06-08',
    hora: '19:00',
    time_casa: 'Sport',
    time_fora: 'Ceará',
    estadio: 'Ilha do Retiro',
    transmissao: ['SporTV'],
    rodada: 12,
    status: 'agendado'
  },
  {
    id: '5',
    serie: 'B',
    data: '2025-06-09',
    hora: '16:30',
    time_casa: 'Ponte Preta',
    time_fora: 'Guarani',
    estadio: 'Moisés Lucarelli',
    transmissao: ['Premiere'],
    rodada: 12,
    status: 'agendado'
  },
  {
    id: '6',
    serie: 'C',
    data: '2025-06-08',
    hora: '15:00',
    time_casa: 'Náutico',
    time_fora: 'Remo',
    estadio: 'Aflitos',
    transmissao: ['DAZN'],
    rodada: 8,
    status: 'agendado'
  }
];

const fetchLogs: FetchLog[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    status: 'success',
    source: 'CBF Official',
    gamesFound: 6,
    message: 'Dados atualizados com sucesso'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'success',
    source: 'Globo Esporte',
    gamesFound: 5,
    message: 'Fallback executado com sucesso'
  }
];

export class GameDataService {
  private static instance: GameDataService;
  
  static getInstance(): GameDataService {
    if (!GameDataService.instance) {
      GameDataService.instance = new GameDataService();
    }
    return GameDataService.instance;
  }

  async fetchGames(): Promise<Game[]> {
    console.log('Iniciando busca de dados dos jogos...');
    
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Em produção, aqui seria feita a integração real com as APIs
    return mockGames;
  }

  async fetchWithFallback(): Promise<{ games: Game[], log: FetchLog }> {
    let lastError: Error | null = null;
    
    for (const source of dataSources.filter(s => s.active).sort((a, b) => a.priority - b.priority)) {
      try {
        console.log(`Tentando buscar dados de: ${source.name}`);
        
        // Simula tentativa de fetch
        const games = await this.fetchGames();
        
        const log: FetchLog = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          status: 'success',
          source: source.name,
          gamesFound: games.length,
          message: `Dados obtidos com sucesso de ${source.name}`
        };
        
        fetchLogs.unshift(log);
        if (fetchLogs.length > 10) fetchLogs.pop();
        
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
      gamesFound: 0,
      message: `Falha em todas as fontes. Último erro: ${lastError?.message}`
    };
    
    fetchLogs.unshift(errorLog);
    if (fetchLogs.length > 10) fetchLogs.pop();
    
    throw new Error('Todas as fontes de dados falharam');
  }

  getFetchLogs(): FetchLog[] {
    return [...fetchLogs];
  }

  getDataSources(): DataSource[] {
    return [...dataSources];
  }
}


export interface TeamInfo {
  name: string;
  flag: string;
  colors: string[];
}

export class TeamService {
  private static instance: TeamService;
  private teams: Record<string, TeamInfo> = {
    // Times da Série A
    'flamengo': { 
      name: 'Flamengo', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/flamengo-vector-logo.png',
      colors: ['#ff0000', '#000000']
    },
    'palmeiras': { 
      name: 'Palmeiras', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/palmeiras-vector-logo.png',
      colors: ['#00ff00', '#ffffff']
    },
    'corinthians': { 
      name: 'Corinthians', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/corinthians-vector-logo.png',
      colors: ['#000000', '#ffffff']
    },
    'são paulo': { 
      name: 'São Paulo', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/sao-paulo-fc-vector-logo.png',
      colors: ['#ff0000', '#000000', '#ffffff']
    },
    'santos': { 
      name: 'Santos', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/santos-vector-logo.png',
      colors: ['#000000', '#ffffff']
    },
    'grêmio': { 
      name: 'Grêmio', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/gremio-vector-logo.png',
      colors: ['#0000ff', '#000000', '#ffffff']
    },
    'internacional': { 
      name: 'Internacional', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/internacional-vector-logo.png',
      colors: ['#ff0000', '#ffffff']
    },
    'atlético-mg': { 
      name: 'Atlético-MG', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mineiro-vector-logo.png',
      colors: ['#000000', '#ffffff']
    },
    'cruzeiro': { 
      name: 'Cruzeiro', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/cruzeiro-vector-logo.png',
      colors: ['#0000ff', '#ffffff']
    },
    'botafogo': { 
      name: 'Botafogo', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/botafogo-vector-logo.png',
      colors: ['#000000', '#ffffff']
    },
    'vasco': { 
      name: 'Vasco', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png',
      colors: ['#000000', '#ffffff']
    },
    'fluminense': { 
      name: 'Fluminense', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/fluminense-vector-logo.png',
      colors: ['#800000', '#00ff00', '#ffffff']
    },
    'bahia': { 
      name: 'Bahia', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/bahia-vector-logo.png',
      colors: ['#0000ff', '#ff0000', '#ffffff']
    },
    'vitória': { 
      name: 'Vitória', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/vitoria-vector-logo.png',
      colors: ['#ff0000', '#000000']
    },
    'sport': { 
      name: 'Sport', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/sport-recife-vector-logo.png',
      colors: ['#ff0000', '#000000']
    },
    'ceará': { 
      name: 'Ceará', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/ceara-vector-logo.png',
      colors: ['#000000', '#ffffff']
    },
    'fortaleza': { 
      name: 'Fortaleza', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/fortaleza-vector-logo.png',
      colors: ['#ff0000', '#0000ff', '#ffffff']
    },
    'coritiba': { 
      name: 'Coritiba', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/coritiba-vector-logo.png',
      colors: ['#00ff00', '#ffffff']
    },
    'athletico-pr': { 
      name: 'Athletico-PR', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/atletico-paranaense-vector-logo.png',
      colors: ['#ff0000', '#000000']
    },
    'goiás': { 
      name: 'Goiás', 
      flag: 'https://logoeps.com/wp-content/uploads/2013/03/goias-vector-logo.png',
      colors: ['#00ff00', '#ffffff']
    }
  };

  private constructor() {}

  static getInstance(): TeamService {
    if (!TeamService.instance) {
      TeamService.instance = new TeamService();
    }
    return TeamService.instance;
  }

  getTeamInfo(teamName: string): TeamInfo | null {
    const normalizedName = teamName.toLowerCase()
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^(clube|sport|associação|sociedade)\s+/i, '')
      .replace(/\s+(fc|sc|ec|ac)$/i, '');

    // Busca exata primeiro
    if (this.teams[normalizedName]) {
      return this.teams[normalizedName];
    }

    // Busca por similaridade
    for (const [key, team] of Object.entries(this.teams)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return team;
      }
    }

    // Retorna um placeholder se não encontrar
    return {
      name: teamName,
      flag: '/placeholder.svg',
      colors: ['#333333', '#ffffff']
    };
  }

  addTeam(name: string, info: TeamInfo): void {
    this.teams[name.toLowerCase()] = info;
  }
}

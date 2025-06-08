
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
      flag: 'https://logodetimes.com/times/flamengo/logo-flamengo-256.png',
      colors: ['#ff0000', '#000000']
    },
    'palmeiras': { 
      name: 'Palmeiras', 
      flag: 'https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png',
      colors: ['#00ff00', '#ffffff']
    },
    'corinthians': { 
      name: 'Corinthians', 
      flag: 'https://logodetimes.com/times/corinthians/logo-corinthians-256.png',
      colors: ['#000000', '#ffffff']
    },
    'são paulo': { 
      name: 'São Paulo', 
      flag: 'https://logodetimes.com/times/sao-paulo/logo-sao-paulo-256.png',
      colors: ['#ff0000', '#000000', '#ffffff']
    },
    'santos': { 
      name: 'Santos', 
      flag: 'https://logodetimes.com/times/santos/logo-santos-256.png',
      colors: ['#000000', '#ffffff']
    },
    'grêmio': { 
      name: 'Grêmio', 
      flag: 'https://logodetimes.com/times/gremio/logo-gremio-256.png',
      colors: ['#0000ff', '#000000', '#ffffff']
    },
    'internacional': { 
      name: 'Internacional', 
      flag: 'https://logodetimes.com/times/internacional/logo-internacional-256.png',
      colors: ['#ff0000', '#ffffff']
    },
    'atlético-mg': { 
      name: 'Atlético-MG', 
      flag: 'https://logodetimes.com/times/atletico-mg/logo-atletico-mg-256.png',
      colors: ['#000000', '#ffffff']
    },
    'cruzeiro': { 
      name: 'Cruzeiro', 
      flag: 'https://logodetimes.com/times/cruzeiro/logo-cruzeiro-256.png',
      colors: ['#0000ff', '#ffffff']
    },
    'botafogo': { 
      name: 'Botafogo', 
      flag: 'https://logodetimes.com/times/botafogo/logo-botafogo-256.png',
      colors: ['#000000', '#ffffff']
    },
    'vasco': { 
      name: 'Vasco', 
      flag: 'https://logodetimes.com/times/vasco-da-gama/logo-vasco-da-gama-256.png',
      colors: ['#000000', '#ffffff']
    },
    'fluminense': { 
      name: 'Fluminense', 
      flag: 'https://logodetimes.com/times/fluminense/logo-fluminense-256.png',
      colors: ['#800000', '#00ff00', '#ffffff']
    },
    'bahia': { 
      name: 'Bahia', 
      flag: 'https://logodetimes.com/times/bahia/logo-bahia-256.png',
      colors: ['#0000ff', '#ff0000', '#ffffff']
    },
    'vitória': { 
      name: 'Vitória', 
      flag: 'https://logodetimes.com/times/vitoria/logo-vitoria-256.png',
      colors: ['#ff0000', '#000000']
    },
    'sport': { 
      name: 'Sport', 
      flag: 'https://logodetimes.com/times/sport/logo-sport-256.png',
      colors: ['#ff0000', '#000000']
    },
    'ceará': { 
      name: 'Ceará', 
      flag: 'https://logodetimes.com/times/ceara/logo-ceara-256.png',
      colors: ['#000000', '#ffffff']
    },
    'fortaleza': { 
      name: 'Fortaleza', 
      flag: 'https://logodetimes.com/times/fortaleza/logo-fortaleza-256.png',
      colors: ['#ff0000', '#0000ff', '#ffffff']
    },
    'coritiba': { 
      name: 'Coritiba', 
      flag: 'https://logodetimes.com/times/coritiba/logo-coritiba-256.png',
      colors: ['#00ff00', '#ffffff']
    },
    'athletico-pr': { 
      name: 'Athletico-PR', 
      flag: 'https://logodetimes.com/times/athletico-pr/logo-athletico-pr-256.png',
      colors: ['#ff0000', '#000000']
    },
    'goiás': { 
      name: 'Goiás', 
      flag: 'https://logodetimes.com/times/goias/logo-goias-256.png',
      colors: ['#00ff00', '#ffffff']
    },
    // Times internacionais
    'river plate (arg)': {
      name: 'River Plate (ARG)',
      flag: 'https://logodetimes.com/times/river-plate/logo-river-plate-256.png',
      colors: ['#ff0000', '#ffffff']
    },
    'independiente (arg)': {
      name: 'Independiente (ARG)',
      flag: 'https://logodetimes.com/times/independiente/logo-independiente-256.png',
      colors: ['#ff0000', '#ffffff']
    },
    // Seleções
    'brasil': {
      name: 'Brasil',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/CBF_logo.svg/240px-CBF_logo.svg.png',
      colors: ['#ffff00', '#00ff00']
    },
    'argentina': {
      name: 'Argentina',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/AFA_logo_%282017%29.svg/240px-AFA_logo_%282017%29.svg.png',
      colors: ['#0066cc', '#ffffff']
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
      flag: 'https://via.placeholder.com/32x32/cccccc/666666?text=?',
      colors: ['#333333', '#ffffff']
    };
  }

  addTeam(name: string, info: TeamInfo): void {
    this.teams[name.toLowerCase()] = info;
  }
}

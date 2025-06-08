
export interface TeamInfo {
  name: string;
  flag: string;
  colors: string[];
}

export class TeamService {
  private static instance: TeamService;
  private teams: Record<string, TeamInfo> = {
    // Times da Série A - URLs atualizadas e mais confiáveis
    'flamengo': { 
      name: 'Flamengo', 
      flag: 'https://logoeps.com/wp-content/uploads/2014/03/flamengo-vector-logo.png',
      colors: ['#ff0000', '#000000']
    },
    'palmeiras': { 
      name: 'Palmeiras', 
      flag: 'https://logoeps.com/wp-content/uploads/2014/03/palmeiras-vector-logo.png',
      colors: ['#00ff00', '#ffffff']
    },
    'corinthians': { 
      name: 'Corinthians', 
      flag: 'https://logoeps.com/wp-content/uploads/2014/03/corinthians-vector-logo.png',
      colors: ['#000000', '#ffffff']
    },
    'são paulo': { 
      name: 'São Paulo', 
      flag: 'https://logoeps.com/wp-content/uploads/2014/03/sao-paulo-vector-logo.png',
      colors: ['#ff0000', '#000000', '#ffffff']
    },
    'santos': { 
      name: 'Santos', 
      flag: 'https://logoeps.com/wp-content/uploads/2014/03/santos-vector-logo.png',
      colors: ['#000000', '#ffffff']
    },
    'grêmio': { 
      name: 'Grêmio', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Gr%C3%AAmio_FBPA_%28logo%29.svg/200px-Gr%C3%AAmio_FBPA_%28logo%29.svg.png',
      colors: ['#0000ff', '#000000', '#ffffff']
    },
    'internacional': { 
      name: 'Internacional', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Escudo_do_Sport_Club_Internacional.svg/200px-Escudo_do_Sport_Club_Internacional.svg.png',
      colors: ['#ff0000', '#ffffff']
    },
    'atlético-mg': { 
      name: 'Atlético-MG', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Escudo_do_Clube_Atl%C3%A9tico_Mineiro.svg/200px-Escudo_do_Clube_Atl%C3%A9tico_Mineiro.svg.png',
      colors: ['#000000', '#ffffff']
    },
    'cruzeiro': { 
      name: 'Cruzeiro', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg/200px-Cruzeiro_Esporte_Clube_%28logo%29.svg.png',
      colors: ['#0000ff', '#ffffff']
    },
    'botafogo': { 
      name: 'Botafogo', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg/200px-Botafogo_de_Futebol_e_Regatas_logo.svg.png',
      colors: ['#000000', '#ffffff']
    },
    'vasco': { 
      name: 'Vasco', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Logo_CR_Vasco_da_Gama.svg/200px-Logo_CR_Vasco_da_Gama.svg.png',
      colors: ['#000000', '#ffffff']
    },
    'fluminense': { 
      name: 'Fluminense', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Fluminense_FC_escudo.svg/200px-Fluminense_FC_escudo.svg.png',
      colors: ['#800000', '#00ff00', '#ffffff']
    },
    'bahia': { 
      name: 'Bahia', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Esporte_Clube_Bahia_logo.svg/200px-Esporte_Clube_Bahia_logo.svg.png',
      colors: ['#0000ff', '#ff0000', '#ffffff']
    },
    'vitória': { 
      name: 'Vitória', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Esporte_Clube_Vit%C3%B3ria_logo.svg/200px-Esporte_Clube_Vit%C3%B3ria_logo.svg.png',
      colors: ['#ff0000', '#000000']
    },
    'sport': { 
      name: 'Sport', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sport_Club_do_Recife_%28Logo%29.png/200px-Sport_Club_do_Recife_%28Logo%29.png',
      colors: ['#ff0000', '#000000']
    },
    'ceará': { 
      name: 'Ceará', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Cear%C3%A1_Sporting_Club_logo.svg/200px-Cear%C3%A1_Sporting_Club_logo.svg.png',
      colors: ['#000000', '#ffffff']
    },
    'fortaleza': { 
      name: 'Fortaleza', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/FortalezaEsporteClube.svg/200px-FortalezaEsporteClube.svg.png',
      colors: ['#ff0000', '#0000ff', '#ffffff']
    },
    'coritiba': { 
      name: 'Coritiba', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Coritiba_Foot_Ball_Club_%28logo%29.svg/200px-Coritiba_Foot_Ball_Club_%28logo%29.svg.png',
      colors: ['#00ff00', '#ffffff']
    },
    'athletico-pr': { 
      name: 'Athletico-PR', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Club_Athletico_Paranaense.svg/200px-Club_Athletico_Paranaense.svg.png',
      colors: ['#ff0000', '#000000']
    },
    'goiás': { 
      name: 'Goiás', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Goi%C3%A1s_Esporte_Clube.svg/200px-Goi%C3%A1s_Esporte_Clube.svg.png',
      colors: ['#00ff00', '#ffffff']
    },
    // Times internacionais
    'river plate (arg)': {
      name: 'River Plate (ARG)',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Escudo_del_C_A_River_Plate.svg/200px-Escudo_del_C_A_River_Plate.svg.png',
      colors: ['#ff0000', '#ffffff']
    },
    'independiente (arg)': {
      name: 'Independiente (ARG)',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Escudo_del_Club_Atl%C3%A9tico_Independiente.svg/200px-Escudo_del_Club_Atl%C3%A9tico_Independiente.svg.png',
      colors: ['#ff0000', '#ffffff']
    },
    // Seleções
    'brasil': {
      name: 'Brasil',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/CBF_logo.svg/200px-CBF_logo.svg.png',
      colors: ['#ffff00', '#00ff00']
    },
    'argentina': {
      name: 'Argentina',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/AFA_logo_%282017%29.svg/200px-AFA_logo_%282017%29.svg.png',
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

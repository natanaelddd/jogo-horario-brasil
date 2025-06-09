
import React from 'react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
}

const TeamFlag = ({ teamName, size = 20 }: TeamFlagProps) => {
  const getTeamShieldUrl = (name: string) => {
    // URLs dos escudos dos times brasileiros - Wikipedia e fontes oficiais
    const teamShields: { [key: string]: string } = {
      'Flamengo': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Flamengo-RJ_%28BRA%29.png',
      'Palmeiras': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg',
      'Corinthians': 'https://upload.wikimedia.org/wikipedia/en/5/5a/Corinthians_logo.svg',
      'São Paulo': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg',
      'Santos': 'https://upload.wikimedia.org/wikipedia/commons/3/35/Santos_logo.svg',
      'Botafogo': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg',
      'Atlético-MG': 'https://upload.wikimedia.org/wikipedia/en/c/c2/Atletico_Mineiro_logo.svg',
      'Cruzeiro': 'https://upload.wikimedia.org/wikipedia/en/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg',
      'Grêmio': 'https://upload.wikimedia.org/wikipedia/en/f/f1/Gremio_logo.svg',
      'Internacional': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Sport_Club_Internacional.svg',
      'Fluminense': 'https://upload.wikimedia.org/wikipedia/en/3/33/Fluminense_FC_escudo.svg',
      'Vasco': 'https://upload.wikimedia.org/wikipedia/en/a/ac/CR_Vasco_da_Gama_Logo.svg',
      'Sport': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Sport_Club_do_Recife_%28emblem%29.svg',
      'Ceará': 'https://upload.wikimedia.org/wikipedia/en/3/3c/Ceara_logo.svg',
      'Coritiba': 'https://upload.wikimedia.org/wikipedia/en/9/99/Coritiba_logo.svg',
      'Vitória': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Vit%C3%B3ria_logo.svg',
      'Fortaleza': 'https://upload.wikimedia.org/wikipedia/commons/4/40/FortalezaEsporteClube.svg',
      'Athletico-PR': 'https://upload.wikimedia.org/wikipedia/en/5/56/Athletico_Paranaense.svg',
      'Bahia': 'https://upload.wikimedia.org/wikipedia/en/4/43/EC_Bahia_logo.svg',
      'Bragantino': 'https://upload.wikimedia.org/wikipedia/en/9/9b/RB_Bragantino_logo.svg',
      'Juventude': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Juventude_logo.svg',
      'Cuiabá': 'https://upload.wikimedia.org/wikipedia/en/2/2e/Cuiab%C3%A1_Esporte_Clube_logo.svg',
      'Atlético-GO': 'https://upload.wikimedia.org/wikipedia/en/6/6f/Atletico_Goianiense_logo.svg',
      'Chapecoense': 'https://upload.wikimedia.org/wikipedia/en/9/9b/Chapecoense_logo.svg'
    };
    
    return teamShields[name];
  };

  const getTeamColor = (name: string) => {
    // Cores características dos times brasileiros como fallback
    const teamColors: { [key: string]: string } = {
      'Flamengo': 'bg-red-600',
      'Palmeiras': 'bg-green-700',
      'Corinthians': 'bg-gray-800',
      'São Paulo': 'bg-red-700',
      'Santos': 'bg-gray-900',
      'Botafogo': 'bg-gray-900',
      'Atlético-MG': 'bg-gray-800',
      'Cruzeiro': 'bg-blue-600',
      'Grêmio': 'bg-blue-700',
      'Internacional': 'bg-red-700',
      'Fluminense': 'bg-red-600',
      'Vasco': 'bg-gray-900',
      'Sport': 'bg-red-600',
      'Ceará': 'bg-gray-800',
      'Coritiba': 'bg-green-600',
      'Vitória': 'bg-red-700',
      'Fortaleza': 'bg-blue-600',
      'Athletico-PR': 'bg-red-600',
      'Bahia': 'bg-blue-600',
      'Bragantino': 'bg-red-600',
      'Juventude': 'bg-green-600',
      'Cuiabá': 'bg-yellow-600',
      'Atlético-GO': 'bg-red-600',
      'Chapecoense': 'bg-green-600'
    };
    
    return teamColors[name] || 'bg-primary';
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const shieldUrl = getTeamShieldUrl(teamName);
  const teamColor = getTeamColor(teamName);

  return (
    <div 
      className="flex items-center justify-center rounded-full relative overflow-hidden shadow-sm border bg-white"
      style={{ width: size, height: size }}
    >
      {shieldUrl ? (
        <img 
          src={shieldUrl}
          alt={`Escudo ${teamName}`}
          className="w-full h-full object-contain p-0.5"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          onError={(e) => {
            console.log(`Erro ao carregar escudo do ${teamName}:`, shieldUrl);
            // Em caso de erro na imagem, substitui por um fallback com iniciais
            const target = e.target as HTMLImageElement;
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full ${teamColor} text-white rounded-full flex items-center justify-center font-bold text-xs">
                  ${getInitials(teamName)}
                </div>
              `;
            }
          }}
          onLoad={() => {
            console.log(`Escudo carregado com sucesso para ${teamName}:`, shieldUrl);
          }}
        />
      ) : (
        // Fallback para times sem escudo definido
        <div 
          className={`w-full h-full ${teamColor} text-white rounded-full flex items-center justify-center font-bold text-xs`}
        >
          {getInitials(teamName)}
        </div>
      )}
    </div>
  );
};

export default TeamFlag;

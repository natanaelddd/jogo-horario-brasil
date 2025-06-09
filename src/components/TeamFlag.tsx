
import React from 'react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
}

const TeamFlag = ({ teamName, size = 20 }: TeamFlagProps) => {
  const getTeamShieldUrl = (name: string) => {
    // URLs dos escudos dos times brasileiros - usando CDN mais confiável
    const teamShields: { [key: string]: string } = {
      'Flamengo': 'https://logoeps.com/wp-content/uploads/2013/03/flamengo-vector-logo.png',
      'Palmeiras': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/200px-Palmeiras_logo.svg.png',
      'Corinthians': 'https://logoeps.com/wp-content/uploads/2013/03/corinthians-vector-logo.png',
      'São Paulo': 'https://logoeps.com/wp-content/uploads/2013/03/sao-paulo-vector-logo.png',
      'Santos': 'https://logoeps.com/wp-content/uploads/2013/03/santos-vector-logo.png',
      'Botafogo': 'https://logoeps.com/wp-content/uploads/2013/03/botafogo-vector-logo.png',
      'Atlético-MG': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mineiro-vector-logo.png',
      'Cruzeiro': 'https://logoeps.com/wp-content/uploads/2013/03/cruzeiro-vector-logo.png',
      'Grêmio': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Gremio_logo.svg/200px-Gremio_logo.svg.png',
      'Internacional': 'https://logoeps.com/wp-content/uploads/2013/03/internacional-vector-logo.png',
      'Fluminense': 'https://logoeps.com/wp-content/uploads/2013/03/fluminense-vector-logo.png',
      'Vasco': 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png',
      'Sport': 'https://logoeps.com/wp-content/uploads/2013/03/sport-recife-vector-logo.png',
      'Ceará': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Ceara_logo.svg/200px-Ceara_logo.svg.png',
      'Coritiba': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Coritiba_logo.svg/200px-Coritiba_logo.svg.png',
      'Vitória': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vit%C3%B3ria_logo.svg/200px-Vit%C3%B3ria_logo.svg.png',
      'Fortaleza': 'https://logoeps.com/wp-content/uploads/2013/03/fortaleza-vector-logo.png',
      'Athletico-PR': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-paranaense-vector-logo.png',
      'Bahia': 'https://logoeps.com/wp-content/uploads/2013/03/bahia-vector-logo.png',
      'Bragantino': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/RB_Bragantino_logo.svg/200px-RB_Bragantino_logo.svg.png',
      'Juventude': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Juventude_logo.svg/200px-Juventude_logo.svg.png',
      'Cuiabá': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cuiab%C3%A1_Esporte_Clube_logo.svg/200px-Cuiab%C3%A1_Esporte_Clube_logo.svg.png',
      'Atlético-GO': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Atletico_Goianiense_logo.svg/200px-Atletico_Goianiense_logo.svg.png',
      'Chapecoense': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Chapecoense_logo.svg/200px-Chapecoense_logo.svg.png'
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
      className="flex items-center justify-center rounded-full relative overflow-hidden shadow-sm border bg-card"
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

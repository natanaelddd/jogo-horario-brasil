
import React from 'react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
}

const TeamFlag = ({ teamName, size = 20 }: TeamFlagProps) => {
  const getTeamShieldUrl = (name: string) => {
    // URLs dos escudos dos times brasileiros do Google
    const teamShields: { [key: string]: string } = {
      'Flamengo': 'https://logoeps.com/wp-content/uploads/2013/03/flamengo-vector-logo.png',
      'Palmeiras': 'https://logoeps.com/wp-content/uploads/2013/03/palmeiras-vector-logo.png',
      'Corinthians': 'https://logoeps.com/wp-content/uploads/2013/03/corinthians-vector-logo.png',
      'São Paulo': 'https://logoeps.com/wp-content/uploads/2013/03/sao-paulo-vector-logo.png',
      'Santos': 'https://logoeps.com/wp-content/uploads/2013/03/santos-vector-logo.png',
      'Botafogo': 'https://logoeps.com/wp-content/uploads/2013/03/botafogo-vector-logo.png',
      'Atlético-MG': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mg-vector-logo.png',
      'Cruzeiro': 'https://logoeps.com/wp-content/uploads/2013/03/cruzeiro-vector-logo.png',
      'Grêmio': 'https://logoeps.com/wp-content/uploads/2013/03/gremio-vector-logo.png',
      'Internacional': 'https://logoeps.com/wp-content/uploads/2013/03/internacional-vector-logo.png',
      'Fluminense': 'https://logoeps.com/wp-content/uploads/2013/03/fluminense-vector-logo.png',
      'Vasco': 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png',
      'Sport': 'https://logoeps.com/wp-content/uploads/2013/03/sport-recife-vector-logo.png',
      'Ceará': 'https://logoeps.com/wp-content/uploads/2013/03/ceara-vector-logo.png',
      'Coritiba': 'https://logoeps.com/wp-content/uploads/2013/03/coritiba-vector-logo.png',
      'Vitória': 'https://logoeps.com/wp-content/uploads/2013/03/vitoria-vector-logo.png',
      'Fortaleza': 'https://logoeps.com/wp-content/uploads/2013/03/fortaleza-vector-logo.png',
      'Athletico-PR': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-pr-vector-logo.png',
      'Bahia': 'https://logoeps.com/wp-content/uploads/2013/03/bahia-vector-logo.png',
      'Bragantino': 'https://logoeps.com/wp-content/uploads/2013/03/red-bull-bragantino-vector-logo.png'
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
      'Bragantino': 'bg-red-600'
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
      className={`flex items-center justify-center rounded-full relative overflow-hidden shadow-sm border ${teamColor}`}
      style={{ width: size, height: size }}
    >
      {shieldUrl ? (
        <img 
          src={shieldUrl}
          alt={`Escudo ${teamName}`}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            // Em caso de erro, mostra as iniciais com a cor do time
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full ${teamColor} text-white rounded-full flex items-center justify-center font-bold" 
                     style="font-size: ${size * 0.4}px">
                  ${getInitials(teamName)}
                </div>
              `;
            }
          }}
        />
      ) : (
        // Fallback para times sem escudo definido
        <div 
          className={`w-full h-full ${teamColor} text-white rounded-full flex items-center justify-center font-bold`}
          style={{ fontSize: size * 0.4 }}
        >
          {getInitials(teamName)}
        </div>
      )}
    </div>
  );
};

export default TeamFlag;


import React, { useState } from 'react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
}

const TeamFlag = ({ teamName, size = 20 }: TeamFlagProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getTeamShieldUrl = (name: string) => {
    // URLs dos escudos dos times brasileiros - usando fontes mais confiáveis
    const teamShields: { [key: string]: string } = {
      // Times brasileiros - URLs mais estáveis
      'Flamengo': 'https://assets.api-sports.io/football/teams/127.png',
      'Palmeiras': 'https://assets.api-sports.io/football/teams/128.png',
      'Corinthians': 'https://assets.api-sports.io/football/teams/131.png',
      'São Paulo': 'https://assets.api-sports.io/football/teams/126.png',
      'Santos': 'https://assets.api-sports.io/football/teams/130.png',
      'Botafogo': 'https://assets.api-sports.io/football/teams/124.png',
      'Atlético-MG': 'https://assets.api-sports.io/football/teams/121.png',
      'Cruzeiro': 'https://assets.api-sports.io/football/teams/122.png',
      'Grêmio': 'https://assets.api-sports.io/football/teams/153.png',
      'Internacional': 'https://assets.api-sports.io/football/teams/123.png',
      'Fluminense': 'https://assets.api-sports.io/football/teams/125.png',
      'Vasco': 'https://assets.api-sports.io/football/teams/129.png',
      'Athletico-PR': 'https://assets.api-sports.io/football/teams/134.png',
      'Bahia': 'https://assets.api-sports.io/football/teams/142.png',
      'Fortaleza': 'https://assets.api-sports.io/football/teams/139.png',
      'Bragantino': 'https://assets.api-sports.io/football/teams/143.png',
      'Juventude': 'https://assets.api-sports.io/football/teams/154.png',
      'Cuiabá': 'https://assets.api-sports.io/football/teams/1064.png',
      'Atlético-GO': 'https://assets.api-sports.io/football/teams/140.png',
      'Ceará': 'https://assets.api-sports.io/football/teams/157.png',
      'Coritiba': 'https://assets.api-sports.io/football/teams/155.png',
      'Vitória': 'https://assets.api-sports.io/football/teams/150.png',
      'Sport': 'https://assets.api-sports.io/football/teams/138.png',
      'Chapecoense': 'https://assets.api-sports.io/football/teams/151.png',
      
      // Seleções das Eliminatórias
      'Brasil': 'https://assets.api-sports.io/football/teams/6.png',
      'Argentina': 'https://assets.api-sports.io/football/teams/26.png',
      'Uruguai': 'https://assets.api-sports.io/football/teams/7.png',
      'Colômbia': 'https://assets.api-sports.io/football/teams/8.png',
      'Chile': 'https://assets.api-sports.io/football/teams/9.png',
      'Peru': 'https://assets.api-sports.io/football/teams/2382.png',
      'Equador': 'https://assets.api-sports.io/football/teams/2382.png',
      'Paraguai': 'https://assets.api-sports.io/football/teams/11.png',
      'Bolívia': 'https://assets.api-sports.io/football/teams/12.png',
      'Venezuela': 'https://assets.api-sports.io/football/teams/2383.png'
    };
    
    return teamShields[name];
  };

  const getTeamColor = (name: string) => {
    // Cores características dos times brasileiros como fallback
    const teamColors: { [key: string]: string } = {
      'Flamengo': 'from-red-600 to-red-700',
      'Palmeiras': 'from-green-700 to-green-800',
      'Corinthians': 'from-gray-800 to-gray-900',
      'São Paulo': 'from-red-700 to-red-800',
      'Santos': 'from-gray-700 to-gray-800',
      'Botafogo': 'from-gray-900 to-black',
      'Atlético-MG': 'from-gray-800 to-gray-900',
      'Cruzeiro': 'from-blue-600 to-blue-700',
      'Grêmio': 'from-blue-700 to-blue-800',
      'Internacional': 'from-red-700 to-red-800',
      'Fluminense': 'from-red-600 to-red-700',
      'Vasco': 'from-gray-900 to-black',
      'Sport': 'from-red-600 to-red-700',
      'Ceará': 'from-gray-800 to-gray-900',
      'Coritiba': 'from-green-600 to-green-700',
      'Vitória': 'from-red-700 to-red-800',
      'Fortaleza': 'from-blue-600 to-blue-700',
      'Athletico-PR': 'from-red-600 to-red-700',
      'Bahia': 'from-blue-600 to-blue-700',
      'Bragantino': 'from-red-600 to-red-700',
      'Juventude': 'from-green-600 to-green-700',
      'Cuiabá': 'from-yellow-600 to-yellow-700',
      'Atlético-GO': 'from-red-600 to-red-700',
      'Chapecoense': 'from-green-600 to-green-700',
      'Brasil': 'from-yellow-400 to-green-600',
      'Argentina': 'from-blue-400 to-blue-600',
      'Uruguai': 'from-blue-600 to-blue-800'
    };
    
    return teamColors[name] || 'from-primary to-primary/80';
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

  const handleImageError = () => {
    console.log(`Erro ao carregar escudo do ${teamName}:`, shieldUrl);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`Escudo carregado com sucesso para ${teamName}:`, shieldUrl);
    setImageLoaded(true);
  };

  return (
    <div 
      className="team-flag-container relative"
      style={{ width: size, height: size }}
    >
      {shieldUrl && !imageError ? (
        <>
          {/* Loading placeholder enquanto a imagem carrega */}
          {!imageLoaded && (
            <div className={`absolute inset-0 bg-gradient-to-br ${teamColor} text-white rounded-full flex items-center justify-center font-bold team-flag-fallback animate-pulse`}>
              {getInitials(teamName)}
            </div>
          )}
          
          <img 
            src={shieldUrl}
            alt={`Escudo ${teamName}`}
            className={`w-full h-full object-contain p-0.5 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </>
      ) : (
        // Fallback para times sem escudo definido ou com erro
        <div 
          className={`w-full h-full bg-gradient-to-br ${teamColor} text-white rounded-full flex items-center justify-center font-bold team-flag-fallback`}
        >
          {getInitials(teamName)}
        </div>
      )}
    </div>
  );
};

export default TeamFlag;

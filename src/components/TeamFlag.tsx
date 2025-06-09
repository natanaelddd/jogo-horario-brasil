
import React, { useState } from 'react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
}

const TeamFlag = ({ teamName, size = 20 }: TeamFlagProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getTeamShieldUrl = (name: string) => {
    // URLs dos escudos dos times - usando múltiplas fontes mais confiáveis
    const teamShields: { [key: string]: string } = {
      // Times do Brasileirão Série A
      'Flamengo': 'https://logoeps.com/wp-content/uploads/2013/03/flamengo-vector-logo.png',
      'Palmeiras': 'https://logoeps.com/wp-content/uploads/2013/03/palmeiras-vector-logo.png',
      'Corinthians': 'https://logoeps.com/wp-content/uploads/2013/03/corinthians-vector-logo.png',
      'São Paulo': 'https://logoeps.com/wp-content/uploads/2013/03/sao-paulo-vector-logo.png',
      'Santos': 'https://logoeps.com/wp-content/uploads/2013/03/santos-vector-logo.png',
      'Botafogo': 'https://logoeps.com/wp-content/uploads/2013/03/botafogo-vector-logo.png',
      'Atlético-MG': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mineiro-vector-logo.png',
      'Atlético Mineiro': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mineiro-vector-logo.png',
      'Cruzeiro': 'https://logoeps.com/wp-content/uploads/2013/03/cruzeiro-vector-logo.png',
      'Grêmio': 'https://logoeps.com/wp-content/uploads/2013/03/gremio-vector-logo.png',
      'Internacional': 'https://logoeps.com/wp-content/uploads/2013/03/internacional-vector-logo.png',
      'Fluminense': 'https://logoeps.com/wp-content/uploads/2013/03/fluminense-vector-logo.png',
      'Vasco': 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png',
      'Vasco da Gama': 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png',
      'Athletico-PR': 'https://logos-world.net/wp-content/uploads/2020/06/Athletico-Paranaense-Logo.png',
      'Athletico Paranaense': 'https://logos-world.net/wp-content/uploads/2020/06/Athletico-Paranaense-Logo.png',
      'Bahia': 'https://logoeps.com/wp-content/uploads/2013/03/bahia-vector-logo.png',
      'Fortaleza': 'https://logoeps.com/wp-content/uploads/2014/11/fortaleza-2014-logo-vector.png',
      'Bragantino': 'https://logos-world.net/wp-content/uploads/2020/12/Red-Bull-Bragantino-Logo.png',
      'RB Bragantino': 'https://logos-world.net/wp-content/uploads/2020/12/Red-Bull-Bragantino-Logo.png',
      'Cuiabá': 'https://logoeps.com/wp-content/uploads/2021/03/cuiaba-vector-logo.png',
      'Atlético-GO': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-goianiense-vector-logo.png',
      'Atlético Goianiense': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-goianiense-vector-logo.png',
      'Ceará': 'https://logoeps.com/wp-content/uploads/2013/03/ceara-vector-logo.png',
      'Coritiba': 'https://logoeps.com/wp-content/uploads/2013/03/coritiba-vector-logo.png',
      'Vitória': 'https://logoeps.com/wp-content/uploads/2013/03/vitoria-vector-logo.png',
      'Sport': 'https://logoeps.com/wp-content/uploads/2013/03/sport-recife-vector-logo.png',
      'Sport Recife': 'https://logoeps.com/wp-content/uploads/2013/03/sport-recife-vector-logo.png',
      'Chapecoense': 'https://logoeps.com/wp-content/uploads/2013/03/chapecoense-vector-logo.png',
      'Juventude': 'https://logoeps.com/wp-content/uploads/2013/03/juventude-vector-logo.png',
      'América-MG': 'https://logoeps.com/wp-content/uploads/2021/05/america-mg-2021-logo-vector.png',
      'América Mineiro': 'https://logoeps.com/wp-content/uploads/2021/05/america-mg-2021-logo-vector.png',
      
      // Times da Série B
      'Guarani': 'https://logoeps.com/wp-content/uploads/2013/03/guarani-vector-logo.png',
      'Ponte Preta': 'https://logoeps.com/wp-content/uploads/2013/03/ponte-preta-vector-logo.png',
      'Avaí': 'https://logoeps.com/wp-content/uploads/2013/03/avai-vector-logo.png',
      'CRB': 'https://logoeps.com/wp-content/uploads/2013/03/crb-vector-logo.png',
      'Goiás': 'https://logoeps.com/wp-content/uploads/2013/03/goias-vector-logo.png',
      'Vila Nova': 'https://logoeps.com/wp-content/uploads/2018/02/vila-nova-2018-logo-vector.png',
      'Operário-PR': 'https://logoeps.com/wp-content/uploads/2019/06/operario-pr-2019-logo-vector.png',
      'Operário Ferroviário': 'https://logoeps.com/wp-content/uploads/2019/06/operario-pr-2019-logo-vector.png',
      'Novorizontino': 'https://logoeps.com/wp-content/uploads/2020/02/novorizontino-2020-logo-vector.png',
      'Mirassol': 'https://logoeps.com/wp-content/uploads/2020/08/mirassol-2020-logo-vector.png',
      
      // Seleções - URLs mais estáveis
      'Brasil': 'https://logoeps.com/wp-content/uploads/2012/11/brazil-national-football-team-vector-logo.png',
      'Argentina': 'https://logoeps.com/wp-content/uploads/2012/11/argentina-national-football-team-vector-logo.png',
      'Uruguai': 'https://logoeps.com/wp-content/uploads/2020/09/uruguay-national-football-team-logo-vector.png',
      'Colômbia': 'https://logoeps.com/wp-content/uploads/2020/09/colombia-national-football-team-logo-vector.png',
      'Chile': 'https://logoeps.com/wp-content/uploads/2020/09/chile-national-football-team-logo-vector.png',
      'Peru': 'https://logoeps.com/wp-content/uploads/2020/09/peru-national-football-team-logo-vector.png',
      'Equador': 'https://logoeps.com/wp-content/uploads/2020/09/ecuador-national-football-team-logo-vector.png',
      'Paraguai': 'https://logoeps.com/wp-content/uploads/2020/09/paraguay-national-football-team-logo-vector.png',
      'Bolívia': 'https://logoeps.com/wp-content/uploads/2020/09/bolivia-national-football-team-logo-vector.png',
      'Venezuela': 'https://logoeps.com/wp-content/uploads/2020/09/venezuela-national-football-team-logo-vector.png',
      
      // Times internacionais (Libertadores/Sul-Americana)
      'River Plate': 'https://logoeps.com/wp-content/uploads/2013/03/river-plate-vector-logo.png',
      'Boca Juniors': 'https://logoeps.com/wp-content/uploads/2013/03/boca-juniors-vector-logo.png',
      'Peñarol': 'https://logoeps.com/wp-content/uploads/2013/03/penarol-vector-logo.png',
      'Nacional': 'https://logoeps.com/wp-content/uploads/2013/03/nacional-montevideo-vector-logo.png',
      'Colo-Colo': 'https://logoeps.com/wp-content/uploads/2013/03/colo-colo-vector-logo.png',
      'Universidad de Chile': 'https://logoeps.com/wp-content/uploads/2013/03/universidad-de-chile-vector-logo.png',
      'Racing': 'https://logoeps.com/wp-content/uploads/2013/03/racing-club-vector-logo.png',
      'Independiente': 'https://logoeps.com/wp-content/uploads/2013/03/independiente-vector-logo.png',
      'San Lorenzo': 'https://logoeps.com/wp-content/uploads/2013/03/san-lorenzo-vector-logo.png',
      
      // Outros países para amistosos
      'Estados Unidos': 'https://logoeps.com/wp-content/uploads/2020/09/united-states-mens-national-soccer-team-logo-vector.png',
      'México': 'https://logoeps.com/wp-content/uploads/2020/09/mexico-national-football-team-logo-vector.png',
      'França': 'https://logoeps.com/wp-content/uploads/2020/09/france-national-football-team-logo-vector.png',
      'Espanha': 'https://logoeps.com/wp-content/uploads/2020/09/spain-national-football-team-logo-vector.png',
      'Portugal': 'https://logoeps.com/wp-content/uploads/2020/09/portugal-national-football-team-logo-vector.png',
      'Inglaterra': 'https://logoeps.com/wp-content/uploads/2020/09/england-national-football-team-logo-vector.png',
      'Alemanha': 'https://logoeps.com/wp-content/uploads/2020/09/germany-national-football-team-logo-vector.png',
      'Itália': 'https://logoeps.com/wp-content/uploads/2020/09/italy-national-football-team-logo-vector.png'
    };
    
    return teamShields[name];
  };

  const getTeamColor = (name: string) => {
    // Cores características dos times como fallback
    const teamColors: { [key: string]: string } = {
      'Flamengo': 'from-red-600 to-red-700',
      'Palmeiras': 'from-green-700 to-green-800',
      'Corinthians': 'from-gray-800 to-gray-900',
      'São Paulo': 'from-red-700 to-red-800',
      'Santos': 'from-gray-700 to-gray-800',
      'Botafogo': 'from-gray-900 to-black',
      'Atlético-MG': 'from-gray-800 to-gray-900',
      'Atlético Mineiro': 'from-gray-800 to-gray-900',
      'Cruzeiro': 'from-blue-600 to-blue-700',
      'Grêmio': 'from-blue-700 to-blue-800',
      'Internacional': 'from-red-700 to-red-800',
      'Fluminense': 'from-red-600 to-red-700',
      'Vasco': 'from-gray-900 to-black',
      'Vasco da Gama': 'from-gray-900 to-black',
      'Sport': 'from-red-600 to-red-700',
      'Sport Recife': 'from-red-600 to-red-700',
      'Ceará': 'from-gray-800 to-gray-900',
      'Coritiba': 'from-green-600 to-green-700',
      'Vitória': 'from-red-700 to-red-800',
      'Fortaleza': 'from-blue-600 to-blue-700',
      'Athletico-PR': 'from-red-600 to-red-700',
      'Athletico Paranaense': 'from-red-600 to-red-700',
      'Bahia': 'from-blue-600 to-blue-700',
      'Bragantino': 'from-red-600 to-red-700',
      'RB Bragantino': 'from-red-600 to-red-700',
      'Juventude': 'from-green-600 to-green-700',
      'Cuiabá': 'from-yellow-600 to-yellow-700',
      'Atlético-GO': 'from-red-600 to-red-700',
      'Atlético Goianiense': 'from-red-600 to-red-700',
      'Chapecoense': 'from-green-600 to-green-700',
      'América-MG': 'from-green-600 to-green-700',
      'América Mineiro': 'from-green-600 to-green-700',
      'Brasil': 'from-yellow-400 to-green-600',
      'Argentina': 'from-blue-400 to-blue-600',
      'Uruguai': 'from-blue-600 to-blue-800',
      'Colômbia': 'from-yellow-500 to-blue-600',
      'Chile': 'from-red-600 to-blue-600',
      'Peru': 'from-red-600 to-white',
      'Equador': 'from-yellow-500 to-blue-600',
      'Paraguai': 'from-red-600 to-blue-600',
      'Bolívia': 'from-red-600 to-yellow-500',
      'Venezuela': 'from-yellow-500 to-red-600'
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
              <span className="text-xs">{getInitials(teamName)}</span>
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
          <span className="text-xs">{getInitials(teamName)}</span>
        </div>
      )}
    </div>
  );
};

export default TeamFlag;

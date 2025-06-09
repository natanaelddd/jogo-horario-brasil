import React, { useState } from 'react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
}

const TeamFlag = ({ teamName, size = 20 }: TeamFlagProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getTeamShieldUrl = (name: string) => {
    // URLs dos escudos dos times - usando fontes mais confiáveis
    const teamShields: { [key: string]: string } = {
      // Times do Brasileirão Série A
      'Flamengo': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Flamengo-RJ_%28BRA%29.png',
      'Palmeiras': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Palmeiras_logo.svg',
      'Corinthians': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Corinthians_Brasil.png',
      'São Paulo': 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg',
      'Santos': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Santos_logo.svg',
      'Botafogo': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Botafogo_de_Futebol_e_Regatas_logo.svg',
      'Atlético-MG': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Atletico_mineiro_galo.png',
      'Atlético Mineiro': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Atletico_mineiro_galo.png',
      'Cruzeiro': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Cruzeiro_Esporte_Clube_%28logo%29.svg',
      'Grêmio': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Gremio.svg',
      'Internacional': 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Sport_Club_Internacional.svg',
      'Fluminense': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Fluminense_fc_logo.svg',
      'Vasco': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Vasco_da_Gama_Logo.svg',
      'Vasco da Gama': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Vasco_da_Gama_Logo.svg',
      'Athletico-PR': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Club_Athletico_Paranaense_logo.svg',
      'Athletico Paranaense': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Club_Athletico_Paranaense_logo.svg',
      'Bahia': 'https://upload.wikimedia.org/wikipedia/commons/1/19/EClubeBahia.svg',
      'Fortaleza': 'https://upload.wikimedia.org/wikipedia/commons/4/40/FortalezaEsporteClube.svg',
      'Bragantino': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Red_Bull_Bragantino_logo.svg',
      'RB Bragantino': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Red_Bull_Bragantino_logo.svg',
      'Cuiabá': 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Cuiaba_Esporte_Clube_logo.svg',
      'Atlético-GO': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Atletico_GO.svg',
      'Atlético Goianiense': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Atletico_GO.svg',
      'Ceará': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ceara_sporting_club_logo.svg',
      'Coritiba': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Coritiba_2011.svg',
      'Vitória': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Vit%C3%B3ria_Salvador_BA.svg',
      'Sport': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Sport_Club_do_Recife_logo.svg',
      'Sport Recife': 'https://upload.wikimedia.org/wikipedia/commons/1/15/Sport_Club_do_Recife_logo.svg',
      'Chapecoense': 'https://upload.wikimedia.org/wikipedia/commons/8/83/Chapecoense_logo.svg',
      'Juventude': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Juventude.svg',
      'América-MG': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/America_mineiro_logo.svg',
      'América Mineiro': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/America_mineiro_logo.svg',
      
      // Times da Série B
      'Guarani': 'https://upload.wikimedia.org/wikipedia/commons/7/70/Guarani_FC_logo.svg',
      'Ponte Preta': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Ponte_Preta_logo.svg',
      'Avaí': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Avai_logo.svg',
      'CRB': 'https://upload.wikimedia.org/wikipedia/commons/3/39/CRB_logo.svg',
      'Goiás': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Goias_logo.svg',
      'Vila Nova': 'https://upload.wikimedia.org/wikipedia/commons/3/32/Vila_Nova_logo.svg',
      'Operário-PR': 'https://upload.wikimedia.org/wikipedia/commons/4/46/Operario_ferroviario_logo.svg',
      'Operário Ferroviário': 'https://upload.wikimedia.org/wikipedia/commons/4/46/Operario_ferroviario_logo.svg',
      'Novorizontino': 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Novorizontino_logo.svg',
      'Mirassol': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Mirassol_logo.svg',
      
      // Seleções
      'Brasil': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Brazilian_Football_Confederation_logo.svg',
      'Argentina': 'https://upload.wikimedia.org/wikipedia/commons/7/76/Argentina_national_football_team_logo.svg',
      'Uruguai': 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Asociaci%C3%B3n_Uruguaya_de_F%C3%BAtbol_logo.svg',
      'Colômbia': 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Federaci%C3%B3n_Colombiana_de_F%C3%BAtbol_logo.svg',
      'Chile': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Federaci%C3%B3n_de_F%C3%BAtbol_de_Chile_logo.svg',
      'Peru': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Federaci%C3%B3n_Peruana_de_F%C3%BAtbol_logo.svg',
      'Equador': 'https://upload.wikimedia.org/wikipedia/commons/4/46/Federaci%C3%B3n_Ecuatoriana_de_F%C3%BAtbol_logo.svg',
      'Paraguai': 'https://upload.wikimedia.org/wikipedia/commons/6/65/Asociaci%C3%B3n_Paraguaya_de_F%C3%BAtbol_logo.svg',
      'Bolívia': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Federaci%C3%B3n_Boliviana_de_F%C3%BAtbol_logo.svg',
      'Venezuela': 'https://upload.wikimedia.org/wikipedia/commons/4/47/Federaci%C3%B3n_Venezolana_de_F%C3%BAtbol_logo.svg',
      
      // Times internacionais (Libertadores/Sul-Americana/Mundial)
      'River Plate': 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Escudo_del_C_A_River_Plate.svg',
      'Boca Juniors': 'https://upload.wikimedia.org/wikipedia/commons/4/41/CABJ_Logo.svg',
      'Peñarol': 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Penarol_logo.svg',
      'Nacional': 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Club_Nacional_de_Football_logo.svg',
      'Colo-Colo': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Colo-Colo_logo.svg',
      'Universidad de Chile': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Escudo_de_la_Universidad_de_Chile.svg',
      'Racing': 'https://upload.wikimedia.org/wikipedia/commons/5/56/Racing_Club_logo.svg',
      'Independiente': 'https://upload.wikimedia.org/wikipedia/commons/d/db/Escudo_del_Club_Atl%C3%A9tico_Independiente.svg',
      'San Lorenzo': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Escudo_del_Club_Atletico_San_Lorenzo_de_Almagro.svg',
      'Real Madrid': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Real_Madrid_logo.svg',
      'Manchester City': 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Manchester_City_FC_badge.svg',
      'Bayern Munich': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
      'Chelsea': 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Chelsea_FC.svg',
      'Al Hilal': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Al-Hilal_FC_Logo.svg',
      
      // Outros países
      'Estados Unidos': 'https://upload.wikimedia.org/wikipedia/commons/e/e3/US_Soccer_logo.svg',
      'México': 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Federaci%C3%B3n_Mexicana_de_F%C3%BAtbol_logo.svg',
      'França': 'https://upload.wikimedia.org/wikipedia/commons/8/86/F%C3%A9d%C3%A9ration_Fran%C3%A7aise_de_Football_logo.svg',
      'Espanha': 'https://upload.wikimedia.org/wikipedia/commons/3/31/Spain_National_Football_Team_logo.svg',
      'Portugal': 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Portuguese_Football_Federation_logo.svg',
      'Inglaterra': 'https://upload.wikimedia.org/wikipedia/commons/e/e6/England_national_football_team_logo.svg',
      'Alemanha': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/DFB-Logo.svg',
      'Itália': 'https://upload.wikimedia.org/wikipedia/commons/b/b4/FIGC_logo.svg'
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
      className="team-flag-container relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {shieldUrl && !imageError ? (
        <>
          {/* Loading placeholder enquanto a imagem carrega */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-full flex items-center justify-center font-bold team-flag-fallback animate-pulse">
              <span className="text-xs">{teamName.substring(0, 3).toUpperCase()}</span>
            </div>
          )}
          
          <img 
            src={shieldUrl}
            alt={`Escudo ${teamName}`}
            className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              maxWidth: '90%', 
              maxHeight: '90%',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </>
      ) : (
        // Fallback para times sem escudo definido ou com erro
        <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-full flex items-center justify-center font-bold team-flag-fallback border border-gray-500">
          <span className="text-xs font-semibold">
            {teamName.split(' ').map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('')}
          </span>
        </div>
      )}
    </div>
  );
};

export default TeamFlag;

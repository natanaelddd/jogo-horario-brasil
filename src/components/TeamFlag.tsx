
import React from 'react';
import { Shield } from 'lucide-react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
  className?: string;
}

const TeamFlag: React.FC<TeamFlagProps> = ({ teamName, size = 32, className = '' }) => {
  // Mapeamento melhorado de times para URLs de brasões mais confiáveis
  const getTeamLogo = (team: string): string => {
    const teamMap: { [key: string]: string } = {
      // Brasileirão Série A
      'flamengo': 'https://logoeps.com/wp-content/uploads/2013/03/flamengo-vector-logo.png',
      'palmeiras': 'https://logoeps.com/wp-content/uploads/2013/03/palmeiras-vector-logo.png',
      'corinthians': 'https://logoeps.com/wp-content/uploads/2013/03/corinthians-vector-logo.png',
      'são paulo': 'https://logoeps.com/wp-content/uploads/2013/03/sao-paulo-vector-logo.png',
      'santos': 'https://logoeps.com/wp-content/uploads/2013/03/santos-vector-logo.png',
      'grêmio': 'https://logoeps.com/wp-content/uploads/2013/03/gremio-vector-logo.png',
      'internacional': 'https://logoeps.com/wp-content/uploads/2013/03/internacional-vector-logo.png',
      'atlético-mg': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-mineiro-vector-logo.png',
      'cruzeiro': 'https://logoeps.com/wp-content/uploads/2013/03/cruzeiro-vector-logo.png',
      'botafogo': 'https://logoeps.com/wp-content/uploads/2013/03/botafogo-vector-logo.png',
      'vasco': 'https://logoeps.com/wp-content/uploads/2013/03/vasco-da-gama-vector-logo.png',
      'fluminense': 'https://logoeps.com/wp-content/uploads/2013/03/fluminense-vector-logo.png',
      
      // Times internacionais
      'real madrid': 'https://logoeps.com/wp-content/uploads/2012/12/real-madrid-vector-logo.png',
      'barcelona': 'https://logoeps.com/wp-content/uploads/2012/12/barcelona-vector-logo.png',
      'manchester city': 'https://logoeps.com/wp-content/uploads/2013/03/manchester-city-vector-logo.png',
      'manchester united': 'https://logoeps.com/wp-content/uploads/2013/03/manchester-united-vector-logo.png',
      'chelsea': 'https://logoeps.com/wp-content/uploads/2013/03/chelsea-vector-logo.png',
      'liverpool': 'https://logoeps.com/wp-content/uploads/2013/03/liverpool-vector-logo.png',
      'bayern munich': 'https://logoeps.com/wp-content/uploads/2013/03/bayern-munchen-vector-logo.png',
      'psg': 'https://logoeps.com/wp-content/uploads/2013/03/psg-vector-logo.png',
      
      // Seleções
      'brasil': 'https://logoeps.com/wp-content/uploads/2013/03/brazil-national-football-team-vector-logo.png',
      'argentina': 'https://logoeps.com/wp-content/uploads/2013/03/argentina-national-football-team-vector-logo.png',
      'uruguai': 'https://logoeps.com/wp-content/uploads/2013/03/uruguay-national-football-team-vector-logo.png',
      'chile': 'https://logoeps.com/wp-content/uploads/2013/03/chile-national-football-team-vector-logo.png',
      'colômbia': 'https://logoeps.com/wp-content/uploads/2013/03/colombia-national-football-team-vector-logo.png',
      'equador': 'https://logoeps.com/wp-content/uploads/2013/03/ecuador-national-football-team-vector-logo.png',
      'peru': 'https://logoeps.com/wp-content/uploads/2013/03/peru-national-football-team-vector-logo.png',
      'venezuela': 'https://logoeps.com/wp-content/uploads/2013/03/venezuela-national-football-team-vector-logo.png',
      'paraguai': 'https://logoeps.com/wp-content/uploads/2013/03/paraguay-national-football-team-vector-logo.png',
      'bolívia': 'https://logoeps.com/wp-content/uploads/2013/03/bolivia-national-football-team-vector-logo.png',
      
      // Times árabes
      'al hilal': 'https://logoeps.com/wp-content/uploads/2017/05/al-hilal-vector-logo.png',
      'al nassr': 'https://logoeps.com/wp-content/uploads/2017/05/al-nassr-vector-logo.png',
      'al ahly': 'https://logoeps.com/wp-content/uploads/2017/05/al-ahly-vector-logo.png'
    };

    const normalizedTeam = team.toLowerCase().trim();
    return teamMap[normalizedTeam];
  };

  const logoUrl = getTeamLogo(teamName);

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${teamName} logo`}
        width={size}
        height={size}
        className={`object-contain ${className}`}
        onError={(e) => {
          // Fallback para ícone quando a imagem não carrega
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            const fallbackIcon = document.createElement('div');
            fallbackIcon.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
            parent.appendChild(fallbackIcon);
          }
        }}
      />
    );
  }

  // Fallback: ícone de escudo
  return (
    <Shield 
      size={size} 
      className={`text-gray-400 ${className}`}
    />
  );
};

export default TeamFlag;

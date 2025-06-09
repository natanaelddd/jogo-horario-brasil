
import React from 'react';
import { Shield } from 'lucide-react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
  className?: string;
}

const TeamFlag: React.FC<TeamFlagProps> = ({ teamName, size = 32, className = '' }) => {
  // Mapeamento de times brasileiros para logos reais
  const getTeamLogo = (team: string): string | null => {
    const teamMap: { [key: string]: string } = {
      // Série A
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
      'bahia': 'https://logoeps.com/wp-content/uploads/2013/03/bahia-vector-logo.png',
      'vitória': 'https://logoeps.com/wp-content/uploads/2013/03/vitoria-vector-logo.png',
      'athletico-pr': 'https://logoeps.com/wp-content/uploads/2013/03/atletico-paranaense-vector-logo.png',
      'coritiba': 'https://logoeps.com/wp-content/uploads/2013/03/coritiba-vector-logo.png',
      'fortaleza': 'https://logoeps.com/wp-content/uploads/2013/03/fortaleza-vector-logo.png',
      'ceará': 'https://logoeps.com/wp-content/uploads/2013/03/ceara-vector-logo.png',
      'sport': 'https://logoeps.com/wp-content/uploads/2013/03/sport-recife-vector-logo.png',
      'chapecoense': 'https://logoeps.com/wp-content/uploads/2013/03/chapecoense-vector-logo.png',
      
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
    };

    const normalizedTeam = team.toLowerCase().trim();
    return teamMap[normalizedTeam] || null;
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
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.fallback-icon')) {
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = 'fallback-icon flex items-center justify-center';
            fallbackDiv.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
            parent.appendChild(fallbackDiv);
          }
        }}
      />
    );
  }

  // Fallback: ícone de escudo apenas se não encontrar logo
  return (
    <Shield 
      size={size} 
      className={`text-gray-400 ${className}`}
    />
  );
};

export default TeamFlag;

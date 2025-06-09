
import { Shield } from 'lucide-react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
}

const TeamFlag = ({ teamName, size = 20 }: TeamFlagProps) => {
  const getTeamIcon = (name: string) => {
    // Mapeamento de times para ícones do Google Material Icons
    const teamIcons: { [key: string]: string } = {
      'Flamengo': 'sports_soccer',
      'Palmeiras': 'sports_soccer', 
      'Corinthians': 'sports_soccer',
      'São Paulo': 'sports_soccer',
      'Santos': 'sports_soccer',
      'Botafogo': 'sports_soccer',
      'Atlético-MG': 'sports_soccer',
      'Cruzeiro': 'sports_soccer',
      'Grêmio': 'sports_soccer',
      'Internacional': 'sports_soccer',
      'Fluminense': 'sports_soccer',
      'Vasco': 'sports_soccer',
      'Sport': 'sports_soccer',
      'Ceará': 'sports_soccer',
      'Coritiba': 'sports_soccer',
      'Vitória': 'sports_soccer'
    };
    
    return teamIcons[name] || 'sports_soccer';
  };

  const getTeamColor = (name: string) => {
    // Cores características dos times brasileiros
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
      'Vitória': 'bg-red-700'
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

  const iconName = getTeamIcon(teamName);
  const teamColor = getTeamColor(teamName);

  return (
    <div 
      className={`flex items-center justify-center ${teamColor} text-white rounded-full relative overflow-hidden shadow-sm`}
      style={{ width: size, height: size }}
    >
      {/* Ícone do Google Material Icons */}
      <span 
        className="material-icons-outlined"
        style={{ fontSize: size * 0.6 }}
      >
        {iconName}
      </span>
      
      {/* Iniciais do time como fallback sobreposto */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white font-bold"
        style={{ fontSize: size * 0.25 }}
      >
        {getInitials(teamName)}
      </div>
    </div>
  );
};

export default TeamFlag;

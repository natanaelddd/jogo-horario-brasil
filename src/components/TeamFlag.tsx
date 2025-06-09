
import { useState } from 'react';
import { TeamService } from '@/services/teamService';

interface TeamFlagProps {
  teamName: string;
  size?: number;
}

const TeamFlag = ({ teamName, size = 20 }: TeamFlagProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const teamService = TeamService.getInstance();
  const teamInfo = teamService.getTeamInfo(teamName);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  if (imageError || !teamInfo?.flag) {
    return (
      <div 
        className="flex items-center justify-center bg-primary text-primary-foreground rounded-full font-bold text-xs"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {getInitials(teamName)}
      </div>
    );
  }

  return (
    <div 
      className="flex items-center justify-center bg-background rounded-full border overflow-hidden"
      style={{ width: size, height: size }}
    >
      {isLoading && (
        <div 
          className="flex items-center justify-center bg-muted text-muted-foreground rounded-full font-bold text-xs animate-pulse"
          style={{ width: size, height: size, fontSize: size * 0.4 }}
        >
          {getInitials(teamName)}
        </div>
      )}
      <img 
        src={teamInfo.flag} 
        alt={`Escudo ${teamName}`}
        className={`object-contain transition-opacity duration-200 ${isLoading ? 'opacity-0 absolute' : 'opacity-100'}`}
        style={{ width: size * 0.8, height: size * 0.8 }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  );
};

export default TeamFlag;

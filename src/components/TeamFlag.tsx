
import React from 'react';

interface TeamFlagProps {
  teamName: string;
  size?: number;
  className?: string;
}

const TeamFlag: React.FC<TeamFlagProps> = ({ teamName, className = '' }) => {
  return (
    <span className={`font-medium text-white ${className}`}>
      {teamName}
    </span>
  );
};

export default TeamFlag;

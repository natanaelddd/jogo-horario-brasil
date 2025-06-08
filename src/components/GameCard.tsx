
import { Calendar, Clock, MapPin, Tv, Trophy, Globe, Flag, Crown, Award, Star, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Game } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';
import { TeamService } from '@/services/teamService';

interface GameCardProps {
  game: Game;
}

const getIconComponent = (iconName: string) => {
  const icons = {
    Trophy,
    Globe,
    Flag,
    Crown,
    Award,
    Star,
    Zap,
    MapPin
  };
  return icons[iconName as keyof typeof icons] || Trophy;
};

const TeamFlag = ({ teamName }: { teamName: string }) => {
  const teamService = TeamService.getInstance();
  const teamInfo = teamService.getTeamInfo(teamName);

  return (
    <div className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm border">
      <img 
        src={teamInfo?.flag} 
        alt={`Escudo ${teamName}`}
        className="w-5 h-5 object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'https://via.placeholder.com/20x20/e5e7eb/6b7280?text=' + encodeURIComponent(teamName.charAt(0).toUpperCase());
        }}
        loading="lazy"
      />
    </div>
  );
};

const GameCard = ({ game }: GameCardProps) => {
  const campeonato = CAMPEONATOS[game.campeonato];
  const IconComponent = getIconComponent(campeonato.icone);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  const getStatusColor = () => {
    switch (game.status) {
      case 'ao_vivo': return 'bg-red-500 animate-pulse';
      case 'finalizado': return 'bg-gray-500';
      default: return campeonato.cor;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge className={`${getStatusColor()} text-white font-bold`}>
            <IconComponent className="w-3 h-3 mr-1" />
            {campeonato.nome}
          </Badge>
          {(game.rodada || game.fase) && (
            <Badge variant="outline" className="text-xs">
              {game.fase || `${game.rodada}ª Rodada`}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Times */}
        <div className="text-center">
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
            <div className="text-right flex-1">
              <div className="flex items-center justify-end gap-2 mb-1">
                <p className="font-bold text-sm truncate">{game.time_casa}</p>
                <TeamFlag teamName={game.time_casa} />
              </div>
              <p className="text-xs text-muted-foreground">Casa</p>
              {game.placar_casa !== undefined && (
                <p className="text-xl font-bold text-primary">{game.placar_casa}</p>
              )}
            </div>
            
            <div className="mx-3 text-center">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                {game.status === 'finalizado' && game.placar_casa !== undefined ? (
                  <span className="text-xs font-bold">FT</span>
                ) : game.status === 'ao_vivo' ? (
                  <span className="text-xs font-bold text-red-500">AO VIVO</span>
                ) : (
                  <span className="text-xs font-bold">VS</span>
                )}
              </div>
            </div>
            
            <div className="text-left flex-1">
              <div className="flex items-center justify-start gap-2 mb-1">
                <TeamFlag teamName={game.time_fora} />
                <p className="font-bold text-sm truncate">{game.time_fora}</p>
              </div>
              <p className="text-xs text-muted-foreground">Visitante</p>
              {game.placar_fora !== undefined && (
                <p className="text-xl font-bold text-primary">{game.placar_fora}</p>
              )}
            </div>
          </div>
        </div>

        {/* Data e Hora */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(game.data)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{game.hora}</span>
          </div>
        </div>

        {/* Estádio */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{game.estadio}</span>
        </div>

        {/* Transmissão */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Tv className="w-4 h-4" />
            <span>Transmissão:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {game.transmissao.map((canal, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {canal}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;

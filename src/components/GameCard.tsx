
import { Calendar, Clock, MapPin, Tv, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

const serieColors = {
  A: 'bg-brasil-green text-white',
  B: 'bg-brasil-yellow text-black',
  C: 'bg-orange-500 text-white'
};

const GameCard = ({ game }: GameCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge className={`${serieColors[game.serie]} font-bold`}>
            <Trophy className="w-3 h-3 mr-1" />
            Série {game.serie}
          </Badge>
          {game.rodada && (
            <Badge variant="outline" className="text-xs">
              {game.rodada}ª Rodada
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Times */}
        <div className="text-center">
          <div className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
            <div className="text-right flex-1">
              <p className="font-bold text-lg">{game.time_casa}</p>
              <p className="text-sm text-muted-foreground">Casa</p>
            </div>
            
            <div className="mx-4 text-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">VS</span>
              </div>
            </div>
            
            <div className="text-left flex-1">
              <p className="font-bold text-lg">{game.time_fora}</p>
              <p className="text-sm text-muted-foreground">Visitante</p>
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
          <span>{game.estadio}</span>
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

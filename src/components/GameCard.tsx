
import React from 'react';
import { Game } from '@/types/game';
import { Calendar, Clock, MapPin, Tv, Trophy, Play, CheckCircle, Clock3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ao_vivo': return 'border-red-500 bg-red-500/10 shadow-red-500/20';
      case 'finalizado': return 'border-green-500 bg-green-500/10 shadow-green-500/20';
      default: return 'border-blue-500 bg-blue-500/10 shadow-blue-500/20';
    }
  };

  // Badge do status principal
  const getStatusBadge = (status: string, data: string) => {
    switch (status) {
      case 'ao_vivo': 
        return (
          <Badge className="bg-red-600 text-white border-red-500 hover:bg-red-700 transition-colors">
            <Play className="w-3 h-3 mr-1 fill-current" />
            <span className="font-semibold">AO VIVO</span>
          </Badge>
        );
      case 'finalizado': 
        // Exibe a data do jogo finalizado
        return (
          <Badge className="bg-green-600 text-white border-green-500 hover:bg-green-700 transition-colors">
            <Calendar className="w-3 h-3 mr-1" />
            <span className="font-semibold">{formatDate(data)}</span>
          </Badge>
        );
      default: 
        return (
          <Badge className="bg-blue-600 text-white border-blue-500 hover:bg-blue-700 transition-colors">
            <Clock3 className="w-3 h-3 mr-1" />
            <span className="font-semibold">AGENDADO</span>
          </Badge>
        );
    }
  };

  const getCampeonatoColor = (campeonato: string) => {
    switch (campeonato) {
      case 'brasileiro-a': return 'bg-green-600';
      case 'brasileiro-b': return 'bg-blue-600';
      case 'copa-do-brasil': return 'bg-purple-600';
      case 'libertadores': return 'bg-red-600';
      case 'mundial-clubes': return 'bg-purple-700';
      case 'eliminatorias-copa': return 'bg-green-600';
      case 'amistosos-selecao': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className={`bg-gray-800 border-2 ${getStatusColor(game.status)} hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden shadow-lg`}>
      {/* Header com Data */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-3 text-center">
        <div className="text-white font-bold text-sm mb-1">
          {formatDate(game.data)}
        </div>
        <Badge className={`${getCampeonatoColor(game.campeonato)} text-white text-xs font-medium`}>
          {game.fase || 'Partida'}
        </Badge>
      </div>

      <CardContent className="p-4">
        {/* Times */}
        <div className="grid grid-cols-3 gap-4 items-center mb-4">
          {/* Time Casa */}
          <div className="text-center">
            <div className="text-white text-sm font-semibold mb-2 truncate">
              {game.time_casa}
            </div>
            {game.placar_casa !== null && (
              <div className="text-green-400 font-bold text-2xl">
                {game.placar_casa}
              </div>
            )}
          </div>

          {/* VS e Horário */}
          <div className="text-center">
            <div className="text-gray-400 text-xs mb-1 font-medium">VS</div>
            <div className="text-white font-bold text-lg mb-2">
              {game.hora}
            </div>
            {getStatusBadge(game.status ?? 'agendado', game.data)}
          </div>

          {/* Time Fora */}
          <div className="text-center">
            <div className="text-white text-sm font-semibold mb-2 truncate">
              {game.time_fora}
            </div>
            {game.placar_fora !== null && (
              <div className="text-green-400 font-bold text-2xl">
                {game.placar_fora}
              </div>
            )}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-purple-400 flex-shrink-0" />
            <span className="truncate">{game.estadio}</span>
          </div>
          
          {game.transmissao && game.transmissao.length > 0 && (
            <div className="flex items-center gap-2">
              <Tv className="w-3 h-3 text-blue-400 flex-shrink-0" />
              <span className="truncate">{game.transmissao.join(', ')}</span>
            </div>
          )}

          {game.rodada && (
            <div className="flex items-center gap-2">
              <Trophy className="w-3 h-3 text-yellow-400 flex-shrink-0" />
              <span>Rodada {game.rodada}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;

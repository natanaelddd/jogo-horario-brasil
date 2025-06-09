
import React from 'react';
import { Game } from '@/types/game';
import { Calendar, Clock, MapPin, Tv, Trophy } from 'lucide-react';
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
      case 'ao_vivo': return 'border-red-500 bg-red-500/10';
      case 'finalizado': return 'border-gray-500 bg-gray-500/10';
      default: return 'border-green-500 bg-green-500/10';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ao_vivo': return 'AO VIVO';
      case 'finalizado': return 'FINALIZADO';
      default: return 'AGENDADO';
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
    <Card className={`bg-gray-800 border-2 ${getStatusColor(game.status)} hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden`}>
      {/* Header com Data */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-3 text-center">
        <div className="text-white font-bold text-sm">
          {formatDate(game.data)}
        </div>
        <Badge className={`${getCampeonatoColor(game.campeonato)} text-white text-xs mt-1`}>
          {game.fase || 'Partida'}
        </Badge>
      </div>

      <CardContent className="p-4">
        {/* Times */}
        <div className="grid grid-cols-3 gap-4 items-center mb-4">
          {/* Time Casa */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center border border-purple-500/50 group-hover:border-purple-500 transition-colors">
              <span className="text-white font-bold text-xs">
                {game.time_casa.substring(0, 3).toUpperCase()}
              </span>
            </div>
            <div className="text-white text-sm font-semibold truncate">
              {game.time_casa}
            </div>
            {game.placar_casa !== null && (
              <div className="text-green-400 font-bold text-lg">
                {game.placar_casa}
              </div>
            )}
          </div>

          {/* VS e Horário */}
          <div className="text-center">
            <div className="text-gray-400 text-xs mb-1">VS</div>
            <div className="text-white font-bold text-lg">
              {game.hora}
            </div>
            {game.status === 'ao_vivo' && (
              <div className="text-red-500 text-xs font-bold animate-pulse">
                • LIVE
              </div>
            )}
          </div>

          {/* Time Fora */}
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center border border-blue-500/50 group-hover:border-blue-500 transition-colors">
              <span className="text-white font-bold text-xs">
                {game.time_fora.substring(0, 3).toUpperCase()}
              </span>
            </div>
            <div className="text-white text-sm font-semibold truncate">
              {game.time_fora}
            </div>
            {game.placar_fora !== null && (
              <div className="text-green-400 font-bold text-lg">
                {game.placar_fora}
              </div>
            )}
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-purple-400" />
            <span className="truncate">{game.estadio}</span>
          </div>
          
          {game.transmissao && game.transmissao.length > 0 && (
            <div className="flex items-center gap-2">
              <Tv className="w-3 h-3 text-blue-400" />
              <span className="truncate">{game.transmissao.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="mt-3 text-center">
          <Badge 
            className={`${
              game.status === 'ao_vivo' ? 'bg-red-600' : 
              game.status === 'finalizado' ? 'bg-gray-600' : 
              'bg-green-600'
            } text-white text-xs px-3 py-1`}
          >
            {getStatusText(game.status)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;

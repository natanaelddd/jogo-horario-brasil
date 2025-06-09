import React from 'react';
import { Game } from '@/types/game';
import { Calendar, Clock, MapPin, Tv } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HeroGameSectionProps {
  game: Game | null;
}

const HeroGameSection: React.FC<HeroGameSectionProps> = ({ game }) => {
  if (!game) {
    return (
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 min-h-[300px] flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Nenhum jogo em destaque</h2>
          <p className="text-gray-300">Aguarde os próximos jogos</p>
        </div>
      </div>
    );
  }

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
      case 'ao_vivo': return 'bg-red-500';
      case 'finalizado': return 'bg-gray-500';
      default: return 'bg-green-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ao_vivo': return 'AO VIVO';
      case 'finalizado': return 'FINALIZADO';
      default: return 'AGENDADO';
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-2xl p-8 mb-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Date Header */}
        <div className="text-center mb-6">
          <Badge className={`${getStatusColor(game.status)} text-white px-4 py-2 text-sm font-bold`}>
            {getStatusText(game.status)}
          </Badge>
          <h2 className="text-white text-lg font-semibold mt-2">
            {formatDate(game.data)}
          </h2>
        </div>

        {/* Main Game Card */}
        <Card className="bg-gray-800/50 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Time Casa */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center border-2 border-purple-500/50">
                  <span className="text-white font-bold text-lg">
                    {game.time_casa.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg">{game.time_casa}</h3>
                <span className="text-gray-400 text-sm">Casa</span>
              </div>

              {/* Game Info */}
              <div className="text-center">
                <div className="text-white mb-4">
                  <div className="text-3xl font-bold mb-2">{game.hora}</div>
                  {game.placar_casa !== null && game.placar_fora !== null ? (
                    <div className="text-2xl font-bold text-green-400">
                      {game.placar_casa} - {game.placar_fora}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-300">
                      {game.fase || 'Partida'}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{game.estadio}</span>
                  </div>
                  
                  {game.transmissao && game.transmissao.length > 0 && (
                    <div className="flex items-center justify-center gap-2">
                      <Tv className="w-4 h-4" />
                      <span>{game.transmissao.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Time Fora */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center border-2 border-blue-500/50">
                  <span className="text-white font-bold text-lg">
                    {game.time_fora.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg">{game.time_fora}</h3>
                <span className="text-gray-400 text-sm">Visitante</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center mt-6">
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {game.status === 'ao_vivo' ? 'ASSISTIR AO VIVO' : 'VER DETALHES'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroGameSection;


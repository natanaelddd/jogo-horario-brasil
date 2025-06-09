
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StandingsService, Standing } from '@/services/standingsService';
import { CAMPEONATOS } from '@/config/campeonatos';
import { CampeonatoType } from '@/types/game';

interface StandingsTableProps {
  campeonato: CampeonatoType;
}

const StandingsTable = ({ campeonato }: StandingsTableProps) => {
  const { data: standings = [], isLoading, error } = useQuery({
    queryKey: ['standings', campeonato],
    queryFn: async () => {
      const standingsService = StandingsService.getInstance();
      return await standingsService.getStandingsByCampeonato(campeonato);
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  const getPositionColor = (posicao: number) => {
    if (campeonato === 'brasileiro-a') {
      if (posicao <= 4) return 'bg-blue-500'; // Libertadores
      if (posicao <= 6) return 'bg-orange-500'; // Pré-libertadores
      if (posicao <= 12) return 'bg-green-500'; // Sul-americana
      if (posicao >= 17) return 'bg-red-500'; // Rebaixamento
    }
    return 'bg-gray-400';
  };

  const getPositionText = (posicao: number) => {
    if (campeonato === 'brasileiro-a') {
      if (posicao <= 4) return 'Libertadores';
      if (posicao <= 6) return 'Pré-Libertadores';
      if (posicao <= 12) return 'Sul-Americana';
      if (posicao >= 17) return 'Rebaixamento';
    }
    return '';
  };

  if (isLoading) {
    return (
      <Card className="uefa-table">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">Carregando classificação...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || standings.length === 0) {
    return (
      <Card className="uefa-table">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Classificação não disponível para este campeonato
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="uefa-table">
      <CardHeader className="uefa-table-header">
        <CardTitle className="flex items-center gap-2 text-white">
          Classificação - {CAMPEONATOS[campeonato]?.nome}
          <Badge variant="outline" className="border-white/30 text-white">2024</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-uefa hover:bg-transparent">
                <TableHead className="w-12 text-muted-foreground">#</TableHead>
                <TableHead className="text-muted-foreground">Time</TableHead>
                <TableHead className="text-center w-12 text-muted-foreground">P</TableHead>
                <TableHead className="text-center w-12 text-muted-foreground">J</TableHead>
                <TableHead className="text-center w-12 text-muted-foreground">V</TableHead>
                <TableHead className="text-center w-12 text-muted-foreground">E</TableHead>
                <TableHead className="text-center w-12 text-muted-foreground">D</TableHead>
                <TableHead className="text-center w-12 text-muted-foreground">GP</TableHead>
                <TableHead className="text-center w-12 text-muted-foreground">GC</TableHead>
                <TableHead className="text-center w-12 text-muted-foreground">SG</TableHead>
                <TableHead className="text-center w-16 text-muted-foreground">%</TableHead>
                <TableHead className="text-center w-24 text-muted-foreground">Últimos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((standing) => (
                <TableRow key={standing.id} className="uefa-table-row border-uefa">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-1 h-8 rounded ${getPositionColor(standing.posicao)}`}
                        title={getPositionText(standing.posicao)}
                      />
                      <span className="font-semibold text-foreground">{standing.posicao}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                        <img 
                          src={standing.team.escudo_url || 'https://via.placeholder.com/24x24/e5e7eb/6b7280?text=' + encodeURIComponent(standing.team.sigla)}
                          alt={`Escudo ${standing.team.nome}`}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/20x20/e5e7eb/6b7280?text=' + encodeURIComponent(standing.team.sigla);
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{standing.team.nome}</p>
                        <p className="text-xs text-muted-foreground">{standing.team.sigla}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-primary">{standing.pontos}</TableCell>
                  <TableCell className="text-center text-foreground">{standing.jogos}</TableCell>
                  <TableCell className="text-center text-foreground">{standing.vitorias}</TableCell>
                  <TableCell className="text-center text-foreground">{standing.empates}</TableCell>
                  <TableCell className="text-center text-foreground">{standing.derrotas}</TableCell>
                  <TableCell className="text-center text-foreground">{standing.gols_pro}</TableCell>
                  <TableCell className="text-center text-foreground">{standing.gols_contra}</TableCell>
                  <TableCell className="text-center font-medium">
                    <span className={standing.saldo_gols >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {standing.saldo_gols > 0 ? '+' : ''}{standing.saldo_gols}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-foreground">{standing.aproveitamento.toFixed(1)}%</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center">
                      {standing.ultimos_jogos.slice(-5).map((resultado, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-full text-xs flex items-center justify-center text-white font-bold ${
                            resultado === 'V' ? 'bg-green-500' : 
                            resultado === 'E' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        >
                          {resultado}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Legenda */}
        {campeonato === 'brasileiro-a' && (
          <div className="p-4 border-t border-uefa">
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-muted-foreground">Libertadores</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span className="text-muted-foreground">Pré-Libertadores</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-muted-foreground">Sul-Americana</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-muted-foreground">Rebaixamento</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StandingsTable;

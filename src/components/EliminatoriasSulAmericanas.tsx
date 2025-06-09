
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Trophy, MapPin, Clock, Users, Target, Award } from 'lucide-react';
import TeamFlag from './TeamFlag';

interface EliminatoriaTeam {
  posicao: number;
  pais: string;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gols_pro: number;
  gols_contra: number;
  saldo_gols: number;
  aproveitamento: number;
  ultimos_jogos: string[];
}

interface ProximoJogo {
  id: string;
  data: string;
  hora: string;
  casa: string;
  fora: string;
  estadio: string;
  cidade: string;
  rodada: number;
}

const EliminatoriasSulAmericanas = () => {
  const [activeTab, setActiveTab] = useState('classificacao');

  // Dados mock das eliminatórias
  const classificacao: EliminatoriaTeam[] = [
    {
      posicao: 1,
      pais: 'Argentina',
      pontos: 25,
      jogos: 12,
      vitorias: 8,
      empates: 1,
      derrotas: 3,
      gols_pro: 21,
      gols_contra: 9,
      saldo_gols: 12,
      aproveitamento: 69.4,
      ultimos_jogos: ['V', 'V', 'E', 'V', 'V']
    },
    {
      posicao: 2,
      pais: 'Brasil',
      pontos: 21,
      jogos: 12,
      vitorias: 6,
      empates: 3,
      derrotas: 3,
      gols_pro: 19,
      gols_contra: 11,
      saldo_gols: 8,
      aproveitamento: 58.3,
      ultimos_jogos: ['V', 'D', 'V', 'E', 'V']
    },
    {
      posicao: 3,
      pais: 'Uruguai',
      pontos: 20,
      jogos: 12,
      vitorias: 5,
      empates: 5,
      derrotas: 2,
      gols_pro: 17,
      gols_contra: 9,
      saldo_gols: 8,
      aproveitamento: 55.6,
      ultimos_jogos: ['E', 'V', 'V', 'E', 'D']
    },
    {
      posicao: 4,
      pais: 'Colômbia',
      pontos: 19,
      jogos: 12,
      vitorias: 5,
      empates: 4,
      derrotas: 3,
      gols_pro: 15,
      gols_contra: 12,
      saldo_gols: 3,
      aproveitamento: 52.8,
      ultimos_jogos: ['V', 'E', 'D', 'V', 'E']
    },
    {
      posicao: 5,
      pais: 'Equador',
      pontos: 16,
      jogos: 12,
      vitorias: 4,
      empates: 4,
      derrotas: 4,
      gols_pro: 11,
      gols_contra: 10,
      saldo_gols: 1,
      aproveitamento: 44.4,
      ultimos_jogos: ['D', 'E', 'V', 'D', 'E']
    },
    {
      posicao: 6,
      pais: 'Paraguai',
      pontos: 13,
      jogos: 12,
      vitorias: 3,
      empates: 4,
      derrotas: 5,
      gols_pro: 8,
      gols_contra: 12,
      saldo_gols: -4,
      aproveitamento: 36.1,
      ultimos_jogos: ['D', 'D', 'E', 'V', 'D']
    },
    {
      posicao: 7,
      pais: 'Venezuela',
      pontos: 12,
      jogos: 12,
      vitorias: 2,
      empates: 6,
      derrotas: 4,
      gols_pro: 11,
      gols_contra: 14,
      saldo_gols: -3,
      aproveitamento: 33.3,
      ultimos_jogos: ['E', 'D', 'E', 'E', 'V']
    },
    {
      posicao: 8,
      pais: 'Chile',
      pontos: 9,
      jogos: 12,
      vitorias: 2,
      empates: 3,
      derrotas: 7,
      gols_pro: 9,
      gols_contra: 20,
      saldo_gols: -11,
      aproveitamento: 25.0,
      ultimos_jogos: ['D', 'D', 'E', 'D', 'V']
    },
    {
      posicao: 9,
      pais: 'Bolívia',
      pontos: 7,
      jogos: 12,
      vitorias: 2,
      empates: 1,
      derrotas: 9,
      gols_pro: 7,
      gols_contra: 27,
      saldo_gols: -20,
      aproveitamento: 19.4,
      ultimos_jogos: ['D', 'D', 'D', 'V', 'D']
    },
    {
      posicao: 10,
      pais: 'Peru',
      pontos: 7,
      jogos: 12,
      vitorias: 1,
      empates: 4,
      derrotas: 7,
      gols_pro: 4,
      gols_contra: 15,
      saldo_gols: -11,
      aproveitamento: 19.4,
      ultimos_jogos: ['D', 'E', 'D', 'D', 'E']
    }
  ];

  const proximosJogos: ProximoJogo[] = [
    {
      id: '1',
      data: '2025-03-27',
      hora: '21:45',
      casa: 'Brasil',
      fora: 'Colômbia',
      estadio: 'Arena Corinthians',
      cidade: 'São Paulo',
      rodada: 13
    },
    {
      id: '2',
      data: '2025-03-27',
      hora: '20:00',
      casa: 'Argentina',
      fora: 'Uruguai',
      estadio: 'Estádio Monumental',
      cidade: 'Buenos Aires',
      rodada: 13
    },
    {
      id: '3',
      data: '2025-03-28',
      hora: '18:00',
      casa: 'Chile',
      fora: 'Ecuador',
      estadio: 'Estádio Nacional',
      cidade: 'Santiago',
      rodada: 13
    }
  ];

  const getQualificationZone = (posicao: number) => {
    if (posicao <= 6) return { color: 'bg-green-500', text: 'Copa do Mundo' };
    if (posicao === 7) return { color: 'bg-yellow-500', text: 'Repescagem' };
    return { color: 'bg-red-500', text: 'Eliminado' };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Award className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Eliminatórias da Copa do Mundo
          </h1>
        </div>
        <p className="text-lg text-gray-600">América do Sul - Rumo ao Mundial 2026</p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4" />
            <span>18 rodadas</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>10 seleções</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4" />
            <span>6 vagas diretas + 1 repescagem</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="classificacao" className="text-base">
            <Trophy className="w-4 h-4 mr-2" />
            Classificação
          </TabsTrigger>
          <TabsTrigger value="proximos" className="text-base">
            <Calendar className="w-4 h-4 mr-2" />
            Próximos Jogos
          </TabsTrigger>
          <TabsTrigger value="resultados" className="text-base">
            <Clock className="w-4 h-4 mr-2" />
            Resultados
          </TabsTrigger>
        </TabsList>

        {/* Classificação */}
        <TabsContent value="classificacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Tabela de Classificação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-12 text-center">#</TableHead>
                      <TableHead>Seleção</TableHead>
                      <TableHead className="text-center w-12">Pts</TableHead>
                      <TableHead className="text-center w-12">J</TableHead>
                      <TableHead className="text-center w-12">V</TableHead>
                      <TableHead className="text-center w-12">E</TableHead>
                      <TableHead className="text-center w-12">D</TableHead>
                      <TableHead className="text-center w-12">GP</TableHead>
                      <TableHead className="text-center w-12">GC</TableHead>
                      <TableHead className="text-center w-12">SG</TableHead>
                      <TableHead className="text-center w-16">%</TableHead>
                      <TableHead className="text-center w-24">Últimos</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classificacao.map((team) => {
                      const zone = getQualificationZone(team.posicao);
                      return (
                        <TableRow key={team.posicao} className="hover:bg-gray-50">
                          <TableCell className="text-center">
                            <div className="flex items-center gap-2">
                              <div 
                                className={`w-1 h-8 rounded ${zone.color}`}
                                title={zone.text}
                              />
                              <span className="font-semibold">{team.posicao}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <TeamFlag teamName={team.pais} size={28} />
                              <span className="font-medium">{team.pais}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-bold text-lg">
                            {team.pontos}
                          </TableCell>
                          <TableCell className="text-center">{team.jogos}</TableCell>
                          <TableCell className="text-center text-green-600 font-medium">
                            {team.vitorias}
                          </TableCell>
                          <TableCell className="text-center text-yellow-600 font-medium">
                            {team.empates}
                          </TableCell>
                          <TableCell className="text-center text-red-600 font-medium">
                            {team.derrotas}
                          </TableCell>
                          <TableCell className="text-center">{team.gols_pro}</TableCell>
                          <TableCell className="text-center">{team.gols_contra}</TableCell>
                          <TableCell className="text-center font-medium">
                            <span className={team.saldo_gols >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {team.saldo_gols > 0 ? '+' : ''}{team.saldo_gols}
                            </span>
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {team.aproveitamento.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex gap-1 justify-center">
                              {team.ultimos_jogos.map((resultado, index) => (
                                <div
                                  key={index}
                                  className={`w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold ${
                                    resultado === 'V' ? 'bg-green-500' : 
                                    resultado === 'E' ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  title={resultado === 'V' ? 'Vitória' : resultado === 'E' ? 'Empate' : 'Derrota'}
                                >
                                  {resultado}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              
              {/* Legenda */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Copa do Mundo (1º ao 6º)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Repescagem (7º)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Eliminado (8º ao 10º)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Próximos Jogos */}
        <TabsContent value="proximos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Próximos Jogos - 13ª Rodada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {proximosJogos.map((jogo) => (
                  <Card key={jogo.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="text-center space-y-3">
                        <Badge variant="outline" className="mb-2">
                          {jogo.rodada}ª Rodada
                        </Badge>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-center flex-1">
                            <div className="flex items-center justify-end gap-2 mb-1">
                              <span className="font-bold text-sm">{jogo.casa}</span>
                              <TeamFlag teamName={jogo.casa} size={24} />
                            </div>
                          </div>
                          
                          <div className="mx-4 text-center">
                            <div className="text-lg font-bold text-blue-600">VS</div>
                          </div>
                          
                          <div className="text-center flex-1">
                            <div className="flex items-center justify-start gap-2 mb-1">
                              <TeamFlag teamName={jogo.fora} size={24} />
                              <span className="font-bold text-sm">{jogo.fora}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center justify-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(jogo.data)}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{jogo.hora}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs">{jogo.estadio}, {jogo.cidade}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resultados */}
        <TabsContent value="resultados" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                Últimos Resultados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">
                Resultados da última rodada serão exibidos aqui
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EliminatoriasSulAmericanas;

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Globe, Flag, Crown, Award, Star, Zap } from 'lucide-react';
import { CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';

interface CampeonatoFilterProps {
  selectedCampeonato: CampeonatoType | 'todos';
  onCampeonatoChange: (campeonato: CampeonatoType | 'todos') => void;
}

const CampeonatoFilter = ({ selectedCampeonato, onCampeonatoChange }: CampeonatoFilterProps) => {
  const getIconComponent = (iconName: string) => {
    const icons = { Trophy, Globe, Flag, Crown, Award, Star, Zap };
    return icons[iconName as keyof typeof icons] || Trophy;
  };

  const getCampeonatoColor = (id: string) => {
    switch (id) {
      case 'brasileiro-a': return 'data-[state=active]:bg-green-600 data-[state=active]:text-white';
      case 'brasileiro-b': return 'data-[state=active]:bg-blue-600 data-[state=active]:text-white';
      case 'copa-do-brasil': return 'data-[state=active]:bg-purple-600 data-[state=active]:text-white';
      case 'libertadores': return 'data-[state=active]:bg-red-600 data-[state=active]:text-white';
      case 'eliminatorias-copa': return 'data-[state=active]:bg-green-600 data-[state=active]:text-white';
      case 'amistosos-selecao': return 'data-[state=active]:bg-blue-600 data-[state=active]:text-white';
      default: return 'data-[state=active]:bg-purple-600 data-[state=active]:text-white';
    }
  };

  const activeCampeonatos = Object.entries(CAMPEONATOS).filter(([_, camp]) => camp.ativo);

  return (
    <Card className="mb-6 bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-center text-white">Selecione o Campeonato</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCampeonato} onValueChange={(value) => onCampeonatoChange(value as CampeonatoType | 'todos')}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 h-auto p-2 bg-gray-900">
            <TabsTrigger 
              value="todos" 
              className="flex items-center gap-2 p-3 text-gray-300 hover:text-white data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Todos</span>
              <span className="sm:hidden">Todos</span>
            </TabsTrigger>
            {activeCampeonatos.map(([id, campeonato]) => {
              const IconComponent = getIconComponent(campeonato.icone);
              return (
                <TabsTrigger 
                  key={id} 
                  value={id}
                  className={`flex items-center gap-2 p-3 text-xs text-gray-300 hover:text-white transition-all ${getCampeonatoColor(id)}`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{campeonato.nome}</span>
                  <span className="sm:hidden">{campeonato.nome.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CampeonatoFilter;


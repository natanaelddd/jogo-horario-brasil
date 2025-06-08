
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

  const activeCampeonatos = Object.entries(CAMPEONATOS).filter(([_, camp]) => camp.ativo);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-center">Selecione o Campeonato</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCampeonato} onValueChange={(value) => onCampeonatoChange(value as CampeonatoType | 'todos')}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 h-auto p-2">
            <TabsTrigger value="todos" className="flex items-center gap-2 p-3">
              <Trophy className="w-4 h-4" />
              Todos
            </TabsTrigger>
            {activeCampeonatos.map(([id, campeonato]) => {
              const IconComponent = getIconComponent(campeonato.icone);
              return (
                <TabsTrigger 
                  key={id} 
                  value={id}
                  className="flex items-center gap-2 p-3 text-xs"
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

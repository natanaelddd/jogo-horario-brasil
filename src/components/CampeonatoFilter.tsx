
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const getSelectedLabel = () => {
    if (selectedCampeonato === 'todos') return 'Todos os Campeonatos';
    const campeonato = CAMPEONATOS[selectedCampeonato as CampeonatoType];
    return campeonato?.nome || 'Selecione um campeonato';
  };

  return (
    <Card className="mb-6 bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-center text-white">Selecione o Campeonato</CardTitle>
      </CardHeader>
      <CardContent>
        <Select 
          value={selectedCampeonato} 
          onValueChange={(value) => onCampeonatoChange(value as CampeonatoType | 'todos')}
        >
          <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-white hover:bg-gray-800 focus:border-purple-500">
            <SelectValue placeholder="Selecione um campeonato">
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span>{getSelectedLabel()}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-80">
            <SelectItem 
              value="todos" 
              className="focus:bg-purple-600 focus:text-white cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-purple-400" />
                <span>Todos os Campeonatos</span>
              </div>
            </SelectItem>
            
            {activeCampeonatos.map(([id, campeonato]) => {
              const IconComponent = getIconComponent(campeonato.icone);
              return (
                <SelectItem 
                  key={id} 
                  value={id}
                  className="focus:bg-purple-600 focus:text-white cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="w-4 h-4" />
                    <span>{campeonato.nome}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default CampeonatoFilter;

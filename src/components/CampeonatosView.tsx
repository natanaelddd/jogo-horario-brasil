
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Globe, Flag, Crown, Award, Star, Zap } from 'lucide-react';
import { CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';

interface CampeonatosViewProps {
  onCampeonatoSelect: (campeonato: CampeonatoType) => void;
  onViewChange: (view: 'jogos') => void;
}

const CampeonatosView = ({ onCampeonatoSelect, onViewChange }: CampeonatosViewProps) => {
  const getIconComponent = (iconName: string) => {
    const icons = { Trophy, Globe, Flag, Crown, Award, Star, Zap };
    return icons[iconName as keyof typeof icons] || Trophy;
  };

  const activeCampeonatos = Object.entries(CAMPEONATOS).filter(([_, camp]) => camp.ativo);

  const handleCampeonatoClick = (id: string) => {
    onCampeonatoSelect(id as CampeonatoType);
    onViewChange('jogos');
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {activeCampeonatos.map(([id, campeonato]) => (
        <Card key={id} className="cursor-pointer hover:shadow-lg transition-shadow" 
              onClick={() => handleCampeonatoClick(id)}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${campeonato.cor} rounded-full flex items-center justify-center`}>
                {(() => {
                  const IconComponent = getIconComponent(campeonato.icone);
                  return <IconComponent className="w-6 h-6 text-white" />;
                })()}
              </div>
              <div>
                <h3 className="font-bold">{campeonato.nome}</h3>
                <p className="text-sm text-muted-foreground capitalize">{campeonato.categoria}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Ver Detalhes
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampeonatosView;

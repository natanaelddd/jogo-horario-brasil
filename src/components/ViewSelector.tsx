
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Table, Globe } from 'lucide-react';

interface ViewSelectorProps {
  activeView: 'jogos' | 'classificacao' | 'campeonato';
  onViewChange: (view: 'jogos' | 'classificacao' | 'campeonato') => void;
}

const ViewSelector = ({ activeView, onViewChange }: ViewSelectorProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <Tabs value={activeView} onValueChange={(value) => onViewChange(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jogos">
              <Trophy className="w-4 h-4 mr-2" />
              Jogos
            </TabsTrigger>
            <TabsTrigger value="classificacao">
              <Table className="w-4 h-4 mr-2" />
              Classificações
            </TabsTrigger>
            <TabsTrigger value="campeonato">
              <Globe className="w-4 h-4 mr-2" />
              Campeonatos
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ViewSelector;

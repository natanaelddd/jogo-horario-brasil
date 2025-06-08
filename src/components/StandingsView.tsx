
import { CampeonatoType } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';
import StandingsTable from './StandingsTable';

interface StandingsViewProps {
  selectedCampeonato: CampeonatoType | 'todos';
}

const StandingsView = ({ selectedCampeonato }: StandingsViewProps) => {
  const activeCampeonatos = Object.entries(CAMPEONATOS).filter(([_, camp]) => camp.ativo);

  if (selectedCampeonato === 'todos') {
    return (
      <div className="grid gap-6 lg:grid-cols-2">
        {activeCampeonatos
          .filter(([id]) => ['brasileiro-a', 'brasileiro-b'].includes(id))
          .map(([id, campeonato]) => (
            <StandingsTable key={id} campeonato={id as CampeonatoType} />
          ))}
      </div>
    );
  }

  return <StandingsTable campeonato={selectedCampeonato as CampeonatoType} />;
};

export default StandingsView;

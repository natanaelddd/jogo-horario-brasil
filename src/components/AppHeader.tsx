
import { Badge } from '@/components/ui/badge';

const AppHeader = () => {
  return (
    <div className="text-center py-8 gradient-uefa">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Futebol Brasileiro
        </h1>
        <p className="text-lg text-white/80 mb-6">
          Acompanhe todos os jogos e resultados em tempo real
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            ⚽ Tempo Real
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            📊 Estatísticas
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            🏆 Classificação
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

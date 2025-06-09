
import { Badge } from '@/components/ui/badge';

const AppHeader = () => {
  return (
    <div className="text-center py-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Futebol Brasileiro
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Acompanhe todos os jogos e resultados em tempo real
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            ⚽ Tempo Real
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            📊 Estatísticas
          </Badge>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            🏆 Classificação
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;

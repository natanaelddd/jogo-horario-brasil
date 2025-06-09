
import { RefreshCw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Logo from './Logo';
import { Link } from 'react-router-dom';

interface AppHeaderProps {
  onRefresh: () => void;
  onShowAdmin: () => void;
  isLoading: boolean;
}

const AppHeader = ({ onRefresh, onShowAdmin, isLoading }: AppHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-4">
        <Logo />
        <div>
          <h1 className="text-4xl font-bold gradient-brasil bg-clip-text text-transparent mb-2">
            Brasileirão 2024
          </h1>
          <p className="text-lg text-muted-foreground">
            Acompanhe todos os jogos e resultados do futebol brasileiro
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        <Badge variant="secondary" className="bg-brasil-green text-white">
          ⚽ Tempo Real
        </Badge>
        <Badge variant="secondary" className="bg-brasil-yellow text-gray-900">
          📊 Estatísticas Completas
        </Badge>
        <Badge variant="secondary" className="bg-blue-600 text-white">
          🏆 Todos os Campeonatos
        </Badge>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          onClick={onRefresh}
          disabled={isLoading}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar Dados
        </Button>
        
        <Link to="/eliminatorias">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            🌎 Eliminatórias
          </Button>
        </Link>
        
        <Button
          onClick={onShowAdmin}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Admin
        </Button>
      </div>
    </div>
  );
};

export default AppHeader;

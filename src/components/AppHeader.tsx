
import { Button } from '@/components/ui/button';
import { RefreshCw, Settings } from 'lucide-react';
import Logo from './Logo';
import BannerDisplay from './BannerDisplay';

interface AppHeaderProps {
  onRefresh: () => void;
  onShowAdmin: () => void;
  isLoading: boolean;
}

const AppHeader = ({ onRefresh, onShowAdmin, isLoading }: AppHeaderProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <p className="text-lg text-muted-foreground mb-4">
          Acompanhe todos os jogos dos principais campeonatos
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <Button 
            onClick={onRefresh}
            disabled={isLoading}
            className="gradient-brasil text-white font-semibold"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Atualizando...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar Dados
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onShowAdmin}
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </div>
      </div>

      <BannerDisplay type="top" />
    </>
  );
};

export default AppHeader;

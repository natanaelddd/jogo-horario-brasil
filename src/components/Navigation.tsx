
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Logo from './Logo';

interface NavigationProps {
  onRefresh: () => void;
  onShowAdmin: () => void;
  isLoading: boolean;
}

const Navigation = ({ onRefresh, onShowAdmin, isLoading }: NavigationProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-white hover:text-purple-400 hover:bg-gray-800" />
            
            <div className="flex items-center gap-3">
              <Logo />
              <Link to="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
                Horário do Jogo
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-red-600 text-white border-red-500 hidden md:flex">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Ao Vivo
            </Badge>

            <Button
              onClick={onRefresh}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-purple-500"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar</span>
            </Button>
            
            <Button
              onClick={onShowAdmin}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

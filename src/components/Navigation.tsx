import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { 
  Home, 
  Trophy, 
  Globe, 
  Settings, 
  RefreshCw,
  Menu,
  X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Logo from './Logo';

interface NavigationProps {
  onRefresh: () => void;
  onShowAdmin: () => void;
  isLoading: boolean;
}

const Navigation = ({ onRefresh, onShowAdmin, isLoading }: NavigationProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      title: "Início",
      href: "/",
      icon: Home,
      description: "Página principal com todos os campeonatos"
    },
    {
      title: "Eliminatórias",
      href: "/eliminatorias",
      icon: Globe,
      description: "Copa do Mundo - América do Sul"
    }
  ];

  const campeonatos = [
    { name: "Brasileirão Série A", href: "/?campeonato=brasileirao-a" },
    { name: "Brasileirão Série B", href: "/?campeonato=brasileirao-b" },
    { name: "Copa do Brasil", href: "/?campeonato=copa-brasil" },
    { name: "Libertadores", href: "/?campeonato=libertadores" },
    { name: "Sul-Americana", href: "/?campeonato=sul-americana" }
  ];

  if (isMobile) {
    return (
      <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Logo />
              <Link to="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
                Horário do Jogo
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={onRefresh}
                disabled={isLoading}
                variant="ghost"
                size="sm"
                className="text-white hover:text-purple-400 hover:bg-gray-800"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-purple-400 hover:bg-gray-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="border-t border-gray-700 pb-4 bg-gray-900">
              <div className="space-y-1 pt-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                ))}
                
                <div className="border-t border-gray-700 mt-4 pt-4">
                  <p className="px-3 py-1 text-xs font-semibold text-purple-400 uppercase tracking-wider">
                    Campeonatos
                  </p>
                  {campeonatos.map((camp) => (
                    <Link
                      key={camp.href}
                      to={camp.href}
                      className="block px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 ml-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {camp.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Logo />
              <Link to="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
                Horário do Jogo
              </Link>
            </div>

            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors">
                  <Trophy className="w-4 h-4 mr-2" />
                  Campeonatos
                </MenubarTrigger>
                <MenubarContent className="min-w-48 bg-gray-800 border-gray-700">
                  {campeonatos.map((camp) => (
                    <MenubarItem key={camp.href} asChild>
                      <Link to={camp.href} className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors">
                        {camp.name}
                      </Link>
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger asChild>
                  <Link to="/eliminatorias" className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800 px-4 py-2 rounded-md transition-colors">
                    <Globe className="w-4 h-4 mr-2" />
                    Eliminatórias
                  </Link>
                </MenubarTrigger>
              </MenubarMenu>
            </Menubar>
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


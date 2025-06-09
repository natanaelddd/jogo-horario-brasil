
import { Home, Trophy, Globe, Settings, Flag, Crown, Award, Star, Zap, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CAMPEONATOS } from '@/config/campeonatos';

const AppSidebar = () => {
  const location = useLocation();

  const mainMenuItems = [
    {
      title: "Início",
      href: "/",
      icon: Home,
      description: "Página principal com destaques e jogos"
    },
    {
      title: "Times",
      href: "/times",
      icon: Users,
      description: "Todos os times e suas estatísticas"
    },
    {
      title: "Eliminatórias",
      href: "/eliminatorias", 
      icon: Globe,
      description: "Copa do Mundo - América do Sul"
    }
  ];

  const getIconComponent = (iconName: string) => {
    const icons = { Trophy, Globe, Flag, Crown, Award, Star, Zap };
    return icons[iconName as keyof typeof icons] || Trophy;
  };

  const activeCampeonatos = Object.entries(CAMPEONATOS).filter(([_, camp]) => camp.ativo);

  return (
    <Sidebar className="border-r border-gray-700">
      <SidebarHeader className="border-b border-gray-700 bg-gray-900">
        <div className="flex items-center p-4">
          <div>
            <h2 className="text-lg font-bold text-white">Horário do Jogo</h2>
            <p className="text-xs text-gray-400">Portal completo de futebol</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400 font-semibold uppercase text-xs tracking-wider">
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === item.href}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-purple-600 data-[active=true]:text-white"
                  >
                    <Link to={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-400 font-semibold uppercase text-xs tracking-wider">
            Campeonatos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Link to="/?campeonato=todos" className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-purple-400" />
                    <span>Todos os Campeonatos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {activeCampeonatos.map(([id, campeonato]) => {
                const IconComponent = getIconComponent(campeonato.icone);
                return (
                  <SidebarMenuItem key={id}>
                    <SidebarMenuButton 
                      asChild
                      className="text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <Link to={`/?campeonato=${id}`} className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5" />
                        <span className="text-sm">{campeonato.nome}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-700 bg-gray-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-gray-400 hover:text-white hover:bg-gray-800"
              onClick={() => console.log('Configurações clicadas')}
            >
              <Settings className="w-5 h-5" />
              <span>Configurações</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

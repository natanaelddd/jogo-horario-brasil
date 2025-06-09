
import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Newspaper, Clock, Eye, ArrowRight } from 'lucide-react';

interface Noticia {
  id: string;
  titulo: string;
  resumo: string;
  categoria: string;
  dataPublicacao: string;
  visualizacoes: number;
  imageUrl: string;
  destaque: boolean;
}

const Noticias = () => {
  // Dados mock para demonstração
  const [noticias] = useState<Noticia[]>([
    {
      id: '1',
      titulo: 'Flamengo anuncia nova contratação para 2025',
      resumo: 'Clube carioca confirma chegada de atacante argentino por R$ 50 milhões',
      categoria: 'Transferências',
      dataPublicacao: '2025-01-15',
      visualizacoes: 15420,
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400',
      destaque: true
    },
    {
      id: '2',
      titulo: 'Palmeiras se prepara para estreia na Libertadores',
      resumo: 'Verdão intensifica treinos visando primeira partida do torneio continental',
      categoria: 'Libertadores',
      dataPublicacao: '2025-01-14',
      visualizacoes: 8932,
      imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400',
      destaque: false
    },
    {
      id: '3',
      titulo: 'Seleção Brasileira divulga convocados para Eliminatórias',
      resumo: 'Dorival Jr. anuncia lista com 26 jogadores para próximos jogos das Eliminatórias',
      categoria: 'Seleção',
      dataPublicacao: '2025-01-13',
      visualizacoes: 12765,
      imageUrl: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400',
      destaque: true
    },
    {
      id: '4',
      titulo: 'São Paulo renova com jovem promessa',
      resumo: 'Meio-campista de 19 anos assina novo contrato até 2029',
      categoria: 'Transferências',
      dataPublicacao: '2025-01-12',
      visualizacoes: 5643,
      imageUrl: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=400',
      destaque: false
    }
  ]);

  const noticiasDestaque = noticias.filter(noticia => noticia.destaque);
  const outrasNoticias = noticias.filter(noticia => !noticia.destaque);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatarVisualizacoes = (views: number) => {
    if (views > 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Navigation 
            onRefresh={() => {}}
            onShowAdmin={() => {}}
            isLoading={false}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Newspaper className="w-8 h-8 text-purple-400" />
                Notícias
              </h1>
            </div>

            {/* Notícias em Destaque */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Em Destaque</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {noticiasDestaque.map((noticia) => (
                  <Card key={noticia.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                    <div className="aspect-video bg-gray-700 rounded-t-lg">
                      <img 
                        src={noticia.imageUrl} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-600 text-white">
                          {noticia.categoria}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          {formatarData(noticia.dataPublicacao)}
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg line-clamp-2">
                        {noticia.titulo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {noticia.resumo}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                          <Eye className="w-4 h-4" />
                          {formatarVisualizacoes(noticia.visualizacoes)}
                        </div>
                        <Button variant="ghost" size="sm" className="text-purple-400 hover:text-white">
                          Ler mais
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Outras Notícias */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Mais Notícias</h2>
              <div className="grid gap-4">
                {outrasNoticias.map((noticia) => (
                  <Card key={noticia.id} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-700 rounded-lg flex-shrink-0">
                          <img 
                            src={noticia.imageUrl} 
                            alt={noticia.titulo}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {noticia.categoria}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              {formatarData(noticia.dataPublicacao)}
                            </div>
                          </div>
                          <h3 className="text-white font-semibold mb-2 line-clamp-2">
                            {noticia.titulo}
                          </h3>
                          <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                            {noticia.resumo}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Eye className="w-3 h-3" />
                              {formatarVisualizacoes(noticia.visualizacoes)}
                            </div>
                            <Button variant="ghost" size="sm" className="text-purple-400 hover:text-white p-1">
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Noticias;

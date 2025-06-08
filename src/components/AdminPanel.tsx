import { useState } from 'react';
import { RefreshCw, Database, Clock, CheckCircle, XCircle, AlertCircle, LogOut, Image } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameDataService } from '@/services/gameDataService';
import { AuthService } from '@/services/authService';
import { FetchLog } from '@/types/game';
import { CAMPEONATOS } from '@/config/campeonatos';
import { useToast } from '@/hooks/use-toast';
import AdminLogin from './AdminLogin';
import BannerManager from './BannerManager';

interface AdminPanelProps {
  onDataUpdate: () => void;
  isLoading: boolean;
}

const AdminPanel = ({ onDataUpdate, isLoading }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.getInstance().isLoggedIn());
  const [logs, setLogs] = useState<FetchLog[]>(GameDataService.getInstance().getFetchLogs());
  const { toast } = useToast();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    AuthService.getInstance().logout();
    setIsAuthenticated(false);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso."
    });
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const handleManualUpdate = async () => {
    try {
      toast({
        title: "Iniciando atualização manual",
        description: "Buscando dados mais recentes de todos os campeonatos..."
      });
      
      await onDataUpdate();
      setLogs(GameDataService.getInstance().getFetchLogs());
      
      toast({
        title: "Atualização concluída",
        description: "Dados atualizados com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro na atualização",
        description: "Falha ao buscar novos dados",
        variant: "destructive"
      });
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR');
  };

  const getStatusIcon = (status: FetchLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'partial':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: FetchLog['status']) => {
    const variants = {
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      partial: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={variants[status]}>
        {status === 'success' ? 'Sucesso' : status === 'error' ? 'Erro' : 'Parcial'}
      </Badge>
    );
  };

  const getCampeonatoStats = () => {
    const stats = Object.keys(CAMPEONATOS).reduce((acc, campId) => {
      const campLogs = logs.filter(log => log.campeonato === campId);
      const lastUpdate = campLogs[0];
      acc[campId] = {
        lastUpdate: lastUpdate?.timestamp || 'Nunca',
        status: lastUpdate?.status || 'pending',
        gamesFound: lastUpdate?.gamesFound || 0
      };
      return acc;
    }, {} as Record<string, any>);
    
    return stats;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Painel de Administração - Todos os Campeonatos
            </CardTitle>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleManualUpdate}
            disabled={isLoading}
            className="w-full gradient-brasil text-white font-semibold"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Atualizando todos os campeonatos...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Forçar Atualização Manual de Todos os Campeonatos
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="banners" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="banners">
            <Image className="w-4 h-4 mr-2" />
            Banners
          </TabsTrigger>
          <TabsTrigger value="logs">Logs de Atualização</TabsTrigger>
          <TabsTrigger value="sources">Fontes de Dados</TabsTrigger>
          <TabsTrigger value="status">Status dos Campeonatos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="banners">
          <BannerManager />
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5" />
                Últimas 50 Atualizações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    Nenhum log disponível
                  </p>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(log.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(log.status)}
                          <span className="text-sm font-medium">{log.source}</span>
                          <Badge variant="outline" className="text-xs">
                            {CAMPEONATOS[log.campeonato]?.nome || log.campeonato}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {log.message}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatTimestamp(log.timestamp)}</span>
                          <span>{log.gamesFound} jogos encontrados</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fontes de Dados Configuradas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {GameDataService.getInstance().getDataSources().map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{source.name}</p>
                      <p className="text-sm text-muted-foreground">{source.url}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {source.campeonatos.slice(0, 3).map(campId => (
                          <Badge key={campId} variant="outline" className="text-xs">
                            {CAMPEONATOS[campId]?.nome || campId}
                          </Badge>
                        ))}
                        {source.campeonatos.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{source.campeonatos.length - 3} mais
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge variant={source.active ? "default" : "secondary"}>
                        Prioridade {source.priority}
                      </Badge>
                      <Badge variant={source.active ? "default" : "outline"}>
                        {source.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status dos Campeonatos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(getCampeonatoStats()).map(([campId, stats]) => {
                  const campeonato = CAMPEONATOS[campId as keyof typeof CAMPEONATOS];
                  if (!campeonato || !campeonato.ativo) return null;
                  
                  return (
                    <div key={campId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{campeonato.nome}</h4>
                        {getStatusIcon(stats.status)}
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>Última atualização: {stats.lastUpdate === 'Nunca' ? 'Nunca' : formatTimestamp(stats.lastUpdate)}</p>
                        <p>Jogos encontrados: {stats.gamesFound}</p>
                        <Badge className={campeonato.cor}>
                          {campeonato.categoria}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;

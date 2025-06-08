
import { useState } from 'react';
import { RefreshCw, Database, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameDataService } from '@/services/gameDataService';
import { FetchLog } from '@/types/game';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  onDataUpdate: () => void;
  isLoading: boolean;
}

const AdminPanel = ({ onDataUpdate, isLoading }: AdminPanelProps) => {
  const [logs, setLogs] = useState<FetchLog[]>(GameDataService.getInstance().getFetchLogs());
  const { toast } = useToast();

  const handleManualUpdate = async () => {
    try {
      toast({
        title: "Iniciando atualização manual",
        description: "Buscando dados mais recentes..."
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Painel de Administração
          </CardTitle>
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
                Atualizando...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Forçar Atualização Manual
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="logs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="logs">Logs de Atualização</TabsTrigger>
          <TabsTrigger value="sources">Fontes de Dados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5" />
                Últimas 10 Atualizações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                    <div>
                      <p className="font-medium">{source.name}</p>
                      <p className="text-sm text-muted-foreground">{source.url}</p>
                    </div>
                    <div className="flex items-center gap-2">
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
      </Tabs>
    </div>
  );
};

export default AdminPanel;

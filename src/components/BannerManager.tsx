
import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BannerService, Banner } from '@/services/bannerService';
import { useToast } from '@/hooks/use-toast';

const BannerManager = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [newBannerType, setNewBannerType] = useState<'top' | 'sidebar'>('top');
  const [newBannerImage, setNewBannerImage] = useState('');
  const [newBannerLink, setNewBannerLink] = useState('');
  const { toast } = useToast();

  const bannerService = BannerService.getInstance();

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = () => {
    setBanners(bannerService.getBanners());
  };

  const handleAddBanner = () => {
    if (!newBannerImage) {
      toast({
        title: "Erro",
        description: "URL da imagem é obrigatória",
        variant: "destructive"
      });
      return;
    }

    bannerService.addBanner(newBannerType, newBannerImage, newBannerLink || undefined);
    setNewBannerImage('');
    setNewBannerLink('');
    loadBanners();
    
    toast({
      title: "Banner adicionado",
      description: "Banner foi adicionado com sucesso!"
    });
  };

  const handleRemoveBanner = (id: string) => {
    bannerService.removeBanner(id);
    loadBanners();
    toast({
      title: "Banner removido",
      description: "Banner foi removido com sucesso!"
    });
  };

  const handleToggleBanner = (id: string) => {
    bannerService.toggleBanner(id);
    loadBanners();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={newBannerType} onValueChange={(value: 'top' | 'sidebar') => setNewBannerType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Banner do Topo</SelectItem>
                <SelectItem value="sidebar">Banner Lateral</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              placeholder="URL da imagem"
              value={newBannerImage}
              onChange={(e) => setNewBannerImage(e.target.value)}
            />
            
            <Input
              placeholder="Link (opcional)"
              value={newBannerLink}
              onChange={(e) => setNewBannerLink(e.target.value)}
            />
          </div>
          
          <Button onClick={handleAddBanner} className="gradient-brasil text-white">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Banner
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Banners Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {banners.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Nenhum banner cadastrado
              </p>
            ) : (
              banners.map((banner) => (
                <div key={banner.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img 
                    src={banner.imageUrl} 
                    alt="Banner preview" 
                    className="w-20 h-12 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={banner.type === 'top' ? 'default' : 'secondary'}>
                        {banner.type === 'top' ? 'Topo' : 'Lateral'}
                      </Badge>
                      <Badge variant={banner.active ? 'default' : 'outline'}>
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Criado em: {formatDate(banner.createdAt)}
                    </p>
                    {banner.link && (
                      <p className="text-sm text-blue-600 flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {banner.link}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleBanner(banner.id)}
                    >
                      {banner.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveBanner(banner.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BannerManager;

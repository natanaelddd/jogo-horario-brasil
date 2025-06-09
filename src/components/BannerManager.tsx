
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
      <Card className="uefa-table">
        <CardHeader>
          <CardTitle className="text-primary">Adicionar Novo Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={newBannerType} onValueChange={(value: 'top' | 'sidebar') => setNewBannerType(value)}>
              <SelectTrigger className="border-uefa">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-uefa">
                <SelectItem value="top">Banner do Topo</SelectItem>
                <SelectItem value="sidebar">Banner Lateral</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              placeholder="URL da imagem"
              value={newBannerImage}
              onChange={(e) => setNewBannerImage(e.target.value)}
              className="border-uefa"
            />
            
            <Input
              placeholder="Link (opcional)"
              value={newBannerLink}
              onChange={(e) => setNewBannerLink(e.target.value)}
              className="border-uefa"
            />
          </div>
          
          <Button onClick={handleAddBanner} className="btn-uefa">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Banner
          </Button>
        </CardContent>
      </Card>

      <Card className="uefa-table">
        <CardHeader>
          <CardTitle className="text-primary">Banners Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {banners.length === 0 ? (
              <div className="text-center py-8 uefa-glass rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Nenhum banner cadastrado
                </p>
              </div>
            ) : (
              banners.map((banner) => (
                <div key={banner.id} className="flex items-center gap-4 p-4 border border-uefa rounded-lg uefa-table-row">
                  <div className="w-20 h-12 rounded overflow-hidden bg-card border border-uefa">
                    <img 
                      src={banner.imageUrl} 
                      alt="Banner preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full flex items-center justify-center uefa-glass">
                              <svg class="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={banner.type === 'top' ? 'default' : 'secondary'} className="bg-primary/20 text-primary">
                        {banner.type === 'top' ? 'Topo' : 'Lateral'}
                      </Badge>
                      <Badge variant={banner.active ? 'default' : 'outline'} className={banner.active ? 'bg-green-500/20 text-green-400' : ''}>
                        {banner.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Criado em: {formatDate(banner.createdAt)}
                    </p>
                    {banner.link && (
                      <p className="text-sm text-primary flex items-center gap-1 mt-1">
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
                      className="border-uefa hover-uefa"
                    >
                      {banner.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveBanner(banner.id)}
                      className="bg-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
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

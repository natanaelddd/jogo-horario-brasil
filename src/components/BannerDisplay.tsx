
import { useState, useEffect } from 'react';
import { BannerService, Banner } from '@/services/bannerService';

interface BannerDisplayProps {
  type: 'top' | 'sidebar';
  className?: string;
}

const BannerDisplay = ({ type, className }: BannerDisplayProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const bannerService = BannerService.getInstance();

  useEffect(() => {
    const loadBanners = () => {
      setBanners(bannerService.getBannersByType(type));
    };

    loadBanners();
    
    // Atualizar banners a cada 30 segundos
    const interval = setInterval(loadBanners, 30000);
    
    return () => clearInterval(interval);
  }, [type]);

  if (banners.length === 0) return null;

  const handleBannerClick = (banner: Banner) => {
    if (banner.link) {
      window.open(banner.link, '_blank');
    }
  };

  return (
    <div className={`space-y-4 ${className || ''}`}>
      {banners.map((banner) => (
        <div
          key={banner.id}
          className={`
            uefa-banner
            ${banner.link ? 'cursor-pointer' : ''} 
            ${type === 'top' ? 'w-full h-24' : 'w-full h-40'}
          `}
          onClick={() => handleBannerClick(banner)}
        >
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={banner.imageUrl}
              alt="Banner publicitário"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const parent = target.parentElement?.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center uefa-glass">
                      <div class="text-center p-4">
                        <div class="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                          <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <p class="text-sm text-muted-foreground">Banner indisponível</p>
                      </div>
                    </div>
                  `;
                }
              }}
            />
            
            {/* Overlay sutil para melhor integração visual */}
            <div className="absolute inset-0 bg-gradient-to-t from-uefa-dark/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerDisplay;

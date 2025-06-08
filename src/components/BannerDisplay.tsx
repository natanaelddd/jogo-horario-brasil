
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
            ${banner.link ? 'cursor-pointer hover:opacity-80' : ''} 
            transition-opacity rounded-lg overflow-hidden shadow-md
            ${type === 'top' ? 'w-full h-24' : 'w-full h-40'}
          `}
          onClick={() => handleBannerClick(banner)}
        >
          <img
            src={banner.imageUrl}
            alt="Banner publicitário"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BannerDisplay;

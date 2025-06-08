
export interface Banner {
  id: string;
  type: 'top' | 'sidebar';
  imageUrl: string;
  link?: string;
  active: boolean;
  createdAt: string;
}

export class BannerService {
  private static instance: BannerService;
  private banners: Banner[] = [];

  private constructor() {
    this.loadBanners();
  }

  static getInstance(): BannerService {
    if (!BannerService.instance) {
      BannerService.instance = new BannerService();
    }
    return BannerService.instance;
  }

  private loadBanners(): void {
    const saved = localStorage.getItem('site_banners');
    if (saved) {
      this.banners = JSON.parse(saved);
    }
  }

  private saveBanners(): void {
    localStorage.setItem('site_banners', JSON.stringify(this.banners));
  }

  getBanners(): Banner[] {
    return this.banners;
  }

  getBannersByType(type: 'top' | 'sidebar'): Banner[] {
    return this.banners.filter(banner => banner.type === type && banner.active);
  }

  addBanner(type: 'top' | 'sidebar', imageUrl: string, link?: string): void {
    const banner: Banner = {
      id: Date.now().toString(),
      type,
      imageUrl,
      link,
      active: true,
      createdAt: new Date().toISOString()
    };
    this.banners.push(banner);
    this.saveBanners();
  }

  removeBanner(id: string): void {
    this.banners = this.banners.filter(banner => banner.id !== id);
    this.saveBanners();
  }

  toggleBanner(id: string): void {
    const banner = this.banners.find(b => b.id === id);
    if (banner) {
      banner.active = !banner.active;
      this.saveBanners();
    }
  }
}

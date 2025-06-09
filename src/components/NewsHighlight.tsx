
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Eye } from 'lucide-react';

interface NewsHighlightProps {
  title: string;
  summary: string;
  category: string;
  publishDate: string;
  views: number;
  imageUrl: string;
  isMain?: boolean;
}

const NewsHighlight = ({ 
  title, 
  summary, 
  category, 
  publishDate, 
  views, 
  imageUrl, 
  isMain = false 
}: NewsHighlightProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatViews = (viewCount: number) => {
    if (viewCount > 1000) {
      return `${(viewCount / 1000).toFixed(1)}k`;
    }
    return viewCount.toString();
  };

  if (isMain) {
    return (
      <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
        <div className="aspect-video bg-gray-700 rounded-t-lg">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400';
            }}
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-purple-600 text-white">
              {category}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              {formatDate(publishDate)}
            </div>
          </div>
          <h2 className="text-white text-lg font-semibold mb-2 line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {summary}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Eye className="w-4 h-4" />
            {formatViews(views)} visualizações
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors cursor-pointer">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <div className="w-20 h-20 bg-gray-700 rounded-lg flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            </div>
            <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
              {title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(publishDate)}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViews(views)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsHighlight;

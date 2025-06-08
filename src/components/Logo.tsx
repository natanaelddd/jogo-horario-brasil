
import { Trophy } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <Trophy className="w-7 h-7 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold gradient-brasil bg-clip-text text-transparent">
          Horário do Jogo
        </h1>
        <p className="text-xs text-muted-foreground">
          Todos os jogos em um só lugar
        </p>
      </div>
    </div>
  );
};

export default Logo;

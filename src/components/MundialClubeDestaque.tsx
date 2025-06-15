
import { useQuery } from "@tanstack/react-query";
import { Trophy, Tv2, Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Game } from "@/types/game";
import { GameDataService } from "@/services/gameDataService";

// URL oficial do canal de jogos ao vivo da CazéTV no YouTube
const CAZE_TV_URL = "https://www.youtube.com/@CazeTV";

const MundialClubeDestaque = () => {
  // Buscar os jogos do "mundial-clubes"
  const { data: jogos = [], isLoading } = useQuery({
    queryKey: ["mundial-clubes-jogos"],
    queryFn: async () => {
      const jogos = await GameDataService.getInstance().fetchGamesByCampeonato("mundial-clubes");
      // Mostrar os jogos em ordem de data
      return jogos.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    },
    staleTime: 1000 * 60 * 10
  });

  // Compilar lista única de canais para o "onde assistir"
  const canaisTransmissao: string[] = [];
  jogos.forEach(jogo => {
    (jogo.transmissao || []).forEach(canal => {
      if (canal && !canaisTransmissao.includes(canal)) canaisTransmissao.push(canal);
    });
  });

  return (
    <Card className="mb-8 bg-gradient-to-b from-yellow-100/10 to-gray-900 border-2 border-yellow-400 shadow-xl">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 shadow">
          <Trophy className="w-7 h-7 text-gray-900" />
        </div>
        <div>
          <CardTitle className="text-xl font-extrabold text-yellow-200 group-hover:text-yellow-400 transition-colors">
            Mundial de Clubes 2025 - Destaque
          </CardTitle>
          <span className="text-xs text-yellow-200/90">
            Veja os confrontos e onde assistir ao Mundial de Clubes FIFA!
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center text-yellow-200 py-8">Carregando confrontos do Mundial...</div>
        ) : jogos.length === 0 ? (
          <div className="text-center text-yellow-300 py-8">Nenhum confronto do Mundial de Clubes encontrado.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {jogos.map((jogo) => {
              const isAoVivo = jogo.status === "ao_vivo";
              const transmiteCazeTv = (jogo.transmissao ?? []).some(
                t => t.toLowerCase().includes("cazetv") || t.toLowerCase().includes("cazé tv") || t.toLowerCase().includes("cazé")
              );
              return (
                <div key={jogo.id} className="bg-yellow-100/5 border border-yellow-900/30 rounded-xl shadow-lg p-5 flex flex-col justify-between relative">
                  {/* Ao vivo badge */}
                  {isAoVivo && transmiteCazeTv && (
                    <a
                      href={CAZE_TV_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-4 top-4 flex items-center gap-1 px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow transition-all outline-none focus:ring-2 focus:ring-yellow-400 z-10"
                      title="Assistir ao vivo na CazéTV"
                    >
                      <Youtube className="w-4 h-4" />
                      Ao vivo: CazéTV
                    </a>
                  )}

                  <div className="mb-3">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-yellow-500/30 text-yellow-200 text-xs font-semibold px-2 py-0.5 rounded">{jogo.fase || "Fase"}</span>
                      <span className="text-gray-300 text-xs">{new Date(jogo.data).toLocaleDateString("pt-BR")}</span>
                      <span className="bg-gray-700 text-xs text-yellow-100 font-bold px-2 py-0.5 rounded">{jogo.hora}</span>
                    </div>
                    <div className="text-lg font-bold text-yellow-100">{jogo.time_casa} <span className="text-yellow-500">x</span> {jogo.time_fora}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                    <Tv2 className="w-4 h-4 inline" />
                    {(jogo.transmissao ?? []).length > 0
                      ? jogo.transmissao.join(", ")
                      : <span className="italic text-gray-400">Indisponível</span>
                    }
                  </div>
                  <div className="flex items-center gap-2 text-xs text-yellow-200 mb-2">
                    <span className="font-medium">Estádio:</span>
                    <span>{jogo.estadio}</span>
                  </div>
                  <div className="flex gap-1 mt-auto">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${isAoVivo ? "bg-red-600 text-white" : jogo.status === "finalizado" ? "bg-green-700 text-green-100" : "bg-blue-700 text-blue-100"}`}>
                      {isAoVivo
                        ? "AO VIVO"
                        : jogo.status === "finalizado"
                          ? "Finalizado"
                          : "Agendado"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MundialClubeDestaque;

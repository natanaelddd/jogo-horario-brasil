
import { useQuery } from "@tanstack/react-query";
import { Trophy, Tv2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Game } from "@/types/game";
import { GameDataService } from "@/services/gameDataService";

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
    <Card className="mb-6 bg-gradient-to-b from-yellow-100/10 to-gray-900 border-2 border-yellow-400 shadow-xl">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 shadow">
          <Trophy className="w-7 h-7 text-gray-900" />
        </div>
        <div>
          <CardTitle className="text-xl font-extrabold text-yellow-200 group-hover:text-yellow-400 transition-colors">
            Mundial de Clubes 2025 - Destaque
          </CardTitle>
          <span className="text-xs text-yellow-200/90">Veja os confrontos e onde assistir ao Mundial de Clubes FIFA!</span>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center text-yellow-200 py-8">Carregando confrontos do Mundial...</div>
        ) : jogos.length === 0 ? (
          <div className="text-center text-yellow-300 py-8">Nenhum confronto do Mundial de Clubes encontrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-yellow-500/10">
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead>Fase</TableHead>
                  <TableHead>Confronto</TableHead>
                  <TableHead className="min-w-[100px]">Estádio</TableHead>
                  <TableHead>
                    <Tv2 className="w-4 h-4 inline mr-1" /> Onde Assistir
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jogos.map((jogo) => (
                  <TableRow key={jogo.id} className="border-yellow-900/50">
                    <TableCell>{new Date(jogo.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{jogo.hora}</TableCell>
                    <TableCell>{jogo.fase || "-"}</TableCell>
                    <TableCell>
                      <span className="font-semibold">{jogo.time_casa}</span> x <span className="font-semibold">{jogo.time_fora}</span>
                    </TableCell>
                    <TableCell>{jogo.estadio}</TableCell>
                    <TableCell>
                      {(jogo.transmissao ?? []).length > 0
                        ? jogo.transmissao.map((canal, idx) => (
                            <span key={canal}>
                              {canal}
                              {idx < ((jogo.transmissao ?? []).length - 1) ? ", " : ""}
                            </span>
                          ))
                        : <span className="italic text-gray-400">Indisponível</span>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-sm text-yellow-100">
              <span className="inline-flex items-center gap-1 font-semibold"><Tv2 className="w-4 h-4" /> Onde assistir:</span>
              <span className="ml-2">{canaisTransmissao.length > 0 ? canaisTransmissao.join(", ") : "Ainda não divulgado"}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MundialClubeDestaque;

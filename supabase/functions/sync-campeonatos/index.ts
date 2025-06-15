
/**
 * Supabase Edge Function: sync-campeonatos
 * Busca todos os jogos dos principais campeonatos usando Firecrawl API
 * e grava na tabela games do Supabase.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CAMPEONATOS = [
  {
    name: "mundial-clubes",
    url: "https://www.fifa.com/pt/tournaments/mens/club-world-cup/usa-2025/match-center",
    parser: parseFifaJogos
  },
  {
    name: "libertadores",
    url: "https://www.conmebol.com/libertadores/fixture/",
    parser: parseLibertadoresJogos
  },
  // Adicione outros campeonatos e fontes conforme desejar...
];

// --- EXEMPLO DE PARSER PARA FIFA
async function parseFifaJogos(firecrawlData) {
  // Exemplo genérico, ajuste de acordo com a estrutura real retornada pelo firecrawl desse site.
  const jogos = [];
  if (!firecrawlData?.crawledPages) return jogos;
  for (const page of firecrawlData.crawledPages) {
    // Aqui, o conteúdo depende do formato do site da FIFA + retorno do firecrawl
    // Exemplo fictício:
    const html = page.html;
    if (!html) continue;
    // Um parser HTML robusto pode ser necessário - aqui simplificaremos o exemplo:
    const regex = /(\d{1,2}\/\d{1,2}\/\d{4}).{0,60}([A-Za-zÀ-ú0-9 ]+)\s+x\s+([A-Za-zÀ-ú0-9 ]+).{0,60}(\d{2}:\d{2})/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      jogos.push({
        data: match[1],
        time_casa: match[2].trim(),
        time_fora: match[3].trim(),
        hora: match[4],
        campeonato: "mundial-clubes",
      });
    }
  }
  return jogos;
}

// --- EXEMPLO DE PARSER PARA LIBERTADORES (adapte de acordo com o HTML de origem)
async function parseLibertadoresJogos(firecrawlData) {
  // Exemplo básico, ajuste conforme necessário.
  return [];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  for (const campeonato of CAMPEONATOS) {
    const response = await fetch("https://api.firecrawl.dev/v1/crawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${FIRECRAWL_API_KEY}`
      },
      body: JSON.stringify({
        url: campeonato.url,
        limit: 5,
        scrapeOptions: { formats: ["html"] }
      })
    });
    const firecrawlData = await response.json();
    const jogosList = await campeonato.parser(firecrawlData);

    // Para cada jogo parseado, salve no Supabase, evitando duplicatas (baseado em data, times)
    for (const jogo of jogosList) {
      const { data, error } = await supabase
        .from("games")
        .upsert(
          {
            campeonato: jogo.campeonato,
            data: jogo.data,
            time_casa: jogo.time_casa,
            time_fora: jogo.time_fora,
            hora: jogo.hora,
            estadio: jogo.estadio || '',
            transmissao: jogo.transmissao || [],
            fase: jogo.fase || '',
            serie: jogo.serie || '',
            rodada: jogo.rodada || null,
            status: "agendado",
          },
          { onConflict: ["campeonato", "data", "hora", "time_casa", "time_fora"] }
        );
      // Log para debug se necessário
      if (error) {
        console.log("Erro ao gravar jogo:", error);
      } else {
        console.log("Jogo salvo:", jogo.time_casa, "x", jogo.time_fora, jogo.data);
      }
    }
  }

  return new Response(JSON.stringify({ status: "ok", message: "Scraping concluído!" }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});


/**
 * Supabase Edge Function: sync-campeonatos
 * Busca todos os jogos dos principais campeonatos usando RapidAPI Football
 * e grava na tabela games do Supabase.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Mapeamento de ligas da API Football para nossos campeonatos
const LIGA_MAPPINGS = {
  // Brasileirão Série A
  71: { campeonato: "brasileiro-a", serie: "A" },
  // Brasileirão Série B  
  72: { campeonato: "brasileiro-b", serie: "B" },
  // Copa Libertadores
  13: { campeonato: "libertadores", fase: "Libertadores" },
  // Copa Sul-Americana
  11: { campeonato: "sul-americana", fase: "Sul-Americana" },
  // Copa do Brasil
  73: { campeonato: "copa-do-brasil", fase: "Copa do Brasil" },
  // Mundial de Clubes FIFA
  1: { campeonato: "mundial-clubes", fase: "Mundial de Clubes" },
};

async function fetchFixtures(leagueId: number, season: number = 2025) {
  console.log(`Buscando fixtures da liga ${leagueId} temporada ${season}`);
  
  const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=${season}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  });

  if (!response.ok) {
    console.error(`Erro na API Football: ${response.status} - ${response.statusText}`);
    return [];
  }

  const data = await response.json();
  console.log(`Encontrados ${data.response?.length || 0} jogos para liga ${leagueId}`);
  
  return data.response || [];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toTimeString().split(' ')[0]; // HH:MM:SS
}

function getGameStatus(fixture: any): string {
  const status = fixture.fixture.status.short;
  switch (status) {
    case 'NS': return 'agendado';
    case '1H':
    case 'HT':
    case '2H':
    case 'ET':
    case 'P': return 'ao_vivo';
    case 'FT':
    case 'AET':
    case 'PEN': return 'finalizado';
    default: return 'agendado';
  }
}

async function processFixtures(fixtures: any[], ligaInfo: any) {
  const jogos = [];
  
  for (const fixture of fixtures) {
    const jogo = {
      campeonato: ligaInfo.campeonato,
      serie: ligaInfo.serie || null,
      fase: ligaInfo.fase || null,
      data: formatDate(fixture.fixture.date),
      hora: formatTime(fixture.fixture.date),
      time_casa: fixture.teams.home.name,
      time_fora: fixture.teams.away.name,
      estadio: fixture.fixture.venue?.name || 'Não informado',
      transmissao: [], // A API Football não fornece info de transmissão
      rodada: fixture.league.round ? parseInt(fixture.league.round.replace(/\D/g, '')) || null : null,
      status: getGameStatus(fixture),
      placar_casa: fixture.goals.home,
      placar_fora: fixture.goals.away,
      arbitro: fixture.fixture.referee || null,
      publico: fixture.fixture.venue?.capacity || null
    };
    
    jogos.push(jogo);
  }
  
  return jogos;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('Iniciando sincronização de campeonatos via RapidAPI Football...');
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  let totalJogos = 0;

  try {
    // Processar cada liga mapeada
    for (const [leagueId, ligaInfo] of Object.entries(LIGA_MAPPINGS)) {
      console.log(`Processando liga ${leagueId}: ${ligaInfo.campeonato}`);
      
      try {
        // Buscar fixtures da liga
        const fixtures = await fetchFixtures(parseInt(leagueId));
        
        if (fixtures.length === 0) {
          console.log(`Nenhum jogo encontrado para liga ${leagueId}`);
          continue;
        }

        // Processar jogos
        const jogos = await processFixtures(fixtures, ligaInfo);
        console.log(`Processados ${jogos.length} jogos da liga ${leagueId}`);

        // Salvar no Supabase
        for (const jogo of jogos) {
          const { data, error } = await supabase
            .from("games")
            .upsert(
              jogo,
              { 
                onConflict: ["campeonato", "data", "hora", "time_casa", "time_fora"],
                ignoreDuplicates: false 
              }
            );

          if (error) {
            console.error("Erro ao gravar jogo:", error, jogo);
          } else {
            console.log(`Jogo salvo: ${jogo.time_casa} x ${jogo.time_fora} (${jogo.data} ${jogo.hora})`);
            totalJogos++;
          }
        }

        // Pequena pausa para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Erro ao processar liga ${leagueId}:`, error);
      }
    }

    console.log(`Sincronização concluída! Total de jogos processados: ${totalJogos}`);

    return new Response(JSON.stringify({ 
      status: "success", 
      message: `Sincronização concluída! ${totalJogos} jogos processados.`,
      totalJogos 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Erro geral na sincronização:', error);
    
    return new Response(JSON.stringify({ 
      status: "error", 
      message: `Erro na sincronização: ${error.message}` 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

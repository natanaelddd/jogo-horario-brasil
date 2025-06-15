
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Game } from "@/types/game";

/**
 * Hook para escutar e disparar atualização automática dos jogos em tempo real.
 * Chama o callback sempre que houver INSERT/UPDATE/DELETE na tabela de games.
 */
export function useGamesRealtime(onChange: () => void) {
  useEffect(() => {
    const channel = supabase
      .channel('games-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'games' },
        (payload) => {
          // Sempre dispara refetch em qualquer evento relevante
          onChange();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onChange]);
}

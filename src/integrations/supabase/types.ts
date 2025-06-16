export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      data_sources: {
        Row: {
          active: boolean | null
          campeonatos: string[] | null
          created_at: string
          id: string
          name: string
          priority: number | null
          updated_at: string
          url: string
        }
        Insert: {
          active?: boolean | null
          campeonatos?: string[] | null
          created_at?: string
          id?: string
          name: string
          priority?: number | null
          updated_at?: string
          url: string
        }
        Update: {
          active?: boolean | null
          campeonatos?: string[] | null
          created_at?: string
          id?: string
          name?: string
          priority?: number | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          day_of_week: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          order: number | null
          time: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order?: number | null
          time?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          order?: number | null
          time?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      fetch_logs: {
        Row: {
          campeonato: string
          created_at: string
          games_found: number | null
          id: string
          message: string | null
          source: string
          status: string
          timestamp: string
        }
        Insert: {
          campeonato: string
          created_at?: string
          games_found?: number | null
          id?: string
          message?: string | null
          source: string
          status: string
          timestamp?: string
        }
        Update: {
          campeonato?: string
          created_at?: string
          games_found?: number | null
          id?: string
          message?: string | null
          source?: string
          status?: string
          timestamp?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          arbitro: string | null
          campeonato: string
          cartoes_amarelos_casa: number | null
          cartoes_amarelos_fora: number | null
          cartoes_vermelhos_casa: number | null
          cartoes_vermelhos_fora: number | null
          created_at: string
          data: string
          estadio: string
          fase: string | null
          hora: string
          id: string
          observacoes: string | null
          placar_casa: number | null
          placar_fora: number | null
          publico: number | null
          rodada: number | null
          serie: string | null
          status: string | null
          tempo_jogo: string | null
          time_casa: string
          time_casa_id: string | null
          time_fora: string
          time_fora_id: string | null
          transmissao: string[] | null
          updated_at: string
        }
        Insert: {
          arbitro?: string | null
          campeonato: string
          cartoes_amarelos_casa?: number | null
          cartoes_amarelos_fora?: number | null
          cartoes_vermelhos_casa?: number | null
          cartoes_vermelhos_fora?: number | null
          created_at?: string
          data: string
          estadio: string
          fase?: string | null
          hora: string
          id?: string
          observacoes?: string | null
          placar_casa?: number | null
          placar_fora?: number | null
          publico?: number | null
          rodada?: number | null
          serie?: string | null
          status?: string | null
          tempo_jogo?: string | null
          time_casa: string
          time_casa_id?: string | null
          time_fora: string
          time_fora_id?: string | null
          transmissao?: string[] | null
          updated_at?: string
        }
        Update: {
          arbitro?: string | null
          campeonato?: string
          cartoes_amarelos_casa?: number | null
          cartoes_amarelos_fora?: number | null
          cartoes_vermelhos_casa?: number | null
          cartoes_vermelhos_fora?: number | null
          created_at?: string
          data?: string
          estadio?: string
          fase?: string | null
          hora?: string
          id?: string
          observacoes?: string | null
          placar_casa?: number | null
          placar_fora?: number | null
          publico?: number | null
          rodada?: number | null
          serie?: string | null
          status?: string | null
          tempo_jogo?: string | null
          time_casa?: string
          time_casa_id?: string | null
          time_fora?: string
          time_fora_id?: string | null
          transmissao?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "games_time_casa_id_fkey"
            columns: ["time_casa_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_time_fora_id_fkey"
            columns: ["time_fora_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      hero_slides: {
        Row: {
          button_text: string
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          button_text: string
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          button_text?: string
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      navigation_links: {
        Row: {
          created_at: string | null
          href: string
          id: string
          is_active: boolean | null
          order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          href: string
          id?: string
          is_active?: boolean | null
          order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          href?: string
          id?: string
          is_active?: boolean | null
          order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reading_plans: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          plan_url: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          plan_url: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          plan_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_value: string | null
          created_at: string | null
          id: string
          section_key: string
          updated_at: string | null
        }
        Insert: {
          content_value?: string | null
          created_at?: string | null
          id?: string
          section_key: string
          updated_at?: string | null
        }
        Update: {
          content_value?: string | null
          created_at?: string | null
          id?: string
          section_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      standings: {
        Row: {
          aproveitamento: number | null
          campeonato: string
          created_at: string
          derrotas: number
          empates: number
          gols_contra: number
          gols_pro: number
          id: string
          jogos: number
          pontos: number
          posicao: number
          saldo_gols: number | null
          team_id: string
          temporada: string
          ultimos_jogos: string[] | null
          updated_at: string
          vitorias: number
        }
        Insert: {
          aproveitamento?: number | null
          campeonato: string
          created_at?: string
          derrotas?: number
          empates?: number
          gols_contra?: number
          gols_pro?: number
          id?: string
          jogos?: number
          pontos?: number
          posicao: number
          saldo_gols?: number | null
          team_id: string
          temporada?: string
          ultimos_jogos?: string[] | null
          updated_at?: string
          vitorias?: number
        }
        Update: {
          aproveitamento?: number | null
          campeonato?: string
          created_at?: string
          derrotas?: number
          empates?: number
          gols_contra?: number
          gols_pro?: number
          id?: string
          jogos?: number
          pontos?: number
          posicao?: number
          saldo_gols?: number | null
          team_id?: string
          temporada?: string
          ultimos_jogos?: string[] | null
          updated_at?: string
          vitorias?: number
        }
        Relationships: [
          {
            foreignKeyName: "standings_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          cidade: string | null
          created_at: string
          escudo_url: string | null
          estadio: string | null
          estado: string | null
          fundacao: string | null
          id: string
          nome: string
          nome_completo: string | null
          sigla: string
          updated_at: string
        }
        Insert: {
          cidade?: string | null
          created_at?: string
          escudo_url?: string | null
          estadio?: string | null
          estado?: string | null
          fundacao?: string | null
          id?: string
          nome: string
          nome_completo?: string | null
          sigla: string
          updated_at?: string
        }
        Update: {
          cidade?: string | null
          created_at?: string
          escudo_url?: string | null
          estadio?: string | null
          estado?: string | null
          fundacao?: string | null
          id?: string
          nome?: string
          nome_completo?: string | null
          sigla?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

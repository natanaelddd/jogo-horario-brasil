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
          campeonato: string
          created_at: string
          data: string
          estadio: string
          fase: string | null
          hora: string
          id: string
          placar_casa: number | null
          placar_fora: number | null
          rodada: number | null
          serie: string | null
          status: string | null
          time_casa: string
          time_fora: string
          transmissao: string[] | null
          updated_at: string
        }
        Insert: {
          campeonato: string
          created_at?: string
          data: string
          estadio: string
          fase?: string | null
          hora: string
          id?: string
          placar_casa?: number | null
          placar_fora?: number | null
          rodada?: number | null
          serie?: string | null
          status?: string | null
          time_casa: string
          time_fora: string
          transmissao?: string[] | null
          updated_at?: string
        }
        Update: {
          campeonato?: string
          created_at?: string
          data?: string
          estadio?: string
          fase?: string | null
          hora?: string
          id?: string
          placar_casa?: number | null
          placar_fora?: number | null
          rodada?: number | null
          serie?: string | null
          status?: string | null
          time_casa?: string
          time_fora?: string
          transmissao?: string[] | null
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

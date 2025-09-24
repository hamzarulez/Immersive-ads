export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          brand_id: string | null
          brand_name: string | null
          budget_range: string | null
          campaign_title: string | null
          created_at: string
          description: string | null
          id: number
          platforms: string[] | null
          status: string | null
        }
        Insert: {
          brand_id?: string | null
          brand_name?: string | null
          budget_range?: string | null
          campaign_title?: string | null
          created_at?: string
          description?: string | null
          id?: number
          platforms?: string[] | null
          status?: string | null
        }
        Update: {
          brand_id?: string | null
          brand_name?: string | null
          budget_range?: string | null
          campaign_title?: string | null
          created_at?: string
          description?: string | null
          id?: number
          platforms?: string[] | null
          status?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string
          id: number
          last_message_at: string | null
          participant_one_id: string | null
          participant_two_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          last_message_at?: string | null
          participant_one_id?: string | null
          participant_two_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          last_message_at?: string | null
          participant_one_id?: string | null
          participant_two_id?: string | null
        }
        Relationships: []
      }
      listings: {
        Row: {
          created_at: string
          creator_id: string | null
          dau: number | null
          description: string | null
          game_title: string | null
          id: number
          platform: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          creator_id?: string | null
          dau?: number | null
          description?: string | null
          game_title?: string | null
          id?: number
          platform?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          creator_id?: string | null
          dau?: number | null
          description?: string | null
          game_title?: string | null
          id?: number
          platform?: string | null
          status?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: number | null
          created_at: string
          id: number
          sender_id: string | null
        }
        Insert: {
          content: string
          conversation_id?: number | null
          created_at?: string
          id?: number
          sender_id?: string | null
        }
        Update: {
          content?: string
          conversation_id?: number | null
          created_at?: string
          id?: number
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          full_name: string | null
          id: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          brand_logo_url: string | null
          brand_name: string
          contract_value: number
          created_at: string
          creator_id: string
          description: string | null
          id: number
          platform: string
          project_title: string
          status: string
        }
        Insert: {
          brand_logo_url?: string | null
          brand_name: string
          contract_value: number
          created_at: string
          creator_id?: string
          description?: string | null
          id?: number
          platform: string
          project_title: string
          status?: string
        }
        Update: {
          brand_logo_url?: string | null
          brand_name?: string
          contract_value?: number
          created_at?: string
          creator_id?: string
          description?: string | null
          id?: number
          platform?: string
          project_title?: string
          status?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          brand_name: string | null
          contract_value: number | null
          created_at: string
          creator_id: string | null
          creator_share: number | null
          id: number
          platform: string | null
          platform_fee: number | null
          release_date: string | null
          status: string | null
        }
        Insert: {
          brand_name?: string | null
          contract_value?: number | null
          created_at?: string
          creator_id?: string | null
          creator_share?: number | null
          id?: number
          platform?: string | null
          platform_fee?: number | null
          release_date?: string | null
          status?: string | null
        }
        Update: {
          brand_name?: string | null
          contract_value?: number | null
          created_at?: string
          creator_id?: string | null
          creator_share?: number | null
          id?: number
          platform?: string | null
          platform_fee?: number | null
          release_date?: string | null
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_active_campaigns: {
        Args: Record<PropertyKey, never>
        Returns: {
          brand_id: string
          brand_name: string
          budget_range: string
          campaign_title: string
          created_at: string
          description: string
          id: number
          platforms: string[]
          poster_avatar_url: string
          poster_full_name: string
          status: string
        }[]
      }
      get_active_listings: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar_url: string
          created_at: string
          creator_id: string
          dau: number
          description: string
          full_name: string
          game_title: string
          id: number
          platform: string
          status: string
        }[]
      }
      get_campaign_details: {
        Args: { p_campaign_id: number }
        Returns: {
          brand_id: string
          brand_name: string
          budget_range: string
          campaign_title: string
          created_at: string
          description: string
          id: number
          platforms: string[]
          poster_avatar_url: string
          poster_full_name: string
          poster_website_url: string
          status: string
        }[]
      }
      get_user_conversations: {
        Args: Record<PropertyKey, never>
        Returns: {
          conversation_id: number
          last_message_at: string
          other_participant_avatar_url: string
          other_participant_full_name: string
          other_participant_id: string
        }[]
      }
      is_participant: {
        Args: { p_conversation_id: number }
        Returns: boolean
      }
    }
    Enums: {
      project_status:
        | "Invitation"
        | "Active"
        | "In Review"
        | "Completed"
        | "Declined"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      project_status: [
        "Invitation",
        "Active",
        "In Review",
        "Completed",
        "Declined",
      ],
    },
  },
} as const

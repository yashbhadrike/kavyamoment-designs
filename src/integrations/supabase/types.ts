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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          parent_id: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          parent_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          parent_id?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      formats: {
        Row: {
          created_at: string
          cta_text: string | null
          cta_url: string | null
          description: string | null
          features: string[]
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          slug: string
          sort_order: number
          starting_price: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          description?: string | null
          features?: string[]
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          slug: string
          sort_order?: number
          starting_price?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          description?: string | null
          features?: string[]
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          slug?: string
          sort_order?: number
          starting_price?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      homepage_sections: {
        Row: {
          content: Json
          created_at: string
          eyebrow: string | null
          id: string
          is_visible: boolean
          section_key: string
          sort_order: number
          subtitle: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json
          created_at?: string
          eyebrow?: string | null
          id?: string
          is_visible?: boolean
          section_key: string
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json
          created_at?: string
          eyebrow?: string | null
          id?: string
          is_visible?: boolean
          section_key?: string
          sort_order?: number
          subtitle?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          filename: string
          id: string
          media_type: string
          mime_type: string | null
          size_bytes: number | null
          storage_path: string | null
          title: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          filename?: string
          id?: string
          media_type?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path?: string | null
          title?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          filename?: string
          id?: string
          media_type?: string
          mime_type?: string | null
          size_bytes?: number | null
          storage_path?: string | null
          title?: string | null
          url?: string
        }
        Relationships: []
      }
      occasions: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          badge: string | null
          created_at: string
          cta_text: string | null
          cta_url: string | null
          description: string | null
          discount_text: string | null
          features: string[]
          id: string
          is_active: boolean
          is_featured: boolean
          name: string
          original_price: number | null
          price: number | null
          sort_order: number
          updated_at: string
        }
        Insert: {
          badge?: string | null
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          description?: string | null
          discount_text?: string | null
          features?: string[]
          id?: string
          is_active?: boolean
          is_featured?: boolean
          name: string
          original_price?: number | null
          price?: number | null
          sort_order?: number
          updated_at?: string
        }
        Update: {
          badge?: string | null
          created_at?: string
          cta_text?: string | null
          cta_url?: string | null
          description?: string | null
          discount_text?: string | null
          features?: string[]
          id?: string
          is_active?: boolean
          is_featured?: boolean
          name?: string
          original_price?: number | null
          price?: number | null
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      product_media: {
        Row: {
          alt_text: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean
          is_visible: boolean
          media_type: string
          poster_url: string | null
          product_id: string
          sort_order: number
          title: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          is_visible?: boolean
          media_type?: string
          poster_url?: string | null
          product_id: string
          sort_order?: number
          title?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean
          is_visible?: boolean
          media_type?: string
          poster_url?: string | null
          product_id?: string
          sort_order?: number
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          badge: string | null
          category_id: string | null
          created_at: string
          description: string | null
          discount_text: string | null
          features: string[]
          format_id: string | null
          id: string
          is_featured: boolean
          name: string
          no_index: boolean
          occasion_id: string | null
          og_image_url: string | null
          original_price: number | null
          price: number | null
          price_label: string | null
          product_type: string
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          show_starting_from: boolean
          slug: string
          sort_order: number
          status: string
          tags: string[]
          updated_at: string
          video_autoplay: boolean
          video_loop: boolean
          video_muted: boolean
          video_poster_url: string | null
          video_section_description: string | null
          video_section_title: string | null
          video_url: string | null
        }
        Insert: {
          badge?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount_text?: string | null
          features?: string[]
          format_id?: string | null
          id?: string
          is_featured?: boolean
          name: string
          no_index?: boolean
          occasion_id?: string | null
          og_image_url?: string | null
          original_price?: number | null
          price?: number | null
          price_label?: string | null
          product_type?: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          show_starting_from?: boolean
          slug: string
          sort_order?: number
          status?: string
          tags?: string[]
          updated_at?: string
          video_autoplay?: boolean
          video_loop?: boolean
          video_muted?: boolean
          video_poster_url?: string | null
          video_section_description?: string | null
          video_section_title?: string | null
          video_url?: string | null
        }
        Update: {
          badge?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount_text?: string | null
          features?: string[]
          format_id?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          no_index?: boolean
          occasion_id?: string | null
          og_image_url?: string | null
          original_price?: number | null
          price?: number | null
          price_label?: string | null
          product_type?: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          show_starting_from?: boolean
          slug?: string
          sort_order?: number
          status?: string
          tags?: string[]
          updated_at?: string
          video_autoplay?: boolean
          video_loop?: boolean
          video_muted?: boolean
          video_poster_url?: string | null
          video_section_description?: string | null
          video_section_title?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_format_id_fkey"
            columns: ["format_id"]
            isOneToOne: false
            referencedRelation: "formats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_occasion_id_fkey"
            columns: ["occasion_id"]
            isOneToOne: false
            referencedRelation: "occasions"
            referencedColumns: ["id"]
          },
        ]
      }
      showcase_sections: {
        Row: {
          alignment: string
          background: string
          block_type: string
          button_text: string | null
          button_url: string | null
          created_at: string
          description: string | null
          id: string
          is_visible: boolean
          media_urls: string[]
          poster_url: string | null
          product_id: string
          sort_order: number
          title: string | null
          video_url: string | null
        }
        Insert: {
          alignment?: string
          background?: string
          block_type?: string
          button_text?: string | null
          button_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_visible?: boolean
          media_urls?: string[]
          poster_url?: string | null
          product_id: string
          sort_order?: number
          title?: string | null
          video_url?: string | null
        }
        Update: {
          alignment?: string
          background?: string
          block_type?: string
          button_text?: string | null
          button_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_visible?: boolean
          media_urls?: string[]
          poster_url?: string | null
          product_id?: string
          sort_order?: number
          title?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "showcase_sections_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          brand_name: string
          contact_email: string | null
          copyright_text: string | null
          currency: string
          default_cta: string | null
          delivery_message: string | null
          facebook_url: string | null
          favicon_url: string | null
          footer_description: string | null
          footer_links: Json
          id: number
          instagram_url: string | null
          logo_url: string | null
          nav_links: Json
          og_image_url: string | null
          seo_description: string | null
          seo_title: string | null
          tagline: string | null
          updated_at: string
          whatsapp_number: string | null
          whatsapp_template: string | null
          youtube_url: string | null
        }
        Insert: {
          brand_name?: string
          contact_email?: string | null
          copyright_text?: string | null
          currency?: string
          default_cta?: string | null
          delivery_message?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          footer_description?: string | null
          footer_links?: Json
          id?: number
          instagram_url?: string | null
          logo_url?: string | null
          nav_links?: Json
          og_image_url?: string | null
          seo_description?: string | null
          seo_title?: string | null
          tagline?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          whatsapp_template?: string | null
          youtube_url?: string | null
        }
        Update: {
          brand_name?: string
          contact_email?: string | null
          copyright_text?: string | null
          currency?: string
          default_cta?: string | null
          delivery_message?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          footer_description?: string | null
          footer_links?: Json
          id?: number
          instagram_url?: string | null
          logo_url?: string | null
          nav_links?: Json
          og_image_url?: string | null
          seo_description?: string | null
          seo_title?: string | null
          tagline?: string | null
          updated_at?: string
          whatsapp_number?: string | null
          whatsapp_template?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin"],
    },
  },
} as const

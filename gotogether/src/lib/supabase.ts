import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      boards: {
        Row: {
          id: string
          title: string
          description: string | null
          created_by: string
          created_at: string
          updated_at: string
          is_public: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
          is_public?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
          is_public?: boolean
        }
      }
      board_cards: {
        Row: {
          id: string
          board_id: string
          type: 'destination' | 'accommodation' | 'activity' | 'restaurant' | 'transport' | 'note'
          title: string
          description: string
          location: string | null
          price: string | null
          rating: number | null
          image: string | null
          x: number
          y: number
          width: number
          height: number
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          board_id: string
          type: 'destination' | 'accommodation' | 'activity' | 'restaurant' | 'transport' | 'note'
          title: string
          description: string
          location?: string | null
          price?: string | null
          rating?: number | null
          image?: string | null
          x: number
          y: number
          width: number
          height: number
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          board_id?: string
          type?: 'destination' | 'accommodation' | 'activity' | 'restaurant' | 'transport' | 'note'
          title?: string
          description?: string
          location?: string | null
          price?: string | null
          rating?: number | null
          image?: string | null
          x?: number
          y?: number
          width?: number
          height?: number
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      board_messages: {
        Row: {
          id: string
          board_id: string
          text: string
          sender_id: string
          created_at: string
        }
        Insert: {
          id?: string
          board_id: string
          text: string
          sender_id: string
          created_at?: string
        }
        Update: {
          id?: string
          board_id?: string
          text?: string
          sender_id?: string
          created_at?: string
        }
      }
      board_collaborators: {
        Row: {
          board_id: string
          user_id: string
          role: 'owner' | 'editor' | 'viewer'
          created_at: string
        }
        Insert: {
          board_id: string
          user_id: string
          role?: 'owner' | 'editor' | 'viewer'
          created_at?: string
        }
        Update: {
          board_id?: string
          user_id?: string
          role?: 'owner' | 'editor' | 'viewer'
          created_at?: string
        }
      }
    }
  }
} 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      battles: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string | null
          type: 'battle' | 'feedback'
          entry_fee: number
          deadline: string
          voting_method: string | null
          status: 'draft' | 'active' | 'completed'
          host_id: string
          current_phase: 'submission' | 'voting' | 'results'
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description?: string | null
          type: 'battle' | 'feedback'
          entry_fee?: number
          deadline: string
          voting_method?: string | null
          status?: 'draft' | 'active' | 'completed'
          host_id: string
          current_phase?: 'submission' | 'voting' | 'results'
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string | null
          type?: 'battle' | 'feedback'
          entry_fee?: number
          deadline?: string
          voting_method?: string | null
          status?: 'draft' | 'active' | 'completed'
          host_id?: string
          current_phase?: 'submission' | 'voting' | 'results'
        }
      }
      submissions: {
        Row: {
          id: string
          created_at: string
          battle_id: string
          user_id: string
          title: string
          audio_url: string
          artwork_url: string | null
          votes: number
          average_score: number
          status: 'pending' | 'approved' | 'rejected'
          is_prioritized: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          battle_id: string
          user_id: string
          title: string
          audio_url: string
          artwork_url?: string | null
          votes?: number
          average_score?: number
          status?: 'pending' | 'approved' | 'rejected'
          is_prioritized?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          battle_id?: string
          user_id?: string
          title?: string
          audio_url?: string
          artwork_url?: string | null
          votes?: number
          average_score?: number
          status?: 'pending' | 'approved' | 'rejected'
          is_prioritized?: boolean
        }
      }
      votes: {
        Row: {
          id: string
          created_at: string
          battle_id: string
          submission_id: string
          user_id: string
          score: number
          type: 'upvote' | 'downvote' | 'rating'
        }
        Insert: {
          id?: string
          created_at?: string
          battle_id: string
          submission_id: string
          user_id: string
          score: number
          type: 'upvote' | 'downvote' | 'rating'
        }
        Update: {
          id?: string
          created_at?: string
          battle_id?: string
          submission_id?: string
          user_id?: string
          score?: number
          type?: 'upvote' | 'downvote' | 'rating'
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          username: string
          avatar_url: string | null
          bio: string | null
          discord_id: string | null
          twitch_id: string | null
        }
        Insert: {
          id: string
          created_at?: string
          username: string
          avatar_url?: string | null
          bio?: string | null
          discord_id?: string | null
          twitch_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          username?: string
          avatar_url?: string | null
          bio?: string | null
          discord_id?: string | null
          twitch_id?: string | null
        }
      }
    }
  }
}
import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { Database } from '../supabase/types'

type Vote = Database['public']['Tables']['votes']['Row']

export function useVotes(battleId: string, submissionId?: string) {
  const [votes, setVotes] = useState<Vote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        let query = supabase
          .from('votes')
          .select('*')
          .eq('battle_id', battleId)

        if (submissionId) {
          query = query.eq('submission_id', submissionId)
        }

        const { data, error } = await query

        if (error) throw error

        setVotes(data)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchVotes()

    // Subscribe to realtime changes
    const subscription = supabase
      .channel(`votes:${battleId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'votes',
          filter: `battle_id=eq.${battleId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setVotes((current) => [...current, payload.new as Vote])
          } else if (payload.eventType === 'UPDATE') {
            setVotes((current) =>
              current.map((vote) =>
                vote.id === payload.new.id ? (payload.new as Vote) : vote
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setVotes((current) =>
              current.filter((vote) => vote.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [battleId, submissionId])

  const addVote = async (vote: Omit<Vote, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('votes')
        .insert(vote)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (e) {
      throw e
    }
  }

  const updateVote = async (voteId: string, updates: Partial<Vote>) => {
    try {
      const { data, error } = await supabase
        .from('votes')
        .update(updates)
        .eq('id', voteId)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (e) {
      throw e
    }
  }

  const deleteVote = async (voteId: string) => {
    try {
      const { error } = await supabase
        .from('votes')
        .delete()
        .eq('id', voteId)

      if (error) throw error
    } catch (e) {
      throw e
    }
  }

  return {
    votes,
    loading,
    error,
    addVote,
    updateVote,
    deleteVote,
  }
}
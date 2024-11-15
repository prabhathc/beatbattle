import { useState, useEffect } from 'react'
import { supabase } from '../supabase/client'
import { Database } from '../supabase/types'

type Battle = Database['public']['Tables']['battles']['Row']

export function useBattle(battleId: string) {
  const [battle, setBattle] = useState<Battle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchBattle = async () => {
      try {
        const { data, error } = await supabase
          .from('battles')
          .select('*')
          .eq('id', battleId)
          .single()

        if (error) throw error

        setBattle(data)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchBattle()

    // Subscribe to realtime changes
    const subscription = supabase
      .channel(`battle:${battleId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'battles',
          filter: `id=eq.${battleId}`,
        },
        (payload) => {
          setBattle(payload.new as Battle)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [battleId])

  const updateBattle = async (updates: Partial<Battle>) => {
    try {
      const { data, error } = await supabase
        .from('battles')
        .update(updates)
        .eq('id', battleId)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (e) {
      throw e
    }
  }

  const updatePhase = async (phase: Battle['current_phase']) => {
    return updateBattle({ current_phase: phase })
  }

  return {
    battle,
    loading,
    error,
    updateBattle,
    updatePhase,
  }
}
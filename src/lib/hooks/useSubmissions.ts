import { useState, useEffect } from 'react'
import { createClient } from '../supabase/client'
import { Database } from '../supabase/types'

type Submission = Database['public']['Tables']['submissions']['Row']

export function useSubmissions(battleId: string) {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .eq('battle_id', battleId)
          .order('created_at', { ascending: true })

        if (error) throw error

        setSubmissions(data)
      } catch (e) {
        setError(e as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()

    // Subscribe to realtime changes
    const subscription = supabase
      .channel(`submissions:${battleId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'submissions',
          filter: `battle_id=eq.${battleId}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setSubmissions((current) => [...current, payload.new as Submission])
          } else if (payload.eventType === 'UPDATE') {
            setSubmissions((current) =>
              current.map((sub) =>
                sub.id === payload.new.id ? (payload.new as Submission) : sub
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setSubmissions((current) =>
              current.filter((sub) => sub.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [battleId])

  const addSubmission = async (submission: Omit<Submission, 'id' | 'created_at' | 'votes' | 'average_score'>) => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .insert(submission)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (e) {
      throw e
    }
  }

  const updateSubmission = async (submissionId: string, updates: Partial<Submission>) => {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .update(updates)
        .eq('id', submissionId)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (e) {
      throw e
    }
  }

  const deleteSubmission = async (submissionId: string) => {
    try {
      const { error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', submissionId)

      if (error) throw error
    } catch (e) {
      throw e
    }
  }

  return {
    submissions,
    loading,
    error,
    addSubmission,
    updateSubmission,
    deleteSubmission,
  }
}
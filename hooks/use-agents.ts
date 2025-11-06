import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Agent } from '@/components/agent-card'

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchAgents()
  }, [])

  async function fetchAgents() {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('agent_cards')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        console.error('Supabase error fetching agents:', {
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
          code: fetchError.code,
        })
        throw new Error(`Failed to fetch agents: ${fetchError.message}`)
      }

      // Transform Supabase data to match Agent type
      const transformedAgents: Agent[] = (data || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        tools: item.tools,
        published: item.published,
        error: item.error,
      }))

      setAgents(transformedAgents)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      const errorDetails = err instanceof Error ? err : JSON.stringify(err)
      console.error('Error fetching agents:', errorMessage, errorDetails)
      setError(err instanceof Error ? err : new Error(errorMessage))
    } finally {
      setLoading(false)
    }
  }

  async function addAgent(agent: Omit<Agent, 'id'>) {
    try {
      const { data, error: insertError } = await supabase
        .from('agent_cards')
        .insert([
          {
            name: agent.name,
            description: agent.description,
            image: agent.image,
            tools: agent.tools,
            published: agent.published || false,
            error: agent.error || false,
          },
        ])
        .select()
        .single()

      if (insertError) {
        console.error('Supabase error adding agent:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
        })
        throw new Error(`Failed to add agent: ${insertError.message}`)
      }

      // Refresh the agents list
      await fetchAgents()

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error adding agent:', errorMessage, err)
      throw err
    }
  }

  async function updateAgent(id: string, updates: Partial<Omit<Agent, 'id'>>) {
    try {
      const { data, error: updateError } = await supabase
        .from('agent_cards')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) {
        console.error('Supabase error updating agent:', {
          message: updateError.message,
          details: updateError.details,
          hint: updateError.hint,
          code: updateError.code,
        })
        throw new Error(`Failed to update agent: ${updateError.message}`)
      }

      // Refresh the agents list
      await fetchAgents()

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error updating agent:', errorMessage, err)
      throw err
    }
  }

  async function deleteAgent(id: string) {
    try {
      const { error: deleteError } = await supabase
        .from('agent_cards')
        .delete()
        .eq('id', id)

      if (deleteError) {
        console.error('Supabase error deleting agent:', {
          message: deleteError.message,
          details: deleteError.details,
          hint: deleteError.hint,
          code: deleteError.code,
        })
        throw new Error(`Failed to delete agent: ${deleteError.message}`)
      }

      // Refresh the agents list
      await fetchAgents()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('Error deleting agent:', errorMessage, err)
      throw err
    }
  }

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
    addAgent,
    updateAgent,
    deleteAgent,
  }
}
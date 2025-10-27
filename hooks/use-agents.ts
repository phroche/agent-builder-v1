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

      if (fetchError) throw fetchError

      // Transform Supabase data to match Agent type
      const transformedAgents: Agent[] = (data || []).map((item) => ({
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
      console.error('Error fetching agents:', err)
      setError(err as Error)
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

      if (insertError) throw insertError

      // Refresh the agents list
      await fetchAgents()

      return data
    } catch (err) {
      console.error('Error adding agent:', err)
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

      if (updateError) throw updateError

      // Refresh the agents list
      await fetchAgents()

      return data
    } catch (err) {
      console.error('Error updating agent:', err)
      throw err
    }
  }

  async function deleteAgent(id: string) {
    try {
      const { error: deleteError } = await supabase
        .from('agent_cards')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      // Refresh the agents list
      await fetchAgents()
    } catch (err) {
      console.error('Error deleting agent:', err)
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
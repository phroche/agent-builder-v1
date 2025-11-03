import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Tool } from '@/components/tool-card'

export function useTools() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('tool_cards')
          .select('*')

        if (fetchError) throw fetchError

        const transformedTools: Tool[] = (data || []).map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          category: item.category,
          status: item.status,
          published: item.published,
          error: item.error,
        }))

        setTools(transformedTools)
      } catch (err) {
        console.error('Error fetching tools:', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  const refetchTools = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('tool_cards')
        .select('*')

      if (fetchError) throw fetchError

      const transformedTools: Tool[] = (data || []).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        category: item.category,
        status: item.status,
        published: item.published,
        error: item.error,
      }))

      setTools(transformedTools)
    } catch (err) {
      console.error('Error fetching tools:', err)
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  async function addTool(tool: Omit<Tool, 'id'>) {
    try {
      const { data, error: insertError } = await supabase
        .from('tool_cards')
        .insert([
          {
            name: tool.name,
            description: tool.description,
            image: tool.image,
            category: tool.category,
            status: tool.status || 'inactive',
            published: tool.published || false,
            error: tool.error || false,
          },
        ])
        .select()
        .single()

      if (insertError) throw insertError

      await refetchTools()

      return data
    } catch (err) {
      console.error('Error adding tool:', err)
      throw err
    }
  }

  async function updateTool(id: string, updates: Partial<Omit<Tool, 'id'>>) {
    try {
      const { data, error: updateError } = await supabase
        .from('tool_cards')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      await refetchTools()

      return data
    } catch (err) {
      console.error('Error updating tool:', err)
      throw err
    }
  }

  async function deleteTool(id: string) {
    try {
      const { error: deleteError } = await supabase
        .from('tool_cards')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError

      await refetchTools()
    } catch (err) {
      console.error('Error deleting tool:', err)
      throw err
    }
  }

  return {
    tools,
    loading,
    error,
    refetch: refetchTools,
    addTool,
    updateTool,
    deleteTool,
  }
}

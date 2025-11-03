import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Tool } from '@/components/tool-card'

export function useToolsNew() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadTools() {
      try {
        console.log('NEW HOOK: Loading tools...')
        const { data, error: fetchError } = await supabase
          .from('tool_cards')
          .select('*')

        console.log('NEW HOOK: Data received:', data)

        if (!mounted) return

        if (fetchError) {
          setError(fetchError)
          setLoading(false)
          return
        }

        const transformed: Tool[] = (data || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          image: item.image,
          category: item.category,
          status: item.status,
          published: item.published,
          error: item.error,
        }))

        console.log('NEW HOOK: Setting tools:', transformed)
        setTools(transformed)
        setLoading(false)
      } catch (err) {
        console.error('NEW HOOK: Error:', err)
        if (mounted) {
          setError(err as Error)
          setLoading(false)
        }
      }
    }

    loadTools()

    return () => {
      mounted = false
    }
  }, [])

  return { tools, loading, error }
}

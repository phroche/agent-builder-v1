"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function TestConnection() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    console.log('TEST: useEffect running')

    async function test() {
      console.log('TEST: Calling Supabase...')
      const result = await supabase.from('tool_cards').select('*')
      console.log('TEST: Result:', result)
      setData(result.data)
      setError(result.error)
    }

    test()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Supabase Connection Test</h1>
      <div>
        <h2>Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div>
        <h2>Error:</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    </div>
  )
}

"use client"

import { AgentSidebar } from "@/components/agent-sidebar"
import { useParams } from "next/navigation"

export default function AgentEditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const agentId = params.id as string

  return (
    <div className="flex h-screen">
      <AgentSidebar agentId={agentId} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { PromptCreator } from "@/components/prompt-creator"
import { type Agent, AgentCard } from "@/components/agent-card"
import { ShareAgentModal } from "@/components/share-agent-modal"
import { useAgents } from "@/hooks/use-agents"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function MyAgentsPage() {
  const router = useRouter()
  const { agents, loading, error, addAgent } = useAgents()
  const [selected, setSelected] = useState<Agent | null>(null)
  const [open, setOpen] = useState(false)

  const [tab, setTab] = useState<"private" | "published">("private")
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<"all" | "error">("all")

  const filtered = useMemo(() => {
    return agents.filter((a) => {
      const publishedFilter = tab === "published" ? a.published : true
      const statusFilter = status === "error" ? a.error : true
      const q = query.trim().toLowerCase()
      const queryFilter =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tools.some((t) => t.toLowerCase().includes(q))
      return publishedFilter && statusFilter && queryFilter
    })
  }, [agents, tab, query, status])

  const onCreateAgent = async (prompt: string) => {
    try {
      await addAgent({
        name: prompt.slice(0, 32) || "New Agent",
        description: prompt,
        image: "/new-agent.jpg",
        tools: ["Web", "Docs"],
        published: false,
        error: false,
      })
    } catch (err) {
      console.error("Failed to create agent:", err)
    }
  }

  const handleEdit = (agent: Agent) => {
    router.push(`/agents/${agent.id}/build`)
  }

  const handlePreview = (agent: Agent) => {
    setSelected(agent)
    setOpen(true)
  }

  return (
    <AppShell active="My Agents">
      <div className="min-h-screen">
        {/* Header Section - Top 85% of viewport */}
        <div className="flex min-h-[85vh] flex-col items-center justify-center px-4">
          <PromptCreator onCreate={onCreateAgent} />
        </div>

        {/* Agents Section - Reveals on scroll */}
        <div className="w-full pb-6 flex justify-center">
          <Card className="w-full">
            <CardContent className="pt-6 px-[50px] pb-[50px]">
              {/* Header: Tabs + Search + Filter */}
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <Tabs
                  value={tab}
                  onValueChange={(v) => setTab(v as "private" | "published")}
                  className="w-full md:w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="private">My Agents</TabsTrigger>
                    <TabsTrigger value="published">
                      <div className="flex items-center gap-2">
                        Published Agents
                        <Badge variant="secondary">{agents.filter((a) => a.published).length}</Badge>
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                  <div className="relative md:w-80">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="Search agents..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label="Search agents"
                    />
                  </div>

                  <Select value={status} onValueChange={(v) => setStatus(v as "all" | "error")}>
                    <SelectTrigger className="md:w-44" aria-label="Filter by status">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="error">Errors only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grid of Agents */}
              {loading ? (
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Loading agents...
                </div>
              ) : error ? (
                <div className="mt-6 text-center text-sm text-red-600">
                  Error loading agents: {error.message}
                </div>
              ) : (
                <div className="mt-6 grid gap-4 auto-rows-fr" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                  {filtered.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      onEdit={handleEdit}
                      onPreview={handlePreview}
                    />
                  ))}
                  {filtered.length === 0 && (
                    <div className="col-span-full rounded-md border p-6 text-center text-sm text-muted-foreground">
                      No agents found. Try a different search or filter.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ShareAgentModal open={open} onOpenChange={setOpen} agent={selected} />
    </AppShell>
  )
}

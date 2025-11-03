"use client"

import { useMemo, useState } from "react"
import { AppShell } from "@/components/app-shell"
import { type Tool, ToolCard } from "@/components/tool-card"
import { useTools } from "@/hooks/use-tools"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function ToolsPage() {
  const { tools, loading, error } = useTools()
  const [selected, setSelected] = useState<Tool | null>(null)

  const [tab, setTab] = useState<"all" | "published">("all")
  const [query, setQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "error">("all")

  // Get unique categories from tools
  const categories = useMemo(() => {
    const uniqueCategories = new Set(tools.map((t) => t.category))
    return Array.from(uniqueCategories).sort()
  }, [tools])

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const publishedFilter = tab === "published" ? t.published : true
      const categoryFilterCheck = categoryFilter === "all" || t.category === categoryFilter
      const statusFilterCheck =
        statusFilter === "all" ||
        (statusFilter === "error" && t.error) ||
        (statusFilter === "active" && t.status === "active")
      const q = query.trim().toLowerCase()
      const queryFilter =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      return publishedFilter && categoryFilterCheck && statusFilterCheck && queryFilter
    })
  }, [tools, tab, query, categoryFilter, statusFilter])

  const handleToolClick = (tool: Tool) => {
    setSelected(tool)
    // You can add modal or navigation logic here
  }

  return (
    <AppShell active="Tools">
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="flex min-h-[30vh] flex-col items-center justify-center px-4 border-b">
          <div className="text-center space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900">Tools</h1>
            <p className="text-lg text-gray-600">
              Discover and manage powerful tools to enhance your agents
            </p>
          </div>
        </div>

        {/* Tools Section */}
        <div className="w-full py-6 flex justify-center">
          <Card className="w-full">
            <CardContent className="pt-6 px-[50px] pb-[50px]">
              {/* Header: Tabs + Search + Filters */}
              <div className="flex flex-col gap-3">
                {/* Tabs Row */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <Tabs
                    value={tab}
                    onValueChange={(v) => setTab(v as "all" | "published")}
                    className="w-full md:w-auto"
                  >
                    <TabsList>
                      <TabsTrigger value="all">All Tools</TabsTrigger>
                      <TabsTrigger value="published">
                        <div className="flex items-center gap-2">
                          Published Tools
                          <Badge variant="secondary">{tools.filter((t) => t.published).length}</Badge>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Search Bar */}
                  <div className="relative md:w-80">
                    <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="Search tools..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      aria-label="Search tools"
                    />
                  </div>
                </div>

                {/* Filters Row */}
                <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-end">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="md:w-52" aria-label="Filter by category">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((category, index) => (
                        <SelectItem key={`category-${index}-${category}`} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as "all" | "active" | "error")}>
                    <SelectTrigger className="md:w-44" aria-label="Filter by status">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="active">Active only</SelectItem>
                      <SelectItem value="error">Errors only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grid of Tools */}
              {loading ? (
                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Loading tools...
                </div>
              ) : error ? (
                <div className="mt-6 text-center text-sm text-red-600">
                  Error loading tools: {error.message}
                </div>
              ) : (
                <div className="mt-6 grid gap-4 auto-rows-fr" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                  {filtered.map((tool, index) => (
                    <ToolCard key={`tool-${tool.id}-${index}`} tool={tool} onClick={handleToolClick} />
                  ))}
                  {filtered.length === 0 && (
                    <div className="col-span-full rounded-md border p-6 text-center text-sm text-muted-foreground">
                      No tools found. Try a different search or filter.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
}

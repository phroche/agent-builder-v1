"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"

export type Agent = {
  id: string
  name: string
  description: string
  image: string
  tools: string[]
  published?: boolean
  error?: boolean
}

export function AgentCard({
  agent,
  onClick,
  className,
}: {
  agent: Agent
  onClick?: (agent: Agent) => void
  className?: string
}) {
  const toolTags = agent.tools.slice(0, 3)

  return (
    <button
      onClick={() => onClick?.(agent)}
      className={cn(
        "text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg",
        className,
      )}
      aria-label={`Open share for ${agent.name}`}
    >
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base text-pretty">{agent.name}</CardTitle>
            <div className="flex gap-1">
              {agent.published && <Badge variant="outline">Published</Badge>}
              {agent.error && <Badge variant="destructive">Error</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="relative w-full overflow-hidden rounded-md bg-muted" style={{ aspectRatio: "16/9" }}>
            <Image
              src={agent.image || "/placeholder.svg?height=360&width=640&query=agent-image"}
              alt={`${agent.name} image`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{agent.description}</p>
          <div className="flex flex-wrap gap-2">
            {toolTags.map((tool) => (
              <Badge key={tool} variant="outline" className="rounded-full">
                {tool}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </button>
  )
}

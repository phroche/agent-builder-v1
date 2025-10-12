"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const ideas = [
  "Build a support agent for my SaaS",
  "Create a research analyst agent",
  "A meeting summarizer that outputs action items",
  "Marketing copywriter for landing pages",
  "Sales assistant that drafts follow-ups",
]

export function PromptCreator({
  onCreate,
  className,
}: {
  onCreate?: (prompt: string) => void
  className?: string
}) {
  const [value, setValue] = useState("")

  const applyIdea = (idea: string) => setValue(idea)

  const submit = () => {
    if (!value.trim()) return
    onCreate?.(value.trim())
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle className="text-balance text-lg">What agent do you want to build?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Describe the agent you have in mind..."
            className="flex-1"
            aria-label="Agent idea"
          />
          <Button onClick={submit} className="self-start md:self-auto">
            Create Agent
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {ideas.map((idea) => (
            <Button
              key={idea}
              variant="outline"
              size="sm"
              onClick={() => applyIdea(idea)}
              className="rounded-full"
              aria-label={`Use idea: ${idea}`}
            >
              {idea}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

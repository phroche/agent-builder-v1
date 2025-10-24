"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Paperclip } from "lucide-react"

const ideas = [
  "Build support agent",
  "Research analyst agent", 
  "Meeting summarizer agent",
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
    <div className={cn("w-full max-w-2xl", className)}>
      {/* Header Text */}
      <h1 className="mb-8 text-4xl font-bold text-center">What agent do you want to build?</h1>
      
      {/* Floating Input Field */}
      <div className="relative w-full">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Describe the agent you have in mind..."
          className="min-h-32 resize-none pr-20 pb-12"
          aria-label="Agent idea"
        />
        
        {/* Attachment Button - Bottom Left */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute bottom-2 left-2 h-8 w-8 p-0"
          aria-label="Attach file"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        
        {/* Create Agent Button - Bottom Right */}
        <Button
          onClick={submit}
          className="absolute bottom-2 right-2 h-8"
          size="sm"
        >
          Create Agent
        </Button>
      </div>
      
      {/* Chips - Limited to 3 with max 3 words each */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
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
    </div>
  )
}

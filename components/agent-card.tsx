"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Mail, Github, Slack, Building2, AlertCircle, Plus, Pencil, Eye } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export type Agent = {
  id: string
  name: string
  description: string
  image: string
  tools: string[]
  published?: boolean
  error?: boolean
}

// Helper function to get tool icons and colors
const getToolConfig = (tool: string) => {
  const toolLower = tool.toLowerCase()
  if (toolLower.includes('gmail') || toolLower.includes('email') || toolLower.includes('mail')) {
    return {
      icon: Mail,
      label: 'Gmail',
      className: 'bg-white border-gray-200 text-gray-700'
    }
  }
  if (toolLower.includes('github') || toolLower.includes('git')) {
    return {
      icon: Github,
      label: 'Git',
      className: 'bg-white border-gray-200 text-gray-700'
    }
  }
  if (toolLower.includes('slack')) {
    return {
      icon: Slack,
      label: 'Slack',
      className: 'bg-white border-gray-200 text-gray-700'
    }
  }
  return {
    icon: Mail,
    label: tool,
    className: 'bg-white border-gray-200 text-gray-700'
  }
}

export function AgentCard({
  agent,
  onClick,
  onEdit,
  onPreview,
  className,
}: {
  agent: Agent
  onClick?: (agent: Agent) => void
  onEdit?: (agent: Agent) => void
  onPreview?: (agent: Agent) => void
  className?: string
}) {
  const [maxVisibleTags, setMaxVisibleTags] = useState(3)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateVisibleTags = () => {
      if (cardRef.current) {
        const cardWidth = cardRef.current.offsetWidth
        // Dynamically determine how many tags can fit based on card width
        // At 300px (min width): show 1 tag
        // At 340px-400px: show 2 tags
        // At 400px and above: show 3 tags
        if (cardWidth < 340) {
          setMaxVisibleTags(1)
        } else if (cardWidth < 400) {
          setMaxVisibleTags(2)
        } else {
          setMaxVisibleTags(3)
        }
      }
    }

    updateVisibleTags()

    const resizeObserver = new ResizeObserver(updateVisibleTags)
    if (cardRef.current) {
      resizeObserver.observe(cardRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const visibleTools = agent.tools.slice(0, maxVisibleTags)
  const remainingCount = agent.tools.length - maxVisibleTags
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg w-full relative group",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Agent card for ${agent.name}`}
    >
      <Card ref={cardRef} className="h-full bg-white border-gray-100 shadow-sm w-full">
        <CardContent className="px-4 py-0">
          <div className="space-y-2">
            {/* Top section - Icon and badges */}
            <div className="flex items-start justify-between">
              {/* Left side - Agent icon */}
              <div className="flex-shrink-0">
                <Avatar className="h-14 w-14 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200">
                  <AvatarImage src={agent.image} alt={agent.name} />
                  <AvatarFallback className="text-sm font-medium bg-gradient-to-br from-blue-100 to-blue-200 text-gray-600">
                    {agent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Right side - Tool badges and status badges */}
              <div className="flex flex-col items-end justify-between h-14">
                {/* Tool badges row */}
                <div className="flex gap-1 justify-end max-w-[200px]">
                  {visibleTools.map((tool) => {
                    const config = getToolConfig(tool)
                    const IconComponent = config.icon
                    return (
                      <Badge key={tool} variant="outline" className={`text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center whitespace-nowrap ${config.className}`}>
                        <IconComponent className="h-3 w-3 mr-0.5" />
                        {config.label}
                      </Badge>
                    )
                  })}
                  {remainingCount > 0 && (
                    <Badge variant="outline" className="bg-white border-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center whitespace-nowrap flex-shrink-0">
                      +{remainingCount}
                    </Badge>
                  )}
                </div>

                {/* Status badges row - right aligned under tool badges */}
                <div className="flex items-center gap-2 justify-end">
                  {agent.published && (
                    <Badge variant="outline" className="bg-white border-gray-200 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center">
                      <Building2 className="h-3 w-3 mr-0.5" />
                      Published
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Agent title and error tag */}
            <div className="flex items-start justify-between gap-1 mt-1">
              <h3 className="text-lg font-medium text-gray-900 leading-tight">
                {agent.name}
              </h3>
              {agent.error && (
                <Badge variant="destructive" className="bg-red-50 border-red-200 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-3 w-3 mr-0.5" />
                  Error
                </Badge>
              )}
            </div>
            
            {/* Description */}
            <p className="text-sm font-normal text-gray-600 leading-relaxed">
              {agent.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Hover Overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0) 70%)'
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-3 pointer-events-auto">
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit?.(agent)
              }}
              className="gap-2 bg-black hover:bg-gray-800 text-white flex-1"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onPreview?.(agent)
              }}
              className="gap-2 bg-white hover:bg-gray-50 flex-1"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

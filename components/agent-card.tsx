"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Mail, Github, Slack, Building2, AlertCircle, Plus } from "lucide-react"

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
        "text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg w-full",
        className,
      )}
      aria-label={`Open share for ${agent.name}`}
    >
      <Card className="h-full bg-white border-gray-100 shadow-sm">
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
                <div className="flex flex-wrap gap-1 justify-end">
                  {toolTags.map((tool) => {
                    const config = getToolConfig(tool)
                    const IconComponent = config.icon
                    return (
                      <Badge key={tool} variant="outline" className={`text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center ${config.className}`}>
                        <IconComponent className="h-3 w-3 mr-0.5" />
                        {config.label}
                      </Badge>
                    )
                  })}
                  {agent.tools.length > 3 && (
                    <Badge variant="outline" className="bg-white border-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center">
                      +{agent.tools.length - 3}
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
            <div className="flex items-center justify-between mt-1">
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
    </button>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle, Building2 } from "lucide-react"

export type Tool = {
  id: string
  name: string
  description: string
  image: string
  category: string
  status?: "active" | "inactive"
  published?: boolean
  error?: boolean
}

// Helper function to get category colors
const getCategoryConfig = (category: string) => {
  if (!category) {
    return {
      className: 'bg-gray-50 border-gray-200 text-gray-700',
      label: 'Uncategorized'
    }
  }

  const categoryLower = category.toLowerCase()

  const configs: Record<string, { className: string; label: string }> = {
    communication: {
      className: 'bg-blue-50 border-blue-200 text-blue-700',
      label: 'Communication'
    },
    development: {
      className: 'bg-purple-50 border-purple-200 text-purple-700',
      label: 'Development'
    },
    productivity: {
      className: 'bg-green-50 border-green-200 text-green-700',
      label: 'Productivity'
    },
    analytics: {
      className: 'bg-orange-50 border-orange-200 text-orange-700',
      label: 'Analytics'
    },
    storage: {
      className: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      label: 'Storage'
    },
    security: {
      className: 'bg-red-50 border-red-200 text-red-700',
      label: 'Security'
    }
  }

  return configs[categoryLower] || {
    className: 'bg-gray-50 border-gray-200 text-gray-700',
    label: category
  }
}

export function ToolCard({
  tool,
  onClick,
  className,
}: {
  tool: Tool
  onClick?: (tool: Tool) => void
  className?: string
}) {
  const categoryConfig = getCategoryConfig(tool.category)

  // Generate fallback initials safely
  const getInitials = (name: string) => {
    if (!name) return 'T'
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  }

  return (
    <button
      onClick={() => onClick?.(tool)}
      className={cn(
        "text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg w-full",
        className,
      )}
      aria-label={`View details for ${tool.name}`}
    >
      <Card className="h-full bg-white border-gray-100 shadow-sm w-full max-w-[450px]">
        <CardContent className="px-4 py-0">
          <div className="space-y-2">
            {/* Top section - Icon and badges */}
            <div className="flex items-start justify-between">
              {/* Left side - Tool icon */}
              <div className="flex-shrink-0">
                <Avatar className="h-14 w-14 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200">
                  <AvatarImage src={tool.image} alt={tool.name || 'Tool'} />
                  <AvatarFallback className="text-sm font-medium bg-gradient-to-br from-purple-100 to-purple-200 text-gray-600">
                    {getInitials(tool.name)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Right side - Category and status badges */}
              <div className="flex flex-col items-end justify-between h-14">
                {/* Category badge */}
                <div className="flex gap-1 justify-end">
                  <Badge
                    variant="outline"
                    className={`text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center whitespace-nowrap ${categoryConfig.className}`}
                  >
                    {categoryConfig.label}
                  </Badge>
                </div>

                {/* Status badges row */}
                <div className="flex items-center gap-2 justify-end">
                  {tool.status === 'active' && (
                    <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 mr-0.5" />
                      Active
                    </Badge>
                  )}
                  {tool.published && (
                    <Badge variant="outline" className="bg-white border-gray-200 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center">
                      <Building2 className="h-3 w-3 mr-0.5" />
                      Published
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Tool title and error tag */}
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                {tool.name || 'Untitled Tool'}
              </h3>
              {tool.error && (
                <Badge variant="destructive" className="bg-red-50 border-red-200 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-3 w-3 mr-0.5" />
                  Error
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-sm font-normal text-gray-600 leading-relaxed">
              {tool.description || 'No description available'}
            </p>
          </div>
        </CardContent>
      </Card>
    </button>
  )
}

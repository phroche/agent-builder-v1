"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { useState } from "react"

export type Channel = {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  configured: boolean
  connectionDetails?: string
}

export function ChannelCard({
  channel,
  onClick,
  onOpenExternal,
  className,
}: {
  channel: Channel
  onClick?: (channel: Channel) => void
  onOpenExternal?: (channel: Channel) => void
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = channel.icon

  return (
    <div
      className={cn(
        "text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg w-full relative group cursor-pointer",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(channel)}
      aria-label={`Channel card for ${channel.name}`}
    >
      <Card className="h-full bg-white border-gray-100 shadow-sm w-full py-4">
        <CardContent className="px-4 py-0">
          <div className="space-y-2">
            {/* Top section - Icon only */}
            <div className="flex items-start justify-between">
              {/* Left side - Channel icon */}
              <div className="flex-shrink-0">
                <Icon className="h-5 w-5 text-gray-700" />
              </div>
            </div>

            {/* Channel title with Active badge inline */}
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-lg font-medium text-gray-900 leading-tight">
                {channel.name}
              </h3>
              {channel.configured && (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  Active
                </Badge>
              )}
            </div>

            {/* Connection details or Configure button */}
            {channel.configured ? (
              <p className="text-sm font-normal text-gray-600 leading-relaxed">
                {channel.connectionDetails || "Connected"}
              </p>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onClick?.(channel)
                }}
              >
                Configure
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hover External Link Icon - for non-configured channels */}
      {isHovered && onOpenExternal && !channel.configured && (
        <ExternalLink
          className="absolute top-2 right-2 h-4 w-4 text-gray-700 cursor-pointer pointer-events-auto z-10"
          onClick={(e) => {
            e.stopPropagation()
            onOpenExternal(channel)
          }}
        />
      )}

      {/* Hover Overlay for Active Channels */}
      {isHovered && channel.configured && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 30%, rgba(255, 255, 255, 0) 70%)'
          }}
        >
          {/* External Link Icon - part of overlay for configured channels */}
          {onOpenExternal && (
            <ExternalLink
              className="absolute top-2 right-2 h-4 w-4 text-gray-700 cursor-pointer pointer-events-auto"
              onClick={(e) => {
                e.stopPropagation()
                onOpenExternal(channel)
              }}
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onClick?.(channel)
              }}
              className="w-full bg-black hover:bg-gray-800 text-white"
            >
              Configure
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

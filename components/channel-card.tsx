"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
  className,
}: {
  channel: Channel
  onClick?: (channel: Channel) => void
  className?: string
}) {
  const Icon = channel.icon

  return (
    <div
      className={cn(
        "text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg w-full cursor-pointer h-full",
        className,
      )}
      onClick={() => onClick?.(channel)}
      aria-label={`Channel card for ${channel.name}`}
    >
      <Card className="h-full bg-white border-gray-100 shadow-sm w-full py-4 flex flex-col">
        <CardContent className="px-4 py-0 flex-1 flex flex-col">
          <div className="space-y-2 flex-1 flex flex-col">
            {/* Top section - Icon only */}
            <div className="flex items-start justify-between">
              {/* Left side - Channel icon */}
              <div className="flex-shrink-0">
                <Icon className="h-5 w-5 text-gray-700" />
              </div>
            </div>

            {/* Channel title */}
            <div className="mt-1 flex-1">
              <h3 className="text-lg font-medium text-gray-900 leading-tight">
                {channel.name}
              </h3>
            </div>

            {/* Linked badge or Configure button */}
            <div className="mt-auto">
              {channel.configured ? (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 text-xs font-semibold px-2 py-0.5 rounded-xl flex items-center justify-center w-fit"
                >
                  Linked
                </Badge>
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

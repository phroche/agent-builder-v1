"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Wand2,
  Share2,
  TrendingUp,
  MessageSquare,
  Database,
  Target,
  Radio,
  ArrowLeft
} from "lucide-react"

const sidebarLinks = [
  {
    name: "Build Agent",
    href: "/agents/[id]/build",
    icon: Wand2,
  },
  {
    name: "Gateways",
    href: "/agents/[id]/channels",
    icon: Radio,
  },
  {
    name: "Publish Agent",
    href: "/agents/[id]/publish",
    icon: Share2,
  },
  {
    name: "Analytics",
    href: "/agents/[id]/analytics",
    icon: TrendingUp,
  },
  {
    name: "Conversations",
    href: "/agents/[id]/conversations",
    icon: MessageSquare,
  },
  {
    name: "Datasets",
    href: "/agents/[id]/datasets",
    icon: Database,
  },
  {
    name: "Evaluation",
    href: "/agents/[id]/evaluation",
    icon: Target,
  },
]

export function AgentSidebar({ agentId }: { agentId: string }) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="w-64 border-r h-screen sticky top-0 flex flex-col">
      <div className="p-6 space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/agents')}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Agents
        </Button>
        <h2 className="text-lg font-semibold">Agent Settings</h2>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {sidebarLinks.map((link) => {
          const href = link.href.replace("[id]", agentId)
          const isActive = pathname === href
          const Icon = link.icon

          return (
            <Link
              key={link.name}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

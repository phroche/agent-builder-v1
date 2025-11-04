"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { type Channel, ChannelCard } from "@/components/channel-card"
import {
  Copy,
  MessageSquare,
  Video,
  Store,
  Globe,
  Slack,
  Send,
  Mail,
  Share2,
  MessageCircle,
  KeyRound,
  MessageSquareText,
  Puzzle,
  Workflow,
} from "lucide-react"

type ChannelWithUrl = Channel & {
  shareableUrl?: string
  phoneNumber?: string
}

const channels: ChannelWithUrl[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: MessageCircle,
    configured: true,
    connectionDetails: "+1 (555) 123-4567 +2",
    phoneNumber: "+1 (555) 123-4567"
  },
  {
    id: "marketplace",
    name: "Marketplace",
    icon: Store,
    configured: true,
    connectionDetails: "Published to Claude Marketplace, OpenAI Store",
    shareableUrl: "https://marketplace.example.com/agent/123"
  },
  {
    id: "api",
    name: "API Access",
    icon: KeyRound,
    configured: true,
    connectionDetails: "3 keys available",
    shareableUrl: "https://api.example.com/v1/agents/123"
  },
  {
    id: "chat-widget",
    name: "Chat Widget",
    icon: MessageSquareText,
    configured: true,
    connectionDetails: "Support Chat Widget is active",
    shareableUrl: "https://example.com/chat-widget/123"
  },
  {
    id: "website",
    name: "Website",
    icon: Globe,
    configured: true,
    connectionDetails: "Live at example.com",
    shareableUrl: "https://example.com"
  },
  {
    id: "slack",
    name: "Slack",
    icon: Slack,
    configured: true,
    connectionDetails: "Active in 5 groups",
    shareableUrl: "https://slack.com/app/123"
  },
  {
    id: "mcp",
    name: "MCP",
    icon: Workflow,
    configured: false
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    configured: true,
    connectionDetails: "@myagent_bot",
    shareableUrl: "https://t.me/myagent_bot"
  },
  {
    id: "browser-extension",
    name: "Browser Extension",
    icon: Puzzle,
    configured: true,
    connectionDetails: "Install from Chrome Web Store",
    shareableUrl: "https://chrome.google.com/webstore/detail/123"
  },
  {
    id: "email",
    name: "Email",
    icon: Mail,
    configured: true,
    connectionDetails: "agent@example.com",
    shareableUrl: "mailto:agent@example.com"
  },
  {
    id: "federation",
    name: "Federation",
    icon: Share2,
    configured: false
  },
]

export default function ChannelsPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  const meetLink = `https://example.com/agents/${agentId}/meet`
  const chatLink = `https://example.com/agents/${agentId}/chat`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleChannelClick = (channel: Channel) => {
    router.push(`/agents/${agentId}/channels/${channel.id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Shareability Channels</h1>
        </div>

      {/* Link Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Meet Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={meetLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(meetLink)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat Link
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={chatLink}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(chatLink)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Channels Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Make your agent accessible across different platforms</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              onClick={handleChannelClick}
            />
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}

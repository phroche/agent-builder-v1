"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { type Channel, ChannelCard } from "@/components/channel-card"
import {
  Clipboard,
  MessageSquare,
  Video,
  Store,
  Globe,
  Slack,
  Mail,
  Share2,
  MessageCircle,
  KeyRound,
  MessageSquareText,
  Puzzle,
  Workflow,
  ArrowUpRight,
} from "lucide-react"
import { TelegramIcon, WhatsAppIcon, MCPIcon } from "@/components/custom-icons"

type ChannelWithUrl = Channel & {
  shareableUrl?: string
  phoneNumber?: string
}

const channels: ChannelWithUrl[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: WhatsAppIcon,
    configured: true,
    connectionDetails: "+1 (555) 123-4567 +2",
    phoneNumber: "+1 (555) 123-4567"
  },
  // {
  //   id: "marketplace",
  //   name: "Marketplace",
  //   icon: Store,
  //   configured: true,
  //   connectionDetails: "Published to Claude Marketplace, OpenAI Store",
  //   shareableUrl: "https://marketplace.example.com/agent/123"
  // },
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
    icon: MCPIcon,
    configured: false
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: TelegramIcon,
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
  // {
  //   id: "email",
  //   name: "Email",
  //   icon: Mail,
  //   configured: true,
  //   connectionDetails: "agent@example.com",
  //   shareableUrl: "mailto:agent@example.com"
  // },
  // {
  //   id: "federation",
  //   name: "Federation",
  //   icon: Share2,
  //   configured: false
  // },
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
          <h1 className="text-3xl font-bold">Gateways</h1>
        </div>

      {/* Link Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="bg-white border-gray-100 shadow-sm py-4 flex flex-col">
          <CardContent className="px-4 py-0 flex-1 flex flex-col">
            <div className="space-y-2 flex-1 flex flex-col">
              {/* Icon */}
              <div className="flex items-start justify-between">
                <div className="flex-shrink-0">
                  <Video className="h-5 w-5 text-gray-700" />
                </div>
              </div>

              {/* Title */}
              <div className="mt-1 flex-1">
                <h3 className="text-lg font-medium text-gray-900 leading-tight">
                  Meet Link
                </h3>
              </div>

              {/* Buttons */}
              <div className="mt-auto">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 justify-between"
                    size="sm"
                    onClick={() => window.open(meetLink, '_blank')}
                  >
                    <span>Talk to your agent</span>
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(meetLink)}
                  >
                    <Clipboard className="h-4 w-4 mr-2" />
                    Share link
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-sm py-4 flex flex-col">
          <CardContent className="px-4 py-0 flex-1 flex flex-col">
            <div className="space-y-2 flex-1 flex flex-col">
              {/* Icon */}
              <div className="flex items-start justify-between">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-gray-700" />
                </div>
              </div>

              {/* Title */}
              <div className="mt-1 flex-1">
                <h3 className="text-lg font-medium text-gray-900 leading-tight">
                  Chat Link
                </h3>
              </div>

              {/* Buttons */}
              <div className="mt-auto">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 justify-between"
                    size="sm"
                    onClick={() => window.open(chatLink, '_blank')}
                  >
                    <span>Chat with your agent</span>
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(chatLink)}
                  >
                    <Clipboard className="h-4 w-4 mr-2" />
                    Share link
                  </Button>
                </div>
              </div>
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
            <div key={channel.id} className="relative group">
            <ChannelCard
              key={channel.id}
              channel={channel}
              onClick={handleChannelClick}
              className="transition-all duration-200 hover:shadow-sm hover:scale-[1.02]"
            />
                <ArrowUpRight className="absolute top-3 right-3 h-5 w-5 text-gray-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />

            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}

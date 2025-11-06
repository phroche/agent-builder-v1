"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"

const channelInfo: Record<string, { title: string; description: string }> = {
  whatsapp: {
    title: "WhatsApp",
    description: "Connect your agent to WhatsApp Business"
  },
  marketplace: {
    title: "Marketplace",
    description: "Publish your agent to the marketplace"
  },
  api: {
    title: "API Access",
    description: "Configure API access for your agent"
  },
  "chat-widget": {
    title: "Chat Widget",
    description: "Embed a chat widget on your website"
  },
  website: {
    title: "Website",
    description: "Create a public webpage for your agent"
  },
  slack: {
    title: "Slack",
    description: "Integrate your agent with Slack"
  },
  mcp: {
    title: "MCP",
    description: "Configure Model Context Protocol"
  },
  telegram: {
    title: "Telegram",
    description: "Connect your agent to Telegram"
  },
  "browser-extension": {
    title: "Browser Extension",
    description: "Make your agent available as a browser extension"
  },
  email: {
    title: "Email",
    description: "Enable email communication for your agent"
  },
  federation: {
    title: "Federation",
    description: "Configure federation settings"
  }
}

export default function ChannelConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string
  const channelId = params.channelId as string

  const info = channelInfo[channelId] || { title: "Channel", description: "Configure this channel" }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(`/agents/${agentId}/channels`)}
        className="gap-2 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Gateways
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{info.title}</h1>
        <p className="text-muted-foreground mt-2">{info.description}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Set up the connection and settings for this channel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Channel</Label>
                <p className="text-sm text-muted-foreground">
                  Turn this channel on or off
                </p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                placeholder="Enter API key"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="webhook">Webhook URL</Label>
              <Input
                id="webhook"
                placeholder="https://example.com/webhook"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="settings">Additional Settings</Label>
              <Textarea
                id="settings"
                placeholder="Enter any additional configuration..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>
              Configure advanced options for this channel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-respond</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically respond to messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Track usage and performance metrics
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.push(`/agents/${agentId}/channels`)}>
            Cancel
          </Button>
          <Button>Save Configuration</Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Agent } from "./agent-card"
import Image from "next/image"
import { Clipboard } from "lucide-react"

export function ShareAgentModal({
  open,
  onOpenChange,
  agent,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  agent?: Agent | null
}) {
  if (!agent) return null

  const shareUrl = `https://example.com/agents/${agent.id}`

  const CopyButton = ({ text }: { text: string }) => (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => navigator.clipboard.writeText(text)}
      className="gap-2"
      aria-label="Copy"
    >
      <Clipboard className="size-4" />
      Copy
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Share “{agent.name}”</DialogTitle>
        </DialogHeader>

        {/* Agent ID Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base">{agent.name}</CardTitle>
              <div className="flex gap-1">
                {agent.published && <Badge variant="outline">Published</Badge>}
                {agent.error && <Badge variant="destructive">Error</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div
                className="relative overflow-hidden rounded-md bg-muted md:col-span-1"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={agent.image || "/placeholder.svg?height=360&width=640&query=agent-image"}
                  alt={`${agent.name} image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <p className="text-sm text-muted-foreground">{agent.description}</p>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map((t) => (
                    <Badge key={t} variant="outline" className="rounded-full">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Button variant="secondary" asChild>
                    <a href={`${shareUrl}/chat`} aria-label="Open chat">
                      Chat
                    </a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href={`${shareUrl}/meet`} aria-label="Open meet">
                      Meet
                    </a>
                  </Button>
                  <Button variant="secondary" asChild>
                    <a href={`${shareUrl}/analytics`} aria-label="Open analytics">
                      Analytics
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Tabs */}
        <Tabs defaultValue="private" className="mt-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="widget">Widget</TabsTrigger>
            <TabsTrigger value="api">API Access</TabsTrigger>
          </TabsList>

          <TabsContent value="private" className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="text-sm font-medium">Direct Link</div>
                <div className="text-xs text-muted-foreground">{shareUrl}?visibility=private</div>
              </div>
              <CopyButton text={`${shareUrl}?visibility=private`} />
            </div>
            <p className="text-xs text-muted-foreground">Only invited users can access this link.</p>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <div className="text-sm font-medium">Marketplace Listing</div>
                <div className="text-xs text-muted-foreground">{shareUrl}/marketplace</div>
              </div>
              <CopyButton text={`${shareUrl}/marketplace`} />
            </div>
            <p className="text-xs text-muted-foreground">
              Publish your agent to the marketplace for discovery and installs.
            </p>
          </TabsContent>

          <TabsContent value="website" className="space-y-3">
            <div className="rounded-md border p-3">
              <div className="text-sm font-medium">Public Page URL</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{shareUrl}</span>
                <CopyButton text={shareUrl} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Share this URL to let anyone learn about and try your agent.
            </p>
          </TabsContent>

          <TabsContent value="widget" className="space-y-3">
            <div className="rounded-md border p-3">
              <div className="text-sm font-medium">Embed Code</div>
              <pre className="mt-2 overflow-auto rounded bg-muted p-3 text-xs">
                {`<script src="https://example.com/widget.js" async></script>
<div data-agent-id="${agent.id}" data-theme="auto"></div>`}
              </pre>
              <div className="mt-2 flex justify-end">
                <CopyButton
                  text={`<script src="https://example.com/widget.js" async></script>
<div data-agent-id="${agent.id}" data-theme="auto"></div>`}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Paste this into your website to embed the agent.</p>
          </TabsContent>

          <TabsContent value="api" className="space-y-3">
            <div className="rounded-md border p-3">
              <div className="text-sm font-medium">API Example</div>
              <pre className="mt-2 overflow-auto rounded bg-muted p-3 text-xs">
                {`POST https://api.example.com/agents/${agent.id}/chat
Headers: Authorization: Bearer <API_KEY>
Body:
{
  "message": "Hello"
}`}
              </pre>
              <div className="mt-2 flex justify-end">
                <CopyButton
                  text={`POST https://api.example.com/agents/${agent.id}/chat
Headers: Authorization: Bearer <API_KEY>
Body:
{
  "message": "Hello"
}`}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Use your API key to programmatically interact with this agent.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

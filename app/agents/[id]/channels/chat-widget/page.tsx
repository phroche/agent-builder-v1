"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Clipboard, MessageSquareText } from "lucide-react"

export default function ChatWidgetConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  // Section 1: Enable chat widget
  const [allowOthersToRun, setAllowOthersToRun] = useState(false)
  const chatBubbleScript = `<script src="https://cdn.example.com/chat-widget.js"></script>
<script>
  ChatWidget.init({
    agentId: "${agentId}",
    apiKey: "YOUR_API_KEY"
  });
</script>`

  // Section 2: Customize chat widget
  const [position, setPosition] = useState("bottom-right")
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [widgetTitle, setWidgetTitle] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSaveSettings = () => {
    // Save settings logic
    console.log({
      position,
      welcomeMessage,
      widgetTitle
    })
  }

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
        <MessageSquareText className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">Chat Widget</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Section 1: Enable Chat Widget */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Enable Chat Widget</h2>
          <Card>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow others to run this Agent on your account</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable this to generate an embeddable chat widget script
                  </p>
                </div>
                <Switch
                  checked={allowOthersToRun}
                  onCheckedChange={setAllowOthersToRun}
                />
              </div>

              {allowOthersToRun && (
                <div className="space-y-2">
                  <Label>Chat Bubble Script</Label>
                  <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(chatBubbleScript)}
                        className="gap-2 rounded-lg shadow-sm"
                      >
                        <Clipboard className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                      <div className="p-4 overflow-x-auto text-sm font-mono text-gray-800">
                        <div className="table w-full">
                          {chatBubbleScript.split('\n').map((line, index) => {
                            // Escape HTML for display
                            const displayLine = line
                              .replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;')

                            // Apply syntax highlighting
                            const syntaxHighlighted = displayLine
                              .replace(/(&lt;script|&lt;\/script&gt;|script&gt;)/g, '<span class="text-purple-600 font-semibold">$1</span>')
                              .replace(/(src|agentId|apiKey)=/g, '<span class="text-blue-600">$1</span>=')
                              .replace(/(["'])(.*?)\1/g, '<span class="text-green-700">$1$2$1</span>')
                              .replace(/\b(ChatWidget|init)\b/g, '<span class="text-blue-600">$1</span>')

                            return (
                              <div key={index} className="table-row">
                                <span className="table-cell text-gray-400 select-none pr-4 text-right" style={{ width: '3rem' }}>
                                  {index + 1}
                                </span>
                                <span
                                  className="table-cell"
                                  dangerouslySetInnerHTML={{ __html: syntaxHighlighted || ' ' }}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section 2: Customize Chat Widget */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Customize your Chat Widget</h2>
          <Card>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="position">Widget Position</Label>
                  <Select value={position} onValueChange={setPosition}>
                    <SelectTrigger id="position" className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Input
                    id="welcomeMessage"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder="Enter welcome message"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="widgetTitle">Widget Title</Label>
                  <Input
                    id="widgetTitle"
                    value={widgetTitle}
                    onChange={(e) => setWidgetTitle(e.target.value)}
                    placeholder="Enter widget title"
                    className="rounded-xl"
                  />
                </div>

                <Button onClick={handleSaveSettings} className="w-full rounded-xl">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

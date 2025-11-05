"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Copy } from "lucide-react"
import { TelegramIcon } from "@/components/custom-icons"

// Mock data for connected Telegram bots
const initialConnections = [
  {
    id: "1",
    botName: "My Agent Bot",
    botUsername: "@myagentbot",
    webhookUrl: "https://api.example.com/webhook/telegram/1"
  },
  {
    id: "2",
    botName: "Support Bot",
    botUsername: "@supportbot",
    webhookUrl: "https://api.example.com/webhook/telegram/2"
  },
]

export default function TelegramConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  const [connections, setConnections] = useState(initialConnections)
  const [currentPage, setCurrentPage] = useState(1)
  const [botToken, setBotToken] = useState("")
  const [botName, setBotName] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")

  const itemsPerPage = 7
  const totalPages = Math.ceil(connections.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentConnections = connections.slice(startIndex, endIndex)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleConnect = () => {
    // Generate webhook URL
    const generatedWebhookUrl = `https://api.example.com/webhook/telegram/${Date.now()}`
    setWebhookUrl(generatedWebhookUrl)

    // Create new connection
    const newConnection = {
      id: String(connections.length + 1),
      botName: botName,
      botUsername: `@${botName.toLowerCase().replace(/\s+/g, '')}`,
      webhookUrl: generatedWebhookUrl
    }

    // Add to connections list
    setConnections([...connections, newConnection])

    // Clear form fields
    setBotToken("")
    setBotName("")
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
        Back to Channels
      </Button>

      <div className="mb-6">
        <TelegramIcon className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">Telegram</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Connected Bots Section */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Telegram bots connected to your agent:</h2>
          <Card className="py-0 gap-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[70%] pl-6 h-12">Bot Username</TableHead>
                    <TableHead className="w-[30%] h-12">Webhook URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentConnections.map((connection) => (
                    <TableRow key={connection.id}>
                      <TableCell className="pl-6">{connection.botUsername}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(connection.webhookUrl)}
                          className="gap-2 rounded-xl"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
            </CardContent>
          </Card>
        </div>

        {/* Connect Section */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Connect your Agent to Telegram</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://docs.example.com/telegram-integration', '_blank')}
              className="gap-2 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Docs
            </Button>
          </div>
          <Card>
            <CardContent>
              <div className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="botToken">Bot Token</Label>
                    <Input
                      id="botToken"
                      type="password"
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                      placeholder="Enter your Telegram bot token"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="botName">Bot Name</Label>
                    <Input
                      id="botName"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder="Enter bot name"
                      className="rounded-xl"
                    />
                  </div>

                  <Button onClick={handleConnect} className="w-full rounded-xl">
                    Connect
                  </Button>
              </div>

              {/* Webhook URL Output */}
              {webhookUrl && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <Label className="mb-2 block">Your Webhook URL:</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border">
                      {webhookUrl}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(webhookUrl)}
                      className="rounded-xl"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ArrowLeft, MessageCircle, Copy } from "lucide-react"

// Mock data for connected WhatsApp numbers
const mockConnections = [
  {
    id: "1",
    twilioSid: "AC1234567890abcdef1234567890abcdef",
    phoneNumber: "+1 (555) 123-4567",
    webhookUrl: "https://api.example.com/webhook/whatsapp/1"
  },
  {
    id: "2",
    twilioSid: "AC9876543210fedcba9876543210fedcba",
    phoneNumber: "+1 (555) 987-6543",
    webhookUrl: "https://api.example.com/webhook/whatsapp/2"
  },
]

export default function WhatsAppConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  const [currentPage, setCurrentPage] = useState(1)
  const [twilioAccountSid, setTwilioAccountSid] = useState("")
  const [twilioAuthToken, setTwilioAuthToken] = useState("")
  const [platformApiKey, setPlatformApiKey] = useState("")
  const [twilioPhoneNumber, setTwilioPhoneNumber] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")

  const itemsPerPage = 7
  const totalPages = Math.ceil(mockConnections.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentConnections = mockConnections.slice(startIndex, endIndex)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleConnect = () => {
    // Generate webhook URL
    const generatedWebhookUrl = `https://api.example.com/webhook/whatsapp/${Date.now()}`
    setWebhookUrl(generatedWebhookUrl)
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

      <div className="mb-6 flex items-center gap-4">
        <MessageCircle className="h-8 w-8 text-gray-700" />
        <h1 className="text-3xl font-bold">WhatsApp</h1>
      </div>

      <div className="space-y-6">
        {/* Connected Numbers Section */}
        <Card>
          <CardHeader>
            <CardTitle>WhatsApp numbers connected to your agent:</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Twilio SID</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Webhook URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentConnections.map((connection) => (
                  <TableRow key={connection.id}>
                    <TableCell className="font-mono text-sm">
                      {connection.twilioSid}
                    </TableCell>
                    <TableCell>{connection.phoneNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {connection.webhookUrl}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(connection.webhookUrl)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
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

        {/* Connect Section */}
        <Card>
          <CardHeader>
            <CardTitle>Connect your agent to WhatsApp via Twilio:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twilioAccountSid">Twilio Account SID</Label>
                  <Input
                    id="twilioAccountSid"
                    value={twilioAccountSid}
                    onChange={(e) => setTwilioAccountSid(e.target.value)}
                    placeholder="Enter Twilio Account SID"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twilioAuthToken">Twilio Auth Token</Label>
                  <Input
                    id="twilioAuthToken"
                    type="password"
                    value={twilioAuthToken}
                    onChange={(e) => setTwilioAuthToken(e.target.value)}
                    placeholder="Enter Twilio Auth Token"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platformApiKey">Platform API Key</Label>
                  <Input
                    id="platformApiKey"
                    value={platformApiKey}
                    onChange={(e) => setPlatformApiKey(e.target.value)}
                    placeholder="Enter Platform API Key"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twilioPhoneNumber">Twilio Phone Number</Label>
                  <Input
                    id="twilioPhoneNumber"
                    value={twilioPhoneNumber}
                    onChange={(e) => setTwilioPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <Button onClick={handleConnect} className="w-full md:w-auto">
                Connect
              </Button>

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
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

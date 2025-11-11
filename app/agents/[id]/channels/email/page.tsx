"use client"

import { useState, useEffect } from "react"
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
import { ArrowLeft, Clipboard, Mail, CheckCircle2, XCircle } from "lucide-react"

// Mock data for connected email addresses
const initialConnections = [
  {
    id: "1",
    emailAddress: "agent@mail.phronetic-ai.in",
    managerEmail: "manager@example.com"
  },
  {
    id: "2",
    emailAddress: "support@mail.phronetic-ai.in",
    managerEmail: "supervisor@example.com"
  },
]

// Mock list of taken email IDs (for availability checking)
const takenEmailIds = ["agent", "support", "admin", "info", "contact"]

export default function EmailConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  const [connections, setConnections] = useState(initialConnections)
  const [currentPage, setCurrentPage] = useState(1)
  const [desiredEmailId, setDesiredEmailId] = useState("")
  const [managerEmail, setManagerEmail] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null)

  const itemsPerPage = 7
  const totalPages = Math.ceil(connections.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentConnections = connections.slice(startIndex, endIndex)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Check email availability when user types
  useEffect(() => {
    if (desiredEmailId.trim() === "") {
      setEmailAvailable(null)
      return
    }

    setIsCheckingAvailability(true)

    // Simulate API call to check availability
    const checkAvailability = setTimeout(() => {
      const isAvailable = !takenEmailIds.includes(desiredEmailId.toLowerCase())
      setEmailAvailable(isAvailable)
      setIsCheckingAvailability(false)
    }, 500)

    return () => clearTimeout(checkAvailability)
  }, [desiredEmailId])

  const handleConnect = () => {
    if (!emailAvailable || !desiredEmailId || !managerEmail || !apiKey) {
      return
    }

    // Generate the email address
    const newEmailAddress = `${desiredEmailId}@mail.phronetic-ai.in`
    setGeneratedEmail(newEmailAddress)

    // Create new connection
    const newConnection = {
      id: String(connections.length + 1),
      emailAddress: newEmailAddress,
      managerEmail: managerEmail
    }

    // Add to connections list
    setConnections([...connections, newConnection])

    // Clear form fields
    setDesiredEmailId("")
    setManagerEmail("")
    setApiKey("")
    setEmailAvailable(null)
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
        <Mail className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">Email</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Connected Email Addresses Section */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Email addresses connected to your agent:</h2>
          <Card className="py-0 gap-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[40%] pl-6 h-12">Email Address</TableHead>
                    <TableHead className="w-[40%] h-12">Manager Email</TableHead>
                    <TableHead className="w-[20%] h-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentConnections.map((connection) => (
                    <TableRow key={connection.id}>
                      <TableCell className="pl-6">{connection.emailAddress}</TableCell>
                      <TableCell>{connection.managerEmail}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.location.href = `mailto:${connection.emailAddress}`}
                          className="gap-2 rounded-xl"
                        >
                          <Mail className="h-4 w-4" />
                          Mail Agent
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
            <h2 className="text-base font-semibold">Connect your Agent to Email</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://docs.example.com/email-integration', '_blank')}
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
                    <Label htmlFor="desiredEmailId">Desired Email ID</Label>
                    <div className="relative flex items-stretch">
                      <Input
                        id="desiredEmailId"
                        value={desiredEmailId}
                        onChange={(e) => setDesiredEmailId(e.target.value)}
                        placeholder="myagent"
                        className="rounded-l-xl rounded-r-none border-r-0 flex-[65]"
                      />
                      <div className="flex items-center gap-2 bg-muted px-3 border border-l-0 rounded-r-xl border-input flex-[35] whitespace-nowrap">
                        <span className="text-sm text-muted-foreground">@mail.phronetic-ai.in</span>
                        {desiredEmailId && (
                          <div className="flex-shrink-0">
                            {isCheckingAvailability ? (
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                            ) : emailAvailable === true ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : emailAvailable === false ? (
                              <XCircle className="h-5 w-5 text-red-600" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                    {desiredEmailId && emailAvailable !== null && (
                      <p className={`text-sm ${emailAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {emailAvailable
                          ? `${desiredEmailId}@mail.phronetic-ai.in is available`
                          : `${desiredEmailId}@mail.phronetic-ai.in is not available`}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="managerEmail">Manager Email</Label>
                    <Input
                      id="managerEmail"
                      type="email"
                      value={managerEmail}
                      onChange={(e) => setManagerEmail(e.target.value)}
                      placeholder="manager@example.com"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter API Key"
                      className="rounded-xl"
                    />
                  </div>

                  <Button
                    onClick={handleConnect}
                    className="w-full rounded-xl"
                    disabled={!emailAvailable || !desiredEmailId || !managerEmail || !apiKey}
                  >
                    Create
                  </Button>
              </div>

              {/* Generated Email Output */}
              {generatedEmail && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <Label className="mb-2 block">Your Email Address:</Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm bg-white px-3 py-2 rounded border">
                      {generatedEmail}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generatedEmail)}
                      className="rounded-xl"
                    >
                      <Clipboard className="h-4 w-4 mr-2" />
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

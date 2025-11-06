"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Puzzle, Chrome, Download, ExternalLink } from "lucide-react"

// Mock data for installed browsers
const initialExtensions = [
  {
    id: "1",
    extensionName: "Customer Support Assistant",
    installCount: 1247,
    storeUrl: "https://chrome.google.com/webstore/detail/your-extension-id"
  },
  {
    id: "2",
    extensionName: "Sales Agent Helper",
    installCount: 823,
    storeUrl: "https://addons.mozilla.org/en-US/firefox/addon/your-extension"
  },
]

export default function BrowserExtensionConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  const [extensions, setExtensions] = useState(initialExtensions)
  const [apiKeyName, setApiKeyName] = useState("")
  const [extensionName, setExtensionName] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [extensionUrl, setExtensionUrl] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleCreateApiKey = () => {
    // Generate a random API key
    const generatedApiKey = `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setApiKey(generatedApiKey)
  }

  const handleConnect = () => {
    // Generate browser extension URL
    const generatedUrl = `https://chrome.google.com/webstore/detail/${agentId}`
    setExtensionUrl(generatedUrl)

    // Create new extension entry
    const newExtension = {
      id: String(extensions.length + 1),
      extensionName: extensionName,
      installCount: 0,
      storeUrl: generatedUrl
    }

    // Add to extensions list
    setExtensions([...extensions, newExtension])

    // Clear form fields
    setApiKeyName("")
    setExtensionName("")
    setApiKey("")
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
        <Puzzle className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">Browser Extension</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Extensions Section */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Extension</h2>
          <Card className="py-0 gap-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[50%] pl-6 h-12">Extension</TableHead>
                    <TableHead className="w-[25%] h-12">Installs</TableHead>
                    <TableHead className="w-[25%] h-12 pr-6">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {extensions.map((extension) => (
                    <TableRow key={extension.id}>
                      <TableCell className="pl-6">
                        <span className="font-medium">{extension.extensionName}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-muted-foreground">{extension.installCount.toLocaleString()}</span>
                      </TableCell>
                      <TableCell className="pr-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(extension.storeUrl, '_blank')}
                          className="gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open in Store
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Create Browser Extension Section */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Create a browser extension for your Agent</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://docs.example.com/browser-extension', '_blank')}
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
                  <Label htmlFor="apiKeyName">Name your API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiKeyName"
                      value={apiKeyName}
                      onChange={(e) => setApiKeyName(e.target.value)}
                      placeholder="Enter API Key name"
                      className="rounded-xl flex-1"
                    />
                    <Button
                      onClick={handleCreateApiKey}
                      className="rounded-xl whitespace-nowrap"
                      variant="outline"
                    >
                      Create API Key
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="extensionName">Extension Name</Label>
                  <Input
                    id="extensionName"
                    value={extensionName}
                    onChange={(e) => setExtensionName(e.target.value)}
                    placeholder="Enter extension name"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Generated API Key will appear here"
                    className="rounded-xl"
                    readOnly
                  />
                </div>

                <Button onClick={handleConnect} className="w-full rounded-xl">
                  Connect
                </Button>
              </div>

              {/* Extension URL Output */}
              {extensionUrl && (
                <div className="mt-8 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Your Browser Extension URL:</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(extensionUrl)}
                      className="gap-2 rounded-xl"
                    >
                      <Clipboard className="h-4 w-4" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <code className="text-sm break-all">{extensionUrl}</code>
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

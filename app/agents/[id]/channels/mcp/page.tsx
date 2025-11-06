"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clipboard } from "lucide-react"
import { MCPIcon } from "@/components/custom-icons"

export default function MCPConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  const [apiKeyName, setApiKeyName] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [clientConfig, setClientConfig] = useState("")
  const [serverConfig, setServerConfig] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleCreateApiKey = () => {
    // Generate a random API key
    const generatedApiKey = `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setApiKey(generatedApiKey)
  }

  const handleConnect = () => {
    // Generate client configuration JSON
    const clientConfigJson = {
      "mcpServers": {
        [apiKeyName || "my-mcp-server"]: {
          "command": "npx",
          "args": ["-y", "@modelcontextprotocol/server-example"],
          "env": {
            "API_KEY": apiKey
          }
        }
      }
    }

    // Generate server configuration JSON
    const serverConfigJson = {
      "name": apiKeyName || "my-mcp-server",
      "version": "1.0.0",
      "description": "MCP server configuration",
      "apiKey": apiKey,
      "endpoint": `https://api.example.com/mcp/${agentId}`,
      "capabilities": ["tools", "resources", "prompts"]
    }

    setClientConfig(JSON.stringify(clientConfigJson, null, 2))
    setServerConfig(JSON.stringify(serverConfigJson, null, 2))
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
        <MCPIcon className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">MCP</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Setup Section */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Set up your MCP server</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://docs.example.com/mcp-integration', '_blank')}
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
            </CardContent>
          </Card>
        </div>

        {/* Configuration Output Section */}
        {clientConfig && serverConfig && (
          <div className="w-full space-y-4">
            <h2 className="text-base font-semibold">Paste this into your software to get started</h2>
            <Card>
              <CardContent>
                <div className="space-y-6">
                  {/* Client Configuration */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Client Configuration</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(clientConfig)}
                        className="gap-2 rounded-xl"
                      >
                        <Clipboard className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <pre className="text-sm overflow-x-auto">
                        <code>{clientConfig}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Server Configuration */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">Server Configuration</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(serverConfig)}
                        className="gap-2 rounded-xl"
                      >
                        <Clipboard className="h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <pre className="text-sm overflow-x-auto">
                        <code>{serverConfig}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

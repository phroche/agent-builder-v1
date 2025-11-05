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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowLeft, Copy, KeyRound, Check } from "lucide-react"

export default function APIConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  // Subsection 1: API Key Management
  const [useExistingKey, setUseExistingKey] = useState(true)
  const [existingApiKey, setExistingApiKey] = useState("")
  const [newKeyName, setNewKeyName] = useState("")
  const [generatedApiKey, setGeneratedApiKey] = useState("")
  const [appliedApiKey, setAppliedApiKey] = useState("")
  const [copied, setCopied] = useState(false)

  // Subsection 2: API Scripts
  const [selectedLanguage, setSelectedLanguage] = useState("curl")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateKey = () => {
    const newKey = `sk_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    setGeneratedApiKey(newKey)
  }

  const handleApply = () => {
    const keyToApply = useExistingKey ? existingApiKey : generatedApiKey
    setAppliedApiKey(keyToApply)
  }

  // API Script templates
  const getApiScripts = (apiKey: string) => {
    const scripts = {
      curl: {
        chat: `curl -X POST https://api.example.com/v1/chat \\
  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "${agentId}",
    "message": "Hello, how can you help me?",
    "user_id": "user123"
  }'`,
        stream: `curl -X POST https://api.example.com/v1/chat/stream \\
  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "${agentId}",
    "message": "Hello, how can you help me?",
    "user_id": "user123",
    "stream": true
  }'`,
        fileUpload: `curl -X POST https://api.example.com/v1/files/upload \\
  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
  -F "file=@/path/to/your/file.pdf" \\
  -F "agent_id=${agentId}" \\
  -F "user_id=user123"`
      },
      python: {
        chat: `import requests

api_key = "${apiKey || 'YOUR_API_KEY'}"
url = "https://api.example.com/v1/chat"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "agent_id": "${agentId}",
    "message": "Hello, how can you help me?",
    "user_id": "user123"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
        stream: `import requests

api_key = "${apiKey || 'YOUR_API_KEY'}"
url = "https://api.example.com/v1/chat/stream"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "agent_id": "${agentId}",
    "message": "Hello, how can you help me?",
    "user_id": "user123",
    "stream": True
}

with requests.post(url, headers=headers, json=data, stream=True) as response:
    for line in response.iter_lines():
        if line:
            print(line.decode('utf-8'))`,
        fileUpload: `import requests

api_key = "${apiKey || 'YOUR_API_KEY'}"
url = "https://api.example.com/v1/files/upload"

headers = {
    "Authorization": f"Bearer {api_key}"
}

files = {
    "file": open("/path/to/your/file.pdf", "rb")
}

data = {
    "agent_id": "${agentId}",
    "user_id": "user123"
}

response = requests.post(url, headers=headers, files=files, data=data)
print(response.json())`
      },
      javascript: {
        chat: `const apiKey = "${apiKey || 'YOUR_API_KEY'}";
const url = "https://api.example.com/v1/chat";

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    agent_id: "${agentId}",
    message: "Hello, how can you help me?",
    user_id: "user123"
  })
});

const data = await response.json();
console.log(data);`,
        stream: `const apiKey = "${apiKey || 'YOUR_API_KEY'}";
const url = "https://api.example.com/v1/chat/stream";

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    agent_id: "${agentId}",
    message: "Hello, how can you help me?",
    user_id: "user123",
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(decoder.decode(value));
}`,
        fileUpload: `const apiKey = "${apiKey || 'YOUR_API_KEY'}";
const url = "https://api.example.com/v1/files/upload";

const formData = new FormData();
formData.append("file", fileInput.files[0]);
formData.append("agent_id", "${agentId}");
formData.append("user_id", "user123");

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`
  },
  body: formData
});

const data = await response.json();
console.log(data);`
      }
    }

    return scripts[selectedLanguage as keyof typeof scripts]
  }

  const currentScripts = getApiScripts(appliedApiKey)

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
        <KeyRound className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">API Access</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Subsection 1: API Key Management */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Enable API usage for your Agent</h2>
          <Card>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className={useExistingKey ? "font-semibold" : "text-muted-foreground"}>
                    Use Existing API Key
                  </span>
                  <Switch
                    checked={!useExistingKey}
                    onCheckedChange={(checked) => {
                      setUseExistingKey(!checked)
                      setGeneratedApiKey("")
                    }}
                  />
                  <span className={!useExistingKey ? "font-semibold" : "text-muted-foreground"}>
                    Create New API Key
                  </span>
                </div>
              </div>

              {useExistingKey ? (
                // Use Existing Key
                <>
                  <div className="space-y-2">
                    <Label htmlFor="existingApiKey">API Key</Label>
                    <Input
                      id="existingApiKey"
                      type="password"
                      value={existingApiKey}
                      onChange={(e) => setExistingApiKey(e.target.value)}
                      placeholder="Enter your API key"
                      className="rounded-xl"
                    />
                  </div>
                  <Button
                    onClick={handleApply}
                    className="w-full rounded-xl"
                    disabled={!existingApiKey}
                  >
                    Apply
                  </Button>
                </>
              ) : (
                // Create New Key
                <>
                  <div className="space-y-2">
                    <Label htmlFor="newKeyName">API Key Name</Label>
                    <Input
                      id="newKeyName"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="Enter a name for your API key"
                      className="rounded-xl"
                    />
                  </div>

                  <Button
                    onClick={handleCreateKey}
                    className="w-full rounded-xl"
                    disabled={!newKeyName}
                  >
                    Create API Key
                  </Button>

                  {/* Generated Key Display */}
                  {generatedApiKey && (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <Label className="mb-2 block">Your API Key:</Label>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 text-sm bg-white px-3 py-2 rounded border break-all">
                            {generatedApiKey}
                          </code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(generatedApiKey)}
                            className="rounded-xl shrink-0"
                          >
                            {copied ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button
                        onClick={handleApply}
                        className="w-full rounded-xl"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Subsection 2: API Scripts */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">API Scripts</h2>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="curl">cURL</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {/* Chat API */}
                <AccordionItem value="chat" className="border-b last:border-b-0">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="font-semibold">Chat</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-end mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(currentScripts.chat)}
                          className="gap-2 rounded-xl"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{currentScripts.chat}</code>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Stream API */}
                <AccordionItem value="stream" className="border-b last:border-b-0">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="font-semibold">Stream</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-end mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(currentScripts.stream)}
                          className="gap-2 rounded-xl"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{currentScripts.stream}</code>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* File Upload API */}
                <AccordionItem value="fileUpload" className="border-b-0">
                  <AccordionTrigger className="px-6 hover:no-underline">
                    <span className="font-semibold">File Upload</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-end mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(currentScripts.fileUpload)}
                          className="gap-2 rounded-xl"
                        >
                          <Copy className="h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{currentScripts.fileUpload}</code>
                      </pre>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

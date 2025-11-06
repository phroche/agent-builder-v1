"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { ArrowLeft, Clipboard, KeyRound, Check } from "lucide-react"

export default function APIConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  // Subsection 1: API Key Management
  const [keyOption, setKeyOption] = useState<"existing" | "new">("existing")
  const [existingApiKey, setExistingApiKey] = useState("")
  const [newKeyName, setNewKeyName] = useState("")
  const [generatedApiKey, setGeneratedApiKey] = useState("")
  const [appliedApiKey, setAppliedApiKey] = useState("")
  const [copied, setCopied] = useState(false)

  // Subsection 2: API Scripts
  const [selectedLanguage, setSelectedLanguage] = useState("curl")
  const [openAccordions, setOpenAccordions] = useState<string[]>([])

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
    const keyToApply = keyOption === "existing" ? existingApiKey : generatedApiKey
    setAppliedApiKey(keyToApply)
    // Open all accordions when API key is applied
    setOpenAccordions(["chat", "stream", "fileUpload"])
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

  // Helper function to render syntax-highlighted code
  const renderCode = (code: string) => {
    // Split code into lines and apply basic syntax highlighting
    return code.split('\n').map((line, index) => {
      let highlightedLine = line

      // Keywords and language-specific patterns
      if (selectedLanguage === 'python') {
        highlightedLine = line
          .replace(/\b(import|from|def|class|if|else|elif|for|while|return|with|as|True|False|None)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
          .replace(/\b(requests|json|print|open)\b/g, '<span class="text-blue-600">$1</span>')
          .replace(/(["'])(.*?)\1/g, '<span class="text-green-700">$1$2$1</span>')
          .replace(/#.*/g, '<span class="text-gray-500 italic">$&</span>')
      } else if (selectedLanguage === 'javascript') {
        highlightedLine = line
          .replace(/\b(const|let|var|async|await|function|return|if|else|for|while|new|class|import|from|export)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
          .replace(/\b(fetch|console|JSON|FormData|TextDecoder|getReader|append|stringify|log)\b/g, '<span class="text-blue-600">$1</span>')
          .replace(/(["'`])(.*?)\1/g, '<span class="text-green-700">$1$2$1</span>')
          .replace(/\/\/.*/g, '<span class="text-gray-500 italic">$&</span>')
      } else if (selectedLanguage === 'curl') {
        highlightedLine = line
          .replace(/^(curl)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
          .replace(/(-[A-Z]|--[a-z-]+)/g, '<span class="text-blue-600">$1</span>')
          .replace(/(["'])(.*?)\1/g, '<span class="text-green-700">$1$2$1</span>')
          .replace(/(https?:\/\/[^\s\\]+)/g, '<span class="text-cyan-600">$1</span>')
      }

      return (
        <div key={index} className="table-row">
          <span className="table-cell text-gray-400 select-none pr-4 text-right" style={{ width: '3rem' }}>
            {index + 1}
          </span>
          <span
            className="table-cell"
            dangerouslySetInnerHTML={{ __html: highlightedLine || ' ' }}
          />
        </div>
      )
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
        <KeyRound className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">API Access</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Subsection 1: API Key Management */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Enable API usage for your Agent</h2>
          <Card>
            <CardContent>
              <div className="space-y-8">
                <RadioGroup value={keyOption} onValueChange={(value) => {
                  setKeyOption(value as "existing" | "new")
                  setGeneratedApiKey("")
                }}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="existing" id="existing" />
                    <Label htmlFor="existing" className="cursor-pointer font-normal">
                      Use Existing API Key
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new" className="cursor-pointer font-normal">
                      Create New API Key
                    </Label>
                  </div>
                </RadioGroup>

                {keyOption === "existing" ? (
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
                      <div className="flex gap-2">
                        <Input
                          id="newKeyName"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                          placeholder="Enter a name for your API key"
                          className="rounded-xl flex-1"
                        />
                        <Button
                          onClick={handleCreateKey}
                          variant="outline"
                          className="rounded-xl whitespace-nowrap"
                          disabled={!newKeyName}
                        >
                          Create API Key
                        </Button>
                      </div>
                    </div>

                    {/* Generated Key Display */}
                    {generatedApiKey && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="generatedApiKey">Your API Key</Label>
                          <div className="flex gap-2">
                            <Input
                              id="generatedApiKey"
                              value={generatedApiKey}
                              readOnly
                              className="rounded-xl flex-1 font-mono text-sm"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(generatedApiKey)}
                              className="rounded-xl shrink-0"
                            >
                              {copied ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Clipboard className="h-4 w-4" />
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
                      </>
                    )}
                  </>
                )}
              </div>
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

          <Card className="py-0">
            <CardContent className="p-0">
              <Accordion
                type="multiple"
                value={openAccordions}
                onValueChange={setOpenAccordions}
                className="w-full [&>*:first-child]:border-t-0"
              >
                {/* Chat API */}
                <AccordionItem value="chat" className="border-b last:border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-semibold">Chat</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="relative">
                      <div className="absolute top-3 right-3 z-10">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(currentScripts.chat)}
                          className="gap-2 rounded-lg shadow-sm"
                        >
                          <Clipboard className="h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 overflow-x-auto text-sm font-mono text-gray-800">
                          <div className="table w-full">
                            {renderCode(currentScripts.chat)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Stream API */}
                <AccordionItem value="stream" className="border-b last:border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-semibold">Stream</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="relative">
                      <div className="absolute top-3 right-3 z-10">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(currentScripts.stream)}
                          className="gap-2 rounded-lg shadow-sm"
                        >
                          <Clipboard className="h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 overflow-x-auto text-sm font-mono text-gray-800">
                          <div className="table w-full">
                            {renderCode(currentScripts.stream)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* File Upload API */}
                <AccordionItem value="fileUpload" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-semibold">File Upload</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="relative">
                      <div className="absolute top-3 right-3 z-10">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(currentScripts.fileUpload)}
                          className="gap-2 rounded-lg shadow-sm"
                        >
                          <Clipboard className="h-4 w-4" />
                          Copy
                        </Button>
                      </div>
                      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                        <div className="p-4 overflow-x-auto text-sm font-mono text-gray-800">
                          <div className="table w-full">
                            {renderCode(currentScripts.fileUpload)}
                          </div>
                        </div>
                      </div>
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

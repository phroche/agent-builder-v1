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
import { ArrowLeft } from "lucide-react"
import { SlackIcon } from "@/components/custom-icons"

// Mock data for connected Slack workspaces
const initialWorkspaces = [
  {
    id: "1",
    workspaceName: "Phronetic",
    workspaceColor: "#6366F1"
  },
  {
    id: "2",
    workspaceName: "Rediff",
    workspaceColor: "#EC4899"
  },
]

export default function SlackConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  const [workspaces, setWorkspaces] = useState(initialWorkspaces)
  const [currentPage, setCurrentPage] = useState(1)
  const [slackDeveloperToken, setSlackDeveloperToken] = useState("")
  const [slackRefreshToken, setSlackRefreshToken] = useState("")
  const [platformApiKey, setPlatformApiKey] = useState("")

  const itemsPerPage = 7
  const totalPages = Math.ceil(workspaces.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentWorkspaces = workspaces.slice(startIndex, endIndex)

  const handleConnect = () => {
    // Generate a dummy workspace name
    const workspaceNames = ["Tech Corp", "Design Studio", "Marketing Hub", "Development Team", "Sales Force", "Creative Agency"]
    const randomWorkspace = workspaceNames[Math.floor(Math.random() * workspaceNames.length)]

    // Generate a random color for the logo placeholder
    const colors = ["#6366F1", "#EC4899", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EF4444", "#06B6D4"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    // Create new workspace
    const newWorkspace = {
      id: String(workspaces.length + 1),
      workspaceName: randomWorkspace,
      workspaceColor: randomColor
    }

    // Add to workspaces list
    setWorkspaces([...workspaces, newWorkspace])

    // Clear form fields
    setSlackDeveloperToken("")
    setSlackRefreshToken("")
    setPlatformApiKey("")
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
        <SlackIcon className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">Slack</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Connected Workspaces Section */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Workspaces that your Agent is a part of:</h2>
          <Card className="py-0 gap-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-full pl-6 h-12">Workspace name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentWorkspaces.map((workspace) => (
                    <TableRow key={workspace.id}>
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded flex items-center justify-center text-white font-semibold text-sm"
                            style={{ backgroundColor: workspace.workspaceColor }}
                          >
                            {workspace.workspaceName.charAt(0).toUpperCase()}
                          </div>
                          <span>{workspace.workspaceName}</span>
                        </div>
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
            <h2 className="text-base font-semibold">Add your Agent to a Slack workspace</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://docs.example.com/slack-integration', '_blank')}
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
                    <Label htmlFor="slackDeveloperToken">Slack Developer Token</Label>
                    <Input
                      id="slackDeveloperToken"
                      value={slackDeveloperToken}
                      onChange={(e) => setSlackDeveloperToken(e.target.value)}
                      placeholder="Enter Slack Developer Token"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slackRefreshToken">Slack Refresh Token</Label>
                    <Input
                      id="slackRefreshToken"
                      type="password"
                      value={slackRefreshToken}
                      onChange={(e) => setSlackRefreshToken(e.target.value)}
                      placeholder="Enter Slack Refresh Token"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platformApiKey">Platform API Key</Label>
                    <Input
                      id="platformApiKey"
                      value={platformApiKey}
                      onChange={(e) => setPlatformApiKey(e.target.value)}
                      placeholder="Enter Platform API Key"
                      className="rounded-xl"
                    />
                  </div>

                  <Button onClick={handleConnect} className="w-full rounded-xl">
                    Connect
                  </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

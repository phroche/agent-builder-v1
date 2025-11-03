"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useAgents } from "@/hooks/use-agents"
import { useState, useEffect } from "react"

export default function BuildAgentPage() {
  const params = useParams()
  const agentId = params.id as string
  const { agents } = useAgents()

  const agent = agents.find((a) => a.id === agentId)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (agent) {
      setName(agent.name)
      setDescription(agent.description)
    }
  }, [agent])

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-8">
          <div className="text-center text-muted-foreground">
            Agent not found
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Build Agent</h1>
          <p className="text-muted-foreground mt-2">Configure your agent's settings and behavior</p>
        </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Set up the fundamental details of your agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter agent name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter agent description"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tools & Capabilities</CardTitle>
            <CardDescription>
              Select the tools your agent can use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {agent.tools.map((tool) => (
                <div
                  key={tool}
                  className="px-3 py-1 bg-secondary rounded-md text-sm"
                >
                  {tool}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
            <CardDescription>
              Define how your agent should behave and respond
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter system instructions for your agent..."
              rows={8}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
      </div>
    </div>
  )
}

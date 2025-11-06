"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Copy, ExternalLink, Store, Share2 } from "lucide-react"

// Mock data for published marketplaces
const initialPublishedMarketplaces = [
  {
    id: "1",
    name: "Claude Marketplace",
    url: "https://marketplace.claude.com/agent/123"
  },
  {
    id: "2",
    name: "OpenAI Store",
    url: "https://openai.com/store/agent/123"
  },
]

const categories = [
  "Productivity",
  "Customer Support",
  "Education",
  "Healthcare",
  "Finance",
  "E-commerce",
  "Entertainment",
  "Other"
]

const availableMarketplaces = [
  "Claude Marketplace",
  "OpenAI Store",
  "Anthropic Hub",
  "Custom Marketplace"
]

export default function MarketplaceConfigPage() {
  const params = useParams()
  const router = useRouter()
  const agentId = params.id as string

  // Section 1: Published marketplaces
  const [publishedMarketplaces, setPublishedMarketplaces] = useState(initialPublishedMarketplaces)
  const [currentPage, setCurrentPage] = useState(1)

  // Section 2: Agent profile
  const [description, setDescription] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [images, setImages] = useState<File[]>([])

  // Section 3: Monetization
  const [privateAccessMode, setPrivateAccessMode] = useState<"free" | "paid">("free")
  const [sessionLimit, setSessionLimit] = useState("")
  const [privateDeveloperMargin, setPrivateDeveloperMargin] = useState("")

  const [marketplaceEnabled, setMarketplaceEnabled] = useState(false)
  const [selectedMarketplace, setSelectedMarketplace] = useState("")
  const [marketplaceDeveloperMargin, setMarketplaceDeveloperMargin] = useState("")

  const itemsPerPage = 7
  const totalPages = Math.ceil(publishedMarketplaces.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMarketplaces = publishedMarketplaces.slice(startIndex, endIndex)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const openInNewTab = (url: string) => {
    window.open(url, '_blank')
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
        <Store className="h-8 w-8 text-gray-700 mb-2" />
        <h1 className="text-3xl font-bold">Marketplace</h1>
      </div>

      <div className="space-y-16 flex flex-col items-center">
        {/* Section 1: Published Marketplaces */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Marketplaces where your Agent is published:</h2>
          <Card className="py-0 gap-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[50%] pl-6 h-12">Marketplace</TableHead>
                    <TableHead className="w-[50%] h-12">Share Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMarketplaces.map((marketplace) => (
                    <TableRow key={marketplace.id}>
                      <TableCell className="pl-6">
                        <button
                          onClick={() => openInNewTab(marketplace.url)}
                          className="group flex items-center gap-2 hover:text-primary transition-colors"
                        >
                          <span>{marketplace.name}</span>
                          <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(marketplace.url)}
                          className="gap-2 rounded-xl"
                        >
                          <Share2 className="h-4 w-4" />
                          Copy/Share
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center gap-2 mt-4 p-4">
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

        {/* Section 2: Build Agent Profile */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Build your Agent's profile</h2>
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what your agent does..."
                  className="rounded-xl min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Images</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setImages(Array.from(e.target.files))
                    }
                  }}
                  className="rounded-xl"
                />
                {images.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {images.length} image{images.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="categories">Categories</Label>
                <Select onValueChange={(value) => {
                  if (!selectedCategories.includes(value)) {
                    setSelectedCategories([...selectedCategories, value])
                  }
                }}>
                  <SelectTrigger className="rounded-xl w-full">
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((category) => (
                      <div
                        key={category}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {category}
                        <button
                          onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                          className="hover:text-primary/70"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button className="w-full rounded-xl">
                Save
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Monetize Agent */}
        <div className="w-full space-y-4">
          <h2 className="text-base font-semibold">Monetize your Agent</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Private Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Private Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="accessMode">Access Mode</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className={privateAccessMode === "free" ? "font-semibold" : "text-muted-foreground"}>
                        Free
                      </span>
                      <Switch
                        checked={privateAccessMode === "paid"}
                        onCheckedChange={(checked) => setPrivateAccessMode(checked ? "paid" : "free")}
                      />
                      <span className={privateAccessMode === "paid" ? "font-semibold" : "text-muted-foreground"}>
                        Paid
                      </span>
                    </div>
                  </div>
                </div>

                {privateAccessMode === "free" ? (
                  <div className="space-y-2">
                    <Label htmlFor="sessionLimit">Session Limit (tokens per conversation per user)</Label>
                    <Input
                      id="sessionLimit"
                      type="number"
                      value={sessionLimit}
                      onChange={(e) => setSessionLimit(e.target.value)}
                      placeholder="e.g., 10000"
                      className="rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="privateDeveloperMargin">Developer Margin (%)</Label>
                    <Input
                      id="privateDeveloperMargin"
                      type="number"
                      value={privateDeveloperMargin}
                      onChange={(e) => setPrivateDeveloperMargin(e.target.value)}
                      placeholder="e.g., 20"
                      min="0"
                      max="100"
                      className="rounded-xl"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Marketplace Agent Card */}
            <Card className={!marketplaceEnabled ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Marketplace Agent</CardTitle>
                  <Switch
                    checked={marketplaceEnabled}
                    onCheckedChange={setMarketplaceEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="marketplace">Select Marketplace</Label>
                  <Select
                    value={selectedMarketplace}
                    onValueChange={setSelectedMarketplace}
                    disabled={!marketplaceEnabled}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Choose a marketplace" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMarketplaces.map((marketplace) => (
                        <SelectItem key={marketplace} value={marketplace}>
                          {marketplace}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketplaceDeveloperMargin">Developer Margin (%)</Label>
                  <Input
                    id="marketplaceDeveloperMargin"
                    type="number"
                    value={marketplaceDeveloperMargin}
                    onChange={(e) => setMarketplaceDeveloperMargin(e.target.value)}
                    placeholder="e.g., 20"
                    min="0"
                    max="100"
                    className="rounded-xl"
                    disabled={!marketplaceEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

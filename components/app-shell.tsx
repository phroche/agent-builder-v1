"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"

export function AppShell({ children, active }: { children: React.ReactNode; active?: string }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} active={active} />
      <main className={cn("flex-1 min-w-0 transition-[margin] duration-200", collapsed ? "ml-16" : "ml-64")}>
        {children}
      </main>
    </div>
  )
}

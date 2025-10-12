"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Coins,
  Home,
  KeyRound,
  Rocket,
  Settings,
  ShoppingCart,
  User2,
  Wrench,
} from "lucide-react"

type NavItem = {
  label: string
  href?: string
  icon: React.ReactNode
  disabled?: boolean
}

export function Sidebar({
  collapsed,
  onToggle,
  active,
}: {
  collapsed: boolean
  onToggle: () => void
  active?: string
}) {
  const pathname = usePathname()

  const topItems: NavItem[] = [
    { label: "Dashboard", href: "/", icon: <Home className="size-4" /> },
    { label: "My Agents", href: "/agents", icon: <Bot className="size-4" /> },
    { label: "Tools", href: "/tools", icon: <Wrench className="size-4" /> },
  ]

  const bottomItems: NavItem[] = [
    { label: "Wallet & Earnings", href: "/wallet", icon: <Coins className="size-4" /> },
    { label: "API Keys", href: "/api-keys", icon: <KeyRound className="size-4" /> },
    { label: "Community", href: "/community", icon: <User2 className="size-4" /> },
    { label: "Coming Soon", icon: <Rocket className="size-4" />, disabled: true },
  ]

  const isActive = (href?: string, key?: string) => {
    if (!href) return false
    if (key) return key === active
    return pathname === href
  }

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        collapsed ? "w-16" : "w-64",
      )}
      aria-label="Primary"
    >
      <div className="flex h-14 items-center justify-between px-2">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent",
            collapsed ? "justify-center w-full" : "",
          )}
          aria-label="Company Home"
        >
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold">
            A
          </div>
          {!collapsed && <span className="font-semibold text-sm">AgentBuilder</span>}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(collapsed ? "mx-auto" : "")}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </Button>
      </div>

      {/* Top Group */}
      <nav className="px-2 pt-2">
        <ul className="space-y-1">
          {topItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href ?? "#"}
                className={cn(
                  "flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  (isActive(item.href, item.label) || active === item.label) &&
                    "bg-sidebar-accent text-sidebar-accent-foreground",
                  collapsed && "justify-center",
                )}
                aria-disabled={item.disabled}
              >
                {item.icon}
                {!collapsed && <span className="text-pretty">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Group */}
      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2">
        <nav>
          <ul className="space-y-1">
            {bottomItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href ?? "#"}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive(item.href, item.label) && "bg-sidebar-accent text-sidebar-accent-foreground",
                    item.disabled && "opacity-50 pointer-events-none",
                    collapsed && "justify-center",
                  )}
                  aria-disabled={item.disabled}
                >
                  {item.icon}
                  {!collapsed && <span className="text-pretty">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Card with Dropdown */}
        <div className="mt-2 rounded-md bg-card text-card-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-muted",
                  collapsed && "justify-center",
                )}
                aria-haspopup="menu"
                aria-label="User menu"
              >
                <Avatar className="size-7">
                  <AvatarImage src="/user-avatar.jpg" alt="User avatar" />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">Alex Johnson</div>
                    <div className="truncate text-xs text-muted-foreground">alex.johnson@example.com</div>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src="/user-avatar.jpg" alt="User avatar" />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">Alex Johnson</div>
                  <div className="truncate text-xs text-muted-foreground">alex.johnson@example.com</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/pricing" className="flex items-center gap-2">
                  <ShoppingCart className="size-4" /> Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="size-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="flex items-center gap-2">
                  <CircleHelp className="size-4" /> Help Center
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  /* sign out handler placeholder */
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}

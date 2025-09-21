"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"
import { Home, Brain, GraduationCap, Users, Trophy, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsed)

  useEffect(() => {
    setIsCollapsed(collapsed)
  }, [collapsed])

  const toggle = () => {
    const next = !isCollapsed
    setIsCollapsed(next)
    onToggle?.()
  }

  const navigationItems = [
    { id: "dashboard", name: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "career-explorer", name: "Career Explorer", icon: Brain, href: "/career-explorer" },
    { id: "quiz", name: "Career Quiz", icon: FileQuestion, href: "/quiz" },
    { id: "colleges", name: "College Directory", icon: GraduationCap, href: "/colleges" },
    { id: "mentorship", name: "Mentorship & Experts", icon: Users, href: "/mentorship" },
    { id: "scholarships", name: "Scholarships & Exams", icon: Trophy, href: "/scholarships" },
  ]

  const accountItems = [
    { id: "settings", name: "Settings", icon: Settings, href: "/settings" },
    { id: "signout", name: "Sign Out", icon: LogOut, href: "/auth" },
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-full glass-nav transition-[width] duration-300 ease-in-out z-40 ${isCollapsed ? "w-16" : "w-64"}`}
    >
      <div className={`flex flex-col h-full ${isCollapsed ? "p-2" : "p-4"}`}>
        {/* Logo Section */}
        <div className={`flex items-center justify-between ${isCollapsed ? "mb-4 px-1" : "mb-8"}`}>
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-foreground">ASPIRE</span>
            </div>
          )}

          <Button variant="ghost" size="icon" onClick={toggle} className="hover:bg-primary/10">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1">
          <div className={`${isCollapsed ? "space-y-1" : "space-y-2"}`}>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href

              const linkBase = isCollapsed ? "w-full flex justify-center" : "flex items-center space-x-3"
              const linkPadding = isCollapsed ? "py-0.5" : "px-3 py-2"
              const activeBase = isActive ? (isCollapsed ? "text-primary" : "bg-primary/20 text-primary") : "text-foreground/70 hover:text-primary"

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    // if collapsed, expand instead of navigating (smooth expand on first click)
                    if (isCollapsed) {
                      e.preventDefault()
                      setIsCollapsed(false)
                      onToggle?.()
                    }
                  }}
                  className={`${linkBase} ${linkPadding} rounded-lg transition-all duration-150 group ${activeBase} ${!isActive && !isCollapsed ? "hover:bg-primary/10" : ""}`}
                >
                  <div
                    className={
                      isCollapsed
                        ? `flex items-center justify-center h-8 w-8 rounded-full transition-colors ${isActive ? "bg-primary/10" : "group-hover:bg-primary/5"}`
                        : "flex-shrink-0"
                    }
                  >
                    <item.icon className={` ${isCollapsed ? "h-4 w-4" : "h-5 w-5"} ${isActive && !isCollapsed ? "text-primary" : ""}`} />
                  </div>

                  {/* keep label small even when expanded */}
                  {!isCollapsed && (
                    <span className="font-medium text-sm">
                      {item.name}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Account Section */}
        <div className={`border-t border-border/20 pt-4 ${isCollapsed ? "mt-2" : ""}`}>
          <div className={`${isCollapsed ? "space-y-1" : "space-y-2"}`}>
            {accountItems.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    if (isCollapsed) {
                      e.preventDefault()
                      setIsCollapsed(false)
                      onToggle?.()
                    }
                  }}
                  className={`${isCollapsed ? "w-full flex justify-center" : "flex items-center space-x-3"} ${isCollapsed ? "py-0.5" : "px-3 py-2"} rounded-lg transition-all duration-150 text-foreground/70 hover:text-primary ${!isCollapsed ? "hover:bg-primary/10" : ""}`}
                >
                  <div className={isCollapsed ? "flex items-center justify-center h-8 w-8 rounded-full group-hover:bg-primary/5" : "flex-shrink-0"}>
                    <item.icon className={`${isCollapsed ? "h-4 w-4" : "h-5 w-5"}`} />
                  </div>
                  {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
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
      className={`fixed left-0 top-0 h-full glass-nav transition-all duration-300 z-40 ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-foreground">ASPIRE</span>
            </div>
          )}

          <Button variant="ghost" size="icon" onClick={onToggle} className="hover:bg-primary/10">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-foreground/70 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Account Section */}
        <div className="border-t border-border/20 pt-4">
          <div className="space-y-2">
            {accountItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 text-foreground/70 hover:bg-primary/10 hover:text-primary"
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

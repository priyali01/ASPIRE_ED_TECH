"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHero } from "@/components/dashboard/dashboard-hero"
import { QuickLinks } from "@/components/dashboard/quick-links"
import { GamificationWidget } from "@/components/dashboard/gamification-widget"
import { EventsCarousel } from "@/components/dashboard/events-carousel"
import { AIMentorFAB } from "@/components/dashboard/ai-mentor-fab"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Mock user data - in real app this would come from authentication
  const userData = {
    name: "Arjun Kumar",
    hasCompletedAptitude: true, // Change to false to see pre-aptitude state
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} p-6`}>
        <div className="max-w-7xl mx-auto">
          <DashboardHero userName={userData.name} hasCompletedAptitude={userData.hasCompletedAptitude} />

          <QuickLinks />

          <GamificationWidget />

          <EventsCarousel />
        </div>
      </main>

      <AIMentorFAB />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { CareerSearch } from "@/components/career-explorer/career-search"
import { AIRecommendations } from "@/components/career-explorer/ai-recommendations"
import { CareerCategories } from "@/components/career-explorer/career-categories"
import { CareerDetailModal } from "@/components/career-explorer/career-detail-modal"

export default function CareerExplorerPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Implement search logic here
  }

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters)
    // Implement filter logic here
  }

  const mockCareer = {
    id: 1,
    title: "Software Engineer",
    description: "Design and develop software applications using various programming languages and frameworks.",
    image: "/software-engineer-workspace.jpg",
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} p-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Career Explorer</h1>
            <p className="text-muted-foreground text-lg">
              Discover your perfect career path with AI-powered recommendations and detailed insights.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <CareerSearch onSearch={handleSearch} onFilterChange={handleFilterChange} />
          </div>

          {/* AI Recommendations */}
          <AIRecommendations />

          {/* Career Categories */}
          <CareerCategories />

          {/* Additional Content Section */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Still Exploring? Let Our AI Help You</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Take our comprehensive career assessment to get personalized recommendations based on your interests,
              skills, and personality.
            </p>
            <button
              onClick={() => setSelectedCareer(mockCareer)}
              className="gradient-cta text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View Sample Career Details
            </button>
          </div>
        </div>
      </main>

      {/* Career Detail Modal */}
      <CareerDetailModal career={mockCareer} isOpen={!!selectedCareer} onClose={() => setSelectedCareer(null)} />
    </div>
  )
}

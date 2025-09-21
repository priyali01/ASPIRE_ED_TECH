"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ScholarshipSearch } from "@/components/scholarships/scholarship-search"
import { ScholarshipCard } from "@/components/scholarships/scholarship-card"
import { ExamCalendar } from "@/components/scholarships/exam-calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const scholarships = [
  {
    id: "1",
    title: "Prime Minister's Scholarship Scheme",
    provider: "Government of India",
    amount: "₹2,50,000",
    deadline: "2024-03-30",
    category: "Merit-Based",
    eligibility: ["12th Pass", "Minimum 85%", "Indian Citizen"],
    description:
      "A prestigious scholarship for meritorious students pursuing higher education in engineering, medicine, and other professional courses.",
    applicants: 45000,
    image: "/government-scholarship-building.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Kishore Vaigyanik Protsahan Yojana",
    provider: "Indian Institute of Science",
    amount: "₹7,000/month",
    deadline: "2024-04-15",
    category: "Research",
    eligibility: ["Science Stream", "Research Interest", "Age < 25"],
    description: "Fellowship program to encourage students to pursue research careers in basic sciences.",
    applicants: 12000,
    image: "/science-research-laboratory.jpg",
  },
  {
    id: "3",
    title: "Inspire Scholarship",
    provider: "Department of Science & Technology",
    amount: "₹80,000/year",
    deadline: "2024-05-20",
    category: "Merit-Based",
    eligibility: ["Top 1% in 12th", "Science/Math", "Pursuing BSc/BTech"],
    description: "Scholarship to attract talented students to study science and pursue research careers.",
    applicants: 25000,
    image: "/placeholder-7iiv8.png",
  },
  {
    id: "4",
    title: "National Talent Search Examination",
    provider: "NCERT",
    amount: "₹1,250/month",
    deadline: "2024-02-28",
    category: "Merit-Based",
    eligibility: ["Class X Pass", "Age < 18", "Indian Citizen"],
    description: "Scholarship for intellectually gifted students to pursue higher education.",
    applicants: 350000,
    image: "/placeholder-o7f0a.png",
  },
  {
    id: "5",
    title: "Minority Scholarship Scheme",
    provider: "Ministry of Minority Affairs",
    amount: "₹20,000/year",
    deadline: "2024-06-30",
    category: "Need-Based",
    eligibility: ["Minority Community", "Family Income < 2.5L", "Merit 50%+"],
    description: "Financial assistance for students from minority communities to pursue higher education.",
    applicants: 180000,
    image: "/diverse-students-studying.png",
  },
  {
    id: "6",
    title: "Sports Scholarship Program",
    provider: "Sports Authority of India",
    amount: "₹1,50,000",
    deadline: "2024-07-15",
    category: "Sports",
    eligibility: ["State Level Player", "Age < 25", "Pursuing Education"],
    description: "Support for talented athletes to balance sports and education.",
    applicants: 8000,
    image: "/athletes-training-sports.jpg",
  },
]

export default function ScholarshipsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>({})
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterScholarships(query, activeFilters)
  }

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters)
    filterScholarships(searchQuery, filters)
  }

  const filterScholarships = (query: string, filters: any) => {
    let filtered = scholarships

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (scholarship) =>
          scholarship.title.toLowerCase().includes(query.toLowerCase()) ||
          scholarship.provider.toLowerCase().includes(query.toLowerCase()) ||
          scholarship.description.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Category filter
    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((scholarship) =>
        scholarship.category.toLowerCase().includes(filters.category.toLowerCase())
      )
    }

    // Amount filter
    if (filters.amount && filters.amount !== "all") {
      filtered = filtered.filter((scholarship) => {
        const amount = scholarship.amount
        switch (filters.amount) {
          case "under-50k":
            return amount.includes("month") || parseInt(amount.replace(/[^\d]/g, "")) < 50000
          case "50k-1l":
            const num = parseInt(amount.replace(/[^\d]/g, ""))
            return num >= 50000 && num <= 100000
          case "1l-5l":
            const num2 = parseInt(amount.replace(/[^\d]/g, ""))
            return num2 >= 100000 && num2 <= 500000
          case "above-5l":
            const num3 = parseInt(amount.replace(/[^\d]/g, ""))
            return num3 > 500000
          default:
            return true
        }
      })
    }

    // Deadline filter
    if (filters.deadline && filters.deadline !== "all") {
      const now = new Date()
      filtered = filtered.filter((scholarship) => {
        const deadline = new Date(scholarship.deadline)
        switch (filters.deadline) {
          case "this-month":
            return deadline.getMonth() === now.getMonth() && deadline.getFullYear() === now.getFullYear()
          case "next-month":
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1)
            return deadline.getMonth() === nextMonth.getMonth() && deadline.getFullYear() === nextMonth.getFullYear()
          case "this-quarter":
            const quarter = Math.floor(now.getMonth() / 3)
            return Math.floor(deadline.getMonth() / 3) === quarter && deadline.getFullYear() === now.getFullYear()
          case "this-year":
            return deadline.getFullYear() === now.getFullYear()
          default:
            return true
        }
      })
    }

    setFilteredScholarships(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} p-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Scholarships & Exams Hub</h1>
            <p className="text-muted-foreground text-lg">
              Discover funding opportunities and track important examination dates to fuel your educational journey
            </p>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="scholarships" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto glass-card">
              <TabsTrigger
                value="scholarships"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Scholarships
              </TabsTrigger>
              <TabsTrigger
                value="exams"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Exam Calendar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scholarships" className="space-y-8">
              {/* Search and Filters */}
              <div className="max-w-4xl mx-auto">
                <ScholarshipSearch onSearch={handleSearch} onFilterChange={handleFilterChange} />
              </div>

              {/* Results Count */}
              <div className="text-center">
                <p className="text-muted-foreground">
                  Showing {filteredScholarships.length} of {scholarships.length} scholarships
                </p>
              </div>

              {/* Scholarship Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredScholarships.map((scholarship) => (
                  <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                ))}
              </div>

              {/* No Results */}
              {filteredScholarships.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No scholarships found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setActiveFilters({})
                      setFilteredScholarships(scholarships)
                    }}
                    className="mt-4 gradient-cta text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Load More */}
              {filteredScholarships.length > 0 && (
                <div className="text-center">
                  <button className="gradient-cta text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Load More Scholarships
                  </button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="exams">
              <ExamCalendar />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

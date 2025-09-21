"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StateLeaderboard } from "@/components/colleges/state-leaderboard"
import { CollegeFilters } from "@/components/colleges/college-filters"
import { CollegeCard } from "@/components/colleges/college-card"
import { CollegeMap } from "@/components/colleges/college-map"
import { ComparisonTray } from "@/components/colleges/comparison-tray"

// ---------------------- mockColleges ----------------------
const mockColleges = [
  // Jammu & Kashmir
  {
    id: 1,
    name: "NIT Srinagar",
    location: "Srinagar",
    state: "Jammu & Kashmir",
    rank: 1,
    naacGrade: "A+",
    type: "Government",
    establishedYear: 1960,
    courses: ["Computer Science", "Electronics", "Mechanical", "Civil"],
    fees: {
      engineering: "₹1.5 LPA",
      medical: "N/A",
      management: "N/A",
    },
    placements: {
      averagePackage: "₹12 LPA",
      medianPackage: "₹10 LPA",
      topPackage: "₹45 LPA",
    },
    cutoffs: {
      jeeMain: 15000,
      neet: 0,
    },
    facilities: ["Hostel", "Library", "Sports", "Labs", "WiFi", "Canteen"],
    image: "/diverse-students-studying.png",
  },
  {
    id: 2,
    name: "University of Kashmir",
    location: "Srinagar",
    state: "Jammu & Kashmir",
    rank: 2,
    naacGrade: "A",
    type: "Government",
    establishedYear: 1948,
    courses: ["Medicine", "Engineering", "Arts", "Science"],
    fees: {
      engineering: "₹80,000",
      medical: "₹1.2 LPA",
      management: "₹60,000",
    },
    placements: {
      averagePackage: "₹8 LPA",
      medianPackage: "₹6 LPA",
      topPackage: "₹25 LPA",
    },
    cutoffs: {
      jeeMain: 25000,
      neet: 15000,
    },
    facilities: ["Hostel", "Library", "Sports", "Medical Center", "WiFi"],
    image: "/science-research-laboratory.jpg",
  },
  {
    id: 3,
    name: "SMVD University",
    location: "Katra",
    state: "Jammu & Kashmir",
    rank: 3,
    naacGrade: "A",
    type: "Government",
    establishedYear: 1999,
    courses: ["Engineering", "Management", "Pharmacy", "Architecture"],
    fees: {
      engineering: "₹1.2 LPA",
      medical: "N/A",
      management: "₹1.5 LPA",
    },
    placements: {
      averagePackage: "₹9 LPA",
      medianPackage: "₹7 LPA",
      topPackage: "₹30 LPA",
    },
    cutoffs: {
      jeeMain: 30000,
      neet: 0,
    },
    facilities: ["Hostel", "Library", "Labs", "Transport", "WiFi", "Canteen"],
    image: "/government-scholarship-building.jpg",
  },

  // Maharashtra
  {
    id: 4,
    name: "IIT Bombay",
    location: "Mumbai",
    state: "Maharashtra",
    rank: 1,
    naacGrade: "A++",
    type: "Government",
    establishedYear: 1958,
    courses: ["Computer Science", "Mechanical", "Electrical", "Civil", "Aerospace"],
    fees: {
      engineering: "₹2 LPA",
      medical: "N/A",
      management: "₹1.8 LPA",
    },
    placements: {
      averagePackage: "₹20 LPA",
      medianPackage: "₹18 LPA",
      topPackage: "₹1.8 Cr",
    },
    cutoffs: {
      jeeMain: 500,
      neet: 0,
    },
    facilities: ["Hostel", "Library", "Sports", "Labs", "WiFi", "Canteen", "Incubation Center"],
    image: "/iit-bombay.jpg",
  },
  {
    id: 5,
    name: "COEP Technological University",
    location: "Pune",
    state: "Maharashtra",
    rank: 2,
    naacGrade: "A+",
    type: "Government",
    establishedYear: 1854,
    courses: ["Computer Science", "Mechanical", "Civil", "Electronics", "Electrical"],
    fees: {
      engineering: "₹90,000",
      medical: "N/A",
      management: "N/A",
    },
    placements: {
      averagePackage: "₹8 LPA",
      medianPackage: "₹7 LPA",
      topPackage: "₹36 LPA",
    },
    cutoffs: {
      jeeMain: 15000,
      neet: 0,
    },
    facilities: ["Hostel", "Library", "Sports", "Labs", "WiFi"],
    image: "/coep.jpg",
  },
  {
    id: 6,
    name: "TISS Mumbai",
    location: "Mumbai",
    state: "Maharashtra",
    rank: 3,
    naacGrade: "A",
    type: "Government",
    establishedYear: 1936,
    courses: ["Management", "Social Sciences", "Law", "Arts"],
    fees: {
      engineering: "N/A",
      medical: "N/A",
      management: "₹1 LPA",
    },
    placements: {
      averagePackage: "₹10 LPA",
      medianPackage: "₹8 LPA",
      topPackage: "₹25 LPA",
    },
    cutoffs: {
      jeeMain: 0,
      neet: 0,
    },
    facilities: ["Hostel", "Library", "WiFi", "Sports"],
    image: "/tiss-mumbai.jpg",
  },

  // Delhi
  {
    id: 7,
    name: "IIT Delhi",
    location: "New Delhi",
    state: "Delhi",
    rank: 1,
    naacGrade: "A++",
    type: "Government",
    establishedYear: 1961,
    courses: ["Computer Science", "Mechanical", "Civil", "Electrical", "Chemical"],
    fees: {
      engineering: "₹2 LPA",
      medical: "N/A",
      management: "₹1.5 LPA",
    },
    placements: {
      averagePackage: "₹22 LPA",
      medianPackage: "₹19 LPA",
      topPackage: "₹2 Cr",
    },
    cutoffs: {
      jeeMain: 700,
      neet: 0,
    },
    facilities: ["Hostel", "Library", "Sports", "Labs", "WiFi", "Canteen"],
    image: "/iit-delhi.jpg",
  },
  {
    id: 8,
    name: "Delhi University (DU)",
    location: "New Delhi",
    state: "Delhi",
    rank: 2,
    naacGrade: "A+",
    type: "Government",
    establishedYear: 1922,
    courses: ["Arts", "Science", "Commerce", "Law", "Management"],
    fees: {
      engineering: "₹50,000",
      medical: "₹1 LPA",
      management: "₹70,000",
    },
    placements: {
      averagePackage: "₹7 LPA",
      medianPackage: "₹5 LPA",
      topPackage: "₹20 LPA",
    },
    cutoffs: {
      jeeMain: 0,
      neet: 0,
    },
    facilities: ["Hostel", "Library", "Sports", "Canteen", "WiFi"],
    image: "/delhi-university.jpg",
  },
  {
    id: 9,
    name: "AIIMS Delhi",
    location: "New Delhi",
    state: "Delhi",
    rank: 3,
    naacGrade: "A++",
    type: "Government",
    establishedYear: 1956,
    courses: ["Medicine", "MBBS", "BDS", "Pharmacy", "Nursing"],
    fees: {
      engineering: "N/A",
      medical: "₹5,000",
      management: "N/A",
    },
    placements: {
      averagePackage: "₹15 LPA",
      medianPackage: "₹12 LPA",
      topPackage: "₹30 LPA",
    },
    cutoffs: {
      jeeMain: 0,
      neet: 50,
    },
    facilities: ["Hostel", "Library", "Labs", "Medical Center", "WiFi"],
    image: "/aiims-delhi.jpg",
  },
]

// ---------------------- Component ----------------------
export default function CollegesPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [savedColleges, setSavedColleges] = useState<number[]>([])
  const [comparisonList, setComparisonList] = useState<any[]>([])
  const [selectedMapCollege, setSelectedMapCollege] = useState<number>()
  const [filteredColleges, setFilteredColleges] = useState(mockColleges)
  const [activeFilters, setActiveFilters] = useState<any>({})

  const handleSaveCollege = (collegeId: number) => {
    setSavedColleges((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId],
    )
  }

  const handleCompareCollege = (collegeId: number) => {
    const college = mockColleges.find((c) => c.id === collegeId)
    if (!college) return

    setComparisonList((prev) => {
      const isAlreadyInList = prev.some((c) => c.id === collegeId)
      if (isAlreadyInList) {
        return prev.filter((c) => c.id !== collegeId)
      } else if (prev.length < 3) {
        return [...prev, college]
      }
      return prev
    })
  }

  const handleFiltersChange = (filters: any) => {
    setActiveFilters(filters)
    filterColleges(filters)
  }

  const filterColleges = (filters: any) => {
    let filtered = mockColleges

    // Search filter (keeps current behavior)
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(q) ||
          college.location.toLowerCase().includes(q) ||
          college.state.toLowerCase().includes(q) ||
          college.courses.some((course) => course.toLowerCase().includes(q)),
      )
    }

    // State filter (NEW) - supports string or array of states
    if (filters.state) {
      if (Array.isArray(filters.state) && filters.state.length > 0) {
        const stateSet = new Set(filters.state.map((s: string) => s.toLowerCase()))
        filtered = filtered.filter((college) => stateSet.has(college.state.toLowerCase()))
      } else if (typeof filters.state === "string") {
        const s = filters.state.trim().toLowerCase()
        if (s !== "" && s !== "all") {
          // exact match OR includes for partial selections (e.g., "jammu" matches "Jammu & Kashmir")
          filtered = filtered.filter(
            (college) =>
              college.state.toLowerCase() === s || college.state.toLowerCase().includes(s),
          )
        }
      }
    }

    // Degree type filter
    if (filters.degreeType && filters.degreeType.length > 0) {
      filtered = filtered.filter((college) => {
        return filters.degreeType.some((type: string) => {
          switch (type.toLowerCase()) {
            case "engineering":
              return college.courses.some((course) =>
                ["Computer Science", "Mechanical", "Electronics", "Civil", "Electrical"].includes(course),
              )
            case "medical":
              return college.courses.some((course) => ["Medicine", "MBBS", "BDS"].includes(course))
            case "management":
              return college.courses.some((course) => ["Management", "MBA", "Business"].includes(course))
            default:
              return true
          }
        })
      })
    }

    // Facilities filter
    if (filters.facilities && filters.facilities.length > 0) {
      filtered = filtered.filter((college) =>
        filters.facilities.every((facility: string) => college.facilities.includes(facility)),
      )
    }

    // Fees range filter
    if (filters.feesRange && filters.feesRange.length === 2) {
      filtered = filtered.filter((college) => {
        const engineeringFee = parseInt(college.fees.engineering.replace(/[^\d]/g, "")) || 0
        return engineeringFee >= filters.feesRange[0] && engineeringFee <= filters.feesRange[1]
      })
    }

    setFilteredColleges(filtered)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} p-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">College Directory & Rankings</h1>
            <p className="text-muted-foreground text-lg">
              Discover and compare top colleges across India with detailed insights and rankings.
            </p>
          </div>

          {/* State Leaderboard - now receives filteredColleges so it updates with filters */}
          <StateLeaderboard colleges={filteredColleges} />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Filters - Left Column */}
            <div className="lg:col-span-3">
              <CollegeFilters onFiltersChange={handleFiltersChange} />
            </div>

            {/* College Cards - Center Column */}
            <div className="lg:col-span-6">
              <div className="space-y-6">
                {/* Results Count */}
                <div className="mb-4">
                  <p className="text-muted-foreground">
                    Showing {filteredColleges.length} of {mockColleges.length} colleges
                  </p>
                </div>

                {/* AI Recommendations */}
                {filteredColleges.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-foreground mb-4">Top Matches for You</h2>
                    <div className="grid gap-6">
                      {filteredColleges.slice(0, 2).map((college) => (
                        <CollegeCard
                          key={college.id}
                          college={college}
                          onSave={handleSaveCollege}
                          onCompare={handleCompareCollege}
                          onViewDetails={(id) => console.log("View details:", id)}
                          isSaved={savedColleges.includes(college.id)}
                          isInComparison={comparisonList.some((c) => c.id === college.id)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Colleges */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {Object.keys(activeFilters).length > 0 ? "Filtered Results" : "All Colleges"}
                  </h2>

                  {filteredColleges.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">No colleges found matching your criteria.</p>
                      <button
                        onClick={() => {
                          setActiveFilters({})
                          setFilteredColleges(mockColleges)
                        }}
                        className="mt-4 gradient-cta text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {filteredColleges.map((college) => (
                        <CollegeCard
                          key={college.id}
                          college={college}
                          onSave={handleSaveCollege}
                          onCompare={handleCompareCollege}
                          onViewDetails={(id) => console.log("View details:", id)}
                          isSaved={savedColleges.includes(college.id)}
                          isInComparison={comparisonList.some((c) => c.id === college.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map - Right Column (now uses filteredColleges so it shows only current results) */}
            <div className="lg:col-span-3">
              <CollegeMap
                colleges={filteredColleges}
                selectedCollege={selectedMapCollege}
                onCollegeSelect={setSelectedMapCollege}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Comparison Tray */}
      <ComparisonTray
        colleges={comparisonList}
        onRemove={(id) => setComparisonList((prev) => prev.filter((c) => c.id !== id))}
        onCompare={() => console.log("Compare colleges:", comparisonList)}
        onClear={() => setComparisonList([])}
      />
    </div>
  )
}

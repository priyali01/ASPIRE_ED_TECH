"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"

interface CollegeFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function CollegeFilters({ onFiltersChange }: CollegeFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>({
    degreeType: [],
    facilities: [],
    feesRange: [0, 500000],
    entranceExams: [],
    courses: [],
  })

  // Debounced search function
  const debouncedApplyFilters = useCallback(
    debounce((filters: any) => {
      onFiltersChange(filters)
    }, 300),
    [onFiltersChange]
  )

  // Debounce utility function
  function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }) as T
  }

  const filterOptions = {
    degreeType: ["Engineering", "Medical", "Management", "Arts", "Science", "Law", "Pharmacy"],
    facilities: ["Hostel", "Library", "Sports", "Labs", "WiFi", "Canteen", "Transport"],
    entranceExams: ["JEE Main", "JEE Advanced", "NEET", "CUET", "CAT", "CLAT", "GATE"],
    courses: ["Computer Science", "Mechanical", "Electronics", "Civil", "MBBS", "BDS", "MBA"],
  }

  const toggleFilter = (category: string, value: string) => {
    const newFilters = {
      ...activeFilters,
      [category]: activeFilters[category].includes(value)
        ? activeFilters[category].filter((item: string) => item !== value)
        : [...activeFilters[category], value],
    }
    setActiveFilters(newFilters)
    debouncedApplyFilters({ ...newFilters, searchQuery })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    debouncedApplyFilters({ ...activeFilters, searchQuery: query })
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      degreeType: [],
      facilities: [],
      feesRange: [0, 500000],
      entranceExams: [],
      courses: [],
    }
    setActiveFilters(clearedFilters)
    setSearchQuery("")
    onFiltersChange({ ...clearedFilters, searchQuery: "" })
  }

  const applyFilters = () => {
    onFiltersChange({ ...activeFilters, searchQuery })
  }

  return (
    <Card className="glass-card p-6 h-fit sticky top-6">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search colleges, courses, or city..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Active Filters */}
      {Object.values(activeFilters).some((arr: any) => arr.length > 0) && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Active Filters</span>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-primary">
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([category, values]: [string, any]) =>
              values.map((value: string) => (
                <Badge key={`${category}-${value}`} variant="secondary" className="flex items-center space-x-1">
                  <span>{value}</span>
                  <button onClick={() => toggleFilter(category, value)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )),
            )}
          </div>
        </div>
      )}

      {/* Degree Type */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Degree Type</h3>
        <div className="space-y-2">
          {filterOptions.degreeType.map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.degreeType.includes(type)}
                onChange={() => toggleFilter("degreeType", type)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fees Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Annual Fees Range</h3>
        <div className="px-2">
          <Slider
            value={activeFilters.feesRange}
            onValueChange={(value) => setActiveFilters((prev: any) => ({ ...prev, feesRange: value }))}
            max={500000}
            step={10000}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{activeFilters.feesRange[0].toLocaleString()}</span>
            <span>₹{activeFilters.feesRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Facilities</h3>
        <div className="grid grid-cols-2 gap-2">
          {filterOptions.facilities.map((facility) => (
            <label key={facility} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.facilities.includes(facility)}
                onChange={() => toggleFilter("facilities", facility)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-xs text-foreground">{facility}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Entrance Exams */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Entrance Exams</h3>
        <div className="space-y-2">
          {filterOptions.entranceExams.map((exam) => (
            <label key={exam} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.entranceExams.includes(exam)}
                onChange={() => toggleFilter("entranceExams", exam)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">{exam}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <Button onClick={applyFilters} className="w-full gradient-cta text-white hover:opacity-90">
        Apply Filters
      </Button>
    </Card>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ScholarshipSearchProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: any) => void
}

export function ScholarshipSearch({ onSearch, onFilterChange }: ScholarshipSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    amount: "all",
    deadline: "all",
    eligibility: "all",
  })

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query)
    }, 300),
    [onSearch]
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    debouncedSearch(query)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Debounce utility function
  function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }) as T
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search scholarships, exams, or opportunities..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-background/30 backdrop-blur-sm rounded-lg border border-primary/20 p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-2 block">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full bg-background/50 border border-primary/20 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="merit">Merit-Based</option>
                <option value="need">Need-Based</option>
                <option value="sports">Sports</option>
                <option value="arts">Arts & Culture</option>
                <option value="minority">Minority</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80 mb-2 block">Amount</label>
              <select
                value={filters.amount}
                onChange={(e) => handleFilterChange("amount", e.target.value)}
                className="w-full bg-background/50 border border-primary/20 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">Any Amount</option>
                <option value="under-50k">Under ₹50,000</option>
                <option value="50k-1l">₹50,000 - ₹1,00,000</option>
                <option value="1l-5l">₹1,00,000 - ₹5,00,000</option>
                <option value="above-5l">Above ₹5,00,000</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80 mb-2 block">Deadline</label>
              <select
                value={filters.deadline}
                onChange={(e) => handleFilterChange("deadline", e.target.value)}
                className="w-full bg-background/50 border border-primary/20 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">Any Deadline</option>
                <option value="this-month">This Month</option>
                <option value="next-month">Next Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground/80 mb-2 block">Eligibility</label>
              <select
                value={filters.eligibility}
                onChange={(e) => handleFilterChange("eligibility", e.target.value)}
                className="w-full bg-background/50 border border-primary/20 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Students</option>
                <option value="12th">12th Pass</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="research">Research</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

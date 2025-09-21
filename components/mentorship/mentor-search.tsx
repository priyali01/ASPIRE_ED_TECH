"use client"

import { useState } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

interface MentorSearchProps {
  onSearch: (query: string) => void
  onFilterChange: (filters: any) => void
}

export function MentorSearch({ onSearch, onFilterChange }: MentorSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    expertise: "all",
    experience: [0, 20],
    priceRange: [0, 5000],
    availability: "all",
    location: "all",
    rating: 0,
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const expertiseAreas = [
    "Software Engineering",
    "Data Science",
    "Product Management",
    "Design",
    "Marketing",
    "Finance",
    "Consulting",
    "Entrepreneurship",
    "Research",
  ]

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search mentors by name, expertise, or company..."
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
        <div className="bg-background/30 backdrop-blur-sm rounded-lg border border-primary/20 p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Expertise */}
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-3 block">Expertise Area</label>
              <select
                value={filters.expertise}
                onChange={(e) => handleFilterChange("expertise", e.target.value)}
                className="w-full bg-background/50 border border-primary/20 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Areas</option>
                {expertiseAreas.map((area) => (
                  <option key={area} value={area.toLowerCase().replace(" ", "-")}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-3 block">Availability</label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange("availability", e.target.value)}
                className="w-full bg-background/50 border border-primary/20 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">Any Time</option>
                <option value="available">Available Now</option>
                <option value="today">Available Today</option>
                <option value="this-week">This Week</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-3 block">Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full bg-background/50 border border-primary/20 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">Any Location</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="remote">Remote Only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Range */}
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-3 block">
                Experience: {filters.experience[0]} - {filters.experience[1]} years
              </label>
              <Slider
                value={filters.experience}
                onValueChange={(value) => handleFilterChange("experience", value)}
                max={20}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-foreground/80 mb-3 block">
                Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}/hour
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange("priceRange", value)}
                max={5000}
                min={0}
                step={100}
                className="w-full"
              />
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <label className="text-sm font-medium text-foreground/80 mb-3 block">
              Minimum Rating: {filters.rating} stars
            </label>
            <Slider
              value={[filters.rating]}
              onValueChange={(value) => handleFilterChange("rating", value[0])}
              max={5}
              min={0}
              step={0.5}
              className="w-full max-w-xs"
            />
          </div>

          {/* Filter Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-primary/10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const resetFilters = {
                  expertise: "all",
                  experience: [0, 20],
                  priceRange: [0, 5000],
                  availability: "all",
                  location: "all",
                  rating: 0,
                }
                setFilters(resetFilters)
                onFilterChange(resetFilters)
              }}
            >
              Reset Filters
            </Button>
            <Button size="sm" onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

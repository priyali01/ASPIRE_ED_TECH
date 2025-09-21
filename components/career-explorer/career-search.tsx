"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

interface CareerSearchProps {
  onSearch: (query: string, options?: Record<string, any>) => void
  onFilterChange: (filters: string[]) => void
}

export function CareerSearch({ onSearch, onFilterChange }: CareerSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"relevance" | "salary-desc" | "salary-asc">("relevance")
  const [minSalary, setMinSalary] = useState<number | "">("")
  const [maxSalary, setMaxSalary] = useState<number | "">("")
  const debounceRef = useRef<number | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Basic vocabulary for suggestions (could be replaced by API)
  const suggestionPool = useMemo(
    () => [
      "Data Scientist",
      "Software Engineer",
      "UX Designer",
      "Civil Engineer",
      "Product Manager",
      "Marketing Manager",
      "Nurse",
      "Clinical Researcher",
      "Business Analyst",
      "Mechanical Engineer",
      "AI/ML Engineer",
      "Frontend Developer",
    ],
    [],
  )

  const filterCategories = [
    { id: "science", name: "Science & Technology", color: "bg-blue-500" },
    { id: "healthcare", name: "Healthcare", color: "bg-green-500" },
    { id: "business", name: "Business & Finance", color: "bg-purple-500" },
    { id: "arts", name: "Creative Arts", color: "bg-orange-500" },
    { id: "education", name: "Education", color: "bg-teal-500" },
    { id: "engineering", name: "Engineering", color: "bg-indigo-500" },
  ]

  const personalityTraits = [
    { id: "analytical", name: "Analytical" },
    { id: "creative", name: "Creative" },
    { id: "leadership", name: "Leadership" },
    { id: "social", name: "People-oriented" },
    { id: "detail", name: "Detail-oriented" },
    { id: "innovative", name: "Innovative" },
  ]

  const educationLevels = [
    { id: "diploma", name: "Diploma" },
    { id: "bachelor", name: "Bachelor's" },
    { id: "master", name: "Master's" },
    { id: "phd", name: "PhD" },
  ]

  // load recent searches from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("career_recent_searches")
      if (raw) setRecentSearches(JSON.parse(raw).slice(0, 10))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    // close suggestions if query cleared
    if (!searchQuery) {
      setSuggestionsOpen(false)
      setHighlightIndex(-1)
    }
  }, [searchQuery])

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return suggestionPool
    return suggestionPool.filter((s) => s.toLowerCase().includes(q)).slice(0, 6)
  }, [searchQuery, suggestionPool])

  // debounce search trigger
  useEffect(() => {
    window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => {
      // auto-show suggestions when typing
      if (searchQuery.trim().length >= 1) {
        setSuggestionsOpen(true)
      }
    }, 200)
    return () => window.clearTimeout(debounceRef.current)
  }, [searchQuery])

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    const options: Record<string, any> = {
      sortBy,
      salaryRange: minSalary || maxSalary ? { min: minSalary === "" ? null : minSalary, max: maxSalary === "" ? null : maxSalary } : null,
    }

    // persist recent searches
    try {
      const next = [searchQuery, ...recentSearches.filter((r) => r !== searchQuery)].slice(0, 10)
      localStorage.setItem("career_recent_searches", JSON.stringify(next))
      setRecentSearches(next)
    } catch {
      // ignore
    }

    setSuggestionsOpen(false)
    setHighlightIndex(-1)
    onSearch(searchQuery, options)
  }

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter((id) => id !== filterId)
      : [...activeFilters, filterId]

    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    setActiveFilters([])
    onFilterChange([])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestionsOpen) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        e.preventDefault()
        const pick = suggestions[highlightIndex]
        setSearchQuery(pick)
        setSuggestionsOpen(false)
        handleSearch()
      }
    } else if (e.key === "Escape") {
      setSuggestionsOpen(false)
      setHighlightIndex(-1)
    }
  }

  const applySuggestion = (s: string) => {
    setSearchQuery(s)
    setSuggestionsOpen(false)
    inputRef.current?.focus()
    handleSearch()
  }

  const clearRecent = () => {
    try {
      localStorage.removeItem("career_recent_searches")
      setRecentSearches([])
    } catch {}
  }

  // expose combined filter tags (including sort/salary) to parent via onFilterChange
  useEffect(() => {
    const extra: string[] = []
    extra.push(`sort:${sortBy}`)
    if (minSalary !== "" || maxSalary !== "") extra.push(`salary:${minSalary || 0}-${maxSalary || 0}`)
    onFilterChange([...activeFilters, ...extra])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters, sortBy, minSalary, maxSalary])

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative" role="search" aria-label="Career search">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search for a career (e.g., Data Scientist, UX Designer)..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
          }}
          onFocus={() => searchQuery && setSuggestionsOpen(true)}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-4 h-12 text-lg bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
          aria-autocomplete="list"
          aria-expanded={suggestionsOpen}
        />

        {/* suggestions dropdown */}
        {suggestionsOpen && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-md z-20 max-h-56 overflow-auto">
            <ul role="listbox" aria-label="Suggestions">
              {suggestions.map((s, idx) => (
                <li
                  key={s}
                  role="option"
                  aria-selected={highlightIndex === idx}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  onClick={() => applySuggestion(s)}
                  className={`px-4 py-2 cursor-pointer hover:bg-sky-50 ${highlightIndex === idx ? "bg-sky-50" : ""}`}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      {/* Quick controls: sort + salary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
        <div className="flex items-center gap-2">
          <label className="text-sm text-foreground">Sort</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="rounded-md border px-2 py-1 bg-white"
            aria-label="Sort careers"
          >
            <option value="relevance">Relevance</option>
            <option value="salary-desc">Salary: High → Low</option>
            <option value="salary-asc">Salary: Low → High</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-foreground">Salary (₹L)</label>
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={minSalary === "" ? "" : String(minSalary)}
            onChange={(e) => setMinSalary(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-20 rounded-md border px-2 py-1"
            aria-label="Minimum salary"
          />
          <span className="text-sm text-slate-500">—</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={maxSalary === "" ? "" : String(maxSalary)}
            onChange={(e) => setMaxSalary(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-20 rounded-md border px-2 py-1"
            aria-label="Maximum salary"
          />
        </div>

        <div className="ml-auto flex gap-2">
          <Button variant="ghost" onClick={() => { setSearchQuery(""); setMinSalary(""); setMaxSalary(""); setSortBy("relevance") }}>
            Reset
          </Button>
          <Button onClick={() => handleSearch()} aria-label="Run search">
            Search
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm font-medium text-foreground">Active filters:</span>
          {activeFilters.map((filterId) => {
            const filter = [...filterCategories, ...personalityTraits, ...educationLevels].find((f) => f.id === filterId)
            return (
              <Badge key={filterId} variant="secondary" className="flex items-center space-x-1">
                <span>{filter?.name ?? filterId}</span>
                <button onClick={() => toggleFilter(filterId)} aria-label={`Remove ${filter?.name ?? filterId}`}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary">
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Categories */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Interest Areas</h3>
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((category) => (
              <Button
                key={category.id}
                variant={activeFilters.includes(category.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(category.id)}
                className={`${activeFilters.includes(category.id) ? category.color : ""} transition-all duration-200`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Personality Traits</h3>
          <div className="flex flex-wrap gap-2">
            {personalityTraits.map((trait) => (
              <Button
                key={trait.id}
                variant={activeFilters.includes(trait.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(trait.id)}
                className="transition-all duration-200"
              >
                {trait.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Education Level</h3>
          <div className="flex flex-wrap gap-2">
            {educationLevels.map((level) => (
              <Button
                key={level.id}
                variant={activeFilters.includes(level.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(level.id)}
                className="transition-all duration-200"
              >
                {level.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Recent searches</h4>
            <Button variant="ghost" size="sm" onClick={clearRecent}>
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {recentSearches.map((r) => (
              <Button key={r} size="sm" variant="outline" onClick={() => { setSearchQuery(r); handleSearch() }}>
                {r}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

interface CollegeMapProps {
  colleges: any[]
  selectedCollege?: number
  onCollegeSelect: (collegeId: number) => void
}

export function CollegeMap({ colleges, selectedCollege, onCollegeSelect }: CollegeMapProps) {
  return (
    <Card className="glass-card p-6 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">College Locations</h2>
        <Button variant="ghost" size="sm" className="text-primary">
          <Navigation className="h-4 w-4 mr-1" />
          My Location
        </Button>
      </div>

      {/* Placeholder Map */}
      <div className="bg-muted/20 rounded-lg h-64 flex items-center justify-center mb-4">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
          <p className="text-muted-foreground">Interactive Map</p>
          <p className="text-xs text-muted-foreground">Showing {colleges.length} colleges</p>
        </div>
      </div>

      {/* College List */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {colleges.slice(0, 5).map((college) => (
          <div
            key={college.id}
            onClick={() => onCollegeSelect(college.id)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCollege === college.id ? "bg-primary/20" : "hover:bg-muted/20"
            }`}
          >
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-medium text-foreground text-sm truncate">{college.name}</div>
                <div className="text-xs text-muted-foreground">{college.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

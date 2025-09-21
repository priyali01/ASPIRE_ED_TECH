"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Heart, Eye, GitCompare } from "lucide-react"

interface CollegeCardProps {
  college: {
    id: number
    name: string
    location: string
    state: string
    rank: number
    naacGrade: string
    type: string
    establishedYear: number
    courses: string[]
    fees: {
      engineering: string
      medical: string
      management: string
    }
    placements: {
      averagePackage: string
      medianPackage: string
      topPackage: string
    }
    cutoffs: {
      jeeMain: number
      neet: number
    }
    facilities: string[]
    image: string
  }
  onSave: (collegeId: number) => void
  onCompare: (collegeId: number) => void
  onViewDetails: (collegeId: number) => void
  isSaved: boolean
  isInComparison: boolean
}

export function CollegeCard({ college, onSave, onCompare, onViewDetails, isSaved, isInComparison }: CollegeCardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Card className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 group">
      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={college.image || "/diverse-students-studying.png"}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-white">
            #{college.rank} in {college.state}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSave(college.id)}
            className={`bg-white/20 backdrop-blur-sm hover:bg-white/30 ${isSaved ? "text-red-500" : "text-white"}`}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onCompare(college.id)}
            className={`bg-white/20 backdrop-blur-sm hover:bg-white/30 ${isInComparison ? "text-primary" : "text-white"}`}
          >
            <GitCompare className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header Info */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {college.name}
            </h3>
            <Badge className="bg-green-500 text-white">{college.naacGrade}</Badge>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>
                {college.location}, {college.state}
              </span>
            </div>
            <Badge variant="outline">{college.type}</Badge>
            <span>Est. {college.establishedYear}</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">JEE Main Cutoff:</span>
                <div className="font-semibold text-foreground">{college.cutoffs.jeeMain}</div>
              </div>
              <div>
                <span className="text-muted-foreground">NEET Cutoff:</span>
                <div className="font-semibold text-foreground">{college.cutoffs.neet}</div>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Top Facilities:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {college.facilities.slice(0, 4).map((facility, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {facility}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-3 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Engineering:</span>
                <span className="font-semibold text-foreground">{college.fees.engineering}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Medical:</span>
                <span className="font-semibold text-foreground">{college.fees.medical}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Management:</span>
                <span className="font-semibold text-foreground">{college.fees.management}</span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground text-sm">Popular Courses:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {college.courses.slice(0, 3).map((course, index) => (
                  <Badge key={index} className="bg-blue-500 text-white text-xs">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="placements" className="space-y-3 mt-4">
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Average Package:</span>
                <span className="font-semibold text-foreground">{college.placements.averagePackage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Median Package:</span>
                <span className="font-semibold text-foreground">{college.placements.medianPackage}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Highest Package:</span>
                <span className="font-semibold text-primary">{college.placements.topPackage}</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-6">
          <Button onClick={() => onViewDetails(college.id)} className="flex-1 gradient-cta text-white hover:opacity-90">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}

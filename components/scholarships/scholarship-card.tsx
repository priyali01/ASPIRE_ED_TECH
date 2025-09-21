"use client"

import { useState } from "react"
import { DollarSign, Users, Clock, BookOpen, ExternalLink, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScholarshipDetailModal } from "./scholarship-detail-modal"

interface ScholarshipCardProps {
  scholarship: {
    id: string
    title: string
    provider: string
    amount: string
    deadline: string
    category: string
    eligibility: string[]
    description: string
    applicants: number
    image: string
    featured?: boolean
  }
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Expired"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays <= 7) return `${diffDays} days left`
    return date.toLocaleDateString()
  }

  const getUrgencyColor = (deadline: string) => {
    const date = new Date(deadline)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "text-red-400"
    if (diffDays <= 7) return "text-orange-400"
    if (diffDays <= 30) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div
      className={`group relative bg-background/30 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 ${
        scholarship.featured ? "ring-2 ring-primary/30" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {scholarship.featured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-primary text-primary-foreground">Featured</Badge>
        </div>
      )}

      {/* Header Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={scholarship.image || "/placeholder.svg"}
          alt={scholarship.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 bg-background/20 backdrop-blur-sm hover:bg-background/40"
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-white"}`} />
        </Button>

        {/* Amount Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground backdrop-blur-sm">
            <DollarSign className="h-3 w-3 mr-1" />
            {scholarship.amount}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">{scholarship.title}</h3>
          <p className="text-sm text-muted-foreground">{scholarship.provider}</p>
        </div>

        <p className="text-sm text-foreground/80 line-clamp-3">{scholarship.description}</p>

        {/* Eligibility Tags */}
        <div className="flex flex-wrap gap-2">
          {scholarship.eligibility.slice(0, 3).map((criteria, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {criteria}
            </Badge>
          ))}
          {scholarship.eligibility.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{scholarship.eligibility.length - 3} more
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{scholarship.applicants.toLocaleString()} applied</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{scholarship.category}</span>
            </div>
          </div>
        </div>

        {/* Deadline and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
          <div className="flex items-center gap-1">
            <Clock className={`h-4 w-4 ${getUrgencyColor(scholarship.deadline)}`} />
            <span className={`text-sm font-medium ${getUrgencyColor(scholarship.deadline)}`}>
              {formatDeadline(scholarship.deadline)}
            </span>
          </div>

          <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setShowDetailModal(true)}>
            Apply Now
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Hover Effect */}
      <div
        className={`absolute inset-0 bg-primary/5 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Detail Modal */}
      <ScholarshipDetailModal
        scholarship={scholarship}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </div>
  )
}

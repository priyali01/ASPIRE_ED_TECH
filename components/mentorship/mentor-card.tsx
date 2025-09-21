"use client"

import { useState } from "react"
import { Star, MapPin, Clock, MessageCircle, Calendar, Heart, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MentorCardProps {
  mentor: {
    id: string
    name: string
    title: string
    company: string
    avatar: string
    rating: number
    reviewCount: number
    location: string
    experience: number
    expertise: string[]
    hourlyRate: number
    responseTime: string
    totalSessions: number
    languages: string[]
    bio: string
    achievements: string[]
    availability: "available" | "busy" | "offline"
  }
}

export function MentorCard({ mentor }: MentorCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case "available":
        return "Available Now"
      case "busy":
        return "In Session"
      case "offline":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="group bg-background/30 backdrop-blur-sm rounded-xl border border-primary/20 overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
      {/* Header */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={mentor.avatar || "/placeholder.svg"}
              alt={mentor.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
            />
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getAvailabilityColor(mentor.availability)}`}
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-foreground truncate">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{mentor.title}</p>
                <p className="text-sm text-primary font-medium">{mentor.company}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsFavorited(!isFavorited)} className="shrink-0">
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
              </Button>
            </div>

            {/* Rating and Stats */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{mentor.rating}</span>
                <span className="text-sm text-muted-foreground">({mentor.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{mentor.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-4">
          <Badge variant="outline" className={`${getAvailabilityColor(mentor.availability)} text-white border-0`}>
            {getAvailabilityText(mentor.availability)}
          </Badge>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {mentor.expertise.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{mentor.expertise.length - 4} more
            </Badge>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="px-6 pb-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          {showFullBio ? mentor.bio : `${mentor.bio.slice(0, 120)}...`}
          <button
            onClick={() => setShowFullBio(!showFullBio)}
            className="text-primary hover:text-primary/80 ml-1 text-sm font-medium"
          >
            {showFullBio ? "Show less" : "Read more"}
          </button>
        </p>
      </div>

      {/* Achievements */}
      {mentor.achievements.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Achievements</span>
          </div>
          <div className="space-y-1">
            {mentor.achievements.slice(0, 2).map((achievement, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 bg-primary rounded-full" />
                {achievement}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">{mentor.experience}</div>
            <div className="text-xs text-muted-foreground">Years Exp</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">{mentor.totalSessions}</div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">{mentor.responseTime}</div>
            <div className="text-xs text-muted-foreground">Response</div>
          </div>
        </div>
      </div>

      {/* Pricing and Actions */}
      <div className="px-6 pb-6 pt-4 border-t border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-foreground">₹{mentor.hourlyRate}</span>
            <span className="text-sm text-muted-foreground">/hour</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Usually responds in {mentor.responseTime}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
            <Calendar className="h-4 w-4 mr-1" />
            Book Session
          </Button>
        </div>
      </div>
    </div>
  )
}

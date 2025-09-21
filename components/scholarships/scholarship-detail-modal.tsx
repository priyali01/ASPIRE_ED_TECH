"use client"

import { useState } from "react"
import { X, ExternalLink, Calendar, DollarSign, Users, BookOpen, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ScholarshipDetailModalProps {
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
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ScholarshipDetailModal({ scholarship, isOpen, onClose }: ScholarshipDetailModalProps) {
  if (!isOpen || !scholarship) return null

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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-primary/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={scholarship.image || "/placeholder.svg"}
            alt={scholarship.title}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-background/20 backdrop-blur-sm hover:bg-background/40"
          >
            <X className="h-4 w-4" />
          </Button>

          {scholarship.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">{scholarship.title}</h1>
            <p className="text-muted-foreground">{scholarship.provider}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Amount</span>
              </div>
              <p className="text-lg font-bold text-foreground">{scholarship.amount}</p>
            </div>

            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Deadline</span>
              </div>
              <p className={`text-lg font-bold ${getUrgencyColor(scholarship.deadline)}`}>
                {formatDeadline(scholarship.deadline)}
              </p>
            </div>

            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Applicants</span>
              </div>
              <p className="text-lg font-bold text-foreground">{scholarship.applicants.toLocaleString()}</p>
            </div>

            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Category</span>
              </div>
              <p className="text-lg font-bold text-foreground">{scholarship.category}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">About this Scholarship</h3>
            <p className="text-muted-foreground leading-relaxed">{scholarship.description}</p>
          </div>

          {/* Eligibility Requirements */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Eligibility Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {scholarship.eligibility.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-muted-foreground">{requirement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Application Process</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Complete Online Application</p>
                  <p className="text-sm text-muted-foreground">Fill out the application form with your personal and academic details</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Submit Required Documents</p>
                  <p className="text-sm text-muted-foreground">Upload academic transcripts, income certificates, and other supporting documents</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Await Review & Selection</p>
                  <p className="text-sm text-muted-foreground">Applications are reviewed by the scholarship committee and results are announced</p>
                </div>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Required Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Academic transcripts (Class 10th & 12th)",
                "Income certificate",
                "Identity proof (Aadhaar Card)",
                "Passport size photograph",
                "Bank account details",
                "Admission letter from institution"
              ].map((document, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{document}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-primary/10">
            <Button className="flex-1 gradient-cta text-white hover:opacity-90">
              <ExternalLink className="h-4 w-4 mr-2" />
              Apply Now
            </Button>
            <Button variant="outline" className="flex-1 border-primary/20 hover:border-primary bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Set Reminder
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

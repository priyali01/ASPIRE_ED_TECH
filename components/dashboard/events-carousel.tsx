"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"

export function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const events = [
    {
      type: "webinar",
      title: "How to Crack CUET 2024",
      date: "Dec 15, 2024",
      time: "6:00 PM",
      attendees: 1247,
      status: "upcoming",
      description: "Expert strategies and tips for CUET preparation",
    },
    {
      type: "deadline",
      title: "NIT Srinagar Admissions",
      date: "Dec 30, 2024",
      time: "11:59 PM",
      daysLeft: 12,
      status: "urgent",
      description: "Application deadline approaching soon",
    },
    {
      type: "webinar",
      title: "Career in Data Science",
      date: "Dec 20, 2024",
      time: "7:00 PM",
      attendees: 892,
      status: "upcoming",
      description: "Industry insights and career pathways",
    },
    {
      type: "deadline",
      title: "Scholarship Applications",
      date: "Jan 5, 2025",
      time: "11:59 PM",
      daysLeft: 28,
      status: "normal",
      description: "Multiple scholarship opportunities closing",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [events.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Upcoming Events & Deadlines</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {events.map((event, index) => (
            <Card key={index} className="glass-card p-6 min-w-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge
                      variant={event.type === "webinar" ? "default" : "destructive"}
                      className={event.type === "webinar" ? "bg-blue-500" : "bg-orange-500"}
                    >
                      {event.type === "webinar" ? "Webinar" : "Deadline"}
                    </Badge>
                    {event.status === "urgent" && <Badge variant="destructive">Urgent</Badge>}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  {event.attendees && (
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} registered</span>
                    </div>
                  )}
                  {event.daysLeft && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{event.daysLeft} days left</span>
                    </div>
                  )}
                </div>

                <Button
                  className={
                    event.type === "webinar"
                      ? "gradient-cta text-white"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                  }
                >
                  {event.type === "webinar" ? "Register Now" : "Apply Now"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  )
}

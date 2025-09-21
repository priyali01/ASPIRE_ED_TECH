"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ExamEvent {
  id: string
  title: string
  date: string
  time: string
  type: "entrance" | "scholarship" | "competitive"
  location: string
  registrationDeadline: string
  applicants: number
  difficulty: "Easy" | "Medium" | "Hard"
}

const examEvents: ExamEvent[] = [
  {
    id: "1",
    title: "JEE Main 2024",
    date: "2024-04-15",
    time: "09:00 AM",
    type: "entrance",
    location: "Multiple Centers",
    registrationDeadline: "2024-03-15",
    applicants: 1200000,
    difficulty: "Hard",
  },
  {
    id: "2",
    title: "NEET 2024",
    date: "2024-05-05",
    time: "02:00 PM",
    type: "entrance",
    location: "Multiple Centers",
    registrationDeadline: "2024-04-05",
    applicants: 1800000,
    difficulty: "Hard",
  },
  {
    id: "3",
    title: "KVPY Fellowship",
    date: "2024-04-20",
    time: "10:00 AM",
    type: "scholarship",
    location: "Online",
    registrationDeadline: "2024-03-20",
    applicants: 50000,
    difficulty: "Medium",
  },
  {
    id: "4",
    title: "GATE 2024",
    date: "2024-02-10",
    time: "09:30 AM",
    type: "entrance",
    location: "Multiple Centers",
    registrationDeadline: "2024-01-10",
    applicants: 900000,
    difficulty: "Hard",
  },
]

export function ExamCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewMode, setViewMode] = useState<"month" | "list">("month")

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return examEvents.filter((event) => event.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getTypeColor = (type: ExamEvent["type"]) => {
    switch (type) {
      case "entrance":
        return "bg-blue-500/20 text-blue-400"
      case "scholarship":
        return "bg-green-500/20 text-green-400"
      case "competitive":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getDifficultyColor = (difficulty: ExamEvent["difficulty"]) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400"
      case "Medium":
        return "text-yellow-400"
      case "Hard":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const events = getEventsForDate(date)
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = selectedDate?.toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 p-2 border border-primary/10 cursor-pointer transition-colors hover:bg-primary/5 ${
            isToday ? "bg-primary/10 border-primary/30" : ""
          } ${isSelected ? "bg-primary/20 border-primary/50" : ""}`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : "text-foreground"}`}>{day}</div>
          <div className="space-y-1">
            {events.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded text-center truncate ${getTypeColor(event.type)}`}
              >
                {event.title}
              </div>
            ))}
            {events.length > 2 && (
              <div className="text-xs text-muted-foreground text-center">+{events.length - 2} more</div>
            )}
          </div>
        </div>,
      )
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-primary/20 rounded-lg overflow-hidden">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-primary/10 p-3 text-center text-sm font-medium text-foreground">
            {day}
          </div>
        ))}
        {days}
      </div>
    )
  }

  const renderListView = () => {
    const upcomingEvents = examEvents
      .filter((event) => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
      <div className="space-y-4">
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="bg-background/30 backdrop-blur-sm rounded-lg border border-primary/20 p-6 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{event.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
              <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{event.applicants.toLocaleString()} registered</span>
                </div>
                <div className={`font-medium ${getDifficultyColor(event.difficulty)}`}>{event.difficulty}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Registration ends: {new Date(event.registrationDeadline).toLocaleDateString()}
                </span>
                <Button size="sm">Register</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">Exam Calendar</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("month")}
            >
              Month
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              List
            </Button>
          </div>
        </div>

        {viewMode === "month" && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium text-foreground min-w-[200px] text-center">
              {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Calendar Content */}
      {viewMode === "month" ? renderCalendarView() : renderListView()}

      {/* Selected Date Details */}
      {selectedDate && viewMode === "month" && (
        <div className="bg-background/30 backdrop-blur-sm rounded-lg border border-primary/20 p-6">
          <h3 className="font-semibold text-lg text-foreground mb-4">Events on {selectedDate.toLocaleDateString()}</h3>
          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getEventsForDate(selectedDate).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.time} • {event.location}
                    </div>
                  </div>
                  <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No events scheduled for this date.</p>
          )}
        </div>
      )}
    </div>
  )
}

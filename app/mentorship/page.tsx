"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MentorSearch } from "@/components/mentorship/mentor-search"
import { MentorCard } from "@/components/mentorship/mentor-card"
import { ChatInterface } from "@/components/mentorship/chat-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mentors = [
  {
    id: "1",
    name: "Priya Sharma",
    title: "Senior Product Manager",
    company: "Google",
    avatar: "/placeholder-user.jpg",
    rating: 4.9,
    reviewCount: 127,
    location: "Bangalore, India",
    experience: 8,
    expertise: ["Product Management", "Strategy", "User Research", "Analytics"],
    hourlyRate: 2500,
    responseTime: "2 hours",
    totalSessions: 340,
    languages: ["English", "Hindi"],
    bio: "Experienced product manager with 8+ years at top tech companies. I help aspiring PMs develop strategic thinking, user empathy, and execution skills. My mentees have successfully transitioned to PM roles at FAANG companies.",
    achievements: ["Led 3 successful product launches", "Managed $50M+ product portfolio", "Mentor of the Year 2023"],
    availability: "available",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    title: "Staff Software Engineer",
    company: "Microsoft",
    avatar: "/placeholder-user.jpg",
    rating: 4.8,
    reviewCount: 89,
    location: "Hyderabad, India",
    experience: 12,
    expertise: ["Software Engineering", "System Design", "Leadership", "Mentoring"],
    hourlyRate: 3000,
    responseTime: "1 hour",
    totalSessions: 256,
    languages: ["English", "Telugu", "Hindi"],
    bio: "Senior engineer with expertise in distributed systems and team leadership. I guide engineers through technical challenges, career growth, and leadership transitions.",
    achievements: ["Built systems serving 100M+ users", "Led teams of 15+ engineers", "Published 5 technical papers"],
    availability: "busy",
  },
  {
    id: "3",
    name: "Anita Desai",
    title: "Data Science Director",
    company: "Netflix",
    avatar: "/placeholder-user.jpg",
    rating: 4.9,
    reviewCount: 156,
    location: "Mumbai, India",
    experience: 10,
    expertise: ["Data Science", "Machine Learning", "Analytics", "Team Management"],
    hourlyRate: 3500,
    responseTime: "3 hours",
    totalSessions: 412,
    languages: ["English", "Hindi", "Marathi"],
    bio: "Data science leader with deep expertise in ML and analytics. I help data professionals advance their careers and build impactful data products.",
    achievements: ["Built ML models used by 200M+ users", "Led data org of 50+ people", "Speaker at 20+ conferences"],
    availability: "available",
  },
  {
    id: "4",
    name: "Vikram Singh",
    title: "Startup Founder & CEO",
    company: "TechVenture (Acquired)",
    avatar: "/placeholder-user.jpg",
    rating: 4.7,
    reviewCount: 203,
    location: "Delhi, India",
    experience: 15,
    expertise: ["Entrepreneurship", "Fundraising", "Strategy", "Leadership"],
    hourlyRate: 4000,
    responseTime: "4 hours",
    totalSessions: 189,
    languages: ["English", "Hindi", "Punjabi"],
    bio: "Serial entrepreneur with 2 successful exits. I mentor aspiring founders on building startups, raising capital, and scaling businesses.",
    achievements: ["2 successful exits ($50M+ each)", "Raised $25M+ in funding", "Invested in 30+ startups"],
    availability: "available",
  },
  {
    id: "5",
    name: "Sneha Patel",
    title: "Design Director",
    company: "Airbnb",
    avatar: "/placeholder-user.jpg",
    rating: 4.8,
    reviewCount: 94,
    location: "Pune, India",
    experience: 9,
    expertise: ["UX Design", "Design Strategy", "Team Leadership", "Design Systems"],
    hourlyRate: 2800,
    responseTime: "2 hours",
    totalSessions: 278,
    languages: ["English", "Hindi", "Gujarati"],
    bio: "Design leader passionate about creating user-centered experiences. I help designers grow their skills and advance to senior roles.",
    achievements: [
      "Led design for 50M+ user products",
      "Built design team from 5 to 25",
      "Design Excellence Award 2022",
    ],
    availability: "offline",
  },
  {
    id: "6",
    name: "Arjun Mehta",
    title: "Investment Banking VP",
    company: "Goldman Sachs",
    avatar: "/placeholder-user.jpg",
    rating: 4.6,
    reviewCount: 67,
    location: "Mumbai, India",
    experience: 11,
    expertise: ["Finance", "Investment Banking", "Financial Modeling", "Career Strategy"],
    hourlyRate: 3200,
    responseTime: "6 hours",
    totalSessions: 145,
    languages: ["English", "Hindi"],
    bio: "Finance professional with extensive experience in investment banking and corporate finance. I guide students and professionals entering finance careers.",
    achievements: ["Closed $2B+ in deals", "Top performer 5 years running", "CFA Charterholder"],
    availability: "available",
  },
]

export default function MentorshipPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSearch = (query: string) => {
    console.log("[v0] Search query:", query)
    // Implement search logic
  }

  const handleFilterChange = (filters: any) => {
    console.log("[v0] Filters changed:", filters)
    // Implement filter logic
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} p-6`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mentorship & Experts</h1>
            <p className="text-muted-foreground text-lg">
              Connect with industry experts and accelerate your career growth through personalized guidance
            </p>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="browse" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto glass-card">
              <TabsTrigger
                value="browse"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Browse Mentors
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Messages
              </TabsTrigger>
              <TabsTrigger
                value="sessions"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                My Sessions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-8">
              {/* Search and Filters */}
              <div className="max-w-4xl mx-auto">
                <MentorSearch onSearch={handleSearch} onFilterChange={handleFilterChange} />
              </div>

              {/* Mentor Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <button className="gradient-cta text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Load More Mentors
                </button>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">Active Conversations</h2>
                <ChatInterface
                  mentorId="1"
                  mentorName="Priya Sharma"
                  mentorAvatar="/placeholder.svg?key=mentor1"
                  isOnline={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="space-y-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6">Upcoming Sessions</h2>
                <div className="glass-card p-8 text-center">
                  <p className="text-muted-foreground">No upcoming sessions scheduled.</p>
                  <button className="mt-4 gradient-cta text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Book a Session
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

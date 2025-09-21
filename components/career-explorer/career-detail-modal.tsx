"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Clock, MapPin } from "lucide-react"

interface CareerDetailModalProps {
  career: {
    id: number
    title: string
    description: string
    image: string
  }
  isOpen: boolean
  onClose: () => void
}

export function CareerDetailModal({ career, isOpen, onClose }: CareerDetailModalProps) {
  if (!isOpen) return null

  const careerData = {
    overview: {
      dailyTasks: [
        "Write and test code for software applications",
        "Collaborate with designers and product managers",
        "Debug and fix software issues",
        "Participate in code reviews and team meetings",
        "Research new technologies and best practices",
      ],
      workEnvironment: "Office, Remote, or Hybrid",
      industries: ["Technology", "Finance", "Healthcare", "E-commerce", "Gaming"],
    },
    salary: {
      entry: "₹3-8 LPA",
      mid: "₹8-18 LPA",
      senior: "₹18-40 LPA",
      locations: [
        { city: "Bangalore", range: "₹6-25 LPA" },
        { city: "Mumbai", range: "₹5-22 LPA" },
        { city: "Delhi NCR", range: "₹5-20 LPA" },
        { city: "Hyderabad", range: "₹4-18 LPA" },
      ],
    },
    education: {
      path: [
        { level: "Class 12", stream: "Science (PCM)", duration: "2 years" },
        { level: "Bachelor's", course: "B.Tech/B.E. in Computer Science", duration: "4 years" },
        { level: "Optional", course: "M.Tech or Certifications", duration: "1-2 years" },
      ],
      skills: {
        technical: ["Programming Languages", "Data Structures", "Algorithms", "Databases", "Web Technologies"],
        soft: ["Problem Solving", "Communication", "Teamwork", "Time Management", "Continuous Learning"],
      },
    },
    mentors: [
      { name: "Priya Sharma", role: "Senior Software Engineer at Google", experience: "8 years", rating: 4.9 },
      { name: "Rahul Gupta", role: "Tech Lead at Microsoft", experience: "12 years", rating: 4.8 },
      { name: "Anita Singh", role: "Full Stack Developer at Flipkart", experience: "6 years", rating: 4.7 },
    ],
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img src={career.image || "/placeholder.svg"} alt={career.title} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{career.title}</h1>
            <p className="text-lg opacity-90">{career.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="salary">Salary & Growth</TabsTrigger>
              <TabsTrigger value="education">Education Path</TabsTrigger>
              <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Daily Responsibilities</h3>
                <ul className="space-y-2">
                  {careerData.overview.dailyTasks.map((task, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Work Environment</h3>
                  <p className="text-muted-foreground">{careerData.overview.workEnvironment}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {careerData.overview.industries.map((industry, index) => (
                      <Badge key={index} variant="outline">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="salary" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{careerData.salary.entry}</div>
                  <div className="text-sm text-muted-foreground">Entry Level</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{careerData.salary.mid}</div>
                  <div className="text-sm text-muted-foreground">Mid Level</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{careerData.salary.senior}</div>
                  <div className="text-sm text-muted-foreground">Senior Level</div>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Salary by Location</h3>
                <div className="space-y-3">
                  {careerData.salary.locations.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">{location.city}</span>
                      </div>
                      <span className="text-primary font-semibold">{location.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Education Pathway</h3>
                <div className="space-y-4">
                  {careerData.education.path.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-muted/20 rounded-lg">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{step.level}</h4>
                        <p className="text-muted-foreground">{step.course}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="h-3 w-3 text-primary" />
                          <span className="text-xs text-primary">{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {careerData.education.skills.technical.map((skill, index) => (
                      <Badge key={index} className="bg-blue-500">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {careerData.education.skills.soft.map((skill, index) => (
                      <Badge key={index} className="bg-green-500">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mentors" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Connect with Industry Mentors</h3>
                <div className="space-y-4">
                  {careerData.mentors.map((mentor, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{mentor.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{mentor.name}</h4>
                            <p className="text-sm text-muted-foreground">{mentor.role}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-primary">{mentor.experience} experience</span>
                              <span className="text-xs text-yellow-500">★ {mentor.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button className="gradient-cta text-white">Connect</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Clock, 
  Users, 
  Target,
  BookOpen,
  Briefcase,
  BarChart3,
  Globe,
  Star,
  RotateCcw
} from "lucide-react"

interface CareerAnalysisProps {
  suggestedCareers: string[]
  quizScore: number
  totalQuestions: number
  onBackToResults: () => void
  onRetakeQuiz: () => void
}

const careerData = {
  "Software Engineering": {
    title: "Software Engineering",
    description: "Design, develop, and maintain software applications and systems. Work with programming languages, frameworks, and development tools to create digital solutions.",
    whatTheyDo: [
      "Write and test code for applications and systems",
      "Collaborate with cross-functional teams to design software",
      "Debug and troubleshoot software issues",
      "Maintain and update existing software",
      "Research and implement new technologies"
    ],
    roadmap: {
      "0-1 years": "Learn programming fundamentals, build personal projects",
      "1-3 years": "Join as Junior Developer, work on real projects",
      "3-5 years": "Become Senior Developer, lead small teams",
      "5+ years": "Tech Lead/Architect, manage large projects"
    },
    salary: {
      entry: "₹4-8 LPA",
      mid: "₹12-25 LPA", 
      senior: "₹25-50 LPA",
      top: "₹50+ LPA"
    },
    growth: "Very High",
    demand: "Extremely High",
    locations: ["Bangalore", "Hyderabad", "Pune", "Mumbai", "Delhi", "Chennai"],
    skills: ["Programming", "Problem Solving", "System Design", "Database Management"],
    education: "B.Tech Computer Science or related field",
    companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro"],
    roi: "Excellent - High starting salaries and rapid growth",
    investment: "₹2-5 Lakhs for education, ₹50K-1L for certifications"
  },
  "Data Science": {
    title: "Data Science",
    description: "Extract insights from data using statistical analysis, machine learning, and programming. Help organizations make data-driven decisions.",
    whatTheyDo: [
      "Collect and clean large datasets",
      "Build machine learning models",
      "Create data visualizations and reports",
      "Perform statistical analysis",
      "Communicate findings to stakeholders"
    ],
    roadmap: {
      "0-1 years": "Learn Python/R, statistics, and data analysis",
      "1-3 years": "Junior Data Scientist, work on real projects",
      "3-5 years": "Senior Data Scientist, lead ML initiatives",
      "5+ years": "Data Science Manager/Director, strategic decisions"
    },
    salary: {
      entry: "₹6-12 LPA",
      mid: "₹15-30 LPA",
      senior: "₹30-60 LPA", 
      top: "₹60+ LPA"
    },
    growth: "Very High",
    demand: "Very High",
    locations: ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune"],
    skills: ["Python/R", "Machine Learning", "Statistics", "SQL", "Data Visualization"],
    education: "B.Tech/M.Sc in Data Science, Statistics, or related field",
    companies: ["Google", "Amazon", "Microsoft", "Flipkart", "Paytm", "Zomato"],
    roi: "Excellent - High demand and competitive salaries",
    investment: "₹3-6 Lakhs for education, ₹1-2L for certifications"
  },
  "Product Management": {
    title: "Product Management",
    description: "Lead product development from conception to launch. Work with engineering, design, and business teams to create successful products.",
    whatTheyDo: [
      "Define product strategy and roadmap",
      "Gather and prioritize requirements",
      "Work with engineering and design teams",
      "Analyze market and user research",
      "Launch and iterate on products"
    ],
    roadmap: {
      "0-1 years": "Learn product fundamentals, work on side projects",
      "1-3 years": "Associate Product Manager, work on features",
      "3-5 years": "Product Manager, own product areas",
      "5+ years": "Senior PM/Product Director, strategic leadership"
    },
    salary: {
      entry: "₹8-15 LPA",
      mid: "₹18-35 LPA",
      senior: "₹35-70 LPA",
      top: "₹70+ LPA"
    },
    growth: "High",
    demand: "High",
    locations: ["Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad"],
    skills: ["Strategic Thinking", "Communication", "Analytics", "User Research"],
    education: "MBA or B.Tech with business experience",
    companies: ["Google", "Microsoft", "Amazon", "Flipkart", "Swiggy", "Ola"],
    roi: "Very Good - High salaries and growth opportunities",
    investment: "₹5-15 Lakhs for MBA, ₹50K-1L for certifications"
  },
  "Medicine": {
    title: "Medicine",
    description: "Diagnose, treat, and prevent diseases and injuries. Provide medical care to patients and contribute to medical research.",
    whatTheyDo: [
      "Diagnose medical conditions",
      "Prescribe treatments and medications",
      "Perform medical procedures",
      "Consult with patients and families",
      "Stay updated with medical research"
    ],
    roadmap: {
      "0-5 years": "MBBS degree and internship",
      "5-8 years": "MD/MS specialization",
      "8-12 years": "Senior Doctor, establish practice",
      "12+ years": "Senior Consultant, teaching/research"
    },
    salary: {
      entry: "₹5-10 LPA",
      mid: "₹15-30 LPA",
      senior: "₹30-80 LPA",
      top: "₹80+ LPA"
    },
    growth: "Stable",
    demand: "Always High",
    locations: ["All major cities", "Rural areas", "Government hospitals", "Private practice"],
    skills: ["Medical Knowledge", "Diagnosis", "Surgery", "Patient Care", "Communication"],
    education: "MBBS + MD/MS specialization",
    companies: ["AIIMS", "Apollo", "Fortis", "Max Healthcare", "Government Hospitals"],
    roi: "Good - Stable career with social impact",
    investment: "₹20-50 Lakhs for medical education"
  },
  "Business Management": {
    title: "Business Management",
    description: "Lead and manage organizations, teams, and business operations. Develop strategies and make decisions to drive business growth.",
    whatTheyDo: [
      "Develop business strategies",
      "Manage teams and operations",
      "Analyze market trends",
      "Make strategic decisions",
      "Lead organizational change"
    ],
    roadmap: {
      "0-2 years": "Management trainee, learn business operations",
      "2-5 years": "Assistant Manager, lead small teams",
      "5-10 years": "Manager/Director, manage departments",
      "10+ years": "VP/CXO, strategic leadership"
    },
    salary: {
      entry: "₹6-12 LPA",
      mid: "₹15-30 LPA",
      senior: "₹30-60 LPA",
      top: "₹60+ LPA"
    },
    growth: "High",
    demand: "High",
    locations: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
    skills: ["Leadership", "Strategic Thinking", "Communication", "Analytics"],
    education: "MBA from top business schools",
    companies: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan"],
    roi: "Very Good - High earning potential",
    investment: "₹10-30 Lakhs for MBA from top schools"
  }
}

export function CareerAnalysis({ 
  suggestedCareers, 
  quizScore, 
  totalQuestions, 
  onBackToResults, 
  onRetakeQuiz 
}: CareerAnalysisProps) {
  const [selectedCareer, setSelectedCareer] = useState(suggestedCareers[0])

  const getCareerInsight = (career: string) => {
    return careerData[career as keyof typeof careerData] || careerData["Software Engineering"]
  }

  const currentCareer = getCareerInsight(selectedCareer)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={onBackToResults}
              variant="outline"
              className="border-primary/20 hover:border-primary bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">Career Analysis</h1>
              <p className="text-muted-foreground">
                Based on your quiz performance ({Math.round((quizScore / totalQuestions) * 100)}%), here are your recommended career paths
              </p>
            </div>
          </div>
        </div>

        {/* Suggested Careers */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Recommended Careers</h2>
          <div className="flex flex-wrap gap-3">
            {suggestedCareers.map((career) => (
              <Button
                key={career}
                onClick={() => setSelectedCareer(career)}
                variant={selectedCareer === career ? "default" : "outline"}
                className={selectedCareer === career ? "gradient-cta text-white" : "border-primary/20 hover:border-primary bg-transparent"}
              >
                {career}
              </Button>
            ))}
          </div>
        </div>

        {/* Career Details */}
        <Card className="glass-card p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">{currentCareer.title}</h2>
            <p className="text-muted-foreground text-lg">{currentCareer.description}</p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass-card">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="salary">Salary & ROI</TabsTrigger>
              <TabsTrigger value="market">Market Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">What They Do</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCareer.whatTheyDo.map((task, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Key Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentCareer.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Education Required</h3>
                  <p className="text-muted-foreground">{currentCareer.education}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Career Progression</h3>
              <div className="space-y-4">
                {Object.entries(currentCareer.roadmap).map(([stage, description]) => (
                  <div key={stage} className="glass-card p-4 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{stage}</h4>
                        <p className="text-muted-foreground">{description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <TabsContent value="roadmap" className="space-y-6 mt-6">
  <h3 className="text-lg font-semibold text-foreground mb-4">Career Progression</h3>
  
  {/* Keep your existing roadmap description if you want */}

  {/* Embed PDF Viewer */}
  <div className="mt-6">
    <h4 className="font-semibold text-foreground mb-2">Detailed Roadmap (PDF)</h4>
    <iframe
      src="full-stack.pdf"
      className="w-full h-[600px] rounded-lg border"
    />
  </div>
</TabsContent>

            </TabsContent>

            <TabsContent value="salary" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Salary Ranges</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Entry Level:</span>
                      <span className="font-semibold text-foreground">{currentCareer.salary.entry}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Mid Level:</span>
                      <span className="font-semibold text-foreground">{currentCareer.salary.mid}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Senior Level:</span>
                      <span className="font-semibold text-foreground">{currentCareer.salary.senior}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Top Level:</span>
                      <span className="font-semibold text-primary">{currentCareer.salary.top}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Investment & ROI</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-muted-foreground">Initial Investment:</span>
                      <p className="font-semibold text-foreground">{currentCareer.investment}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ROI Assessment:</span>
                      <p className="font-semibold text-green-600">{currentCareer.roi}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="market" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Market Demand</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Growth Rate:</span>
                      <Badge className={currentCareer.growth === "Very High" ? "bg-green-500" : "bg-blue-500"}>
                        {currentCareer.growth}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Market Demand:</span>
                      <Badge className={currentCareer.demand === "Extremely High" ? "bg-red-500" : "bg-orange-500"}>
                        {currentCareer.demand}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Top Locations</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentCareer.locations.map((location, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Companies</h3>
                <div className="flex flex-wrap gap-2">
                  {currentCareer.companies.map((company, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={onRetakeQuiz}
            variant="outline"
            className="border-primary/20 hover:border-primary bg-transparent px-8 py-3"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
          <Button
            onClick={() => window.open('/career-explorer', '_blank')}
            className="gradient-cta text-white px-8 py-3 hover:opacity-90 transition-opacity"
          >
            <Target className="h-4 w-4 mr-2" />
            Explore More Careers
          </Button>
        </div>
      </div>
    </div>
  )
}

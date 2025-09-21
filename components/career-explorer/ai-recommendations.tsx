import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, DollarSign, Clock } from "lucide-react"

export function AIRecommendations() {
  const recommendations = [
    {
      id: 1,
      title: "Software Engineer",
      match: 95,
      salary: "₹8-25 LPA",
      growth: "High",
      timeToMarket: "2-4 years",
      description: "Design and develop software applications using various programming languages and frameworks.",
      skills: ["Programming", "Problem Solving", "Logical Thinking"],
      image: "/software-engineer-coding.png",
    },
    {
      id: 2,
      title: "Data Scientist",
      match: 88,
      salary: "₹6-20 LPA",
      growth: "Very High",
      timeToMarket: "3-5 years",
      description: "Analyze complex data to help organizations make informed business decisions.",
      skills: ["Statistics", "Python/R", "Machine Learning"],
      image: "/data-scientist-analytics.jpg",
    },
    {
      id: 3,
      title: "Product Manager",
      match: 82,
      salary: "₹10-30 LPA",
      growth: "High",
      timeToMarket: "4-6 years",
      description: "Lead product development from conception to launch, working with cross-functional teams.",
      skills: ["Strategy", "Communication", "Leadership"],
      image: "/product-manager-meeting.jpg",
    },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">Top Career Matches for You</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((career) => (
          <Card
            key={career.id}
            className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={career.image || "/placeholder.svg"}
                alt={career.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white font-bold">{career.match}% Match</Badge>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {career.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{career.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Salary:</span>
                  </div>
                  <span className="font-semibold text-foreground">{career.salary}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-muted-foreground">Growth:</span>
                  </div>
                  <span className="font-semibold text-foreground">{career.growth}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span className="text-muted-foreground">Time to Market:</span>
                  </div>
                  <span className="font-semibold text-foreground">{career.timeToMarket}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Key Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {career.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full gradient-cta text-white hover:opacity-90">Explore Career Path</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

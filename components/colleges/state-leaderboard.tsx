"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Trophy, Medal, Award } from "lucide-react"

export function StateLeaderboard() {
  const [selectedState, setSelectedState] = useState("Jammu & Kashmir")

  const states = [
    "Jammu & Kashmir",
    "Delhi",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Uttar Pradesh",
    "West Bengal",
    "Gujarat",
  ]

  const leaderboardData = {
    "Jammu & Kashmir": [
      {
        rank: 1,
        name: "NIT Srinagar",
        logo: "/nit-srinagar-logo.png",
        naacGrade: "A+",
        popularCourses: ["Computer Science", "Electronics", "Mechanical"],
        overallScore: 95,
      },
      {
        rank: 2,
        name: "University of Kashmir",
        logo: "/kashmir-university-logo.png",
        naacGrade: "A",
        popularCourses: ["Medicine", "Engineering", "Arts"],
        overallScore: 88,
      },
      {
        rank: 3,
        name: "SMVD University",
        logo: "/smvd-university-logo.png",
        naacGrade: "A",
        popularCourses: ["Engineering", "Management", "Pharmacy"],
        overallScore: 82,
      },
    ],
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-orange-500" />
      default:
        return <span className="text-lg font-bold text-primary">#{rank}</span>
    }
  }

  return (
    <Card className="glass-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">State Rankings</h2>
        <div className="relative">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div className="space-y-3">
        {leaderboardData[selectedState as keyof typeof leaderboardData]?.map((college, index) => (
          <Card
            key={index}
            className="p-4 hover:scale-105 transition-all duration-200 cursor-pointer border-l-4 border-l-primary"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10">{getRankIcon(college.rank)}</div>

              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{college.name.charAt(0)}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground truncate">{college.name}</h3>
                  <Badge className="bg-green-500 text-white text-xs">{college.naacGrade}</Badge>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {college.popularCourses.slice(0, 2).map((course, courseIndex) => (
                    <Badge key={courseIndex} variant="outline" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                  {college.popularCourses.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{college.popularCourses.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-bold text-primary">{college.overallScore}</div>
                <div className="text-xs text-muted-foreground">Overall Score</div>
              </div>
            </div>
          </Card>
        )) || (
          <div className="text-center text-muted-foreground py-8">
            <p>No data available for {selectedState}</p>
          </div>
        )}
      </div>
    </Card>
  )
}

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, Trophy, Star, Users, ArrowRight } from "lucide-react"

export function GamificationWidget() {
  const badges = [
    { name: "First Steps", icon: Star, color: "bg-yellow-500" },
    { name: "Quiz Master", icon: Trophy, color: "bg-purple-500" },
    { name: "Explorer", icon: Users, color: "bg-blue-500" },
  ]

  return (
    <Card className="glass-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Your Progress</h2>
        <Button variant="ghost" className="text-primary hover:text-primary/80">
          View All
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak Counter */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Flame className="h-6 w-6 text-orange-500 mr-2 animate-pulse" />
            <span className="text-2xl font-bold text-foreground">5</span>
          </div>
          <p className="text-sm text-muted-foreground">Day Streak!</p>
        </div>

        {/* Recent Badges */}
        <div className="text-center">
          <div className="flex justify-center space-x-2 mb-2">
            {badges.map((badge, index) => (
              <div key={index} className={`w-8 h-8 rounded-full ${badge.color} flex items-center justify-center`}>
                <badge.icon className="h-4 w-4 text-white" />
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Recent Badges</p>
        </div>

        {/* Leaderboard Position */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="text-2xl font-bold text-foreground">#47</span>
          </div>
          <Button variant="ghost" className="text-sm text-primary hover:text-primary/80 p-0 h-auto">
            View Leaderboard →
          </Button>
        </div>
      </div>
    </Card>
  )
}

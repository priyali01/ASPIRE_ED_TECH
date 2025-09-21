import { Card } from "@/components/ui/card"
import { Brain, GraduationCap, Trophy, Users, ArrowRight } from "lucide-react"

export function QuickLinks() {
  const quickLinks = [
    {
      icon: Brain,
      title: "Aptitude Quiz",
      description: "Review your strengths or retake the quiz",
      href: "/aptitude",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: GraduationCap,
      title: "Courses & Colleges",
      description: "Search our database of 500+ colleges",
      href: "/colleges",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Trophy,
      title: "Scholarships",
      description: "Find financial aid you are eligible for",
      href: "/scholarships",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Mentors/Alumni",
      description: "Connect with a guide for your journey",
      href: "/mentorship",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-foreground mb-4">Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <Card key={index} className="glass-card p-6 hover:scale-105 transition-all duration-200 group cursor-pointer">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.gradient} p-3 mb-4`}>
              <link.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {link.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{link.description}</p>
            <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
              <span>Explore</span>
              <ArrowRight className="ml-1 h-3 w-3" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

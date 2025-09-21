"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, GraduationCap, Users, Trophy, DollarSign, MessageCircle, ArrowRight, Sparkles } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "AI Career Analyzer",
      description:
        "Discover your perfect career path with our advanced AI that analyzes your skills, interests, and personality.",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0s",
    },
    {
      icon: GraduationCap,
      title: "College Explorer",
      description:
        "Explore 500+ colleges with detailed information, rankings, and admission requirements tailored to your profile.",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.2s",
    },
    {
      icon: Users,
      title: "Mentorship Network",
      description: "Connect with industry professionals and alumni who can guide you through your career journey.",
      gradient: "from-green-500 to-emerald-500",
      delay: "0.4s",
    },
    {
      icon: Trophy,
      title: "Gamified Progress",
      description: "Earn badges, track streaks, and compete with peers while building your career profile.",
      gradient: "from-orange-500 to-red-500",
      delay: "0.6s",
    },
    {
      icon: DollarSign,
      title: "Scholarships & ROI",
      description: "Find scholarships worth crores and calculate the ROI of your education investments.",
      gradient: "from-yellow-500 to-orange-500",
      delay: "0.8s",
    },
    {
      icon: MessageCircle,
      title: "24/7 AI Assistant",
      description:
        "Get instant answers to your career questions with our intelligent chatbot available round the clock.",
      gradient: "from-indigo-500 to-purple-500",
      delay: "1s",
    },
  ]

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by AI</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From career discovery to college admissions, from scholarships to mentorship - ASPIRE provides a complete
            ecosystem for your educational and career success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glass-card p-8 hover:scale-105 transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: feature.delay }}
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>

              <Button
                variant="ghost"
                className="p-0 h-auto text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="glass-card p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Future?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have already discovered their perfect career path with ASPIRE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-cta text-white hover:opacity-90">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-primary/20 hover:border-primary bg-transparent">
                Watch Demo
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

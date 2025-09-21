"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Users, BookOpen, Award, TrendingUp } from "lucide-react"
import { TypewriterEffect } from "@/components/advanced-animations/typewriter-effect"
import { FloatingWidgets } from "@/components/advanced-animations/floating-widgets"

export function HeroSection() {
  const words = [
    "career guide...",
    "mentor network...",
    "scholarship finder...",
    "college advisor...",
    "future planner...",
  ]

  const stats = [
    { icon: Users, label: "Active Students", value: "50K+", color: "text-blue-500" },
    { icon: BookOpen, label: "Career Paths", value: "200+", color: "text-green-500" },
    { icon: Award, label: "Scholarships", value: "1000+", color: "text-purple-500" },
    { icon: TrendingUp, label: "Success Rate", value: "95%", color: "text-orange-500" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full opacity-20 blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 blur-2xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="text-9xl font-bold text-gray-200 transform rotate-12">CLARITY</div>
      </div>
      <div className="absolute top-1/4 left-1/4 opacity-3 pointer-events-none">
        <div className="text-6xl font-bold text-gray-200 transform -rotate-12">GUIDANCE</div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 opacity-3 pointer-events-none">
        <div className="text-7xl font-bold text-gray-200 transform rotate-6">FUTURE</div>
      </div>

      <FloatingWidgets />

      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Transform Your{" "}
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Career Journey
                </span>
              </h1>

              <div className="text-xl lg:text-2xl text-gray-600">
                <TypewriterEffect words={words} baseText="Your Personal AI-Powered " className="leading-relaxed" />
              </div>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Discover your perfect career path with AI-powered guidance, connect with mentors, explore colleges, and
                unlock scholarships - all in one comprehensive platform designed for students across India.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-sky-400 to-indigo-400 text-white hover:opacity-90 group shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Journey for Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-sky-400/30 hover:border-sky-400 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
              >
                Explore Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-4 text-center bg-white/25 backdrop-blur-md border border-white/15 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Widgets */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-white/25 backdrop-blur-md border border-white/15 shadow-xl animate-float hover:scale-105 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-800">Career Match</span>
                </div>
                <div className="text-2xl font-bold text-sky-500 mb-2">92%</div>
                <div className="text-sm text-gray-600">Software Engineer</div>
              </Card>

              <Card
                className="p-6 bg-white/25 backdrop-blur-md border border-white/15 shadow-xl animate-float hover:scale-105 transition-all duration-300"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-800">Live Students</span>
                </div>
                <div className="text-2xl font-bold text-sky-500 mb-2">2,847</div>
                <div className="text-sm text-gray-600">Online Now</div>
              </Card>

              <Card
                className="p-6 bg-white/25 backdrop-blur-md border border-white/15 shadow-xl animate-float hover:scale-105 transition-all duration-300"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-800">New Scholarships</span>
                </div>
                <div className="text-2xl font-bold text-sky-500 mb-2">47</div>
                <div className="text-sm text-gray-600">This Week</div>
              </Card>

              <Card
                className="p-6 bg-white/25 backdrop-blur-md border border-white/15 shadow-xl animate-float hover:scale-105 transition-all duration-300"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-800">Success Rate</span>
                </div>
                <div className="text-2xl font-bold text-sky-500 mb-2">95.2%</div>
                <div className="text-sm text-gray-600">College Admissions</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

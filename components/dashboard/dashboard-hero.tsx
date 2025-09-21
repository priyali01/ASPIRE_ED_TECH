"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BookOpen, Users } from "lucide-react"

interface DashboardHeroProps {
  userName: string
  hasCompletedAptitude: boolean
}

export function DashboardHero({ userName, hasCompletedAptitude }: DashboardHeroProps) {
  return (
    <Card className="glass-card p-8 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="mb-6 lg:mb-0">
          {hasCompletedAptitude ? (
            <>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {userName}! Here's Your Progress.
              </h1>
              <p className="text-muted-foreground text-lg">
                Continue building your career profile and exploring opportunities.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome, {userName}! Let's Discover Your Path.
              </h1>
              <p className="text-muted-foreground text-lg">
                Take our comprehensive aptitude test to unlock personalized recommendations.
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {hasCompletedAptitude ? (
            <>
              <Button className="gradient-cta text-white hover:opacity-90 group">
                View Your Career Report
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-primary/20 hover:border-primary bg-transparent" asChild>
                <Link href="/colleges">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Recommended Colleges
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button className="gradient-cta text-white hover:opacity-90 group">
                Take the Aptitude Test
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-primary/20 hover:border-primary bg-transparent" asChild>
                <Link href="/colleges">
                  <Users className="mr-2 h-4 w-4" />
                  Explore Colleges Near Me
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

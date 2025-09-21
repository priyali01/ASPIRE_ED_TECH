"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Trophy, Target, TrendingUp } from "lucide-react"
import { QuizContainer } from "./quiz/quiz-container"

export function QuizSection() {
  const [showQuiz, setShowQuiz] = useState(false)

  if (showQuiz) {
    return <QuizContainer />
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Discover Your Perfect Career Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take our interactive quiz to explore career options that match your interests and get detailed insights about your ideal profession.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Quiz Preview */}
          <div>
            <Card className="glass-card p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Career Discovery Quiz</h3>
                <p className="text-muted-foreground mb-6">
                  Answer 5 quick questions about colleges and careers to get personalized recommendations
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <span className="text-foreground">Quick 5-question assessment</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <span className="text-foreground">Personalized career suggestions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <span className="text-foreground">Detailed career analysis & roadmap</span>
                </div>
              </div>

              <Button
                onClick={() => setShowQuiz(true)}
                className="w-full gradient-cta text-white py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Start Career Quiz
              </Button>
            </Card>
          </div>

          {/* Right Side - Features */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-card p-6 text-center">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">Smart Analysis</h4>
                <p className="text-muted-foreground text-sm">
                  Get comprehensive insights about salary ranges, growth prospects, and career roadmaps
                </p>
              </Card>

              <Card className="glass-card p-6 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">Personalized Results</h4>
                <p className="text-muted-foreground text-sm">
                  Receive career suggestions tailored to your interests and quiz performance
                </p>
              </Card>

              <Card className="glass-card p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">Market Insights</h4>
                <p className="text-muted-foreground text-sm">
                  Learn about job market demand, top companies, and investment requirements
                </p>
              </Card>

              <Card className="glass-card p-6 text-center">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">Interactive Experience</h4>
                <p className="text-muted-foreground text-sm">
                  Engaging quiz format with animations and instant feedback
                </p>
              </Card>
            </div>

            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold text-foreground mb-3">What You'll Get:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Detailed career roadmaps and progression paths
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Salary ranges from entry to senior level
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Market demand analysis and growth prospects
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Top companies and locations for each career
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  ROI analysis and investment requirements
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

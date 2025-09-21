"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Trophy, Clock, Target } from "lucide-react"

interface QuizStartProps {
  onStart: () => void
}

export function QuizStart({ onStart }: QuizStartProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="glass-card max-w-2xl w-full p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Test Your College Knowledge!</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Answer 5 questions about top colleges in India and discover your ideal career path
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4 rounded-lg">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Career Discovery</h3>
            <p className="text-sm text-muted-foreground">Get personalized career suggestions</p>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Quick & Fun</h3>
            <p className="text-sm text-muted-foreground">5 questions in under 3 minutes</p>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Detailed Analysis</h3>
            <p className="text-sm text-muted-foreground">Comprehensive career insights</p>
          </div>
        </div>

        <Button 
          onClick={onStart}
          className="gradient-cta text-white px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Start Quiz
        </Button>
      </Card>
    </div>
  )
}

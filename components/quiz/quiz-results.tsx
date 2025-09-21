"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, RotateCcw, Share2, Target, Users } from "lucide-react"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  answers: Array<{
    question: string
    userAnswer: string | string[] | boolean
    correctAnswer: string | string[] | boolean
    isCorrect: boolean
  }>
  onRestart: () => void
  onViewCareerAnalysis: () => void
}

export function QuizResults({ 
  score, 
  totalQuestions, 
  answers, 
  onRestart, 
  onViewCareerAnalysis 
}: QuizResultsProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2500)
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="glass-card max-w-4xl w-full p-8">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce" />
            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
            <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.6s" }} />
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Great Job!</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Thanks for sharing your choices. Let’s see what they say about your interests 🚀
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4 rounded-lg text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Questions Answered</div>
          </div>
          <div className="glass-card p-4 rounded-lg text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">Discover your interests</div>
            <div className="text-sm text-muted-foreground">Exploring Yourself</div>
          </div>
          <div className="glass-card p-4 rounded-lg text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">Choose your career</div>
            <div className="text-sm text-muted-foreground">Explore options</div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Your Choices</h3>
          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div key={index} className="glass-card p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  Question {index + 1}: {answer.question}
                </h4>
                <p className="text-muted-foreground">
                  <span className="font-medium text-foreground">Your Answer: </span>
                  <span className="text-blue-600">
                    {Array.isArray(answer.userAnswer) 
                      ? answer.userAnswer.join(", ") 
                      : String(answer.userAnswer)
                    }
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onViewCareerAnalysis}
            className="gradient-cta text-white px-8 py-3 hover:opacity-90 transition-opacity"
          >
            <Target className="h-4 w-4 mr-2" />
            View Career Analysis
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-primary/20 hover:border-primary bg-transparent px-8 py-3"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "My Quiz Results",
                  text: "I just finished a career interests quiz! 🚀",
                })
              } else {
                navigator.clipboard.writeText("I just finished a career interests quiz! 🚀")
              }
            }}
            variant="outline"
            className="border-primary/20 hover:border-primary bg-transparent px-8 py-3"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </Card>
    </div>
  )
}

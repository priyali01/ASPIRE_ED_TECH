"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"
import clsx from "clsx"

interface QuizQuestionProps {
  question: {
    id: number
    type: "mcq" | "multiselect" | "truefalse"
    question: string
    options?: string[]
  }
  currentQuestion: number
  totalQuestions: number
  onAnswer: (answer: string | string[] | boolean) => void
  onNext: () => void
  timeLimit?: number
}

export function QuizQuestion({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  onNext,
  timeLimit = 30,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | boolean>(
    question.type === "multiselect" ? [] : null
  )
  const [isAnswered, setIsAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  const progress = (currentQuestion / totalQuestions) * 100

  // Timer
  useEffect(() => {
    if (isAnswered) return
    if (timeLeft <= 0) {
      handleAnswer(question.type === "multiselect" ? [] : "")
      return
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, isAnswered, question.id])

  // Reset on new question
  useEffect(() => {
    setSelectedAnswer(question.type === "multiselect" ? [] : null)
    setIsAnswered(false)
    setTimeLeft(timeLimit)
  }, [question.id, timeLimit])

  const handleAnswer = (answer: string | string[] | boolean) => {
    if (isAnswered) return
    setSelectedAnswer(answer)
    setIsAnswered(true)
    onAnswer(answer)
  }

  const handleNext = () => onNext()

  const getOptionClass = (option: string) => {
    const isSelected =
      question.type === "multiselect"
        ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
        : selectedAnswer === option

    return clsx(
      "glass-card p-4 rounded-lg cursor-pointer transition-all duration-200",
      isSelected
        ? "bg-blue-500/20 border border-blue-500 text-blue-700"
        : "hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="glass-card max-w-4xl w-full p-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{timeLeft}s</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-foreground mb-6 leading-relaxed">
          {question.question}
        </h2>

        {/* Options */}
        {question.type === "truefalse" ? (
          <div className="grid grid-cols-2 gap-4">
            {[true, false].map((val) => (
              <Button
              key={val.toString()}
              onClick={() => handleAnswer(val)}
              disabled={isAnswered}
              className={clsx(
                "h-16 text-lg font-semibold transition-all",
                selectedAnswer === val
                  ? "bg-blue-500/20 border border-blue-500 text-blue-700"
                  : "glass-card hover:scale-105"
              )}
            >
              {val ? "True" : "False"}
            </Button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options?.map((option) => (
              <div
                key={option}
                onClick={() => {
                  if (isAnswered && question.type !== "multiselect") return
                  if (question.type === "multiselect") {
                    const current = (selectedAnswer as string[]) || []
                    const updated = current.includes(option)
                      ? current.filter((o) => o !== option)
                      : [...current, option]
                    setSelectedAnswer(updated)
                  } else {
                    handleAnswer(option)
                  }
                }}
                className={getOptionClass(option)}
              >
                <span className="font-medium">{option}</span>
              </div>
            ))}
          </div>
        )}

        {/* Multiselect Submit */}
        {question.type === "multiselect" && !isAnswered && (
          <div className="mt-6 text-center">
            <Button
              onClick={() => handleAnswer(selectedAnswer as string[])}
              disabled={!Array.isArray(selectedAnswer) || selectedAnswer.length === 0}
              className="gradient-cta text-white px-8 py-3"
            >
              Submit Answer
            </Button>
          </div>
        )}

        {/* Next */}
        {isAnswered && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleNext}
              className="gradient-cta text-white px-8 py-3 hover:opacity-90 transition-opacity"
            >
              {currentQuestion === totalQuestions ? "View Results" : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}

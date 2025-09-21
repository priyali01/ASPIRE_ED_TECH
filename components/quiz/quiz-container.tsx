"use client"

import { useState } from "react"
import { QuizStart } from "./quiz-start"
import { QuizQuestion } from "./quiz-question"
import { QuizResults } from "./quiz-results"
import { CareerAnalysis } from "./career-analysis"

// Interest Quiz for Teenagers (15–16 y/o)
const sampleQuiz = [
  {
    id: 1,
    type: "mcq" as const,
    question: "Which activity sounds most fun to you?",
    options: ["Building a mobile app", "Writing a short story", "Helping at a hospital", "Designing a poster"],
    answer: null
  },
  {
    id: 2,
    type: "truefalse" as const,
    question: "I enjoy solving puzzles and brain teasers.",
    answer: null
  },
  {
    id: 3,
    type: "multiselect" as const,
    question: "Which of these do you like doing in your free time? (Select all that apply)",
    options: ["Coding or gaming", "Drawing or painting", "Sports or outdoor games", "Helping friends with problems"],
    answer: null
  },
  {
    id: 4,
    type: "mcq" as const,
    question: "If you had a free day, what would you choose?",
    options: ["Visit a science museum", "Play football with friends", "Write poems or songs", "Volunteer at an animal shelter"],
    answer: null
  },
  {
    id: 5,
    type: "mcq" as const,
    question: "Which word best describes you?",
    options: ["Curious", "Creative", "Caring", "Adventurous"],
    answer: null
  },
  // New Questions
  {
    id: 6,
    type: "mcq" as const,
    question: "What excites you the most about the future?",
    options: ["Artificial Intelligence", "Art and Movies", "Helping People", "Exploring New Places"],
    answer: null
  },
  {
    id: 7,
    type: "truefalse" as const,
    question: "I often wonder how apps, games, or websites are built.",
    answer: null
  },
  {
    id: 8,
    type: "mcq" as const,
    question: "Which subject do you enjoy more?",
    options: ["Math & Science", "Languages", "Biology", "Physical Education"],
    answer: null
  },
  {
    id: 9,
    type: "multiselect" as const,
    question: "Pick the kinds of projects you'd love to work on:",
    options: ["Robotics", "Creative Writing", "Medical Research", "Sports Training App"],
    answer: null
  },
  {
    id: 10,
    type: "mcq" as const,
    question: "If you had to choose a challenge, which one excites you?",
    options: ["Coding a game", "Directing a short film", "Helping organize a charity drive", "Climbing a mountain"],
    answer: null
  }
]

type QuizState = "start" | "question" | "results" | "career-analysis"

export function QuizContainer() {
  const [currentState, setCurrentState] = useState<QuizState>("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<
    Array<{
      question: string
      userAnswer: string | string[] | boolean
    }>
  >([])
  const [score, setScore] = useState(0) // kept for compatibility

  const handleStart = () => {
    setCurrentState("question")
    setCurrentQuestion(0)
    setAnswers([])
    setScore(0)
  }

  const handleAnswer = (answer: string | string[] | boolean) => {
    const question = sampleQuiz[currentQuestion]

    const newAnswer = {
      question: question.question,
      userAnswer: answer
    }

    setAnswers(prev => [...prev, newAnswer])
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuiz.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setCurrentState("results")
    }
  }

  const handleRestart = () => {
    setCurrentState("start")
    setCurrentQuestion(0)
    setAnswers([])
    setScore(0)
  }

  const handleViewCareerAnalysis = () => {
    setCurrentState("career-analysis")
  }

  // For now, hardcode to always suggest CSE
  const getCareerSuggestions = () => {
    return ["Computer Science & Engineering (CSE)"]
  }

  if (currentState === "start") {
    return <QuizStart onStart={handleStart} />
  }

  if (currentState === "question") {
    return (
      <QuizQuestion
        question={sampleQuiz[currentQuestion]}
        currentQuestion={currentQuestion + 1}
        totalQuestions={sampleQuiz.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
        timeLimit={30}
      />
    )
  }

  if (currentState === "results") {
    return (
      <QuizResults
        score={score}
        totalQuestions={sampleQuiz.length}
        answers={answers}
        onRestart={handleRestart}
        onViewCareerAnalysis={handleViewCareerAnalysis}
      />
    )
  }

  if (currentState === "career-analysis") {
    return (
      <CareerAnalysis
        suggestedCareers={getCareerSuggestions()}
        quizScore={score}
        totalQuestions={sampleQuiz.length}
        onBackToResults={() => setCurrentState("results")}
        onRetakeQuiz={handleRestart}
      />
    )
  }

  return null
}

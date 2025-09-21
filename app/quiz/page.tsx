"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuizContainer } from "@/components/quiz/quiz-container"

export default function QuizPage() {
  return (
    <>
      <div className="mb-4">
        <Button variant="ghost" asChild>
          <Link href="/dashboard" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <QuizContainer />
    </>
  )
}

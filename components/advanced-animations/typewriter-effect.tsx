"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  words: string[]
  baseText?: string
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function TypewriterEffect({
  words,
  baseText = "Your Personal AI-Powered ",
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1))
          } else {
            // Finished typing, start deleting after pause
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            // Finished deleting, move to next word
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span className={className}>
      {baseText}
      <span className="text-sky-400 font-semibold">
        {currentText}
        <span
          className={`inline-block w-0.5 h-6 bg-sky-400 ml-1 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}
        />
      </span>
    </span>
  )
}

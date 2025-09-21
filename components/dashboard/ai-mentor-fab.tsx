"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

export function AIMentorFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const sampleQuestions = [
    "What career suits my interests?",
    "Which colleges should I consider?",
    "How to prepare for JEE?",
    "Tell me about scholarships",
  ]

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-cta text-white hover:opacity-90 shadow-lg animate-glow z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-6 z-50">
          <Card className="glass-card w-full max-w-md h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/20">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Mentor</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-sm text-foreground">
                    Hi! I'm your AI mentor. I can help you with career guidance, college selection, scholarships, and
                    more. What would you like to know?
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Quick questions:</p>
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setMessage(question)}
                      className="block w-full text-left text-xs bg-muted/50 hover:bg-muted rounded-lg p-2 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/20">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      // Handle send message
                      setMessage("")
                    }
                  }}
                />
                <Button size="icon" className="gradient-cta text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

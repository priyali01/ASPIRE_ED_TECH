"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export function AIMentorFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const sampleQuestions = [
    { text: "What career suits my interests?", link: "/career-guidance" },
    { text: "Which colleges should I consider?", link: "/college-finder" },
    { text: "How to prepare for JEE?", link: "/exam-prep/jee" },
    { text: "Tell me about scholarships", link: "/scholarships" },
  ]

  const handleQuestionClick = (link: string) => {
    router.push(link)
    setIsOpen(false)
  }

  const handleSendMessage = async () => {
    if (!message.trim()) return
    const userMessage = message
    setMessage("")
    setChat((prev) => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      // ⚠️ Only for demo: key is exposed in client!
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: userMessage }],
              },
            ],
          }),
        }
      )

      const data = await res.json()
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t answer that."

      setChat((prev) => [...prev, { role: "assistant", content: reply }])
    } catch (err) {
      console.error(err)
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: Couldn’t connect to AI." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full gradient-cta text-white hover:opacity-90 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-end justify-end p-6 z-50"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
            >
              <Card className="glass-card w-full max-w-md h-96 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/20">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center"
                    >
                      <MessageCircle className="h-4 w-4 text-white" />
                    </motion.div>
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
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chat.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded-lg text-sm max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white ml-auto"
                          : "bg-muted/70 text-foreground mr-auto"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))}
                  {loading && <p className="text-xs text-muted-foreground">AI is typing...</p>}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border/20">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage()
                      }}
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={handleSendMessage} size="icon" className="gradient-cta text-white">
                        <Send className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

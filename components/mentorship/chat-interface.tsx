"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, Smile, Phone, Video, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "text" | "file" | "system"
}

interface ChatInterfaceProps {
  mentorId: string
  mentorName: string
  mentorAvatar: string
  isOnline: boolean
}

export function ChatInterface({ mentorId, mentorName, mentorAvatar, isOnline }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: mentorId,
      senderName: mentorName,
      content: "Hi! Thanks for reaching out. How can I help you with your career goals today?",
      timestamp: new Date(Date.now() - 300000),
      type: "text",
    },
    {
      id: "2",
      senderId: "user",
      senderName: "You",
      content:
        "Hello! I'm interested in transitioning to a product management role. Could you guide me on the skills I should focus on?",
      timestamp: new Date(Date.now() - 240000),
      type: "text",
    },
    {
      id: "3",
      senderId: mentorId,
      senderName: mentorName,
      content:
        "Great question! Product management requires a mix of technical understanding, business acumen, and strong communication skills. Let me break this down for you...",
      timestamp: new Date(Date.now() - 180000),
      type: "text",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: "user",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate mentor typing and response
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const mentorResponse: Message = {
        id: (Date.now() + 1).toString(),
        senderId: mentorId,
        senderName: mentorName,
        content: "That's a great point! Let me think about the best way to approach this...",
        timestamp: new Date(),
        type: "text",
      }
      setMessages((prev) => [...prev, mentorResponse])
    }, 2000)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="flex flex-col h-[600px] bg-background/30 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-background/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={mentorAvatar || "/placeholder.svg"}
              alt={mentorName}
              className="w-10 h-10 rounded-full object-cover"
            />
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-foreground">{mentorName}</h3>
            <p className="text-xs text-muted-foreground">{isOnline ? "Online now" : "Last seen 2 hours ago"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === "user" ? "bg-primary text-primary-foreground" : "bg-background/50 text-foreground"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.senderId === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-background/50 rounded-lg p-3 max-w-[70%]">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground ml-2">{mentorName} is typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-primary/10 bg-background/20">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Smile className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="bg-background/50 border-primary/20 focus:border-primary/40"
            />
          </div>
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

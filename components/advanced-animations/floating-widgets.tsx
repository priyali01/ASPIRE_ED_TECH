"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Award, Target } from "lucide-react"

const widgets = [
  {
    id: "aptitude",
    title: "Your Aptitude Profile",
    position: { top: "20%", right: "10%" },
    delay: 0.2,
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-medium">RIASEC Analysis</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="w-8 h-8 bg-sky-400/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-xs font-bold text-sky-400">R</span>
            </div>
            <span className="text-xs text-gray-600">85%</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-xs font-bold text-purple-400">I</span>
            </div>
            <span className="text-xs text-gray-600">92%</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 bg-indigo-400/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-xs font-bold text-indigo-400">A</span>
            </div>
            <span className="text-xs text-gray-600">78%</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "mentor",
    title: "Connect with Alumni Mentor",
    position: { top: "40%", left: "5%" },
    delay: 0.4,
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Arjun Mehta</p>
            <p className="text-xs text-gray-600">Software Engineer @ Google</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-green-600">Available now</span>
        </div>
      </div>
    ),
  },
  {
    id: "scholarship",
    title: "New Scholarship Match!",
    position: { bottom: "30%", right: "15%" },
    delay: 0.6,
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium">Merit Scholarship</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Amount</span>
            <span className="text-sm font-bold text-green-600">₹2,50,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Match</span>
            <Badge variant="secondary" className="text-xs">
              94% Eligible
            </Badge>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "career-path",
    title: "Career Path Visualization",
    position: { bottom: "15%", left: "50%", transform: "translateX(-50%)" },
    delay: 0.8,
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-sky-400" />
          <span className="text-sm font-medium">Your Selected Stream</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="w-8 h-8 bg-sky-400/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-xs">🎓</span>
            </div>
            <span className="text-xs text-gray-600">Engineering</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-sky-400 to-purple-400 mx-2" />
          <div className="text-center">
            <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-xs">💼</span>
            </div>
            <span className="text-xs text-gray-600">Tech Career</span>
          </div>
        </div>
      </div>
    ),
  },
]

export function FloatingWidgets() {
  return (
    <>
      {widgets.map((widget) => (
        <motion.div
          key={widget.id}
          className="absolute z-10 hidden lg:block"
          style={widget.position}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: widget.delay,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
          }}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 },
          }}
        >
          <Card className="p-4 w-64 bg-white/25 backdrop-blur-md border border-white/15 shadow-xl">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">{widget.title}</h3>
            {widget.content}
          </Card>
        </motion.div>
      ))}
    </>
  )
}

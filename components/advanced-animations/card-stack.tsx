"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Target, GraduationCap, DollarSign, Users, TrendingUp, Globe } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "AI Career Matching",
    description: "99% accuracy in career-personality fit using advanced algorithms",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    icon: GraduationCap,
    title: "College Database",
    description: "15,000+ verified institutions with real-time admission data",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    icon: DollarSign,
    title: "Smart Scholarships",
    description: "₹500 crore+ funding opportunities matched to your profile",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "5,000+ industry professionals and alumni ready to guide you",
    gradient: "from-orange-400 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Gamified journey with achievement system and milestone rewards",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    icon: Globe,
    title: "Community Hub",
    description: "Connect with peers, share experiences, and celebrate success stories",
    gradient: "from-cyan-400 to-teal-500",
  },
]

export function CardStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need for Career Success</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines AI technology, expert guidance, and community support to accelerate your
            career journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  rotateX: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="p-6 h-full bg-white/25 backdrop-blur-md border border-white/15 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

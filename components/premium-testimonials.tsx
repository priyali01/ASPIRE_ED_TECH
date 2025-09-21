"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { useRef } from "react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Engineering Student",
    university: "IIT Delhi",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    quote:
      "ASPIRE helped me discover my passion for AI and guided me to the perfect engineering program. The mentorship was invaluable!",
    achievement: "Secured admission to IIT Delhi",
  },
  {
    name: "Arjun Patel",
    role: "Medical Student",
    university: "AIIMS Mumbai",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    quote:
      "The scholarship matching feature helped me secure ₹3 lakhs in funding. I couldn't have done it without ASPIRE's guidance.",
    achievement: "₹3L scholarship recipient",
  },
  {
    name: "Sneha Reddy",
    role: "Business Student",
    university: "ISB Hyderabad",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    quote:
      "From career confusion to clarity in 30 days! The AI recommendations were spot-on and the community support was amazing.",
    achievement: "Career clarity in 30 days",
  },
  {
    name: "Rahul Kumar",
    role: "Software Engineer",
    university: "Google",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    quote: "Started as a confused 12th grader, now working at Google. ASPIRE's career roadmap made all the difference.",
    achievement: "Now at Google",
  },
]

export function PremiumTestimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-sky-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories from Our Students</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students who transformed their careers with ASPIRE's guidance
          </p>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-80"
              style={{ scrollSnapAlign: "start" }}
            >
              <Card className="p-6 h-full bg-white/70 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-sky-600 font-medium">{testimonial.university}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-sky-400 opacity-50 absolute -top-2 -left-2" />
                  <p className="text-gray-700 italic pl-4">"{testimonial.quote}"</p>
                </div>

                <div className="bg-gradient-to-r from-sky-400 to-indigo-400 text-white px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {testimonial.achievement}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

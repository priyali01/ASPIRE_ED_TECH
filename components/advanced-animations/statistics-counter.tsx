"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"

interface CounterProps {
  value: number
  duration?: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ value, duration = 2, suffix = "", prefix = "" }: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const displayed = useTransform(springValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{displayed}</motion.span>
      {suffix}
    </span>
  )
}

const statistics = [
  {
    value: 85,
    suffix: "%",
    label: "students find career clarity within 30 days",
    icon: "🎯",
  },
  {
    value: 10000,
    suffix: "+",
    label: "successful college admissions",
    icon: "🎓",
  },
  {
    value: 500,
    suffix: "+",
    label: "industry mentors available",
    icon: "👥",
  },
  {
    value: 50000,
    suffix: "+",
    label: "students on their success journey",
    icon: "🚀",
  },
]

export function StatisticsCounter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-r from-sky-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of Students</h2>
          <p className="text-xl text-gray-600">
            Join the growing community of successful students who found their path with ASPIRE
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="text-center"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2 + index * 0.2} />
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Stethoscope, Code, Palette, Calculator, GraduationCap, Briefcase } from "lucide-react"

export function CareerCategories() {
  const categories = [
    {
      id: "healthcare",
      name: "Healthcare",
      icon: Stethoscope,
      count: "45+ careers",
      gradient: "from-green-500 to-emerald-500",
      description: "Medicine, nursing, therapy, and health sciences",
    },
    {
      id: "technology",
      name: "Technology",
      icon: Code,
      count: "60+ careers",
      gradient: "from-blue-500 to-cyan-500",
      description: "Software, AI, cybersecurity, and IT",
    },
    {
      id: "creative",
      name: "Creative Arts",
      icon: Palette,
      count: "35+ careers",
      gradient: "from-purple-500 to-pink-500",
      description: "Design, media, entertainment, and arts",
    },
    {
      id: "business",
      name: "Business & Finance",
      icon: Briefcase,
      count: "40+ careers",
      gradient: "from-orange-500 to-red-500",
      description: "Management, finance, consulting, and entrepreneurship",
    },
    {
      id: "science",
      name: "Science & Research",
      icon: Calculator,
      count: "30+ careers",
      gradient: "from-indigo-500 to-purple-500",
      description: "Research, laboratory work, and scientific analysis",
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      count: "25+ careers",
      gradient: "from-teal-500 to-cyan-500",
      description: "Teaching, training, and educational administration",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Explore by Category</h2>
      <p className="text-muted-foreground mb-6">Discover careers that match your interests and skills</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="group">
            <Card className="glass-card p-6 hover:scale-105 transition-all duration-300 h-full flex flex-col">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <category.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>

              <p className="text-muted-foreground text-sm mb-3 leading-relaxed flex-grow">
                {category.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-primary font-semibold text-sm">{category.count}</span>
                <Link
                  href={`/career-explorer/${category.id}`}
                  className="text-primary text-sm group-hover:translate-x-1 transition-transform 
                             hover:text-white hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                >
                  Explore →
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

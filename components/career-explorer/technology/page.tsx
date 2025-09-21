"use client"

import React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type TechCareer = {
  id: string
  title: string
  description: string
  avgSalary: string
  colleges: { id: string; name: string; href: string }[]
}

const TECHNOLOGY_CAREERS: TechCareer[] = [
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Work with data pipelines, build models and translate insights to business outcomes.",
    avgSalary: "₹6L - ₹20L",
    colleges: [
      { id: "3", name: "IIT Madras", href: "/colleges?iitm=3" },
      { id: "4", name: "IIIT Bangalore", href: "/colleges?iiitb=4" },
    ],
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer",
    description: "Build and productionize ML models; focus on model infra and MLOps.",
    avgSalary: "₹8L - ₹25L",
    colleges: [{ id: "6", name: "IISc Bangalore", href: "/colleges?iisc=6" }],
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Create interactive UIs, optimize performance and implement design systems.",
    avgSalary: "₹4L - ₹18L",
    colleges: [{ id: "7", name: "IIIT Hyderabad", href: "/colleges?iiith=7" }],
  },
]

export function TechnologyExplore() {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TECHNOLOGY_CAREERS.map((c) => (
          <Card key={c.id} className="p-4">
            <h3 className="text-lg font-semibold">{c.title}</h3>
            <p className="text-sm text-slate-700 mt-2 line-clamp-3">{c.description}</p>
            <div className="mt-3 text-sm text-slate-800 font-medium">{c.avgSalary}</div>

            <div className="mt-4 flex flex-col gap-2">
              <Link href={`/colleges?program=${encodeURIComponent(c.title)}`}>
                <Button size="sm">Find colleges</Button>
              </Link>

              <div className="text-sm text-slate-600">
                Recommended:
                <ul className="list-disc ml-5 mt-1">
                  {c.colleges.map((col) => (
                    <li key={col.id}>
                      <Link href={col.href} className="text-sky-600">
                        {col.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
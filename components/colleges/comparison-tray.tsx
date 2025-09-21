"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, GitCompare } from "lucide-react"

interface ComparisonTrayProps {
  colleges: any[]
  onRemove: (collegeId: number) => void
  onCompare: () => void
  onClear: () => void
}

export function ComparisonTray({ colleges, onRemove, onCompare, onClear }: ComparisonTrayProps) {
  if (colleges.length === 0) return null

  return (
    <Card className="fixed bottom-6 left-1/2 transform -translate-x-1/2 glass-card p-4 z-40 w-full max-w-4xl mx-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <GitCompare className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Compare Colleges</span>
            <Badge variant="secondary">{colleges.length}/3</Badge>
          </div>

          <div className="flex space-x-2">
            {colleges.map((college) => (
              <div key={college.id} className="flex items-center space-x-2 bg-muted/20 rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-foreground truncate max-w-32">{college.name}</span>
                <button onClick={() => onRemove(college.id)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClear}>
            Clear All
          </Button>
          <Button
            onClick={onCompare}
            disabled={colleges.length < 2}
            className="gradient-cta text-white hover:opacity-90"
          >
            Compare Now
          </Button>
        </div>
      </div>
    </Card>
  )
}

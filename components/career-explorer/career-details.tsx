import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CareerDetailsProps {
  title: string
  description: string
  salaryRange: string
  growthRate: string
  skills: string[]
  relatedCareers: string[]
}

export function CareerDetails({
  title,
  description,
  salaryRange,
  growthRate,
  skills,
  relatedCareers
}: CareerDetailsProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Salary Range</h3>
          <p>{salaryRange}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Job Growth</h3>
          <p>{growthRate}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Key Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="bg-accent px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Related Careers</h3>
        <div className="flex flex-wrap gap-2">
          {relatedCareers.map((career) => (
            <Button key={career} variant="outline" size="sm">
              {career}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
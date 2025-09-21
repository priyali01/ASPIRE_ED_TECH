import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CareerGuidance() {
  return (
    <div className="container py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">Career Guidance</h1>
      <div className="space-y-4">
        <p>Take our career assessment to discover careers that match your interests and skills.</p>
        <Button>Start Assessment</Button>
      </div>
    </div>
  )
}
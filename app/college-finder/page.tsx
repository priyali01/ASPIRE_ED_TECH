import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CollegeFinder() {
  return (
    <div className="container py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">College Finder</h1>
      <div className="space-y-4">
        <p>Find colleges that match your preferences and academic profile.</p>
        <div className="flex gap-4">
          <Button>Search by Location</Button>
          <Button>Search by Course</Button>
        </div>
      </div>
    </div>
  )
}
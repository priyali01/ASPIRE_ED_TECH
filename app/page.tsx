import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { CardStack } from "@/components/advanced-animations/card-stack"
import { StatisticsCounter } from "@/components/advanced-animations/statistics-counter"
import { PremiumTestimonials } from "@/components/premium-testimonials"
import { Footer } from "@/components/footer"
import { QuizSection } from "@/components/quiz-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <GlassmorphismNav />
      <HeroSection />
      <CardStack />
      <StatisticsCounter />
      <QuizSection />
      <PremiumTestimonials />
      <FeaturesSection />
      <Footer />
    </main>
  )
}

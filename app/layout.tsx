import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ASPIRE - Career Guidance Platform",
  description:
    "AI-powered career guidance platform for students in Jammu & Kashmir and India. Discover careers, explore colleges, find scholarships, and connect with mentors.",
  generator: "v0.app",
  keywords: ["career guidance", "education", "scholarships", "colleges", "mentorship", "AI", "students", "India"],
  authors: [{ name: "ASPIRE Team" }],
  openGraph: {
    title: "ASPIRE - Career Guidance Platform",
    description: "AI-powered career guidance platform for students",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

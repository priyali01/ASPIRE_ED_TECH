"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Career Explorer", href: "/career-explorer" },
        { name: "College Directory", href: "/colleges" },
        { name: "Scholarships", href: "/scholarships" },
        { name: "Mentorship", href: "/mentorship" },
        { name: "AI Assistant", href: "/ai-assistant" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Career Guides", href: "/guides" },
        { name: "Webinars", href: "/webinars" },
        { name: "Help Center", href: "/help" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Data Protection", href: "/data-protection" },
        { name: "Accessibility", href: "/accessibility" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/aspire", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/aspire", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/aspire", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/aspire", label: "LinkedIn" },
  ]

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      setIsSubscribing(true)
      // Add your newsletter subscription API call here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      setEmail("")
      alert("Thank you for subscribing!")
    } catch (error) {
      alert("Failed to subscribe. Please try again.")
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section - Takes 2 columns */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6 hover:opacity-90 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-2xl font-bold">ASPIRE</span>
            </Link>
            
            <p className="text-background/70 leading-relaxed mb-6 max-w-md">
              Empowering students across India to discover their perfect career path through AI-powered guidance,
              mentorship, and comprehensive educational resources.
            </p>

            <div className="space-y-3">
              <a 
                href="mailto:hello@aspire.edu" 
                className="flex items-center space-x-3 hover:text-primary transition-colors group"
              >
                <Mail className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-background/70 group-hover:text-primary">hello@aspire.edu</span>
              </a>
              <a 
                href="tel:+919876543210" 
                className="flex items-center space-x-3 hover:text-primary transition-colors group"
              >
                <Phone className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-background/70 group-hover:text-primary">+91 98765 43210</span>
              </a>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-background/70">Srinagar, Jammu & Kashmir</span>
              </div>
            </div>
          </div>

          {/* Footer Links - Each takes 1 column */}
          {footerSections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="font-semibold text-background mb-4">{section.title}</h3>
              <ul className="space-y-3" role="list">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-primary transition-colors duration-200 text-sm inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/20 pt-12 mb-12">
          <div className="max-w-md">
            <h3 className="font-semibold text-background mb-4">Stay Updated</h3>
            <p className="text-background/70 text-sm mb-4">
              Get the latest career insights, scholarship opportunities, and platform updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email subscription"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button 
                type="submit"
                disabled={isSubscribing}
                className="gradient-cta text-white hover:opacity-90 disabled:opacity-50"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-background/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ASPIRE. All rights reserved.
                      </div>

          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors duration-200 group"
              >
                <Icon className="h-4 w-4 text-background/70 group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

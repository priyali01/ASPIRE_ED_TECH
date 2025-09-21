"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  ArrowLeft,
  User,
  GraduationCap,
  Heart,
  Code,
  Palette,
  Calculator,
  Stethoscope,
  Briefcase,
  Music,
  Camera,
} from "lucide-react"

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      dateOfBirth: "",
      city: "",
      state: "",
      currentClass: "",
    },
    interests: [],
    aptitudeAnswer: "",
  })

  const steps = [
    { title: "Personal Information", description: "Tell us about yourself" },
    { title: "Your Interests", description: "What excites you?" },
    { title: "Quick Assessment", description: "One simple question" },
    { title: "AI Processing", description: "Creating your profile" },
  ]

  const interests = [
    { id: "technology", name: "Technology", icon: Code, color: "from-blue-500 to-cyan-500" },
    { id: "healthcare", name: "Healthcare", icon: Stethoscope, color: "from-green-500 to-emerald-500" },
    { id: "business", name: "Business", icon: Briefcase, color: "from-purple-500 to-pink-500" },
    { id: "arts", name: "Creative Arts", icon: Palette, color: "from-orange-500 to-red-500" },
    { id: "science", name: "Science", icon: Calculator, color: "from-indigo-500 to-purple-500" },
    { id: "music", name: "Music", icon: Music, color: "from-yellow-500 to-orange-500" },
    { id: "photography", name: "Photography", icon: Camera, color: "from-pink-500 to-rose-500" },
    { id: "education", name: "Education", icon: GraduationCap, color: "from-teal-500 to-cyan-500" },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleInterest = (interestId: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to ASPIRE!</h2>
              <p className="text-muted-foreground">Let's get to know you better</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.personalInfo.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, fullName: e.target.value },
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentClass">Current Class</Label>
                  <select
                    id="currentClass"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    value={formData.personalInfo.currentClass}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, currentClass: e.target.value },
                      }))
                    }
                  >
                    <option value="">Select class</option>
                    <option value="10th">Class 10th</option>
                    <option value="11th">Class 11th</option>
                    <option value="12th">Class 12th</option>
                    <option value="graduate">Graduate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Your city"
                    value={formData.personalInfo.city}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, city: e.target.value },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Your state"
                    value={formData.personalInfo.state}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, state: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">What Interests You?</h2>
              <p className="text-muted-foreground">Select all areas that excite you (minimum 2)</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {interests.map((interest) => (
                <Card
                  key={interest.id}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
                    formData.interests.includes(interest.id) ? "ring-2 ring-primary bg-primary/10" : "hover:bg-muted/50"
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${interest.color} p-3 mb-3 mx-auto`}>
                    <interest.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-sm">{interest.name}</div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Selected: {formData.interests.length} interests
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Quick Assessment</h2>
              <p className="text-muted-foreground">Just one question to understand you better</p>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">What motivates you most when choosing a career?</h3>
              <div className="space-y-3">
                {[
                  "Making a positive impact on society",
                  "Financial stability and growth",
                  "Creative expression and innovation",
                  "Intellectual challenges and learning",
                  "Work-life balance and flexibility",
                ].map((option, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="motivation"
                      value={option}
                      checked={formData.aptitudeAnswer === option}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aptitudeAnswer: e.target.value,
                        }))
                      }
                      className="text-primary"
                    />
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">A</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Creating Your Profile</h2>
              <p className="text-muted-foreground mb-8">Our AI is analyzing your responses...</p>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>

                <div className="text-sm text-muted-foreground">Analyzing your interests and preferences...</div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">{steps[currentStep].title}</span>
          </div>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="glass-card p-8 mb-8">{renderStep()}</Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !formData.personalInfo.fullName) ||
                (currentStep === 1 && formData.interests.length < 2) ||
                (currentStep === 2 && !formData.aptitudeAnswer)
              }
              className="gradient-cta text-white hover:opacity-90 flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Simulate AI processing and redirect to dashboard
                setTimeout(() => {
                  window.location.href = "/dashboard"
                }, 3000)
              }}
              className="gradient-cta text-white hover:opacity-90"
            >
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

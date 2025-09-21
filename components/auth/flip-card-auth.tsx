"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"

export function FlipCardAuth({ initialMode = "login" }: { initialMode?: "login" | "signup" }) {
  // show back side (signup) when isFlipped === true
  const [isFlipped, setIsFlipped] = useState(initialMode === "signup")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()

  // Optional: allow overriding initial mode via URL query ?mode=signup or ?mode=login
  useEffect(() => {
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    const mode = params.get("mode")
    if (mode === "signup") setIsFlipped(true)
    if (mode === "login") setIsFlipped(false)
  }, [])

  function handleSignIn(e?: React.SyntheticEvent) {
    e?.preventDefault()
    // TODO: replace with real auth logic
    router.push("/dashboard")
  }

  function handleCreateAccount(e?: React.SyntheticEvent) {
    e?.preventDefault()
    // TODO: run validation / API call first
    router.push("/onboarding")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-sky-300/40 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-20 w-96 h-96 bg-sky-200/35 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="w-full max-w-md">
        <div className="perspective-1000">
          <div
            className={`relative w-full h-[600px] transition-transform duration-700 transform-style-preserve-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* Login Side (Front) */}
            <Card className="absolute inset-0 glass-card p-8 backface-hidden">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back!</h2>
                <p className="text-slate-700">Sign in to continue your journey</p>
              </div>

              <form className="space-y-6" onSubmit={handleSignIn}>
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-slate-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input
                      id="login-email"
                      name="loginEmail"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-slate-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input
                      id="login-password"
                      name="loginPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-slate-200" />
                    <span className="text-sm text-slate-700">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-sky-600 hover:text-sky-700">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-sky-400 text-white hover:opacity-90 h-12">
                  Sign In
                </Button>

                <div className="text-center">
                  <span className="text-slate-700">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </Card>

            {/* Register Side (Back) */}
            <Card className="absolute inset-0 glass-card p-8 backface-hidden rotate-y-180">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-sky-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Join ASPIRE!</h2>
                <p className="text-slate-700">Start your career transformation today</p>
              </div>

              <form className="space-y-4" onSubmit={handleCreateAccount}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-slate-700">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-300" />
                      <Input
                        id="first-name"
                        name="firstName"
                        placeholder="First name"
                        className="pl-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-slate-700">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      name="lastName"
                      placeholder="Last name"
                      className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-slate-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input
                      id="register-email"
                      name="registerEmail"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="pl-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-slate-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input
                      id="register-password"
                      name="registerPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create password"
                      className="pl-10 pr-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-slate-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="pl-10 pr-10 bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-sky-500 to-sky-400 text-white hover:opacity-90 h-12">
                  Create Account
                </Button>

                <div className="text-center">
                  <span className="text-slate-700">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => setIsFlipped(false)}
                    className="text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

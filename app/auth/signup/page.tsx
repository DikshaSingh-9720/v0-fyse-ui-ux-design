"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signUp } from "@/lib/auth"
import { ChevronLeft } from "lucide-react"

export default function SignUp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedRole = searchParams.get("role") || null
  const [step, setStep] = useState(selectedRole ? 1 : 0)
  const [role, setRole] = useState(selectedRole)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    age: "",
    location: "",
    bio: "",
    interests: [] as string[],
    topics: [] as string[],
    experience: "",
    certifications: "",
  })

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole)
    setStep(1)
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleInterestToggle = (item: string) => {
    if (role === "seeker") {
      setProfile((prev) => ({
        ...prev,
        interests: prev.interests.includes(item) ? prev.interests.filter((i) => i !== item) : [...prev.interests, item],
      }))
    } else {
      setProfile((prev) => ({
        ...prev,
        topics: prev.topics.includes(item) ? prev.topics.filter((t) => t !== item) : [...prev.topics, item],
      }))
    }
  }

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setStep(2)
  }

  const handleStepTwo = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!profile.name || !profile.phone || !profile.location) {
      setError("Please fill in all required fields")
      return
    }

    setStep(3)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      setLoading(true)
      signUp(email, password, role as string, profile)
      const dashboardPath = `/dashboard/${role}`
      router.push(dashboardPath)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  // Role selection screen
  if (step === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Join FYSE</h1>
          <p className="text-muted-foreground">Choose how you'd like to participate</p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => handleRoleSelect("seeker")}
            className="w-full h-20 bg-white border-2 border-primary hover:border-primary hover:bg-blue-50/30 text-foreground rounded-2xl flex flex-col items-center justify-center gap-1 transition"
          >
            <span className="font-bold text-lg">I'm Seeking Support</span>
            <span className="text-xs text-muted-foreground">Connect with peer helpers</span>
          </Button>

          <Button
            onClick={() => handleRoleSelect("helper")}
            className="w-full h-20 bg-white border-2 border-secondary hover:border-secondary hover:bg-purple-50/30 text-foreground rounded-2xl flex flex-col items-center justify-center gap-1 transition"
          >
            <span className="font-bold text-lg">I Want to Help</span>
            <span className="text-xs text-muted-foreground">Share your experience</span>
          </Button>

          <Button
            onClick={() => handleRoleSelect("admin")}
            className="w-full h-20 bg-white border-2 border-muted hover:border-muted hover:bg-gray-50/30 text-foreground rounded-2xl flex flex-col items-center justify-center gap-1 transition"
          >
            <span className="font-bold text-lg">I'm an Admin</span>
            <span className="text-xs text-muted-foreground">Manage the platform</span>
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  const roleLabels = {
    seeker: "Seeking Support",
    helper: "Peer Helper",
    admin: "Platform Admin",
  }

  // Step 1: Email and Password
  if (step === 1) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep(0)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground">
              Step 1 of 3 - Signing up as {roleLabels[role as keyof typeof roleLabels]}
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleStepOne} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <Input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold">
            Continue
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  // Step 2: Personal Information
  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep(1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Personal Details</h1>
            <p className="text-sm text-muted-foreground">Step 2 of 3 - Tell us about yourself</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleStepTwo} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
            <Input
              name="name"
              placeholder="Your full name"
              value={profile.name}
              onChange={handleProfileChange}
              required
              className="rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
            <Input
              name="phone"
              placeholder="Your phone number"
              value={profile.phone}
              onChange={handleProfileChange}
              required
              className="rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Age</label>
            <Input
              name="age"
              type="number"
              placeholder="Your age"
              value={profile.age}
              onChange={handleProfileChange}
              className="rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Location *</label>
            <Input
              name="location"
              placeholder="City, Country"
              value={profile.location}
              onChange={handleProfileChange}
              required
              className="rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea
              name="bio"
              placeholder="Tell us a bit about yourself..."
              value={profile.bio}
              onChange={handleProfileChange}
              className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold">
            Continue
          </Button>
        </form>
      </div>
    )
  }

  // Step 3: Interests/Topics
  if (step === 3) {
    const items =
      role === "seeker"
        ? ["Anxiety", "Depression", "Career", "Relationships", "Grief", "Family", "Self-Esteem", "Sleep"]
        : ["Anxiety", "Depression", "Career", "Relationships", "Grief", "Family", "Self-Esteem", "ADHD"]

    const selectedItems = role === "seeker" ? profile.interests : profile.topics

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setStep(2)} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {role === "seeker" ? "Areas of Interest" : "Topics You Help With"}
            </h1>
            <p className="text-sm text-muted-foreground">Step 3 of 3 - Choose what matters to you</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">Select the areas you're interested in or can help with</p>
            <div className="flex flex-wrap gap-3">
              {items.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleInterestToggle(item)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    selectedItems.includes(item)
                      ? role === "seeker"
                        ? "bg-primary text-white"
                        : "bg-secondary text-white"
                      : "bg-gray-100 text-foreground hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full text-white rounded-lg font-semibold ${
              role === "seeker" ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
            }`}
          >
            {loading ? "Creating Account..." : "Complete Sign Up"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    )
  }
}

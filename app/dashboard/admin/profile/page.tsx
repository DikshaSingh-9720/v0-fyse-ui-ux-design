"use client"

import { useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { Users, Shield, AlertCircle, BarChart3 } from "lucide-react"

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  })
  const [stats, setStats] = useState([
    { label: "Total Users", value: 2847, icon: Users },
    { label: "Helpers", value: 324, icon: Shield },
    { label: "Seekers", value: 2523, icon: BarChart3 },
    { label: "Flagged", value: 12, icon: AlertCircle },
  ])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setProfile({
        name: currentUser.profile?.name || "Admin",
        email: currentUser.email,
        phone: currentUser.profile?.phone || "",
        location: currentUser.profile?.location || "",
        bio: currentUser.profile?.bio || "Platform Administrator",
      })
    }
  }, [])

  return (
    <main className="flex-1 p-8">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Profile</h1>
          <p className="text-muted-foreground">Platform management and overview</p>
        </div>

        <ProfileCard user={profile} stats={stats} onEdit={() => {}} />
      </div>
    </main>
  )
}

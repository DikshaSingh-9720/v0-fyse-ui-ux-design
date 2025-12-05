"use client"

import { useState, useEffect } from "react"
import { getCurrentUser, updateUserProfile } from "@/lib/auth"
import { ProfileCard } from "@/components/dashboard/profile-card"
import { ProfileEditModal } from "@/components/dashboard/profile-edit-modal"
import { Star, Users, Clock, TrendingUp } from "lucide-react"

export default function HelperProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  })
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [stats, setStats] = useState([
    { label: "Rating", value: "4.8", icon: Star },
    { label: "People Helped", value: 156, icon: Users },
    { label: "Available", value: "12 hrs", icon: Clock },
    { label: "Response Time", value: "2 min", icon: TrendingUp },
  ])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setProfile({
        name: currentUser.profile?.name || "",
        email: currentUser.email,
        phone: currentUser.profile?.phone || "",
        location: currentUser.profile?.location || "",
        bio: currentUser.profile?.bio || "",
      })
    }
  }, [])

  const handleSave = (formData: any) => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      updateUserProfile(currentUser.id, {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
      })
      setProfile(formData)
    }
  }

  const editFields = [
    { name: "name", label: "Professional Name" },
    { name: "phone", label: "Phone Number" },
    { name: "location", label: "Location" },
    { name: "bio", label: "Professional Bio", multiline: true },
  ]

  return (
    <main className="flex-1 p-8">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Helper Profile</h1>
          <p className="text-muted-foreground">Manage your professional information</p>
        </div>

        <ProfileCard user={profile} stats={stats} onEdit={() => setIsEditOpen(true)} />

        <ProfileEditModal
          isOpen={isEditOpen}
          user={profile}
          fields={editFields}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      </div>
    </main>
  )
}

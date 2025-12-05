"use client"

import { Phone, MapPin, Calendar, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileCardProps {
  user: {
    name: string
    email: string
    phone?: string
    location?: string
    bio?: string
    avatar?: string
    joinedDate?: string
  }
  stats?: Array<{ label: string; value: string | number; icon: any }>
  onEdit: () => void
}

export function ProfileCard({ user, stats, onEdit }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden">
      {/* Header Background */}
      <div className="h-32 bg-gradient-to-r from-primary/10 to-secondary/10"></div>

      {/* Profile Content */}
      <div className="px-8 pb-8">
        {/* Avatar and Edit Button */}
        <div className="flex items-start justify-between -mt-16 mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
            {user.avatar || getInitials(user.name)}
          </div>
          <Button onClick={onEdit} variant="outline" size="sm" className="rounded-lg gap-2 bg-transparent">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        {/* User Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-1">{user.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">{user.email}</p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6 text-sm mb-6">
            {user.phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-secondary" />
                {user.phone}
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-secondary" />
                {user.location}
              </div>
            )}
            {user.joinedDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-secondary" />
                Joined {user.joinedDate}
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="mb-8">
            <h3 className="font-semibold text-foreground mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

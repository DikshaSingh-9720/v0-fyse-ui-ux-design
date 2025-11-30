"use client"

import { useState } from "react"

interface AvatarProps {
  name: string
  size?: "sm" | "md" | "lg"
  imageUrl?: string
}

export default function Avatar({ name, size = "md", imageUrl }: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const sizeClasses = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  }

  const colors = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-teal-400 to-teal-600",
    "from-orange-400 to-orange-600",
  ]

  // Generate consistent color based on name
  const colorIndex = name.charCodeAt(0) % colors.length
  const bgColor = colors[colorIndex]

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${bgColor} flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0`}
    >
      {!imageError && imageUrl ? (
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        initials
      )}
    </div>
  )
}

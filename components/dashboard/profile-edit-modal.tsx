"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface ProfileEditModalProps {
  isOpen: boolean
  user: {
    name: string
    email: string
    phone?: string
    location?: string
    bio?: string
  }
  fields: Array<{
    name: string
    label: string
    type?: string
    multiline?: boolean
  }>
  onClose: () => void
  onSave: (data: any) => void
}

export function ProfileEditModal({ isOpen, user, fields, onClose, onSave }: ProfileEditModalProps) {
  const [formData, setFormData] = useState(user)
  const [isSaving, setIsSaving] = useState(false)

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      onSave(formData)
      setIsSaving(false)
      onClose()
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-md w-full mx-4 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-foreground mb-2">{field.label}</label>
              {field.multiline ? (
                <textarea
                  name={field.name}
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                />
              ) : (
                <Input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  className="rounded-lg"
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-lg bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}

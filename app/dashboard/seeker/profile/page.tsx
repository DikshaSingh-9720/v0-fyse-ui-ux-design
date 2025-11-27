'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: 'Alex',
    email: 'alex@example.com',
    interests: ['Anxiety', 'Career', 'Relationships'],
    bio: 'Seeking support and connection'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main className="flex-1 p-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Profile Settings</h1>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Profile Information</h3>
            <div className="space-y-4 bg-white border border-border rounded-xl p-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                <Input 
                  name="name"
                  value={profile.name} 
                  onChange={handleChange}
                  className="rounded-lg" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <Input 
                  type="email" 
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="rounded-lg" 
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Saved Stories</h3>
            <div className="bg-white border border-border rounded-xl p-6">
              <p className="text-muted-foreground">You have 3 saved stories</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Mood History</h3>
            <div className="bg-white border border-border rounded-xl p-6">
              <p className="text-muted-foreground">Track your mood over time</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg flex-1">
              Save Changes
            </Button>
            <Button variant="outline" className="rounded-lg flex-1">
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

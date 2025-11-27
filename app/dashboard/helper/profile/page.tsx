'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function HelperProfilePage() {
  return (
    <main className="flex-1 p-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Profile Settings</h1>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Helper Profile</h3>
            <div className="space-y-4 bg-white border border-border rounded-xl p-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Display Name</label>
                <Input placeholder="Your name" className="rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Topics You Help With</label>
                <div className="flex flex-wrap gap-2">
                  {['Anxiety', 'Depression', 'Career', 'Relationships', 'Grief'].map((topic) => (
                    <button
                      key={topic}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold hover:bg-primary/20 transition"
                    >
                      {topic} ✓
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
                <textarea
                  placeholder="Tell seekers about your experience and background..."
                  className="w-full p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-lg flex-1">
              Save Changes
            </Button>
            <Button variant="outline" className="rounded-lg flex-1">
              View Public Profile
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Availability() {
  const [availability, setAvailability] = useState({
    monday: { start: '09:00', end: '17:00', available: true },
    tuesday: { start: '09:00', end: '17:00', available: true },
    wednesday: { start: '09:00', end: '17:00', available: true },
    thursday: { start: '09:00', end: '17:00', available: true },
    friday: { start: '09:00', end: '17:00', available: true },
    saturday: { start: '', end: '', available: false },
    sunday: { start: '', end: '', available: false },
  })

  return (
    <main className="flex-1 p-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Set Your Availability</h1>
        <p className="text-muted-foreground mb-8">Let seekers know when you're available to chat</p>

        <div className="space-y-4">
          {Object.entries(availability).map(([day, times]) => (
            <div key={day} className="bg-white border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer flex-1">
                  <input
                    type="checkbox"
                    checked={times.available}
                    onChange={(e) => setAvailability(prev => ({
                      ...prev,
                      [day]: { ...prev[day as keyof typeof prev], available: e.target.checked }
                    }))}
                    className="w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-foreground capitalize">{day}</span>
                </label>
                {times.available && (
                  <div className="flex items-center gap-4">
                    <input
                      type="time"
                      value={times.start}
                      className="px-3 py-2 border border-border rounded-lg text-sm"
                      onChange={(e) => setAvailability(prev => ({
                        ...prev,
                        [day]: { ...prev[day as keyof typeof prev], start: e.target.value }
                      }))}
                    />
                    <span className="text-muted-foreground">to</span>
                    <input
                      type="time"
                      value={times.end}
                      className="px-3 py-2 border border-border rounded-lg text-sm"
                      onChange={(e) => setAvailability(prev => ({
                        ...prev,
                        [day]: { ...prev[day as keyof typeof prev], end: e.target.value }
                      }))}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8">
          <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-lg flex-1">
            Save Changes
          </Button>
          <Button variant="outline" className="rounded-lg">
            Cancel
          </Button>
        </div>
      </div>
    </main>
  )
}

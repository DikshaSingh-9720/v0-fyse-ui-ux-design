"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Clock, Plus, Trash2 } from "lucide-react"

interface TimeSlot {
  id: string
  start: string
  end: string
}

interface DayAvailability {
  available: boolean
  slots: TimeSlot[]
}

export default function Availability() {
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({
    monday: { available: true, slots: [{ id: "1", start: "09:00", end: "17:00" }] },
    tuesday: { available: true, slots: [{ id: "1", start: "09:00", end: "17:00" }] },
    wednesday: { available: true, slots: [{ id: "1", start: "09:00", end: "17:00" }] },
    thursday: { available: true, slots: [{ id: "1", start: "09:00", end: "17:00" }] },
    friday: { available: true, slots: [{ id: "1", start: "09:00", end: "17:00" }] },
    saturday: { available: false, slots: [] },
    sunday: { available: false, slots: [] },
  })

  const [timezone, setTimezone] = useState("UTC")
  const [saved, setSaved] = useState(false)
  const [applyToAll, setApplyToAll] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("helperAvailability")
    if (saved) {
      setAvailability(JSON.parse(saved))
    }
  }, [])

  const handleSaveAvailability = () => {
    localStorage.setItem("helperAvailability", JSON.stringify(availability))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addTimeSlot = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { id: Date.now().toString(), start: "09:00", end: "17:00" }],
      },
    }))
  }

  const removeTimeSlot = (day: string, slotId: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((slot) => slot.id !== slotId),
      },
    }))
  }

  const updateTimeSlot = (day: string, slotId: string, field: "start" | "end", value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot) => (slot.id === slotId ? { ...slot, [field]: value } : slot)),
      },
    }))
  }

  const toggleDayAvailability = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        available: !prev[day].available,
        slots:
          !prev[day].available && prev[day].slots.length === 0
            ? [{ id: "1", start: "09:00", end: "17:00" }]
            : prev[day].slots,
      },
    }))
  }

  const applySlotsToAllDays = () => {
    if (applyToAll && availability.monday.slots.length > 0) {
      setAvailability((prev) => {
        const updatedAvail = { ...prev }
        Object.keys(updatedAvail).forEach((day) => {
          if (day !== "monday") {
            updatedAvail[day] = {
              available: true,
              slots: availability.monday.slots.map((slot) => ({
                ...slot,
                id: Date.now().toString() + Math.random(),
              })),
            }
          }
        })
        return updatedAvail
      })
      setApplyToAll(false)
    }
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  return (
    <main className="flex-1 p-8 bg-background">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Set Your Availability</h1>
          <p className="text-muted-foreground">Let seekers know when you're available to chat and provide support</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 bg-white border border-border rounded-lg p-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white text-foreground"
            >
              <option>UTC</option>
              <option>EST</option>
              <option>CST</option>
              <option>MST</option>
              <option>PST</option>
              <option>IST</option>
              <option>GMT</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <label className="flex items-center gap-2 cursor-pointer flex-1 pb-2">
              <input
                type="checkbox"
                checked={applyToAll}
                onChange={(e) => setApplyToAll(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-foreground">Copy Monday to all days</span>
            </label>
            {applyToAll && (
              <Button
                onClick={applySlotsToAllDays}
                className="bg-secondary hover:bg-secondary/90 text-white rounded-lg"
                size="sm"
              >
                Apply
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {days.map((day) => (
            <div key={day} className="bg-white border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availability[day].available}
                    onChange={() => toggleDayAvailability(day)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="font-semibold text-foreground capitalize text-lg">{day}</span>
                </label>
                {availability[day].available && (
                  <Button onClick={() => addTimeSlot(day)} variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Slot
                  </Button>
                )}
              </div>

              {availability[day].available && availability[day].slots.length > 0 && (
                <div className="space-y-3 ml-7">
                  {availability[day].slots.map((slot, idx) => (
                    <div key={slot.id} className="flex items-center gap-3 bg-background p-3 rounded-lg">
                      <Clock className="w-4 h-4 text-secondary" />
                      <input
                        type="time"
                        value={slot.start}
                        onChange={(e) => updateTimeSlot(day, slot.id, "start", e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg text-sm bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      />
                      <span className="text-muted-foreground">to</span>
                      <input
                        type="time"
                        value={slot.end}
                        onChange={(e) => updateTimeSlot(day, slot.id, "end", e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg text-sm bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      />
                      {availability[day].slots.length > 1 && (
                        <Button
                          onClick={() => removeTimeSlot(day, slot.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!availability[day].available && <p className="text-sm text-muted-foreground ml-7">Not available</p>}
            </div>
          ))}
        </div>

        {/* Save Changes and Cancel Buttons */}
        <div className="flex gap-3 mt-8">
          <Button
            onClick={handleSaveAvailability}
            className="bg-secondary hover:bg-secondary/90 text-white rounded-lg flex-1"
          >
            {saved ? "Saved Successfully!" : "Save Changes"}
          </Button>
          <Button variant="outline" className="rounded-lg bg-transparent">
            Cancel
          </Button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Summary:</strong> You're available {days.filter((d) => availability[d].available).length} days per
            week with {Object.values(availability).reduce((acc, day) => acc + day.slots.length, 0)} total time slots.
          </p>
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function FindHelper() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filters = [
    'Career',
    'Relationships',
    'Anxiety',
    'Depression',
    'Grief',
    'Trauma',
    'Medical',
    'Loneliness'
  ]

  const helpers = [
    {
      id: 1,
      name: 'Morgan',
      experience: '5 years supporting others',
      topics: ['Career', 'Anxiety'],
      rating: 4.9,
      reviews: 127,
      available: true
    },
    {
      id: 2,
      name: 'Taylor',
      experience: '3 years peer support',
      topics: ['Relationships', 'Depression'],
      rating: 4.8,
      reviews: 95,
      available: true
    },
    {
      id: 3,
      name: 'Riley',
      experience: '7 years community support',
      topics: ['Grief', 'Trauma'],
      rating: 5.0,
      reviews: 156,
      available: false
    },
  ]

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  return (
    <main className="flex-1 p-8">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Find a Helper</h1>

        <div className="mb-8 space-y-4">
          <h3 className="font-semibold text-foreground">What topics do you need help with?</h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`px-4 py-2 rounded-full border-2 transition ${
                  selectedFilters.includes(filter)
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-border text-foreground hover:border-primary/50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <Input
          placeholder="Search helpers by name..."
          className="mb-8 rounded-lg max-w-md"
        />

        <div className="grid gap-6">
          {helpers.map((helper) => (
            <div key={helper.id} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                    {helper.name[0]}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{helper.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{helper.experience}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(helper.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {helper.rating} ({helper.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {helper.topics.map((topic) => (
                        <span key={topic} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    disabled={!helper.available}
                    className={`rounded-lg ${
                      helper.available
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {helper.available ? 'Connect' : 'Unavailable'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function StoryModeration() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  const stories = [
    {
      id: 1,
      title: 'My Journey with Anxiety',
      author: 'Alex',
      type: 'Video',
      status: 'pending',
      submitted: '2 hours ago',
      flags: 0
    },
    {
      id: 2,
      title: 'Finding Hope After Loss',
      author: 'Jordan',
      type: 'Text',
      status: 'approved',
      submitted: '1 day ago',
      flags: 0
    },
    {
      id: 3,
      title: 'Depression Recovery',
      author: 'Sam',
      type: 'Audio',
      status: 'flagged',
      submitted: '3 hours ago',
      flags: 2
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'flagged':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <main className="flex-1 p-8">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Story Moderation</h1>

        <div className="mb-6 flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg border transition capitalize ${
                filter === tab
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-foreground hover:border-primary/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story.id} className="bg-white border border-border rounded-xl p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg text-foreground">{story.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {story.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">By {story.author} • {story.submitted}</p>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(story.status)}`}>
                      {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                    </span>
                    {story.flags > 0 && (
                      <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                        {story.flags} flags
                      </span>
                    )}
                  </div>
                </div>
                {story.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button className="bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm">
                      Approve
                    </Button>
                    <Button variant="outline" className="rounded-lg text-sm">
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

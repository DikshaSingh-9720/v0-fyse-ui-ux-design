'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function StoriesPage() {
  const [filter, setFilter] = useState<'all' | 'video' | 'audio' | 'text'>('all')

  const stories = [
    {
      id: 1,
      title: 'Overcoming Anxiety in the Workplace',
      author: 'Morgan',
      type: 'video',
      excerpt: 'Learn how I managed workplace anxiety and found my confidence again.',
      likes: 234,
      duration: '8:45'
    },
    {
      id: 2,
      title: 'My Journey with Depression',
      author: 'Sam',
      type: 'text',
      excerpt: 'A personal account of my battle with depression and recovery.',
      likes: 456,
      readTime: '12 min read'
    },
    {
      id: 3,
      title: 'Finding Hope After Loss',
      author: 'Casey',
      type: 'audio',
      excerpt: 'Processing grief and finding meaning after loss.',
      likes: 189,
      duration: '15:30'
    },
  ]

  const filteredStories = filter === 'all' ? stories : stories.filter(s => s.type === filter)

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Recovery Stories</h1>
          <p className="text-muted-foreground">Read inspiring stories from others in our community</p>
        </div>

        <div className="mb-8 space-y-4">
          <Input placeholder="Search stories..." className="rounded-lg" />
          <div className="flex gap-2">
            {['all', 'video', 'audio', 'text'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as any)}
                className={`px-4 py-2 rounded-full border transition capitalize ${
                  filter === type
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-foreground hover:border-primary/50'
                }`}
              >
                {type === 'all' ? 'All Stories' : type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredStories.map((story) => (
            <Link key={story.id} href={`/dashboard/seeker/stories/${story.id}`}>
              <div className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/50 transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">{story.title}</h3>
                    <p className="text-sm text-muted-foreground">By {story.author}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full uppercase">
                    {story.type}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{story.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-muted-foreground hover:text-primary transition text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {story.likes}
                    </button>
                    <span className="text-xs text-muted-foreground">
                      {'duration' in story ? story.duration : story.readTime}
                    </span>
                  </div>
                  <Button variant="ghost" className="text-primary hover:bg-blue-50">
                    Read More →
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

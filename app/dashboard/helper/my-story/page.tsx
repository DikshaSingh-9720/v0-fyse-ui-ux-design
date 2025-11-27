'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function MyStory() {
  const [storyType, setStoryType] = useState<'video' | 'audio' | 'text' | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ storyType, title, content })
  }

  return (
    <main className="flex-1 p-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">Share Your Story</h1>
        <p className="text-muted-foreground mb-8">Help others by sharing your recovery journey and experiences</p>

        {!storyType ? (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Choose how you'd like to share</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  type: 'video' as const,
                  title: 'Video',
                  description: 'Share your story on camera',
                  icon: '🎥'
                },
                {
                  type: 'audio' as const,
                  title: 'Audio',
                  description: 'Record your voice',
                  icon: '🎙️'
                },
                {
                  type: 'text' as const,
                  title: 'Text',
                  description: 'Write your story',
                  icon: '✍️'
                },
              ].map((option) => (
                <button
                  key={option.type}
                  onClick={() => setStoryType(option.type)}
                  className="bg-white border-2 border-border rounded-2xl p-6 hover:border-primary hover:shadow-md transition text-center"
                >
                  <div className="text-4xl mb-3">{option.icon}</div>
                  <h4 className="font-bold text-foreground mb-1">{option.title}</h4>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setStoryType(null)}
              className="text-primary hover:underline text-sm font-semibold"
            >
              ← Back
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Story Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., My Journey with Depression"
                  className="rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Your Story</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your story, lessons learned, and advice for others..."
                  className="w-full p-4 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none h-64"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">{content.length} characters</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Upload {storyType === 'video' ? 'Video' : storyType === 'audio' ? 'Audio' : 'Content'}</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition cursor-pointer">
                  <svg className="w-12 h-12 text-muted-foreground mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-foreground font-semibold mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">MP4, WAV, or image files</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-lg flex-1">
                  Submit for Review
                </Button>
                <Button type="button" variant="outline" onClick={() => setStoryType(null)} className="rounded-lg">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-12 bg-yellow-50/50 border border-yellow-200 rounded-xl p-6">
          <h4 className="font-semibold text-foreground mb-3">Stories Under Review</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border">
              <div>
                <p className="font-semibold text-foreground">My Journey of Recovery</p>
                <p className="text-xs text-muted-foreground">Submitted 2 days ago</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

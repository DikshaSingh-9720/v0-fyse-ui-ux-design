"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function StoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([
    { id: 1, author: "Emma", text: "Thank you for sharing this, really helped me!", likes: 12 },
    { id: 2, author: "James", text: "Your story is inspiring", likes: 8 },
  ])
  const [liked, setLiked] = useState(false)

  // Sample story data - in a real app, fetch based on ID
  const story = {
    id: params.id,
    title: "Overcoming Anxiety in the Workplace",
    author: "Morgan",
    type: "video",
    excerpt: "Learn how I managed workplace anxiety and found my confidence again.",
    content: `Anxiety at work was something I struggled with for years. Every meeting felt like a mountain to climb, and presentations were nearly impossible. Here's my journey to overcoming it...

    I started by recognizing my triggers and patterns. For me, it was the fear of judgment and making mistakes in front of colleagues. Once I identified this, I could work on it directly.

    I began with small steps: speaking up in smaller meetings, practicing presentations at home, and using breathing techniques when anxiety crept in. Over time, these small wins built my confidence.

    Today, I'm not only comfortable in work situations, but I've become a confident speaker who helps mentor others. It's not perfect every day, but I've learned that progress, not perfection, is the goal.`,
    likes: 234,
    duration: "8:45",
    date: "2024-01-15",
    tags: ["anxiety", "workplace", "mental-health", "recovery"],
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: "You",
          text: comment,
          likes: 0,
        },
      ])
      setComment("")
    }
  }

  return (
    <main className="flex-1 p-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        {/* Story Header */}
        <div className="bg-white rounded-2xl border border-border p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{story.title}</h1>
              <p className="text-muted-foreground">
                By {story.author} • {new Date(story.date).toLocaleDateString()}
              </p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full uppercase">
              {story.type}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                liked
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "border-border text-muted-foreground hover:border-primary"
              }`}
            >
              <svg className="w-5 h-5" fill={liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {story.likes + (liked ? 1 : 0)}
            </button>
            <span className="text-sm text-muted-foreground">{story.duration}</span>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {story.tags.map((tag) => (
              <span key={tag} className="text-xs bg-muted text-foreground px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-2xl border border-border p-8 mb-6">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold text-foreground mb-4">Full Story</h2>
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">{story.content}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Comments ({comments.length})</h2>

          {/* Comment Input */}
          <div className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0 flex items-center justify-center text-white font-bold">
                Y
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="rounded-lg mb-2"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!comment.trim()}
                  className="bg-primary text-white hover:bg-primary/90 rounded-lg"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                  {c.author[0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">{c.author}</p>
                  <p className="text-muted-foreground mb-2">{c.text}</p>
                  <button className="text-sm text-muted-foreground hover:text-primary transition flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h-2m0 0H10m2 0v2m0-2v-2m7.07-2.071l-1.414-1.414M14 6.586l1.414-1.414M9.586 11l-1.414 1.414M11 9.586L9.586 11M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
                      />
                    </svg>
                    {c.likes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Story {
  id: string
  title: string
  type: "video" | "audio" | "text"
  content: string
  fileName?: string
  fileSize?: number
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  views?: number
  likes?: number
}

export default function MyStory() {
  const [storyType, setStoryType] = useState<"video" | "audio" | "text" | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [stories, setStories] = useState<Story[]>([
    {
      id: "1",
      title: "My Journey of Recovery",
      type: "video",
      content: "This is my journey of overcoming depression...",
      fileName: "recovery-journey.mp4",
      fileSize: 45000000,
      status: "pending",
      submittedDate: "2 days ago",
      views: 0,
      likes: 0,
    },
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const getAcceptedFileTypes = () => {
    if (storyType === "video") return "video/mp4,video/mpeg,.mp4,.mov"
    if (storyType === "audio") return "audio/mpeg,audio/wav,audio/mp3,.mp3,.wav"
    return "image/*,.pdf"
  }

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file)
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return prev
        }
        return prev + Math.random() * 30
      })
    }, 500)

    // Simulate upload completion
    setTimeout(() => {
      setUploadProgress(100)
      setIsUploading(false)
      clearInterval(interval)
    }, 2500)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      alert("Please fill in title and content")
      return
    }

    if (!uploadedFile && storyType !== "text") {
      alert("Please upload a file for your story")
      return
    }

    // Add new story to list
    const newStory: Story = {
      id: Date.now().toString(),
      title,
      type: storyType as "video" | "audio" | "text",
      content,
      fileName: uploadedFile?.name,
      fileSize: uploadedFile?.size,
      status: "pending",
      submittedDate: "Just now",
      views: 0,
      likes: 0,
    }

    setStories([newStory, ...stories])

    // Reset form
    setStoryType(null)
    setTitle("")
    setContent("")
    setUploadedFile(null)
    setUploadProgress(0)

    alert("Story submitted successfully for review!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-yellow-100 text-yellow-700"
    }
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
                  type: "video" as const,
                  title: "Video",
                  description: "Share your story on camera",
                  icon: "🎥",
                },
                {
                  type: "audio" as const,
                  title: "Audio",
                  description: "Record your voice",
                  icon: "🎙️",
                },
                {
                  type: "text" as const,
                  title: "Text",
                  description: "Write your story",
                  icon: "✍️",
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
              onClick={() => {
                setStoryType(null)
                setUploadedFile(null)
                setUploadProgress(0)
              }}
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

              {storyType !== "text" && (
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Upload {storyType === "video" ? "Video" : "Audio"} File
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition cursor-pointer bg-blue-50/30 hover:bg-blue-50/50"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={getAcceptedFileTypes()}
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={isUploading}
                    />
                    {!uploadedFile ? (
                      <>
                        <svg
                          className="w-12 h-12 text-muted-foreground mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="text-foreground font-semibold mb-1">Click to upload or drag and drop</p>
                        <p className="text-sm text-muted-foreground">
                          {storyType === "video" ? "MP4, MOV up to 500MB" : "MP3, WAV up to 100MB"}
                        </p>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <svg className="w-12 h-12 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold text-foreground">{uploadedFile.name}</p>
                          <p className="text-sm text-muted-foreground">{formatFileSize(uploadedFile.size)}</p>
                        </div>
                        {uploadProgress < 100 && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        )}
                        {uploadProgress === 100 && (
                          <p className="text-sm text-green-600 font-semibold">Upload complete</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isUploading || (storyType !== "text" && !uploadedFile)}
                  className="bg-primary hover:bg-primary/90 text-white rounded-lg flex-1 disabled:opacity-50"
                >
                  {isUploading ? "Uploading..." : "Submit for Review"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setStoryType(null)
                    setUploadedFile(null)
                    setUploadProgress(0)
                  }}
                  className="rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-12 bg-blue-50/50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-foreground mb-4">Your Stories ({stories.length})</h4>
          <div className="space-y-3">
            {stories.length === 0 ? (
              <p className="text-muted-foreground text-sm">No stories submitted yet</p>
            ) : (
              stories.map((story) => (
                <div
                  key={story.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-border hover:shadow-sm transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">
                        {story.type === "video" ? "🎥" : story.type === "audio" ? "🎙️" : "✍️"}
                      </span>
                      <p className="font-semibold text-foreground">{story.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Submitted {story.submittedDate}
                      {story.fileName && ` • ${story.fileName}`}
                      {story.views !== undefined && ` • ${story.views} views • ${story.likes} likes`}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(story.status)}`}>
                    {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Phone } from "lucide-react"
import Avatar from "@/components/dashboard/avatar"
import ChatMessage from "@/components/dashboard/chat-message"
import ChatInput from "@/components/dashboard/chat-input"
import { getMessages, addMessage, type Message } from "@/lib/chat-storage"

export default function HelperChatPage() {
  const params = useParams()
  const router = useRouter()
  const chatId = params.id as string
  const scrollRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const seekers = [
    { id: 1, name: "Alex Martinez", imageUrl: "/diverse-group-meeting.png", topic: "Workplace Anxiety" },
    { id: 2, name: "Jordan Williams", imageUrl: "/jordan-landscape.png", topic: "Career Transition" },
    { id: 3, name: "Casey Johnson", imageUrl: "/abstract-casey.png", topic: "Stress Management" },
  ]

  const currentSeeker = seekers.find((s) => s.id.toString() === chatId)

  useEffect(() => {
    const storedMessages = getMessages(chatId)
    if (storedMessages.length === 0) {
      const initialMessages = [
        addMessage(chatId, "other", currentSeeker?.name || "Seeker", "Hi, I need some help with something."),
      ]
      setMessages(initialMessages)
    } else {
      setMessages(storedMessages)
    }
    setLoading(false)
  }, [chatId, currentSeeker?.name])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (content: string) => {
    const helperMessage = addMessage(chatId, "user", "You", content)
    setMessages((prev) => [...prev, helperMessage])

    setTimeout(() => {
      const seekerMessage = addMessage(
        chatId,
        "other",
        currentSeeker?.name || "Seeker",
        'Thank you for your perspective. That really helps!"',
      )
      setMessages((prev) => [...prev, seekerMessage])
    }, 1500)
  }

  if (!currentSeeker) {
    return (
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Chat not found</p>
          <Link href="/dashboard/helper/chats">
            <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg">
              Back to Conversations
            </button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 flex flex-col h-screen bg-white">
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/helper/chats">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <Avatar name={currentSeeker.name} size="md" imageUrl={currentSeeker.imageUrl} />
          <div>
            <h2 className="font-bold text-foreground">{currentSeeker.name}</h2>
            <p className="text-sm text-muted-foreground">{currentSeeker.topic}</p>
          </div>
        </div>
        <Link href="/dashboard/helper/video-call">
          <button className="p-3 bg-accent hover:bg-accent/90 text-white rounded-lg transition">
            <Phone size={20} />
          </button>
        </Link>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-2">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
      </div>

      <ChatInput onSend={handleSendMessage} />
    </main>
  )
}

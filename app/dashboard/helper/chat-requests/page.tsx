"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageCircle,
  User,
  MapPin,
  Calendar,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ChatRequest {
  id: string
  seekerName: string
  seekerId: string
  topic: string
  description: string
  urgency: "high" | "medium" | "low"
  requestedTime: string
  avatar: string
  seekerProfile?: {
    age?: string
    previousChats?: number
    rating?: number
    location?: string
    joinDate?: string
    interests?: string[]
  }
  status: "pending" | "accepted" | "declined"
  responseDeadline?: string
  messagePreview?: string
}

export default function ChatRequestsPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<ChatRequest[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined">("pending")
  const [sortBy, setSortBy] = useState<"urgency" | "recent">("urgency")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const savedRequests = localStorage.getItem("fyse_chat_requests")
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests))
    } else {
      const defaultRequests: ChatRequest[] = [
        {
          id: "1",
          seekerName: "Alex",
          seekerId: "seeker-1",
          topic: "Workplace Anxiety",
          description:
            "Feeling anxious about upcoming presentation at work. Need someone to talk to about coping strategies.",
          urgency: "high",
          requestedTime: "2 hours ago",
          avatar: "A",
          seekerProfile: {
            previousChats: 2,
            rating: 4.8,
            age: "25-30",
            location: "New York, NY",
            joinDate: "3 months ago",
            interests: ["Mental Health", "Career Support", "Communication"],
          },
          status: "pending",
          responseDeadline: "30 min",
          messagePreview: "Hi, I'm really struggling with anxiety before my big presentation...",
        },
        {
          id: "2",
          seekerName: "Jordan",
          seekerId: "seeker-2",
          topic: "Relationship Issues",
          description: "Need advice on communication with partner. Relationship feels strained.",
          urgency: "medium",
          requestedTime: "4 hours ago",
          avatar: "J",
          seekerProfile: {
            previousChats: 5,
            rating: 4.5,
            age: "30-35",
            location: "Los Angeles, CA",
            joinDate: "6 months ago",
            interests: ["Relationships", "Communication", "Personal Growth"],
          },
          status: "pending",
          responseDeadline: "60 min",
          messagePreview: "We've been together for 5 years but communication has been difficult...",
        },
        {
          id: "3",
          seekerName: "Casey",
          seekerId: "seeker-3",
          topic: "Career Transition",
          description: "Considering a major career change and feeling uncertain about the decision.",
          urgency: "low",
          requestedTime: "1 day ago",
          avatar: "C",
          seekerProfile: {
            previousChats: 0,
            rating: 0,
            age: "28-32",
            location: "Chicago, IL",
            joinDate: "1 week ago",
            interests: ["Career Counseling", "Life Planning"],
          },
          status: "pending",
          messagePreview: "I've been working in tech for 10 years but thinking about a switch...",
        },
      ]
      setRequests(defaultRequests)
      localStorage.setItem("fyse_chat_requests", JSON.stringify(defaultRequests))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("fyse_chat_requests", JSON.stringify(requests))
  }, [requests])

  const handleAccept = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "accepted" } : r)))
  }

  const handleDecline = (id: string) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: "declined" } : r)))
  }

  const handleStartChat = (request: ChatRequest) => {
    // Create a new conversation by adding to the chats list
    const existingChats = localStorage.getItem("fyse_conversations")
    const chats = existingChats ? JSON.parse(existingChats) : []

    // Check if conversation already exists
    const existingChat = chats.find(
      (c: any) => c.seekerId === request.seekerId && c.helperId === localStorage.getItem("fyse_current_user_id"),
    )

    if (existingChat) {
      router.push(`/dashboard/helper/chats/${existingChat.id}`)
    } else {
      // Create new conversation
      const newChat = {
        id: request.id,
        seekerId: request.seekerId,
        seekerName: request.seekerName,
        helperId: localStorage.getItem("fyse_current_user_id"),
        helperName: localStorage.getItem("fyse_current_user_name") || "You",
        topic: request.topic,
        createdAt: Date.now(),
        status: "active",
      }
      chats.push(newChat)
      localStorage.setItem("fyse_conversations", JSON.stringify(chats))

      // Send initial message
      const { addMessage } = require("@/lib/chat-storage")
      addMessage(
        request.id,
        "other",
        request.seekerName,
        request.messagePreview || "Hi, I need help with " + request.topic,
      )

      router.push(`/dashboard/helper/chats/${request.id}`)
    }
  }

  const filteredRequests = requests
    .filter((r) => {
      const matchesFilter = filter === "all" || r.status === filter
      const matchesSearch =
        searchTerm === "" ||
        r.seekerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.topic.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "urgency") {
        const urgencyOrder = { high: 0, medium: 1, low: 2 }
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
      }
      return 0
    })

  const stats = {
    pending: requests.filter((r) => r.status === "pending").length,
    accepted: requests.filter((r) => r.status === "accepted").length,
    declined: requests.filter((r) => r.status === "declined").length,
    responseRate:
      requests.length > 0
        ? Math.round((requests.filter((r) => r.status !== "pending").length / requests.length) * 100)
        : 0,
  }

  const getUrgencyIcon = (urgency: string) => {
    if (urgency === "high") return <AlertCircle className="w-4 h-4" />
    if (urgency === "medium") return <Clock className="w-4 h-4" />
    return <CheckCircle className="w-4 h-4" />
  }

  const getStatusIcon = (status: string) => {
    if (status === "accepted") return <CheckCircle className="w-4 h-4 text-green-600" />
    if (status === "declined") return <XCircle className="w-4 h-4 text-red-600" />
    return <Clock className="w-4 h-4 text-yellow-600" />
  }

  return (
    <main className="flex-1 p-8">
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Chat Requests</h1>
            <p className="text-sm text-muted-foreground">Manage incoming connection requests from seekers</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-secondary">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pending</p>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500/30" />
            </div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Accepted</p>
                <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500/30" />
            </div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Declined</p>
                <p className="text-2xl font-bold text-red-600">{stats.declined}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500/30" />
            </div>
          </div>
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Response Rate</p>
                <p className="text-2xl font-bold text-secondary">{stats.responseRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary/30" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-lg"
            >
              All
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
              className="rounded-lg"
            >
              Pending
            </Button>
            <Button
              variant={filter === "accepted" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("accepted")}
              className="rounded-lg"
            >
              Accepted
            </Button>
            <Button
              variant={filter === "declined" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("declined")}
              className="rounded-lg"
            >
              Declined
            </Button>
          </div>
          <div className="ml-auto flex gap-2">
            <input
              type="text"
              placeholder="Search by name or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-foreground"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "urgency" | "recent")}
              className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-foreground"
            >
              <option value="urgency">Urgency</option>
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-border rounded-2xl overflow-hidden transition hover:shadow-md hover:border-secondary/30"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {request.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-foreground text-lg">{request.seekerName}</h3>
                          {getStatusIcon(request.status)}
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                              request.urgency === "high"
                                ? "bg-red-100 text-red-700"
                                : request.urgency === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {getUrgencyIcon(request.urgency)}
                            {request.urgency.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-secondary">{request.topic}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>
                        {request.messagePreview && (
                          <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200 text-xs text-muted-foreground italic">
                            <MessageCircle className="w-3 h-3 inline mr-1" />"{request.messagePreview.substring(0, 60)}
                            ..."
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground mb-1">{request.requestedTime}</p>
                      {request.responseDeadline && (
                        <p className="text-xs font-semibold text-orange-600 mb-2 bg-orange-50 px-2 py-1 rounded">
                          Respond in: {request.responseDeadline}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
                    className="flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 mb-4 transition"
                  >
                    <ChevronDown className={`w-4 h-4 transition ${expandedId === request.id ? "rotate-180" : ""}`} />
                    View seeker profile
                  </button>

                  {expandedId === request.id && request.seekerProfile && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-100">
                      <h4 className="font-semibold text-foreground text-sm mb-4">Seeker Profile</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                        {request.seekerProfile.previousChats !== undefined && (
                          <div>
                            <p className="text-muted-foreground text-xs flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" /> Previous Chats
                            </p>
                            <p className="font-bold text-foreground mt-1">{request.seekerProfile.previousChats}</p>
                          </div>
                        )}
                        {request.seekerProfile.rating !== undefined && request.seekerProfile.rating > 0 && (
                          <div>
                            <p className="text-muted-foreground text-xs">Average Rating</p>
                            <p className="font-bold text-foreground mt-1">⭐ {request.seekerProfile.rating}</p>
                          </div>
                        )}
                        {request.seekerProfile.age && (
                          <div>
                            <p className="text-muted-foreground text-xs flex items-center gap-1">
                              <User className="w-3 h-3" /> Age Range
                            </p>
                            <p className="font-bold text-foreground mt-1">{request.seekerProfile.age}</p>
                          </div>
                        )}
                        {request.seekerProfile.location && (
                          <div>
                            <p className="text-muted-foreground text-xs flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> Location
                            </p>
                            <p className="font-bold text-foreground mt-1">{request.seekerProfile.location}</p>
                          </div>
                        )}
                        {request.seekerProfile.joinDate && (
                          <div>
                            <p className="text-muted-foreground text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> Member Since
                            </p>
                            <p className="font-bold text-foreground mt-1">{request.seekerProfile.joinDate}</p>
                          </div>
                        )}
                      </div>
                      {request.seekerProfile.interests && request.seekerProfile.interests.length > 0 && (
                        <div>
                          <p className="text-muted-foreground text-xs mb-2">Interests</p>
                          <div className="flex flex-wrap gap-2">
                            {request.seekerProfile.interests.map((interest, idx) => (
                              <span
                                key={idx}
                                className="bg-white text-secondary text-xs font-medium px-2 py-1 rounded-full border border-secondary/20"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2">
                    {request.status === "pending" ? (
                      <>
                        <Button
                          onClick={() => handleAccept(request.id)}
                          className="flex-1 bg-secondary hover:bg-secondary/90 text-white rounded-lg"
                        >
                          Accept Request
                        </Button>
                        <Button
                          onClick={() => handleDecline(request.id)}
                          variant="outline"
                          className="flex-1 rounded-lg"
                        >
                          Decline
                        </Button>
                      </>
                    ) : request.status === "accepted" ? (
                      <Button
                        onClick={() => handleStartChat(request)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                      >
                        Start Chat
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        disabled
                        className="flex-1 rounded-lg text-muted-foreground bg-transparent"
                      >
                        Declined
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground mb-2">No {filter === "all" ? "" : filter} chat requests</p>
              <p className="text-sm text-muted-foreground">Check back later for new requests from seekers</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"

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
  }
  status: "pending" | "accepted" | "declined"
  responseDeadline?: string
}

export default function ChatRequestsPage() {
  const [requests, setRequests] = useState<ChatRequest[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "accepted" | "declined">("pending")
  const [sortBy, setSortBy] = useState<"urgency" | "recent">("urgency")

  useEffect(() => {
    const savedRequests = localStorage.getItem("fyse_chat_requests")
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests))
    } else {
      // Default requests
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
          seekerProfile: { previousChats: 2, rating: 4.8 },
          status: "pending",
          responseDeadline: "30 min",
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
          seekerProfile: { previousChats: 5, rating: 4.5 },
          status: "pending",
          responseDeadline: "60 min",
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
          seekerProfile: { previousChats: 0, rating: 0 },
          status: "pending",
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

  const filteredRequests = requests
    .filter((r) => filter === "all" || r.status === filter)
    .sort((a, b) => {
      if (sortBy === "urgency") {
        const urgencyOrder = { high: 0, medium: 1, low: 2 }
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
      }
      return 0
    })

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
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Chat Requests</h1>
          <span className="text-sm bg-secondary/10 text-secondary px-3 py-1 rounded-full">
            {filteredRequests.length} {filter === "all" ? "total" : filter}
          </span>
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
          <div className="ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "urgency" | "recent")}
              className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-foreground"
            >
              <option value="urgency">Sort by: Urgency</option>
              <option value="recent">Sort by: Recent</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white border border-border rounded-2xl overflow-hidden transition hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold text-lg">
                        {request.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground text-lg">{request.seekerName}</h3>
                          {getStatusIcon(request.status)}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-semibold text-secondary">{request.topic}</span>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${
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
                        <p className="text-sm text-muted-foreground">{request.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-2">{request.requestedTime}</p>
                      {request.responseDeadline && (
                        <p className="text-xs font-semibold text-orange-600 mb-2">
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
                    <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
                      <h4 className="font-semibold text-foreground text-sm mb-3">Seeker Profile</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        {request.seekerProfile.previousChats !== undefined && (
                          <div>
                            <p className="text-muted-foreground text-xs">Previous Chats</p>
                            <p className="font-bold text-foreground">{request.seekerProfile.previousChats}</p>
                          </div>
                        )}
                        {request.seekerProfile.rating !== undefined && request.seekerProfile.rating > 0 && (
                          <div>
                            <p className="text-muted-foreground text-xs">Average Rating</p>
                            <p className="font-bold text-foreground">⭐ {request.seekerProfile.rating}</p>
                          </div>
                        )}
                        {request.seekerProfile.age && (
                          <div>
                            <p className="text-muted-foreground text-xs">Age Range</p>
                            <p className="font-bold text-foreground">{request.seekerProfile.age}</p>
                          </div>
                        )}
                      </div>
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
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg">
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
              <p className="text-muted-foreground mb-2">No {filter === "all" ? "" : filter} chat requests</p>
              <p className="text-sm text-muted-foreground">Check back later for new requests from seekers</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

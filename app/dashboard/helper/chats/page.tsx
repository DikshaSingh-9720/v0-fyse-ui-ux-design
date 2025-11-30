"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Avatar from "@/components/dashboard/avatar"
import Link from "next/link"

export default function HelperChatsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const chats = [
    {
      id: 1,
      seekerName: "Alex Martinez",
      topic: "Workplace Anxiety",
      lastMessage: "Alex: That really helped, thank you!",
      time: "2 hours ago",
      status: "active",
      unread: 0,
      imageUrl: "/diverse-group-meeting.png",
      typing: false,
      messageCount: 24,
    },
    {
      id: 2,
      seekerName: "Jordan Williams",
      topic: "Career Transition",
      lastMessage: "You: Let's continue next time",
      time: "1 day ago",
      status: "closed",
      unread: 0,
      imageUrl: "/jordan-landscape.png",
      typing: false,
      messageCount: 18,
    },
    {
      id: 3,
      seekerName: "Casey Johnson",
      topic: "Stress Management",
      lastMessage: "Casey: Are you there?",
      time: "5 minutes ago",
      status: "active",
      unread: 1,
      imageUrl: "/abstract-casey.png",
      typing: false,
      messageCount: 7,
    },
  ]

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.seekerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || chat.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Active Conversations</h1>

        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search by seeker name or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-border rounded-lg bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Conversations</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition cursor-pointer ${
                  chat.unread > 0 ? "border-primary/50 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative">
                      <Avatar name={chat.seekerName} size="md" imageUrl={chat.imageUrl} />
                      {chat.status === "active" && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-foreground">{chat.seekerName}</h3>
                        {chat.unread > 0 && (
                          <span className="inline-block w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{chat.topic}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm truncate text-muted-foreground">{chat.lastMessage}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          ({chat.messageCount} messages)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                        chat.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {chat.status === "active" ? "Active" : "Closed"}
                    </span>
                    <p className="text-xs text-muted-foreground">{chat.time}</p>
                  </div>
                </div>
                {chat.status === "active" && (
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg">
                      Continue Chat
                    </Button>
                    <Link href="/dashboard/helper/video-call">
                      <Button className="bg-accent hover:bg-accent/90 text-white rounded-lg">Start Call</Button>
                    </Link>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No conversations found.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

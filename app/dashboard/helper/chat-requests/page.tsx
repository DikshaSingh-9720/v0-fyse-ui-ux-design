'use client'

import { Button } from '@/components/ui/button'

export default function ChatRequestsPage() {
  const requests = [
    {
      id: 1,
      seekerName: 'Alex',
      topic: 'Workplace Anxiety',
      description: 'Feeling anxious about upcoming presentation at work',
      urgency: 'high',
      requestedTime: '2 hours ago',
      avatar: 'A'
    },
    {
      id: 2,
      seekerName: 'Jordan',
      topic: 'Relationship Issues',
      description: 'Need advice on communication with partner',
      urgency: 'medium',
      requestedTime: '4 hours ago',
      avatar: 'J'
    },
    {
      id: 3,
      seekerName: 'Casey',
      topic: 'Career Transition',
      description: 'Considering a major career change',
      urgency: 'low',
      requestedTime: '1 day ago',
      avatar: 'C'
    },
  ]

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">Chat Requests</h1>

        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white font-bold">
                    {request.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{request.seekerName}</h3>
                    <p className="text-sm font-semibold text-secondary mb-1">{request.topic}</p>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                    request.urgency === 'high'
                      ? 'bg-red-100 text-red-700'
                      : request.urgency === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {request.urgency.toUpperCase()} PRIORITY
                  </span>
                  <p className="text-xs text-muted-foreground">{request.requestedTime}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-white rounded-lg">
                  Accept Request
                </Button>
                <Button variant="outline" className="flex-1 rounded-lg">
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

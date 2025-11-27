import { Button } from '@/components/ui/button'

export default function UpcomingRequests() {
  const requests = [
    {
      id: 1,
      seekerName: 'Alex',
      topic: 'Anxiety',
      message: 'Looking for someone to talk about workplace stress',
      status: 'pending',
      time: '5 min ago'
    },
    {
      id: 2,
      seekerName: 'Jordan',
      topic: 'Career',
      message: 'Need guidance on career transition',
      status: 'accepted',
      time: 'now'
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Chat Requests & Active Conversations</h2>
      <div className="grid gap-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {request.seekerName[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{request.seekerName}</h3>
                    <p className="text-xs text-muted-foreground">{request.time}</p>
                  </div>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                request.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {request.status === 'pending' ? 'Pending' : 'Active'}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {request.topic}
              </span>
              <p className="text-sm text-foreground mt-2">{request.message}</p>
            </div>

            <div className="flex gap-2">
              {request.status === 'pending' ? (
                <>
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm">
                    Accept
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-lg text-sm">
                    Decline
                  </Button>
                </>
              ) : (
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-white rounded-lg text-sm">
                  Continue Chat
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

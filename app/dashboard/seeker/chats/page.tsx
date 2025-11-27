import { Button } from '@/components/ui/button'

export default function ChatsPage() {
  const chats = [
    {
      id: 1,
      helperName: 'Morgan',
      topic: 'Workplace Anxiety',
      lastMessage: 'You: That really helped, thank you!',
      time: '2 hours ago',
      status: 'active',
      avatar: 'M'
    },
    {
      id: 2,
      helperName: 'Riley',
      topic: 'Career Transition',
      lastMessage: 'Riley: Let\'s continue next time',
      time: '1 day ago',
      status: 'closed',
      avatar: 'R'
    },
  ]

  return (
    <main className="flex-1 p-8">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Chats</h1>

        <div className="space-y-4">
          {chats.map((chat) => (
            <div key={chat.id} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {chat.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{chat.helperName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{chat.topic}</p>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                    chat.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {chat.status === 'active' ? 'Active' : 'Closed'}
                  </span>
                  <p className="text-xs text-muted-foreground">{chat.time}</p>
                </div>
              </div>
              {chat.status === 'active' && (
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                  Continue Chat
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

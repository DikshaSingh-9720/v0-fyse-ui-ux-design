import type { Message } from "@/lib/chat-storage"

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isOwn = message.sender === "user"
  const date = new Date(message.timestamp)
  const timeString = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs px-4 py-3 rounded-2xl ${
          isOwn ? "bg-primary text-white rounded-br-none" : "bg-gray-100 text-foreground rounded-bl-none"
        }`}
      >
        <p className="text-sm font-semibold mb-1">{message.senderName}</p>
        <p className="break-words">{message.content}</p>
        <p className={`text-xs mt-2 ${isOwn ? "text-primary/70" : "text-muted-foreground"}`}>{timeString}</p>
      </div>
    </div>
  )
}

export interface Message {
  id: string
  chatId: string
  sender: "user" | "other"
  senderName: string
  content: string
  timestamp: number
}

const MESSAGES_KEY = "fyse_messages"

export function getMessages(chatId: string): Message[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(MESSAGES_KEY)
  if (!stored) return []

  const messages: Message[] = JSON.parse(stored)
  return messages.filter((m) => m.chatId === chatId)
}

export function addMessage(chatId: string, sender: "user" | "other", senderName: string, content: string): Message {
  const messages =
    typeof window !== "undefined" ? (JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]") as Message[]) : []

  const newMessage: Message = {
    id: Date.now().toString(),
    chatId,
    sender,
    senderName,
    content,
    timestamp: Date.now(),
  }

  messages.push(newMessage)
  if (typeof window !== "undefined") {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  }

  return newMessage
}

export function clearMessages(chatId: string): void {
  if (typeof window === "undefined") return
  const stored = localStorage.getItem(MESSAGES_KEY)
  if (!stored) return

  const messages: Message[] = JSON.parse(stored)
  const filtered = messages.filter((m) => m.chatId !== chatId)
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(filtered))
}

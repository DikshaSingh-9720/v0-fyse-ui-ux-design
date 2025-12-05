"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react"
import Link from "next/link"
import VideoStream from "@/components/dashboard/video-stream"
import { getCurrentUser } from "@/lib/auth"

export default function VideoCallPage() {
  const [isCallActive, setIsCallActive] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)

  const currentUser = getCurrentUser()
  const seekerName = currentUser?.profile?.name || "You"
  const seekerInitial = seekerName.charAt(0).toUpperCase()

  useEffect(() => {
    if (!isCallActive) return

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isCallActive])

  if (!isCallActive) {
    return (
      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="inline-block p-12 bg-accent/10 rounded-full">
            <Phone className="w-16 h-16 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Call Ended</h1>
            <p className="text-muted-foreground">Thank you for connecting with the helper!</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 text-left">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Seeker</span>
                <span className="font-semibold text-foreground">{seekerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold text-foreground">
                  {Math.floor(callDuration / 60)}:{String(callDuration % 60).padStart(2, "0")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Topic</span>
                <span className="font-semibold text-foreground">Workplace Anxiety</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard/seeker">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg">Back to Dashboard</Button>
            </Link>
            <Link href="/dashboard/seeker/chats">
              <Button variant="outline" className="rounded-lg bg-transparent">
                View Chat History
              </Button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 bg-black flex flex-col">
      <div className="flex-1 flex items-center justify-center relative gap-4 p-4">
        {/* Remote Video (Helper) */}
        <div className="flex-1 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
          <VideoStream userName="Helper" userInitial="H" isVideoOn={isVideoOn} />
        </div>

        {/* Local Video (Self) - Bottom Right */}
        <div className="absolute bottom-8 right-8 w-48 h-48 shadow-2xl">
          <VideoStream userName={seekerName} userInitial={seekerInitial} isLocal isVideoOn={isVideoOn} />
        </div>

        {/* Call Duration */}
        <div className="absolute top-8 left-8 bg-black/50 text-white px-6 py-3 rounded-full text-lg font-bold">
          {Math.floor(callDuration / 60)}:{String(callDuration % 60).padStart(2, "0")}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-card border-t border-border p-8 flex items-center justify-center gap-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-5 rounded-full transition transform hover:scale-110 ${
            isMuted ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary hover:bg-primary/30"
          }`}
        >
          {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
        </button>

        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`p-5 rounded-full transition transform hover:scale-110 ${
            !isVideoOn ? "bg-destructive/20 text-destructive" : "bg-accent/20 text-accent hover:bg-accent/30"
          }`}
        >
          {isVideoOn ? <Video size={28} /> : <VideoOff size={28} />}
        </button>

        <button
          onClick={() => setIsCallActive(false)}
          className="p-5 rounded-full bg-destructive hover:bg-destructive/90 text-white transition transform hover:scale-110"
        >
          <PhoneOff size={28} />
        </button>
      </div>
    </main>
  )
}

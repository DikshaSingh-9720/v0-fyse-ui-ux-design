"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Mic, MicOff, Video, VideoOff, Phone } from "lucide-react"

interface VideoCallModalProps {
  isOpen: boolean
  onClose: () => void
  helperName: string
  helperAvatar: string
}

export default function VideoCallModal({ isOpen, onClose, helperName, helperAvatar }: VideoCallModalProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [callDuration, setCallDuration] = useState(0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-3xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
              {helperAvatar}
            </div>
            <div>
              <h2 className="font-bold">{helperName}</h2>
              <p className="text-sm text-white/80">Peer Support Helper</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Video Area */}
        <div className="bg-black relative aspect-video flex items-center justify-center">
          {/* Remote Video (Helper) */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center text-4xl text-white font-bold">
                {helperAvatar}
              </div>
              <p className="text-white text-lg font-semibold">{helperName}</p>
              <p className="text-white/60 text-sm mt-1">Connected</p>
            </div>
          </div>

          {/* Local Video (Self) - Bottom Right */}
          <div className="absolute bottom-4 right-4 w-32 h-32 bg-gradient-to-br from-accent to-secondary rounded-2xl overflow-hidden border-4 border-white/20">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-primary text-white text-2xl font-bold">
              YOU
            </div>
          </div>

          {/* Call Duration */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {Math.floor(callDuration / 60)}:{String(callDuration % 60).padStart(2, "0")}
          </div>
        </div>

        {/* Controls */}
        <div className="bg-card border-t border-border p-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition ${
              isMuted
                ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-4 rounded-full transition ${
              !isVideoOn
                ? "bg-destructive/20 text-destructive hover:bg-destructive/30"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          <Button onClick={onClose} className="bg-destructive hover:bg-destructive/90 text-white rounded-full p-4 ml-4">
            <Phone size={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

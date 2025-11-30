"use client"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import Link from "next/link"

interface VideoCallButtonProps {
  helperName?: string
  className?: string
}

export default function VideoCallButton({ helperName = "helper", className = "" }: VideoCallButtonProps) {
  return (
    <Link href="/dashboard/seeker/video-call">
      <Button className={`bg-accent hover:bg-accent/90 text-white rounded-lg gap-2 ${className}`}>
        <Video size={18} />
        Start Video Call
      </Button>
    </Link>
  )
}
